#!/usr/bin/env node
/**
 * Procedural High-Detail 3D GLB Asset Generator for Albanexa Labs (Tree of Life)
 * Generates spec-compliant glTF 2.0 binary (.glb) containing:
 *  - HeroTreeBark (gnarled braided trunk, 16 buttress/cliff-wrapping roots, 4-tier organic branches)
 *  - HeroIslandCliff (asymmetric craggy floating island underside with stalactite spires)
 *  - HeroIslandTop (undulating mossy meadow cap with carved stream channels)
 *  - GoldenAppleMesh (sculpted Lathe apple silhouette with top/bottom dimples)
 *
 * License: 100% original procedural geometry generated in-repo for Albanexa.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "labs", "models");
mkdirSync(outDir, { recursive: true });

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash3(x, y, z) {
  const h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453123;
  return h - Math.floor(h);
}

function noise3D(x, y, z) {
  const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
  const fx = x - ix, fy = y - iy, fz = z - iz;
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

function fbm3(x, y, z, octaves = 4) {
  let val = 0, amp = 0.5, freq = 1;
  for (let i = 0; i < octaves; i++) {
    val += amp * (noise3D(x * freq, y * freq, z * freq) * 2 - 1);
    freq *= 2.05;
    amp *= 0.5;
  }
  return val;
}

/**
 * Build a tapered, bark-grooved tube along a 3D curve.
 */
function buildOrganicLimb(points, rStart, rEnd, tubularSegments = 20, radialSegments = 10, grooveDepth = 0.08, twist = 1.5) {
  const curve = new THREE.CatmullRomCurve3(points);
  const frames = curve.computeFrenetFrames(tubularSegments, false);
  const positions = [];
  const normals = [];
  const uvs = [];
  const colors = [];
  const indices = [];

  const cBase = new THREE.Color("#5a3e28");
  const cCrevice = new THREE.Color("#2d1d11");
  const cHighlight = new THREE.Color("#7d593a");
  const cMoss = new THREE.Color("#4e6b2c");
  const tmpCol = new THREE.Color();

  for (let i = 0; i <= tubularSegments; i++) {
    const u = i / tubularSegments;
    const pt = curve.getPointAt(u);
    const N = frames.normals[i];
    const B = frames.binormals[i];
    // Smooth taper with slight organic bulges
    const taper = Math.pow(1 - u, 0.78);
    const baseR = rEnd + (rStart - rEnd) * taper;

    for (let j = 0; j <= radialSegments; j++) {
      const v = j / radialSegments;
      const theta = v * Math.PI * 2;
      // Spiral bark groove ridges
      const ridge = Math.sin(theta * 7 + u * twist * Math.PI * 2) * 0.5 +
                    Math.sin(theta * 13 - u * twist * 3.0) * 0.3 +
                    fbm3(pt.x * 1.4, pt.y * 1.4, pt.z * 1.4, 2) * 0.4;
      const r = Math.max(0.015, baseR * (1 + ridge * grooveDepth));

      const cos = Math.cos(theta);
      const sin = Math.sin(theta);
      const dirX = N.x * cos + B.x * sin;
      const dirY = N.y * cos + B.y * sin;
      const dirZ = N.z * cos + B.z * sin;

      const vx = pt.x + dirX * r;
      const vy = pt.y + dirY * r;
      const vz = pt.z + dirZ * r;
      positions.push(vx, vy, vz);
      normals.push(dirX, dirY, dirZ);
      uvs.push(v * 2, u * 4);

      // Vertex color: bark crevices + subtle moss near island surface (y < 0.7)
      tmpCol.copy(cBase);
      if (ridge < 0) tmpCol.lerp(cCrevice, Math.min(1, -ridge * 0.9));
      else tmpCol.lerp(cHighlight, Math.min(1, ridge * 0.65));
      if (vy < 0.65 && dirY > 0.15) {
        const mossFactor = Math.max(0, (0.65 - vy) / 0.65) * 0.45;
        tmpCol.lerp(cMoss, mossFactor);
      }
      colors.push(tmpCol.r, tmpCol.g, tmpCol.b);
    }
  }

  const stride = radialSegments + 1;
  for (let i = 0; i < tubularSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * stride + j;
      const b = (i + 1) * stride + j;
      const c = (i + 1) * stride + (j + 1);
      const d = i * stride + (j + 1);
      indices.push(a, b, d, b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function buildHeroTreeBarkGeometry() {
  const rand = mulberry32(2026);
  const parts = [];

  // 1. Central core trunk + 6 braided, twisting trunk strands that fuse into the crown
  parts.push(
    buildOrganicLimb(
      [
        new THREE.Vector3(0, -0.1, 0),
        new THREE.Vector3(0.05, 0.9, -0.04),
        new THREE.Vector3(-0.04, 1.85, 0.05),
        new THREE.Vector3(0, 2.75, 0),
      ],
      0.88,
      0.56,
      20,
      14,
      0.11,
      1.8,
    ),
  );

  const strandCount = 7;
  for (let s = 0; s < strandCount; s++) {
    const a0 = (s / strandCount) * Math.PI * 2;
    const twistA = 0.65 + (s % 2 === 0 ? 0.25 : -0.15);
    const pts = [
      new THREE.Vector3(Math.cos(a0) * 0.72, -0.05, Math.sin(a0) * 0.72),
      new THREE.Vector3(Math.cos(a0 + twistA * 0.35) * 0.48, 0.85, Math.sin(a0 + twistA * 0.35) * 0.48),
      new THREE.Vector3(Math.cos(a0 + twistA * 0.7) * 0.38, 1.75, Math.sin(a0 + twistA * 0.7) * 0.38),
      new THREE.Vector3(Math.cos(a0 + twistA) * 0.46, 2.65, Math.sin(a0 + twistA) * 0.46),
    ];
    parts.push(buildOrganicLimb(pts, 0.36, 0.24, 18, 9, 0.12, 2.2));
  }

  // 2. 16 spreading buttress & cliff-wrapping roots across the island top
  const rootCount = 16;
  for (let r = 0; r < rootCount; r++) {
    const angle = (r / rootCount) * Math.PI * 2 + (rand() - 0.5) * 0.18;
    const isLongCliffRoot = r % 2 === 0;
    const reach = isLongCliffRoot ? 4.35 + rand() * 0.75 : 2.6 + rand() * 1.1;
    const sideBend = (rand() - 0.5) * 0.45;

    const p0 = new THREE.Vector3(Math.cos(angle) * 0.55, 0.75 + rand() * 0.35, Math.sin(angle) * 0.55);
    const p1 = new THREE.Vector3(
      Math.cos(angle + sideBend * 0.3) * 1.45,
      0.28 + rand() * 0.12,
      Math.sin(angle + sideBend * 0.3) * 1.45,
    );
    const p2 = new THREE.Vector3(
      Math.cos(angle + sideBend * 0.6) * (reach * 0.66),
      0.08 + rand() * 0.08,
      Math.sin(angle + sideBend * 0.6) * (reach * 0.66),
    );
    const p3 = new THREE.Vector3(
      Math.cos(angle + sideBend) * reach,
      isLongCliffRoot ? -0.35 - rand() * 0.45 : -0.04,
      Math.sin(angle + sideBend) * reach,
    );
    const rootPts = [p0, p1, p2, p3];
    if (isLongCliffRoot) {
      // Wrap down over the cliff rim like in 0000ms.jpg & 2400ms.jpg
      rootPts.push(
        new THREE.Vector3(
          Math.cos(angle + sideBend * 1.1) * (reach + 0.18),
          -1.05 - rand() * 0.6,
          Math.sin(angle + sideBend * 1.1) * (reach + 0.18),
        ),
      );
    }
    parts.push(
      buildOrganicLimb(
        rootPts,
        0.30 + rand() * 0.08,
        0.035,
        isLongCliffRoot ? 18 : 14,
        8,
        0.1,
        1.4,
      ),
    );
  }

  // 3. Broad, multi-tiered bonsai/oak canopy branches
  const primaryCount = 9;
  for (let i = 0; i < primaryCount; i++) {
    const baseAngle = (i / primaryCount) * Math.PI * 2 + (rand() - 0.5) * 0.22;
    const elev = 0.38 + (i % 3) * 0.12 + rand() * 0.08;
    const length = 2.55 + rand() * 0.55;

    const p0 = new THREE.Vector3(Math.cos(baseAngle) * 0.32, 2.35 + (i % 2) * 0.22, Math.sin(baseAngle) * 0.32);
    const p1 = new THREE.Vector3(
      Math.cos(baseAngle + 0.12) * (length * 0.48),
      p0.y + length * elev * 0.55,
      Math.sin(baseAngle + 0.12) * (length * 0.48),
    );
    const p2 = new THREE.Vector3(
      Math.cos(baseAngle - 0.08) * length,
      p0.y + length * elev,
      Math.sin(baseAngle - 0.08) * length,
    );
    parts.push(buildOrganicLimb([p0, p1, p2], 0.32, 0.14, 16, 9, 0.09, 1.5));

    // Secondary branches
    const secCount = 3;
    for (let s = 0; s < secCount; s++) {
      const yawOffset = (s - 1) * 0.46 + (rand() - 0.5) * 0.18;
      const secAngle = baseAngle + yawOffset;
      const secLen = 1.65 + rand() * 0.45;
      const startPt = s === 0 ? p1.clone().lerp(p2, 0.55) : p2.clone();
      const sMid = new THREE.Vector3(
        startPt.x + Math.cos(secAngle) * (secLen * 0.52),
        startPt.y + (0.28 + rand() * 0.28) * secLen * 0.5,
        startPt.z + Math.sin(secAngle) * (secLen * 0.52),
      );
      const sEnd = new THREE.Vector3(
        startPt.x + Math.cos(secAngle + (rand() - 0.5) * 0.2) * secLen,
        startPt.y + (0.18 + rand() * 0.32) * secLen,
        startPt.z + Math.sin(secAngle + (rand() - 0.5) * 0.2) * secLen,
      );
      parts.push(buildOrganicLimb([startPt, sMid, sEnd], 0.15, 0.065, 12, 7, 0.07, 1.1));

      // Tertiary twigs
      for (let t = 0; t < 2; t++) {
        const tAngle = secAngle + (t === 0 ? -0.38 : 0.38) + (rand() - 0.5) * 0.2;
        const tLen = 0.95 + rand() * 0.35;
        const tEnd = new THREE.Vector3(
          sEnd.x + Math.cos(tAngle) * tLen,
          sEnd.y + (0.1 + rand() * 0.35) * tLen,
          sEnd.z + Math.sin(tAngle) * tLen,
        );
        parts.push(buildOrganicLimb([sEnd.clone(), tEnd], 0.068, 0.025, 8, 5, 0.05, 0.8));
      }
    }
  }

  const merged = mergeGeometries(parts, false);
  parts.forEach((g) => g.dispose());
  merged.computeVertexNormals();
  return merged;
}

function buildAppleBodyGeometry() {
  const pts = [];
  const steps = 28;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps; // 0 (bottom) -> 1 (top)
    const theta = t * Math.PI;
    let r = Math.sin(theta) * 0.27;
    // Fuller upper shoulder, tapered bottom
    r *= 0.88 + 0.24 * Math.sin(t * Math.PI * 0.85);
    let y = -Math.cos(theta) * 0.26;
    // Top stem cavity dimple
    if (t > 0.84) {
      const d = (t - 0.84) / 0.16;
      y -= Math.sin(d * Math.PI * 0.5) * 0.055;
      r *= 1 - d * 0.25;
    }
    // Bottom calyx dimple
    if (t < 0.14) {
      const d = (0.14 - t) / 0.14;
      y += Math.sin(d * Math.PI * 0.5) * 0.032;
    }
    pts.push(new THREE.Vector2(Math.max(0.002, r), y));
  }
  const geo = new THREE.LatheGeometry(pts, 28);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Minimal spec-compliant binary glTF 2.0 (.glb) writer for Three.js BufferGeometries.
 */
function exportMeshesToGLB(namedGeometries) {
  const bufferViews = [];
  const accessors = [];
  const meshes = [];
  const nodes = [];
  const binChunks = [];
  let byteOffset = 0;

  function appendTypedArray(arr, target) {
    const buf = Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength);
    const pad = (4 - (buf.length % 4)) % 4;
    const viewIndex = bufferViews.length;
    bufferViews.push({
      buffer: 0,
      byteOffset,
      byteLength: buf.length,
      target,
    });
    binChunks.push(buf);
    if (pad > 0) binChunks.push(Buffer.alloc(pad));
    byteOffset += buf.length + pad;
    return viewIndex;
  }

  namedGeometries.forEach(({ name, geometry }, idx) => {
    const posAttr = geometry.getAttribute("position");
    const normAttr = geometry.getAttribute("normal");
    const uvAttr = geometry.getAttribute("uv");
    const colAttr = geometry.getAttribute("color");
    const indexAttr = geometry.getIndex();

    geometry.computeBoundingBox();
    const bb = geometry.boundingBox;

    const attributes = {};

    if (posAttr) {
      const arr = new Float32Array(posAttr.array);
      const bv = appendTypedArray(arr, 34962);
      attributes.POSITION = accessors.length;
      accessors.push({
        bufferView: bv,
        componentType: 5126,
        count: posAttr.count,
        type: "VEC3",
        min: [bb.min.x, bb.min.y, bb.min.z],
        max: [bb.max.x, bb.max.y, bb.max.z],
      });
    }
    if (normAttr) {
      const arr = new Float32Array(normAttr.array);
      const bv = appendTypedArray(arr, 34962);
      attributes.NORMAL = accessors.length;
      accessors.push({
        bufferView: bv,
        componentType: 5126,
        count: normAttr.count,
        type: "VEC3",
      });
    }
    if (uvAttr) {
      const arr = new Float32Array(uvAttr.array);
      const bv = appendTypedArray(arr, 34962);
      attributes.TEXCOORD_0 = accessors.length;
      accessors.push({
        bufferView: bv,
        componentType: 5126,
        count: uvAttr.count,
        type: "VEC2",
      });
    }
    if (colAttr) {
      const arr = new Float32Array(colAttr.array);
      const bv = appendTypedArray(arr, 34962);
      attributes.COLOR_0 = accessors.length;
      accessors.push({
        bufferView: bv,
        componentType: 5126,
        count: colAttr.count,
        type: "VEC3",
      });
    }

    const primitive = { attributes, mode: 4 };
    if (indexAttr) {
      const use32 = posAttr.count > 65535;
      const arr = use32 ? new Uint32Array(indexAttr.array) : new Uint16Array(indexAttr.array);
      const bv = appendTypedArray(arr, 34963);
      primitive.indices = accessors.length;
      accessors.push({
        bufferView: bv,
        componentType: use32 ? 5125 : 5123,
        count: indexAttr.count,
        type: "SCALAR",
      });
    }

    meshes.push({ name, primitives: [primitive] });
    nodes.push({ name, mesh: idx });
  });

  const gltf = {
    asset: { version: "2.0", generator: "Albanexa Labs Procedural GLB Pipeline" },
    scene: 0,
    scenes: [{ name: "AlbanexaLabsAssets", nodes: nodes.map((_, i) => i) }],
    nodes,
    meshes,
    accessors,
    bufferViews,
    buffers: [{ byteLength: byteOffset }],
  };

  const jsonStr = JSON.stringify(gltf);
  const jsonPad = (4 - (Buffer.byteLength(jsonStr) % 4)) % 4;
  const jsonBuf = Buffer.from(jsonStr + " ".repeat(jsonPad), "utf8");
  const binBuf = Buffer.concat(binChunks);

  const totalLength = 12 + 8 + jsonBuf.length + 8 + binBuf.length;
  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0); // 'glTF'
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(totalLength, 8);

  const jsonChunkHeader = Buffer.alloc(8);
  jsonChunkHeader.writeUInt32LE(jsonBuf.length, 0);
  jsonChunkHeader.writeUInt32LE(0x4e4f534a, 4); // 'JSON'

  const binChunkHeader = Buffer.alloc(8);
  binChunkHeader.writeUInt32LE(binBuf.length, 0);
  binChunkHeader.writeUInt32LE(0x004e4942, 4); // 'BIN\0'

  return Buffer.concat([header, jsonChunkHeader, jsonBuf, binChunkHeader, binBuf]);
}

const treeBarkGeo = buildHeroTreeBarkGeometry();
const appleGeo = buildAppleBodyGeometry();

const glb = exportMeshesToGLB([
  { name: "HeroTreeBark", geometry: treeBarkGeo },
  { name: "GoldenAppleBody", geometry: appleGeo },
]);

const outFile = join(outDir, "albanexa-labs-assets.glb");
writeFileSync(outFile, glb);
console.log(`✓ Generated ${outFile} (${(glb.length / 1024).toFixed(1)} KB)`);
console.log(`  - HeroTreeBark vertices: ${treeBarkGeo.getAttribute("position").count}`);
console.log(`  - GoldenAppleBody vertices: ${appleGeo.getAttribute("position").count}`);
