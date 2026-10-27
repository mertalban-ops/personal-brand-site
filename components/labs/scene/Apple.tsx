"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { getAppleGlowTexture } from "@/lib/labs/pbrTextures";
import type { AppleAnchor } from "@/lib/labs/anchors";
import type { LanguageCode } from "@/context/LanguageContext";
import { pickText } from "@/data/labs";

let sharedAppleGeo: THREE.BufferGeometry | null = null;
let sharedCoreGeo: THREE.BufferGeometry | null = null;
let sharedStemGeo: THREE.BufferGeometry | null = null;
let sharedLeafGeo: THREE.BufferGeometry | null = null;
let sharedTwinCrownGeo: THREE.BufferGeometry | null = null;
let sharedSparkleGeo: THREE.BufferGeometry | null = null;

export const CRYSTAL_APPLE_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vLocalPos;
  varying vec3 vWorldPos;

  void main() {
    vLocalPos = position;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    #ifdef USE_INSTANCING
      wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
      vNormal = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal);
    #else
      vNormal = normalize(mat3(modelMatrix) * normal);
    #endif
    vWorldPos = wp.xyz;
    vViewDir = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

export const CRYSTAL_APPLE_FRAGMENT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vLocalPos;
  varying vec3 vWorldPos;

  uniform float uTime;
  uniform float uIntensity;
  uniform float uDimmed;

  float hash3(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);
    float ndv = max(0.0, dot(N, V));

    // Normalized vertical coordinate inside the apple (-0.28 bottom .. +0.28 top)
    float yNorm = clamp((vLocalPos.y + 0.28) / 0.56, 0.0, 1.0);

    // Reference 4.8s, 5.6s, 6.4s & 7.2s palette:
    // Upper crown has a rich warm ruby-rose-amber glass blush;
    // Center has translucent honey-gold depth with internal refractive ribs;
    // Lower calyx has a radiant molten golden-ivory inner core.
    vec3 bottomGlow = vec3(0.98, 0.72, 0.20);
    vec3 midHoney = vec3(0.76, 0.35, 0.08);
    vec3 upperRoseAmber = vec3(0.68, 0.21, 0.14);

    vec3 bodyCol = mix(bottomGlow, midHoney, smoothstep(0.06, 0.50, yNorm));
    bodyCol = mix(bodyCol, upperRoseAmber, smoothstep(0.46, 0.88, yNorm));

    // Internal refractive glass caustics / vertical crystal ribs visible inside the apple
    float angle = atan(vLocalPos.z, vLocalPos.x);
    float causticRib = 0.5 + 0.5 * sin(angle * 6.0 + vLocalPos.y * 8.0 - uTime * 0.4);
    float centerDepth = pow(ndv, 1.15);
    vec3 deepInterior = mix(vec3(0.44, 0.15, 0.04), vec3(0.92, 0.56, 0.12), (1.0 - yNorm) * 0.72 + causticRib * 0.28);
    vec3 col = mix(bodyCol, deepInterior, centerDepth * 0.64);

    // Subsurface warm core radiance rising from the lower calyx heart (like 5.6s & 6.4s)
    float radialCenter = max(0.0, 1.0 - length(vLocalPos.xz) * 2.65);
    float heartGlow = pow(radialCenter, 1.75) * max(0.0, 1.05 - yNorm * 0.92);
    col += vec3(1.0, 0.76, 0.22) * heartGlow * 0.54 * uIntensity;

    // Crisp luminous Golden-Ivory Fresnel rim around the apple silhouette (exact match to 5.6s & 6.4s)
    float fresnel = pow(1.0 - ndv, 2.65);
    col += vec3(1.0, 0.91, 0.54) * fresnel * (1.26 * uIntensity);

    // Glossy clearcoat specular reflection from upper-right sunset key light
    vec3 L1 = normalize(vec3(0.72, 0.60, 0.36));
    vec3 H1 = normalize(L1 + V);
    float spec1 = pow(max(0.0, dot(N, H1)), 48.0);
    float specBroad = pow(max(0.0, dot(N, H1)), 10.0);
    col += vec3(1.0, 0.97, 0.86) * spec1 * 1.22;
    col += vec3(1.0, 0.78, 0.36) * specBroad * 0.24;

    // Secondary soft rim reflection from left sky
    vec3 L2 = normalize(vec3(-0.65, 0.35, 0.55));
    vec3 H2 = normalize(L2 + V);
    col += vec3(0.98, 0.82, 0.68) * pow(max(0.0, dot(N, H2)), 24.0) * 0.28;

    // Internal suspended golden starlight sparkles (like 5.6s, 6.4s & 7.2s)
    vec3 spCoord = vLocalPos * 29.0 + vec3(0.0, -uTime * 0.32, 0.0);
    vec3 spCell = floor(spCoord);
    vec3 spFract = fract(spCoord) - 0.5;
    float h = hash3(spCell);
    if (h > 0.74) {
      float d = length(spFract);
      float twinkle = 0.5 + 0.5 * sin(uTime * 3.6 + h * 42.0);
      float spark = smoothstep(0.27, 0.04, d) * twinkle * ndv;
      col += vec3(1.0, 0.95, 0.72) * spark * 1.35 * uIntensity;
    }

    col *= mix(1.0, 0.42, uDimmed);

    // Semi-translucent crystal glass alpha: deep glassy interior, solid luminous Fresnel rim
    float alpha = clamp(0.86 + fresnel * 0.14, 0.0, 1.0) * mix(1.0, 0.55, uDimmed);
    gl_FragColor = vec4(col, alpha);
  }
`;

/**
 * True sculpted 5-lobed botanical apple silhouette (with top stem cavity & bottom calyx dimple)
 * plus graceful symmetric twin veined leaves and internal starlight points.
 */
export function getSculptedAppleGeometries() {
  if (
    sharedAppleGeo &&
    sharedCoreGeo &&
    sharedStemGeo &&
    sharedLeafGeo &&
    sharedTwinCrownGeo &&
    sharedSparkleGeo
  ) {
    return {
      appleGeo: sharedAppleGeo,
      coreGeo: sharedCoreGeo,
      stemGeo: sharedStemGeo,
      leafGeo: sharedLeafGeo,
      twinCrownGeo: sharedTwinCrownGeo,
      sparkleGeo: sharedSparkleGeo,
    };
  }

  const pts: THREE.Vector2[] = [];
  const corePts: THREE.Vector2[] = [];
  const steps = 36;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps; // 0 = bottom, 1 = top
    const theta = t * Math.PI;
    // Classic heart-shaped apple silhouette: wider upper shoulder, tapered 5-lobed bottom calyx
    let r = Math.sin(theta) * 0.292 * (0.84 + 0.32 * Math.sin(t * Math.PI * 0.8));
    let y = -Math.cos(theta) * 0.278;

    // Top stem cavity indentation
    if (t > 0.81) {
      const d = (t - 0.81) / 0.19;
      y -= Math.sin(d * Math.PI * 0.5) * 0.078;
      r *= 1 - d * 0.32;
    }
    // Bottom calyx indentation
    if (t < 0.17) {
      const d = (0.17 - t) / 0.17;
      y += Math.sin(d * Math.PI * 0.5) * 0.042;
    }
    pts.push(new THREE.Vector2(Math.max(0.002, r), y));
    corePts.push(new THREE.Vector2(Math.max(0.001, r * 0.46), y * 0.56 - 0.035));
  }

  const lathe = new THREE.LatheGeometry(pts, 36);
  // Add subtle 5-lobed botanical apple ribbing so it never looks like a generic sphere
  const aPos = lathe.getAttribute("position");
  for (let i = 0; i < aPos.count; i++) {
    const px = aPos.getX(i);
    const py = aPos.getY(i);
    const pz = aPos.getZ(i);
    const phi = Math.atan2(pz, px);
    const lobe = 1 + Math.cos(phi * 5) * 0.024 + Math.sin(phi * 3) * 0.012;
    aPos.setXYZ(i, px * lobe, py, pz * lobe);
  }
  lathe.computeVertexNormals();
  sharedAppleGeo = lathe;

  sharedCoreGeo = new THREE.LatheGeometry(corePts, 20);
  sharedCoreGeo.computeVertexNormals();

  // Curved woody stem rising from the top cavity
  const stemCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.17, 0),
    new THREE.Vector3(0.008, 0.27, 0.005),
    new THREE.Vector3(0.024, 0.365, 0.01),
  ]);
  sharedStemGeo = new THREE.TubeGeometry(stemCurve, 10, 0.013, 7, false);

  // Sculpted pointed green leaf blade with natural arch, central midrib fold, and vertex color veins (5.6s & 6.4s)
  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, 0);
  leafShape.bezierCurveTo(0.1, 0.092, 0.26, 0.102, 0.39, 0.0);
  leafShape.bezierCurveTo(0.26, -0.102, 0.1, -0.092, 0, 0);
  const leafGeo = new THREE.ShapeGeometry(leafShape, 16);
  const lPos = leafGeo.getAttribute("position");
  const lCols: number[] = [];
  const cMidrib = new THREE.Color("#def582");
  const cBlade = new THREE.Color("#73a434");
  const cRim = new THREE.Color("#c6e66a");
  const tmp = new THREE.Color();

  for (let i = 0; i < lPos.count; i++) {
    const lx = lPos.getX(i);
    const ly = lPos.getY(i);
    const u = Math.max(0, Math.min(1, lx / 0.39));
    const v = Math.abs(ly) / 0.102;
    // Graceful downward-arching tip + V-fold along midrib (matches 5.6s, 6.4s & 7.2s)
    const archZ = Math.sin(u * Math.PI * 0.92) * 0.062 - Math.abs(ly) * 0.22;
    lPos.setXYZ(i, lx, ly, archZ);

    if (v < 0.18) {
      tmp.copy(cMidrib).lerp(cBlade, v / 0.18);
    } else {
      tmp.copy(cBlade).lerp(cRim, Math.min(1, (v - 0.18) / 0.7 + u * 0.38));
    }
    lCols.push(tmp.r, tmp.g, tmp.b);
  }
  leafGeo.setAttribute("color", new THREE.Float32BufferAttribute(lCols, 3));
  leafGeo.computeVertexNormals();
  sharedLeafGeo = leafGeo;

  // Combined twin arching leaves for instanced canopy crystal apples
  const leftL = leafGeo.clone();
  leftL.rotateX(-0.32);
  leftL.rotateY(0.18);
  leftL.rotateZ(0.24);
  leftL.translate(0.015, 0.275, 0.01);

  const rightL = leafGeo.clone();
  rightL.scale(0.94, 0.94, 0.94);
  rightL.rotateX(-0.28);
  rightL.rotateY(Math.PI - 0.18);
  rightL.rotateZ(-0.22);
  rightL.translate(-0.014, 0.268, -0.008);

  sharedTwinCrownGeo = mergeGeometries([leftL, rightL], false)!;
  leftL.dispose();
  rightL.dispose();

  // 34 Internal golden light sparkles suspended inside the crystal apple (like 5.6s & 6.4s)
  const spCount = 34;
  const spPos = new Float32Array(spCount * 3);
  for (let i = 0; i < spCount; i++) {
    const a = i * 2.39996;
    const rad = 0.03 + ((i * 7) % 21) * 0.0082;
    spPos[i * 3] = Math.cos(a) * rad;
    spPos[i * 3 + 1] = ((i % 11) / 5.0 - 1) * 0.16;
    spPos[i * 3 + 2] = Math.sin(a) * rad;
  }
  sharedSparkleGeo = new THREE.BufferGeometry();
  sharedSparkleGeo.setAttribute("position", new THREE.BufferAttribute(spPos, 3));

  return {
    appleGeo: sharedAppleGeo,
    coreGeo: sharedCoreGeo,
    stemGeo: sharedStemGeo,
    leafGeo: sharedLeafGeo,
    twinCrownGeo: sharedTwinCrownGeo,
    sparkleGeo: sharedSparkleGeo,
  };
}

interface AppleProps {
  anchor: AppleAnchor;
  language: LanguageCode;
  active: boolean;
  dimmed: boolean;
  highlighted?: boolean;
  onSelect: (slug: string) => void;
}

export default function Apple({
  anchor,
  language,
  active,
  dimmed,
  highlighted = false,
  onSelect,
}: AppleProps) {
  const group = useRef<THREE.Group>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHovered] = useState(false);

  const { appleGeo, coreGeo, stemGeo, leafGeo, sparkleGeo } = useMemo(
    () => getSculptedAppleGeometries(),
    [],
  );
  const glowTex = useMemo(() => getAppleGlowTexture(), []);
  const basePos = useMemo(() => new THREE.Vector3(...anchor.position), [anchor.position]);
  const baseScale = anchor.scale ?? 1.06;
  const phase = useMemo(() => {
    let h = 0;
    for (let i = 0; i < anchor.project.id.length; i++) h += anchor.project.id.charCodeAt(i);
    return (h % 628) / 100;
  }, [anchor.project.id]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 1.05 },
      uDimmed: { value: 0.0 },
    }),
    [],
  );

  const isFocused = hovered || highlighted;

  useFrame((state) => {
    const g = group.current;
    if (!g || active) return;
    const t = state.clock.elapsedTime;
    // Gentle pendulum sway + subtle vertical breath on its branch
    g.position.set(
      basePos.x + Math.sin(t * 1.15 + phase) * 0.016,
      basePos.y + Math.sin(t * 1.65 + phase) * 0.028,
      basePos.z + Math.cos(t * 1.05 + phase) * 0.016,
    );
    g.rotation.z = Math.sin(t * 1.25 + phase) * 0.055;
    g.rotation.x = Math.cos(t * 0.95 + phase) * 0.035;

    const targetScale = isFocused ? baseScale * 1.24 : baseScale;
    const s = THREE.MathUtils.lerp(g.scale.x, targetScale, 0.14);
    g.scale.setScalar(s);

    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = t + phase;
      shaderRef.current.uniforms.uIntensity.value = THREE.MathUtils.lerp(
        shaderRef.current.uniforms.uIntensity.value,
        isFocused ? 1.42 : 1.05 + Math.sin(t * 2.2 + phase) * 0.06,
        0.12,
      );
      shaderRef.current.uniforms.uDimmed.value = THREE.MathUtils.lerp(
        shaderRef.current.uniforms.uDimmed.value,
        dimmed ? 1.0 : 0.0,
        0.12,
      );
    }
  });

  return (
    <group ref={group} position={anchor.position} visible={!active}>
      {/* Organic woody twig connecting top of apple stem to the branch above */}
      <mesh position={[0.02, 0.46, 0.01]} rotation={[0, 0, -0.08]}>
        <cylinderGeometry args={[0.016, 0.012, 0.28, 6]} />
        <meshStandardMaterial color="#593e25" roughness={0.9} />
      </mesh>

      {/* Warm glowing inner heart kernel inside the lower calyx of the translucent crystal shell */}
      <mesh geometry={coreGeo} position={[0, -0.048, 0]} scale={[0.88, 0.78, 0.88]}>
        <meshBasicMaterial
          color="#ffba38"
          transparent
          opacity={dimmed ? 0.2 : 0.62}
        />
      </mesh>

      {/* Internal suspended golden starlight sparkles */}
      <points geometry={sparkleGeo}>
        <pointsMaterial
          map={glowTex}
          color="#fffce8"
          size={0.058}
          transparent
          opacity={dimmed ? 0.2 : 0.96}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Translucent Crystal/Glass Golden Apple Outer Shell with Fresnel rim & blush gradient */}
      <mesh
        geometry={appleGeo}
        castShadow
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onSelect(anchor.project.slug);
        }}
      >
        <shaderMaterial
          ref={shaderRef}
          vertexShader={CRYSTAL_APPLE_VERTEX}
          fragmentShader={CRYSTAL_APPLE_FRAGMENT}
          uniforms={uniforms}
          transparent
        />
      </mesh>

      {/* Curved woody stem */}
      <mesh geometry={stemGeo}>
        <meshStandardMaterial color="#5d4024" roughness={0.88} />
      </mesh>

      {/* Pair of veined, backlit green leaves arching out from the stem (matches 5.6s & 6.4s) */}
      <mesh
        geometry={leafGeo}
        position={[0.016, 0.278, 0.01]}
        rotation={[-0.32, 0.18, 0.24]}
      >
        <meshStandardMaterial
          vertexColors
          emissive="#587d22"
          emissiveIntensity={0.44}
          roughness={0.48}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        geometry={leafGeo}
        position={[-0.014, 0.27, -0.008]}
        rotation={[-0.28, Math.PI - 0.18, -0.22]}
        scale={0.94}
      >
        <meshStandardMaterial
          vertexColors
          emissive="#4e701d"
          emissiveIntensity={0.38}
          roughness={0.48}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Soft warm golden halo around the crystal fruit */}
      <sprite scale={isFocused ? 1.48 : 1.08}>
        <spriteMaterial
          map={glowTex}
          color="#ffb238"
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent
          opacity={dimmed ? 0.08 : isFocused ? 0.42 : 0.22}
        />
      </sprite>

      {/* Accessible project label on hover / keyboard highlight */}
      {isFocused && !active && !dimmed && (
        <Html center distanceFactor={11} position={[0, 0.64, 0]} style={{ pointerEvents: "none" }}>
          <div
            style={{
              transform: "translateY(-8px)",
              minWidth: 168,
              maxWidth: 220,
              padding: "10px 14px",
              borderRadius: 12,
              background: "rgba(12, 18, 28, 0.90)",
              border: `1px solid ${anchor.project.accentColor}77`,
              boxShadow: `0 12px 32px -10px rgba(0,0,0,0.55), 0 0 20px -8px ${anchor.project.accentColor}`,
              color: "#f3f6fa",
              textAlign: "center",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: anchor.project.accentColor,
                letterSpacing: "0.02em",
              }}
            >
              {anchor.project.title}
            </div>
            <div style={{ fontSize: 11, color: "#b6c5d4", marginTop: 3, lineHeight: 1.35 }}>
              {pickText(anchor.project.summary, language)}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
