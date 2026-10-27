"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getCloudPuffTexture } from "@/lib/labs/pbrTextures";

/**
 * Billboarded cumulus heaps for the cloud sea.
 *
 * Camera-facing sprites can't self-shade, so every puff carries a "shade" value from its height
 * inside its heap (base → crown) plus a sun-side bias. The fragment shader maps that to a mauve
 * shadow → warm cream ramp, which gives the reference's cauliflower tops and darker undersides.
 * Fog is applied manually (exp2) so distant heaps melt into the golden haze.
 */

type Heap = {
  center: [number, number, number];
  radius: number;
  height: number;
  puffs: number;
  size: number;
  /** Soft radial puff instead of lobed cauliflower (deep, out-of-focus cloud floor) */
  soft?: boolean;
};

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildHeaps(high: boolean): Heap[] {
  const heaps: Heap[] = [
    // Foreground banks framing the lower corners of the establishing shot
    { center: [-12, -3.6, 4], radius: 6.5, height: 3.6, puffs: 34, size: 4.2 },
    { center: [-6.8, -5.4, 9], radius: 4.5, height: 2.6, puffs: 22, size: 3.4 },
    { center: [12, -4.2, 5], radius: 6.0, height: 3.2, puffs: 30, size: 4.0 },
    { center: [7.2, -5.8, 9.5], radius: 4.2, height: 2.4, puffs: 20, size: 3.2 },
    // Below the main island so its waterfalls plunge into cloud
    { center: [0, -7.4, 0], radius: 7.5, height: 2.6, puffs: 30, size: 4.4 },
  ];
  const golden = 2.39996;
  const ring = high ? 26 : 14;
  for (let i = 0; i < ring; i++) {
    const a = i * golden + 0.6;
    const r = 10 + (i / ring) * 34;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r - 4;
    if (z > 5 && Math.abs(x) < 9) continue; // keep the camera corridor clear
    const far = r > 26;
    heaps.push({
      center: [x, -6.6 - (i % 3) * 0.6, z],
      radius: far ? 9 : 6,
      height: far ? 3.2 : 2.8,
      puffs: far ? 18 : 22,
      size: far ? 6.5 : 4.6,
    });
  }
  // Deep cloud floor far below the island: the falling apple sinks into it
  for (let i = 0; i < (high ? 12 : 6); i++) {
    const a = i * golden;
    const r = 2 + Math.sqrt(i / 12) * 15;
    heaps.push({
      center: [Math.cos(a) * r, -16.8, Math.sin(a) * r + 3],
      radius: 6,
      height: 2.4,
      puffs: 18,
      size: 4.4,
      soft: true,
    });
  }
  return heaps;
}

const VERTEX = /* glsl */ `
  attribute vec3 aCenter;
  attribute float aSize;
  attribute float aShade;
  attribute float aSeed;
  attribute float aSoft;
  uniform float uTime;
  varying float vSoft;
  varying vec2 vUv;
  varying float vShade;
  varying float vSeed;
  varying float vViewDepth;

  void main() {
    vUv = uv;
    vShade = aShade;
    vSeed = aSeed;
    vSoft = aSoft;
    vec3 c = aCenter;
    c.x += sin(uTime * 0.05 + aSeed * 6.0) * 0.35;
    float breathe = 1.0 + sin(uTime * 0.12 + aSeed * 11.0) * 0.04;
    vec4 mv = viewMatrix * vec4(c, 1.0);
    // Screen-aligned billboard; only a small tilt per puff so the baked sun direction stays consistent
    float rot = (aSeed - 0.5) * 0.5;
    vec2 p = position.xy;
    p = vec2(p.x * cos(rot) - p.y * sin(rot), p.x * sin(rot) + p.y * cos(rot));
    mv.xy += p * aSize * breathe;
    vViewDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform sampler2D uMap;
  uniform sampler2D uSoftMap;
  uniform vec3 uShadow;
  uniform vec3 uMid;
  uniform vec3 uLit;
  uniform vec3 uFogColor;
  uniform float uFogDensity;
  uniform float uOpacity;
  varying vec2 vUv;
  varying float vShade;
  varying float vSeed;
  varying float vViewDepth;
  varying float vSoft;

  void main() {
    vec4 tex = mix(texture2D(uMap, vUv), vec4(0.6, 0.6, 0.6, texture2D(uSoftMap, vUv).a), vSoft);
    // Heap-level shade (height in heap) + per-lobe self-shading baked in the sprite
    float inner = clamp(vShade * 0.8 + (tex.r - 0.35) * 0.4 + 0.06, 0.0, 1.0);
    vec3 col = mix(uShadow, uMid, smoothstep(0.0, 0.55, inner));
    col = mix(col, uLit, smoothstep(0.45, 1.0, inner));
    float fogF = 1.0 - exp(-uFogDensity * uFogDensity * vViewDepth * vViewDepth);
    col = mix(col, uFogColor, clamp(fogF, 0.0, 1.0));
    float a = tex.a * uOpacity;
    if (a < 0.01) discard;
    gl_FragColor = vec4(pow(col, vec3(2.2)), a);
  }
`;

let cachedCumulusTex: THREE.Texture | null = null;

/**
 * Cauliflower puff sprite: overlapping soft lobes. R = per-lobe self-shading (lit from upper-right,
 * darker in the folds), A = coverage with soft edges. A plain radial gradient turns into milky fog
 * once dozens overlap; lobes keep the billowy cumulus texture.
 */
function getCumulusTexture(): THREE.Texture {
  if (cachedCumulusTex) return cachedCumulusTex;
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const rand = mulberry32(77);
  const lobes: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < 22; i++) {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand()) * 0.26;
    const r = (0.11 + rand() * 0.12) * (1 - d * 1.1);
    lobes.push({ x: 0.5 + Math.cos(a) * d, y: 0.55 + Math.min(0.1, Math.sin(a) * d * 0.8), r });
  }
  const img = ctx.createImageData(size, size);
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const u = px / size;
      const v = py / size;
      let c = 0;
      let s = 0;
      for (const l of lobes) {
        const dx = (u - l.x) / l.r;
        const dy = (v - l.y) / l.r;
        const d2 = dx * dx + dy * dy;
        if (d2 >= 1) continue;
        const k = 1 - d2;
        const lobeCover = Math.min(1, k * 1.15);
        const lit = Math.max(0, dx * 0.45 - dy * 0.5 + Math.sqrt(k) * 0.62);
        if (lobeCover > c * 0.6) s = s * (1 - lobeCover) + lit * lobeCover;
        c = Math.max(c, lobeCover);
      }
      const i = (py * size + px) * 4;
      const sv = Math.min(1, s) * 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = sv;
      img.data[i + 3] = Math.pow(c, 2.0) * 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.NoColorSpace;
  tex.needsUpdate = true;
  cachedCumulusTex = tex;
  return tex;
}

export default function Cumulus({ quality = "high" }: { quality?: "high" | "low" }) {
  const high = quality === "high";
  const tex = useMemo(() => getCumulusTexture(), []);
  const softTex = useMemo(() => getCloudPuffTexture(), []);

  const meshRef = useRef<THREE.Mesh>(null);
  const mesh = useMemo(() => {
    const heaps = buildHeaps(high);
    const rand = mulberry32(9001);
    const puffs: { c: THREE.Vector3; size: number; shade: number; seed: number; soft: number }[] = [];
    for (const h of heaps) {
      // Distinct heaps: the shaded gaps between them are what reads as cumulus depth
      const n = Math.ceil((high ? h.puffs : h.puffs * 0.6) * 1.2);
      for (let k = 0; k < n; k++) {
        const a = rand() * Math.PI * 2;
        const rr = Math.sqrt(rand());
        const r = rr * h.radius;
        // Dome profile: tall in the middle, flat skirts
        const yRel = (1 - rr * rr) * h.height * (0.35 + rand() * 0.65);
        const sunSide = Math.cos(a) * 0.12; // +x is toward the sun
        puffs.push({
          c: new THREE.Vector3(
            h.center[0] + Math.cos(a) * r,
            h.center[1] + yRel,
            h.center[2] + Math.sin(a) * r * 0.7,
          ),
          size: h.size * (0.55 + rand() * 0.5) * (1 - rr * 0.35),
          shade: Math.min(1, Math.max(0, (yRel / h.height) * 0.85 + 0.12 + sunSide + rand() * 0.1)),
          seed: rand(),
          soft: h.soft ? 1 : 0,
        });
      }
    }
    // One instanced draw can't depth-sort per frame; back-to-front from the hero view is close enough
    const eye = new THREE.Vector3(0, 2.6, 23.5);
    puffs.sort((p, q) => q.c.distanceToSquared(eye) - p.c.distanceToSquared(eye));
    const centers = puffs.flatMap((p) => [p.c.x, p.c.y, p.c.z]);
    const sizes = puffs.map((p) => p.size);
    const shades = puffs.map((p) => p.shade);
    const seeds = puffs.map((p) => p.seed);
    const softs = puffs.map((p) => p.soft);
    const count = sizes.length;
    const base = new THREE.PlaneGeometry(1, 1);
    const geo = new THREE.InstancedBufferGeometry();
    geo.index = base.index;
    geo.setAttribute("position", base.getAttribute("position"));
    geo.setAttribute("uv", base.getAttribute("uv"));
    geo.setAttribute("aCenter", new THREE.InstancedBufferAttribute(new Float32Array(centers), 3));
    geo.setAttribute("aSize", new THREE.InstancedBufferAttribute(new Float32Array(sizes), 1));
    geo.setAttribute("aShade", new THREE.InstancedBufferAttribute(new Float32Array(shades), 1));
    geo.setAttribute("aSeed", new THREE.InstancedBufferAttribute(new Float32Array(seeds), 1));
    geo.setAttribute("aSoft", new THREE.InstancedBufferAttribute(new Float32Array(softs), 1));
    geo.instanceCount = count;

    const u = {
      uMap: { value: tex },
      uSoftMap: { value: softTex },
      uTime: { value: 0 },
      uShadow: { value: new THREE.Color(0.62, 0.58, 0.67) },
      uMid: { value: new THREE.Color(0.91, 0.84, 0.8) },
      uLit: { value: new THREE.Color(1.0, 0.92, 0.8) },
      uFogColor: { value: new THREE.Color(0.94, 0.82, 0.68) },
      uFogDensity: { value: 0.0105 },
      uOpacity: { value: 0.9 },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms: u,
      transparent: true,
      depthWrite: false,
    });
    const m = new THREE.Mesh(geo, mat);
    m.frustumCulled = false;
    // After the cloud-sea sheet (which writes depth), so heaps above it aren't painted over
    m.renderOrder = 2;
    return m;
  }, [high, tex, softTex]);

  useFrame((state) => {
    const m = meshRef.current;
    if (m) (m.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
  });

  return <primitive ref={meshRef} object={mesh} />;
}
