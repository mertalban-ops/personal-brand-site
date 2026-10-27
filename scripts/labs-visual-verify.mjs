#!/usr/bin/env node
/**
 * Comprehensive Visual & Functional Verification Suite for Albanexa Labs (Tree of Life)
 * Captures:
 *  - Reference comparisons (Hero wide 0-3.2s, Close-up apples 4-6.4s, Falling apple & starburst 7-9s)
 *  - 360° Orbit proof (0°, 90°, 180°, 270°, 360°)
 *  - Responsive viewports (1440x900, 1280x720, 390x844)
 *  - WebGL Fallback (?nowebgl=1) & Directory Drawer
 *  - Functional interaction tests + FPS measurement + console error check
 */

import { webkit } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "labs", "qa");
mkdirSync(outDir, { recursive: true });

const BASE_URL = process.env.LABS_URL || "http://localhost:3200";

async function run() {
  const browser = await webkit.launch({
    headless: true,
  });

  const consoleErrors = [];
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  await context.addInitScript(() => {
    try {
      window.localStorage.setItem("albanexa_cookie_consent", "accepted");
    } catch {}
  });
  const page = await context.newPage();

  page.on("pageerror", (err) => {
    const msg = err.message || "";
    if (!msg.includes("_rsc=") && !msg.includes("access control checks")) {
      consoleErrors.push(`PAGEERROR: ${msg}`);
    }
  });
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      const txt = msg.text();
      if (
        !txt.includes("_vercel/insights") &&
        !txt.includes("status of 404") &&
        !txt.includes("_rsc=")
      ) {
        consoleErrors.push(txt);
      }
    }
  });

  console.log(`1. Navigating to ${BASE_URL}/labs (1440x900)...`);
  await page.goto(`${BASE_URL}/labs`, { waitUntil: "networkidle" });
  await page.waitForSelector("canvas", { timeout: 15000 });
  await page.waitForTimeout(2200); // Wait for 1.35s entrance camera settle + HUD fade-in

  // 1. Hero Wide Comparison (0-3.2s reference) + Responsive 1440x900 + Orbit 0°
  await page.screenshot({ path: join(outDir, "qa-ref-1-hero-wide.png") });
  await page.screenshot({ path: join(outDir, "qa-resp-1440x900.png") });
  await page.screenshot({ path: join(outDir, "qa-orbit-0deg.png") });
  console.log("  ✓ Captured qa-ref-1-hero-wide.png, qa-resp-1440x900.png, qa-orbit-0deg.png");

  // 2. 360° Orbit Proof (90°, 180°, 270°, 360°)
  for (const deg of [90, 180, 270, 360]) {
    await page.evaluate((d) => window.__labsSetCamera?.("orbitAngle", d), deg);
    await page.waitForTimeout(950);
    await page.screenshot({ path: join(outDir, `qa-orbit-${deg}deg.png`) });
    console.log(`  ✓ Captured qa-orbit-${deg}deg.png`);
  }

  // 3. Close-up Apple & Branch Comparison (4.0-6.4s reference)
  await page.evaluate(() => window.__labsSetCamera?.("closeup"));
  await page.waitForTimeout(950);
  await page.screenshot({ path: join(outDir, "qa-ref-2-closeup-apples.png") });
  console.log("  ✓ Captured qa-ref-2-closeup-apples.png");

  // Reset back to hero via UI button
  const resetBtn = page.getByRole("button", { name: /Kamerayı Sıfırla|Reset Camera/i });
  await resetBtn.click();
  await page.waitForTimeout(950);

  // 4. Falling Apple & Starburst Comparison (6.4-9.0s reference)
  await page.evaluate(() => window.__labsTriggerFallDemo?.());
  await page.waitForTimeout(5500); // Below the island, falling toward the cloud sea (7200ms.jpg)
  await page.screenshot({ path: join(outDir, "qa-ref-3a-apple-falling.png") });
  await page.waitForTimeout(2500); // Turning into light inside the clouds (8800ms.jpg)
  await page.screenshot({ path: join(outDir, "qa-ref-3b-apple-starburst.png") });
  console.log("  ✓ Captured qa-ref-3a-apple-falling.png & qa-ref-3b-apple-starburst.png");

  // Wait for the 9.4s timeline to finish and the demo to reset
  await page.waitForTimeout(3500);

  // 5. Measure FPS over 1.5 seconds of active rendering
  const fps = await page.evaluate(async () => {
    return new Promise((resolve) => {
      let frames = 0;
      const t0 = performance.now();
      function tick() {
        frames++;
        const dt = performance.now() - t0;
        if (dt >= 1200) {
          resolve(Math.round((frames * 1000) / dt));
        } else {
          requestAnimationFrame(tick);
        }
      }
      requestAnimationFrame(tick);
    });
  });
  console.log(`  ✓ Measured FPS (1440x900 headless): ${fps} FPS`);

  // 6. Test Directory Drawer ("Tüm Projeler")
  const dirBtn = page.getByRole("button", { name: /Tüm Projeler|All Projects/i });
  await dirBtn.click();
  await page.waitForTimeout(450);
  await page.screenshot({ path: join(outDir, "qa-directory-drawer.png") });
  const closeBtn = page.getByRole("button", { name: "close" });
  await closeBtn.click();
  await page.waitForTimeout(350);

  // 7. Responsive 1280x720
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.evaluate(() => window.__labsSetCamera?.("hero"));
  await page.waitForTimeout(850);
  await page.screenshot({ path: join(outDir, "qa-resp-1280x720.png") });
  console.log("  ✓ Captured qa-resp-1280x720.png");

  // 8. Responsive 390x844 (Mobile Portrait)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.__labsSetCamera?.("hero"));
  await page.waitForTimeout(850);
  await page.screenshot({ path: join(outDir, "qa-resp-390x844.png") });
  console.log("  ✓ Captured qa-resp-390x844.png");

  // 9. Test Apple Click / Project Navigation
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);
  const projectPill = page.locator('div[role="navigation"]').getByRole("link", { name: "CARPASS" });
  await projectPill.click();
  await page.waitForURL("**/labs/carpass", { timeout: 5000 });
  const detailUrl = page.url();
  console.log(`  ✓ Verified project navigation: ${detailUrl}`);

  // 10. Test WebGL Fallback (?nowebgl=1)
  await page.goto(`${BASE_URL}/labs?nowebgl=1`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: join(outDir, "qa-webgl-fallback.png") });
  console.log("  ✓ Captured qa-webgl-fallback.png");

  await browser.close();

  const summary = {
    timestamp: new Date().toISOString(),
    fps,
    consoleErrors,
    navigatedProjectUrl: detailUrl,
    status: consoleErrors.length === 0 ? "PASS" : "WARN",
  };
  writeFileSync(join(outDir, "qa-report.json"), JSON.stringify(summary, null, 2));
  console.log("\nQA Summary:", JSON.stringify(summary, null, 2));
  if (consoleErrors.length > 0) {
    process.exitCode = 1;
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
