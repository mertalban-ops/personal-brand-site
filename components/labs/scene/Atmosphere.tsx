"use client";

import { useEffect, useMemo, useRef } from "react";
import { Clouds, Cloud } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  getAppleGlowTexture,
  getCloudPuffTexture,
  getGoldenHourEnvMap,
  getLunarTexture,
} from "@/lib/labs/pbrTextures";

const SKY_VERTEX = /* glsl */ `
  varying vec3 vWorldPos;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const SKY_FRAGMENT = /* glsl */ `
  varying vec3 vWorldPos;
  uniform vec3 uSunDir;
  uniform float uTime;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.04;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 d = normalize(vWorldPos);
    float y = clamp(d.y, -1.0, 1.0);
    vec3 sunD = normalize(uSunDir);
    float sunAmt = max(0.0, dot(d, sunD));

    // Reference palette (0.0s - 2.4s):
    // Deep twilight periwinkle-slate upper sky -> warm rose-lavender mid-sky -> luminous golden-apricot horizon
    vec3 zenithCol = vec3(0.31, 0.41, 0.61);
    vec3 upperMidCol = vec3(0.55, 0.59, 0.74);
    vec3 horizonCol = vec3(0.97, 0.85, 0.72);
    vec3 lowerCloudCol = vec3(0.76, 0.66, 0.71);

    vec3 col;
    if (y >= 0.0) {
      float t1 = smoothstep(0.0, 0.22, y);
      float t2 = smoothstep(0.14, 0.68, y);
      col = mix(horizonCol, upperMidCol, t1);
      col = mix(col, zenithCol, t2);

      // Painterly golden-hour sky clouds across the upper sky dome (like 0.0s upper-left & upper-right)
      vec2 skyUv = d.xz / (y + 0.24) * 1.35 + vec2(uTime * 0.0035, 0.0);
      float c1 = fbm(skyUv);
      float c2 = fbm(skyUv * 2.15 + vec2(1.9, -0.7));
      float cloudVal = c1 * 0.64 + c2 * 0.36;
      // Leave a slightly clearer twilight window around the colossal Moon (d.x ~ 0.35, d.y ~ 0.24)
      float moonWindow = 1.0 - 0.65 * exp(-length(d.xy - vec2(0.33, 0.25)) * 6.5);
      float cloudMask = smoothstep(0.42, 0.76, cloudVal) * smoothstep(0.02, 0.16, y) * (1.0 - smoothstep(0.58, 0.94, y)) * moonWindow;

      // Cloud shading: warm rose-mauve underside + sunlit cream-gold tops
      vec3 cloudShadow = vec3(0.72, 0.62, 0.68);
      vec3 cloudLit = mix(vec3(0.95, 0.82, 0.72), vec3(1.0, 0.94, 0.82), pow(sunAmt, 1.4));
      vec3 skyCloudCol = mix(cloudShadow, cloudLit, smoothstep(0.42, 0.74, c1));
      col = mix(col, skyCloudCol, cloudMask * 0.66);
    } else {
      col = mix(horizonCol, lowerCloudCol, smoothstep(0.0, -0.35, y));
    }

    // Golden-hour atmospheric scattering toward upper-right sun (concentrated near low horizon so upper Moon stays crisp)
    float lowSunMask = smoothstep(0.45, 0.02, abs(y));
    col += vec3(1.0, 0.82, 0.52) * pow(sunAmt, 2.8) * 0.32 * lowSunMask;
    col += vec3(1.0, 0.94, 0.80) * pow(sunAmt, 10.0) * 0.26;

    // Warm golden-rose horizon mist band
    float horizonMist = exp(-abs(y) * 10.5);
    col = mix(col, vec3(0.98, 0.88, 0.76), horizonMist * 0.38);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const MOON_VERTEX = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const MOON_FRAGMENT = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  uniform sampler2D uMap;
  uniform vec3 uSunDir;
  void main() {
    vec3 tex = texture2D(uMap, vUv).rgb;
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);
    vec3 L = normalize(uSunDir);

    // Illuminated upper-right limb + soft atmospheric blend on the lower-left edge (0.0s & 2.4s)
    float ndl = clamp(dot(N, L) * 0.88 + 0.36, 0.0, 1.0);
    float fresnel = pow(1.0 - max(0.0, dot(N, V)), 2.2);
    float limbFade = smoothstep(0.01, 0.16, max(0.0, dot(N, V)));

    vec3 craterContrast = clamp((tex - 0.5) * 2.55 + 0.46, 0.0, 1.0);
    vec3 darkMare = vec3(0.44, 0.49, 0.64);
    vec3 litHighland = vec3(0.95, 0.89, 0.83);
    vec3 surfaceCol = mix(darkMare, litHighland, craterContrast);
    vec3 skyBlend = vec3(0.56, 0.60, 0.74);
    vec3 moonCol = mix(skyBlend, surfaceCol, 0.38 + ndl * 0.62);

    // Crisp warm sunlit crescent rim on the upper-right edge
    moonCol += vec3(1.0, 0.94, 0.80) * pow(max(0.0, dot(N, L)), 2.4) * (0.34 + fresnel * 0.72);

    float alpha = limbFade * (0.55 + 0.45 * ndl);
    gl_FragColor = vec4(moonCol, alpha);
  }
`;

const CLOUD_SEA_VERTEX = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  uniform float uTime;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    float billow = noise(pos.xz * 0.12 + vec2(uTime * 0.035, 0.0)) * 1.45
                 + noise(pos.xz * 0.28 - vec2(0.0, uTime * 0.025)) * 0.75;
    pos.y += billow;
    vec4 wp = modelMatrix * vec4(pos, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const CLOUD_SEA_FRAGMENT = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  uniform float uTime;
  uniform float uInnerCutout;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = vWorldPos.xz * 0.095 + vec2(uTime * 0.014, uTime * 0.007);
    float n1 = fbm(p);
    float n2 = fbm(p * 2.35 + vec2(n1 * 1.5, -n1 * 1.2));
    float cumulus = clamp(n1 * 0.52 + n2 * 0.48, 0.0, 1.0);

    // Directional golden light gradient from upper-right (+x, -z)
    float sunGrad = clamp((vWorldPos.x * 0.015 - vWorldPos.z * 0.010) + 0.52, 0.0, 1.0);

    // Deep rose-mauve-taupe cloud troughs -> warm apricot-peach mid -> sunlit golden-cream crests
    vec3 shadowCol = vec3(0.56, 0.45, 0.52);
    vec3 midCol = vec3(0.85, 0.70, 0.63);
    vec3 crestCol = vec3(0.99, 0.91, 0.78);

    float lightVal = smoothstep(0.22, 0.78, cumulus + (sunGrad - 0.5) * 0.26);
    vec3 col = mix(shadowCol, midCol, smoothstep(0.0, 0.52, lightVal));
    col = mix(col, crestCol, smoothstep(0.45, 0.92, lightVal));

    // Distance fade into horizon mist
    float dist = length(vWorldPos.xz);
    float edgeAlpha = 1.0 - smoothstep(58.0, 95.0, dist);
    // Optional central canyon opening so the falling apple can descend deep into the cloud abyss
    float innerMask = uInnerCutout > 0.5 ? smoothstep(5.2, 9.8, dist) : 1.0;
    col = mix(col, vec3(0.93, 0.81, 0.72), smoothstep(32.0, 82.0, dist) * 0.58);

    gl_FragColor = vec4(col, edgeAlpha * innerMask);
  }
`;

export default function Atmosphere({ quality = "high" }: { quality?: "high" | "low" }) {
  const high = quality === "high";
  const { scene } = useThree();
  const moonTex = useMemo(() => getLunarTexture(), []);
  const glowTex = useMemo(() => getAppleGlowTexture(), []);
  const cloudPuffTex = useMemo(() => getCloudPuffTexture(), []);
  const envMap = useMemo(() => getGoldenHourEnvMap(), []);
  const sunDir = useMemo(() => new THREE.Vector3(0.78, 0.42, -0.35).normalize(), []);

  useEffect(() => {
    scene.environment = envMap;
    scene.environmentIntensity = 0.86;
    return () => {
      if (scene.environment === envMap) {
        scene.environment = null;
      }
    };
  }, [scene, envMap]);

  const skyUniforms = useMemo(
    () => ({
      uSunDir: { value: sunDir },
      uTime: { value: 0 },
    }),
    [sunDir],
  );

  const moonUniforms = useMemo(
    () => ({
      uMap: { value: moonTex },
      uSunDir: { value: new THREE.Vector3(0.82, 0.38, 0.42).normalize() },
    }),
    [moonTex],
  );

  const upperCloudSeaUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uInnerCutout: { value: 1.0 },
    }),
    [],
  );

  const deepCloudSeaUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uInnerCutout: { value: 0.0 },
    }),
    [],
  );

  // Soft painterly volumetric cumulus puff layers across:
  // 1) Foreground framing cloud banks (left & right bottom corners like 0.0s)
  // 2) Horizon & archipelago cloud sea (y = -5.4 .. -8.2)
  // 3) Deep vertical cloud canyon / abyss (y = -8.5 .. -16.5) for the poetic long apple fall (7.2s - 8.8s)
  const cloudPuffMesh = useMemo(() => {
    const count = high ? 380 : 170;
    const p1 = new THREE.PlaneGeometry(1, 1);
    p1.rotateX(-Math.PI * 0.36);
    const p2 = new THREE.PlaneGeometry(1, 1);
    p2.rotateX(-Math.PI * 0.42);
    p2.rotateY(Math.PI * 0.46);

    const pos1 = p1.getAttribute("position");
    const pos2 = p2.getAttribute("position");
    const uv1 = p1.getAttribute("uv");
    const uv2 = p2.getAttribute("uv");
    const positions = new Float32Array((pos1.count + pos2.count) * 3);
    const uvs = new Float32Array((uv1.count + uv2.count) * 2);
    positions.set(pos1.array as Float32Array, 0);
    positions.set(pos2.array as Float32Array, pos1.count * 3);
    uvs.set(uv1.array as Float32Array, 0);
    uvs.set(uv2.array as Float32Array, uv1.count * 2);
    const indices = [0, 2, 1, 2, 3, 1, 4, 6, 5, 6, 7, 5];

    const puffGeo = new THREE.BufferGeometry();
    puffGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    puffGeo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    puffGeo.setIndex(indices);
    p1.dispose();
    p2.dispose();

    const mat = new THREE.MeshBasicMaterial({
      map: cloudPuffTex,
      color: "#ffffff",
      transparent: true,
      opacity: 0.84,
      depthWrite: false,
      fog: false,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.InstancedMesh(puffGeo, mat, count);
    const dummy = new THREE.Object3D();
    const col = new THREE.Color();
    const palette = ["#fff6e4", "#f9dfc4", "#ecc4ae", "#d8b0b6", "#c096a0"];

    for (let i = 0; i < count; i++) {
      const a = (i * 2.3999632) % (Math.PI * 2);

      if (i < 110) {
        // Deep Abyss Cloud Bed (y = -11.5 to -16.2, r = 0..16) for the 7.2s-8.8s apple fall sequence!
        const t = i / 110;
        const r = Math.pow(t, 0.75) * 16.5;
        const x = Math.cos(a) * r;
        const z = Math.sin(a) * r + 2.5;
        const baseY = -12.2 - (i % 5) * 0.78 + Math.sin(i * 1.7) * 0.45;
        const scaleBase = 3.8 + (i % 5) * 0.95;
        dummy.position.set(x, baseY, z);
        dummy.rotation.set(0, a + (i % 3) * 0.7, 0);
        dummy.scale.set(scaleBase * 1.2, scaleBase * 0.78, scaleBase * 1.2);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        col.set(palette[i % 4]);
        mesh.setColorAt(i, col);
      } else if (i < 155) {
        // Mid-Abyss Canyon Walls (r = 7.2..13.5, y = -7.2..-11.5) framing the waterfall plunge
        const k = (i - 110) / 45;
        const r = 7.2 + k * 6.5;
        const x = Math.cos(a) * r;
        const z = Math.sin(a) * r;
        const baseY = -6.8 - (i % 4) * 1.05;
        const scaleBase = 4.2 + (i % 4) * 1.1;
        dummy.position.set(x, baseY, z);
        dummy.rotation.set(0, a, 0);
        dummy.scale.set(scaleBase * 1.15, scaleBase * 0.75, scaleBase * 1.15);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        col.set(palette[i % palette.length]);
        mesh.setColorAt(i, col);
      } else {
        // Wide Archipelago Cloud Sea & Foreground Framing Billows (r = 8.2..58)
        const t = (i - 155) / (count - 155);
        const r = 8.2 + Math.pow(t, 0.86) * 50.0;
        const x = Math.cos(a) * r;
        const z = Math.sin(a) * r;

        // Foreground left & right cloud banks rise higher (matching 0.0s bottom-left & bottom-right corners)
        const isForegroundCorner = z > 3.0 && Math.abs(x) > 10.5;
        const baseY = isForegroundCorner
          ? -3.8 + Math.sin(i * 1.9) * 0.85
          : -5.95 - (i % 4) * 0.45 + Math.sin(i * 1.3) * 0.38;

        const scaleBase = isForegroundCorner
          ? 6.4 + (i % 4) * 1.6
          : 5.5 + (i % 6) * 1.65;
        dummy.position.set(x, baseY, z);
        dummy.rotation.set(0, a + (i % 3) * 0.7, 0);
        dummy.scale.set(scaleBase * 1.18, scaleBase * 0.74, scaleBase * 1.18);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        const warmIdx = x > 2 ? i % 3 : i % palette.length;
        col.set(palette[warmIdx]);
        mesh.setColorAt(i, col);
      }
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.renderOrder = -1;
    return mesh;
  }, [high, cloudPuffTex]);

  const pollenGeo = useMemo(() => {
    const count = high ? 140 : 60;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = (i * 2.39996) % (Math.PI * 2);
      const r = 1.6 + ((i * 7) % 100) * 0.095;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = -1.2 + ((i * 13) % 100) * 0.068;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [high]);

  const raysGroup = useRef<THREE.Group>(null);
  const pollenRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    skyUniforms.uTime.value = t;
    upperCloudSeaUniforms.uTime.value = t;
    deepCloudSeaUniforms.uTime.value = t;
    if (raysGroup.current) {
      raysGroup.current.rotation.z = -0.54 + Math.sin(t * 0.22) * 0.018;
    }
    if (pollenRef.current) {
      pollenRef.current.rotation.y = t * 0.02;
      pollenRef.current.position.y = Math.sin(t * 0.55) * 0.14;
    }
  });

  return (
    <>
      <color attach="background" args={["#eed8c2"]} />
      <fog attach="fog" args={["#f0dac5", 26, 86]} />

      {/* 360° Painterly Golden-Hour Sky Dome */}
      <mesh scale={125}>
        <sphereGeometry args={[1, 36, 28]} />
        <shaderMaterial
          vertexShader={SKY_VERTEX}
          fragmentShader={SKY_FRAGMENT}
          uniforms={skyUniforms}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Golden-hour cinematic lighting rig */}
      <hemisphereLight args={["#fff4dc", "#7a6672", 1.08]} />
      <ambientLight intensity={0.45} color="#ffedd4" />

      {/* Main golden sunset key light from upper-right */}
      <directionalLight
        position={[18, 13.5, 9.5]}
        intensity={2.85}
        color="#ffdba0"
        castShadow={high}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-11}
        shadow-camera-right={11}
        shadow-camera-top={11}
        shadow-camera-bottom={-11}
        shadow-camera-near={2}
        shadow-camera-far={48}
        shadow-bias={-0.0004}
      />

      {/* Strong warm golden rim / backlight from upper-right-back (for golden foliage & waterfall mist) */}
      <directionalLight position={[18, 9.5, -16]} intensity={1.85} color="#ffc770" />

      {/* Inner Tree of Life warm golden heart light (illuminates inner boughs & upper trunk like 2.4s & 4.8s) */}
      <pointLight
        position={[0.15, 3.25, 0.55]}
        intensity={3.65}
        distance={10.5}
        decay={1.55}
        color="#ffbd59"
      />

      {/* Soft periwinkle-lavender fill from left sky */}
      <directionalLight position={[-18, 7.5, 9]} intensity={0.78} color="#cad6f5" />

      {/* Warm apricot bounce light from the cloud sea below (illuminates cliff underside & roots) */}
      <directionalLight position={[0, -12, 6]} intensity={0.85} color="#f7d3b5" />

      {/* Colossal Textured Pale Moon in upper-right sky (framed prominently above right canopy in 0.0s & 2.4s) */}
      <group position={[9.4, 6.85, -24.5]}>
        <mesh rotation={[0.1, -0.58, 0.14]}>
          <sphereGeometry args={[7.35, 48, 36]} />
          <shaderMaterial
            vertexShader={MOON_VERTEX}
            fragmentShader={MOON_FRAGMENT}
            uniforms={moonUniforms}
            transparent
            fog={false}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Diagonal Volumetric God-Ray shafts streaming from upper-right sunset */}
      <group ref={raysGroup} position={[14.5, 9.6, -16.5]} rotation={[0, 0, -0.54]}>
        {[-3.2, -1.2, 0.8, 2.8, 4.8].map((offset, idx) => (
          <mesh key={idx} position={[offset, -4.5, 0]}>
            <planeGeometry args={[2.35, 28]} />
            <meshBasicMaterial
              color="#ffebbf"
              transparent
              opacity={0.046}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* Upper Archipelago Cloud Sea Blanket (with central canyon cutout directly under main island) */}
      <mesh position={[0, -6.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[190, 190, high ? 72 : 36, high ? 72 : 36]} />
        <shaderMaterial
          vertexShader={CLOUD_SEA_VERTEX}
          fragmentShader={CLOUD_SEA_FRAGMENT}
          uniforms={upperCloudSeaUniforms}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Deep Abyss Cumulus Cloud Blanket at y = -15.8 (for the long poetic apple descent at 7.2s - 8.8s) */}
      <mesh position={[0, -15.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[160, 160, high ? 64 : 32, high ? 64 : 32]} />
        <shaderMaterial
          vertexShader={CLOUD_SEA_VERTEX}
          fragmentShader={CLOUD_SEA_FRAGMENT}
          uniforms={deepCloudSeaUniforms}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Multi-layered Painterly Cumulus Cloud Billows across the horizon & deep abyss */}
      <primitive object={cloudPuffMesh} />

      {/* Soft volumetric cloud banks framing the lower foreground corners & horizon */}
      <Clouds material={THREE.MeshBasicMaterial} limit={high ? 220 : 100}>
        {/* Left foreground rose-lavender cumulus cloud bank (matches 0.0s bottom-left frame corner) */}
        <Cloud
          seed={22}
          segments={high ? 32 : 14}
          bounds={[15, 2.8, 12]}
          volume={11}
          color="#e5cdd2"
          opacity={0.74}
          position={[-15.5, -4.4, 5.5]}
          speed={0.04}
        />
        {/* Right foreground warm golden cumulus cloud bank (matches 0.0s bottom-right frame corner) */}
        <Cloud
          seed={33}
          segments={high ? 32 : 14}
          bounds={[15, 2.8, 12]}
          volume={11}
          color="#fae6d0"
          opacity={0.74}
          position={[15.5, -4.4, 5.5]}
          speed={0.04}
        />
        {/* Mid-depth cloud ring around the waterfall plunge zone */}
        <Cloud
          seed={11}
          segments={high ? 36 : 16}
          bounds={[32, 2.4, 28]}
          volume={11.5}
          color="#fae9d8"
          opacity={0.62}
          position={[0, -6.6, -4]}
          speed={0.04}
        />
        {/* Deep abyss cloud cushion where the falling apple dissolves into starburst light (8.0s - 8.8s) */}
        <Cloud
          seed={55}
          segments={high ? 36 : 16}
          bounds={[24, 2.6, 24]}
          volume={12}
          color="#f8e5d4"
          opacity={0.82}
          position={[0, -14.8, 3.5]}
          speed={0.03}
        />
      </Clouds>

      {/* Atmospheric golden pollen / light motes floating gently around the Tree of Life */}
      <points ref={pollenRef} geometry={pollenGeo}>
        <pointsMaterial
          map={glowTex}
          color="#ffe8a8"
          size={0.2}
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
