import { buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { siteConfig } from "@/data/config";

export const metadata = buildPageMetadata({
  title: "Özel Yazılım Ne Kadar Tutar? Türkiye Fiyat Rehberi — Albanexa",
  description:
    "KOBİ'ler için özel yazılım geliştirme maliyetini etkileyen faktörler, Türkiye'deki gerçekçi bütçe aralıkları ve gizli maliyet tuzakları.",
  path: "/rehber/ozel-yazilim-maliyeti-ve-fiyatlandirma",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${siteConfig.siteUrl}/rehber/ozel-yazilim-maliyeti-ve-fiyatlandirma#article`,
  "headline": "Özel Yazılım Ne Kadar Tutar? Türkiye Fiyat Rehberi",
  "description":
    "KOBİ'ler için özel yazılım geliştirme maliyetini etkileyen faktörler, Türkiye'deki gerçekçi bütçe aralıkları ve gizli maliyet tuzakları.",
  "datePublished": "2026-07-31",
  "dateModified": "2026-07-31",
  "author": { "@id": `${siteConfig.siteUrl}/#person` },
  "publisher": { "@id": `${siteConfig.siteUrl}/#organization` },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${siteConfig.siteUrl}/rehber/ozel-yazilim-maliyeti-ve-fiyatlandirma`,
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Rehber", "item": `${siteConfig.siteUrl}/rehber` },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Özel Yazılım Maliyeti ve Fiyatlandırma",
        "item": `${siteConfig.siteUrl}/rehber/ozel-yazilim-maliyeti-ve-fiyatlandirma`,
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.siteUrl}/rehber/ozel-yazilim-maliyeti-ve-fiyatlandirma#faq`,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Özel yazılım geliştirme ne kadar tutar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Türkiye'de KOBİ odaklı özel yazılım maliyeti kapsama göre büyük farklılık gösterir. Temel bir iş takip veya stok modülü 30.000–80.000 TL aralığında başlar. Çok modüllü, entegrasyonlu ve özel raporlamalı sistemler 100.000–250.000 TL ve üzerine çıkabilir. Aylık bakım anlaşmaları genellikle 3.000–10.000 TL/ay aralığındadır.",
      },
    },
    {
      "@type": "Question",
      "name": "Özel yazılım mı, hazır SaaS yazılımı mı daha ucuz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "İlk yıl SaaS yazılımı daha ucuz görünür. Ancak aylık lisans + kullanıcı başına ücret + özelleştirme maliyeti 3–5 yıl hesaplandığında özel yazılım genellikle daha avantajlı çıkar. Özel yazılımda sürekli lisans ödemesi yoktur; kaynak kod işletmeye aittir.",
      },
    },
    {
      "@type": "Question",
      "name": "Saatlik mi, proje bazlı mı fiyatlandırma daha iyi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "KOBİ'ler için sabit proje bütçesi genellikle daha öngörülebilirdir. Saatlik model kapsamı belirsiz projelerde bütçeyi şişirebilir. İyi tanımlanmış MVP kapsamıyla sabit fiyat anlaşması hem geliştirici hem müşteri için en sağlıklı yoldur.",
      },
    },
    {
      "@type": "Question",
      "name": "Gizli maliyetler nelerdir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Sunucu ve altyapı maliyetleri (yıllık 3.000–15.000 TL), SSL sertifikası, domain yenileme, üçüncü taraf API ücretleri (SMS, e-posta, harita) ve bakım anlaşması en sık atlanan kalemlerdir. Bunları projenin toplam maliyetine ekleyerek gerçekçi bir 3 yıllık bütçe çıkarmak gerekir.",
      },
    },
  ],
};

export default function OzelYazilimMaliyetiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout
        title="Özel Yazılım Ne Kadar Tutar? Türkiye Fiyat Rehberi"
        description="KOBİ'ler için özel yazılım geliştirme maliyetini etkileyen faktörler, Türkiye'deki gerçekçi bütçe aralıkları ve gizli maliyet tuzakları."
        publishedAt="2026-07-31"
        readingTime={7}
        category="Yazılım Seçimi & Strateji"
      >
        <p>
          "Özel yazılım ne kadar tutar?" — bu soruya "duruma göre değişir" cevabı
          almak sinir bozucudur. Bu rehberde hem dürüst rakamlar hem de bu rakamları
          neyin belirlediğini bulacaksınız. Amacımız gerçekçi bir bütçe oluşturmanıza
          yardımcı olmak.
        </p>

        <h2>Maliyeti belirleyen 5 ana faktör</h2>

        <h3>1. Modül sayısı ve karmaşıklığı</h3>
        <p>
          En büyük maliyet etkeni budur. Tek modüllü bir uygulama (yalnızca iş emri
          takibi) ile stok + cari hesap + fatura + saha ekibi + raporlama içeren
          bir sistem arasında 3–5 kat fark olabilir.
        </p>

        <h3>2. Kullanıcı sayısı ve rol yapısı</h3>
        <p>
          5 kullanıcı + 2 rol ile 50 kullanıcı + 8 farklı yetki seviyesi arasında
          ciddi geliştirme farkı vardır. Karmaşık yetki matrisleri hem tasarım hem
          test süresini artırır.
        </p>

        <h3>3. Entegrasyonlar</h3>
        <p>
          Muhasebe programı (Logo, Mikro), e-fatura, SMS/e-posta bildirimleri,
          barkod okuyucu, harita API'si — her entegrasyon ek geliştirme ve bakım
          maliyeti üretir.
        </p>

        <h3>4. Veri hacmi ve performans gereksinimleri</h3>
        <p>
          Günde 10 işlem giren küçük bir panel ile günde 10.000 satır hareket
          kaydeden bir sistem farklı mimari kararlar gerektirir. Büyük ölçek,
          özel indeksleme ve optimizasyon çalışması demektir.
        </p>

        <h3>5. Mobil uygulama ihtiyacı</h3>
        <p>
          Mobil uyumlu web uygulaması (responsive) temel pakete dahildir.
          Ayrı iOS ve/veya Android native uygulama ise maliyeti %40–80 artırır.
          Çoğu KOBİ için mobil uyumlu web yeterlidir.
        </p>

        <h2>Türkiye'deki gerçekçi bütçe aralıkları</h2>
        <table>
          <thead>
            <tr>
              <th>Proje Türü</th>
              <th>Kapsam Örneği</th>
              <th>Tahmini Bütçe</th>
              <th>Süre</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Temel panel</td>
              <td>1 modül, 2–3 rol, temel raporlar</td>
              <td>30.000–60.000 ₺</td>
              <td>4–6 hafta</td>
            </tr>
            <tr>
              <td>Orta ölçekli sistem</td>
              <td>2–3 modül, entegrasyon, gelişmiş rapor</td>
              <td>60.000–150.000 ₺</td>
              <td>8–14 hafta</td>
            </tr>
            <tr>
              <td>Kapsamlı platform</td>
              <td>5+ modül, çok kullanıcı, çoklu entegrasyon</td>
              <td>150.000–300.000 ₺</td>
              <td>16–24 hafta</td>
            </tr>
            <tr>
              <td>SaaS ürün altyapısı</td>
              <td>Multi-tenant, abonelik, ölçeklenebilir</td>
              <td>200.000 ₺+</td>
              <td>20–36 hafta</td>
            </tr>
          </tbody>
        </table>
        <p>
          <em>Bu rakamlar 2026 yılı Türkiye piyasasına göre yaklaşık değerlerdir.
          KDV dahil değildir. Gerçek teklif ancak kapsam netleştikten sonra verilebilir.</em>
        </p>

        <h2>Gizli maliyetler: Proje bitmeden sona ermez</h2>
        <p>
          Yazılım maliyetini hesaplarken geliştiriciye ödenen rakam yalnızca
          başlangıç noktasıdır. Şu ek kalemleri de bütçeye ekleyin:
        </p>
        <ul>
          <li>
            <strong>Sunucu/altyapı:</strong> Yıllık 3.000–15.000 TL (kapsama göre).
            Vercel, Supabase, AWS gibi platformlar kullanım başına ücret alır.
          </li>
          <li>
            <strong>Domain ve SSL:</strong> Yıllık 500–2.000 TL
          </li>
          <li>
            <strong>Üçüncü taraf API'ler:</strong> SMS (iletimerkezi, Netgsm), e-posta
            (SendGrid, Resend), harita (Google Maps) — kullanım hacmine göre değişir
          </li>
          <li>
            <strong>Bakım anlaşması:</strong> Aylık 3.000–10.000 TL — güvenlik
            güncellemeleri, hata düzeltme, küçük geliştirmeler
          </li>
          <li>
            <strong>Yeni modüller:</strong> İlk sistemin hayata geçmesiyle birlikte
            yeni ihtiyaçlar doğar; bunlar ek geliştirme projesi olarak planlanır
          </li>
        </ul>

        <h2>Özel yazılım vs. SaaS: 3 yıllık toplam maliyet karşılaştırması</h2>
        <table>
          <thead>
            <tr>
              <th>Kalem</th>
              <th>SaaS (Hazır Yazılım)</th>
              <th>Özel Geliştirme</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Başlangıç</td>
              <td>5.000–20.000 TL kurulum</td>
              <td>60.000–150.000 TL geliştirme</td>
            </tr>
            <tr>
              <td>Aylık lisans (10 kullanıcı)</td>
              <td>3.000–8.000 TL/ay</td>
              <td>Yok</td>
            </tr>
            <tr>
              <td>Altyapı</td>
              <td>Dahil</td>
              <td>500–1.500 TL/ay</td>
            </tr>
            <tr>
              <td>Özelleştirme</td>
              <td>Sınırlı + ek ücret</td>
              <td>Tam esneklik, ek proje</td>
            </tr>
            <tr>
              <td>3 yıl toplam (tahmini)</td>
              <td>120.000–310.000 TL</td>
              <td>90.000–200.000 TL</td>
            </tr>
            <tr>
              <td>Kaynak kod mülkiyeti</td>
              <td>Hayır</td>
              <td>Evet</td>
            </tr>
          </tbody>
        </table>

        <h2>Ucuz teklif tuzağı</h2>
        <p>
          "Bunu 10.000 TL'ye yaparım" diye başlayan projeler sık sık yarım kalır
          ya da teslimden sonra bakımsız bırakılır. Düşük fiyatlı teklifin
          arkasında genellikle şunlardan biri vardır:
        </p>
        <ul>
          <li>Kapsam net tanımlanmamış, ileride her ek istek ayrı ücrete tabi</li>
          <li>Teknik borç yüklü, bakımı zor kod tabanı</li>
          <li>Test ve doküman yok, sistem kırılgan</li>
          <li>Geliştirici desteği kesiliyor, siz kaynak kodsuz kalıyorsunuz</li>
        </ul>
        <p>
          Doğru soru "en ucuz kim?" değil, <strong>"kapsam netleşince gerçekçi
          teklif kim veriyor?"</strong>dur.
        </p>

        <h2>Sıkça sorulan sorular</h2>

        <div className="faq-item">
          <h3>Ödemeyi nasıl yapılandırabilirim?</h3>
          <p>
            Standart yapı: %30 başlangıç, %40 test/kabul aşamasında, %30 teslimde.
            Büyük projelerde aylık milestone ödemeleri de tercih edilebilir.
          </p>
        </div>
        <div className="faq-item">
          <h3>Bütçem düşük, ne yapabilirim?</h3>
          <p>
            MVP (Minimum Viable Product) kapsamıyla başlayın. En kritik 1–2
            sorunu çözen temel sistemi önce kurun; işletme büyüdükçe modüller
            eklenir. Bu yaklaşım hem riski hem başlangıç maliyetini düşürür.
          </p>
        </div>
        <div className="faq-item">
          <h3>Aylık abonelik modeli mümkün mü?</h3>
          <p>
            Evet. Bazı projeler için geliştirme + bakım paketini aylık abonelik
            modeline dönüştürmek mümkündür. Bu model başlangıç yatırımını düşürür
            ancak uzun vadede toplam maliyeti artırabilir.
          </p>
        </div>

        <hr />

        <div className="callout">
          <p style={{ margin: 0 }}>
            <strong>Projeniz için gerçekçi bir bütçe öğrenmek ister misiniz?</strong>
            <br />
            30 dakikalık ücretsiz görüşmede kapsam belirleniyor, net fiyat
            ve takvim sunuluyor. Sürpriz ek maliyet yok.{" "}
            <Link href="/iletisim" className="text-accent underline underline-offset-2">
              Teklif talep edin →
            </Link>
          </p>
        </div>
      </ArticleLayout>
    </>
  );
}
