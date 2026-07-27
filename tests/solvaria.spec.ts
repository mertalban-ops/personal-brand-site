import { test, expect } from "@playwright/test";

test.describe("Albanexa B2B Transformation E2E Tests", () => {
  
  test.beforeEach(async ({ page }) => {
    // Set a longer default navigation timeout for Next.js compilation
    page.setDefaultTimeout(60000);
  });

  test("Homepage loads successfully and contains correct branding", async ({ page }) => {
    await page.goto("/");
    // Wait for Next.js to finish compile & load, check page title
    await expect(page).toHaveTitle(/Albanexa/, { timeout: 25000 });
    
    // Verify 14+ is NOT in the text
    const content = await page.textContent("body");
    expect(content).not.toContain("14+ teslim edilen");
    expect(content).not.toContain("14+ sistem");
    
    // Check no absolute risk guarantee statements
    expect(content).not.toContain("sıfır hata");
    expect(content).not.toContain("kesintisiz teknik operasyon");
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
    
    // Check project filters
    const filterAll = page.locator("button").filter({ hasText: /Tümü|All|Alle/i }).first();
    const filterClient = page.locator("button").filter({ hasText: /Müşteri Projeleri|Customer Projects|Kundenprojekte/i }).first();
    const filterProducts = page.locator("button").filter({ hasText: /Ürünler|Products|Produkte/i }).first();
    const filterConcepts = page.locator("button").filter({ hasText: /Konseptler|Concepts|Konzepte/i }).first();

    await expect(filterAll).toBeVisible();
    await expect(filterClient).toBeVisible();
    await expect(filterProducts).toBeVisible();
    await expect(filterConcepts).toBeVisible();

    // Check project cards
    const content = await page.textContent("body");
    expect(content).toContain("StockApp");
    expect(content).toContain("Hezer Auto Service");
    expect(content).toContain("CARPASS");
  });

  test("StockApp case study layout and details", async ({ page }) => {
    await page.goto("/projeler/stockapp");
    await page.waitForSelector("h1", { state: "visible", timeout: 25000 });
    
    // Check B2B details
    const content = await page.textContent("body");
    expect(content).toContain("StockApp");
    expect(content).toMatch(/Referans Proje & Vaka Çalışması|Reference Project & Case Study|Referenzprojekt & Fallstudie/i);
    
    // Check mockup placeholders are visible
    await expect(page.locator("text=Mockup Grid").first()).toBeVisible();
  });

  test("CARPASS development pipeline status and module badges", async ({ page }) => {
    await page.goto("/projeler/carpass");
    await page.waitForSelector("h1", { state: "visible", timeout: 25000 });
    
    const content = await page.textContent("body");
    expect(content).toContain("CARPASS");
    expect(content).toMatch(/Ürün Geliştirme Laboratuvarı|Product Development Lab|Produktentwicklungs-Labor/i);
    
    // Check pipeline status
    expect(content).toMatch(/Geliştirme Aşamasında|In Development|Entwicklung/i);
  });

  test("Contact form multi-stage wizard works", async ({ page }) => {
    await page.goto("/iletisim");
    await page.waitForSelector("#cf-needType", { state: "visible", timeout: 25000 });
    
    // Select Need Type by index (language-agnostic)
    await page.selectOption("#cf-needType", { index: 3 });

    // Fill Stage 1
    await page.fill("#cf-name", "Test User");
    await page.fill("#cf-company", "Test Company");
    await page.fill("#cf-email", "test@company.com");
    await page.fill("#cf-phone", "905000000000");
    await page.fill("#cf-message", "Looking for custom operations software.");

    // Go to next stage via language-agnostic ID selector
    await page.click("#cf-next-btn");

    // Verify Stage 2 fields are visible
    await expect(page.locator("#cf-currentMethod")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("#cf-problem")).toBeVisible();
    await expect(page.locator("#cf-userCount")).toBeVisible();
    await expect(page.locator("#cf-timeline")).toBeVisible();
  });

  test("Language context switching preserves the active page", async ({ page }) => {
    await page.goto("/projeler/stockapp");
    await page.waitForSelector("nav", { state: "visible", timeout: 25000 });
    
    // Scope search inside the first language switcher (desktop)
    const desktopLangSwitcher = page.locator("[data-lang-switcher]").first();
    const activeBtn = desktopLangSwitcher.locator("button").first();
    await expect(activeBtn).toBeVisible({ timeout: 15000 });
    
    // Get the current language tag
    const currentLangText = (await activeBtn.innerText()).trim().toLowerCase();
    
    // Open language dropdown
    await activeBtn.click();
    
    // Select target language button
    const targetLang = currentLangText === "tr" ? "en" : "tr";
    const targetBtn = desktopLangSwitcher.locator("button", { hasText: new RegExp(`^${targetLang}$`, "i") });
    await expect(targetBtn).toBeVisible();
    await targetBtn.click();
    
    // Verify path is preserved
    const url = page.url();
    expect(url).toContain("/projeler/stockapp");

    // Check that content language changed correctly
    if (targetLang === "en") {
      await page.waitForSelector("text=Reference Project & Case Study", { state: "visible", timeout: 15000 });
    } else {
      await page.waitForSelector("text=Referans Proje & Vaka Çalışması", { state: "visible", timeout: 15000 });
    }
  });
});
