#!/usr/bin/env node
/**
 * Albanexa Labs — reference-vs-render visual comparison.
 *
 * Renders the live /labs scene at camera poses calibrated to the reference video frames,
 * hides the HUD so only the WebGL canvas is compared, then scores each pair with
 *   - SSIM (luma, 8x8 windows)            → structure
 *   - colour-histogram intersection (RGB) → palette
 *   - Sobel edge-map correlation          → silhouette
 *   - region-weighted score (tree 30 / island 20 / sky 20 / castles 15 / light 15)
 * and writes side-by-side + diff images to docs/labs-iterations/<iter>/.
 *
 * Usage: LABS_URL=http://localhost:3000 node scripts/labs-compare.mjs <iterationName>
 */
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE_URL = process.env.LABS_URL || "http://localhost:3000";
const iter = process.argv[2] || "iter";
const outDir = join(root, "docs", "labs-iterations", iter);
mkdirSync(outDir, { recursive: true });

const W = 1280;
const H = 720;
const MW = 320; // metric resolution
const MH = 180;

/**
 * Camera poses calibrated by matching tree/island screen proportions in each reference frame.
 * Static shots use __labsSetPose; fall shots use the real FallingApple timeline.
 */
export const SHOTS = [
  { id: "0000ms", label: "Açılış geniş plan", pose: [[0, 2.6, 23.5], [0, 1.15, 0], 42] },
  { id: "2400ms", label: "Orta mesafe ağaç", pose: [[0, 1.2, 19.5], [0, 1.05, 0], 40] },
  { id: "4800ms", label: "Yakın ağaç / elmalar", pose: [[0.2, 2.1, 8.4], [0, 4.0, 0], 50] },
  { id: "5600ms", label: "Elma yakın plan", pose: [[0.2, 2.6, 6.6], [0, 3.6, 0], 44] },
  // Offsets on the FallingApple timeline (select 0–0.48s, detach –0.9s, fall –2.82s, clouds –3.83s, light –5.0s)
  { id: "6400ms", label: "Düşüş başlangıcı", fall: 1540 },
  { id: "7200ms", label: "Uzun boşluk düşüşü", fall: 2930 },
  { id: "8800ms", label: "Parçacık dağılımı", fall: 4250 },
  { id: "9600ms", label: "Parlama finali", fall: 4870 },
];

// Regions (fractions of frame) used for the 0000ms / 2400ms establishing comparisons.
const REGIONS = {
  tree: { x: 0.28, y: 0.12, w: 0.44, h: 0.45, weight: 0.3 },
  island: { x: 0.3, y: 0.5, w: 0.4, h: 0.42, weight: 0.2 },
  sky: { x: 0, y: 0, w: 1, h: 0.3, weight: 0.2 },
  castles: { x: 0, y: 0.25, w: 0.28, h: 0.5, weight: 0.075, pair: { x: 0.72, y: 0.25, w: 0.28, h: 0.5 } },
  light: { x: 0, y: 0, w: 1, h: 1, weight: 0.15 },
};

async function loadRGB(input) {
  const { data } = await sharp(input)
    .resize(MW, MH, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return data;
}

function luma(rgb) {
  const out = new Float32Array(MW * MH);
  for (let i = 0; i < out.length; i++) {
    out[i] = 0.299 * rgb[i * 3] + 0.587 * rgb[i * 3 + 1] + 0.114 * rgb[i * 3 + 2];
  }
  return out;
}

function crop(arr, r, ch = 1) {
  const x0 = Math.round(r.x * MW);
  const y0 = Math.round(r.y * MH);
  const w = Math.max(8, Math.round(r.w * MW));
  const h = Math.max(8, Math.round(r.h * MH));
  const out = new Float32Array(w * h * ch);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      for (let c = 0; c < ch; c++) {
        out[(y * w + x) * ch + c] = arr[((y0 + y) * MW + (x0 + x)) * ch + c];
      }
    }
  }
  return { data: out, w, h };
}

function ssim(a, b, w, h) {
  const C1 = (0.01 * 255) ** 2;
  const C2 = (0.03 * 255) ** 2;
  const win = 8;
  let total = 0;
  let n = 0;
  for (let y = 0; y + win <= h; y += 4) {
    for (let x = 0; x + win <= w; x += 4) {
      let ma = 0, mb = 0;
      for (let j = 0; j < win; j++) for (let i = 0; i < win; i++) {
        ma += a[(y + j) * w + x + i];
        mb += b[(y + j) * w + x + i];
      }
      ma /= win * win;
      mb /= win * win;
      let va = 0, vb = 0, cov = 0;
      for (let j = 0; j < win; j++) for (let i = 0; i < win; i++) {
        const da = a[(y + j) * w + x + i] - ma;
        const db = b[(y + j) * w + x + i] - mb;
        va += da * da;
        vb += db * db;
        cov += da * db;
      }
      const d = win * win - 1;
      va /= d; vb /= d; cov /= d;
      total += ((2 * ma * mb + C1) * (2 * cov + C2)) / ((ma * ma + mb * mb + C1) * (va + vb + C2));
      n++;
    }
  }
  return n ? total / n : 0;
}

function histIntersection(a, b) {
  const bins = 8;
  const ha = new Float32Array(bins ** 3);
  const hb = new Float32Array(bins ** 3);
  const px = a.length / 3;
  for (let i = 0; i < px; i++) {
    const ia = ((a[i * 3] >> 5) * bins + (a[i * 3 + 1] >> 5)) * bins + (a[i * 3 + 2] >> 5);
    const ib = ((b[i * 3] >> 5) * bins + (b[i * 3 + 1] >> 5)) * bins + (b[i * 3 + 2] >> 5);
    ha[ia]++;
    hb[ib]++;
  }
  let s = 0;
  for (let i = 0; i < ha.length; i++) s += Math.min(ha[i], hb[i]);
  return s / px;
}

function sobel(l, w, h) {
  const out = new Float32Array(w * h);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const p = (dx, dy) => l[(y + dy) * w + x + dx];
      const gx = -p(-1, -1) - 2 * p(-1, 0) - p(-1, 1) + p(1, -1) + 2 * p(1, 0) + p(1, 1);
      const gy = -p(-1, -1) - 2 * p(0, -1) - p(1, -1) + p(-1, 1) + 2 * p(0, 1) + p(1, 1);
      out[y * w + x] = Math.hypot(gx, gy);
    }
  }
  return out;
}

function correlation(a, b) {
  const n = a.length;
  let ma = 0, mb = 0;
  for (let i = 0; i < n; i++) { ma += a[i]; mb += b[i]; }
  ma /= n; mb /= n;
  let num = 0, da = 0, db = 0;
  for (let i = 0; i < n; i++) {
    num += (a[i] - ma) * (b[i] - mb);
    da += (a[i] - ma) ** 2;
    db += (b[i] - mb) ** 2;
  }
  return da && db ? num / Math.sqrt(da * db) : 0;
}

function meanStd(l) {
  let m = 0;
  for (const v of l) m += v;
  m /= l.length;
  let s = 0;
  for (const v of l) s += (v - m) ** 2;
  return [m, Math.sqrt(s / l.length)];
}

function scorePair(refRGB, curRGB) {
  const refL = luma(refRGB);
  const curL = luma(curRGB);
  const global = {
    ssim: ssim(refL, curL, MW, MH),
    hist: histIntersection(refRGB, curRGB),
    edge: correlation(sobel(refL, MW, MH), sobel(curL, MW, MH)),
  };
  const [rm, rs] = meanStd(refL);
  const [cm, cs] = meanStd(curL);
  global.exposureDelta = cm - rm; // >0 → render brighter than reference
  global.contrastRatio = cs / rs; // <1 → render flatter than reference

  const regions = {};
  let weighted = 0;
  for (const [name, r] of Object.entries(REGIONS)) {
    const evalRegion = (rr) => {
      const a = crop(refL, rr);
      const b = crop(curL, rr);
      const ac = crop(refRGB, rr, 3);
      const bc = crop(curRGB, rr, 3);
      const s = ssim(a.data, b.data, a.w, a.h);
      const hst = histIntersection(Uint8Array.from(ac.data), Uint8Array.from(bc.data));
      const e = correlation(sobel(a.data, a.w, a.h), sobel(b.data, b.w, b.h));
      return 0.4 * s + 0.4 * hst + 0.2 * Math.max(0, e);
    };
    let v = evalRegion(r);
    if (r.pair) v = (v + evalRegion(r.pair)) / 2;
    const weight = r.pair ? r.weight * 2 : r.weight;
    regions[name] = +v.toFixed(4);
    weighted += v * weight;
  }
  global.weighted = weighted;
  return { global, regions };
}

async function writeComparison(refPath, curPath, outPath) {
  const ref = await sharp(refPath).resize(W, H, { fit: "fill" }).removeAlpha().raw().toBuffer();
  const cur = await sharp(curPath).resize(W, H, { fit: "fill" }).removeAlpha().raw().toBuffer();
  const diff = Buffer.alloc(W * H * 3);
  for (let i = 0; i < diff.length; i++) diff[i] = Math.min(255, Math.abs(ref[i] - cur[i]) * 2);
  const half = (buf) =>
    sharp(buf, { raw: { width: W, height: H, channels: 3 } }).resize(W / 2, H / 2).png().toBuffer();
  const [a, b, c] = await Promise.all([half(ref), half(cur), half(diff)]);
  await sharp({ create: { width: (W / 2) * 3, height: H / 2, channels: 3, background: "#000" } })
    .composite([
      { input: a, left: 0, top: 0 },
      { input: b, left: W / 2, top: 0 },
      { input: c, left: W, top: 0 },
    ])
    .jpeg({ quality: 82 })
    .toFile(outPath);
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist", "--enable-unsafe-swiftshader"],
  });
  const context = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await context.addInitScript(() => {
    try { localStorage.setItem("albanexa_cookie_consent", "accepted"); } catch {}
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

  await page.goto(`${BASE_URL}/labs`, { waitUntil: "networkidle", timeout: 120000 });
  await page.waitForSelector("canvas", { timeout: 60000 });
  await page.addStyleTag({
    content: "body *{visibility:hidden!important} canvas{visibility:visible!important}",
  });
  await page.waitForTimeout(3500);

  const fps = await page.evaluate(
    () =>
      new Promise((res) => {
        let f = 0;
        const t0 = performance.now();
        const tick = () => {
          f++;
          const dt = performance.now() - t0;
          if (dt > 2000) res(Math.round((f * 1000) / dt));
          else requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
  );

  const results = [];
  const shotPath = (id) => join(outDir, `render-${id}.png`);

  await page.evaluate(() => window.__labsSetCamera?.("hero"));
  await page.waitForTimeout(900);
  for (const s of SHOTS.filter((x) => x.pose)) {
    await page.evaluate(([p, t, f]) => window.__labsSetPose?.(p, t, f), s.pose);
    await page.waitForTimeout(700);
    await page.evaluate(([p, t, f]) => window.__labsSetPose?.(p, t, f), s.pose);
    await page.waitForTimeout(400);
    await page.screenshot({ path: shotPath(s.id) });
  }

  // Fall sequence: one continuous run, frames captured at the timeline offsets.
  await page.evaluate(() => window.__labsSetPose?.([0, 2.6, 23.5], [0, 1.15, 0], 42));
  await page.waitForTimeout(500);
  const t0 = Date.now();
  await page.evaluate(() => window.__labsTriggerFallDemo?.());
  for (const s of SHOTS.filter((x) => x.fall)) {
    const wait = s.fall - (Date.now() - t0);
    if (wait > 0) await page.waitForTimeout(wait);
    await page.screenshot({ path: shotPath(s.id) });
  }
  await browser.close();

  for (const s of SHOTS) {
    const refPath = join(root, "reference", "frames", `${s.id}.jpg`);
    const [refRGB, curRGB] = await Promise.all([loadRGB(refPath), loadRGB(shotPath(s.id))]);
    const score = scorePair(refRGB, curRGB);
    await writeComparison(refPath, shotPath(s.id), join(outDir, `compare-${s.id}.jpg`));
    results.push({ id: s.id, label: s.label, ...score });
  }

  const round = (o) => JSON.parse(JSON.stringify(o, (_, v) => (typeof v === "number" ? +v.toFixed(4) : v)));
  const overall =
    results.reduce((acc, r) => acc + r.global.weighted, 0) / results.length;
  const report = round({ iteration: iter, date: new Date().toISOString(), fps, overall, errors, results });
  writeFileSync(join(outDir, "metrics.json"), JSON.stringify(report, null, 2));

  const prevPath = process.env.LABS_PREV ? join(root, "docs", "labs-iterations", process.env.LABS_PREV, "metrics.json") : null;
  const prev = prevPath && existsSync(prevPath) ? JSON.parse(readFileSync(prevPath, "utf8")) : null;
  console.log(`\n${iter}  overall=${report.overall}${prev ? `  (prev ${prev.overall})` : ""}  fps=${fps}  errors=${errors.length}`);
  for (const r of report.results) {
    const p = prev?.results.find((x) => x.id === r.id);
    const g = r.global;
    console.log(
      `${r.id.padEnd(7)} w=${g.weighted.toFixed(3)}${p ? ` (${p.global.weighted.toFixed(3)})` : ""} ssim=${g.ssim} hist=${g.hist} edge=${g.edge} exp=${g.exposureDelta.toFixed(1)} con=${g.contrastRatio.toFixed(2)} | ${Object.entries(r.regions).map(([k, v]) => `${k}=${v}`).join(" ")}`,
    );
  }
  if (errors.length) console.log("errors:", errors.slice(0, 5));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
