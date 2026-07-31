import { buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CtaStrip from "@/components/CtaStrip";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { siteConfig } from "@/data/config";

export const metadata = buildPageMetadata({
  title: "Rehber — Albanexa",
  description:
    "KOBİ'ler için stok takibi, cari hesap yönetimi, iş takip sistemleri ve özel yazılım hakkında pratik rehberler.",
  path: "/rehber",
});

// Hedef sorgular — gelecek makaleler:
// "özel yazılım fiyatları"          → /rehber/ozel-yazilim-maliyeti-ve-fiyatlandirma
// "saas urun gelistirme"            → /rehber/saas-urun-nasil-gelistirilir
// "whatsapp iş takibi"              → /rehber/whatsapp-is-takibi-neden-yanlis
// "izmir yazılım geliştirme"        → /rehber/izmir-yazilim-gelistirme-firmalari
// "web uygulaması nedir"            → /rehber/web-uygulamasi-nedir-ne-ise-yarar
// "iş otomasyonu kobiler"           → /rehber/otomasyon-ile-verimliligi-artirma

const publishedArticles = [
  {
    slug: "stok-takip-programi-kobiler-icin",
    title: "KOBİ'ler İçin Stok Takip Programı: Excel ve Hazır Yazılımın Ötesi",
    description:
      "Excel'in ötesine geçmek isteyen işletmeler için özel stok takip sistemi — sorunlar, karşılaştırma ve kazanımlar.",
    category: "Stok & Envanter Yönetimi",
    readingTime: 7,
    publishedAt: "2025-07-29",
  },
  {
    slug: "cari-hesap-takip-sistemi-nedir",
    title: "Cari Hesap Takip Sistemi Nedir? KOBİ'ler İçin Kapsamlı Rehber",
    description:
      "Vadeli satış yapan işletmeler için dijital cari hesap yönetimi, tahsilat otomasyonu ve muhasebe programıyla fark.",
    category: "Finans & Tahsilat Yönetimi",
    readingTime: 6,
    publishedAt: "2025-07-29",
  },
  {
    slug: "is-takip-sistemi-nedir-kobiler-icin",
    title: "İş Takip Sistemi Nedir? KOBİ'ler İçin Kapsamlı Rehber",
    description:
      "İş takip sistemi nedir, hangi işletmeler için gereklidir, Excel ve WhatsApp'tan farkı nedir? Operasyonunu dijitalleştirmek isteyen KOBİ'ler için eksiksiz rehber.",
    category: "İş Takip & Operasyon Yönetimi",
    readingTime: 8,
    publishedAt: "2026-07-31",
  },
  {
    slug: "excel-yerine-ozel-stok-takip-sistemi",
    title: "Excel Yerine Özel Stok Takip Sistemi: Fark ve Geçiş Rehberi",
    description:
      "Excel'i stok takibinde neden terk etmelisiniz? Özel stok takip sistemine geçişin avantajları, karşılaştırma tablosu ve adım adım geçiş planı.",
    category: "Stok & Envanter Yönetimi",
    readingTime: 7,
    publishedAt: "2026-07-31",
  },
  {
    slug: "erp-alternatifi-kucuk-isletmeler-icin",
    title: "ERP Alternatifi: Küçük İşletmeler İçin Özel Yazılım",
    description:
      "Büyük ERP sistemleri KOBİ'ler için neden uygun değildir? Özel geliştirilmiş yazılım ERP'ye kıyasla nasıl daha iyi bir alternatif sunar?",
    category: "Yazılım Seçimi & Strateji",
    readingTime: 9,
    publishedAt: "2026-07-31",
  },
  {
    slug: "web-uygulamasi-yaptirmak-surec-ve-maliyet",
    title: "Web Uygulaması Yaptırmak: Süreç, Maliyet ve Dikkat Edilecekler",
    description:
      "İşletmenize özel web uygulaması yaptırmayı düşünüyor musunuz? Süreç nasıl işler, maliyetler nasıl belirlenir, hangi soruları sormalısınız?",
    category: "Yazılım Geliştirme & Dijitalleşme",
    readingTime: 8,
    publishedAt: "2026-07-31",
  },
];

const plannedArticles = [
  {
    slug: "ozel-yazilim-maliyeti-ve-fiyatlandirma",
    title: "Özel Yazılım Ne Kadar Tutar? Türkiye Fiyat Rehberi",
    description: "KOBİ'ler için özel yazılım geliştirme maliyetlerini etkileyen faktörler.",
  },
  {
    slug: "saas-urun-nasil-gelistirilir",
    title: "SaaS Ürün Nasıl Geliştirilir? Başlangıçtan Lansmana",
    description: "Sektörel problemi çözen bir yazılımı abonelik modeline dönüştürme rehberi.",
  },
  {
    slug: "whatsapp-is-takibi-neden-yanlis",
    title: "WhatsApp ile İş Takibi Neden Yanlış?",
    description: "WhatsApp'ın iş koordinasyonu için neden yetersiz kaldığının analizi.",
  },
];

export default function RehberPage() {
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.siteUrl}/rehber`,
    "name": "Albanexa Rehber",
    "description":
      "KOBİ'ler için dijital operasyon sistemleri, stok takibi, cari hesap yönetimi ve özel yazılım hakkında pratik rehberler.",
    "publisher": { "@id": `${siteConfig.siteUrl}/#organization` },
    "hasPart": publishedArticles.map((a) => ({
      "@type": "Article",
      "headline": a.title,
      "url": `${siteConfig.siteUrl}/rehber/${a.slug}`,
    })),
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
        { "@type": "ListItem", "position": 2, "name": "Rehber", "item": `${siteConfig.siteUrl}/rehber` },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <main className="w-full" style={{ overflowX: "clip" }}>
        <Navbar />

        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="bg-grid absolute inset-0 -z-10" />
          <div className="mx-auto max-w-6xl px-5">
            <Breadcrumb
              crumbs={[
                { label: "Ana Sayfa", href: "/" },
                { label: "Rehber" },
              ]}
            />
            <p className="mono-label mb-4">Rehber</p>
            <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl">
              Dijital operasyon rehberleri
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              KOBİ'ler için stok takibi, cari hesap yönetimi, iş takip sistemleri
              ve özel yazılım süreçlerine dair pratik içerikler.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-20">

          {/* Published */}
          <div className="mb-12">
            <p className="mono-label mb-6">Yayında</p>
            <div className="grid gap-5 sm:grid-cols-2">
              {publishedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/rehber/${article.slug}`}
                  className="card-surface group rounded-xl p-6 transition-all hover:border-accent/40 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="mono-label text-xs">{article.category}</span>
                    <span className="text-xs text-faint">{article.readingTime} dk</span>
                  </div>
                  <h2 className="display font-bold text-ink text-base leading-snug group-hover:text-accent transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-xs text-muted leading-relaxed flex-1">{article.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent opacity-70 group-hover:opacity-100 group-hover:gap-2 transition-all">
                    Oku →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Planned */}
          <div className="mb-12">
            <p className="mono-label mb-6">Yakında</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {plannedArticles.map((article) => (
                <div
                  key={article.slug}
                  className="card-surface rounded-xl p-5 opacity-50"
                >
                  <h2 className="font-semibold text-ink text-sm leading-snug mb-2">
                    {article.title}
                  </h2>
                  <p className="text-xs text-muted leading-relaxed">{article.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-line bg-surface/40 px-6 py-5">
            <p className="text-sm text-muted leading-relaxed">
              <span className="font-semibold text-ink">Aradığınız konuyu bulamadınız mı? </span>
              Albanexa ekibi, işletmenizin özel durumunu 30 dakikalık ücretsiz görüşmede değerlendirmektedir.
            </p>
            <Link
              href="/iletisim"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              Ücretsiz Görüşme Talep Et →
            </Link>
          </div>
        </section>

        <CtaStrip />
      </main>
    </>
  );
}
