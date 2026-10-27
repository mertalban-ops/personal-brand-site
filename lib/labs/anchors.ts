// Deterministic, collision-aware, multi-depth apple placement on the Tree of Life canopy.
//
// Guarantees:
//  - Every published project gets one hero interactive golden apple (1 project = 1 apple).
//  - Apples are placed with organic variation in depth (some further out on foreground boughs,
//    some nestled deeper inside the illuminated canopy) and natural size variation (scale 0.88–1.18),
//    matching reference frames 2400ms.jpg & 4800ms.jpg.
//  - Supports up to 64 published projects deterministically.

import { TREE } from "./treeConfig";
import type { LabProject } from "@/data/labs";

export interface AppleAnchor {
  project: LabProject;
  position: [number, number, number];
  normal: [number, number, number];
  scale?: number;
}

export const POOL_SIZE = 64;

function fnv1a(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// Hand-tuned hero bough slots for the first 12 projects:
// Natural asymmetric distribution across foreground, mid-depth inner boughs, upper crown,
// and 360° back boughs so the tree feels organically fruited like 2400ms.jpg & 4800ms.jpg.
const HERO_BOUGH_SLOTS: {
  position: [number, number, number];
  normal: [number, number, number];
  scale: number;
}[] = [
  // Slots 1–6 hang just below the front canopy skirt of the vase-form tree, spread so every
  // project apple is visible (none buried in foliage or hidden behind the trunk) from the hero view.
  // 1. Center-front, under the central fork
  { position: [0.15, 3.45, 3.35], normal: [0.04, -0.15, 0.99], scale: 1.18 },
  // 2. Upper-left bough
  { position: [-2.55, 3.85, 2.75], normal: [-0.68, 0.05, 0.73], scale: 1.12 },
  // 3. Upper-right bough
  { position: [2.65, 3.7, 2.6], normal: [0.7, 0.02, 0.71], scale: 1.14 },
  // 4. Left flank, lower
  { position: [-3.75, 3.2, 0.9], normal: [-0.95, -0.12, 0.28], scale: 1.0 },
  // 5. Right flank, lower
  { position: [3.8, 3.15, 0.75], normal: [0.96, -0.12, 0.25], scale: 1.0 },
  // 6. Mid-left inner bough, between 1 and 2
  { position: [-1.25, 3.05, 2.95], normal: [-0.4, -0.2, 0.89], scale: 1.04 },
  // 7. Back-right bough (visible at 90°-180° orbit)
  { position: [2.42, 3.35, -2.38], normal: [0.69, -0.14, -0.71], scale: 1.05 },
  // 8. Back-left bough (visible at 180°-270° orbit)
  { position: [-2.32, 3.4, -2.45], normal: [-0.68, -0.14, -0.72], scale: 1.04 },
  // 9. Back-center hero bough (180° orbit)
  { position: [0.1, 3.58, -3.22], normal: [0.04, -0.15, -0.98], scale: 1.12 },
  // 10. Lower-left drooping outer bough
  { position: [-2.95, 2.72, 1.85], normal: [-0.85, -0.22, 0.48], scale: 0.94 },
  // 11. Mid-left flank bough (90°/270° orbit)
  { position: [-3.42, 3.25, -0.95], normal: [-0.93, -0.14, -0.34], scale: 0.98 },
  // 12. Mid-right flank bough (90°/270° orbit)
  { position: [3.38, 3.28, -1.05], normal: [0.93, -0.14, -0.35], scale: 1.0 },
];

function buildAnchorPool(): {
  position: [number, number, number];
  normal: [number, number, number];
  scale: number;
}[] {
  const [cx, cy, cz] = TREE.canopyCenter;
  const [rx, ry, rz] = TREE.canopyRadius;
  const pool = [...HERO_BOUGH_SLOTS];
  const golden = Math.PI * (1 + Math.sqrt(5));
  const candidates = Math.ceil(POOL_SIZE * 2.2);
  for (let i = 0; i < candidates && pool.length < POOL_SIZE; i++) {
    const k = i + 0.5;
    const y = 1 - (2 * k) / candidates;
    if (y > 0.78 || y < -0.42) continue;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * k;
    const dir: [number, number, number] = [Math.cos(theta) * r, y, Math.sin(theta) * r];
    // Vary radial depth between 0.74 (nestled inside boughs) and 0.92 (outer tips)
    const shell = 0.76 + ((i * 7) % 17) * 0.01;
    const position: [number, number, number] = [
      cx + dir[0] * rx * shell,
      cy + dir[1] * ry * shell,
      cz + dir[2] * rz * shell,
    ];
    const tooClose = pool.some(
      (p) =>
        Math.hypot(
          p.position[0] - position[0],
          p.position[1] - position[1],
          p.position[2] - position[2],
        ) < 0.82,
    );
    if (tooClose) continue;

    const nx = dir[0] / rx;
    const ny = dir[1] / ry;
    const nz = dir[2] / rz;
    const nl = Math.hypot(nx, ny, nz) || 1;
    const scale = 0.88 + ((i * 13) % 30) * 0.01;
    pool.push({ position, normal: [nx / nl, ny / nl, nz / nl], scale });
  }
  return pool;
}

const ANCHOR_POOL = buildAnchorPool();

export function anchorPoolSize(): number {
  return ANCHOR_POOL.length;
}

export function assignAnchors(projects: LabProject[]): AppleAnchor[] {
  const ordered = [...projects].sort((a, b) => {
    if (a.createdAt !== b.createdAt) return a.createdAt < b.createdAt ? -1 : 1;
    return a.id < b.id ? -1 : 1;
  });

  const taken = new Array<boolean>(ANCHOR_POOL.length).fill(false);
  const result: AppleAnchor[] = [];

  ordered.forEach((project, idx) => {
    let slot = -1;
    if (idx < 6 && !taken[idx]) {
      slot = idx;
    } else {
      const primary = fnv1a(project.id) % ANCHOR_POOL.length;
      for (let probe = 0; probe < ANCHOR_POOL.length; probe++) {
        const candidate = (primary + probe) % ANCHOR_POOL.length;
        if (!taken[candidate]) {
          slot = candidate;
          break;
        }
      }
    }
    if (slot === -1) return;
    taken[slot] = true;
    const a = ANCHOR_POOL[slot];
    result.push({
      project,
      position: a.position,
      normal: a.normal,
      scale: a.scale,
    });
  });

  return result;
}
