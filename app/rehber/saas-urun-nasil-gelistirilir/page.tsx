import { buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { siteConfig } from "@/data/config";

export const metadata = buildPageMetadata({
  title: "SaaS Ürün Nasıl Geliştirilir? Başlangıçtan Lansmana — Albanexa",
  description:
    "Sektörel problemi çözen bir yazılımı abonelik modeline dönüştürme rehberi. Multi-tenant mimari, fiyatlandırma modeli ve teknik altyapı kararları.",
  path: "/rehber/saas-urun-nasil-gelistirilir",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${siteConfig.siteUrl}/rehber/saas-urun-nasil-gelistirilir#article`,
  "headline": "SaaS Ürün Nasıl Geliştirilir? Başlangıçtan Lansmana",
  "description":
    "Sektörel problemi çözen bir yazılımı abonelik modeline dönüştürme rehberi. Multi-tenant mimari, fiyatlandırma modeli ve teknik altyapı kararları.",
  "datePublished": "2026-07-31",
  "dateModified": "2026-07-31",
  "author": { "@id": `${siteConfig.siteUrl}/#person` },
  "publisher": { "@id": `${siteConfig.siteUrl}/#organization` },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${siteConfig.siteUrl}/rehber/saas-urun-nasil-gelistirilir`,
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Rehber", "item": `${siteConfig.siteUrl}/rehber` },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "SaaS Ürün Nasıl Geliştirilir?",
        "item": `${siteConfig.siteUrl}/rehber/saas-urun-nasil-gelistirilir`,
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.siteUrl}/rehber/saas-urun-nasil-gelistirilir#faq`,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "SaaS nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "SaaS (Software as a Service — Hizmet Olarak Yazılım), kullanıcıların internet üzerinden eriştiği ve genellikle aylık veya yıllık abonelikle kullandığı bulut tabanlı yazılım modelidir. Kullanıcı kurulum yapmaz, yazılım sahibi altyapıyı yönetir ve tüm müşteriler aynı platforma erişir.",
      },
    },
    {
      "@type": "Question",
      "name": "Multi-tenant mimari nedir, neden önemlidir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Multi-tenant mimari, tek bir yazılım altyapısının birden fazla müşteriye (tenant) aynı anda hizmet verdiği yapıdır. Her müşterinin verisi birbirinden izole tutulur. Bu mimari olmadan her yeni müşteri için ayrı sunucu ve veritabanı kurmak gerekir — bu da maliyeti katlar ve yönetimi imkânsızlaştırır.",
      },
    },
    {
      "@type": "Question",
      "name": "SaaS ürün geliştirme ne kadar sürer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "MVP (ilk satılabilir versiyon) 3–6 ay arasında tamamlanabilir. Bu süre ürünün karmaşıklığına, hedef pazara ve mevcut kaynaklara göre değişir. İlk müşterilere satış yapabilmek için mükemmel olmak gerekmez; temel problemi çözen, güvenilir çalışan bir MVP yeterlidir.",
      },
    },
    {
      "@type": "Question",
      "name": "SaaS ürün için en doğru fiyatlandırma modeli nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "En yaygın modeller: kullanıcı başına aylık ücret (per-seat), özellik bazlı katmanlar (Starter / Pro / Enterprise) ve kullanım bazlı fiyatlandırma (API çağrısı, işlem sayısı). B2B SaaS için per-seat + katmanlı paket kombinasyonu en yaygın ve öngörülebilir modeldir.",
      },
    },
  ],
};

export default function SaasUrunNasilGelistirilirPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout
        title="SaaS Ürün Nasıl Geliştirilir? Başlangıçtan Lansmana"
        description="Sektörel problemi çözen bir yazılımı abonelik modeline dönüştürme rehberi. Multi-tenant mimari, fiyatlandırma modeli ve teknik altyapı kararları."
        publishedAt="2026-07-31"
        readingTime={10}
        category="SaaS & Ürün Geliştirme"
      >
        <p>
          Birçok girişimci ve işletme sahibi sektöründeki bir problemi çözdüklerini
          fark eder — ve bu çözümü başkalarına da satabileceğini düşünür. İşte bu
          noktada "özel yazılım" "SaaS ürünü"ne dönüşür. Bu geçiş hem heyecan verici
          hem de beklenmedik teknik kararlarla dolu bir süreçtir.
        </p>

        <h2>SaaS ve özel yazılım arasındaki temel fark</h2>
        <p>
          Özel yazılım tek bir işletme için geliştirilir. SaaS ise aynı yazılımın
          yüzlerce veya binlerce farklı işletmeye aynı anda hizmet vermesi demektir.
          Bu fark, mimari kararları kökten değiştirir:
        </p>
        <table>
          <thead>
            <tr>
              <th>Özellik</th>
              <th>Özel Yazılım</th>
              <th>SaaS Ürün</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Müşteri sayısı</td>
              <td>1 işletme</td>
              <td>Sınırsız (hedef)</td>
            </tr>
            <tr>
              <td>Veri izolasyonu</td>
              <td>Tek veritabanı</td>
              <td>Tenant bazlı izolasyon</td>
            </tr>
            <tr>
              <td>Onboarding</td>
              <td>Manuel kurulum</td>
              <td>Self-service kayıt</td>
            </tr>
            <tr>
              <td>Ödeme</td>
              <td>Proje bedeli</td>
              <td>Abonelik (aylık/yıllık)</td>
            </tr>
            <tr>
              <td>Destek</td>
              <td>Birebir</td>
              <td>Ölçeklenebilir (doküman, ticket)</td>
            </tr>
            <tr>
              <td>Özelleştirme</td>
              <td>Tam</td>
              <td>Yapılandırma bazlı</td>
            </tr>
          </tbody>
        </table>

        <h2>SaaS altyapısının 5 temel bileşeni</h2>

        <h3>1. Multi-tenant mimari</h3>
        <p>
          Her müşterinin verisi diğerlerinden izole edilmeli ancak aynı altyapı
          üzerinde çalışmalıdır. Bu iki temel yaklaşımla sağlanır:
        </p>
        <ul>
          <li>
            <strong>Row-level security (RLS):</strong> Tek veritabanında her satır
            tenant ID ile işaretlenir; Supabase/PostgreSQL'de native destek mevcuttur.
          </li>
          <li>
            <strong>Schema bazlı izolasyon:</strong> Her tenant için ayrı veritabanı
            şeması — daha güçlü izolasyon, daha yüksek yönetim maliyeti.
          </li>
        </ul>
        <p>
          Çoğu B2B SaaS için RLS tabanlı yaklaşım başlangıç için yeterli ve çok
          daha yönetilebilirdir.
        </p>

        <h3>2. Abonelik ve ödeme yönetimi</h3>
        <p>
          Ödeme altyapısı sıfırdan geliştirilmez. Türkiye'deki SaaS ürünler için:
        </p>
        <ul>
          <li><strong>iyzico veya Stripe:</strong> Kart ödemesi ve abonelik yönetimi</li>
          <li><strong>Fatura/e-fatura:</strong> Logo, Parasut veya Faturx entegrasyonu</li>
          <li><strong>Deneme süresi (trial):</strong> 14 günlük ücretsiz deneme en yaygın model</li>
        </ul>

        <h3>3. Kullanıcı yönetimi ve rol sistemi</h3>
        <p>
          Her tenant kendi kullanıcılarını yönetebilmeli. Tipik yapı:
        </p>
        <ul>
          <li><strong>Tenant admin:</strong> Kullanıcı davet eder, planı yönetir</li>
          <li><strong>Kullanıcı rolleri:</strong> Her tenant içinde farklı yetki seviyeleri</li>
          <li><strong>Super admin (SaaS sahibi):</strong> Tüm tenantlara erişim, plan yönetimi</li>
        </ul>

        <h3>4. Onboarding akışı</h3>
        <p>
          SaaS büyümesinin en kritik noktasıdır. İlk 7 günde değer gösteremeyen
          kullanıcı churns (ayrılır). Etkili onboarding:
        </p>
        <ul>
          <li>Kayıt → e-posta doğrulama → ilk veri girişi rehberi</li>
          <li>Progress bar ("kurulum %60 tamamlandı")</li>
          <li>İlk 24 saatte otomatik "yardıma ihtiyacınız var mı?" e-postası</li>
          <li>Örnek veri (demo tenant) ile sistemin nasıl göründüğünü gösterme</li>
        </ul>

        <h3>5. Metrik ve analitik altyapısı</h3>
        <p>
          SaaS'ta ürün kararları veriye dayalıdır. Başlangıçta izlenmesi gereken
          temel metrikler:
        </p>
        <ul>
          <li><strong>MRR (Monthly Recurring Revenue):</strong> Aylık yinelenen gelir</li>
          <li><strong>Churn rate:</strong> Aboneliği iptal eden müşteri oranı</li>
          <li><strong>CAC (Customer Acquisition Cost):</strong> Müşteri edinme maliyeti</li>
          <li><strong>Activation rate:</strong> Kaydolan → aktif kullanan oranı</li>
          <li><strong>Trial-to-paid conversion:</strong> Deneme → ücretli geçiş oranı</li>
        </ul>

        <h2>MVP'den ürüne: Adım adım yol haritası</h2>
        <ol>
          <li>
            <strong>Problem doğrulama (1–2 ay):</strong> Hedef pazardaki 10–15 potansiyel
            müşteriyle görüşme. Problemi, mevcut çözümleri ve ödeme isteğini anlama.
          </li>
          <li>
            <strong>MVP geliştirme (2–4 ay):</strong> Temel sorunu çözen, güvenilir
            çalışan minimum sistem. Tüm özellikler değil — çekirdek değer teklifi.
          </li>
          <li>
            <strong>İlk 10 müşteri (2–3 ay):</strong> Manuel onboarding, yoğun geri
            bildirim, hızlı iterasyon. Fiyatı bu aşamada keşfetme.
          </li>
          <li>
            <strong>Ölçekleme altyapısı (devam eden):</strong> Self-service onboarding,
            ödeme otomasyonu, destek sistemi, pazarlama kanalları.
          </li>
        </ol>

        <h2>Gerçek örnek: CARPASS</h2>
        <div className="metric-card">
          <p style={{ margin: 0 }}>
            Albanexa'nın geliştirdiği <strong>CARPASS</strong>, araç geçmiş
            raporlama ve risk analizi sunan çok-kiracılı bir SaaS ürünüdür.
            Yapay zeka destekli Risk Skoru ve Trust Report ile araç alıcılarına
            ve galericilik sektörüne hizmet vermektedir. Multi-tenant Supabase
            altyapısı ve abonelik yönetimi ile sıfırdan kuruldu.
          </p>
        </div>

        <h2>Türkiye'de SaaS için teknik yığın önerimiz</h2>
        <ul>
          <li><strong>Frontend:</strong> Next.js + TypeScript — SEO, hız, ekosistem</li>
          <li><strong>Backend/DB:</strong> Supabase (PostgreSQL + Auth + RLS) — multi-tenant için ideal</li>
          <li><strong>Ödeme:</strong> iyzico (TR kartları) + Stripe (uluslararası)</li>
          <li><strong>E-posta:</strong> Resend veya SendGrid — transactional ve marketing</li>
          <li><strong>Otomasyon:</strong> n8n — müşteri yaşam döngüsü otomasyonları</li>
          <li><strong>Analitik:</strong> PostHog (ürün analitiği) + GA4 (web analitiği)</li>
          <li><strong>Hosting:</strong> Vercel (frontend) + Supabase Cloud (DB)</li>
        </ul>

        <h2>Sıkça sorulan sorular</h2>

        <div className="faq-item">
          <h3>SaaS ürünü yalnızca yazılımcı olan biri mi geliştirebilir?</h3>
          <p>
            Domain uzmanlığı (sektörü iyi bilmek) teknik bilgi kadar değerlidir.
            Teknik altyapıyı bir geliştirici ortakla veya ajansla kurabilirsiniz.
            Önemli olan problemi ve müşteriyi derinlemesine anlamaktır.
          </p>
        </div>
        <div className="faq-item">
          <h3>Ne kadar fon gerekir?</h3>
          <p>
            Türkiye'de küçük bir B2B SaaS MVP'si için 150.000–300.000 TL (teknik
            geliştirme + altyapı + ilk pazarlama) gerçekçi bir başlangıç bütçesidir.
            İlk 10 müşteriden gelen gelirle bu yatırım 6–12 ayda geri dönebilir.
          </p>
        </div>
        <div className="faq-item">
          <h3>Yurtdışına satış yapabilir miyim?</h3>
          <p>
            Evet. Stripe entegrasyonu ve İngilizce arayüz ile global pazara açılmak
            teknik olarak mümkündür. Vergi ve ödeme uyumluluğu (VAT, PSD2) ayrı
            bir değerlendirme gerektirir.
          </p>
        </div>

        <hr />

        <div className="callout">
          <p style={{ margin: 0 }}>
            <strong>SaaS fikrinizi teknik altyapıya dönüştürmek ister misiniz?</strong>
            <br />
            Albanexa, multi-tenant mimari tasarımından abonelik altyapısına kadar
            SaaS ürün geliştirmenin tüm teknik adımlarını üstlenmektedir.
            30 dakikalık ücretsiz görüşmeyle başlayalım.{" "}
            <Link href="/iletisim" className="text-accent underline underline-offset-2">
              Görüşme talep edin →
            </Link>
          </p>
        </div>

        <p>
          <Link href="/cozumler/saas-urun-altyapisi" className="text-accent underline underline-offset-2">
            SaaS altyapı hizmetimizi inceleyin →
          </Link>
        </p>
      </ArticleLayout>
    </>
  );
}
