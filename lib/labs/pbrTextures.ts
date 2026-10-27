// High-definition procedural PBR textures, botanical foliage atlases,
// volumetric cloud puff textures, waterfall flow maps, and Golden-Hour IBL
// environment map for the Albanexa Labs "Tree of Life" world.

import * as THREE from "three";

let cachedBark: {
  map: THREE.Texture;
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
} | null = null;
let cachedRock: {
  map: THREE.Texture;
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
} | null = null;
let cachedStone: {
  map: THREE.Texture;
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
} | null = null;
let cachedMeadow: {
  map: THREE.Texture;
  normalMap: THREE.Texture;
} | null = null;
let cachedLeaf: {
  map: THREE.Texture;
  normalMap: THREE.Texture;
} | null = null;
let cachedMoon: THREE.Texture | null = null;
let cachedWater: THREE.Texture | null = null;
let cachedGlow: THREE.Texture | null = null;
let cachedCloudPuff: THREE.Texture | null = null;
let cachedEnvMap: THREE.Texture | null = null;

function hash2(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function valueNoise2D(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm2D(x: number, y: number, octaves = 5): number {
  let v = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    v += amp * valueNoise2D(x * freq, y * freq);
    freq *= 2.04;
    amp *= 0.5;
  }
  return v;
}

/**
 * Generates an equirectangular Golden-Hour IBL Environment Map so crystal apples,
 * water streams, wet rocks, and foliage receive authentic warm sunset reflections
 * and sky-bounce illumination.
 */
export function getGoldenHourEnvMap(): THREE.Texture {
  if (cachedEnvMap) return cachedEnvMap;
  const w = 512;
  const h = 256;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  const img = ctx.createImageData(w, h);
  // Sun direction in equirectangular UV roughly at u=0.68, v=0.34
  const sunU = 0.68;
  const sunV = 0.34;

  for (let y = 0; y < h; y++) {
    const v = y / h; // 0 = zenith, 0.5 = horizon, 1 = nadir
    for (let x = 0; x < w; x++) {
      const u = x / w;

      let r = 0;
      let g = 0;
      let b = 0;

      if (v <= 0.52) {
        // Sky dome: soft periwinkle-lavender zenith -> warm peach-gold horizon
        const t = Math.min(1, v / 0.52);
        const tSmooth = t * t * (3 - 2 * t);
        r = 148 + (252 - 148) * tSmooth;
        g = 160 + (222 - 160) * tSmooth;
        b = 198 + (186 - 198) * tSmooth;
      } else {
        // Cloud sea bounce below horizon: warm apricot-cream -> soft rose-mauve nadir
        const t = Math.min(1, (v - 0.52) / 0.48);
        r = 248 + (192 - 248) * t;
        g = 216 + (165 - 216) * t;
        b = 186 + (178 - 186) * t;
      }

      // Add warm golden sun bloom around (sunU, sunV)
      const du = Math.min(Math.abs(u - sunU), 1 - Math.abs(u - sunU));
      const dv = v - sunV;
      const dist = Math.hypot(du * 1.6, dv);
      const sunGlow = Math.exp(-dist * 5.2);
      const sunCore = Math.exp(-dist * 18.0);

      r = Math.min(255, r + sunGlow * 55 + sunCore * 80);
      g = Math.min(255, g + sunGlow * 38 + sunCore * 65);
      b = Math.min(255, b + sunGlow * 14 + sunCore * 40);

      const idx = (y * w + x) * 4;
      img.data[idx] = Math.floor(r);
      img.data[idx + 1] = Math.floor(g);
      img.data[idx + 2] = Math.floor(b);
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  cachedEnvMap = tex;
  return tex;
}

/**
 * High-detail gnarled ancient bark PBR (512x512) with warm amber-brown ridges,
 * deep organic crevices, and subtle moss/lichen variation.
 */
export function getBarkPBR(): {
  map: THREE.Texture;
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
} {
  if (cachedBark) return cachedBark;
  const w = 512;
  const h = 512;

  const colCanvas = document.createElement("canvas");
  const normCanvas = document.createElement("canvas");
  const roughCanvas = document.createElement("canvas");
  colCanvas.width = normCanvas.width = roughCanvas.width = w;
  colCanvas.height = normCanvas.height = roughCanvas.height = h;

  const colCtx = colCanvas.getContext("2d")!;
  const normCtx = normCanvas.getContext("2d")!;
  const roughCtx = roughCanvas.getContext("2d")!;

  const colImg = colCtx.createImageData(w, h);
  const normImg = normCtx.createImageData(w, h);
  const roughImg = roughCtx.createImageData(w, h);

  const heights = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      // Flowing braided bark fibers with domain warping
      const warpX = fbm2D(u * 7, v * 4, 4) * 0.22;
      const warpY = fbm2D(u * 5 + 3.1, v * 6 + 1.4, 3) * 0.15;
      const ridge1 = Math.sin((u + warpX) * Math.PI * 22) * 0.5 + 0.5;
      const ridge2 = Math.sin((u * 2 - warpY) * Math.PI * 19 + v * 4) * 0.5 + 0.5;
      const fineGrain = fbm2D(u * 36, v * 16, 4);
      const knot = fbm2D(u * 10, v * 10, 3);

      const val = Math.pow(ridge1 * 0.52 + ridge2 * 0.24 + fineGrain * 0.24, 0.92);
      heights[y * w + x] = val;

      const idx = (y * w + x) * 4;
      // Warm sunlit cinnamon/amber-brown bark ridges + deep umber crevices (matching 2400ms.jpg & 4800ms.jpg)
      const creviceAO = Math.max(0, Math.min(1, (val - 0.12) / 0.88));
      const warmTint = knot * 18;
      colImg.data[idx] = Math.min(255, Math.floor(48 + creviceAO * 112 + warmTint));
      colImg.data[idx + 1] = Math.min(255, Math.floor(31 + creviceAO * 78 + warmTint * 0.6));
      colImg.data[idx + 2] = Math.min(255, Math.floor(17 + creviceAO * 46));
      colImg.data[idx + 3] = 255;

      // Ridges are slightly smoother (catch warm rim light), crevices are rough
      const rVal = Math.floor(155 + (1 - creviceAO) * 90);
      roughImg.data[idx] = rVal;
      roughImg.data[idx + 1] = rVal;
      roughImg.data[idx + 2] = rVal;
      roughImg.data[idx + 3] = 255;
    }
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const hL = heights[y * w + ((x - 1 + w) % w)];
      const hR = heights[y * w + ((x + 1) % w)];
      const hU = heights[((y - 1 + h) % h) * w + x];
      const hD = heights[((y + 1) % h) * w + x];
      const dx = (hL - hR) * 4.8;
      const dy = (hU - hD) * 2.8;
      const dz = 1.0;
      const len = Math.hypot(dx, dy, dz) || 1;
      const idx = (y * w + x) * 4;
      normImg.data[idx] = Math.floor(((dx / len) * 0.5 + 0.5) * 255);
      normImg.data[idx + 1] = Math.floor(((dy / len) * 0.5 + 0.5) * 255);
      normImg.data[idx + 2] = Math.floor(((dz / len) * 0.5 + 0.5) * 255);
      normImg.data[idx + 3] = 255;
    }
  }

  colCtx.putImageData(colImg, 0, 0);
  normCtx.putImageData(normImg, 0, 0);
  roughCtx.putImageData(roughImg, 0, 0);

  const map = new THREE.CanvasTexture(colCanvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = map.wrapT = THREE.RepeatWrapping;

  const normalMap = new THREE.CanvasTexture(normCanvas);
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;

  cachedBark = { map, normalMap, roughnessMap };
  return cachedBark;
}

/**
 * Stratified craggy cliff rock PBR (512x512) with warm sandstone/basalt fractures,
 * vertical erosion grooves, and damp crevice shading.
 */
export function getRockPBR(): {
  map: THREE.Texture;
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
} {
  if (cachedRock) return cachedRock;
  const w = 512;
  const h = 512;
  const colCanvas = document.createElement("canvas");
  const normCanvas = document.createElement("canvas");
  const roughCanvas = document.createElement("canvas");
  colCanvas.width = normCanvas.width = roughCanvas.width = w;
  colCanvas.height = normCanvas.height = roughCanvas.height = h;

  const colCtx = colCanvas.getContext("2d")!;
  const normCtx = normCanvas.getContext("2d")!;
  const roughCtx = roughCanvas.getContext("2d")!;
  const colImg = colCtx.createImageData(w, h);
  const normImg = normCtx.createImageData(w, h);
  const roughImg = roughCtx.createImageData(w, h);

  const heights = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      const warp = fbm2D(u * 9, v * 9, 4) * 0.25;
      const strata = Math.sin((v + warp) * Math.PI * 18) * 0.28 + 0.5;
      const vGrooves = Math.sin((u + warp * 0.6) * Math.PI * 24) * 0.22 + 0.5;
      const crag = fbm2D(u * 20, v * 20, 5);
      // Sharp fracture ridges (ridged multifractal style)
      const ridge = 1 - Math.abs(fbm2D(u * 12 + 2.3, v * 12 + 0.7, 4) * 2 - 1);
      const val = strata * 0.28 + vGrooves * 0.22 + crag * 0.25 + ridge * 0.25;
      heights[y * w + x] = val;

      const idx = (y * w + x) * 4;
      colImg.data[idx] = Math.min(255, Math.floor(88 + val * 96));
      colImg.data[idx + 1] = Math.min(255, Math.floor(76 + val * 84));
      colImg.data[idx + 2] = Math.min(255, Math.floor(66 + val * 72));
      colImg.data[idx + 3] = 255;

      const rVal = Math.floor(165 + (1 - val) * 75);
      roughImg.data[idx] = rVal;
      roughImg.data[idx + 1] = rVal;
      roughImg.data[idx + 2] = rVal;
      roughImg.data[idx + 3] = 255;
    }
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const hL = heights[y * w + ((x - 1 + w) % w)];
      const hR = heights[y * w + ((x + 1) % w)];
      const hU = heights[((y - 1 + h) % h) * w + x];
      const hD = heights[((y + 1) % h) * w + x];
      const dx = (hL - hR) * 5.2;
      const dy = (hU - hD) * 5.2;
      const dz = 1.0;
      const len = Math.hypot(dx, dy, dz) || 1;
      const idx = (y * w + x) * 4;
      normImg.data[idx] = Math.floor(((dx / len) * 0.5 + 0.5) * 255);
      normImg.data[idx + 1] = Math.floor(((dy / len) * 0.5 + 0.5) * 255);
      normImg.data[idx + 2] = Math.floor(((dz / len) * 0.5 + 0.5) * 255);
      normImg.data[idx + 3] = 255;
    }
  }

  colCtx.putImageData(colImg, 0, 0);
  normCtx.putImageData(normImg, 0, 0);
  roughCtx.putImageData(roughImg, 0, 0);

  const map = new THREE.CanvasTexture(colCanvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = map.wrapT = THREE.RepeatWrapping;

  const normalMap = new THREE.CanvasTexture(normCanvas);
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;

  cachedRock = { map, normalMap, roughnessMap };
  return cachedRock;
}

/**
 * Weathered Gothic ashlar limestone & sandstone masonry PBR (512x512) for castles,
 * cathedrals, towers, and arched stone bridges.
 */
export function getStoneMasonryPBR(): {
  map: THREE.Texture;
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
} {
  if (cachedStone) return cachedStone;
  const w = 512;
  const h = 512;
  const colCanvas = document.createElement("canvas");
  const normCanvas = document.createElement("canvas");
  const roughCanvas = document.createElement("canvas");
  colCanvas.width = normCanvas.width = roughCanvas.width = w;
  colCanvas.height = normCanvas.height = roughCanvas.height = h;

  const colCtx = colCanvas.getContext("2d")!;
  const normCtx = normCanvas.getContext("2d")!;
  const roughCtx = roughCanvas.getContext("2d")!;
  const colImg = colCtx.createImageData(w, h);
  const normImg = normCtx.createImageData(w, h);
  const roughImg = roughCtx.createImageData(w, h);

  const heights = new Float32Array(w * h);
  const rows = 16;
  const cols = 8;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;

      const row = Math.floor(v * rows);
      const rowFrac = (v * rows) % 1;
      const offsetU = (row % 2) * 0.5;
      const col = Math.floor((u * cols + offsetU) % cols);
      const colFrac = (u * cols + offsetU) % 1;

      // Mortar groove at block edges
      const mortarH = Math.min(rowFrac, 1 - rowFrac);
      const mortarV = Math.min(colFrac, 1 - colFrac);
      const isMortar = Math.min(mortarH * 2.2, mortarV * 3.2) < 0.095 ? 1 : 0;

      // Per-block stone tint & weathering variation
      const blockHash = hash2(col + row * 13, row * 7);
      const grain = fbm2D(u * 28, v * 28, 4);
      const verticalFlute = Math.sin(u * Math.PI * 32) * 0.08;
      const val = isMortar
        ? 0.18 + grain * 0.15
        : 0.55 + (blockHash - 0.5) * 0.22 + (grain - 0.5) * 0.25 + verticalFlute;

      heights[y * w + x] = val;

      const idx = (y * w + x) * 4;
      const warmStoneR = 165 + val * 82;
      const warmStoneG = 146 + val * 74;
      const warmStoneB = 128 + val * 64;
      colImg.data[idx] = Math.min(255, Math.floor(warmStoneR));
      colImg.data[idx + 1] = Math.min(255, Math.floor(warmStoneG));
      colImg.data[idx + 2] = Math.min(255, Math.floor(warmStoneB));
      colImg.data[idx + 3] = 255;

      const rVal = Math.floor(170 + (1 - val) * 70);
      roughImg.data[idx] = rVal;
      roughImg.data[idx + 1] = rVal;
      roughImg.data[idx + 2] = rVal;
      roughImg.data[idx + 3] = 255;
    }
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const hL = heights[y * w + ((x - 1 + w) % w)];
      const hR = heights[y * w + ((x + 1) % w)];
      const hU = heights[((y - 1 + h) % h) * w + x];
      const hD = heights[((y + 1) % h) * w + x];
      const dx = (hL - hR) * 4.5;
      const dy = (hU - hD) * 4.5;
      const dz = 1.0;
      const len = Math.hypot(dx, dy, dz) || 1;
      const idx = (y * w + x) * 4;
      normImg.data[idx] = Math.floor(((dx / len) * 0.5 + 0.5) * 255);
      normImg.data[idx + 1] = Math.floor(((dy / len) * 0.5 + 0.5) * 255);
      normImg.data[idx + 2] = Math.floor(((dz / len) * 0.5 + 0.5) * 255);
      normImg.data[idx + 3] = 255;
    }
  }

  colCtx.putImageData(colImg, 0, 0);
  normCtx.putImageData(normImg, 0, 0);
  roughCtx.putImageData(roughImg, 0, 0);

  const map = new THREE.CanvasTexture(colCanvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = map.wrapT = THREE.RepeatWrapping;

  const normalMap = new THREE.CanvasTexture(normCanvas);
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;

  cachedStone = { map, normalMap, roughnessMap };
  return cachedStone;
}

/**
 * Meadow moss & grass soil PBR texture so the top of the floating island has rich
 * botanical micro-variation, clover/moss patches, and sunlit earth instead of flat vertex colors.
 */
export function getMeadowPBR(): { map: THREE.Texture; normalMap: THREE.Texture } {
  if (cachedMeadow) return cachedMeadow;
  const w = 512;
  const h = 512;
  const colCanvas = document.createElement("canvas");
  const normCanvas = document.createElement("canvas");
  colCanvas.width = normCanvas.width = w;
  colCanvas.height = normCanvas.height = h;

  const colCtx = colCanvas.getContext("2d")!;
  const normCtx = normCanvas.getContext("2d")!;
  const colImg = colCtx.createImageData(w, h);
  const normImg = normCtx.createImageData(w, h);
  const heights = new Float32Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      const n1 = fbm2D(u * 16, v * 16, 4);
      const n2 = fbm2D(u * 48, v * 48, 3);
      const val = n1 * 0.6 + n2 * 0.4;
      heights[y * w + x] = val;

      const idx = (y * w + x) * 4;
      colImg.data[idx] = Math.min(255, Math.floor(95 + val * 90));
      colImg.data[idx + 1] = Math.min(255, Math.floor(125 + val * 95));
      colImg.data[idx + 2] = Math.min(255, Math.floor(48 + val * 52));
      colImg.data[idx + 3] = 255;
    }
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const hL = heights[y * w + ((x - 1 + w) % w)];
      const hR = heights[y * w + ((x + 1) % w)];
      const hU = heights[((y - 1 + h) % h) * w + x];
      const hD = heights[((y + 1) % h) * w + x];
      const dx = (hL - hR) * 3.2;
      const dy = (hU - hD) * 3.2;
      const dz = 1.0;
      const len = Math.hypot(dx, dy, dz) || 1;
      const idx = (y * w + x) * 4;
      normImg.data[idx] = Math.floor(((dx / len) * 0.5 + 0.5) * 255);
      normImg.data[idx + 1] = Math.floor(((dy / len) * 0.5 + 0.5) * 255);
      normImg.data[idx + 2] = Math.floor(((dz / len) * 0.5 + 0.5) * 255);
      normImg.data[idx + 3] = 255;
    }
  }

  colCtx.putImageData(colImg, 0, 0);
  normCtx.putImageData(normImg, 0, 0);

  const map = new THREE.CanvasTexture(colCanvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = map.wrapT = THREE.RepeatWrapping;

  const normalMap = new THREE.CanvasTexture(normCanvas);
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;

  cachedMeadow = { map, normalMap };
  return cachedMeadow;
}

/**
 * Generates a 512x512 asymmetric, multi-depth organic botanical foliage branchlet texture
 * with 28+ overlapping pointed leaves, woody sub-twigs, lateral veins, and golden-lit tips.
 * Designed so instanced 3D clusters look genuinely organic and never like stamped fan icons.
 */
export function getLeafSprigPBR(): { map: THREE.Texture; normalMap: THREE.Texture } {
  if (cachedLeaf) return cachedLeaf;
  const size = 512;
  const canvas = document.createElement("canvas");
  const normCanvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  normCanvas.width = normCanvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const nctx = normCanvas.getContext("2d")!;

  ctx.clearRect(0, 0, size, size);
  nctx.fillStyle = "rgb(128,128,255)";
  nctx.fillRect(0, 0, size, size);

  // Draw subtle organic woody branchlets inside the cluster first
  ctx.strokeStyle = "#523820";
  ctx.lineCap = "round";
  const twigs = [
    [256, 420, 248, 250, 235, 110, 5.5],
    [250, 340, 175, 255, 118, 175, 4.0],
    [252, 320, 330, 240, 392, 160, 4.0],
    [245, 230, 185, 165, 140, 110, 3.2],
    [248, 220, 315, 155, 365, 105, 3.2],
  ];
  for (const [x0, y0, cx, cy, x1, y1, w] of twigs) {
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.quadraticCurveTo(cx, cy, x1, y1);
    ctx.stroke();
  }

  function drawBotanicalLeaf(
    cx: number,
    cy: number,
    len: number,
    wid: number,
    angle: number,
    curveBend: number,
    baseCol: string,
    midCol: string,
    tipCol: string,
    rimGlow: boolean,
  ) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    const grad = ctx.createLinearGradient(0, 0, curveBend * len * 0.3, -len);
    grad.addColorStop(0, baseCol);
    grad.addColorStop(0.55, midCol);
    grad.addColorStop(0.9, tipCol);
    grad.addColorStop(1, rimGlow ? "#f6fda8" : tipCol);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    // Asymmetric natural leaf blade with acuminate (pointed drip-tip) apex
    const tipX = curveBend * len * 0.22;
    ctx.bezierCurveTo(
      -wid * 1.05,
      -len * 0.26,
      -wid * 0.82 + tipX * 0.5,
      -len * 0.72,
      tipX,
      -len,
    );
    ctx.bezierCurveTo(
      wid * 0.86 + tipX * 0.5,
      -len * 0.72,
      wid * 1.02,
      -len * 0.26,
      0,
      0,
    );
    ctx.closePath();
    ctx.fill();

    // Subtle organic shadow edge
    ctx.strokeStyle = "rgba(32, 52, 14, 0.48)";
    ctx.lineWidth = 1.6;
    ctx.stroke();

    // Midrib vein
    ctx.strokeStyle = "rgba(225, 245, 142, 0.58)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -3);
    ctx.quadraticCurveTo(tipX * 0.45, -len * 0.5, tipX * 0.92, -len * 0.9);
    ctx.stroke();

    // Lateral secondary veins
    ctx.strokeStyle = "rgba(215, 240, 130, 0.28)";
    ctx.lineWidth = 0.9;
    for (let v = 0.22; v <= 0.72; v += 0.16) {
      const vy = -len * v;
      const vx = tipX * v * 0.5;
      const vw = wid * Math.sin(v * Math.PI) * 0.72;
      ctx.beginPath();
      ctx.moveTo(vx, vy);
      ctx.quadraticCurveTo(vx - vw * 0.5, vy - len * 0.04, vx - vw, vy - len * 0.11);
      ctx.moveTo(vx, vy);
      ctx.quadraticCurveTo(vx + vw * 0.5, vy - len * 0.04, vx + vw, vy - len * 0.11);
      ctx.stroke();
    }
    ctx.restore();

    // Normal map bevel for 3D lighting response across each leaf blade
    nctx.save();
    nctx.translate(cx, cy);
    nctx.rotate(angle);
    const nGrad = nctx.createLinearGradient(-wid, 0, wid, 0);
    nGrad.addColorStop(0, "rgb(90, 136, 242)");
    nGrad.addColorStop(0.48, "rgb(128, 148, 255)");
    nGrad.addColorStop(0.52, "rgb(132, 148, 255)");
    nGrad.addColorStop(1, "rgb(172, 136, 242)");
    nctx.fillStyle = nGrad;
    nctx.beginPath();
    nctx.moveTo(0, 0);
    nctx.bezierCurveTo(
      -wid * 1.05,
      -len * 0.26,
      -wid * 0.82 + tipX * 0.5,
      -len * 0.72,
      tipX,
      -len,
    );
    nctx.bezierCurveTo(
      wid * 0.86 + tipX * 0.5,
      -len * 0.72,
      wid * 1.02,
      -len * 0.26,
      0,
      0,
    );
    nctx.closePath();
    nctx.fill();
    nctx.restore();
  }

  // Layer 1: Deep shaded interior leaves (darker olive/forest tones, creates depth occlusion)
  const deepLeaves: [number, number, number, number, number, number][] = [
    [256, 350, 145, 52, -0.35, -0.15],
    [262, 355, 140, 50, 0.42, 0.18],
    [195, 290, 135, 48, -0.95, -0.2],
    [318, 285, 138, 48, 0.92, 0.22],
    [240, 260, 150, 54, -0.12, 0.1],
    [168, 225, 128, 45, -1.35, -0.18],
    [348, 220, 130, 46, 1.32, 0.16],
    [215, 385, 122, 44, -1.78, -0.12],
    [302, 382, 124, 44, 1.74, 0.14],
    [256, 405, 115, 42, 2.95, 0.08],
  ];
  for (const [x, y, l, w, a, b] of deepLeaves) {
    drawBotanicalLeaf(x, y, l, w, a, b, "#2d4815", "#486d22", "#689133", false);
  }

  // Layer 2: Mid-canopy lush olive-green leaves
  const midLeaves: [number, number, number, number, number, number][] = [
    [248, 315, 148, 52, -0.68, -0.16],
    [268, 312, 146, 52, 0.64, 0.15],
    [172, 252, 136, 47, -0.52, -0.12],
    [342, 248, 138, 48, 0.48, 0.14],
    [225, 210, 144, 50, -0.28, -0.08],
    [288, 206, 142, 49, 0.31, 0.1],
    [145, 285, 125, 43, -1.18, -0.22],
    [368, 280, 126, 44, 1.15, 0.2],
    [205, 345, 128, 45, -1.42, -0.14],
    [312, 342, 128, 45, 1.38, 0.14],
  ];
  for (const [x, y, l, w, a, b] of midLeaves) {
    drawBotanicalLeaf(x, y, l, w, a, b, "#3f621c", "#669131", "#92bd49", false);
  }

  // Layer 3: Sun-kissed upper/outer leaves with warm golden-chartreuse translucent tips
  const sunLeaves: [number, number, number, number, number, number][] = [
    [256, 235, 152, 52, 0.03, 0.08],
    [212, 188, 136, 46, -0.44, -0.15],
    [304, 185, 138, 47, 0.46, 0.16],
    [162, 198, 124, 42, -0.82, -0.18],
    [354, 195, 126, 43, 0.85, 0.18],
    [252, 168, 132, 45, -0.16, -0.06],
    [275, 172, 130, 44, 0.22, 0.09],
    [195, 265, 122, 42, -0.22, 0.12],
    [322, 262, 124, 43, 0.25, -0.1],
    [256, 295, 126, 44, 0.08, -0.05],
  ];
  for (const [x, y, l, w, a, b] of sunLeaves) {
    drawBotanicalLeaf(x, y, l, w, a, b, "#527a26", "#84b03e", "#c8e66c", true);
  }

  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.generateMipmaps = true;

  const normalMap = new THREE.CanvasTexture(normCanvas);
  cachedLeaf = { map, normalMap };
  return cachedLeaf;
}

/**
 * Generates a high-definition 512x512 painterly volumetric cumulus cloud puff texture
 * with sculpted cauliflower sub-lobes, warm sunlit cream-gold upper billows, and
 * rose-mauve-slate 3D shadow pockets (matching 0.0s, 7.2s & 8.8s).
 */
export function getCloudPuffTexture(): THREE.Texture {
  if (cachedCloudPuff) return cachedCloudPuff;
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, size, size);

  // Paint 14 overlapping 3D shaded cumulus cauliflower lobes from bottom-back to top-front
  const lobes = [
    { cx: 0.5, cy: 0.58, r: 0.36, shade: 0.25 },
    { cx: 0.32, cy: 0.56, r: 0.28, shade: 0.3 },
    { cx: 0.68, cy: 0.55, r: 0.29, shade: 0.35 },
    { cx: 0.24, cy: 0.48, r: 0.24, shade: 0.45 },
    { cx: 0.76, cy: 0.47, r: 0.25, shade: 0.55 },
    { cx: 0.4, cy: 0.44, r: 0.3, shade: 0.62 },
    { cx: 0.6, cy: 0.42, r: 0.31, shade: 0.72 },
    { cx: 0.33, cy: 0.35, r: 0.23, shade: 0.78 },
    { cx: 0.5, cy: 0.32, r: 0.27, shade: 0.88 },
    { cx: 0.66, cy: 0.34, r: 0.24, shade: 0.92 },
    { cx: 0.44, cy: 0.27, r: 0.2, shade: 0.96 },
    { cx: 0.57, cy: 0.26, r: 0.21, shade: 1.0 },
  ];

  for (const l of lobes) {
    const x = l.cx * size;
    const y = l.cy * size;
    const rad = l.r * size;
    // Offset highlight toward upper-right (+x, -y) to match golden sunset key light
    const hx = x + rad * 0.22;
    const hy = y - rad * 0.24;

    const grad = ctx.createRadialGradient(hx, hy, rad * 0.06, x, y, rad);
    // Sunlit cream-gold top -> warm peach mid -> rose-lavender-slate shadow base
    const topR = Math.round(178 + l.shade * 77);
    const topG = Math.round(148 + l.shade * 98);
    const topB = Math.round(156 + l.shade * 68);

    const midR = Math.round(154 + l.shade * 68);
    const midG = Math.round(126 + l.shade * 66);
    const midB = Math.round(138 + l.shade * 52);

    const shR = Math.round(128 + l.shade * 42);
    const shG = Math.round(104 + l.shade * 38);
    const shB = Math.round(120 + l.shade * 36);

    grad.addColorStop(0, `rgba(${topR}, ${topG}, ${topB}, 0.92)`);
    grad.addColorStop(0.48, `rgba(${midR}, ${midG}, ${midB}, 0.76)`);
    grad.addColorStop(0.78, `rgba(${shR}, ${shG}, ${shB}, 0.38)`);
    grad.addColorStop(1, `rgba(${shR}, ${shG}, ${shB}, 0)`);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  // Add fine fbm cumulus edge detail & internal billow contrast
  const img = ctx.getImageData(0, 0, size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const a = img.data[idx + 3];
      if (a === 0) continue;
      const n = fbm2D(x * 0.022 + 1.7, y * 0.022 + 2.3, 4);
      const boost = (n - 0.48) * 36;
      img.data[idx] = Math.max(0, Math.min(255, img.data[idx] + boost));
      img.data[idx + 1] = Math.max(0, Math.min(255, img.data[idx + 1] + boost * 0.9));
      img.data[idx + 2] = Math.max(0, Math.min(255, img.data[idx + 2] + boost * 0.8));
      // Soft radial outer border feather so plane edges never show
      const u = (x / size) * 2 - 1;
      const v = (y / size) * 2 - 1;
      const edgeMask = Math.pow(Math.max(0, 1 - Math.hypot(u, v)), 0.75);
      img.data[idx + 3] = Math.floor(a * edgeMask);
    }
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  cachedCloudPuff = tex;
  return cachedCloudPuff;
}

export function getLunarTexture(): THREE.Texture {
  if (cachedMoon) return cachedMoon;
  const w = 512;
  const h = 256;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  const img = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      const n1 = fbm2D(u * 7, v * 7, 5);
      const mare = Math.max(0, fbm2D(u * 3.2 + 1.5, v * 3.2 + 0.7, 4) - 0.38) * 2.45;
      const detail = fbm2D(u * 36, v * 36, 4);
      const val = Math.min(1, Math.max(0, 0.76 + n1 * 0.24 - mare * 0.58 + (detail - 0.5) * 0.22));

      const idx = (y * w + x) * 4;
      img.data[idx] = Math.floor(145 + val * 108);
      img.data[idx + 1] = Math.floor(142 + val * 106);
      img.data[idx + 2] = Math.floor(148 + val * 98);
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  // Crisp lunar craters & ray systems matching 0.0s & 2.4s
  const craters = [
    { x: 315, y: 84, r: 34 },
    { x: 242, y: 140, r: 42 },
    { x: 365, y: 152, r: 27 },
    { x: 192, y: 92, r: 24 },
    { x: 288, y: 186, r: 20 },
    { x: 345, y: 112, r: 16 },
    { x: 222, y: 175, r: 15 },
    { x: 275, y: 68, r: 18 },
    { x: 388, y: 96, r: 14 },
  ];
  for (const c of craters) {
    const g = ctx.createRadialGradient(c.x, c.y, c.r * 0.1, c.x, c.y, c.r * 1.85);
    g.addColorStop(0, "rgba(255, 252, 245, 0.65)");
    g.addColorStop(0.42, "rgba(115, 112, 128, 0.52)");
    g.addColorStop(0.68, "rgba(255, 250, 240, 0.58)");
    g.addColorStop(1, "rgba(235, 228, 220, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r * 1.85, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  cachedMoon = tex;
  return tex;
}

export function getWaterfallTexture(): THREE.Texture {
  if (cachedWater) return cachedWater;
  const w = 256;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, w, h);

  // Multi-frequency vertical water threads & turbulent foam veins
  const img = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    const v = y / h;
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const edgeFade = Math.pow(Math.sin(u * Math.PI), 0.65);
      const streak1 = fbm2D(u * 28, v * 6, 4);
      const streak2 = fbm2D(u * 52 + 4.2, v * 12 + 1.7, 3);
      const foam = Math.pow(Math.max(0, streak1 * 0.6 + streak2 * 0.4), 1.35);
      const alpha = Math.min(1, edgeFade * (0.22 + foam * 0.78));

      const idx = (y * w + x) * 4;
      img.data[idx] = 250;
      img.data[idx + 1] = 252;
      img.data[idx + 2] = 255;
      img.data[idx + 3] = Math.floor(alpha * 255);
    }
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  cachedWater = tex;
  return tex;
}

export function getAppleGlowTexture(): THREE.Texture {
  if (cachedGlow) return cachedGlow;
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255, 250, 224, 0.96)");
  g.addColorStop(0.24, "rgba(255, 214, 118, 0.58)");
  g.addColorStop(0.58, "rgba(248, 172, 62, 0.18)");
  g.addColorStop(1, "rgba(248, 172, 62, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  cachedGlow = new THREE.CanvasTexture(canvas);
  cachedGlow.colorSpace = THREE.SRGBColorSpace;
  return cachedGlow;
}
