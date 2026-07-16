# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: solvaria.spec.ts >> Solvaria B2B Transformation E2E Tests >> Language context switching preserves the active page
- Location: tests/solvaria.spec.ts:111:7

# Error details

```
TimeoutError: page.waitForSelector: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('text=Müşteri Projesi') to be visible

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]
  - main [ref=e25]:
    - navigation [ref=e27]:
      - link "SOLVARIA dijital çözümler & sistemler" [ref=e28] [cursor=pointer]:
        - /url: /
        - generic [ref=e29]: SOLVARIA
        - generic [ref=e30]: dijital çözümler & sistemler
      - generic [ref=e31]:
        - button "Çözümler" [ref=e33]:
          - text: Çözümler
          - img [ref=e34]
        - link "Projeler" [ref=e36] [cursor=pointer]:
          - /url: /projeler
        - link "İş Birliği" [ref=e37] [cursor=pointer]:
          - /url: /is-birligi
        - button "Stüdyo" [ref=e39]:
          - text: Stüdyo
          - img [ref=e40]
        - button "tr" [ref=e43]:
          - text: tr
          - img [ref=e44]
        - link "Projemi Konuşalım" [ref=e46] [cursor=pointer]:
          - /url: /iletisim
    - generic [ref=e49]:
      - navigation "Breadcrumb" [ref=e50]:
        - list [ref=e51]:
          - listitem [ref=e52]:
            - link "Ana Sayfa" [ref=e53] [cursor=pointer]:
              - /url: /
          - listitem [ref=e54]:
            - generic [ref=e55]: /
            - link "Projeler" [ref=e56] [cursor=pointer]:
              - /url: /projeler
          - listitem [ref=e57]:
            - generic [ref=e58]: /
            - generic [ref=e59]: StockApp
      - generic [ref=e60]:
        - paragraph [ref=e61]: Referans Proje & Vaka Çalışması
        - generic [ref=e62]: Canlı
      - heading "StockApp" [level=1] [ref=e63]
      - paragraph [ref=e64]: Stok, cari hesap ve tahsilat takip sistemi
      - generic [ref=e65]:
        - paragraph [ref=e66]: Teknolojiler
        - generic [ref=e67]:
          - generic [ref=e68]: Next.js
          - generic [ref=e69]: Supabase
          - generic [ref=e70]: TypeScript
          - generic [ref=e71]: Tailwind CSS
      - generic [ref=e72]:
        - paragraph [ref=e73]: Başlangıç Problemi
        - paragraph [ref=e74]: Stok, müşteri bakiyesi ve tahsilat bilgilerinin defter ile farklı Excel dosyalarında dağınık tutulması.
    - generic [ref=e77]:
      - generic [ref=e78]:
        - generic [ref=e79]: GÖRSEL PROTOTİP
        - heading "Sistem Arayüzü ve Akış Tasarımı" [level=2] [ref=e80]
        - paragraph [ref=e81]: İşletmenin ihtiyaçlarına göre sıfırdan kurgulanan ve canlıya alınan operasyonel arayüz yapısının çalışan prototipi.
      - generic [ref=e82]:
        - generic [ref=e83]: Mockup Grid
        - generic [ref=e85]:
          - generic [ref=e94]:
            - img [ref=e96]
            - generic [ref=e100]:
              - paragraph [ref=e101]: Stok Eklendi
              - paragraph [ref=e102]: "+124"
          - generic [ref=e103]:
            - img [ref=e105]
            - generic [ref=e108]:
              - paragraph [ref=e109]: Tahsilat
              - paragraph [ref=e110]: Alındı
          - generic [ref=e111]:
            - img [ref=e112]
            - generic [ref=e115]: PDF Ekstre
    - generic [ref=e118]:
      - generic [ref=e119]:
        - heading "Proje Özeti" [level=2] [ref=e120]
        - paragraph [ref=e121]: Stok ve cari hesap verisi defter ile Excel'de dağınık olan bir işletme için stok hareketleri, müşteri bakiyeleri ve tahsilat takibini tek arayüzde toplayan özel bir web uygulaması geliştirildi.
      - generic [ref=e122]:
        - heading "Hedef Kullanıcı" [level=2] [ref=e123]
        - paragraph [ref=e124]: Toptan veya perakende satış yapan, müşterilerine vadeli satış sunan KOBİ sahipleri ve yöneticileri
    - generic [ref=e126]:
      - heading "Çözüm Yaklaşımı" [level=2] [ref=e127]
      - paragraph [ref=e128]: Stok hareketleri, müşteri bakiyeleri ve tahsilat takibini tek arayüzde toplayan özel bir web uygulaması.
    - generic [ref=e130]:
      - heading "Sistem Modülleri" [level=2] [ref=e131]
      - generic [ref=e132]:
        - generic [ref=e133]:
          - heading "Stok Yönetimi" [level=3] [ref=e134]
          - list [ref=e135]:
            - listitem [ref=e136]: Ürün giriş/çıkış kaydı
            - listitem [ref=e138]: Kritik stok seviye uyarısı
            - listitem [ref=e140]: Ürün geçmiş hareketleri
        - generic [ref=e142]:
          - heading "Cari Hesap" [level=3] [ref=e143]
          - list [ref=e144]:
            - listitem [ref=e145]: Müşteri bazlı bakiye takibi
            - listitem [ref=e147]: Satış ve ödeme geçmişi
            - listitem [ref=e149]: Vade takibi
        - generic [ref=e151]:
          - heading "Tahsilat" [level=3] [ref=e152]
          - list [ref=e153]:
            - listitem [ref=e154]: Ödeme kayıt ekranı
            - listitem [ref=e156]: Gecikmiş alacak bildirimleri
            - listitem [ref=e158]: Aylık tahsilat özeti
        - generic [ref=e160]:
          - heading "PDF Raporlama" [level=3] [ref=e161]
          - list [ref=e162]:
            - listitem [ref=e163]: Tek tıkla hesap ekstresi
            - listitem [ref=e165]: Stok durum raporu
            - listitem [ref=e167]: WhatsApp paylaşım akışı
    - generic [ref=e170]:
      - heading "Kullanıcı Yolculuğu" [level=2] [ref=e171]
      - list [ref=e172]:
        - listitem [ref=e173]:
          - generic [ref=e174]: "1"
          - generic [ref=e175]: Yönetici paneline giriş yapar
        - listitem [ref=e176]:
          - generic [ref=e177]: "2"
          - generic [ref=e178]: Günlük stok girişlerini kaydeder
        - listitem [ref=e179]:
          - generic [ref=e180]: "3"
          - generic [ref=e181]: Müşteri satışını işler, cari hesap güncellenir
        - listitem [ref=e182]:
          - generic [ref=e183]: "4"
          - generic [ref=e184]: Vadesi gelen tahsilat bildirimini görür
        - listitem [ref=e185]:
          - generic [ref=e186]: "5"
          - generic [ref=e187]: Müşteriye PDF hesap ekstresi oluşturur ve WhatsApp'tan iletir
        - listitem [ref=e188]:
          - generic [ref=e189]: "6"
          - generic [ref=e190]: Dashboard'da günlük tahsilat ve stok özetini inceler
    - generic [ref=e192]:
      - heading "Sağlanan Çıktılar" [level=2] [ref=e193]
      - generic [ref=e194]:
        - generic [ref=e195]:
          - img [ref=e196]
          - generic [ref=e199]: Stok görünürlüğünün anlık hale gelmesi
        - generic [ref=e200]:
          - img [ref=e201]
          - generic [ref=e204]: Müşteri bakiyelerine her an erişilebilmesi
        - generic [ref=e205]:
          - img [ref=e206]
          - generic [ref=e209]: Tahsilat takibinin sistem üzerinden yürütülmesi
        - generic [ref=e210]:
          - img [ref=e211]
          - generic [ref=e214]: Tek tıkla PDF hesap ekstresi oluşturma akışı
    - generic [ref=e216]:
      - heading "Öğrenimler" [level=2] [ref=e217]
      - list [ref=e218]:
        - listitem [ref=e219]: PDF oluşturma akışının mobil tarayıcıda da sorunsuz çalışması için ekstra test gerekti
        - listitem [ref=e221]: Kritik stok eşiğinin kullanıcı tarafından ayarlanabilir olması talep edildi ve eklendi
    - generic [ref=e224]:
      - heading "Gelecek Planlar" [level=2] [ref=e225]
      - generic [ref=e226]:
        - generic [ref=e227]: Tedarikçi sipariş takibi modülü
        - generic [ref=e228]: Barkod okuyucu ile stok girişi
        - generic [ref=e229]: Çoklu depo desteği
    - generic [ref=e231]:
      - paragraph [ref=e232]: 03 — Vaka Çalışmaları & Referanslar
      - heading "Başka ne geliştirdik?" [level=2] [ref=e233]
      - generic [ref=e234]:
        - link "Hezer Auto Service Araç kabul, onarım ve oto servis operasyon sistemi İncele" [ref=e235] [cursor=pointer]:
          - /url: /projeler/hezer-auto-service
          - heading "Hezer Auto Service" [level=3] [ref=e236]
          - paragraph [ref=e237]: Araç kabul, onarım ve oto servis operasyon sistemi
          - generic [ref=e238]:
            - text: İncele
            - img [ref=e239]
        - link "CARPASS Araç geçmişi ve yapay zekâ destekli risk analiz platformu İncele" [ref=e241] [cursor=pointer]:
          - /url: /projeler/carpass
          - heading "CARPASS" [level=3] [ref=e242]
          - paragraph [ref=e243]: Araç geçmişi ve yapay zekâ destekli risk analiz platformu
          - generic [ref=e244]:
            - text: İncele
            - img [ref=e245]
        - link "SaaS Infrastructures Aboneliğe hazır çok-kiracılı (multi-tenant) yazılım altyapısı İncele" [ref=e247] [cursor=pointer]:
          - /url: /projeler/saas-operasyon-altyapisi
          - heading "SaaS Infrastructures" [level=3] [ref=e248]
          - paragraph [ref=e249]: Aboneliğe hazır çok-kiracılı (multi-tenant) yazılım altyapısı
          - generic [ref=e250]:
            - text: İncele
            - img [ref=e251]
        - link "Solvaria Personal Brand Site Kişisel marka ve stüdyo konumlandırması için çok sayfalı web sitesi İncele" [ref=e253] [cursor=pointer]:
          - /url: /projeler/personal-brand-site
          - heading "Solvaria Personal Brand Site" [level=3] [ref=e254]
          - paragraph [ref=e255]: Kişisel marka ve stüdyo konumlandırması için çok sayfalı web sitesi
          - generic [ref=e256]:
            - text: İncele
            - img [ref=e257]
    - generic [ref=e260]:
      - paragraph [ref=e261]: Benzer Bir Operasyon Sistemi?
      - heading "Benzer bir stok ve cari hesap sistemi konuşalım." [level=2] [ref=e262]
      - paragraph [ref=e263]: Kısa bir ön görüşmede ihtiyacınızı dinleyip ne tür bir sistemin işe yarayacağını birlikte değerlendiririz.
      - generic [ref=e264]:
        - link "Benzer Bir Operasyon Sistemi İçin Görüşelim" [ref=e265] [cursor=pointer]:
          - /url: /iletisim
        - link "Tüm Projeler" [ref=e266] [cursor=pointer]:
          - /url: /projeler
  - contentinfo [ref=e267]:
    - generic [ref=e268]:
      - generic [ref=e269]:
        - generic [ref=e270]:
          - link "SOLVARIA" [ref=e271] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e272]: İşletmeler için kurumsal web siteleri, özel iş takip sistemleri, web uygulamaları, SaaS ürünleri ve otomasyon çözümleri geliştiriyoruz.
          - generic [ref=e273]:
            - link "mertalbaan@gmail.com" [ref=e274] [cursor=pointer]:
              - /url: mailto:mertalbaan@gmail.com?subject=Proje%20talebi
              - img [ref=e275]
              - text: mertalbaan@gmail.com
            - link "WhatsApp'tan yaz" [ref=e278] [cursor=pointer]:
              - /url: https://wa.me/905379531547
              - img [ref=e279]
              - text: WhatsApp'tan yaz
            - generic [ref=e281]:
              - img [ref=e282]
              - text: İzmir, Türkiye · Türkiye geneline uzaktan hizmet
        - generic [ref=e285]:
          - heading "Sistem Çözümleri" [level=4] [ref=e286]
          - list [ref=e287]:
            - listitem [ref=e288]:
              - link "İş Takip Sistemleri" [ref=e289] [cursor=pointer]:
                - /url: /cozumler/is-takip-sistemleri
            - listitem [ref=e290]:
              - link "Stok ve Cari Hesap" [ref=e291] [cursor=pointer]:
                - /url: /cozumler/stok-cari-tahsilat
            - listitem [ref=e292]:
              - link "Operasyon Otomasyonları" [ref=e293] [cursor=pointer]:
                - /url: /cozumler/operasyon-otomasyonlari
            - listitem [ref=e294]:
              - link "SaaS Ürün Altyapısı" [ref=e295] [cursor=pointer]:
                - /url: /cozumler/saas-urun-altyapisi
        - generic [ref=e296]:
          - heading "Stüdyo" [level=4] [ref=e297]
          - list [ref=e298]:
            - listitem [ref=e299]:
              - link "Stüdyo" [ref=e300] [cursor=pointer]:
                - /url: /studyo
            - listitem [ref=e301]:
              - link "Projeler" [ref=e302] [cursor=pointer]:
                - /url: /projeler
            - listitem [ref=e303]:
              - link "Çalışma Süreci" [ref=e304] [cursor=pointer]:
                - /url: /surec
            - listitem [ref=e305]:
              - link "İş Birliği" [ref=e306] [cursor=pointer]:
                - /url: /is-birligi
            - listitem [ref=e307]:
              - link "İletişim" [ref=e308] [cursor=pointer]:
                - /url: /iletisim
      - generic [ref=e309]:
        - paragraph [ref=e310]: © 2026 Solvaria. Tüm hakları saklıdır.
        - generic [ref=e311]:
          - link "Gizlilik" [ref=e312] [cursor=pointer]:
            - /url: /gizlilik
          - link "Kullanım Koşulları" [ref=e313] [cursor=pointer]:
            - /url: /kullanim-kosullari
          - generic [ref=e314]: Digital Operation Systems · İzmir, Türkiye · Türkiye geneline uzaktan hizmet
```

# Test source

```ts
  40  |   test("Project classification and categories are accurate", async ({ page }) => {
  41  |     await page.goto("/projeler");
  42  |     await page.waitForSelector("h1", { state: "visible", timeout: 25000 });
  43  |     
  44  |     // Check project filters
  45  |     const filterAll = page.locator("button").filter({ hasText: /Tümü|All|Alle/i }).first();
  46  |     const filterClient = page.locator("button").filter({ hasText: /Müşteri Projeleri|Customer Projects|Kundenprojekte/i }).first();
  47  |     const filterProducts = page.locator("button").filter({ hasText: /Ürünler|Products|Produkte/i }).first();
  48  |     const filterConcepts = page.locator("button").filter({ hasText: /Konseptler|Concepts|Konzepte/i }).first();
  49  | 
  50  |     await expect(filterAll).toBeVisible();
  51  |     await expect(filterClient).toBeVisible();
  52  |     await expect(filterProducts).toBeVisible();
  53  |     await expect(filterConcepts).toBeVisible();
  54  | 
  55  |     // Check project cards
  56  |     const content = await page.textContent("body");
  57  |     expect(content).toContain("StockApp");
  58  |     expect(content).toContain("Hezer Auto Service");
  59  |     expect(content).toContain("CARPASS");
  60  |   });
  61  | 
  62  |   test("StockApp case study layout and details", async ({ page }) => {
  63  |     await page.goto("/projeler/stockapp");
  64  |     await page.waitForSelector("h1", { state: "visible", timeout: 25000 });
  65  |     
  66  |     // Check B2B details
  67  |     const content = await page.textContent("body");
  68  |     expect(content).toContain("StockApp");
  69  |     expect(content).toMatch(/Müşteri Projesi|Customer Project|Kundenprojekt/i);
  70  |     
  71  |     // Check mockup placeholders are visible
  72  |     await expect(page.locator("text=Mockup Grid").first()).toBeVisible();
  73  |   });
  74  | 
  75  |   test("CARPASS development pipeline status and module badges", async ({ page }) => {
  76  |     await page.goto("/projeler/carpass");
  77  |     await page.waitForSelector("h1", { state: "visible", timeout: 25000 });
  78  |     
  79  |     const content = await page.textContent("body");
  80  |     expect(content).toContain("CARPASS");
  81  |     expect(content).toMatch(/Solvaria Ürün Laboratuvarı|Solvaria Product Lab|Solvaria Produktlabor/i);
  82  |     
  83  |     // Check pipeline status
  84  |     expect(content).toMatch(/Geliştirme Aşamasında|In Development|Entwicklung/i);
  85  |   });
  86  | 
  87  |   test("Contact form multi-stage wizard works", async ({ page }) => {
  88  |     await page.goto("/iletisim");
  89  |     await page.waitForSelector("#cf-needType", { state: "visible", timeout: 25000 });
  90  |     
  91  |     // Select Need Type by index (language-agnostic)
  92  |     await page.selectOption("#cf-needType", { index: 3 });
  93  | 
  94  |     // Fill Stage 1
  95  |     await page.fill("#cf-name", "Test User");
  96  |     await page.fill("#cf-company", "Test Company");
  97  |     await page.fill("#cf-email", "test@company.com");
  98  |     await page.fill("#cf-phone", "905000000000");
  99  |     await page.fill("#cf-message", "Looking for custom operations software.");
  100 | 
  101 |     // Go to next stage via language-agnostic ID selector
  102 |     await page.click("#cf-next-btn");
  103 | 
  104 |     // Verify Stage 2 fields are visible
  105 |     await expect(page.locator("#cf-currentMethod")).toBeVisible({ timeout: 10000 });
  106 |     await expect(page.locator("#cf-problem")).toBeVisible();
  107 |     await expect(page.locator("#cf-userCount")).toBeVisible();
  108 |     await expect(page.locator("#cf-timeline")).toBeVisible();
  109 |   });
  110 | 
  111 |   test("Language context switching preserves the active page", async ({ page }) => {
  112 |     await page.goto("/projeler/stockapp");
  113 |     await page.waitForSelector("nav", { state: "visible", timeout: 25000 });
  114 |     
  115 |     // Scope search inside the first language switcher (desktop)
  116 |     const desktopLangSwitcher = page.locator("[data-lang-switcher]").first();
  117 |     const activeBtn = desktopLangSwitcher.locator("button").first();
  118 |     await expect(activeBtn).toBeVisible({ timeout: 15000 });
  119 |     
  120 |     // Get the current language tag
  121 |     const currentLangText = (await activeBtn.innerText()).trim().toLowerCase();
  122 |     
  123 |     // Open language dropdown
  124 |     await activeBtn.click();
  125 |     
  126 |     // Select target language button
  127 |     const targetLang = currentLangText === "tr" ? "en" : "tr";
  128 |     const targetBtn = desktopLangSwitcher.locator("button", { hasText: new RegExp(`^${targetLang}$`, "i") });
  129 |     await expect(targetBtn).toBeVisible();
  130 |     await targetBtn.click();
  131 |     
  132 |     // Verify path is preserved
  133 |     const url = page.url();
  134 |     expect(url).toContain("/projeler/stockapp");
  135 | 
  136 |     // Check that content language changed correctly
  137 |     if (targetLang === "en") {
  138 |       await page.waitForSelector("text=Client Project", { state: "visible", timeout: 15000 });
  139 |     } else {
> 140 |       await page.waitForSelector("text=Müşteri Projesi", { state: "visible", timeout: 15000 });
      |                  ^ TimeoutError: page.waitForSelector: Timeout 15000ms exceeded.
  141 |     }
  142 |   });
  143 | });
  144 | 
```