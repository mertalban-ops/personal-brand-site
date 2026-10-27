"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { getAppleGlowTexture, getBarkPBR, getLeafSprigPBR } from "@/lib/labs/pbrTextures";
import {
  CRYSTAL_APPLE_FRAGMENT,
  CRYSTAL_APPLE_VERTEX,
  getSculptedAppleGeometries,
} from "./Apple";

type Quality = "high" | "low";

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash3(x: number, y: number, z: number) {
  const h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453123;
  return h - Math.floor(h);
}

function noise3D(x: number, y: number, z: number) {
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

function buildOrganicLimb(
  points: THREE.Vector3[],
  rStart: number,
  rEnd: number,
  tubularSegments = 18,
  radialSegments = 9,
  grooveDepth = 0.11,
  twist = 1.7,
): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3(points);
  const frames = curve.computeFrenetFrames(tubularSegments, false);
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  // Rich golden-brown bark palette matching 2.4s & 4.8s
  // Warmer, lighter bark: the reference boughs glow honey-brown under the apples' light
  const cBase = new THREE.Color("#a0744a");
  const cCrevice = new THREE.Color("#4a2e18");
  const cHighlight = new THREE.Color("#d6a46c");
  const cInnerGlow = new THREE.Color("#e6aa5e");
  const cMoss = new THREE.Color("#638638");
  const tmpCol = new THREE.Color();

  for (let i = 0; i <= tubularSegments; i++) {
    const u = i / tubularSegments;
    const pt = curve.getPointAt(u);
    const N = frames.normals[i];
    const B = frames.binormals[i];
    const taper = Math.pow(1 - u, 0.74);
    const baseR = rEnd + (rStart - rEnd) * taper;

    for (let j = 0; j <= radialSegments; j++) {
      const v = j / radialSegments;
      const theta = v * Math.PI * 2;
      const ridge =
        Math.sin(theta * 7 + u * twist * Math.PI * 2) * 0.54 +
        Math.sin(theta * 13 - u * twist * 3.0) * 0.32 +
        (noise3D(pt.x * 1.6, pt.y * 1.6, pt.z * 1.6) * 2 - 1) * 0.36;
      const r = Math.max(0.014, baseR * (1 + ridge * grooveDepth));

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

      tmpCol.copy(cBase);
      if (ridge < 0) tmpCol.lerp(cCrevice, Math.min(1, -ridge * 0.88));
      else tmpCol.lerp(cHighlight, Math.min(1, ridge * 0.75));

      // Warm golden inner-canopy bounce light on upper trunk & inner boughs (matching 2.4s & 4.8s)
      if (vy > 1.55) {
        const canopyBounce =
          Math.min(1, (vy - 1.55) / 2.1) *
          Math.max(0, 1 - Math.hypot(vx, vz) / 4.4) *
          0.52;
        tmpCol.lerp(cInnerGlow, canopyBounce);
      }
      // Sunlit right-side rim warmth
      if (dirX > 0.15) {
        tmpCol.lerp(cInnerGlow, dirX * 0.25);
      }
      // Subtle mossy blend where roots meet the grassy island mound
      if (vy < 0.62 && dirY > 0.12) {
        const mossFactor = Math.max(0, (0.62 - vy) / 0.62) * 0.45;
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

function buildHeroTreeStructure(quality: Quality) {
  const rand = mulberry32(2026);
  const parts: THREE.BufferGeometry[] = [];
  const leafCenters: { pos: THREE.Vector3; scale: number; tier: number }[] = [];
  const decorativeApples: { pos: THREE.Vector3; scale: number }[] = [];

  const segScale = quality === "high" ? 1 : 0.65;

  // 1. Massive ancient gnarled central trunk core + 11 braided organic trunk strands (matching 2.4s & 4.8s)
  parts.push(
    buildOrganicLimb(
      [
        new THREE.Vector3(0, -0.1, 0),
        new THREE.Vector3(0.08, 0.9, -0.05),
        new THREE.Vector3(-0.07, 1.82, 0.06),
        new THREE.Vector3(0, 2.72, 0),
      ],
      1.06,
      0.66,
      Math.round(22 * segScale),
      Math.round(14 * segScale),
      0.14,
      2.0,
    ),
  );

  const strandCount = 11;
  for (let s = 0; s < strandCount; s++) {
    const a0 = (s / strandCount) * Math.PI * 2;
    const twistA = 0.85 + (s % 2 === 0 ? 0.32 : -0.25);
    const pts = [
      new THREE.Vector3(Math.cos(a0) * 0.94, -0.02, Math.sin(a0) * 0.94),
      new THREE.Vector3(
        Math.cos(a0 + twistA * 0.35) * 0.58,
        0.88,
        Math.sin(a0 + twistA * 0.35) * 0.58,
      ),
      new THREE.Vector3(
        Math.cos(a0 + twistA * 0.7) * 0.48,
        1.78,
        Math.sin(a0 + twistA * 0.7) * 0.48,
      ),
      new THREE.Vector3(
        Math.cos(a0 + twistA) * 0.62,
        2.68,
        Math.sin(a0 + twistA) * 0.62,
      ),
    ];
    parts.push(
      buildOrganicLimb(
        pts,
        0.44,
        0.27,
        Math.round(18 * segScale),
        Math.round(10 * segScale),
        0.15,
        2.4,
      ),
    );
  }

  // 2. 26 sinuous buttress & surface-hugging roots radiating across the undulating island mound
  const rootCount = 26;
  for (let r = 0; r < rootCount; r++) {
    const angle = (r / rootCount) * Math.PI * 2 + (rand() - 0.5) * 0.14;
    const isLongRoot = r % 2 === 0;
    const reach = isLongRoot ? 4.45 + rand() * 0.48 : 2.75 + rand() * 1.3;
    const sideBend = (rand() - 0.5) * 0.42;

    const moundY = (rad: number) =>
      Math.cos(Math.min(1, rad / 5.2) * Math.PI * 0.5) * 0.4 - 0.02;

    const p0 = new THREE.Vector3(
      Math.cos(angle) * 0.68,
      0.92 + rand() * 0.38,
      Math.sin(angle) * 0.68,
    );
    const r1 = 1.62;
    const p1 = new THREE.Vector3(
      Math.cos(angle + sideBend * 0.32) * r1,
      moundY(r1) + 0.15 + rand() * 0.08,
      Math.sin(angle + sideBend * 0.32) * r1,
    );
    const r2 = reach * 0.65;
    const p2 = new THREE.Vector3(
      Math.cos(angle + sideBend * 0.68) * r2,
      moundY(r2) + 0.06 + rand() * 0.05,
      Math.sin(angle + sideBend * 0.68) * r2,
    );
    const p3 = new THREE.Vector3(
      Math.cos(angle + sideBend) * reach,
      moundY(reach) - 0.02,
      Math.sin(angle + sideBend) * reach,
    );

    parts.push(
      buildOrganicLimb(
        [p0, p1, p2, p3],
        0.37 + rand() * 0.09,
        0.032,
        Math.round(15 * segScale),
        Math.round(8 * segScale),
        0.13,
        1.6,
      ),
    );

    // Secondary rootlets weaving across the mossy ground
    if (r % 2 === 0) {
      const forkAngle = angle + sideBend * 0.5 + (r % 4 === 0 ? 0.28 : -0.28);
      const forkR = reach * 0.9;
      const forkMid = p1.clone().lerp(p2, 0.45);
      const forkEnd = new THREE.Vector3(
        Math.cos(forkAngle) * forkR,
        moundY(forkR) - 0.01,
        Math.sin(forkAngle) * forkR,
      );
      parts.push(
        buildOrganicLimb(
          [forkMid, forkEnd],
          0.16,
          0.024,
          Math.round(9 * segScale),
          6,
          0.09,
          1.1,
        ),
      );
    }
  }

  // 3. Broad Umbrella-Dome Canopy Boughs (12 sweeping primary boughs + S-curved secondary & tertiary forks)
  // Tuned so outer lateral tips curve gracefully into a rounded umbrella skirt (NOT high boxy corners!)
  // while exposing the sculptural branch architecture underneath like 2.4s & 4.8s.
  const primaryCount = 12;
  for (let i = 0; i < primaryCount; i++) {
    const baseAngle = (i / primaryCount) * Math.PI * 2 + (rand() - 0.5) * 0.14;
    // Vase form: limbs leave the trunk at ~25–35° and climb, so the crown sits high above an open,
    // readable branch architecture (reference 0.0s / 4.8s) instead of a flat bough "table".
    const elev = 0.44 + (i % 3) * 0.06 + rand() * 0.05;
    const length = 2.85 + rand() * 0.42;

    const p0 = new THREE.Vector3(
      Math.cos(baseAngle) * 0.38,
      2.05 + (i % 2) * 0.2,
      Math.sin(baseAngle) * 0.38,
    );
    const p1 = new THREE.Vector3(
      Math.cos(baseAngle + 0.12) * (length * 0.42),
      p0.y + length * elev * 0.8,
      Math.sin(baseAngle + 0.12) * (length * 0.42),
    );
    const p2 = new THREE.Vector3(
      Math.cos(baseAngle - 0.05) * length,
      p0.y + length * elev,
      Math.sin(baseAngle - 0.05) * length,
    );
    parts.push(
      buildOrganicLimb(
        [p0, p1, p2],
        0.37,
        0.16,
        Math.round(14 * segScale),
        Math.round(9 * segScale),
        0.1,
        1.5,
      ),
    );

    // Mid-bough interior foliage cluster placed higher above the bough so cathedral branch underside & skylights remain readable (4.8s)!
    // Smaller and higher than before: opens the canopy underside so the branch architecture
    // reads from below, as in the reference close-ups
    leafCenters.push({
      pos: p1.clone().add(new THREE.Vector3(0, 1.15, 0)),
      scale: 0.62,
      tier: 1,
    });
    // Apples on the upper/front dome too, not only along the lower canopy skirt
    const outward = new THREE.Vector3(Math.cos(baseAngle), 0, Math.sin(baseAngle));
    decorativeApples.push({
      pos: p1.clone().add(outward.multiplyScalar(1.15)).add(new THREE.Vector3(0, 1.45, 0)),
      scale: 0.5 + rand() * 0.25,
    });

    const secCount = 3;
    for (let s = 0; s < secCount; s++) {
      const yawOffset = (s - 1) * 0.42 + (rand() - 0.5) * 0.14;
      const secAngle = baseAngle + yawOffset;
      const secLen = 1.48 + rand() * 0.38;
      const startPt = s === 0 ? p1.clone().lerp(p2, 0.58) : p2.clone();
      const sMid = new THREE.Vector3(
        startPt.x + Math.cos(secAngle) * (secLen * 0.52),
        startPt.y + (0.08 + rand() * 0.12) * secLen * 0.5,
        startPt.z + Math.sin(secAngle) * (secLen * 0.52),
      );
      const sEnd = new THREE.Vector3(
        startPt.x + Math.cos(secAngle + (rand() - 0.5) * 0.16) * secLen,
        startPt.y + (-0.02 + rand() * 0.12) * secLen,
        startPt.z + Math.sin(secAngle + (rand() - 0.5) * 0.16) * secLen,
      );
      parts.push(
        buildOrganicLimb(
          [startPt, sMid, sEnd],
          0.165,
          0.068,
          Math.round(10 * segScale),
          Math.round(7 * segScale),
          0.07,
          1.1,
        ),
      );

      leafCenters.push({
        pos: sEnd.clone().add(new THREE.Vector3(0, 0.42, 0)),
        scale: 0.88,
        tier: 1,
      });

      // Decorative translucent crystal golden apples hanging beneath secondary branches (matching 2.4s & 4.8s)
      if ((i + s) % 2 === 0) {
        decorativeApples.push({
          pos: new THREE.Vector3(
            sMid.x + (rand() - 0.5) * 0.28,
            sMid.y - 0.34 - rand() * 0.14,
            sMid.z + (rand() - 0.5) * 0.28,
          ),
          scale: 0.62 + rand() * 0.26,
        });
      }

      for (let t = 0; t < 3; t++) {
        const tAngle = secAngle + (t - 1) * 0.4 + (rand() - 0.5) * 0.16;
        const tLen = 0.82 + rand() * 0.34;
        const tEnd = new THREE.Vector3(
          sEnd.x + Math.cos(tAngle) * tLen,
          sEnd.y + (-0.06 + rand() * 0.14) * tLen,
          sEnd.z + Math.sin(tAngle) * tLen,
        );
        parts.push(
          buildOrganicLimb(
            [sEnd.clone(), tEnd],
            0.068,
            0.024,
            Math.round(7 * segScale),
            5,
            0.05,
            0.8,
          ),
        );
        leafCenters.push({
          pos: tEnd.clone().add(new THREE.Vector3(0, 0.16, 0)),
          scale: 0.82,
          tier: 2,
        });

        // Glowing golden apples sit on the OUTER canopy shell (reference 0.0s–4.8s shows dozens
        // studding the crown surface), pushed just outside the leaf clusters so they read.
        if ((i + s + t) % 3 === 0) {
          const out = new THREE.Vector3(tEnd.x, 0, tEnd.z).normalize();
          decorativeApples.push({
            pos: new THREE.Vector3(
              tEnd.x + out.x * (0.42 + rand() * 0.2),
              tEnd.y - 0.06 + (rand() - 0.5) * 0.3,
              tEnd.z + out.z * (0.42 + rand() * 0.2),
            ),
            scale: 0.5 + rand() * 0.32,
          });
        }
      }
    }
  }

  // 4. Ascending Crown Dome Branches forming a graceful, rounded mushroom/umbrella dome (0.0s & 2.4s)
  for (let c = 0; c < 12; c++) {
    const ca = (c / 12) * Math.PI * 2 + 0.15;
    const rad = c % 2 === 0 ? 1.45 : 2.35;
    const topY = c % 2 === 0 ? 5.75 : 5.3;
    const pStart = new THREE.Vector3(Math.cos(ca) * 0.26, 2.62, Math.sin(ca) * 0.26);
    const pMid = new THREE.Vector3(
      Math.cos(ca) * (rad * 0.52),
      4.35,
      Math.sin(ca) * (rad * 0.52),
    );
    const pTop = new THREE.Vector3(Math.cos(ca) * rad, topY, Math.sin(ca) * rad);
    parts.push(
      buildOrganicLimb(
        [pStart, pMid, pTop],
        0.25,
        0.068,
        Math.round(12 * segScale),
        7,
        0.08,
        1.2,
      ),
    );
    leafCenters.push({
      pos: pMid.clone().add(new THREE.Vector3(0, 0.55, 0)),
      scale: 1.08,
      tier: 3,
    });
    leafCenters.push({
      pos: pTop.clone().add(new THREE.Vector3(0, 0.22, 0)),
      scale: 1.05,
      tier: 3,
    });
    decorativeApples.push({
      pos: new THREE.Vector3(pTop.x * 1.12, pTop.y + 0.32, pTop.z * 1.12),
      scale: 0.5 + rand() * 0.22,
    });
  }
  // Rounded central apex dome billow clusters
  leafCenters.push({ pos: new THREE.Vector3(0, 6.0, 0.15), scale: 1.25, tier: 3 });
  leafCenters.push({ pos: new THREE.Vector3(0, 5.85, 1.15), scale: 1.14, tier: 3 });
  leafCenters.push({ pos: new THREE.Vector3(-0.85, 5.75, 0.95), scale: 1.08, tier: 3 });
  leafCenters.push({ pos: new THREE.Vector3(0.85, 5.78, 0.95), scale: 1.08, tier: 3 });
  leafCenters.push({ pos: new THREE.Vector3(-0.82, 5.82, -0.55), scale: 1.08, tier: 3 });
  leafCenters.push({ pos: new THREE.Vector3(0.82, 5.84, -0.55), scale: 1.08, tier: 3 });

  // 5. Four lush secondary bonsai trees on the main island shoulders (matching 0.0s, 2.4s & 6.4s)
  const flankTrees = [
    { pos: new THREE.Vector3(-3.38, 0.05, -0.82), scale: 0.42, lean: -0.22 },
    { pos: new THREE.Vector3(-2.15, 0.12, -1.75), scale: 0.48, lean: -0.12 },
    { pos: new THREE.Vector3(2.02, 0.12, -1.68), scale: 0.46, lean: 0.15 },
    { pos: new THREE.Vector3(3.45, 0.05, -0.52), scale: 0.38, lean: 0.24 },
  ];
  for (const ft of flankTrees) {
    const top = ft.pos.clone().add(new THREE.Vector3(ft.lean * 1.35, 2.15 * ft.scale, 0));
    const mid = ft.pos
      .clone()
      .lerp(top, 0.55)
      .add(new THREE.Vector3(ft.lean * 0.45, 0.1, 0.1));
    parts.push(
      buildOrganicLimb([ft.pos, mid, top], 0.21 * ft.scale, 0.072 * ft.scale, 9, 6, 0.08, 1.1),
    );
    leafCenters.push({
      pos: top.clone().add(new THREE.Vector3(0, 0.18, 0)),
      scale: 0.56 * ft.scale * 2.1,
      tier: 0,
    });
    for (let b = 0; b < 5; b++) {
      const ba = (b / 5) * Math.PI * 2 + 0.35;
      const bEnd = top
        .clone()
        .add(
          new THREE.Vector3(
            Math.cos(ba) * 1.0 * ft.scale,
            (0.24 + (b % 2) * 0.12) * ft.scale,
            Math.sin(ba) * 1.0 * ft.scale,
          ),
        );
      parts.push(
        buildOrganicLimb([top, bEnd], 0.068 * ft.scale, 0.022 * ft.scale, 6, 5, 0.05, 0.6),
      );
      leafCenters.push({ pos: bEnd, scale: 0.5 * ft.scale * 2.0, tier: 0 });
    }
  }

  const branchGeo = mergeGeometries(parts, false)!;
  parts.forEach((g) => g.dispose());
  return { branchGeo, leafCenters, decorativeApples };
}

/**
 * Crossed 3D botanical sprig geometry (three curved/angled quads at different orientations)
 * so leaf clusters have rich 3D volume from every camera angle and never look like flat cards.
 */
function build3DLeafClusterGeometry(): THREE.BufferGeometry {
  function makeCurvedQuad(w: number, h: number): THREE.BufferGeometry {
    const g = new THREE.PlaneGeometry(w, h, 3, 3);
    const pos = g.getAttribute("position");
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const bendZ = -((x * x + y * y) * 0.24);
      pos.setZ(i, bendZ);
    }
    g.computeVertexNormals();
    return g;
  }

  const p1 = makeCurvedQuad(0.88, 0.88);
  p1.rotateX(-0.32);

  const p2 = makeCurvedQuad(0.88, 0.88);
  p2.rotateY(Math.PI * 0.5);
  p2.rotateZ(0.26);

  const p3 = makeCurvedQuad(0.82, 0.82);
  p3.rotateX(Math.PI * 0.34);
  p3.rotateY(Math.PI * 0.25);

  const merged = mergeGeometries([p1, p2, p3], false)!;
  p1.dispose();
  p2.dispose();
  p3.dispose();
  merged.computeVertexNormals();
  return merged;
}

export default function TreeOfLife({ quality = "high" }: { quality?: Quality }) {
  const { branchGeo, leafCenters, decorativeApples } = useMemo(
    () => buildHeroTreeStructure(quality),
    [quality],
  );
  const barkPBR = useMemo(() => getBarkPBR(), []);
  const leafPBR = useMemo(() => getLeafSprigPBR(), []);
  const { appleGeo, twinCrownGeo, stemGeo } = useMemo(() => getSculptedAppleGeometries(), []);

  // More, smaller sprigs → finer leaf texture & a bumpier crown silhouette
  const sprigsPerCenter = quality === "high" ? 20 : 9;
  const sprigScale = quality === "high" ? 0.78 : 1.0;
  const totalSprigs = leafCenters.length * sprigsPerCenter;

  const foliageMesh = useMemo(() => {
    const clusterGeo = build3DLeafClusterGeometry();
    const mat = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      map: leafPBR.map,
      normalMap: leafPBR.normalMap,
      normalScale: new THREE.Vector2(0.7, 0.7),
      // Warm golden-olive subsurface translucency when backlit by the sunset key light
      emissive: new THREE.Color("#3c5416"),
      emissiveIntensity: 0.1,
      alphaTest: 0.35,
      side: THREE.DoubleSide,
      roughness: 0.68,
      metalness: 0.02,
    });

    const mesh = new THREE.InstancedMesh(clusterGeo, mat, totalSprigs);
    const rand = mulberry32(777);
    const dummy = new THREE.Object3D();
    const col = new THREE.Color();

    // Multi-layered botanical palette matching 0.0s, 2.4s & 4.8s:
    // Sunlit golden-chartreuse upper/right crown -> warm olive mid-crown -> deep forest inner shade
    // Olive/sage reference palette (the old chartreuse read as a stylised game tree)
    const sunRimTones = ["#c9cf78", "#b8c266", "#d4c97a"];
    const upperMidTones = ["#8e9c48", "#7f8f3e", "#9aa452"];
    const innerWarmTones = ["#64742e", "#566a28", "#6f7a34"];
    const deepShadeTones = ["#38491c", "#2f4017", "#425222"];

    let idx = 0;
    for (const lc of leafCenters) {
      for (let k = 0; k < sprigsPerCenter; k++) {
        const r = (0.18 + rand() * 0.78) * lc.scale;
        const theta = rand() * Math.PI * 2;
        const phi = (rand() - 0.32) * Math.PI * 0.8;
        const ox = Math.cos(theta) * Math.cos(phi) * r;
        const oy = Math.sin(phi) * r * 0.62;
        const oz = Math.sin(theta) * Math.cos(phi) * r;

        dummy.position.set(lc.pos.x + ox, lc.pos.y + oy, lc.pos.z + oz);
        dummy.rotation.set(
          (rand() - 0.5) * 0.9,
          rand() * Math.PI * 2,
          (rand() - 0.5) * 0.9,
        );
        const s = (0.52 + rand() * 0.48) * lc.scale * sprigScale;
        dummy.scale.set(s, s * 0.86, s);
        dummy.updateMatrix();
        mesh.setMatrixAt(idx, dummy.matrix);

        // Color based on height, radial shell & upper-right sun direction (+x, +y)
        const sunFacing =
          dummy.position.x * 0.16 + dummy.position.y * 0.22 + oy * 0.45;
        if (sunFacing > 1.18 || (lc.tier === 3 && oy > 0.05)) {
          col.set(sunRimTones[(rand() * sunRimTones.length) | 0]);
        } else if (sunFacing > 0.75 || lc.tier === 3) {
          col.set(upperMidTones[(rand() * upperMidTones.length) | 0]);
        } else if (sunFacing > 0.42) {
          col.set(innerWarmTones[(rand() * innerWarmTones.length) | 0]);
        } else {
          col.set(deepShadeTones[(rand() * deepShadeTones.length) | 0]);
        }
        mesh.setColorAt(idx, col);
        idx++;
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    return mesh;
  }, [leafCenters, leafPBR, sprigsPerCenter, sprigScale, totalSprigs]);

  // Decorative smaller translucent crystal golden apples + twin arching leaves high/deep in the boughs (matching 2.4s & 4.8s)
  // Uses the EXACT same CRYSTAL_APPLE_VERTEX & CRYSTAL_APPLE_FRAGMENT shader as hero apples (ZERO flat orange spheres!)
  const decoUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 1.35 },
      uDimmed: { value: 0.0 },
    }),
    [],
  );

  const { decoAppleMesh, decoLeafMesh, decoStemMesh } = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      vertexShader: CRYSTAL_APPLE_VERTEX,
      fragmentShader: CRYSTAL_APPLE_FRAGMENT,
      uniforms: decoUniforms,
      transparent: true,
    });
    const aMesh = new THREE.InstancedMesh(appleGeo, mat, decorativeApples.length);

    const lMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      emissive: "#52761e",
      emissiveIntensity: 0.4,
      roughness: 0.48,
      side: THREE.DoubleSide,
    });
    const lMesh = new THREE.InstancedMesh(twinCrownGeo, lMat, decorativeApples.length);

    const sMat = new THREE.MeshStandardMaterial({
      color: "#5d4024",
      roughness: 0.88,
    });
    const stMesh = new THREE.InstancedMesh(stemGeo, sMat, decorativeApples.length);

    const dummy = new THREE.Object3D();
    decorativeApples.forEach((item, i) => {
      dummy.position.copy(item.pos);
      dummy.rotation.set(0, (i * 1.7) % (Math.PI * 2), 0);
      // Background fruit stays smaller than the clickable project apples (reference proportions)
      dummy.scale.setScalar(item.scale * 0.85);
      dummy.updateMatrix();
      aMesh.setMatrixAt(i, dummy.matrix);
      lMesh.setMatrixAt(i, dummy.matrix);
      stMesh.setMatrixAt(i, dummy.matrix);
    });
    aMesh.instanceMatrix.needsUpdate = true;
    lMesh.instanceMatrix.needsUpdate = true;
    stMesh.instanceMatrix.needsUpdate = true;
    return { decoAppleMesh: aMesh, decoLeafMesh: lMesh, decoStemMesh: stMesh };
  }, [decorativeApples, appleGeo, twinCrownGeo, stemGeo, decoUniforms]);

  // Soft warm light halo per apple: the reference apples visibly light the leaves around them
  const glowTex = useMemo(() => getAppleGlowTexture(), []);
  const appleHaloGeo = useMemo(() => {
    const pos = new Float32Array(decorativeApples.length * 3);
    decorativeApples.forEach((a, i) => {
      pos[i * 3] = a.pos.x;
      pos[i * 3 + 1] = a.pos.y;
      pos[i * 3 + 2] = a.pos.z;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [decorativeApples]);

  const canopyGroup = useRef<THREE.Group>(null);
  useFrame((state) => {
    const g = canopyGroup.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    decoUniforms.uTime.value = t;
    // Gentle multi-frequency breeze on the foliage crown while roots stay anchored on the island
    g.rotation.z = Math.sin(t * 0.55) * 0.008 + Math.sin(t * 1.25) * 0.0035;
    g.rotation.x = Math.cos(t * 0.45) * 0.0055;
  });

  return (
    <group>
      {/* Gnarled braided trunk, 26 surface-wrapping roots & multi-tier branches */}
      <mesh geometry={branchGeo} castShadow receiveShadow>
        <meshStandardMaterial
          map={barkPBR.map}
          normalMap={barkPBR.normalMap}
          normalScale={new THREE.Vector2(1.3, 1.3)}
          roughnessMap={barkPBR.roughnessMap}
          roughness={0.82}
          metalness={0.04}
          vertexColors
        />
      </mesh>

      {/* Wind-swaying 3D pointed-leaf canopy & background crystal golden fruits */}
      <group ref={canopyGroup}>
        <primitive object={foliageMesh} />
        <primitive object={decoAppleMesh} />
        <primitive object={decoStemMesh} />
        <primitive object={decoLeafMesh} />
        <points geometry={appleHaloGeo}>
          <pointsMaterial
            map={glowTex}
            color="#ffb84a"
            size={0.95}
            transparent
            opacity={0.38}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>
    </group>
  );
}
