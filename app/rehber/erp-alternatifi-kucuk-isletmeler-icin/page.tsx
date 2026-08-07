import { buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { siteConfig } from "@/data/config";

export const metadata = buildPageMetadata({
  title: "ERP Alternatifi: Küçük İşletmeler İçin Özel Yazılım",
  description:
    "Büyük ERP sistemleri KOBİ'ler için neden uygun değildir? Özel geliştirilmiş yazılım, ERP'ye kıyasla nasıl daha iyi bir alternatif sunar? Karşılaştırma ve karar rehberi.",
  path: "/rehber/erp-alternatifi-kucuk-isletmeler-icin",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${siteConfig.siteUrl}/rehber/erp-alternatifi-kucuk-isletmeler-icin#article`,
  "headline": "ERP Alternatifi: Küçük İşletmeler İçin Özel Yazılım",
  "description":
    "Büyük ERP sistemleri KOBİ'ler için neden uygun değildir? Özel geliştirilmiş yazılım, ERP'ye kıyasla nasıl daha iyi bir alternatif sunar? Karşılaştırma ve karar rehberi.",
  "datePublished": "2026-07-31",
  "dateModified": "2026-07-31",
  "author": { "@id": `${siteConfig.siteUrl}/#person` },
  "publisher": { "@id": `${siteConfig.siteUrl}/#organization` },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${siteConfig.siteUrl}/rehber/erp-alternatifi-kucuk-isletmeler-icin`,
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Rehber", "item": `${siteConfig.siteUrl}/rehber` },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "ERP Alternatifi Küçük İşletmeler İçin",
        "item": `${siteConfig.siteUrl}/rehber/erp-alternatifi-kucuk-isletmeler-icin`,
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.siteUrl}/rehber/erp-alternatifi-kucuk-isletmeler-icin#faq`,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "ERP nedir ve neden KOBİ'ler için her zaman uygun değildir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "ERP (Kurumsal Kaynak Planlaması), muhasebe, üretim, stok, insan kaynakları ve satış gibi onlarca modülü tek sistemde toplayan yazılımlardır. SAP, Microsoft Dynamics, Logo gibi çözümler büyük kurumlar için tasarlanmıştır. KOBİ'ler açısından sorun; yüksek lisans bedeli, uzun kurulum süresi (6–18 ay), karmaşık arayüz ve işletmenin gerçekte kullanmadığı onlarca özellik için ödeme yapılmasıdır.",
      },
    },
    {
      "@type": "Question",
      "name": "Özel yazılım ERP'den daha mı pahalıdır?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Başlangıç maliyeti karşılaştırıldığında özel yazılım genellikle orta aralıktadır. SAP veya Microsoft Dynamics gibi büyük ERP'lerin kurulum ve lisans maliyeti milyonlarca TL olabilir. KOBİ odaklı hazır ERP'ler daha uygun başlar, ancak aylık lisans + özelleştirme + destek maliyetleri 3–5 yılda özel geliştirme maliyetini geçer. Özel yazılımda ise kaynak kod sahipliği işletmede olduğundan lisans ödemesi yoktur.",
      },
    },
    {
      "@type": "Question",
      "name": "ERP yerine hangi çözüm tercih edilmeli?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "İşletmenin en kritik 2–3 operasyonel problemi tespit edilmeli ve yalnızca bu problemleri çözen odaklanmış bir sistem kurulmalıdır. İş takip, stok yönetimi ve cari hesap takibi çoğu KOBİ için öncelikli modüllerdir. Bu yapı zamanla genişleyebilir; her modül ihtiyaç doğdukça eklenir.",
      },
    },
    {
      "@type": "Question",
      "name": "Özel yazılım ERP'nin tüm özelliklerini karşılayabilir mi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Çoğu KOBİ ERP'nin yüzde onunu kullanır. Özel yazılım, o yüzde onu mükemmel biçimde karşılar ve gereksiz modüller ekibinizi yavaşlatmaz. Muhasebe gibi özel yetkinlik gerektiren alanlar için mevcut yazılımlarla (Logo, Mikro, Netsis) entegrasyon kurulabilir.",
      },
    },
  ],
};

export default function ErpAlternatifiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout
        title="ERP Alternatifi: Küçük İşletmeler İçin Özel Yazılım"
        description="Büyük ERP sistemleri KOBİ'ler için neden uygun değildir? Özel geliştirilmiş yazılım, ERP'ye kıyasla nasıl daha iyi bir alternatif sunar? Karşılaştırma ve karar rehberi."
        publishedAt="2026-07-31"
        readingTime={9}
        category="Yazılım Seçimi & Strateji"
      >
        <p>
          Operasyonunu büyüten her KOBİ bir noktada aynı soruyla yüzleşir:{" "}
          <em>"ERP mi kurmalıyız?"</em> Cevap çoğu zaman hayırdır — en azından başlangıçta.
          Büyük ERP sistemleri, çözülmesi gereken spesifik operasyonel sorunları çözmek yerine
          işletme ekibini karmaşık bir yazılıma adapte etmeye zorlar.
        </p>

        <h2>ERP nedir, ne yapar?</h2>
        <p>
          ERP (Enterprise Resource Planning — Kurumsal Kaynak Planlaması), bir işletmenin
          tüm departmanlarını tek veri tabanında birleştirmeyi hedefleyen yazılım mimarisine
          verilen isimdir. Muhasebe, üretim, stok, satın alma, insan kaynakları, proje
          yönetimi ve CRM gibi onlarca modülü kapsar.
        </p>
        <p>
          SAP, Microsoft Dynamics 365, Oracle NetSuite, Logo ERP bu kategorinin önde gelen
          örnekleridir. Bu sistemler büyük kurumsal yapılar için tasarlanmıştır: yüzlerce
          çalışan, uluslararası operasyon, karmaşık tedarik zincirleri.
        </p>

        <h2>ERP neden çoğu KOBİ için uygun değildir?</h2>
        <p>
          Beş temel neden:
        </p>
        <ol>
          <li>
            <strong>Yüksek başlangıç maliyeti:</strong> SAP veya Dynamics 365 kurulumu
            danışmanlık ve lisans dahil yüz binlerden milyonlarca TL'ye çıkabilir.
            KOBİ odaklı alternatifler daha uygun başlasa da özelleştirme maliyetleri
            hızla yükselir.
          </li>
          <li>
            <strong>Uzun kurulum süresi:</strong> Bir ERP projesi 6–18 ay sürebilir.
            Bu süreçte işletme hem eski sistemi hem yeni sistemi taşımak zorunda kalır.
          </li>
          <li>
            <strong>Karmaşık arayüz:</strong> ERP, kullanıcıdan ciddi eğitim yatırımı
            gerektirir. Ortalama bir KOBİ çalışanı sisteme adaptasyon için haftalar harcayabilir.
          </li>
          <li>
            <strong>Kullanılmayan modüller:</strong> KOBİ'lerin çoğu ERP'nin yalnızca
            %10–20'sini kullanır ama tamamının bedelini öder.
          </li>
          <li>
            <strong>Süreç dayatması:</strong> ERP, işletmenin süreçlerini kendi mantığına
            uydurmasını bekler. Özel terminoloji, sektöre özgü akışlar veya işletmeye
            has fiyatlandırma mantığı sisteme sığmayabilir.
          </li>
        </ol>

        <h2>ERP, hazır yazılım ve özel geliştirme karşılaştırması</h2>
        <table>
          <thead>
            <tr>
              <th>Kriter</th>
              <th>Büyük ERP</th>
              <th>Hazır KOBİ Yazılımı</th>
              <th>Özel Geliştirme</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Başlangıç maliyeti</td>
              <td>Çok yüksek</td>
              <td>Düşük–orta</td>
              <td>Orta</td>
            </tr>
            <tr>
              <td>Sürekli lisans bedeli</td>
              <td>Var (yüksek)</td>
              <td>Var (aylık/yıllık)</td>
              <td>Yok</td>
            </tr>
            <tr>
              <td>İşletmenize uyum</td>
              <td>Düşük (sizi adapte eder)</td>
              <td>Orta</td>
              <td>Tam (sizin için tasarlanır)</td>
            </tr>
            <tr>
              <td>Kurulum süresi</td>
              <td>6–18 ay</td>
              <td>2–6 hafta</td>
              <td>4–12 hafta</td>
            </tr>
            <tr>
              <td>Özelleştirme esnekliği</td>
              <td>Kısıtlı + pahalı</td>
              <td>Sınırlı</td>
              <td>Tam</td>
            </tr>
            <tr>
              <td>Kaynak kod sahipliği</td>
              <td>Hayır</td>
              <td>Hayır</td>
              <td>Evet</td>
            </tr>
            <tr>
              <td>Ölçekleme</td>
              <td>Evet (büyük kurumlar için)</td>
              <td>Kısıtlı</td>
              <td>Evet (tasarıma göre)</td>
            </tr>
          </tbody>
        </table>

        <h2>KOBİ için doğru strateji: Odaklanmış modüler yaklaşım</h2>
        <p>
          ERP'nin tüm ağırlığını taşımadan operasyonu dijitalleştirmenin yolu,
          <strong> en kritik sorunu önce çözmek</strong>tir:
        </p>
        <ul>
          <li>
            Siparişler ve görevler WhatsApp'ta kayboluyorsa →{" "}
            <Link href="/cozumler/is-takip-sistemleri" className="text-accent underline underline-offset-2">
              İş takip sistemi
            </Link>
          </li>
          <li>
            Stok rakamları tutarsız, müşteri bakiyeleri belirsizse →{" "}
            <Link href="/cozumler/stok-cari-tahsilat" className="text-accent underline underline-offset-2">
              Stok ve cari hesap sistemi
            </Link>
          </li>
          <li>
            Tekrar eden manuel işler zaman ve hata üretiyorsa →{" "}
            <Link href="/cozumler/operasyon-otomasyonlari" className="text-accent underline underline-offset-2">
              Operasyon otomasyonu
            </Link>
          </li>
        </ul>
        <p>
          Bu modüller zamanla birbirine entegre edilebilir. Sonuç, işletmeye özel,
          kullanımı kolay ve gereksiz özelliklerden arındırılmış bir operasyon platformudur —
          ERP'nin küçük ölçek versiyonu değil, işletmenin gerçek ihtiyacına özel tasarım.
        </p>

        <h2>Muhasebe yazılımıyla birlikte çalışır mı?</h2>
        <p>
          Evet. Muhasebe, vergi ve e-fatura için Logo, Mikro, Netsis gibi mevcut yazılımlar
          uzman destekle geliştirilmiş araçlardır ve bu alanda özel geliştirme önermiyoruz.
          Özel sistemimiz bu yazılımlarla API entegrasyonu kurarak veri çift girişini ortadan
          kaldırır: sipariş tamamlandığında muhasebe sistemine otomatik transfer gerçekleşir.
        </p>

        <h2>Sıkça sorulan sorular</h2>

        <div className="faq-item">
          <h3>Sistem ileride büyüyünce ERP'ye geçiş zor olmaz mı?</h3>
          <p>
            Özel sistem büyüme planına göre tasarlandığında bu geçiş sorunsuz olur.
            Veri modeli ve API yapısı standart tutulursa ileride ERP entegrasyonu veya
            belirli modüllerin ERP'ye taşınması mümkündür. Bağımlılık yaratan kapalı
            mimarilerden kaçınıyoruz.
          </p>
        </div>
        <div className="faq-item">
          <h3>İşletmem büyüdüğünde sistem yetersiz kalır mı?</h3>
          <p>
            Sistem baştan ölçeklenebilir mimariyle (bulut altyapısı, modüler yapı)
            kurulur. Kullanıcı sayısı veya işlem hacmi arttığında sistem yeniden
            yazılmaz; altyapı ölçeklenir.
          </p>
        </div>
        <div className="faq-item">
          <h3>Özel geliştirmede yazılımcı bağımlılığı olmaz mı?</h3>
          <p>
            Kaynak kodun mülkiyeti işletmeye aittir. Tüm mimari belgelenmiş ve
            taşınabilir teknolojilerle (Next.js, PostgreSQL, Node.js) inşa edilir.
            İstediğinizde farklı bir geliştirici ekiple devam edebilirsiniz.
          </p>
        </div>

        <hr />

        <div className="callout">
          <p style={{ margin: 0 }}>
            <strong>ERP mi, özel yazılım mı — karar veremiyorsanız birlikte konuşalım.</strong>
            <br />
            30 dakikalık ücretsiz keşif görüşmesinde operasyonunuzu dinliyor,
            işletmenizin gerçek ihtiyacına göre en doğru yolu öneriyor ve somut
            kapsam sunuyoruz.{" "}
            <Link href="/iletisim" className="text-accent underline underline-offset-2">
              Görüşme talep edin →
            </Link>
          </p>
        </div>
      </ArticleLayout>
    </>
  );
}
