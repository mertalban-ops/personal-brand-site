import { test, expect, type Request } from "@playwright/test";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

// Any request to these hosts means personal data leaves the site automatically.
const THIRD_PARTY =
  /googletagmanager\.com|google-analytics\.com|connect\.facebook\.net|facebook\.com\/tr|\/_vercel\/insights|va\.vercel-scripts\.com|ip-api\.com|api\.telegram\.org|spline\.design|fonts\.googleapis\.com|fonts\.gstatic\.com/;

const PAGES = ["/", "/iletisim", "/projeler", "/oto-servis-web-sitesi", "/teklif", "/instagram", "/gizlilik"];

test.describe("No automatic third-party data flows", () => {
  test("no tracking or third-party requests and no cookies on key pages", async ({ page }) => {
    const hits: string[] = [];
    page.on("request", (r: Request) => {
      if (THIRD_PARTY.test(r.url())) hits.push(r.url());
    });
    const splineLocal = page
      .waitForRequest(/\/spline\/hero-robot\.splinecode$/, { timeout: 30000 })
      .then(() => true, () => false);

    for (const path of PAGES) {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
    }
    await page.goto("/");
    await page.waitForTimeout(1500);

    expect(await splineLocal, "3D scene should load from this site").toBe(true);
    expect(hits).toEqual([]);
    expect(await page.context().cookies()).toEqual([]);
    const html = await page.content();
    expect(html).not.toContain("G-EBXG0KWWV0");
    expect(html).not.toContain("fbevents");
  });

  test("no cookie banner is shown (nothing requires consent)", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1000);
    await expect(page.getByText(/Tümünü kabul et|Çerez ve ölçüm/)).toHaveCount(0);
  });

  test("only the language preference is kept in browser storage", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const keys = await page.evaluate(() => Object.keys(localStorage));
    for (const key of keys) expect(["albanexa-lang"]).toContain(key);
  });
});

test.describe("Contact page", () => {
  test("has no form; offers email and WhatsApp with privacy note", async ({ page }) => {
    await page.goto("/iletisim");
    await expect(page.locator("form")).toHaveCount(0);
    await expect(page.locator("main input, main textarea, main select")).toHaveCount(0);
    const brief = page.getByTestId("contact-brief");
    await expect(brief.locator('a[href^="mailto:"]')).toHaveCount(1);
    await expect(brief.locator('a[href^="https://wa.me/"]')).toHaveCount(1);
    await expect(brief.locator('a[href="/kvkk-aydinlatma"]')).toHaveCount(1);
    await expect(brief).toContainText("özel nitelikli");
  });
});

test.describe("Build output", () => {
  function walk(dir: string): string[] {
    return readdirSync(dir).flatMap((f) => {
      const p = join(dir, f);
      return statSync(p).isDirectory() ? walk(p) : [p];
    });
  }

  test("removed integrations are absent from server and client bundles", () => {
    const files = [...walk(".next/server"), ...walk(".next/static")].filter((f) => /\.(js|html|rsc)$/.test(f));
    const all = files.map((f) => readFileSync(f, "utf8")).join("\n");
    for (const removed of ["ip-api.com", "api.telegram.org", "N8N_WEBHOOK_URL", "G-EBXG0KWWV0", "fbevents.js", "_vercel/insights"]) {
      expect(all, removed).not.toContain(removed);
    }
  });
});

test.describe("Legal pages on mobile in every language", () => {
  test.use({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });

  for (const lang of ["tr", "en", "de"]) {
    test(`legal pages render without horizontal scroll (${lang})`, async ({ page }) => {
      await page.addInitScript((l) => localStorage.setItem("albanexa-lang", l), lang);
      for (const path of ["/kvkk-aydinlatma", "/gizlilik", "/kullanim-kosullari", "/iletisim"]) {
        const res = await page.goto(path);
        expect(res?.status()).toBe(200);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        expect(overflow, `${path} overflows`).toBeLessThanOrEqual(1);
      }
      await page.goto("/");
      for (const href of ["/gizlilik", "/kvkk-aydinlatma", "/kullanim-kosullari"]) {
        await expect(page.locator(`footer a[href="${href}"]`)).toHaveCount(1);
      }
    });
  }

  test("controller is named; no identifiers beyond the public name are published", async ({ page }) => {
    await page.goto("/kvkk-aydinlatma");
    await expect(page.locator("main")).toContainText("Veri sorumlusu: Mert Alban");
    const text = (await page.locator("main").textContent()) ?? "";
    expect(text).not.toMatch(/\b\d{11}\b/); // no T.C. kimlik no
    expect(text).not.toMatch(/VKN|Vergi No/i);
  });
});
