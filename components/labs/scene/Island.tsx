"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { ISLAND } from "@/lib/labs/treeConfig";
import {
  getCloudPuffTexture,
  getLeafSprigPBR,
  getMeadowPBR,
  getRockPBR,
  getWaterfallTexture,
} from "@/lib/labs/pbrTextures";

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash3(x: number, y: number, z: number): number {
  const h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453123;
  return h - Math.floor(h);
}

function noise3D(x: number, y: number, z: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fy = y - iy;
  const fz = z - iz;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const uz = fz * fz * (3 - 2 * fz);
  const n000 = hash3(ix, iy, iz);
  const n100 = hash3(ix + 1, iy, iz);
  const n010 = hash3(ix, iy + 1, iz);
  const n110 = hash3(ix + 1, iy + 1, iz);
  const n001 = hash3(ix, iy, iz + 1);
  const n101 = hash3(ix + 1, iy, iz + 1);
  const n011 = hash3(ix, iy + 1, iz + 1);
  const n111 = hash3(ix + 1, iy + 1, iz + 1);
  const nx00 = n000 + (n100 - n000) * ux;
  const nx10 = n010 + (n110 - n010) * ux;
  const nx01 = n001 + (n101 - n001) * ux;
  const nx11 = n011 + (n111 - n011) * ux;
  const nxy0 = nx00 + (nx10 - nx00) * uy;
  const nxy1 = nx01 + (nx11 - nx01) * uy;
  return nxy0 + (nxy1 - nxy0) * uz;
}

function fbm3(x: number, y: number, z: number, octaves = 4): number {
  let val = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    val += amp * (noise3D(x * freq, y * freq, z * freq) * 2 - 1);
    freq *= 2.08;
    amp *= 0.5;
  }
  return val;
}

// 7 waterfall angles around 360° (with 3 hero front waterfalls & 2 flank falls matching 0.0s, 2.4s, 6.4s & 7.2s)
const WATERFALL_SPECS = [
  { angle: 1.20, width: 0.62, height: 9.4, speed: 1.42 }, // Front-right main fall
  { angle: 1.66, width: 0.52, height: 10.2, speed: 1.36 }, // Front-center-left main fall
  { angle: 2.04, width: 0.66, height: 9.2, speed: 1.48 }, // Front-left main fall
  { angle: 0.66, width: 0.42, height: 7.8, speed: 1.30 }, // Far-right flank fall
  { angle: 2.54, width: 0.44, height: 8.0, speed: 1.34 }, // Far-left flank fall
  { angle: 3.85, width: 0.56, height: 8.6, speed: 1.40 }, // Back-left fall (180° orbit)
  { angle: 5.15, width: 0.54, height: 8.4, speed: 1.38 }, // Back-right fall (180° orbit)
];

function islandEdgeRadiusAtAngle(theta: number): number {
  return (
    ISLAND.radius *
    (1 +
      Math.sin(theta * 3 + 0.4) * 0.068 +
      Math.cos(theta * 5 - 0.8) * 0.048 +
      Math.sin(theta * 9 + 1.2) * 0.028)
  );
}

const WATERFALL_VERTEX = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  uniform float uTime;
  uniform float uSpeed;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float v = 1.0 - uv.y; // 0 at top lip, 1 at bottom cloud entry
    // Organic water turbulence & wind sway along the long cascade
    float wave = sin(v * 20.0 - uTime * uSpeed * 4.6 + pos.x * 5.0) * 0.036 * smoothstep(0.04, 0.5, v);
    pos.z += wave;
    pos.x += sin(v * 8.0 - uTime * 1.4) * 0.04 * v;

    vec4 wp = modelMatrix * vec4(pos, 1.0);
    vWorldPos = wp.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const WATERFALL_FRAGMENT = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  uniform sampler2D uMap;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uVeilLayer;

  float hash1(float p) {
    return fract(sin(p * 127.1) * 43758.5453123);
  }
  float hash2(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float vnoise1(float x) {
    float i = floor(x);
    float f = fract(x);
    return mix(hash1(i), hash1(i + 1.0), f * f * (3.0 - 2.0 * f));
  }

  void main() {
    float u = vUv.x;
    float v = 1.0 - vUv.y; // 0 = top lip, 1 = dissolves into the cloud sea
    float seed = uSpeed * 17.0 + uVeilLayer * 5.0;

    // Separate water threads: the fall is a bundle of ropes of water, not one white sheet
    float strands = smoothstep(0.32, 0.78, vnoise1(u * 9.0 + seed))
                  * 0.7 + smoothstep(0.45, 0.85, vnoise1(u * 23.0 - seed)) * 0.45;
    // Threads fray and spread as they fall
    strands = mix(strands, 0.55, smoothstep(0.35, 0.95, v) * 0.6);

    // Scrolling streaks accelerate downwards (gravity): v^1.35 stretches the texture lower down
    float fallV = pow(v, 1.35);
    vec2 uv1 = vec2(u, fallV * 2.4 - uTime * uSpeed * 0.62);
    vec2 uv2 = vec2(u * 1.6 - 0.18, fallV * 3.9 - uTime * uSpeed * 1.05);
    float streaks = texture2D(uMap, uv1).a * 0.6 + texture2D(uMap, uv2).a * 0.5;

    float sideDist = sin(u * 3.14159265);
    float sideMask = smoothstep(0.0, 0.42, sideDist);
    float topEntryFade = smoothstep(0.0, 0.04, v);
    float crestFoam = smoothstep(0.01, 0.06, v) * (1.0 - smoothstep(0.06, 0.18, v));
    float bottomFade = 1.0 - smoothstep(0.42 + (streaks - 0.5) * 0.14, 0.95, v);

    vec2 dropGrid = floor(vec2(u * 30.0, v * 48.0 - uTime * uSpeed * 7.0));
    float dropSpark = step(0.95, hash2(dropGrid)) * sideMask * (1.0 - v * 0.6);

    // Translucent water: cool shaded body, warm sunlit foam on the threads, golden mist low down
    vec3 bodyCol = vec3(0.70, 0.78, 0.80);
    vec3 foamCol = vec3(1.0, 0.97, 0.90);
    vec3 mistCol = vec3(0.99, 0.89, 0.76);
    float foamAmt = clamp(streaks * strands * 0.95 + crestFoam * 0.6 + dropSpark * 0.5, 0.0, 1.0);
    vec3 col = mix(bodyCol, foamCol, foamAmt);
    col = mix(col, mistCol, smoothstep(0.4, 0.95, v) * 0.7);

    float baseAlpha = uVeilLayer > 0.5
      ? (0.05 + streaks * 0.22 + dropSpark * 0.3) * (0.4 + smoothstep(0.25, 0.9, v))
      : (0.10 + streaks * 0.55 * strands + crestFoam * 0.3) ;

    float alpha = clamp(baseAlpha * sideMask * topEntryFade * bottomFade, 0.0, 0.85);
    gl_FragColor = vec4(pow(col, vec3(2.2)), alpha);
  }
`;

/**
 * Applies chiseled rock normals (blending flat face normals with smooth vertex normals)
 * so cliff faces and stalactites have crisp, realistic rock facets instead of smooth plastic cones.
 */
function applyChiseledRockNormals(indexedGeo: THREE.BufferGeometry, facetWeight = 0.58): THREE.BufferGeometry {
  indexedGeo.computeVertexNormals();
  const smoothGeo = indexedGeo.toNonIndexed();
  const smoothNorms = smoothGeo.getAttribute("normal").clone();

  // Compute flat face normals on the non-indexed copy
  smoothGeo.computeVertexNormals();
  const flatNorms = smoothGeo.getAttribute("normal");

  const n = new THREE.Vector3();
  const s = new THREE.Vector3();
  for (let i = 0; i < flatNorms.count; i++) {
    n.fromBufferAttribute(flatNorms, i);
    s.fromBufferAttribute(smoothNorms, i);
    n.lerp(s, 1 - facetWeight).normalize();
    flatNorms.setXYZ(i, n.x, n.y, n.z);
  }
  return smoothGeo;
}

/**
 * Builds the craggy, fractured floating-island rock cliff massif + multi-tiered basalt/sandstone
 * stalactite spires matching 0.0s, 2.4s & 7.2s.
 */
function buildCraggyCliffGeometry(quality: "high" | "low"): THREE.BufferGeometry {
  const radialSegs = quality === "high" ? 96 : 56;
  const heightSegs = quality === "high" ? 40 : 24;
  const depth = ISLAND.thickness; // 5.4

  const positions: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  // Realistic sunlit sandstone/basalt cliff palette matching 0.0s, 2.4s & 7.2s
  // Darker weathered rock with moss in the flutes (reference crag reads dark & green-streaked, not tan)
  const cTopMoss = new THREE.Color("#4f6e2a");
  const cSunlitCliff = new THREE.Color("#a3876a");
  const cMidRock = new THREE.Color("#6b5a4b");
  const cShadowRock = new THREE.Color("#3f352d");
  const cDeepSpire = new THREE.Color("#2b241f");
  const cCliffMoss = new THREE.Color("#4a6326");
  const tmpCol = new THREE.Color();

  for (let iy = 0; iy <= heightSegs; iy++) {
    const v = iy / heightSegs; // 0 = top rim (y=0), 1 = bottom apex (y=-depth)
    const y = -v * depth;

    // Stepped rock strata ledges along vertical profile
    const shelf =
      Math.sin(v * Math.PI * 7.0) * 0.055 * (1 - v) +
      Math.cos(v * Math.PI * 13.0) * 0.025 * (1 - v);
    const profile = Math.pow(1 - v, 0.68) + shelf;

    for (let ix = 0; ix <= radialSegs; ix++) {
      const u = ix / radialSegs;
      const theta = u * Math.PI * 2;
      const rimR = islandEdgeRadiusAtAngle(theta);

      // Sharp vertical rock flutes & ridged-multifractal crags (like 0.0s & 7.2s)
      const nRaw = fbm3(Math.cos(theta) * 2.8, v * 4.2, Math.sin(theta) * 2.8, 4);
      const ridged = 1.0 - Math.abs(nRaw) * 1.65;
      const flute =
        Math.sin(theta * 12 + v * 1.6) * 0.13 +
        Math.cos(theta * 21 - v * 2.8) * 0.09 +
        ridged * 0.18;

      const r =
        iy === heightSegs
          ? 0
          : Math.max(0.05, rimR * profile * (1 + flute * (0.38 + v * 0.68)));

      const toothDrop =
        iy > 2 && iy < heightSegs
          ? Math.max(0, Math.sin(theta * 11 + 0.5) * Math.cos(theta * 6 - 0.3)) *
            v *
            (1 - v) *
            1.65
          : 0;

      const vx = Math.cos(theta) * r;
      const vy = y - toothDrop;
      const vz = Math.sin(theta) * r;

      positions.push(vx, vy, vz);
      uvs.push(u * 8, v * 4);

      const sunFacing = Math.max(0, Math.cos(theta - 0.45) * 0.5 + 0.5);
      if (v < 0.07) {
        tmpCol.copy(cTopMoss).lerp(cSunlitCliff, v / 0.07);
      } else if (v < 0.56) {
        tmpCol.copy(cShadowRock).lerp(cSunlitCliff, sunFacing * 0.82);
        tmpCol.lerp(cMidRock, (v - 0.07) / 0.49);
      } else {
        tmpCol.copy(cMidRock).lerp(cDeepSpire, (v - 0.56) / 0.44);
      }
      // Moss creeping down the upper ridges
      if (v < 0.55 && ridged > 0.5) {
        tmpCol.lerp(cCliffMoss, Math.min(0.7, (ridged - 0.5) * 1.8) * (1 - v * 1.6));
      }
      // Deepen crevice ambient occlusion
      if (flute < 0) {
        tmpCol.multiplyScalar(1 - Math.min(0.38, -flute * 0.85));
      }
      colors.push(tmpCol.r, tmpCol.g, tmpCol.b);
    }
  }

  const stride = radialSegs + 1;
  for (let iy = 0; iy < heightSegs; iy++) {
    for (let ix = 0; ix < radialSegs; ix++) {
      const a = iy * stride + ix;
      const b = (iy + 1) * stride + ix;
      const c = (iy + 1) * stride + (ix + 1);
      const d = iy * stride + (ix + 1);
      indices.push(a, b, d, b, c, d);
    }
  }

  const mainCliff = new THREE.BufferGeometry();
  mainCliff.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  mainCliff.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  mainCliff.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  mainCliff.setIndex(indices);
  const chiseledMain = applyChiseledRockNormals(mainCliff, 0.55);
  mainCliff.dispose();

  // 28 sculpted, fractured rock rib buttresses & stalactite crags around the underside (matching 0.0s & 7.2s)
  const parts: THREE.BufferGeometry[] = [chiseledMain];
  const rand = mulberry32(404);
  const spireCount = 28;
  for (let s = 0; s < spireCount; s++) {
    const a = (s / spireCount) * Math.PI * 2 + (rand() - 0.5) * 0.14;
    const tier = s % 3; // 0 = outer rim crag, 1 = mid-underside rib, 2 = deep central stalactite
    const dist =
      tier === 0
        ? ISLAND.radius * (0.68 + rand() * 0.16)
        : tier === 1
          ? ISLAND.radius * (0.44 + rand() * 0.16)
          : ISLAND.radius * (0.22 + rand() * 0.16);

    const spireR = (0.48 + rand() * 0.48) * (tier === 2 ? 0.85 : 1.0);
    const spireH =
      tier === 0 ? 1.85 + rand() * 1.45 : tier === 1 ? 2.4 + rand() * 1.65 : 2.8 + rand() * 1.8;
    const baseY = -0.85 - (1 - dist / ISLAND.radius) * 1.85;

    const cone = new THREE.ConeGeometry(spireR, spireH, 6, 6);
    cone.rotateX(Math.PI);
    const pos = cone.getAttribute("position");
    const cols: number[] = [];
    const sunFacing = Math.max(0, Math.cos(a - 0.45) * 0.5 + 0.5);

    for (let k = 0; k < pos.count; k++) {
      const px = pos.getX(k);
      const py = pos.getY(k);
      const pz = pos.getZ(k);
      // Asymmetric angular rock fracture displacement so it never looks like a geometric cone
      const n1 = noise3D(px * 2.6 + s * 1.7, py * 1.8, pz * 2.6) - 0.5;
      const n2 = noise3D(px * 5.2 - s, py * 3.5, pz * 5.2) - 0.5;
      const scaleXZ = 1 + n1 * 0.48 + n2 * 0.22;
      pos.setXYZ(k, px * scaleXZ, py + n1 * 0.18, pz * scaleXZ * 0.86);

      tmpCol.copy(cShadowRock).lerp(cSunlitCliff, sunFacing * 0.65);
      if (py < 0) tmpCol.lerp(cDeepSpire, Math.min(1, -py / (spireH * 0.6)));
      cols.push(tmpCol.r, tmpCol.g, tmpCol.b);
    }
    cone.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
    cone.translate(Math.cos(a) * dist, baseY - spireH * 0.32, Math.sin(a) * dist);
    const chiseledSpire = applyChiseledRockNormals(cone, 0.68);
    cone.dispose();
    parts.push(chiseledSpire);
  }

  const merged = mergeGeometries(parts, false)!;
  parts.forEach((g) => g.dispose());
  return merged;
}

function isStreamChannelAt(theta: number, t: number): number {
  if (t <= 0.16) return 0;
  let streamFactor = 0;
  for (const wf of WATERFALL_SPECS) {
    let dAngle = Math.abs(((theta - wf.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
    dAngle = Math.abs(dAngle - Math.sin(t * 5 + wf.angle) * 0.052);
    const channelWidth = 0.092 + (1 - t) * 0.044;
    if (dAngle < channelWidth) {
      const f = 1 - dAngle / channelWidth;
      streamFactor = Math.max(streamFactor, f * f);
    }
  }
  return streamFactor;
}

/**
 * Builds the lush undulating meadow top cap with carved stream channels flowing toward the waterfalls.
 */
function buildMeadowCapGeometry(quality: "high" | "low"): THREE.BufferGeometry {
  const rings = quality === "high" ? 32 : 18;
  const segs = quality === "high" ? 96 : 56;

  const positions: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  const cCenterEarth = new THREE.Color("#7d683b");
  const cMidGrass = new THREE.Color("#7da43c");
  const cSunlitGrass = new THREE.Color("#adc954");
  const cRimMoss = new THREE.Color("#567a2a");
  const cStreamBed = new THREE.Color("#d8f3fa");
  const tmpCol = new THREE.Color();

  for (let ir = 0; ir <= rings; ir++) {
    const t = ir / rings; // 0 = center, 1 = cliff rim
    for (let is = 0; is <= segs; is++) {
      const u = is / segs;
      const theta = u * Math.PI * 2;
      const maxR = islandEdgeRadiusAtAngle(theta) * 1.01;
      const r = t * maxR;
      const vx = Math.cos(theta) * r;
      const vz = Math.sin(theta) * r;

      let vy = Math.cos(t * Math.PI * 0.5) * 0.42 - 0.02;
      vy += (noise3D(vx * 0.72, 0, vz * 0.72) - 0.5) * 0.16 * (1 - t * 0.35);

      const streamFactor = isStreamChannelAt(theta, t);
      vy -= streamFactor * 0.105;

      positions.push(vx, vy, vz);
      uvs.push((vx / ISLAND.radius) * 1.8 + 0.5, (vz / ISLAND.radius) * 1.8 + 0.5);

      const sunSide = Math.max(0, Math.cos(theta - 0.4) * 0.5 + 0.5);
      if (t < 0.32) {
        tmpCol.copy(cCenterEarth).lerp(cMidGrass, t / 0.32);
      } else if (t < 0.75) {
        tmpCol.copy(cMidGrass).lerp(cSunlitGrass, sunSide * 0.55);
      } else {
        tmpCol.copy(cMidGrass).lerp(cRimMoss, (t - 0.75) / 0.25);
      }
      if (streamFactor > 0.12) {
        tmpCol.lerp(cStreamBed, Math.min(1, streamFactor * 0.96));
      }
      colors.push(tmpCol.r, tmpCol.g, tmpCol.b);
    }
  }

  const stride = segs + 1;
  for (let ir = 0; ir < rings; ir++) {
    for (let is = 0; is < segs; is++) {
      const a = ir * stride + is;
      const b = (ir + 1) * stride + is;
      const c = (ir + 1) * stride + (is + 1);
      const d = ir * stride + (is + 1);
      indices.push(a, d, b, b, d, c);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Builds a 3D multi-blade grass tuft geometry (7 curved pointed blades per instance)
 */
function buildGrassTuftGeometry(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const bladeCount = 7;
  const cBase = new THREE.Color("#274618");
  const cTip = new THREE.Color("#9bc24a");
  const tmp = new THREE.Color();

  for (let b = 0; b < bladeCount; b++) {
    const a = (b / bladeCount) * Math.PI * 2 + (b % 2) * 0.25;
    const h = 0.105 + (b % 3) * 0.032;
    const w = 0.022;
    const lean = 0.048 + (b % 2) * 0.03;

    const g = new THREE.BufferGeometry();
    const ox = Math.cos(a) * 0.042;
    const oz = Math.sin(a) * 0.042;
    const tx = Math.cos(a) * (0.042 + lean);
    const tz = Math.sin(a) * (0.042 + lean);
    const px = -Math.sin(a) * w;
    const pz = Math.cos(a) * w;

    const verts = new Float32Array([
      ox - px, 0, oz - pz,
      ox + px, 0, oz + pz,
      (ox + tx) * 0.5 - px * 0.5, h * 0.55, (oz + tz) * 0.5 - pz * 0.5,
      (ox + tx) * 0.5 + px * 0.5, h * 0.55, (oz + tz) * 0.5 + pz * 0.5,
      tx, h, tz,
    ]);
    const cols: number[] = [];
    const heights = [0, 0, 0.55, 0.55, 1.0];
    for (const hv of heights) {
      tmp.copy(cBase).lerp(cTip, hv);
      cols.push(tmp.r, tmp.g, tmp.b);
    }
    g.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
    g.setIndex([0, 1, 2, 1, 3, 2, 2, 3, 4]);
    g.computeVertexNormals();
    parts.push(g);
  }

  const merged = mergeGeometries(parts, false)!;
  parts.forEach((p) => p.dispose());
  return merged;
}

/**
 * Builds curved waterfall ribbon geometry that bends smoothly over the cliff lip
 * and cascades down into the cloud sea.
 */
function buildWaterfallRibbonGeometry(width: number, height: number): THREE.BufferGeometry {
  const segsY = 28;
  const segsX = 10;
  const geo = new THREE.PlaneGeometry(width, height, segsX, segsY);
  const pos = geo.getAttribute("position");

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i); // +height/2 at top, -height/2 at bottom
    const v = 0.5 - y / height; // 0 at top lip, 1 at bottom
    let z = 0;
    let ny = y;
    if (v < 0.12) {
      const t = (0.12 - v) / 0.12;
      z = -t * t * 0.56;
      ny = height * 0.5 - v * height * 0.48;
    }
    z += Math.sin(v * Math.PI) * 0.16 + Math.cos((x / width) * Math.PI) * 0.11;
    const spread = 1 + v * 0.42;
    pos.setXYZ(i, x * spread, ny, z);
  }
  geo.computeVertexNormals();
  return geo;
}

function Waterfalls({ quality }: { quality: "high" | "low" }) {
  const baseTex = useMemo(() => getWaterfallTexture(), []);
  const mistTex = useMemo(() => getCloudPuffTexture(), []);
  const coreMats = useRef<(THREE.ShaderMaterial | null)[]>([]);
  const veilMats = useRef<(THREE.ShaderMaterial | null)[]>([]);
  const mistSprites = useRef<(THREE.Sprite | null)[]>([]);

  const falls = useMemo(() => {
    return WATERFALL_SPECS.map((spec) => {
      const r = islandEdgeRadiusAtAngle(spec.angle) * 1.03 + 0.18;
      const x = Math.cos(spec.angle) * r;
      const z = Math.sin(spec.angle) * r;
      const rotY = -spec.angle + Math.PI / 2;
      const coreGeo = buildWaterfallRibbonGeometry(spec.width, spec.height);
      const veilGeo = buildWaterfallRibbonGeometry(spec.width * 1.28, spec.height * 1.04);
      const coreUniforms = {
        uMap: { value: baseTex },
        uTime: { value: 0 },
        uSpeed: { value: spec.speed },
        uVeilLayer: { value: 0.0 },
      };
      const veilUniforms = {
        uMap: { value: baseTex },
        uTime: { value: 0 },
        uSpeed: { value: spec.speed * 1.18 },
        uVeilLayer: { value: 1.0 },
      };
      return {
        ...spec,
        pos: [x, ISLAND.topY - spec.height * 0.5 + 0.12, z] as [number, number, number],
        veilPos: [
          Math.cos(spec.angle) * (r + 0.08),
          ISLAND.topY - spec.height * 0.5 + 0.08,
          Math.sin(spec.angle) * (r + 0.08),
        ] as [number, number, number],
        lipMistPos: [
          Math.cos(spec.angle) * (r * 0.98),
          ISLAND.topY - 0.1,
          Math.sin(spec.angle) * (r * 0.98),
        ] as [number, number, number],
        baseMistPos: [
          Math.cos(spec.angle) * (r + 0.38),
          ISLAND.topY - spec.height * 0.72,
          Math.sin(spec.angle) * (r + 0.38),
        ] as [number, number, number],
        rotY,
        coreGeo,
        veilGeo,
        coreUniforms,
        veilUniforms,
      };
    });
  }, [baseTex]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    falls.forEach((f, i) => {
      const cm = coreMats.current[i];
      if (cm) cm.uniforms.uTime.value = t;
      const vm = veilMats.current[i];
      if (vm) vm.uniforms.uTime.value = t;
      const sp = mistSprites.current[i];
      if (sp) {
        const pulse = 1 + Math.sin(t * 1.8 + i * 1.4) * 0.14;
        sp.scale.set(f.width * 3.2 * pulse, f.width * 2.2 * pulse, 1);
      }
    });
  });

  return (
    <group>
      {falls.map((f, i) => (
        <group key={i}>
          {/* Inner Dense Waterfall Core */}
          <mesh position={f.pos} rotation={[0, f.rotY, 0]} geometry={f.coreGeo}>
            <shaderMaterial
              ref={(m) => {
                coreMats.current[i] = m;
              }}
              vertexShader={WATERFALL_VERTEX}
              fragmentShader={WATERFALL_FRAGMENT}
              uniforms={f.coreUniforms}
              transparent
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Outer Gossamer Spray Veil with Sparkling Droplets */}
          <mesh position={f.veilPos} rotation={[0, f.rotY, 0]} geometry={f.veilGeo}>
            <shaderMaterial
              ref={(m) => {
                veilMats.current[i] = m;
              }}
              vertexShader={WATERFALL_VERTEX}
              fragmentShader={WATERFALL_FRAGMENT}
              uniforms={f.veilUniforms}
              transparent
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Soft spray mist at the cliff lip crest */}
          <sprite position={f.lipMistPos} scale={[f.width * 1.55, f.width * 0.9, 1]}>
            <spriteMaterial
              map={mistTex}
              color="#fffaf0"
              transparent
              opacity={0.45}
              depthWrite={false}
            />
          </sprite>

          {/* Volumetric cloud-spray plume where the waterfall plunges into the cloud sea */}
          <sprite
            ref={(s) => {
              mistSprites.current[i] = s;
            }}
            position={f.baseMistPos}
            scale={[f.width * 3.2, f.width * 2.2, 1]}
          >
            <spriteMaterial
              map={mistTex}
              color="#fff6e8"
              transparent
              opacity={quality === "high" ? 0.68 : 0.55}
              depthWrite={false}
            />
          </sprite>
        </group>
      ))}
    </group>
  );
}

export default function Island({ quality = "high" }: { quality?: "high" | "low" }) {
  const cliffGeo = useMemo(() => buildCraggyCliffGeometry(quality), [quality]);
  const meadowGeo = useMemo(() => buildMeadowCapGeometry(quality), [quality]);
  const rockPBR = useMemo(() => getRockPBR(), []);
  const meadowPBR = useMemo(() => getMeadowPBR(), []);
  const leafPBR = useMemo(() => getLeafSprigPBR(), []);

  // Sculpted river boulders, pebbles, cliff-draped moss/vine curtains & 1150 instanced 3D grass tufts
  const { boulders, pebbles, rimFoliage, grassMesh } = useMemo(() => {
    const rand = mulberry32(19);
    const rockCount = quality === "high" ? 68 : 32;
    const baseRockGeo = new THREE.DodecahedronGeometry(0.21, 1);
    const rPos = baseRockGeo.getAttribute("position");
    for (let k = 0; k < rPos.count; k++) {
      const rx = rPos.getX(k);
      const ry = rPos.getY(k);
      const rz = rPos.getZ(k);
      const n = 0.8 + hash3(rx * 5, ry * 5, rz * 5) * 0.38;
      rPos.setXYZ(k, rx * n, ry * n * 0.72, rz * n);
    }
    const rockGeo = applyChiseledRockNormals(baseRockGeo, 0.65);
    baseRockGeo.dispose();

    const boulderMesh = new THREE.InstancedMesh(
      rockGeo,
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        map: rockPBR.map,
        normalMap: rockPBR.normalMap,
        roughness: 0.88,
        metalness: 0.03,
      }),
      rockCount,
    );
    const dummy = new THREE.Object3D();
    const col = new THREE.Color();
    const rockPalette = ["#9e8a78", "#7e6e60", "#b59f8c", "#6c5d51", "#788456"];

    // First 14 boulders flank the 7 waterfall lips so water pours between real rocks!
    let bi = 0;
    for (const wf of WATERFALL_SPECS) {
      for (const side of [-1, 1]) {
        if (bi >= rockCount) break;
        const a = wf.angle + side * (wf.width * 0.11);
        const r = islandEdgeRadiusAtAngle(a) * 0.94;
        dummy.position.set(Math.cos(a) * r, 0.02, Math.sin(a) * r);
        dummy.rotation.set(rand() * 0.5, a, rand() * 0.5);
        dummy.scale.set(1.15 + rand() * 0.45, 0.65 + rand() * 0.35, 1.05 + rand() * 0.4);
        dummy.updateMatrix();
        boulderMesh.setMatrixAt(bi, dummy.matrix);
        col.set(rockPalette[bi % rockPalette.length]);
        boulderMesh.setColorAt(bi, col);
        bi++;
      }
    }
    for (; bi < rockCount; bi++) {
      const a = rand() * Math.PI * 2;
      const r = islandEdgeRadiusAtAngle(a) * (0.18 + rand() * 0.74);
      const y = Math.cos((r / ISLAND.radius) * Math.PI * 0.5) * 0.34 - 0.01;
      dummy.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
      dummy.rotation.set((rand() - 0.5) * 0.4, rand() * 3, (rand() - 0.5) * 0.4);
      const sx = 0.6 + rand() * 1.25;
      const sy = 0.35 + rand() * 0.5;
      const sz = 0.6 + rand() * 1.05;
      dummy.scale.set(sx, sy, sz);
      dummy.updateMatrix();
      boulderMesh.setMatrixAt(bi, dummy.matrix);
      col.set(rockPalette[bi % rockPalette.length]);
      boulderMesh.setColorAt(bi, col);
    }
    boulderMesh.instanceMatrix.needsUpdate = true;
    if (boulderMesh.instanceColor) boulderMesh.instanceColor.needsUpdate = true;
    boulderMesh.castShadow = true;
    boulderMesh.receiveShadow = true;

    // 140 small river pebbles & root-collar stones scattered along stream banks & root bases
    const pebbleCount = quality === "high" ? 140 : 60;
    const pebbleMesh = new THREE.InstancedMesh(
      rockGeo,
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        map: rockPBR.map,
        normalMap: rockPBR.normalMap,
        roughness: 0.84,
      }),
      pebbleCount,
    );
    for (let i = 0; i < pebbleCount; i++) {
      const a = rand() * Math.PI * 2;
      const r = islandEdgeRadiusAtAngle(a) * (0.15 + rand() * 0.78);
      const y = Math.cos((r / ISLAND.radius) * Math.PI * 0.5) * 0.36 - 0.02;
      dummy.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
      dummy.rotation.set(rand() * 2, rand() * 3, rand() * 2);
      const s = 0.18 + rand() * 0.28;
      dummy.scale.set(s * 1.2, s * 0.65, s);
      dummy.updateMatrix();
      pebbleMesh.setMatrixAt(i, dummy.matrix);
      col.set(rockPalette[(i + 2) % rockPalette.length]);
      pebbleMesh.setColorAt(i, col);
    }
    pebbleMesh.instanceMatrix.needsUpdate = true;
    if (pebbleMesh.instanceColor) pebbleMesh.instanceColor.needsUpdate = true;

    // Botanical cliff-draping ivy, moss & hanging vine curtains along the island lip AND down the cliff crevices (matching 0.0s, 6.4s & 7.2s)
    const p1 = new THREE.PlaneGeometry(0.84, 0.84);
    p1.rotateX(-0.32);
    const p2 = new THREE.PlaneGeometry(0.84, 0.84);
    p2.rotateY(Math.PI * 0.5);
    p2.rotateZ(0.26);
    const ivyClusterGeo = mergeGeometries([p1, p2], false)!;
    p1.dispose();
    p2.dispose();

    const bushCount = quality === "high" ? 165 : 75;
    const bushMesh = new THREE.InstancedMesh(
      ivyClusterGeo,
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        map: leafPBR.map,
        normalMap: leafPBR.normalMap,
        emissive: new THREE.Color("#364d14"),
        emissiveIntensity: 0.2,
        alphaTest: 0.34,
        side: THREE.DoubleSide,
        roughness: 0.75,
        metalness: 0.02,
      }),
      bushCount,
    );
    const greenPalette = ["#567d26", "#45681d", "#6c9634", "#3b5918", "#7ba63c"];
    for (let i = 0; i < bushCount; i++) {
      const a = (i / bushCount) * Math.PI * 2 + (rand() - 0.5) * 0.14;
      const edgeR = islandEdgeRadiusAtAngle(a);
      const mode = i % 3; // 0 = rim bush, 1 = upper cliff hanging ivy, 2 = deep cliff crevice moss (like 7.2s!)
      let r = edgeR * 0.82;
      let y = 0.06;
      let sy = 0.45;
      if (mode === 1) {
        r = edgeR * (0.94 + rand() * 0.04);
        y = -0.18 - rand() * 0.95;
        sy = 0.65 + rand() * 0.75;
      } else if (mode === 2) {
        const depthT = 0.18 + rand() * 0.46; // y from -1.0 down to -3.4
        y = -depthT * ISLAND.thickness;
        r = edgeR * Math.pow(1 - depthT, 0.68) * (0.92 + rand() * 0.08);
        sy = 0.72 + rand() * 0.85;
      } else {
        r = edgeR * (0.68 + rand() * 0.24);
        y = 0.06 + rand() * 0.1;
        sy = 0.38 + rand() * 0.34;
      }
      dummy.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
      dummy.rotation.set(
        (rand() - 0.5) * 0.55,
        rand() * Math.PI * 2,
        (rand() - 0.5) * 0.55,
      );
      const sx = 0.48 + rand() * 0.56;
      dummy.scale.set(sx, sy, sx);
      dummy.updateMatrix();
      bushMesh.setMatrixAt(i, dummy.matrix);
      col.set(greenPalette[(rand() * greenPalette.length) | 0]);
      bushMesh.setColorAt(i, col);
    }
    bushMesh.instanceMatrix.needsUpdate = true;
    if (bushMesh.instanceColor) bushMesh.instanceColor.needsUpdate = true;

    // 1150 Instanced 3D Grass Tuft Blades across the meadow & around roots
    const grassCount = quality === "high" ? 1150 : 450;
    const tuftGeo = buildGrassTuftGeometry();
    const gMesh = new THREE.InstancedMesh(
      tuftGeo,
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        emissive: "#2f4a12",
        emissiveIntensity: 0.12,
        roughness: 0.72,
        side: THREE.DoubleSide,
      }),
      grassCount,
    );
    const grassTones = ["#d2ec78", "#b8da5e", "#9ec448", "#84aa38", "#6d922b"];
    let gi = 0;
    for (let i = 0; i < grassCount * 1.6 && gi < grassCount; i++) {
      const a = rand() * Math.PI * 2;
      const t = 0.16 + Math.sqrt(rand()) * 0.8;
      if (isStreamChannelAt(a, t) > 0.08) continue;
      const maxR = islandEdgeRadiusAtAngle(a);
      const r = t * maxR;
      const vx = Math.cos(a) * r;
      const vz = Math.sin(a) * r;
      const vy =
        Math.cos(t * Math.PI * 0.5) * 0.42 -
        0.025 +
        (noise3D(vx * 0.72, 0, vz * 0.72) - 0.5) * 0.16 * (1 - t * 0.35);

      dummy.position.set(vx, vy, vz);
      dummy.rotation.set(0, rand() * Math.PI * 2, 0);
      const s = 0.58 + rand() * 0.72;
      dummy.scale.set(s, s * (0.75 + rand() * 0.48), s);
      dummy.updateMatrix();
      gMesh.setMatrixAt(gi, dummy.matrix);
      col.set(grassTones[(rand() * grassTones.length) | 0]);
      gMesh.setColorAt(gi, col);
      gi++;
    }
    gMesh.count = gi;
    gMesh.instanceMatrix.needsUpdate = true;
    if (gMesh.instanceColor) gMesh.instanceColor.needsUpdate = true;

    return {
      boulders: boulderMesh,
      pebbles: pebbleMesh,
      rimFoliage: bushMesh,
      grassMesh: gMesh,
    };
  }, [quality, rockPBR, leafPBR]);

  return (
    <group>
      {/* Sculpted chiseled cliff rock underside & fractured stalactite spires */}
      <mesh geometry={cliffGeo} castShadow receiveShadow>
        <meshStandardMaterial
          map={rockPBR.map}
          normalMap={rockPBR.normalMap}
          normalScale={new THREE.Vector2(1.45, 1.45)}
          roughnessMap={rockPBR.roughnessMap}
          roughness={0.86}
          metalness={0.04}
          side={THREE.DoubleSide}
          vertexColors
        />
      </mesh>

      {/* Undulating mossy meadow top with shimmering stream channels */}
      <mesh geometry={meadowGeo} receiveShadow>
        <meshStandardMaterial
          map={meadowPBR.map}
          normalMap={meadowPBR.normalMap}
          normalScale={new THREE.Vector2(0.95, 0.95)}
          roughness={0.78}
          metalness={0.04}
          side={THREE.DoubleSide}
          vertexColors
        />
      </mesh>

      <primitive object={grassMesh} />
      <primitive object={boulders} />
      <primitive object={pebbles} />
      <primitive object={rimFoliage} />
      <Waterfalls quality={quality} />
    </group>
  );
}
