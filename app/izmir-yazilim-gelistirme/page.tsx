import { buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CtaStrip from "@/components/CtaStrip";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { siteConfig } from "@/data/config";

export const metadata = buildPageMetadata({
  title: "İzmir Yazılım Geliştirme — Özel Dijital Çözümler | Albanexa",
  description:
    "İzmir merkezli bağımsız yazılım stüdyosu. KOBİ'ler için özel iş takip, stok, cari hesap ve SaaS ürün altyapısı geliştirme. 30 dakikalık ücretsiz ihtiyaç analizi.",
  path: "/izmir-yazilim-gelistirme",
});

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.siteUrl}/#organization`,
    "name": "Albanexa",
    "alternateName": "Albanexa Yazılım Stüdyosu",
    "url": siteConfig.siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteConfig.siteUrl}/logo.png`,
    },
    "description":
      "İzmir merkezli bağımsız dijital çözüm stüdyosu. KOBİ'ler için özel iş takip, stok ve cari hesap yönetimi, web uygulamaları ve SaaS ürün altyapısı.",
    "founder": {
      "@type": "Person",
      "name": "Mert Alban",
    },
    "areaServed": [
      { "@type": "City", "name": "İzmir" },
      { "@type": "Country", "name": "Türkiye" },
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "İzmir",
      "addressCountry": "TR",
    },
    "telephone": `+${siteConfig.whatsappNumber}`,
    "email": siteConfig.contactEmail,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Yazılım Geliştirme Hizmetleri",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "İş Takip Sistemi" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Stok ve Cari Hesap Yazılımı" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Operasyon Otomasyonu" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SaaS Ürün Altyapısı" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kurumsal Web Sitesi" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Özel Web Uygulaması" } },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "İzmir Yazılım Geliştirme",
        "item": `${siteConfig.siteUrl}/izmir-yazilim-gelistirme`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "İzmir'de özel yazılım geliştirme hizmeti alabilir miyim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Evet. Albanexa, İzmir merkezli bağımsız bir yazılım stüdyosudur. İzmir'deki işletmelerle yüz yüze veya uzaktan çalışabilirsiniz. Türkiye genelinde de uzaktan hizmet sunulmaktadır.",
        },
      },
      {
        "@type": "Question",
        "name": "İzmir'deki hangi sektörlere yazılım geliştirme yapılıyor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Toptan ve perakende ticaret, servis ve bakım işletmeleri, lojistik, turizm ve konaklama, gıda sektörü, sağlık ve danışmanlık firmalarına özel yazılım çözümleri sunulmaktadır.",
        },
      },
      {
        "@type": "Question",
        "name": "Yalnızca İzmir'e mi hizmet veriyorsunuz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Hayır. Albanexa Türkiye geneline uzaktan hizmet vermektedir. İzmir merkezli olmakla birlikte İstanbul, Ankara, Bursa, Antalya ve tüm şehirlerden işletmelerle çalışılmaktadır.",
        },
      },
      {
        "@type": "Question",
        "name": "İzmir'de yazılım geliştirme maliyeti ne kadar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Kapsama göre farklılık gösterir. Temel iş takip veya stok modülü 30.000–60.000 TL'den başlar. Çok modüllü sistemler 60.000–150.000 TL aralığında olabilir. 30 dakikalık ücretsiz görüşmede projenize özel bütçe aralığı paylaşılmaktadır.",
        },
      },
    ],
  },
];

const solutions = [
  {
    href: "/cozumler/is-takip-sistemleri",
    title: "İş Takip Sistemi",
    desc: "Sipariş, görev ve müşteri süreçlerini tek panelde yönetin. WhatsApp kaosuna son.",
    badge: "Popüler",
  },
  {
    href: "/cozumler/stok-cari-tahsilat",
    title: "Stok & Cari Hesap",
    desc: "Depo hareketleri, müşteri bakiyeleri ve tahsilat yönetimi. Excel'den kurtulan işletmeler için.",
    badge: "",
  },
  {
    href: "/cozumler/operasyon-otomasyonlari",
    title: "Operasyon Otomasyonu",
    desc: "n8n ile tekrar eden iş akışlarını otomatikleştirin. E-posta bildirimleri, raporlar, entegrasyonlar.",
    badge: "",
  },
  {
    href: "/cozumler/saas-urun-altyapisi",
    title: "SaaS Ürün Altyapısı",
    desc: "Sektörel problemi çözen yazılımı abonelik modeline dönüştürün. Multi-tenant, ölçeklenebilir.",
    badge: "",
  },
  {
    href: "/cozumler/web-siteleri",
    title: "Kurumsal Web Sitesi",
    desc: "Next.js tabanlı, hızlı, SEO uyumlu ve mobil öncelikli kurumsal siteler.",
    badge: "",
  },
  {
    href: "/cozumler/web-uygulamalari",
    title: "Özel Web Uygulaması",
    desc: "Rol bazlı erişim, gerçek zamanlı veri ve özel raporlama paneli ile işletmenize özel sistem.",
    badge: "",
  },
];

const caseStudies = [
  {
    name: "StokApp",
    sector: "Toptan Ticaret · İzmir",
    result: "Hesap ekstresi hazırlama süresi 2 saatten 30 saniyeye indi.",
    detail: "Müşteri bakiyeleri ve stok durumu anlık takip edilebilir hale geldi.",
    href: "/projeler/stockapp",
  },
  {
    name: "Hezer Auto Service",
    sector: "Araç Servisi · Türkiye",
    result: "Tüm servis süreci kağıt ve WhatsApp'tan sisteme taşındı.",
    detail: "Araç geçmişine plaka ile saniyeler içinde ulaşılabiliyor.",
    href: "/projeler/hezer-auto-service",
  },
  {
    name: "CARPASS",
    sector: "SaaS · Türkiye Geneli",
    result: "Araç geçmiş raporlama SaaS uygulaması.",
    detail: "Yapay zeka destekli risk skoru ve Trust Report sunan çok-kiracılı altyapı.",
    href: "/projeler/carpass",
  },
];

export default function IzmirYazilimGelistirmePage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main className="w-full" style={{ overflowX: "clip" }}>
        <Navbar />

        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="bg-grid absolute inset-0 -z-10" />
          <div className="mx-auto max-w-6xl px-5">
            <Breadcrumb
              crumbs={[
                { label: "Ana Sayfa", href: "/" },
                { label: "İzmir Yazılım Geliştirme" },
              ]}
            />
            <p className="mono-label mb-4">İzmir Merkezli Yazılım Stüdyosu</p>
            <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl">
              İzmir'deki işletmeler için özel yazılım çözümleri
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Albanexa, İzmir merkezli bağımsız bir dijital çözüm stüdyosudur.
              KOBİ'ler için iş takip, stok, cari hesap, operasyon otomasyonu
              ve SaaS ürün altyapısı geliştiriyorum. Büyük ajans fiyatları yok,
              standart paket yok — sadece işletmenizin gerçek ihtiyacına özel sistem.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-accent/90 transition-colors"
              >
                Ücretsiz İhtiyaç Analizi →
              </Link>
              <Link
                href="/projeler"
                className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-3 text-sm font-semibold text-ink hover:border-accent/50 transition-colors"
              >
                Referans Projeleri Gör
              </Link>
            </div>
          </div>
        </section>

        {/* Hizmetler */}
        <section className="mx-auto max-w-6xl px-5 pb-16">
          <p className="mono-label mb-6">Çözümler</p>
          <h2 className="display text-2xl font-bold text-ink mb-8 max-w-xl">
            İzmir işletmelerine sunulan yazılım hizmetleri
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((sol) => (
              <Link
                key={sol.href}
                href={sol.href}
                className="card-surface group rounded-xl p-6 transition-all hover:border-accent/40 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-ink text-sm">{sol.title}</h3>
                  {sol.badge && (
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                      {sol.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted leading-relaxed flex-1">{sol.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent opacity-70 group-hover:opacity-100 group-hover:gap-2 transition-all">
                  İncele →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Neden Albanexa */}
        <section className="border-y border-line py-16">
          <div className="mx-auto max-w-6xl px-5">
            <p className="mono-label mb-6">Fark</p>
            <h2 className="display text-2xl font-bold text-ink mb-8 max-w-xl">
              Büyük ajans değil, bağımsız stüdyo — neden önemli?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Doğrudan iletişim",
                  body: "Proje boyunca tek muhatap olarak Mert Alban'la çalışırsınız. Proje yöneticisi aracılığıyla değil.",
                },
                {
                  title: "Kapsama özel fiyat",
                  body: "Standart paket yok. İhtiyacınız netleşince gerçekçi bütçe ve takvim sunulur — sürpriz ek maliyet olmaz.",
                },
                {
                  title: "İşletme odağı",
                  body: "KOBİ'lerin iş süreçlerini yakından anlayan kalite yönetimi ve süreç analizi geçmişi.",
                },
                {
                  title: "Uzun vadeli sahiplik",
                  body: "Kaynak kod size aittir. Bakım anlaşması isteğe bağlıdır. Bağımlılık yaratmayan bir ilişki.",
                },
              ].map((item) => (
                <div key={item.title} className="card-surface rounded-xl p-5">
                  <h3 className="font-bold text-ink text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vaka Çalışmaları */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <p className="mono-label mb-6">Referanslar</p>
          <h2 className="display text-2xl font-bold text-ink mb-8 max-w-xl">
            Gerçek projelerden sonuçlar
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <Link
                key={cs.href}
                href={cs.href}
                className="card-surface group rounded-xl p-6 flex flex-col gap-3 hover:border-accent/40 transition-all"
              >
                <div>
                  <p className="font-bold text-ink text-sm">{cs.name}</p>
                  <p className="text-xs text-faint mt-0.5">{cs.sector}</p>
                </div>
                <p className="text-sm font-medium text-ink leading-snug">{cs.result}</p>
                <p className="text-xs text-muted leading-relaxed flex-1">{cs.detail}</p>
                <span className="text-xs font-semibold text-accent opacity-70 group-hover:opacity-100 transition-opacity">
                  Vaka çalışmasını gör →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* SSS */}
        <section className="border-t border-line py-16">
          <div className="mx-auto max-w-3xl px-5">
            <p className="mono-label mb-6">Sıkça Sorulanlar</p>
            <h2 className="display text-2xl font-bold text-ink mb-8">
              İzmir yazılım geliştirme hakkında sık sorulan sorular
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "İzmir'de ofiste görüşme yapılabiliyor mu?",
                  a: "İzmir'deki işletmelerle yüz yüze veya çevrimiçi görüşme yapılabilmektedir. Proje başlangıcında keşif görüşmesi yüz yüze tercih edilirse planlama yapılabilir. Tüm proje süreci uzaktan da eksiksiz yürütülebilir.",
                },
                {
                  q: "İzmir dışından da hizmet alınabiliyor mu?",
                  a: "Evet. Albanexa Türkiye geneline uzaktan hizmet vermektedir. İstanbul, Ankara, Bursa, Antalya ve diğer şehirlerden KOBİ'lerle aktif olarak çalışılmaktadır.",
                },
                {
                  q: "Hangi sektörlere yazılım geliştirildi?",
                  a: "Toptan ticaret, araç servisi, SaaS girişimi olmak üzere çeşitli sektörlerde gerçekleştirilen projeler mevcuttur. Stok, cari hesap, iş emri takibi ve çok-kiracılı SaaS altyapısı alanlarında referans projeler bulunmaktadır.",
                },
                {
                  q: "Proje için ne zaman uygunluk var?",
                  a: "Mevcut kapasite ve takvim için 30 dakikalık ücretsiz ihtiyaç analizi görüşmesinde bilgi paylaşılmaktadır. İletişim formu üzerinden tarih önerisi iletilebilir.",
                },
              ].map((item) => (
                <div key={item.q} className="border-b border-line pb-6 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-ink text-sm mb-2">{item.q}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rehber Linkleri */}
        <section className="border-t border-line py-12">
          <div className="mx-auto max-w-6xl px-5">
            <p className="mono-label mb-4">Faydalı Kaynaklar</p>
            <h2 className="display text-xl font-bold text-ink mb-6">
              İzmir işletmeleri için rehberler
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  href: "/rehber/izmir-yazilim-gelistirme-firmalari",
                  title: "İzmir'de Yazılım Firması Nasıl Seçilir?",
                  desc: "Doğru geliştirici veya stüdyo seçerken dikkat edilmesi gerekenler.",
                },
                {
                  href: "/rehber/ozel-yazilim-maliyeti-ve-fiyatlandirma",
                  title: "Özel Yazılım Ne Kadar Tutar?",
                  desc: "2026 Türkiye bütçe aralıkları ve gizli maliyet kalemleri.",
                },
                {
                  href: "/rehber/web-uygulamasi-yaptirmak-surec-ve-maliyet",
                  title: "Web Uygulaması Yaptırmak: Süreç ve Maliyet",
                  desc: "Başlangıçtan teslime kadar adım adım süreç rehberi.",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="card-surface group rounded-xl p-5 hover:border-accent/40 transition-all"
                >
                  <p className="font-semibold text-ink text-sm mb-1 group-hover:text-accent transition-colors">
                    {link.title}
                  </p>
                  <p className="text-xs text-muted leading-relaxed">{link.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaStrip />
      </main>
    </>
  );
}
