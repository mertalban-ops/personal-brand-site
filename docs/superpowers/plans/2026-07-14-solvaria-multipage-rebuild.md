# Solvaria Multi-Page Premium Website Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mevcut tek sayfalı Solvaria sitesini; Ana Sayfa, Çözümler (4 alt sayfa), Projeler (4 vaka çalışması), Süreç, Stüdyo, İletişim, Gizlilik ve Kullanım Koşulları içeren premium çok sayfalı bir dijital çözüm stüdyosu sitesine dönüştürmek.

**Architecture:** App Router statik export korunur. Mevcut tasarım sistemi (CSS değişkenleri, Framer Motion, FloatingCard, Reveal3D) yeniden kullanılır. İçerik data dosyalarında tutulur, sayfa bileşenleri data-driven olarak çalışır.

**Tech Stack:** Next.js 16.2.10 (App Router, statik), TypeScript, Tailwind CSS v4, Framer Motion v12, Lucide React, `@splinetool/react-spline` (mevcut hero için korunur)

## Global Constraints

- Build hiçbir zaman kırılmaz; kırılırsa yeni geliştirme durur, önce düzeltilir
- `data/contact.ts` dokunulmaz; mevcut gerçek bilgiler korunur (email, whatsapp doğru)
- LinkedIn `"#"` ve GitHub `"#"` placeholder olarak kalır; sahte URL eklenmez
- Gerçek olmayan metrik, müşteri yorumu veya başarı rakamı üretilmez
- Proje durumları: StockApp=Canlı, Hezer=Canlı, CARPASS=Geliştirme Aşamasında, SaaS=Konsept
- `data/locales/tr.ts` içindeki "sayım hatalarını sıfırlamak" → "azaltmak" olarak düzeltilir
- Her Services kartındaki "Sistem İstiyorum" CTA → bağlama göre farklılaştırılır
- Second Brain Orchestra dosyaları değiştirilmez
- Git push / deploy için ayrıca onay alınır
- `prefers-reduced-motion` tüm yeni animasyonlarda desteklenir
- Tüm bileşenler `"use client"` sadece gerektiğinde kullanır; server component tercih edilir

---

## Audit Raporu

### Mevcut Teknik Yapı
- **Proje yolu:** `/Users/katre/Desktop/yapay zeka/01_Projeler/personal-brand-site/`
- **Framework:** Next.js 16.2.10, App Router, statik output
- **Styling:** Tailwind CSS v4 + custom CSS değişkenleri (`globals.css`)
- **Animation:** Framer Motion v12 — `useReducedMotion` desteği mevcut
- **3D:** Spline (`@splinetool/react-spline`) — hero ve projeler banner'ında robot sahnesi
- **Fontlar:** Archivo (display), Instrument_Sans (body), IBM_Plex_Mono (mono)
- **Mevcut route'lar:** `/`, `/hizmetler`, `/projeler`, `/surec`, `/iletisim`
- **Dil desteği:** TR/EN/DE — `LanguageContext` + `data/locales/`
- **Build durumu:** ✅ Temiz (8 sayfa, 0 hata, 0 TypeScript hatası)
- **Contact:** email ✅, whatsapp ✅, linkedin `"#"` (placeholder), github `"#"` (placeholder)

### Mevcut Bileşenler (Korunacak / Yeniden Kullanılacak)
| Bileşen | Durum | Aksiyon |
|---|---|---|
| `AnimatedSection` | ✅ Güçlü | Tüm yeni sayfalarda kullan |
| `FloatingCard` | ✅ Güçlü | Kart bileşenlerinde kullan |
| `Reveal3D` | ✅ Güçlü | Grid'lerde kullan |
| `LazyVisible` | ✅ Kullanışlı | Lazy section'larda kullan |
| `Navbar` | ⚠️ Güncellenecek | Yeni navigasyon linkleri |
| `Footer` | ⚠️ Güncellenecek | Yeni sayfa linkleri |
| `Hero` | ⚠️ Güncellenecek | Yeni mesaj + hero düzeni |
| `TrustStrip` | ✅ Korunur | Ana sayfada kalır |
| `ProblemsSolutions` | ✅ Korunur | Ana sayfada kalır |
| `SystemNetwork` | ✅ Korunur | Ana sayfada veya çözümler'de |
| `Projects` (bileşen) | ⚠️ Güncellenecek | `/projeler` index için |
| `ProjectLoopPreview` | ✅ Güçlü | Tüm proje sayfalarında kullan |
| `previews/*` (4 adet) | ✅ Güçlü | Vaka sayfalarında kullan |
| `Services` | ⚠️ `/cozumler`'e taşınacak | Yeniden konumlandırılır |
| `WhyMe` | ⚠️ Stüdyo'ya taşınacak | |
| `Strengths` | ⚠️ Stüdyo'ya taşınacak | |
| `Process` | ✅ Korunur | `/surec`'te kalır, geliştirilir |
| `About` | ⚠️ `/studyo`'ya taşınacak | |
| `FAQ` | ⚠️ Güncellenecek | Ana sayfa + iletisim'de |
| `Contact` | ⚠️ Güncellenecek | Form + zengin iletisim |
| `CtaStrip` | ✅ Korunur | Tüm sayfalarda kullan |
| `Testimonial` | ⚠️ Çalışma felsefesi | Stüdyo veya kaldır |
| `SceneBackground` | ✅ Korunur | Layout'ta kalır |

### İçerik Denetimi
**Güçlü yönler:** Problem-çözüm kartları net, proje verileri gerçek ve dürüst, dil sistemi (TR/EN/DE) sağlam, loop preview animasyonları özgün ve etkileyici, design token sistemi tutarlı.

**Düzeltilecekler:**
- `tr.ts` → "sayım hatalarını **sıfırlamak**" → "**azaltmak**"
- `Services` bileşeni → her kartta "Sistem İstiyorum" aynı CTA tekrarı
- `Projects` → "Benzerini İstiyorum" her kartta tekrar ediyor
- Ana sayfa akışı: Hero → TrustStrip → ProblemsSolutions → SystemNetwork → Testimonial → CtaStrip — Testimonial sayfada yüzer, bağlamı zayıf
- `/hizmetler` → `/cozumler` olacak, yönlendirme gerekli
- LinkedIn ve GitHub butonları Contact'ta `"#"` gösteriyor — koşullu render düzeltilmeli (şu an `contact.linkedin && ...` ile gösteriliyor, `"#"` truthy olduğu için gösteriyor; `contact.linkedin !== "#"` kontrolü eklenmeli)

---

## Yeni Bilgi Mimarisi

| Route | Ana Amaç | Hedef Aksiyon |
|---|---|---|
| `/` | Problem → Çözüm → Kanıt → Güven | İletişim veya çözüm sayfası |
| `/cozumler` | Hangi hizmet bana uygun? | Alt çözüm sayfasına git |
| `/cozumler/is-takip-sistemleri` | İş takip çözümü detayı | İletişim |
| `/cozumler/stok-cari-tahsilat` | Stok/cari çözüm detayı | İletişim |
| `/cozumler/operasyon-otomasyonlari` | Otomasyon çözüm detayı | İletişim |
| `/cozumler/saas-urun-altyapisi` | SaaS mimari detayı | İletişim |
| `/projeler` | Proje vitrini + filtreler | Vaka çalışmasına git |
| `/projeler/stockapp` | StockApp vaka çalışması | Benzer sistem konuşalım |
| `/projeler/hezer-auto-service` | Hezer vaka çalışması | Benzer sistem konuşalım |
| `/projeler/carpass` | CARPASS vaka çalışması | İletişim |
| `/projeler/saas-operasyon-altyapisi` | SaaS mimari vaka | İletişim |
| `/surec` | Proje sürecini anlat | İletişim |
| `/studyo` | Marka + kurucu güveni | Projeler veya iletişim |
| `/iletisim` | Talep al | Form gönder |
| `/gizlilik` | KVKK/Gizlilik | — |
| `/kullanim-kosullari` | Kullanım şartları | — |
| `/hizmetler` | Redirect → `/cozumler` | — |

---

## Dosya Yapısı (Oluşturulacak / Değiştirilecek)

### Yeni route dosyaları
```
app/
├── cozumler/
│   ├── page.tsx                          [YENİ]
│   ├── is-takip-sistemleri/page.tsx      [YENİ]
│   ├── stok-cari-tahsilat/page.tsx       [YENİ]
│   ├── operasyon-otomasyonlari/page.tsx  [YENİ]
│   └── saas-urun-altyapisi/page.tsx      [YENİ]
├── projeler/
│   ├── page.tsx                          [GÜNCELLENECEKs]
│   ├── stockapp/page.tsx                 [YENİ]
│   ├── hezer-auto-service/page.tsx       [YENİ]
│   ├── carpass/page.tsx                  [YENİ]
│   └── saas-operasyon-altyapisi/page.tsx [YENİ]
├── studyo/page.tsx                       [YENİ]
├── gizlilik/page.tsx                     [YENİ]
├── kullanim-kosullari/page.tsx           [YENİ]
├── surec/page.tsx                        [GÜNCELLENECEKs]
├── iletisim/page.tsx                     [GÜNCELLENECEKs]
├── hizmetler/page.tsx                    [REDIRECT → /cozumler]
├── page.tsx                              [GÜNCELLENECEKs]
└── layout.tsx                            [GÜNCELLENECEKs - metadata, sitemap link]
```

### Yeni data dosyaları
```
data/
├── solutions.ts      [YENİ — 4 çözüm kategorisi, alt özellikler]
├── faqs.ts           [YENİ — kategori bazlı SSS]
├── process.ts        [YENİ — detaylı süreç adımları]
├── studio.ts         [YENİ — stüdyo/kurucu bilgileri]
├── navigation.ts     [YENİ — nav linkleri tek kaynak]
├── contact.ts        [KÜÇÜK DÜZELTME — linkedin/github koşul kontrolü]
├── projects.ts       [GÜNCELLENECEKs — case study alanları eklenir]
└── locales/tr.ts     [KÜÇÜK DÜZELTME — "sıfırlamak" → "azaltmak"]
```

### Yeni bileşenler
```
components/
├── layout/
│   └── Breadcrumb.tsx                [YENİ]
├── solutions/
│   ├── SolutionCard.tsx              [YENİ]
│   ├── ProblemSelector.tsx           [YENİ — interaktif filtre]
│   └── SolutionDetailHero.tsx        [YENİ]
├── projects/
│   ├── ProjectFilter.tsx             [YENİ]
│   ├── CaseStudyHero.tsx             [YENİ]
│   └── CaseStudyNextStep.tsx         [YENİ]
├── studio/
│   └── FounderCard.tsx               [YENİ]
├── contact/
│   └── ContactForm.tsx               [YENİ — mailto fallback ile]
└── ui/
    └── StatusBadge.tsx               [YENİ — proje durum etiketi]
```

### Güncellenen mevcut bileşenler
```
components/
├── Navbar.tsx          [yeni linkler + /cozumler, /studyo]
├── Footer.tsx          [yeni sayfa linkleri + gizlilik/kullanim]
├── Hero.tsx            [yeni mesaj + iki CTA + micro güven metni]
├── Contact.tsx         [linkedin/github "#" kontrolü düzeltilir]
├── Services.tsx        [CTA metni bağlama göre çeşitlendirilir]
└── Projects.tsx        [filtre + "Vaka Çalışmasını İncele" CTA]
```

### Statik dosyalar
```
app/
├── sitemap.ts          [YENİ — tüm route'ları içerir]
└── robots.ts           [YENİ]
```

---

## Task 1: Veri Temeli — Data Dosyaları

**Files:**
- Create: `data/solutions.ts`
- Create: `data/faqs.ts`
- Create: `data/process.ts`
- Create: `data/studio.ts`
- Create: `data/navigation.ts`
- Modify: `data/projects.ts` — case study alanları eklenir
- Modify: `data/locales/tr.ts` — "sıfırlamak" → "azaltmak" düzeltmesi
- Modify: `data/contact.ts` — comment güncelleme (değer değişmez)

**Interfaces:**
- Produces: `Solution`, `FAQ`, `ProcessStep`, `StudioContent`, `NavLink` tipleri
- Produces: `projects` array genişler → `caseSummary`, `modules`, `userJourney`, `outcomes` alanları

- [ ] **Step 1: `data/solutions.ts` oluştur**

```typescript
export type SolutionModule = {
  title: string;
  items: string[];
};

export type Solution = {
  slug: "is-takip-sistemleri" | "stok-cari-tahsilat" | "operasyon-otomasyonlari" | "saas-urun-altyapisi";
  title: string;
  tagline: string;
  problemStatement: string;
  forWhom: string[];
  commonProblems: string[];
  modules: SolutionModule[];
  outcomes: string[];
  relatedProjectSlug?: string;
  cta: string;
};

export const solutions: Solution[] = [
  {
    slug: "is-takip-sistemleri",
    title: "İş Takip Sistemleri",
    tagline: "Sipariş, görev ve müşteri süreçlerini tek panelden yönetin",
    problemStatement: "İş emirleri kişilerin hafızasında, görevler WhatsApp'ta, müşteri bilgileri dağınık Excel tablolarında kalıyor.",
    forWhom: [
      "Servis ve bakım işletmeleri",
      "Üretim ve sipariş takibi yapan KOBİ'ler",
      "Saha ekibi olan işletmeler",
      "Birden fazla lokasyonlu operasyonlar",
    ],
    commonProblems: [
      "Hangi iş emrinin hangi aşamada olduğu bilinmiyor",
      "Müşteri geçmişi kişilerin hafızasında",
      "Farklı personel aynı işi tekrarlıyor",
      "Raporlama manuel ve zaman alıyor",
    ],
    modules: [
      { title: "İş Emri Yönetimi", items: ["Oluşturma ve atama", "Adım adım durum takibi", "Tamamlama onayı"] },
      { title: "Müşteri ve CRM", items: ["İletişim geçmişi", "Özel notlar", "Geçmiş işler"] },
      { title: "Kullanıcı Rolleri", items: ["Yönetici paneli", "Personel görünümü", "Salt okunur raporlama"] },
      { title: "Bildirimler", items: ["Durum güncellemeleri", "Gecikme uyarıları", "Tamamlanma bildirimleri"] },
    ],
    outcomes: [
      "İşlerin kişilere değil sisteme bağlı olması",
      "Yöneticinin tüm operasyonu tek ekrandan görmesi",
      "Raporlamanın otomatik ve anlık hale gelmesi",
    ],
    relatedProjectSlug: "hezer-auto-service",
    cta: "İş Takip Sistemi Konuşalım",
  },
  {
    slug: "stok-cari-tahsilat",
    title: "Stok, Cari Hesap ve Tahsilat",
    tagline: "Deponuzu, alacaklarınızı ve tahsilatlarınızı tek sistemde görün",
    problemStatement: "Stok sayımları tutarsız, müşteri bakiyeleri belirsiz, tahsilatlar unutuluyor.",
    forWhom: [
      "Toptan ve perakende satış işletmeleri",
      "Tedarikçi ve bayi ağı olan firmalar",
      "Müşterilere vadeli satış yapan işletmeler",
      "Stok yoğun operasyonlar",
    ],
    commonProblems: [
      "Stokta ne kadar ürün kaldığı bilinmiyor",
      "Kimin ne kadar borçlu olduğu karışık",
      "Tahsilatlar takip edilemiyor, vadesi geçenler unutuluyor",
      "Hesap ekstresi hazırlamak saat alıyor",
    ],
    modules: [
      { title: "Stok Yönetimi", items: ["Giriş/çıkış takibi", "Kritik seviye uyarısı", "Ürün geçmişi"] },
      { title: "Cari Hesap", items: ["Müşteri bakiyesi", "Satış geçmişi", "Vade takibi"] },
      { title: "Tahsilat", items: ["Ödeme kayıtları", "Gecikme bildirimleri", "Aylık tahsilat özeti"] },
      { title: "PDF Raporlama", items: ["Hesap ekstresi", "Stok durum raporu", "WhatsApp paylaşımı"] },
    ],
    outcomes: [
      "Stok görünürlüğünün anlık olması",
      "Müşteri bakiyelerinin her an erişilebilir olması",
      "Tahsilat hatırlatmalarının otomatikleşmesi",
    ],
    relatedProjectSlug: "stockapp",
    cta: "Stok ve Cari Sistemi Konuşalım",
  },
  {
    slug: "operasyon-otomasyonlari",
    title: "Operasyon Otomasyonları",
    tagline: "Tekrar eden işleri otomatiğe bağlayın, personelinizi asıl işe odaklayın",
    problemStatement: "Her gün aynı manuel işler zaman ve enerji harcatıyor: e-posta göndermek, rapor hazırlamak, veri aktarmak.",
    forWhom: [
      "Tekrar eden operasyonel iş yükü olan işletmeler",
      "Farklı sistemler arasında veri taşıyan ekipler",
      "Müşteri iletişimini otomatikleştirmek isteyen firmalar",
      "Raporlamayı hızlandırmak isteyen yöneticiler",
    ],
    commonProblems: [
      "Aynı veriyi birden fazla yere manuel girmek",
      "Müşteri hatırlatmaları unutuluyor",
      "Haftalık raporlar saatler alıyor",
      "Onay süreçleri e-postayla ilerliyor, kaybolabiliyor",
    ],
    modules: [
      { title: "n8n İş Akışları", items: ["Tetikleyici bazlı otomasyonlar", "Koşullu akış yönetimi", "API entegrasyonları"] },
      { title: "Bildirim ve İletişim", items: ["Otomatik e-posta", "WhatsApp mesajlaşma", "Durum güncellemeleri"] },
      { title: "Rapor Üretimi", items: ["Zamanlanmış raporlar", "PDF otomatik oluşturma", "E-posta ile gönderim"] },
      { title: "Veri Senkronizasyonu", items: ["Sistemler arası veri akışı", "Audit log", "Hata yönetimi"] },
    ],
    outcomes: [
      "Manuel tekrar eden iş yükünün azalması",
      "Müşteri iletişiminin zamanında ve tutarlı olması",
      "Raporlamanın otomatik çalışması",
    ],
    relatedProjectSlug: "saas-operasyon-altyapisi",
    cta: "Otomasyon Sistemini Konuşalım",
  },
  {
    slug: "saas-urun-altyapisi",
    title: "SaaS Ürün Altyapısı",
    tagline: "Sektörünüzdeki sorunu çözen dijital ürünü birlikte inşa edin",
    problemStatement: "Şirket içi çözülen bir problemi, diğer firmalara satılabilir abonelik modeline dönüştürmek karmaşık görünüyor.",
    forWhom: [
      "Sektörel yazılım ürünü geliştirmek isteyen girişimciler",
      "Mevcut iç sistemi ürünleştirmek isteyen KOBİ'ler",
      "MVP aşamasından ölçeklenebilir yapıya geçmek isteyenler",
      "Farklı firmalara kiralayabileceği bir platform kurmak isteyenler",
    ],
    commonProblems: [
      "Nereden başlayacağı ve hangi yapıyı kurması gerektiği belirsiz",
      "Birden fazla müşteriyi aynı sistemde güvenli tutmak zor",
      "Abonelik ve faturalandırma altyapısı karmaşık",
      "Ürün büyüdükçe sistemin tutarsızlaşması",
    ],
    modules: [
      { title: "Multi-Tenant Mimari", items: ["Kiracı izolasyonu", "Paylaşımlı altyapı", "Veri güvenliği"] },
      { title: "Abonelik Sistemi", items: ["Plan yönetimi", "Fatura ve ödeme altyapısı", "Freemium mantığı"] },
      { title: "Kullanıcı Yönetimi", items: ["Rol bazlı erişim", "Davet sistemi", "Süper admin paneli"] },
      { title: "Ürün Altyapısı", items: ["API tasarımı", "Webhook desteği", "Ölçeklenebilir veritabanı"] },
    ],
    outcomes: [
      "Güvenli ve izole edilmiş çok-kiracılı yapı",
      "Ölçeklenebilir abonelik ve faturalandırma sistemi",
      "Ürün büyüdükçe dayanıklı kalan teknik temel",
    ],
    relatedProjectSlug: "saas-operasyon-altyapisi",
    cta: "SaaS Ürünü Konuşalım",
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
```

- [ ] **Step 2: `data/faqs.ts` oluştur**

```typescript
export type FAQ = {
  q: string;
  a: string;
  category?: "genel" | "surec" | "teknik" | "fiyat";
};

export const faqs: FAQ[] = [
  {
    q: "Hazır paket mi satıyorsunuz, özel sistem mi geliştiriyorsunuz?",
    a: "Tamamen sizin işletmenizin işleyişine, terminolojisine ve ihtiyaçlarına göre özel sistemler geliştiriyoruz. Satın alınan değil, sizinle birlikte terzi usulü tasarlanan bir sisteme sahip oluyorsunuz.",
    category: "genel",
  },
  {
    q: "Geliştirdiğiniz sistemler mobilde de kullanılabiliyor mu?",
    a: "Evet. Kurduğumuz tüm web tabanlı iş takip ve operasyon sistemleri hem bilgisayarda hem de cep telefonu veya tablette sorunsuz çalışacak standartta tasarlanır.",
    category: "teknik",
  },
  {
    q: "Süreç nasıl başlar?",
    a: "Kısa bir ön görüşmeyle başlıyoruz. Operasyonunuzu, yaşadığınız sorunları ve beklentilerinizi dinliyoruz. Ardından kapsam ve teklifimizi sunuyoruz.",
    category: "surec",
  },
  {
    q: "Fiyat nasıl belirlenir?",
    a: "Sistemin büyüklüğüne, modül sayısına (Stok, Finans, Rapor, Otomasyon) ve entegrasyon ihtiyacına göre değişir. İlk görüşmede net bütçe ve takvim sunuyoruz.",
    category: "fiyat",
  },
  {
    q: "Sistem teslim edildikten sonra destek veriyor musunuz?",
    a: "Evet. Teslim sonrası aylık bakım anlaşmalarıyla sistemin güvenliğini sağlıyor ve yeni eklenti taleplerinizi karşılıyoruz.",
    category: "surec",
  },
  {
    q: "Hangi işletmeler için sistem kuruyorsunuz?",
    a: "Excel, WhatsApp veya defter üzerinden süreç yönetmekte zorlanan, ancak büyük ve pahalı ERP programlarına gerek duymayan KOBİ'ler ve girişimler için özel sistemler kuruyoruz.",
    category: "genel",
  },
  {
    q: "Sadece web sitesi mi yapıyorsunuz?",
    a: "Hayır. Kurumsal web siteleri yapmıyoruz. Uzmanlığımız tamamen işletmelerin arka plandaki yönetim ve operasyon panellerini (iş takip, stok, cari hesap, B2B portallar, SaaS altyapıları) kurmaktır.",
    category: "genel",
  },
  {
    q: "Geliştirme ne kadar sürer?",
    a: "Projenin kapsamına göre genellikle 4 ila 12 hafta arasında değişir. Modül sayısı, entegrasyonlar ve veri geçişi ihtiyacı süreyi etkiler. İlk görüşmede tahmini takvimi paylaşırız.",
    category: "fiyat",
  },
];

export function getHomepageFAQs(): FAQ[] {
  return faqs.filter((f) =>
    ["Hazır paket", "mobilde", "Süreç nasıl", "Fiyat nasıl"].some((keyword) =>
      f.q.includes(keyword)
    )
  );
}
```

- [ ] **Step 3: `data/process.ts` oluştur**

```typescript
export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  clientProvides: string[];
  weDeliver: string[];
  output: string;
  approvalPoint: boolean;
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Ön Görüşme",
    description: "İşletmenizin mevcut durumunu, yaşadığınız sorunları ve beklentilerinizi dinliyoruz.",
    clientProvides: ["Operasyon ve süreç tanımı", "Mevcut araçlar (Excel, defter, WhatsApp vs.)", "Öncelikli sorunlar"],
    weDeliver: ["Sorun analizi özeti", "Uygun çözüm önerileri", "Yaklaşık kapsam"],
    output: "Kapsam taslağı",
    approvalPoint: false,
  },
  {
    step: "02",
    title: "İhtiyaç ve Darboğaz Analizi",
    description: "Operasyonunuzun hangi noktada tıkandığını ayrıntılı inceliyoruz.",
    clientProvides: ["Mevcut süreç belgeleri", "Örnek veriler (varsa)", "Kullanıcı rolleri listesi"],
    weDeliver: ["Darboğaz haritası", "Modül listesi önerisi", "Teknik yaklaşım taslağı"],
    output: "İhtiyaç belgesi",
    approvalPoint: true,
  },
  {
    step: "03",
    title: "Kapsam ve Teklif",
    description: "Sistemin tam kapsamını, bütçesini ve takvimini netleştiriyoruz.",
    clientProvides: ["Öncelik sıralaması", "Bütçe beklentisi"],
    weDeliver: ["Detaylı kapsam belgesi", "Fiyat teklifi", "Takvim"],
    output: "İmzalı kapsam belgesi",
    approvalPoint: true,
  },
  {
    step: "04",
    title: "Sistem Tasarımı",
    description: "Veri modeli, kullanıcı rolleri ve ekran akışlarını tasarlıyoruz.",
    clientProvides: ["Terminoloji ve alan adları", "Onay"],
    weDeliver: ["Wireframe / ekran akışı", "Veri modeli", "Kullanıcı yolculuğu"],
    output: "Tasarım dokümanı",
    approvalPoint: true,
  },
  {
    step: "05",
    title: "Geliştirme",
    description: "Tasarlanan sistemi modül modül geliştiriyoruz.",
    clientProvides: ["Ara geri bildirim", "Test verileri"],
    weDeliver: ["Çalışan modüller", "Haftalık ilerleme güncellemesi"],
    output: "Test ortamına alınan sistem",
    approvalPoint: false,
  },
  {
    step: "06",
    title: "Test ve Doğrulama",
    description: "Gerçek kullanım senaryolarıyla sistemi birlikte test ediyoruz.",
    clientProvides: ["Gerçek senaryo testleri", "Hata bildirimleri"],
    weDeliver: ["Hata düzeltmeleri", "Performans doğrulaması", "Kullanıcı kabulü"],
    output: "Test onayı",
    approvalPoint: true,
  },
  {
    step: "07",
    title: "Teslim",
    description: "Sistemi canlı ortama alıyor, ekibinizi kısa bir kullanım eğitimiyle hazırlıyoruz.",
    clientProvides: ["Canlı ortam erişimleri", "Ekip katılımı"],
    weDeliver: ["Canlı sistem", "Kullanım kılavuzu", "Teknik belgeler"],
    output: "Canlı sistem teslimi",
    approvalPoint: true,
  },
  {
    step: "08",
    title: "Destek ve Geliştirme",
    description: "Teslim sonrası sistemin büyümesine ve gelişmesine destek oluyoruz.",
    clientProvides: ["Yeni ihtiyaçlar", "Geri bildirim"],
    weDeliver: ["Bakım ve güvenlik güncellemeleri", "Yeni modül geliştirme", "Teknik destek"],
    output: "Aylık bakım anlaşması (isteğe bağlı)",
    approvalPoint: false,
  },
];

export const pricingNote =
  "Fiyat ve süre; modül sayısı, kullanıcı rolleri, entegrasyonlar ve veri geçişi ihtiyacına göre belirlenir. İlk görüşmede kapsamı netleştirip net teklif sunuyoruz.";
```

- [ ] **Step 4: `data/studio.ts` oluştur**

```typescript
export const studio = {
  brand: {
    name: "Solvaria",
    tagline: "Dijital Çözüm Stüdyosu",
    description:
      "Solvaria, Mert Alban tarafından kurulan bağımsız bir dijital çözüm stüdyosudur. Küçük ve orta ölçekli işletmelerin manuel, dağınık ve zaman kaybettiren operasyon süreçlerini sade, ölçülebilir ve işletmeye özel dijital sistemlere dönüştürmeye odaklanıyoruz.",
    founded: "İzmir, Türkiye",
    whyBuilt:
      "Çoğu KOBİ, ya hantal ERP sistemlerine mahkum kalıyor ya da Excel ve WhatsApp arasında kaybolmuş süreçlerle çalışıyor. İkisi arasında doğru boyutta, gerçekten kullanılan sistemler kurmak için Solvaria kuruldu.",
  },
  founder: {
    name: "Mert Alban",
    role: "Kurucu",
    focus: [
      "İşletme süreçleri analizi ve darboğaz tespiti",
      "Web tabanlı operasyon paneli geliştirme",
      "Stok, cari hesap ve tahsilat sistemleri",
      "SaaS ürün mimarisi tasarımı",
      "n8n ile iş akışı otomasyonları",
    ],
    note: "Müşterilerle birebir çalışıyor; her projenin analiz, tasarım ve geliştirme sürecine doğrudan dahil oluyorum.",
  },
  principles: [
    {
      title: "İş dilini anlamak",
      text: "Teknik jargon değil, işletmenizin gerçek dilinde konuşuyoruz.",
    },
    {
      title: "İhtiyaca özel tasarım",
      text: "Hazır şablonlar değil, operasyonunuzun DNA'sına uygun sistem.",
    },
    {
      title: "Kullanılabilirlik önce",
      text: "Personelin benimseyeceği, karmaşıklaştırmayan temiz arayüzler.",
    },
    {
      title: "Geliştirilebilir altyapı",
      text: "Sistem bugün kurulur, işletme büyüdükçe büyür.",
    },
    {
      title: "Dürüstlük ve şeffaflık",
      text: "Gerçekçi takvim, gerçekçi bütçe, gerçekçi beklenti.",
    },
  ],
  techApproach:
    "Modern web teknolojileri (Next.js, React Native, Supabase, TypeScript) kullanıyoruz. Teknoloji seçiminde işletmenin gerçek ihtiyacı ve uzun vadeli bakım kolaylığı belirleyici.",
  securityNote:
    "Tüm sistemlerde rol bazlı erişim kontrolü, güvenli veritabanı yapısı ve düzenli yedekleme standardımızdır.",
};
```

- [ ] **Step 5: `data/navigation.ts` oluştur**

```typescript
export type NavLink = {
  href: string;
  label: string;
  labelEn?: string;
  labelDe?: string;
};

export const mainNavLinks: NavLink[] = [
  { href: "/cozumler", label: "Çözümler", labelEn: "Solutions", labelDe: "Lösungen" },
  { href: "/projeler", label: "Projeler", labelEn: "Projects", labelDe: "Projekte" },
  { href: "/surec", label: "Süreç", labelEn: "Process", labelDe: "Prozess" },
  { href: "/studyo", label: "Stüdyo", labelEn: "Studio", labelDe: "Studio" },
];

export const footerLinks = {
  solutions: [
    { href: "/cozumler/is-takip-sistemleri", label: "İş Takip Sistemleri" },
    { href: "/cozumler/stok-cari-tahsilat", label: "Stok ve Cari Hesap" },
    { href: "/cozumler/operasyon-otomasyonlari", label: "Operasyon Otomasyonları" },
    { href: "/cozumler/saas-urun-altyapisi", label: "SaaS Ürün Altyapısı" },
  ],
  studio: [
    { href: "/studyo", label: "Stüdyo" },
    { href: "/projeler", label: "Projeler" },
    { href: "/surec", label: "Çalışma Süreci" },
    { href: "/iletisim", label: "İletişim" },
    { href: "/gizlilik", label: "Gizlilik" },
    { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
  ],
};
```

- [ ] **Step 6: `data/projects.ts` — case study alanları ekle**

Mevcut `Project` tipine şu alanları ekle:

```typescript
export type CaseStudyModule = {
  name: string;
  features: string[];
};

export type Project = {
  // ... mevcut alanlar korunur ...
  slug: string;                          // YENİ
  caseSummary: string;                   // YENİ — tek paragraf özet
  targetUser: string;                    // YENİ — hedef kullanıcı
  caseModules: CaseStudyModule[];        // YENİ
  userJourney: string[];                 // YENİ — adım adım örnek akış
  outcomes: string[];                    // YENİ — sağlanan/hedeflenen fayda
  lessons?: string[];                    // YENİ — öğrenilenler
  futureWork?: string[];                 // YENİ — gelecek geliştirmeler
  liveUrl?: string;                      // YENİ — canlı link (opsiyonel)
};
```

- [ ] **Step 7: `data/locales/tr.ts` düzelt**

```
"sayım hatalarını sıfırlayıp" → "sayım hatalarını azaltıp"
```

- [ ] **Step 8: Build kontrol**

```bash
cd "/Users/katre/Desktop/yapay zeka/01_Projeler/personal-brand-site" && npm run build
```

Beklenen: ✅ Compile successful, 0 error

- [ ] **Step 9: Commit**

```bash
git add data/solutions.ts data/faqs.ts data/process.ts data/studio.ts data/navigation.ts data/projects.ts data/locales/tr.ts
git commit -m "feat: data foundation — solutions, faqs, process, studio, navigation types"
```

---

## Task 2: Temel Layout — Navbar, Footer, Contact Düzeltmesi

**Files:**
- Modify: `components/Navbar.tsx` — yeni linkler, `/cozumler` + `/studyo`
- Modify: `components/Footer.tsx` — yeni sayfa linkleri
- Modify: `components/Contact.tsx` — `"#"` placeholder kontrolü
- Modify: `app/layout.tsx` — sitemap/robots linkleri için canonical hazırlığı
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `app/hizmetler/page.tsx` → redirect to `/cozumler`
- Create: `components/ui/StatusBadge.tsx`
- Create: `components/layout/Breadcrumb.tsx`

**Interfaces:**
- Consumes: `mainNavLinks`, `footerLinks` from `data/navigation.ts`
- Produces: Consistent nav and footer across all pages

- [ ] **Step 1: `components/ui/StatusBadge.tsx` oluştur**

```typescript
"use client";

type Status = "active" | "development" | "concept" | "planned";

type Props = {
  status: string;
  className?: string;
};

function parseStatus(status: string): Status {
  const s = status.toLowerCase();
  if (s.includes("aktif") || s.includes("active") || s.includes("canlı") || s.includes("live")) return "active";
  if (s.includes("geliştirme") || s.includes("development") || s.includes("aşama")) return "development";
  if (s.includes("konsept") || s.includes("concept") || s.includes("mimari")) return "concept";
  return "planned";
}

const styles: Record<Status, string> = {
  active: "bg-accent/15 text-accent border-accent/20",
  development: "bg-blue/15 text-blue border-blue/20",
  concept: "bg-ink/10 text-muted border-line",
  planned: "bg-ink/10 text-muted border-line",
};

const labels: Record<Status, string> = {
  active: "Canlı",
  development: "Geliştirme Aşamasında",
  concept: "Konsept / Mimari",
  planned: "Planlanan",
};

export default function StatusBadge({ status, className = "" }: Props) {
  const parsed = parseStatus(status);
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${styles[parsed]} ${className}`}
    >
      {labels[parsed]}
    </span>
  );
}
```

- [ ] **Step 2: `components/layout/Breadcrumb.tsx` oluştur**

```typescript
import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-faint">/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="transition-colors hover:text-accent">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-ink">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

- [ ] **Step 3: `Navbar.tsx` güncelle** — yeni linkler

`links` dizisini şununla değiştir:

```typescript
const links = [
  { href: "/cozumler", label: t.nav.solutions ?? "Çözümler" },
  { href: "/projeler", label: t.nav.cases },
  { href: "/surec", label: t.nav.process },
  { href: "/studyo", label: t.nav.studio ?? "Stüdyo" },
];
```

- [ ] **Step 4: `data/locales/tr.ts` — nav alanları güncelle**

```typescript
nav: {
  solutions: "Çözümler",
  studio: "Stüdyo",
  cases: "Projeler",
  process: "Süreç",
  contactBtn: "Projemi Konuşalım",
},
```

`en.ts` ve `de.ts` için de karşılıkları ekle.

- [ ] **Step 5: `Footer.tsx` güncelle** — yeni linkler

`footerLinks` import ederek servicesCol ve studioCol linklerini dinamik hale getir. Footer'a `/gizlilik` ve `/kullanim-kosullari` ekle.

- [ ] **Step 6: `Contact.tsx` düzelt** — `"#"` placeholder kontrolü

```typescript
// linkedin satırını değiştir:
{contact.linkedin && contact.linkedin !== "#" && (
  // linkedin JSX...
)}
// github satırını değiştir:
{contact.github && contact.github !== "#" && (
  // github JSX...
)}
```

- [ ] **Step 7: `app/hizmetler/page.tsx` → redirect**

```typescript
import { redirect } from "next/navigation";

export default function HizmetlerRedirect() {
  redirect("/cozumler");
}
```

- [ ] **Step 8: `app/sitemap.ts` oluştur**

```typescript
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://personal-brand-site-azure.vercel.app";
  const routes = [
    "",
    "/cozumler",
    "/cozumler/is-takip-sistemleri",
    "/cozumler/stok-cari-tahsilat",
    "/cozumler/operasyon-otomasyonlari",
    "/cozumler/saas-urun-altyapisi",
    "/projeler",
    "/projeler/stockapp",
    "/projeler/hezer-auto-service",
    "/projeler/carpass",
    "/projeler/saas-operasyon-altyapisi",
    "/surec",
    "/studyo",
    "/iletisim",
    "/gizlilik",
    "/kullanim-kosullari",
  ];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
```

- [ ] **Step 9: `app/robots.ts` oluştur**

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://personal-brand-site-azure.vercel.app/sitemap.xml",
  };
}
```

- [ ] **Step 10: Build kontrol**

```bash
cd "/Users/katre/Desktop/yapay zeka/01_Projeler/personal-brand-site" && npm run build
```

Beklenen: ✅ 0 error, yeni `/hizmetler` route redirect olarak görünür

- [ ] **Step 11: Commit**

```bash
git add components/Navbar.tsx components/Footer.tsx components/Contact.tsx components/ui/StatusBadge.tsx components/layout/Breadcrumb.tsx app/hizmetler/page.tsx app/sitemap.ts app/robots.ts data/navigation.ts data/locales/
git commit -m "feat: layout foundation — navbar, footer, breadcrumb, sitemap, robots, contact fix"
```

---

## Task 3: Ana Sayfa Yeniden Yapısı

**Files:**
- Modify: `app/page.tsx` — yeni bölüm sırası
- Modify: `components/Hero.tsx` — yeni mesaj + ikincil CTA + micro güven
- Create: `components/home/FounderTrust.tsx`
- Create: `components/home/FAQPreview.tsx`
- Create: `components/home/FinalCTA.tsx`
- Modify: `components/CtaStrip.tsx` — bağlama göre prop desteği

**Interfaces:**
- Consumes: `getHomepageFAQs()` from `data/faqs.ts`
- Produces: Ana sayfa → 10 bölüm sırası

- [ ] **Step 1: `components/Hero.tsx` güncelle**

Mevcut hero mesajını koru, şunları değiştir:

```typescript
// primaryBtn href: /iletisim → değişmez
// secondaryBtn href: /hizmetler → /projeler
// İkincil CTA linki /projeler olsun
// Micro güven metni ekle (TrustStrip'in üstüne):
```

Hero alt kısmında butonların altına mikro güven metni ekle:

```tsx
<motion.p
  className="mt-6 text-xs text-faint"
  {...enter(0.6)}
>
  İşletmeye özel sistemler · Mobil uyumlu paneller · Ölçülebilir süreçler · Geliştirilebilir altyapı
</motion.p>
```

- [ ] **Step 2: `components/home/FounderTrust.tsx` oluştur**

```tsx
"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { studio } from "@/data/studio";

export default function FounderTrust() {
  return (
    <AnimatedSection>
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="card-surface rounded-2xl p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-[auto_1fr] items-start">
            {/* Monogram */}
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-3xl font-bold text-accent display shrink-0">
              MA
            </div>

            <div>
              <p className="mono-label mb-2">Solvaria&apos;nın Arkasında Kim Var?</p>
              <h2 className="display text-2xl font-bold text-ink md:text-3xl mb-4">
                {studio.founder.name} — {studio.founder.role}
              </h2>
              <p className="text-muted leading-relaxed mb-6 max-w-2xl">
                {studio.brand.description}
              </p>
              <ul className="space-y-2">
                {studio.founder.focus.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm italic text-faint">&ldquo;{studio.founder.note}&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
```

- [ ] **Step 3: `components/home/FAQPreview.tsx` oluştur**

```tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { getHomepageFAQs } from "@/data/faqs";
import Link from "next/link";

export default function FAQPreview() {
  const items = getHomepageFAQs();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <AnimatedSection>
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
        <p className="mono-label mb-3 text-center">Sık Sorulan Sorular</p>
        <h2 className="display text-center text-3xl font-bold text-ink mb-10">
          Merak ettikleriniz
        </h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="card-surface rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-medium text-ink">{item.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="border-t border-line px-5 pb-5 pt-4 text-sm leading-relaxed text-muted">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Daha fazla soru için{" "}
          <Link href="/iletisim" className="text-accent hover:underline">
            iletişime geçin
          </Link>
        </p>
      </div>
    </AnimatedSection>
  );
}
```

- [ ] **Step 4: `components/home/FinalCTA.tsx` oluştur**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Mail } from "lucide-react";
import { contact } from "@/data/contact";

export default function FinalCTA() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-[140px]"
        style={{ background: "var(--accent)" }}
      />
      <motion.div
        className="mx-auto max-w-3xl px-5 text-center"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mono-label mb-4">Hazır mısınız?</p>
        <h2 className="display text-balance text-4xl font-bold text-ink md:text-5xl">
          Dağınık operasyonunuzu birlikte{" "}
          <span className="text-accent">yönetilebilir hale getirelim.</span>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted max-w-xl mx-auto">
          İhtiyacınızı kısa bir ön görüşmede değerlendirelim; hangi sistemin gerçekten
          gerekli olduğunu birlikte netleştirelim.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/iletisim"
            className="btn-shine glow-accent rounded-lg bg-accent px-8 py-3.5 font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            Projemi Anlat
          </Link>
          <a
            href={`mailto:${contact.email}?subject=${encodeURIComponent("Proje talebi")}`}
            className="inline-flex items-center gap-2 rounded-lg border border-line px-8 py-3.5 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
          >
            <Mail className="h-4 w-4" />
            E-posta Gönder
          </a>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 5: `app/page.tsx` güncelle** — yeni bölüm sırası

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ProblemsSolutions from "@/components/ProblemsSolutions";
import SystemNetwork from "@/components/SystemNetwork";
import Projects from "@/components/Projects";
import CtaStrip from "@/components/CtaStrip";
import FounderTrust from "@/components/home/FounderTrust";
import FAQPreview from "@/components/home/FAQPreview";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />
      <Hero />
      <TrustStrip />
      <ProblemsSolutions />
      <SystemNetwork />
      <Projects />
      <FounderTrust />
      <FAQPreview />
      <FinalCTA />
    </main>
  );
}
```

- [ ] **Step 6: Build kontrol**

```bash
cd "/Users/katre/Desktop/yapay zeka/01_Projeler/personal-brand-site" && npm run build
```

Beklenen: ✅ Compile successful

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx components/Hero.tsx components/home/
git commit -m "feat: homepage redesign — founder trust, faq preview, final cta, new section order"
```

---

## Task 4: Çözümler Sayfaları

**Files:**
- Create: `app/cozumler/page.tsx`
- Create: `app/cozumler/is-takip-sistemleri/page.tsx`
- Create: `app/cozumler/stok-cari-tahsilat/page.tsx`
- Create: `app/cozumler/operasyon-otomasyonlari/page.tsx`
- Create: `app/cozumler/saas-urun-altyapisi/page.tsx`
- Create: `components/solutions/SolutionCard.tsx`
- Create: `components/solutions/SolutionDetailHero.tsx`
- Create: `components/solutions/ProblemSelector.tsx`

**Interfaces:**
- Consumes: `solutions`, `getSolutionBySlug()` from `data/solutions.ts`
- Produces: 5 yeni statik route

- [ ] **Step 1: `components/solutions/SolutionCard.tsx` oluştur**

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Solution } from "@/data/solutions";

export default function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <article className="card-surface group flex flex-col rounded-2xl p-6 transition-all hover:border-accent/40 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.15)]">
      <h3 className="display text-xl font-bold text-ink mb-2">{solution.title}</h3>
      <p className="text-sm text-muted mb-4 leading-relaxed">{solution.tagline}</p>
      <p className="text-sm text-muted leading-relaxed mb-6 flex-grow">{solution.problemStatement}</p>
      <ul className="mb-6 space-y-1.5">
        {solution.outcomes.slice(0, 2).map((o) => (
          <li key={o} className="flex items-start gap-2 text-xs text-muted">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {o}
          </li>
        ))}
      </ul>
      <Link
        href={`/cozumler/${solution.slug}`}
        className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-accent opacity-80 transition-all group-hover:opacity-100 group-hover:gap-3"
      >
        Detayları İncele <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
```

- [ ] **Step 2: `components/solutions/ProblemSelector.tsx` oluştur**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import type { Solution } from "@/data/solutions";

const problems = [
  { label: "Stokları takip edemiyorum", slug: "stok-cari-tahsilat" },
  { label: "Tahsilatlar karışıyor", slug: "stok-cari-tahsilat" },
  { label: "İş emirleri dağınık", slug: "is-takip-sistemleri" },
  { label: "Rapor hazırlamak uzun sürüyor", slug: "operasyon-otomasyonlari" },
  { label: "Süreçler personele bağlı", slug: "is-takip-sistemleri" },
  { label: "SaaS ürünü geliştirmek istiyorum", slug: "saas-urun-altyapisi" },
];

export default function ProblemSelector({ solutions }: { solutions: Solution[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  const highlighted = selected
    ? solutions.filter((s) => s.slug === problems.find((p) => p.label === selected)?.slug)
    : [];

  return (
    <div>
      <p className="mono-label mb-4">Hangi sorun sizin için öncelikli?</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {problems.map((p) => (
          <button
            key={p.label}
            onClick={() => setSelected(selected === p.label ? null : p.label)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
              selected === p.label
                ? "border-accent bg-accent/10 text-accent"
                : "border-line text-muted hover:border-accent/40 hover:text-ink"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      {highlighted.length > 0 && (
        <div className="card-surface rounded-xl p-5 border-accent/30">
          <p className="text-sm text-muted mb-2">Önerilen çözüm:</p>
          <p className="font-semibold text-ink mb-1">{highlighted[0].title}</p>
          <p className="text-sm text-muted mb-4">{highlighted[0].tagline}</p>
          <Link
            href={`/cozumler/${highlighted[0].slug}`}
            className="text-sm font-semibold text-accent hover:underline"
          >
            Detayları İncele →
          </Link>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: `app/cozumler/page.tsx` oluştur**

```tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CtaStrip from "@/components/CtaStrip";
import { solutions } from "@/data/solutions";
import SolutionCard from "@/components/solutions/SolutionCard";
import ProblemSelector from "@/components/solutions/ProblemSelector";
import AnimatedSection from "@/components/AnimatedSection";
import Reveal3D from "@/components/Reveal3D";
import FloatingCard from "@/components/FloatingCard";

export const metadata: Metadata = {
  title: "Çözümler — Solvaria",
  description: "İşletmeye özel dijital sistemler: iş takibi, stok ve cari hesap, operasyon otomasyonları, SaaS altyapısı.",
};

export default function CozumlerPage() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-5">
          <p className="mono-label mb-4">Çözümler</p>
          <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl">
            İşletmenizin ihtiyacına göre{" "}
            <span className="text-accent">özel sistem çözümleri</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Hazır yazılımlara uyum sağlamanızı istemiyoruz. İşletmenizin gerçek çalışma
            biçimine uyum sağlayan sistemler tasarlıyoruz.
          </p>
        </div>
      </section>

      {/* Problem Selector */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 pb-16">
          <ProblemSelector solutions={solutions} />
        </div>
      </AnimatedSection>

      {/* Solution Cards */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 pb-20 md:pb-28">
          <h2 className="display text-2xl font-bold text-ink mb-8 md:text-3xl">
            Tüm Çözüm Kategorileri
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {solutions.map((solution, i) => (
              <Reveal3D key={solution.slug} delay={i * 0.1} className="h-full">
                <FloatingCard className="h-full">
                  <SolutionCard solution={solution} />
                </FloatingCard>
              </Reveal3D>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <CtaStrip />
    </main>
  );
}
```

- [ ] **Step 4: Çözüm detay sayfaları için ortak şablon oluştur ve 4 sayfayı yaz**

Her sayfa için pattern (örnek: `is-takip-sistemleri`):

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import CtaStrip from "@/components/CtaStrip";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { getSolutionBySlug } from "@/data/solutions";
import { projects } from "@/data/projects";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

// Her sayfa için kendi generateMetadata'sı olur
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "İş Takip Sistemleri — Solvaria",
    description: "Sipariş, görev ve müşteri süreçlerini tek panelden yönetin. İşlerin kişilere değil sisteme bağlı olmasını sağlayın.",
  };
}

export default function IsTakipSistemleriPage() {
  const solution = getSolutionBySlug("is-takip-sistemleri");
  if (!solution) notFound();

  const relatedProject = solution.relatedProjectSlug
    ? projects.find((p) => p.slug === solution.relatedProjectSlug)
    : null;

  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-5">
          <Breadcrumb crumbs={[{ label: "Çözümler", href: "/cozumler" }, { label: solution.title }]} />
          <p className="mono-label mb-4">Çözüm</p>
          <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl">
            {solution.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {solution.tagline}
          </p>
          <div className="mt-8">
            <Link href="/iletisim" className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5">
              {solution.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Tanımı */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-4">Tanıdık mı geliyor?</h2>
          <p className="text-muted text-lg leading-relaxed mb-8 max-w-2xl">{solution.problemStatement}</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
            {solution.commonProblems.map((p) => (
              <div key={p} className="flex items-start gap-3 rounded-xl border border-line bg-bg-raised/30 p-4">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-400/70" />
                <span className="text-sm text-muted">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Kimler İçin */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-6">Kimler için uygun?</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {solution.forWhom.map((w) => (
              <div key={w} className="flex items-center gap-3 text-sm text-muted">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                {w}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Sistem Modülleri */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-8">Sistem bileşenleri</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solution.modules.map((mod) => (
              <div key={mod.title} className="card-surface rounded-xl p-5">
                <h3 className="font-semibold text-ink mb-3 text-sm">{mod.title}</h3>
                <ul className="space-y-1.5">
                  {mod.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-muted">
                      <span className="h-1 w-1 rounded-full bg-accent/70 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Çıktılar */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-6">
            İşletmenize sağlayacağı değer
          </h2>
          <div className="space-y-4">
            {solution.outcomes.map((o) => (
              <div key={o} className="flex items-start gap-4 rounded-xl border border-line bg-accent/5 p-5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                <span className="font-medium text-ink">{o}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* İlgili Proje */}
      {relatedProject && (
        <AnimatedSection className="band-petrol border-y border-line">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <p className="mono-label mb-3">Örnek Uygulama</p>
            <h2 className="display text-2xl font-bold text-ink mb-2">{relatedProject.name}</h2>
            <p className="text-muted mb-6">{relatedProject.tagline}</p>
            <Link
              href={`/projeler/${relatedProject.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
            >
              Vaka Çalışmasını İncele <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </AnimatedSection>
      )}

      <CtaStrip />
    </main>
  );
}
```

Yukarıdaki pattern ile diğer 3 sayfa da (`stok-cari-tahsilat`, `operasyon-otomasyonlari`, `saas-urun-altyapisi`) aynı yapıda oluşturulur; yalnızca `getSolutionBySlug` argümanı ve metadata değişir.

- [ ] **Step 5: Build kontrol**

```bash
cd "/Users/katre/Desktop/yapay zeka/01_Projeler/personal-brand-site" && npm run build
```

Beklenen: ✅ 5 yeni `/cozumler` route görünür

- [ ] **Step 6: Commit**

```bash
git add app/cozumler/ components/solutions/
git commit -m "feat: solutions pages — index + 4 solution detail pages with problem selector"
```

---

## Task 5: Projeler Index ve Vaka Çalışmaları

**Files:**
- Modify: `app/projeler/page.tsx` — filtreli index
- Create: `app/projeler/stockapp/page.tsx`
- Create: `app/projeler/hezer-auto-service/page.tsx`
- Create: `app/projeler/carpass/page.tsx`
- Create: `app/projeler/saas-operasyon-altyapisi/page.tsx`
- Create: `components/projects/CaseStudyHero.tsx`
- Create: `components/projects/CaseStudyNextStep.tsx`
- Modify: `components/Projects.tsx` — CTA "Vaka Çalışmasını İncele" + filtre

**Interfaces:**
- Consumes: `projects` array (slug eklendikten sonra)
- Produces: 5 yeni route

- [ ] **Step 1: `components/projects/CaseStudyHero.tsx` oluştur**

```tsx
import Breadcrumb from "@/components/layout/Breadcrumb";
import StatusBadge from "@/components/ui/StatusBadge";

type Props = {
  name: string;
  tagline: string;
  status: string;
  problem: string;
  tech: string[];
};

export default function CaseStudyHero({ name, tagline, status, problem, tech }: Props) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="bg-grid absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-5">
        <Breadcrumb crumbs={[{ label: "Projeler", href: "/projeler" }, { label: name }]} />
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <p className="mono-label">Vaka Çalışması</p>
          <StatusBadge status={status} />
        </div>
        <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl mb-4">
          {name}
        </h1>
        <p className="text-lg text-muted mb-6 max-w-2xl">{tagline}</p>
        <div className="mb-8">
          <p className="text-sm text-faint mb-2 font-mono uppercase tracking-wider">Teknoloji</p>
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span key={t} className="rounded border border-line bg-bg-raised/30 px-2.5 py-1 text-xs font-medium text-muted">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="card-surface rounded-xl p-5 max-w-2xl border-l-2 border-l-accent">
          <p className="text-sm font-mono uppercase tracking-wider text-faint mb-2">İş Problemi</p>
          <p className="text-muted leading-relaxed">{problem}</p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `components/projects/CaseStudyNextStep.tsx` oluştur**

```tsx
import Link from "next/link";
import { contact } from "@/data/contact";

export default function CaseStudyNextStep() {
  return (
    <section className="border-t border-line py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <p className="mono-label mb-3">Benzer Bir Sistem?</p>
        <h2 className="display text-2xl font-bold text-ink md:text-3xl mb-4">
          İşletmeniz için de benzer bir sistem konuşalım.
        </h2>
        <p className="text-muted mb-8 leading-relaxed">
          Kısa bir ön görüşmede ihtiyacınızı dinleyip ne tür bir sistemin gerçekten işe
          yarayacağını birlikte değerlendiririz.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/iletisim"
            className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            Projeyi Konuşalım
          </Link>
          <Link
            href="/projeler"
            className="rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
          >
            Tüm Projeler
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: `app/projeler/stockapp/page.tsx` oluştur**

```tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CaseStudyHero from "@/components/projects/CaseStudyHero";
import CaseStudyNextStep from "@/components/projects/CaseStudyNextStep";
import AnimatedSection from "@/components/AnimatedSection";
import StockAppPreview from "@/components/previews/StockAppPreview";
import { projects } from "@/data/projects";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "StockApp — Stok, Cari Hesap ve Tahsilat Sistemi | Solvaria",
  description: "Stok hareketleri, müşteri bazlı cari hesap, tahsilat takibi ve PDF hesap ekstresi sistemi. Solvaria tarafından geliştirildi.",
};

export default function StockAppPage() {
  const project = projects.find((p) => p.slug === "stockapp")!;

  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />
      <CaseStudyHero
        name={project.name}
        tagline={project.tagline}
        status={project.status}
        problem={project.problem}
        tech={project.tech}
      />

      {/* Çözüm */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-4">Çözüm Yaklaşımı</h2>
          <p className="text-muted leading-relaxed max-w-2xl">{project.solution}</p>
        </div>
      </AnimatedSection>

      {/* Animasyon Preview */}
      <AnimatedSection>
        <div className="mx-auto max-w-4xl px-5 py-16">
          <p className="mono-label mb-4 text-center">Sistem Önizlemesi</p>
          <div className="h-[360px] w-full">
            <StockAppPreview reduce={false} />
          </div>
          <p className="mt-4 text-center text-xs text-faint">Demo arayüzü — dekoratif veriler kullanılmıştır</p>
        </div>
      </AnimatedSection>

      {/* Özellikler */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-8">Temel Özellikler</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.features.map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-xl border border-line bg-bg-raised/30 p-5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                <span className="text-muted">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Fayda */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-4">Sağlanan Fayda</h2>
          <p className="text-muted leading-relaxed max-w-2xl text-lg">{project.benefit}</p>
        </div>
      </AnimatedSection>

      <CaseStudyNextStep />
    </main>
  );
}
```

Aynı pattern ile diğer 3 vaka sayfası da (`hezer-auto-service`, `carpass`, `saas-operasyon-altyapisi`) oluşturulur; her sayfada slug değişir, `carpass` ve `saas` sayfalarında durum etiketleri ve "planlanan/konsept" uyarısı eklenir.

- [ ] **Step 4: `app/projeler/page.tsx` güncelle** — "Vaka Çalışmasını İncele" CTA + her karta `/projeler/{slug}` linki

- [ ] **Step 5: Build kontrol**

```bash
cd "/Users/katre/Desktop/yapay zeka/01_Projeler/personal-brand-site" && npm run build
```

Beklenen: ✅ 5 yeni `/projeler` route görünür

- [ ] **Step 6: Commit**

```bash
git add app/projeler/ components/projects/
git commit -m "feat: case study pages — stockapp, hezer, carpass, saas + updated projects index"
```

---

## Task 6: Stüdyo, Süreç ve İletişim Sayfaları

**Files:**
- Create: `app/studyo/page.tsx`
- Modify: `app/surec/page.tsx` — detaylı süreç adımları
- Modify: `app/iletisim/page.tsx` — form + enhanced contact
- Create: `app/gizlilik/page.tsx`
- Create: `app/kullanim-kosullari/page.tsx`
- Create: `components/contact/ContactForm.tsx`
- Create: `components/studio/FounderCard.tsx`

**Interfaces:**
- Consumes: `studio` from `data/studio.ts`, `processSteps`, `pricingNote` from `data/process.ts`

- [ ] **Step 1: `app/studyo/page.tsx` oluştur**

```tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CtaStrip from "@/components/CtaStrip";
import AnimatedSection from "@/components/AnimatedSection";
import { studio } from "@/data/studio";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stüdyo Hakkında — Solvaria",
  description: "Solvaria nedir, kim tarafından kuruldu ve hangi ilkelerle çalışır.",
};

export default function StudyoPage() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-5">
          <p className="mono-label mb-4">Stüdyo</p>
          <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl">
            {studio.brand.name} — {studio.brand.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {studio.brand.description}
          </p>
        </div>
      </section>

      {/* Neden kuruldu */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-4">Neden kuruldu?</h2>
          <p className="text-muted leading-relaxed max-w-2xl text-lg">{studio.brand.whyBuilt}</p>
        </div>
      </AnimatedSection>

      {/* Kurucu */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-8">Kurucu</h2>
          <div className="card-surface rounded-2xl p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-[auto_1fr]">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-3xl font-bold text-accent display shrink-0">
                MA
              </div>
              <div>
                <h3 className="display text-xl font-bold text-ink">{studio.founder.name}</h3>
                <p className="text-muted text-sm mb-4">{studio.founder.role} · {studio.brand.founded}</p>
                <ul className="space-y-2 mb-6">
                  {studio.founder.focus.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-muted">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-sm italic text-faint">&ldquo;{studio.founder.note}&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Çalışma İlkeleri */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-8">Çalışma İlkeleri</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studio.principles.map((p) => (
              <div key={p.title} className="card-surface rounded-xl p-6">
                <h3 className="font-semibold text-ink mb-2">{p.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Teknoloji ve Güvenlik */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="display text-xl font-bold text-ink mb-3">Teknoloji Yaklaşımı</h2>
              <p className="text-muted leading-relaxed">{studio.techApproach}</p>
            </div>
            <div>
              <h2 className="display text-xl font-bold text-ink mb-3">Güvenlik</h2>
              <p className="text-muted leading-relaxed">{studio.securityNote}</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection>
        <div className="mx-auto max-w-3xl px-5 py-12 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/projeler" className="rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent">
              Projeleri İncele
            </Link>
            <Link href="/iletisim" className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5">
              İletişime Geç
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <CtaStrip />
    </main>
  );
}
```

- [ ] **Step 2: `app/surec/page.tsx` güncelle** — detaylı süreç adımları

Mevcut `Process` ve `About` bileşenlerini koru, üstüne `processSteps` verisinden gelen 8 adımlı bir süreç tablosu ekle. `pricingNote` ile fiyat açıklaması ekle.

- [ ] **Step 3: `components/contact/ContactForm.tsx` oluştur** — mailto fallback

```tsx
"use client";

import { useState } from "react";
import { contact } from "@/data/contact";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  sector: string;
  needType: string;
  currentMethod: string;
  problem: string;
  expected: string;
  timeline: string;
  note: string;
};

const NEED_TYPES = [
  "İş takip sistemi",
  "Stok ve cari hesap",
  "Servis / operasyon paneli",
  "Otomasyon",
  "SaaS ürünü",
  "Web uygulaması",
  "Diğer",
];

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "", company: "", email: "", phone: "",
    sector: "", needType: "", currentMethod: "",
    problem: "", expected: "", timeline: "", note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Proje talebi — ${form.company || form.name}`);
    const body = encodeURIComponent(
      `Ad Soyad: ${form.name}\nFirma: ${form.company}\nE-posta: ${form.email}\nTelefon: ${form.phone}\nSektör: ${form.sector}\nİhtiyaç: ${form.needType}\nMevcut yöntem: ${form.currentMethod}\nProblem: ${form.problem}\nBeklenti: ${form.expected}\nZamanlama: ${form.timeline}\nNot: ${form.note}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card-surface rounded-2xl p-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
          <span className="text-2xl text-accent">✓</span>
        </div>
        <h3 className="display text-xl font-bold text-ink mb-2">E-posta istemciniz açıldı</h3>
        <p className="text-muted text-sm">Formu göndermek için e-posta uygulamanızdan devam edin.</p>
      </div>
    );
  }

  const inputClass = "w-full rounded-lg border border-line bg-bg-raised/30 px-4 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors";
  const labelClass = "block text-xs font-medium text-muted mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">Ad Soyad *</label>
          <input id="name" required value={form.name} onChange={set("name")} className={inputClass} placeholder="Adınız Soyadınız" />
        </div>
        <div>
          <label className={labelClass} htmlFor="company">Firma Adı</label>
          <input id="company" value={form.company} onChange={set("company")} className={inputClass} placeholder="Firma Adı" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="email">E-posta *</label>
          <input id="email" type="email" required value={form.email} onChange={set("email")} className={inputClass} placeholder="ornek@firma.com" />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">Telefon</label>
          <input id="phone" value={form.phone} onChange={set("phone")} className={inputClass} placeholder="İsteğe bağlı" />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="needType">İhtiyaç Türü *</label>
        <select id="needType" required value={form.needType} onChange={set("needType")} className={inputClass}>
          <option value="">Seçin...</option>
          {NEED_TYPES.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor="currentMethod">Şu an nasıl takip ediyorsunuz?</label>
        <input id="currentMethod" value={form.currentMethod} onChange={set("currentMethod")} className={inputClass} placeholder="Excel, defter, WhatsApp..." />
      </div>
      <div>
        <label className={labelClass} htmlFor="problem">Yaşadığınız temel problem *</label>
        <textarea id="problem" required value={form.problem} onChange={set("problem")} rows={3} className={inputClass} placeholder="Kısaca anlatın..." />
      </div>
      <div>
        <label className={labelClass} htmlFor="expected">Beklentiniz nedir?</label>
        <textarea id="expected" value={form.expected} onChange={set("expected")} rows={2} className={inputClass} placeholder="Hangi sorunun çözülmesini istiyorsunuz?" />
      </div>
      <div>
        <label className={labelClass} htmlFor="timeline">Tahmini zamanlama</label>
        <input id="timeline" value={form.timeline} onChange={set("timeline")} className={inputClass} placeholder="1-3 ay, acil, belirsiz..." />
      </div>
      <p className="text-xs text-faint">
        Formu göndererek{" "}
        <a href="/gizlilik" className="underline hover:text-muted">Gizlilik Politikası</a>
        &apos;nı okuduğunuzu ve onayladığınızı kabul etmiş olursunuz.
      </p>
      <button
        type="submit"
        className="btn-shine glow-accent w-full rounded-lg bg-accent py-3 font-semibold text-black transition-transform hover:-translate-y-0.5"
      >
        Talebi Gönder
      </button>
    </form>
  );
}
```

- [ ] **Step 4: `app/iletisim/page.tsx` güncelle** — form + iletişim bilgileri yan yana

- [ ] **Step 5: `app/gizlilik/page.tsx` oluştur**

```tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Gizlilik Politikası — Solvaria",
  description: "Solvaria gizlilik politikası ve kişisel veri işleme bilgilendirmesi.",
};

export default function GizlilikPage() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />
      <div className="mx-auto max-w-3xl px-5 pt-32 pb-20 md:pt-40">
        <h1 className="display text-3xl font-bold text-ink mb-8">Gizlilik Politikası</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted leading-relaxed">
          <p>Son güncelleme: {new Date().getFullYear()}</p>
          <h2 className="text-ink text-xl font-semibold">Toplanan Veriler</h2>
          <p>İletişim formunu doldurduğunuzda ad, e-posta ve iletişim bilgileriniz yalnızca proje görüşmesi amacıyla kullanılmaktadır. Üçüncü taraflarla paylaşılmaz.</p>
          <h2 className="text-ink text-xl font-semibold">Çerezler</h2>
          <p>Bu site teknik işlevler için zorunlu minimum çerez kullanmaktadır. Analitik veya reklam çerezi kullanılmamaktadır.</p>
          <h2 className="text-ink text-xl font-semibold">Veri Güvenliği</h2>
          <p>Verileriniz güvenli altyapıda saklanır ve talep üzerine silinebilir. İletişim için: <a href="mailto:mertalbaan@gmail.com" className="text-accent hover:underline">mertalbaan@gmail.com</a></p>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 6: `app/kullanim-kosullari/page.tsx` oluştur** — aynı pattern ile kullanım koşulları

- [ ] **Step 7: Build kontrol**

```bash
cd "/Users/katre/Desktop/yapay zeka/01_Projeler/personal-brand-site" && npm run build
```

Beklenen: ✅ Tüm yeni route'lar compile oluyor

- [ ] **Step 8: Commit**

```bash
git add app/studyo/ app/surec/ app/iletisim/ app/gizlilik/ app/kullanim-kosullari/ components/contact/ components/studio/
git commit -m "feat: studio, process, contact form, privacy, terms pages"
```

---

## Task 7: Polish, Motion ve Responsive

**Files:**
- Modify: `app/globals.css` — `@media (prefers-reduced-motion)` genişletilmiş kontrol
- Modify: `components/Projects.tsx` — vaka sayfası CTA linkleri
- Review: Tüm yeni sayfalarda `prefers-reduced-motion` kontrolü
- Review: Mobil 360px–768px breakpoint'lerde hero başlık boyutu

- [ ] **Step 1: Tüm yeni bileşenlerde `useReducedMotion` kullanımını kontrol et**

Animasyon kullanan her yeni bileşende:
```tsx
const reduce = useReducedMotion();
// ...
initial={reduce ? false : { opacity: 0, y: 24 }}
```

- [ ] **Step 2: Mobil hero başlık kontrolü**

`Hero.tsx` ve tüm yeni sayfa hero'larında başlık `text-4xl md:text-5xl` hiyerarşisi doğrulanır. 360px ekranda kesilme yoktur.

- [ ] **Step 3: Footer link doğruluğu**

Footer'da tüm linklerin gerçek route'lara işaret ettiği kontrol edilir.

- [ ] **Step 4: Tüm sayfa title/description metadata kontrolü**

Her yeni route'un `metadata` export'u olduğu doğrulanır.

- [ ] **Step 5: Final build + lint**

```bash
cd "/Users/katre/Desktop/yapay zeka/01_Projeler/personal-brand-site" && npm run build && npm run lint
```

Beklenen: ✅ 0 error, 0 warning

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "polish: reduced-motion, responsive, metadata, footer links"
```

---

## Task 8: QA ve Final Kontrol

- [ ] `npm run build` — temiz ✅
- [ ] TypeScript — 0 hata ✅
- [ ] Lint — 0 hata ✅
- [ ] Tüm route'ların sitemap'te olduğunu doğrula
- [ ] Footer linklerinin tamamı çalışıyor
- [ ] Contact sayfasında linkedin/github "#" gösterilmiyor
- [ ] Proje durumları doğru: StockApp=Canlı, Hezer=Canlı, CARPASS=Geliştirme, SaaS=Konsept
- [ ] "sayım hatalarını sıfırlamak" ifadesi yok
- [ ] Sahte metrik, sahte yorum, sahte müşteri sayısı yok
- [ ] Breadcrumb tüm alt sayfalarda var
- [ ] Mobil menü çalışıyor (Navbar)
- [ ] Form submit → e-posta istemcisi açılıyor
- [ ] `/hizmetler` → `/cozumler` redirect çalışıyor
- [ ] `robots.txt` ve `sitemap.xml` erişilebilir

---

## Onay Gerektiren Konular

| Konu | Durum |
|---|---|
| WhatsApp numarası | ✅ 905379531547 mevcut |
| E-posta | ✅ mertalbaan@gmail.com mevcut |
| LinkedIn URL | ❌ Gerçek URL yok (`"#"`) |
| GitHub URL | ❌ Gerçek URL yok (`"#"`) |
| Canlı proje linkleri | ❌ StockApp ve Hezer canlı URL'si bilinmiyor |
| Kurucu fotoğrafı | ❌ Yok — monogram (MA) kullanılacak |
| Contact form backend | ⚠️ mailto fallback — gerçek sunucu yok |
| Domain/canonical | ⚠️ Şu an `personal-brand-site-azure.vercel.app` |
| Deploy onayı | ❌ Tamamlanınca ayrıca sorulacak |
| Analytics | ❌ Tercih belirtilmedi |
