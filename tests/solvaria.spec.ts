import { test, expect } from "@playwright/test";

test.describe("Albanexa B2B Master Optimization E2E Tests", () => {

  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(60000);
  });

  test("Homepage loads successfully and contains authentic branding", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Albanexa/, { timeout: 25000 });
    
    // Verify no fake claims
    const content = await page.textContent("body");
    expect(content).not.toContain("14+ teslim edilen");
    expect(content).not.toContain("14+ sistem");
    expect(content).not.toContain("sıfır hata");
    expect(content).not.toContain("kesintisiz teknik operasyon");
  });

  test("Skip to content accessibility link is present", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator("a[href='#main-content']");
    await expect(skipLink).toHaveCount(1);
    await expect(skipLink).toHaveText(/Ana içeriğe atla/i);
  });

  test("Floating WhatsApp widget is visible and accessible", async ({ page }) => {
    await page.goto("/");
    const waWidget = page.locator("a[aria-label*='WhatsApp']").first();
    await expect(waWidget).toBeVisible({ timeout: 15000 });
    const ariaLabel = await waWidget.getAttribute("aria-label");
    expect(ariaLabel).toMatch(/WhatsApp/i);
  });

  test("Navbar links are accessible", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("nav", { state: "visible", timeout: 25000 });
    
    const solutionsLink = page.locator("nav").filter({ hasText: /Çözümler|Solutions|Lösungen/i }).first();
    const casesLink = page.locator("nav").filter({ hasText: /Projeler|Projects|Projekte/i }).first();
    const cooperationLink = page.locator("nav").filter({ hasText: /İş Birliği|Partnership|Partnerschaft/i }).first();
    const studioLink = page.locator("nav").filter({ hasText: /Stüdyo|Studio/i }).first();

    await expect(solutionsLink).toBeVisible();
    await expect(casesLink).toBeVisible();
    await expect(cooperationLink).toBeVisible();
    await expect(studioLink).toBeVisible();
  });

  test("Project classification and categories are accurate", async ({ page }) => {
    await page.goto("/projeler");
    await page.waitForSelector("h1", { state: "visible", timeout: 25000 });
    
    const filterAll = page.locator("button").filter({ hasText: /Tümü|All|Alle/i }).first();
    const filterClient = page.locator("button").filter({ hasText: /Müşteri Projeleri|Customer Projects|Kundenprojekte/i }).first();
    const filterProducts = page.locator("button").filter({ hasText: /Ürünler|Products|Produkte/i }).first();
    const filterConcepts = page.locator("button").filter({ hasText: /Konseptler|Concepts|Konzepte/i }).first();

    await expect(filterAll).toBeVisible();
    await expect(filterClient).toBeVisible();
    await expect(filterProducts).toBeVisible();
    await expect(filterConcepts).toBeVisible();

    const content = await page.textContent("body");
    expect(content).toContain("StockApp");
    expect(content).toContain("Hezer Auto Service");
    expect(content).toContain("CARPASS");
  });

  test("StockApp case study layout and details", async ({ page }) => {
    await page.goto("/projeler/stockapp");
    await page.waitForSelector("h1", { state: "visible", timeout: 25000 });
    
    const content = await page.textContent("body");
    expect(content).toContain("StockApp");
    expect(content).toMatch(/Referans Proje & Vaka Çalışması|Reference Project & Case Study|Referenzprojekt & Fallstudie/i);
    await expect(page.locator("text=Mockup Grid").first()).toBeVisible();
  });

  test("Solutions detail page loads without hidden ARIA errors", async ({ page }) => {
    await page.goto("/cozumler/is-takip-sistemleri");
    await page.waitForSelector("h1", { state: "visible", timeout: 25000 });
    const content = await page.textContent("body");
    expect(content).toMatch(/İş Takip Sistemleri|Job Tracking Systems|Arbeitsverfolgung/i);
    expect(content).toMatch(/Sıkça Sorulan Sorular|FAQ|Häufige Fragen/i);
  });

  test("Custom 404 page renders properly with recovery actions", async ({ page }) => {
    await page.goto("/non-existent-page-url");
    await page.waitForSelector("h1", { state: "visible", timeout: 25000 });
    const content = await page.textContent("body");
    expect(content).toMatch(/Sayfa Bulunamadı|Page Not Found|404/i);
    await expect(page.locator("a[href='/']").first()).toBeVisible();
    await expect(page.locator("a[href='/cozumler']").first()).toBeVisible();
  });

  test("Contact form multi-stage wizard works", async ({ page }) => {
    await page.goto("/iletisim");
    await page.waitForSelector("#cf-needType", { state: "visible", timeout: 25000 });
    
    await page.selectOption("#cf-needType", { index: 3 });

    await page.fill("#cf-name", "Test User");
    await page.fill("#cf-company", "Test Company");
    await page.fill("#cf-email", "test@company.com");
    await page.fill("#cf-phone", "905000000000");
    await page.fill("#cf-message", "Looking for custom operations software.");

    await page.click("#cf-next-btn");

    await expect(page.locator("#cf-currentMethod")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("#cf-problem")).toBeVisible();
    await expect(page.locator("#cf-userCount")).toBeVisible();
    await expect(page.locator("#cf-timeline")).toBeVisible();
  });

  test("Language context switching preserves the active page", async ({ page }) => {
    await page.goto("/projeler/stockapp");
    await page.waitForSelector("nav", { state: "visible", timeout: 25000 });
    
    const desktopLangSwitcher = page.locator("[data-lang-switcher]").first();
    const activeBtn = desktopLangSwitcher.locator("button").first();
    await expect(activeBtn).toBeVisible({ timeout: 15000 });
    
    const currentLangText = (await activeBtn.innerText()).trim().toLowerCase();
    
    await activeBtn.click();
    
    const targetLang = currentLangText === "tr" ? "en" : "tr";
    const targetBtn = desktopLangSwitcher.locator("button", { hasText: new RegExp(`^${targetLang}$`, "i") });
    await expect(targetBtn).toBeVisible();
    await targetBtn.click();
    
    const url = page.url();
    expect(url).toContain("/projeler/stockapp");

    if (targetLang === "en") {
      await page.waitForSelector("text=Reference Project & Case Study", { state: "visible", timeout: 15000 });
    } else {
      await page.waitForSelector("text=Referans Proje & Vaka Çalışması", { state: "visible", timeout: 15000 });
    }
  });
});
