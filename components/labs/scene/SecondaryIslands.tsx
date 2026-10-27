"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import {
  getBarkPBR,
  getCloudPuffTexture,
  getLeafSprigPBR,
  getRockPBR,
  getStoneMasonryPBR,
  getWaterfallTexture,
} from "@/lib/labs/pbrTextures";

function hash3(x: number, y: number, z: number): number {
  const h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453123;
  return h - Math.floor(h);
}

const SEC_WATERFALL_VERTEX = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uSpeed;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float v = 1.0 - uv.y;
    pos.z += sin(v * 16.0 - uTime * uSpeed * 4.2 + pos.x * 4.0) * 0.025 * smoothstep(0.05, 0.5, v);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const SEC_WATERFALL_FRAGMENT = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uMap;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uHaze;

  void main() {
    float u = vUv.x;
    float v = 1.0 - vUv.y;

    vec2 uv1 = vec2(u, v * 2.4 - uTime * uSpeed * 0.68);
    vec2 uv2 = vec2(u * 1.3 - 0.15, v * 3.3 - uTime * uSpeed * 1.05);
    vec4 t1 = texture2D(uMap, uv1);
    vec4 t2 = texture2D(uMap, uv2);
    float streaks = t1.a * 0.6 + t2.a * 0.5;

    float sideMask = smoothstep(0.0, 0.24, sin(u * 3.14159265));
    float topFade = smoothstep(0.0, 0.06, v);
    float crest = smoothstep(0.02, 0.12, v) * (1.0 - smoothstep(0.12, 0.26, v));
    float bottomFade = 1.0 - smoothstep(0.62, 0.99, v);

    vec3 col = mix(vec3(0.88, 0.94, 0.96), vec3(1.0, 0.97, 0.91), clamp(streaks + crest * 0.6, 0.0, 1.0));
    col = mix(col, vec3(0.96, 0.87, 0.78), uHaze * 0.65 + smoothstep(0.55, 0.98, v) * 0.45);

    // Thin separate threads of water rather than one opaque white sheet
    float strands = 0.35 + 0.65 * smoothstep(0.3, 0.8, fract(sin(floor(u * 7.0) * 91.7) * 4375.85));
    float alpha = clamp((0.12 + streaks * 0.55 * strands + crest * 0.3) * sideMask * topFade * bottomFade, 0.0, 0.8) * (1.0 - uHaze * 0.35);
    gl_FragColor = vec4(pow(col, vec3(2.2)), alpha);
  }
`;

function ensureBoxCylinderUVsAndColors(
  geo: THREE.BufferGeometry,
  col: THREE.Color,
  hazeCol: THREE.Color,
  hazeAmt: number,
): THREE.BufferGeometry {
  const nonIndexed = geo.index ? geo.toNonIndexed() : geo;
  nonIndexed.computeVertexNormals();
  const pos = nonIndexed.getAttribute("position");
  const norm = nonIndexed.getAttribute("normal");
  const count = pos.count;
  const uvs = new Float32Array(count * 2);
  const cols = new Float32Array(count * 3);

  const finalCol = col.clone().lerp(hazeCol, hazeAmt);
  const sunTint = new THREE.Color("#ffebd2").lerp(hazeCol, hazeAmt);
  const shadowTint = finalCol.clone().multiplyScalar(0.76).lerp(hazeCol, hazeAmt * 0.85);
  const tmp = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const px = pos.getX(i);
    const py = pos.getY(i);
    const pz = pos.getZ(i);
    const nx = norm.getX(i);
    const ny = norm.getY(i);

    if (Math.abs(ny) > 0.75) {
      uvs[i * 2] = px * 0.85;
      uvs[i * 2 + 1] = pz * 0.85;
    } else {
      uvs[i * 2] = (px + pz) * 0.85;
      uvs[i * 2 + 1] = py * 0.85;
    }

    // Directional golden-hour shading baked into architectural vertices
    const sunDot = nx * 0.65 + ny * 0.35;
    if (sunDot > 0.15) {
      tmp.copy(finalCol).lerp(sunTint, Math.min(0.48, sunDot * 0.48));
    } else if (sunDot < -0.1) {
      tmp.copy(finalCol).lerp(shadowTint, Math.min(0.65, -sunDot * 0.65));
    } else {
      tmp.copy(finalCol);
    }
    cols[i * 3] = tmp.r;
    cols[i * 3 + 1] = tmp.g;
    cols[i * 3 + 2] = tmp.b;
  }

  nonIndexed.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  nonIndexed.setAttribute("color", new THREE.BufferAttribute(cols, 3));
  return nonIndexed;
}

/**
 * Generates a deeply fractured, multi-faceted craggy floating island rock massif
 * with layered basalt/sandstone ribs, mossy crown, and jagged stalactite spires underneath.
 */
function buildCragMesh(
  radius: number,
  depth: number,
  seed: number,
  hazeAmt: number,
): THREE.BufferGeometry {
  const radial = 44;
  const heightSegs = 20;
  const positions: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  const hazeCol = new THREE.Color("#ead3bf");
  const cTop = new THREE.Color("#6e9138").lerp(hazeCol, hazeAmt * 0.72);
  const cRockLight = new THREE.Color("#b89c82").lerp(hazeCol, hazeAmt);
  const cRockMid = new THREE.Color("#7d6a5c").lerp(hazeCol, hazeAmt);
  const cRockDark = new THREE.Color("#493d37").lerp(hazeCol, hazeAmt * 0.92);
  const tmp = new THREE.Color();

  for (let iy = 0; iy <= heightSegs; iy++) {
    const v = iy / heightSegs;
    const y = -v * depth;
    const shelf = Math.sin(v * Math.PI * 5.0) * 0.05 * (1 - v);
    const profile = Math.pow(1 - v, 0.66) + shelf;

    for (let ix = 0; ix <= radial; ix++) {
      const u = ix / radial;
      const theta = u * Math.PI * 2;
      // Sharp angular cliff flutes & strata
      const flute =
        Math.sin(theta * 8 + seed) * 0.15 +
        Math.cos(theta * 15 - v * 2.8 + seed) * 0.11 +
        (hash3(Math.cos(theta) * 2.5 + seed, v * 4.5, Math.sin(theta) * 2.5) - 0.5) * 0.25;

      const r = iy === heightSegs ? 0 : Math.max(0.04, radius * profile * (1 + flute));
      const spikeDrop =
        iy > 2 && iy < heightSegs
          ? Math.max(0, Math.sin(theta * 7 + seed * 1.7) * Math.cos(theta * 4 - seed)) *
            v *
            (1 - v) *
            depth *
            0.55
          : 0;

      positions.push(Math.cos(theta) * r, y - spikeDrop, Math.sin(theta) * r);
      uvs.push(u * 5, v * 3);

      const sunSide = Math.max(0, Math.cos(theta - 0.42) * 0.5 + 0.5);
      if (v < 0.09) {
        tmp.copy(cTop).lerp(cRockLight, v / 0.09);
      } else if (v < 0.56) {
        tmp.copy(cRockMid).lerp(cRockLight, sunSide * 0.76);
        tmp.lerp(cRockDark, (v - 0.09) / 0.62);
      } else {
        tmp.copy(cRockMid).lerp(cRockDark, (v - 0.56) / 0.44);
      }
      if (flute < 0) tmp.multiplyScalar(1 - Math.min(0.28, -flute * 0.7) * (1 - hazeAmt * 0.6));
      colors.push(tmp.r, tmp.g, tmp.b);
    }
  }

  const stride = radial + 1;
  for (let iy = 0; iy < heightSegs; iy++) {
    for (let ix = 0; ix < radial; ix++) {
      const a = iy * stride + ix;
      const b = (iy + 1) * stride + ix;
      const c = (iy + 1) * stride + (ix + 1);
      const d = iy * stride + (ix + 1);
      indices.push(a, b, d, b, c, d);
    }
  }

  const body = new THREE.BufferGeometry();
  body.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  body.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  body.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  body.setIndex(indices);
  const nonIndexedBody = body.toNonIndexed();
  nonIndexedBody.computeVertexNormals();
  body.dispose();

  // Domed mossy top cap
  const cap = new THREE.CylinderGeometry(radius * 0.98, radius * 1.03, 0.24, radial);
  cap.translate(0, 0.07, 0);
  const nonIndexedCap = ensureBoxCylinderUVsAndColors(cap, cTop, hazeCol, 0);
  cap.dispose();

  // 10 jagged peripheral stalactite rock crags underneath
  const parts: THREE.BufferGeometry[] = [nonIndexedBody, nonIndexedCap];
  for (let s = 0; s < 10; s++) {
    const sa = (s / 10) * Math.PI * 2 + seed * 0.7;
    const sr = radius * (0.42 + (s % 3) * 0.16);
    const sh = depth * (0.46 + (s % 3) * 0.18);
    const tooth = new THREE.ConeGeometry(radius * (0.18 + (s % 2) * 0.08), sh, 6, 3);
    tooth.rotateX(Math.PI);
    const tPos = tooth.getAttribute("position");
    for (let k = 0; k < tPos.count; k++) {
      const px = tPos.getX(k);
      const py = tPos.getY(k);
      const pz = tPos.getZ(k);
      const n = 0.85 + hash3(px * 3 + s, py * 3, pz * 3) * 0.32;
      tPos.setXYZ(k, px * n, py, pz * n);
    }
    tooth.translate(Math.cos(sa) * sr, -depth * (0.36 + (s % 2) * 0.12), Math.sin(sa) * sr);
    const coloredTooth = ensureBoxCylinderUVsAndColors(tooth, cRockDark, hazeCol, 0);
    tooth.dispose();
    parts.push(coloredTooth);
  }

  const merged = mergeGeometries(parts, false)!;
  parts.forEach((p) => p.dispose());
  merged.computeVertexNormals();
  return merged;
}

/**
 * Builds an authentic, multi-tiered Gothic Cathedral Fortress (matching the left castle in 0.0s & 2.4s)
 * with flying buttresses, pointed Gothic lancet arch portals, gable roofs, and 11 needle spires.
 */
function buildGothicCastleGeometry(hazeAmt = 0.14): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const hazeCol = new THREE.Color("#ead4c2");
  const cWall = new THREE.Color("#e8d2bc");
  const cButtress = new THREE.Color("#cbb29b");
  const cRoof = new THREE.Color("#4f4956");
  const cArchFrame = new THREE.Color("#f5e3cf");
  const cPortalShadow = new THREE.Color("#3a2f32");
  const cWarmWindow = new THREE.Color("#d99b52");

  function addPart(geo: THREE.BufferGeometry, col: THREE.Color) {
    const prepared = ensureBoxCylinderUVsAndColors(geo, col, hazeCol, hazeAmt);
    geo.dispose();
    parts.push(prepared);
  }

  // 1. Stepped stone bastion foundation hugging the cliff top
  const baseBastion = new THREE.BoxGeometry(1.95, 0.45, 1.45);
  baseBastion.translate(0, 0.22, 0.05);
  addPart(baseBastion, cButtress);

  const upperTerrace = new THREE.BoxGeometry(1.55, 0.35, 1.18);
  upperTerrace.translate(0, 0.58, 0.02);
  addPart(upperTerrace, cWall);

  // 2. Main Cathedral Nave + Steep Gable Roof (prism roof)
  const nave = new THREE.BoxGeometry(0.92, 1.55, 0.92);
  nave.translate(0.05, 1.32, 0.02);
  addPart(nave, cWall);

  const gableRoof = new THREE.CylinderGeometry(0.66, 0.66, 0.96, 3);
  gableRoof.rotateZ(Math.PI / 2);
  gableRoof.rotateY(Math.PI / 2);
  gableRoof.scale(1.0, 0.95, 1.0);
  gableRoof.translate(0.05, 2.32, 0.02);
  addPart(gableRoof, cRoof);

  // 3. Vertical Gothic Wall Buttresses along the front and side facades
  for (const bx of [-0.36, 0.05, 0.46]) {
    const pilaster = new THREE.BoxGeometry(0.11, 1.65, 0.14);
    pilaster.translate(bx, 1.28, 0.48);
    addPart(pilaster, cButtress);

    const pinnacle = new THREE.ConeGeometry(0.085, 0.42, 6);
    pinnacle.translate(bx, 2.31, 0.48);
    addPart(pinnacle, cRoof);
  }

  // 4. Pointed Gothic Lancet Arch Portal & Recessed Lancet Windows on front facade (like 0.0s & 2.4s)
  const archExtrudeSettings = { depth: 0.09, bevelEnabled: true, bevelSize: 0.015, bevelThickness: 0.015 };
  function makePointedLancetArch(w: number, h: number): THREE.BufferGeometry {
    const s = new THREE.Shape();
    s.moveTo(-w * 0.5, 0);
    s.lineTo(-w * 0.5, h * 0.58);
    s.quadraticCurveTo(-w * 0.45, h * 0.88, 0, h);
    s.quadraticCurveTo(w * 0.45, h * 0.88, w * 0.5, h * 0.58);
    s.lineTo(w * 0.5, 0);
    s.closePath();
    return new THREE.ExtrudeGeometry(s, archExtrudeSettings);
  }

  // Main grand pointed archway recess + stone frame
  const mainArchFrame = makePointedLancetArch(0.34, 0.82);
  mainArchFrame.translate(0.24, 0.62, 0.44);
  addPart(mainArchFrame, cArchFrame);

  const mainArchVoid = makePointedLancetArch(0.24, 0.72);
  mainArchVoid.translate(0.24, 0.62, 0.465);
  addPart(mainArchVoid, cPortalShadow);

  // Upper Gothic lancet windows with warm golden interior glow
  for (const wx of [-0.16, 0.24]) {
    const winVoid = makePointedLancetArch(0.13, 0.42);
    winVoid.translate(wx, 1.52, 0.45);
    addPart(winVoid, cPortalShadow);

    const winGlow = makePointedLancetArch(0.075, 0.34);
    winGlow.translate(wx, 1.54, 0.462);
    addPart(winGlow, cWarmWindow);
  }

  // 5. 9 Multi-tiered Gothic Towers & Needle Spires with Spirelet Finials
  const towers = [
    { x: 0.05, z: -0.05, r: 0.32, h: 2.35, sh: 1.75 }, // Central grand cathedral spire
    { x: -0.58, z: 0.28, r: 0.24, h: 1.78, sh: 1.42 }, // Front-left tower
    { x: 0.62, z: 0.26, r: 0.22, h: 1.64, sh: 1.32 }, // Front-right tower
    { x: -0.38, z: -0.44, r: 0.26, h: 2.08, sh: 1.62 }, // Back-left high spire
    { x: 0.46, z: -0.42, r: 0.22, h: 1.58, sh: 1.24 }, // Back-right spire
    { x: -0.86, z: -0.06, r: 0.18, h: 1.32, sh: 1.05 }, // Far-left flank turret
    { x: 0.88, z: -0.08, r: 0.17, h: 1.22, sh: 0.96 }, // Far-right flank turret
    { x: -0.18, z: 0.48, r: 0.16, h: 1.42, sh: 1.12 }, // Courtyard gate turret L
    { x: 0.48, z: 0.48, r: 0.15, h: 1.28, sh: 0.98 }, // Courtyard gate turret R
  ];

  for (const t of towers) {
    // Octagonal/dodecagonal stone tower shaft
    const shaft = new THREE.CylinderGeometry(t.r * 0.86, t.r, t.h, 12);
    shaft.translate(t.x, t.h * 0.5 + 0.2, t.z);
    addPart(shaft, cWall);

    // Corbelled stone parapet ring at top of shaft
    const parapet = new THREE.CylinderGeometry(t.r * 0.98, t.r * 0.9, 0.12, 12);
    parapet.translate(t.x, t.h + 0.2, t.z);
    addPart(parapet, cButtress);

    // Steep Gothic slate needle spire
    const spire = new THREE.ConeGeometry(t.r * 0.98, t.sh, 12);
    spire.translate(t.x, t.h + 0.24 + t.sh * 0.5, t.z);
    addPart(spire, cRoof);

    // 4 corner spirelet pinnacles around the major towers
    if (t.r >= 0.22) {
      for (let c = 0; c < 4; c++) {
        const ca = (c / 4) * Math.PI * 2 + Math.PI * 0.25;
        const px = t.x + Math.cos(ca) * (t.r * 0.88);
        const pz = t.z + Math.sin(ca) * (t.r * 0.88);
        const pin = new THREE.ConeGeometry(0.055, 0.36, 6);
        pin.translate(px, t.h + 0.38, pz);
        addPart(pin, cRoof);
      }
    }
  }

  const merged = mergeGeometries(parts, false)!;
  parts.forEach((p) => p.dispose());
  merged.computeVertexNormals();
  return merged;
}

/**
 * Builds the monumental Distant Acropolis Citadel + 7-Span Semicircular Arched Stone Viaduct Bridge
 * seen under the colossal Moon on the right side of 0.0s & 2.4s.
 * Uses true semicircular arch geometry (not T-shaped boxes!) and atmospheric perspective haze.
 */
function buildDistantCitadelAndBridgeGeometry(hazeAmt = 0.48): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const hazeCol = new THREE.Color("#f0d8c2");
  const cCitadel = new THREE.Color("#e4ccb6");
  const cShadowStone = new THREE.Color("#c4ab96");
  const cSpire = new THREE.Color("#9e8b84");

  function addPart(geo: THREE.BufferGeometry, col: THREE.Color) {
    const prepared = ensureBoxCylinderUVsAndColors(geo, col, hazeCol, hazeAmt);
    geo.dispose();
    parts.push(prepared);
  }

  // 1. Multi-tiered Acropolis Bastion Walls
  const lowerKeep = new THREE.BoxGeometry(3.8, 0.75, 2.2);
  lowerKeep.translate(0, 0.35, 0);
  addPart(lowerKeep, cShadowStone);

  const midKeep = new THREE.BoxGeometry(2.6, 1.15, 1.6);
  midKeep.translate(0, 1.1, 0);
  addPart(midKeep, cCitadel);

  // 2. 13 Soaring Gothic Cathedral Spires & Towers forming the iconic jagged silhouette under the Moon
  const towers = [
    { x: 0.0, z: 0.0, r: 0.62, h: 3.35, sh: 2.35 }, // Central grand cathedral keep
    { x: -0.78, z: 0.22, r: 0.44, h: 2.55, sh: 1.85 },
    { x: 0.74, z: -0.15, r: 0.46, h: 2.75, sh: 1.95 },
    { x: -1.42, z: -0.12, r: 0.36, h: 2.05, sh: 1.52 },
    { x: 1.38, z: 0.18, r: 0.38, h: 2.15, sh: 1.6 },
    { x: -0.42, z: -0.48, r: 0.34, h: 2.95, sh: 2.05 },
    { x: 0.45, z: 0.42, r: 0.32, h: 2.35, sh: 1.65 },
    { x: -1.95, z: 0.15, r: 0.28, h: 1.55, sh: 1.25 },
    { x: 1.92, z: -0.1, r: 0.28, h: 1.65, sh: 1.32 },
    { x: -1.12, z: 0.52, r: 0.22, h: 1.75, sh: 1.35 },
    { x: 1.08, z: 0.48, r: 0.22, h: 1.85, sh: 1.42 },
    { x: -2.35, z: -0.05, r: 0.2, h: 1.15, sh: 0.95 },
    { x: 2.35, z: 0.05, r: 0.22, h: 1.25, sh: 1.02 },
  ];

  for (const t of towers) {
    const body = new THREE.CylinderGeometry(t.r * 0.85, t.r, t.h, 10);
    body.translate(t.x, t.h * 0.5 + 0.2, t.z);
    addPart(body, cCitadel);

    const roof = new THREE.ConeGeometry(t.r * 0.96, t.sh, 10);
    roof.translate(t.x, t.h + 0.2 + t.sh * 0.5, t.z);
    addPart(roof, cSpire);
  }

  // 3. True Multi-Span Semicircular Arched Stone Viaduct Bridge extending to the right (+x)
  // Built using ExtrudeGeometry with real semicircular arch cutouts (matching 0.0s & 2.4s!)
  const spanCount = 6;
  const spanWidth = 1.55;
  const totalBridgeLen = spanCount * spanWidth;
  const startX = 2.15;
  const deckTopY = 0.72;
  const pierBottomY = -1.15;

  const viaductShape = new THREE.Shape();
  viaductShape.moveTo(startX, deckTopY);
  viaductShape.lineTo(startX + totalBridgeLen, deckTopY);
  viaductShape.lineTo(startX + totalBridgeLen, deckTopY - 0.26);

  // Carve 6 true Gothic/Roman semicircular arches + tapered piers along the bottom profile
  for (let s = spanCount - 1; s >= 0; s--) {
    const spanLeft = startX + s * spanWidth;
    const spanCenter = spanLeft + spanWidth * 0.5;
    const archRadius = spanWidth * 0.36;
    const pierHalfW = spanWidth * 0.14;

    // Right pier of this span
    viaductShape.lineTo(spanCenter + archRadius + pierHalfW, pierBottomY);
    viaductShape.lineTo(spanCenter + archRadius, pierBottomY);
    // Rise up to arch springline
    viaductShape.lineTo(spanCenter + archRadius, deckTopY - 0.36 - archRadius * 0.3);
    // Semicircular arch vault
    viaductShape.absarc(
      spanCenter,
      deckTopY - 0.36 - archRadius * 0.3,
      archRadius,
      0,
      Math.PI,
      false,
    );
    // Left pier of this span
    viaductShape.lineTo(spanCenter - archRadius, pierBottomY);
    viaductShape.lineTo(spanCenter - archRadius - pierHalfW, pierBottomY);
  }
  viaductShape.lineTo(startX, deckTopY);
  viaductShape.closePath();

  const viaductGeo = new THREE.ExtrudeGeometry(viaductShape, {
    depth: 0.52,
    bevelEnabled: true,
    bevelSize: 0.025,
    bevelThickness: 0.025,
  });
  viaductGeo.translate(0, 0, -0.26);
  addPart(viaductGeo, cCitadel);

  // Bridge parapet walls & gatehouse watchtowers along the viaduct (matching 0.0s & 2.4s)
  const parapetBar = new THREE.BoxGeometry(totalBridgeLen, 0.14, 0.62);
  parapetBar.translate(startX + totalBridgeLen * 0.5, deckTopY + 0.07, 0);
  addPart(parapetBar, cShadowStone);

  const gateIndices = [1, 3, 5];
  for (const gi of gateIndices) {
    const gx = startX + gi * spanWidth;
    const isMainGate = gi === 1;
    const gw = isMainGate ? 0.42 : 0.28;
    const gh = isMainGate ? 1.15 : 0.72;
    const gsh = isMainGate ? 0.95 : 0.58;

    const gateBody = new THREE.CylinderGeometry(gw * 0.85, gw, gh, 8);
    gateBody.translate(gx, deckTopY + gh * 0.5, 0);
    addPart(gateBody, cCitadel);

    const gateSpire = new THREE.ConeGeometry(gw * 0.98, gsh, 8);
    gateSpire.translate(gx, deckTopY + gh + gsh * 0.5, 0);
    addPart(gateSpire, cSpire);
  }

  const merged = mergeGeometries(parts, false)!;
  parts.forEach((p) => p.dispose());
  merged.computeVertexNormals();
  return merged;
}

/**
 * Builds an organic crooked bonsai tree trunk + branches for secondary islands
 */
function buildMiniBonsaiBranches(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const mainCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.08, 0.42, 0.03),
    new THREE.Vector3(-0.05, 0.85, -0.02),
    new THREE.Vector3(0.03, 1.18, 0),
  ]);
  parts.push(new THREE.TubeGeometry(mainCurve, 9, 0.095, 6, false));

  const subBranches = [
    [new THREE.Vector3(0, 0.76, 0), new THREE.Vector3(-0.54, 1.14, 0.2)],
    [new THREE.Vector3(0, 0.82, 0), new THREE.Vector3(0.56, 1.18, -0.16)],
    [new THREE.Vector3(0, 0.88, 0), new THREE.Vector3(0.14, 1.3, 0.48)],
    [new THREE.Vector3(0, 0.86, 0), new THREE.Vector3(-0.2, 1.26, -0.45)],
  ];
  for (const sb of subBranches) {
    const c = new THREE.CatmullRomCurve3(sb);
    parts.push(new THREE.TubeGeometry(c, 5, 0.044, 5, false));
  }

  const merged = mergeGeometries(parts, false)!;
  parts.forEach((p) => p.dispose());
  merged.computeVertexNormals();
  return merged;
}

function buildMiniBonsaiFoliage(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];
  const puffs = [
    { x: 0, y: 1.28, z: 0, s: 0.98 },
    { x: -0.5, y: 1.15, z: 0.18, s: 0.82 },
    { x: 0.54, y: 1.19, z: -0.15, s: 0.84 },
    { x: 0.12, y: 1.34, z: 0.44, s: 0.76 },
    { x: -0.18, y: 1.29, z: -0.4, s: 0.76 },
  ];
  for (let i = 0; i < puffs.length; i++) {
    const pf = puffs[i];
    const p1 = new THREE.PlaneGeometry(pf.s, pf.s);
    p1.rotateX(-0.34);
    p1.rotateY(i * 1.1);
    p1.translate(pf.x, pf.y, pf.z);

    const p2 = new THREE.PlaneGeometry(pf.s, pf.s);
    p2.rotateY(Math.PI * 0.5 + i * 1.1);
    p2.rotateZ(0.28);
    p2.translate(pf.x, pf.y, pf.z);

    const p3 = new THREE.PlaneGeometry(pf.s * 0.9, pf.s * 0.9);
    p3.rotateX(Math.PI * 0.36);
    p3.translate(pf.x, pf.y + 0.06, pf.z);

    parts.push(p1, p2, p3);
  }
  const merged = mergeGeometries(parts, false)!;
  parts.forEach((p) => p.dispose());
  merged.computeVertexNormals();
  return merged;
}

interface IslandInstanceDef {
  id: string;
  position: [number, number, number];
  radius: number;
  depth: number;
  seed: number;
  haze: number; // Atmospheric perspective factor (0 = foreground, 0.65 = far horizon mist)
  bobAmp: number;
  bobSpeed: number;
  bobPhase: number;
  type: "castle" | "citadel" | "tree-grove" | "ruin-arch" | "watchtower";
  treeCount: number;
  treeScale: number;
  waterfalls: { angle: number; width: number; height: number }[];
}

// 14 Multi-Layered Floating Archipelago Islands spanning Near-Midground, High Sky,
// Far Horizon (Atmospheric Perspective), and 360° Back Orbit Discovery
const ISLAND_DEFS: IslandInstanceDef[] = [
  // 1. Left Mid-Ground Gothic Cathedral Castle Island (prominent left landmark in 0.0s & 2.4s)
  {
    id: "left-castle-island",
    position: [-9.8, 0.2, -5.2],
    radius: 2.35,
    depth: 3.95,
    seed: 11,
    haze: 0.12,
    bobAmp: 0.15,
    bobSpeed: 0.5,
    bobPhase: 0.4,
    type: "castle",
    treeCount: 5,
    treeScale: 0.78,
    waterfalls: [
      { angle: 1.08, width: 0.44, height: 6.6 },
      { angle: 1.56, width: 0.54, height: 7.1 },
    ],
  },
  // 2. Upper-Left High Sanctuary Island (above left castle in 0.0s & 2.4s)
  {
    id: "upper-left-sanctuary",
    position: [-14.2, 3.15, -11.5],
    radius: 1.55,
    depth: 2.55,
    seed: 22,
    haze: 0.28,
    bobAmp: 0.2,
    bobSpeed: 0.45,
    bobPhase: 1.7,
    type: "tree-grove",
    treeCount: 3,
    treeScale: 0.9,
    waterfalls: [
      { angle: 1.25, width: 0.3, height: 5.8 },
      { angle: 1.72, width: 0.28, height: 5.4 },
    ],
  },
  // 3. Lower-Left Drifting Crag in the Cloud Sea (below left castle in 0.0s & 2.4s)
  {
    id: "lower-left-crag",
    position: [-11.6, -2.65, -8.2],
    radius: 1.4,
    depth: 2.25,
    seed: 33,
    haze: 0.24,
    bobAmp: 0.14,
    bobSpeed: 0.58,
    bobPhase: 2.9,
    type: "tree-grove",
    treeCount: 3,
    treeScale: 0.68,
    waterfalls: [{ angle: 1.42, width: 0.3, height: 3.6 }],
  },
  // 4. Far-Left Misty Horizon Crag (left edge of 0.0s & 2.4s)
  {
    id: "far-left-mist-crag",
    position: [-17.5, -1.85, -15.5],
    radius: 1.35,
    depth: 2.3,
    seed: 37,
    haze: 0.52,
    bobAmp: 0.12,
    bobSpeed: 0.42,
    bobPhase: 1.1,
    type: "tree-grove",
    treeCount: 2,
    treeScale: 0.65,
    waterfalls: [{ angle: 1.35, width: 0.26, height: 3.8 }],
  },
  // 5. Inner-Left Gap Distant Crag (between main island and left castle in 2.4s)
  {
    id: "inner-left-gap-crag",
    position: [-6.6, -1.45, -14.2],
    radius: 0.95,
    depth: 1.65,
    seed: 41,
    haze: 0.45,
    bobAmp: 0.14,
    bobSpeed: 0.52,
    bobPhase: 3.2,
    type: "tree-grove",
    treeCount: 2,
    treeScale: 0.55,
    waterfalls: [],
  },
  // 6. Right Mid-Ground Bonsai Waterfall Island (prominent right foreground/midground in 0.0s & 2.4s)
  {
    id: "right-tree-island",
    position: [8.8, -0.75, -3.8],
    radius: 2.05,
    depth: 3.35,
    seed: 44,
    haze: 0.1,
    bobAmp: 0.17,
    bobSpeed: 0.48,
    bobPhase: 1.1,
    type: "tree-grove",
    treeCount: 4,
    treeScale: 0.98,
    waterfalls: [
      { angle: 1.85, width: 0.48, height: 5.8 },
      { angle: 1.35, width: 0.32, height: 5.2 },
    ],
  },
  // 7. Lower-Right Stepped Crag A (nestled in clouds at bottom-right of main island in 0.0s & 2.4s)
  {
    id: "lower-right-crag-a",
    position: [5.4, -3.1, -6.2],
    radius: 1.35,
    depth: 2.1,
    seed: 55,
    haze: 0.18,
    bobAmp: 0.14,
    bobSpeed: 0.62,
    bobPhase: 3.6,
    type: "tree-grove",
    treeCount: 3,
    treeScale: 0.64,
    waterfalls: [{ angle: 1.6, width: 0.28, height: 3.4 }],
  },
  // 8. Lower-Right Secondary Floating Crag B (between main island and right island in 0.0s & 2.4s)
  {
    id: "lower-right-crag-b",
    position: [6.5, -1.85, -9.4],
    radius: 1.12,
    depth: 1.85,
    seed: 59,
    haze: 0.28,
    bobAmp: 0.15,
    bobSpeed: 0.54,
    bobPhase: 2.2,
    type: "tree-grove",
    treeCount: 2,
    treeScale: 0.56,
    waterfalls: [{ angle: 1.55, width: 0.22, height: 2.8 }],
  },
  // 9. Mid-Right Abbey Spire Crag (between main tree and distant citadel in 0.0s & 2.4s)
  {
    id: "mid-right-spire",
    position: [6.8, -0.35, -13.8],
    radius: 1.32,
    depth: 2.35,
    seed: 66,
    haze: 0.38,
    bobAmp: 0.15,
    bobSpeed: 0.46,
    bobPhase: 4.2,
    type: "watchtower",
    treeCount: 2,
    treeScale: 0.62,
    waterfalls: [{ angle: 1.7, width: 0.26, height: 4.2 }],
  },
  // 10. Far-Right Grand Citadel Acropolis & 7-Span Arched Viaduct Bridge (under the Moon in 0.0s & 2.4s)
  {
    id: "far-right-citadel",
    position: [11.4, 0.65, -18.5],
    radius: 3.15,
    depth: 4.5,
    seed: 77,
    haze: 0.46,
    bobAmp: 0.1,
    bobSpeed: 0.36,
    bobPhase: 0.8,
    type: "citadel",
    treeCount: 4,
    treeScale: 0.72,
    waterfalls: [
      { angle: 1.72, width: 0.44, height: 5.6 },
      { angle: 2.12, width: 0.36, height: 5.2 },
    ],
  },
  // 11. Back-Left Ancient Temple Ruin Island (360° orbit discovery at 110°–160°)
  {
    id: "back-left-ruin",
    position: [-14.2, 0.95, 11.8],
    radius: 2.15,
    depth: 3.3,
    seed: 88,
    haze: 0.18,
    bobAmp: 0.18,
    bobSpeed: 0.46,
    bobPhase: 2.1,
    type: "ruin-arch",
    treeCount: 4,
    treeScale: 0.85,
    waterfalls: [
      { angle: -1.4, width: 0.38, height: 5.4 },
      { angle: -1.85, width: 0.3, height: 4.8 },
    ],
  },
  // 12. Back-Right-South Floating Sanctuary (360° orbit discovery at 150°–205°, clear of the +z camera corridor!)
  {
    id: "back-center-sanctuary",
    position: [15.2, 1.45, 15.5],
    radius: 1.75,
    depth: 2.85,
    seed: 93,
    haze: 0.28,
    bobAmp: 0.16,
    bobSpeed: 0.44,
    bobPhase: 3.8,
    type: "watchtower",
    treeCount: 3,
    treeScale: 0.78,
    waterfalls: [{ angle: -1.55, width: 0.36, height: 5.2 }],
  },
  // 13. Back-Right Elven Observatory Island (360° orbit discovery at 200°–255°)
  {
    id: "back-right-observatory",
    position: [14.5, 1.15, 8.2],
    radius: 2.05,
    depth: 3.15,
    seed: 99,
    haze: 0.18,
    bobAmp: 0.18,
    bobSpeed: 0.5,
    bobPhase: 5.0,
    type: "watchtower",
    treeCount: 3,
    treeScale: 0.84,
    waterfalls: [{ angle: -1.6, width: 0.4, height: 5.2 }],
  },
  // 14. West Flank Floating Crag (360° orbit discovery at 260°–300°)
  {
    id: "west-flank-crag",
    position: [-14.5, -0.45, 3.8],
    radius: 1.55,
    depth: 2.45,
    seed: 105,
    haze: 0.22,
    bobAmp: 0.15,
    bobSpeed: 0.52,
    bobPhase: 0.9,
    type: "tree-grove",
    treeCount: 3,
    treeScale: 0.76,
    waterfalls: [{ angle: 0.2, width: 0.32, height: 4.6 }],
  },
];

// Sculpted floating sky monoliths / ribbed balloon-rocks seen in 0.8s - 3.2s upper-left & under the Moon on the right
const SKY_MONOLITHS: {
  pos: [number, number, number];
  scale: number;
  phase: number;
  haze: number;
}[] = [
  { pos: [-13.6, 5.85, -13.2], scale: 0.88, phase: 0.5, haze: 0.28 }, // Upper-left large ribbed balloon monolith (2.4s!)
  { pos: [-16.2, 6.25, -15.8], scale: 0.46, phase: 1.9, haze: 0.38 }, // Upper-left companion monolith (2.4s!)
  { pos: [11.2, 3.65, -14.8], scale: 0.54, phase: 2.8, haze: 0.36 }, // Floating diamond rock under the Moon (0.0s & 2.4s!)
  { pos: [17.8, 1.65, -19.5], scale: 0.48, phase: 3.9, haze: 0.52 }, // Far-right floating shard A (0.0s!)
  { pos: [19.8, 1.05, -20.5], scale: 0.44, phase: 4.7, haze: 0.56 }, // Far-right floating shard B (0.0s!)
  { pos: [9.8, 1.95, -16.8], scale: 0.28, phase: 1.4, haze: 0.45 }, // Tiny floating rock near citadel
  { pos: [-8.4, 4.2, 18.5], scale: 0.52, phase: 1.2, haze: 0.32 }, // Back sky monolith
  { pos: [12.2, 4.5, 16.2], scale: 0.48, phase: 2.5, haze: 0.32 }, // Back-right sky monolith
];

export default function SecondaryIslands({ quality = "high" }: { quality?: "high" | "low" }) {
  const waterTex = useMemo(() => getWaterfallTexture(), []);
  const mistTex = useMemo(() => getCloudPuffTexture(), []);
  const rockPBR = useMemo(() => getRockPBR(), []);
  const stonePBR = useMemo(() => getStoneMasonryPBR(), []);
  const barkPBR = useMemo(() => getBarkPBR(), []);
  const leafPBR = useMemo(() => getLeafSprigPBR(), []);

  const islandRefs = useRef<(THREE.Group | null)[]>([]);
  const monolithRefs = useRef<(THREE.Mesh | null)[]>([]);
  const waterfallShaders = useRef<THREE.ShaderMaterial[]>([]);

  const castleGeo = useMemo(() => buildGothicCastleGeometry(0.14), []);
  const watchtowerGeo = useMemo(() => buildGothicCastleGeometry(0.32), []);
  const citadelGeo = useMemo(() => buildDistantCitadelAndBridgeGeometry(0.46), []);
  const miniBranchGeo = useMemo(() => buildMiniBonsaiBranches(), []);
  const miniFoliageGeo = useMemo(() => buildMiniBonsaiFoliage(), []);

  const islandMeshes = useMemo(() => {
    return ISLAND_DEFS.map((def) => ({
      def,
      cragGeo: buildCragMesh(def.radius, def.depth, def.seed, def.haze),
      waterfallUniforms: def.waterfalls.map((wf, wi) => ({
        uMap: { value: waterTex },
        uTime: { value: 0 },
        uSpeed: { value: 1.3 + (wi % 3) * 0.15 },
        uHaze: { value: def.haze },
      })),
    }));
  }, [waterTex]);

  // Sculpted ribbed balloon-monolith geometry matching the upper-left floating rock in 2.4s
  const monolithGeo = useMemo(() => {
    const top = new THREE.SphereGeometry(0.68, 16, 14);
    const tPos = top.getAttribute("position");
    for (let i = 0; i < tPos.count; i++) {
      const px = tPos.getX(i);
      const py = tPos.getY(i);
      const pz = tPos.getZ(i);
      const angle = Math.atan2(pz, px);
      const rib = 1 + Math.sin(angle * 8) * 0.08;
      tPos.setXYZ(i, px * rib, py * 1.12 + 0.32, pz * rib);
    }
    const tail = new THREE.ConeGeometry(0.58, 1.35, 12);
    tail.rotateX(Math.PI);
    tail.translate(0, -0.4, 0);
    const m = mergeGeometries([top.toNonIndexed(), tail.toNonIndexed()], false)!;
    top.dispose();
    tail.dispose();
    m.computeVertexNormals();
    return m;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ISLAND_DEFS.forEach((def, idx) => {
      const g = islandRefs.current[idx];
      if (!g) return;
      g.position.y = def.position[1] + Math.sin(t * def.bobSpeed + def.bobPhase) * def.bobAmp;
      g.rotation.y = Math.sin(t * 0.12 + def.bobPhase) * 0.022;
    });
    SKY_MONOLITHS.forEach((m, idx) => {
      const mesh = monolithRefs.current[idx];
      if (!mesh) return;
      mesh.position.y = m.pos[1] + Math.sin(t * 0.62 + m.phase) * 0.22;
    });
    for (const sm of waterfallShaders.current) {
      if (sm?.uniforms?.uTime) sm.uniforms.uTime.value = t;
    }
  });

  const activeIslands = quality === "high" ? islandMeshes : islandMeshes.slice(0, 9);

  return (
    <group>
      {activeIslands.map(({ def, cragGeo, waterfallUniforms }, idx) => (
        <group
          key={def.id}
          position={def.position}
          ref={(el) => {
            islandRefs.current[idx] = el;
          }}
        >
          {/* Floating island rock & mossy cap with rock PBR normal map + atmospheric perspective */}
          <mesh geometry={cragGeo} castShadow receiveShadow>
            <meshStandardMaterial
              map={rockPBR.map}
              normalMap={rockPBR.normalMap}
              normalScale={new THREE.Vector2(1.15 * (1 - def.haze * 0.5), 1.15 * (1 - def.haze * 0.5))}
              roughness={0.86}
              metalness={0.03}
              emissive="#efd7c2"
              emissiveIntensity={def.haze * 0.38}
              side={THREE.DoubleSide}
              vertexColors
            />
          </mesh>

          {/* Architectural structures per island type with weathered Stone Masonry PBR */}
          {def.type === "castle" && (
            <mesh geometry={castleGeo} position={[0, 0.08, -0.05]} castShadow receiveShadow>
              <meshStandardMaterial
                map={stonePBR.map}
                normalMap={stonePBR.normalMap}
                normalScale={new THREE.Vector2(0.85, 0.85)}
                roughnessMap={stonePBR.roughnessMap}
                roughness={0.78}
                metalness={0.04}
                emissive="#efdcd2"
                emissiveIntensity={0.08 + def.haze * 0.6}
                vertexColors
              />
            </mesh>
          )}

          {def.type === "citadel" && (
            <mesh geometry={citadelGeo} position={[0, 0.08, 0]} scale={0.92}>
              <meshStandardMaterial
                map={stonePBR.map}
                normalMap={stonePBR.normalMap}
                normalScale={new THREE.Vector2(0.45, 0.45)}
                roughness={0.84}
                metalness={0.03}
                emissive="#f1ddd0"
                emissiveIntensity={def.haze * 0.95}
                vertexColors
              />
            </mesh>
          )}

          {def.type === "watchtower" && (
            <mesh geometry={watchtowerGeo} position={[0, 0.08, 0]} scale={[0.54, 0.72, 0.54]}>
              <meshStandardMaterial
                map={stonePBR.map}
                normalMap={stonePBR.normalMap}
                normalScale={new THREE.Vector2(0.6, 0.6)}
                roughness={0.8}
                metalness={0.04}
                emissive="#f2dac4"
                emissiveIntensity={def.haze * 0.42}
                vertexColors
              />
            </mesh>
          )}

          {def.type === "ruin-arch" && (
            <group position={[0, 0.1, 0]}>
              <mesh position={[-0.48, 0.58, 0]}>
                <cylinderGeometry args={[0.13, 0.16, 1.16, 10]} />
                <meshStandardMaterial
                  map={stonePBR.map}
                  normalMap={stonePBR.normalMap}
                  color="#dec8b4"
                  roughness={0.85}
                />
              </mesh>
              <mesh position={[0.48, 0.58, 0]}>
                <cylinderGeometry args={[0.13, 0.16, 1.16, 10]} />
                <meshStandardMaterial
                  map={stonePBR.map}
                  normalMap={stonePBR.normalMap}
                  color="#dec8b4"
                  roughness={0.85}
                />
              </mesh>
              <mesh position={[0, 1.2, 0]}>
                <boxGeometry args={[1.32, 0.24, 0.34]} />
                <meshStandardMaterial
                  map={stonePBR.map}
                  normalMap={stonePBR.normalMap}
                  color="#ccb6a0"
                  roughness={0.85}
                />
              </mesh>
            </group>
          )}

          {/* Organic miniature bonsai trees with real bark & pointed-leaf botanical sprigs */}
          {Array.from({ length: def.treeCount }).map((_, ti) => {
            const ta = (ti / def.treeCount) * Math.PI * 2 + 0.62;
            const tr = def.radius * (def.type === "castle" ? 0.68 : 0.46);
            const s = def.treeScale * (0.82 + (ti % 2) * 0.24);
            return (
              <group
                key={ti}
                position={[Math.cos(ta) * tr, 0.08, Math.sin(ta) * tr]}
                scale={s}
                rotation={[0, ta, 0]}
              >
                <mesh geometry={miniBranchGeo}>
                  <meshStandardMaterial
                    map={barkPBR.map}
                    normalMap={barkPBR.normalMap}
                    color="#785536"
                    emissive="#ebd2bc"
                    emissiveIntensity={def.haze * 0.32}
                    roughness={0.86}
                  />
                </mesh>
                <mesh geometry={miniFoliageGeo}>
                  <meshStandardMaterial
                    map={leafPBR.map}
                    normalMap={leafPBR.normalMap}
                    color={ti % 2 === 0 ? "#b4d85e" : "#96bc46"}
                    emissive={def.haze > 0.3 ? "#d8c49e" : "#425c18"}
                    emissiveIntensity={0.22 + def.haze * 0.32}
                    alphaTest={0.34}
                    side={THREE.DoubleSide}
                    roughness={0.7}
                  />
                </mesh>
              </group>
            );
          })}

          {/* Shader-driven waterfalls + volumetric mist plumes on secondary islands */}
          {def.waterfalls.map((wf, wi) => {
            const wr = def.radius * 0.92;
            const wx = Math.cos(wf.angle) * wr;
            const wz = Math.sin(wf.angle) * wr;
            return (
              <group key={wi}>
                <mesh
                  position={[wx, -wf.height * 0.5 + 0.06, wz]}
                  rotation={[0, -wf.angle + Math.PI / 2, 0]}
                >
                  <planeGeometry args={[wf.width, wf.height, 4, 14]} />
                  <shaderMaterial
                    ref={(m) => {
                      if (m && !waterfallShaders.current.includes(m)) {
                        waterfallShaders.current.push(m);
                      }
                    }}
                    vertexShader={SEC_WATERFALL_VERTEX}
                    fragmentShader={SEC_WATERFALL_FRAGMENT}
                    uniforms={waterfallUniforms[wi]}
                    transparent
                    depthWrite={false}
                    side={THREE.DoubleSide}
                  />
                </mesh>
                <sprite
                  position={[wx * 1.04, -wf.height * 0.85, wz * 1.04]}
                  scale={[wf.width * 3.5, wf.width * 2.3, 1]}
                >
                  <spriteMaterial
                    map={mistTex}
                    color="#faeadd"
                    transparent
                    opacity={0.58 * (1 - def.haze * 0.4)}
                    depthWrite={false}
                  />
                </sprite>
              </group>
            );
          })}
        </group>
      ))}

      {/* Sculpted floating sky monoliths / ribbed balloon-rocks matching 0.8s - 3.2s */}
      {SKY_MONOLITHS.map((m, idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            monolithRefs.current[idx] = el;
          }}
          geometry={monolithGeo}
          position={m.pos}
          scale={m.scale}
        >
          <meshStandardMaterial
            map={rockPBR.map}
            normalMap={rockPBR.normalMap}
            color="#bfa998"
            emissive="#f0d9c4"
            emissiveIntensity={m.haze * 0.48}
            roughness={0.86}
            metalness={0.04}
          />
        </mesh>
      ))}
    </group>
  );
}
