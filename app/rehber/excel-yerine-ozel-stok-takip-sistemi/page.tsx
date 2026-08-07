import { buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { siteConfig } from "@/data/config";

export const metadata = buildPageMetadata({
  title: "Excel Yerine Özel Stok Takip Sistemi: Fark ve Geçiş Rehberi",
  description:
    "Excel'i stok takibinde neden terk etmelisiniz? Özel stok takip sistemine geçişin avantajları, karşılaştırma tablosu ve adım adım geçiş planı.",
  path: "/rehber/excel-yerine-ozel-stok-takip-sistemi",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${siteConfig.siteUrl}/rehber/excel-yerine-ozel-stok-takip-sistemi#article`,
  "headline": "Excel Yerine Özel Stok Takip Sistemi: Fark ve Geçiş Rehberi",
  "description":
    "Excel'i stok takibinde neden terk etmelisiniz? Özel stok takip sistemine geçişin avantajları, karşılaştırma tablosu ve adım adım geçiş planı.",
  "datePublished": "2026-07-31",
  "dateModified": "2026-07-31",
  "author": { "@id": `${siteConfig.siteUrl}/#person` },
  "publisher": { "@id": `${siteConfig.siteUrl}/#organization` },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${siteConfig.siteUrl}/rehber/excel-yerine-ozel-stok-takip-sistemi`,
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Rehber", "item": `${siteConfig.siteUrl}/rehber` },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Excel Yerine Özel Stok Takip Sistemi",
        "item": `${siteConfig.siteUrl}/rehber/excel-yerine-ozel-stok-takip-sistemi`,
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.siteUrl}/rehber/excel-yerine-ozel-stok-takip-sistemi#faq`,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Excel ile stok takibi ne zaman yetersiz kalır?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Birden fazla kişinin aynı Excel dosyasını güncellemeye başladığı an sorunlar ortaya çıkar: versiyon çakışmaları, formül hataları ve anlık görünürlük eksikliği. Ayrıca Excel mobil ortamda pratik değildir; otomatik uyarı göndermez ve geçmiş hareketleri sorgulamak için manuel filtreleme gerektirir.",
      },
    },
    {
      "@type": "Question",
      "name": "Excel'den özel sisteme geçiş ne kadar sürer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Mevcut Excel verilerinin temizlenip yeni sisteme aktarılması genellikle 1–2 hafta sürer. Sistem geliştirme kapsamına bağlı olarak toplam geçiş süreci 4–10 hafta arasında tamamlanır. Veri aktarımı tek seferlik bir adım olup sistem hayata geçtikten sonra Excel dosyasına dönülmez.",
      },
    },
    {
      "@type": "Question",
      "name": "Özel stok sistemi Excel'den pahalı değil mi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Başlangıç maliyeti Excel'den yüksektir; ancak uzun vadede tablo değişir. Excel kaynaklı stok hataları, kayıp satışlar ve manuel işlem saatleri hesaba katıldığında özel sistem 6–12 ay içinde kendini amorti eder. Hazır stok yazılımlarının aylık lisans ücretleriyle karşılaştırıldığında özel sistem 3–4 yıl sonra daha uygun maliyete geçer.",
      },
    },
    {
      "@type": "Question",
      "name": "Çok şubeli işletme için Excel'den sisteme geçiş mümkün mü?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Evet. Özel stok sistemi çok şube ve çok depo mimarisini destekleyecek biçimde tasarlanır. Her şubenin ayrı envanteri, merkezi yönetim paneli ve şubeler arası transfer akışı tek sistemde yönetilir; bu Excel ile imkânsızdır.",
      },
    },
  ],
};

export default function ExcelYerineStokPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout
        title="Excel Yerine Özel Stok Takip Sistemi: Fark ve Geçiş Rehberi"
        description="Excel'i stok takibinde neden terk etmelisiniz? Özel stok takip sistemine geçişin avantajları, karşılaştırma tablosu ve adım adım geçiş planı."
        publishedAt="2026-07-31"
        readingTime={7}
        category="Stok & Envanter Yönetimi"
      >
        <p>
          Türkiye'deki KOBİ'lerin büyük çoğunluğu stok takibini Excel ile başlatır. Bu tercih
          makuldür: Excel ücretsizdir, öğrenmesi kolaydır ve küçük ölçekte işe yarar. Ancak
          işletme büyüdükçe — daha fazla ürün, daha fazla çalışan, daha fazla depo — Excel
          bir çözüm olmaktan çıkıp <strong>sorunun kendisi</strong> hâline gelir.
        </p>

        <h2>Excel'in stok takibindeki gerçek sınırları</h2>
        <p>
          Excel'in stok takibinde başarısız olduğu beş kritik nokta vardır:
        </p>
        <ol>
          <li>
            <strong>Eş zamanlı kullanım:</strong> İki kişi aynı dosyayı aynı anda güncellerse
            versiyon çakışması kaçınılmazdır. "Hangi dosya güncel?" sorusu günlük bir sürtüşme
            kaynağına dönüşür.
          </li>
          <li>
            <strong>Formül kırılganlığı:</strong> Yanlışlıkla silinen bir hücre veya yanlış
            yerleştirilen satır, tüm hesaplamaları sessizce bozabilir. Bu hataları fark etmek
            için veriyi manuel doğrulamak gerekir.
          </li>
          <li>
            <strong>Gerçek zamanlı görünürlük yok:</strong> Excel anlık stok durumunu yansıtmaz;
            birisi dosyayı güncellediğinde diğerleri eski veriyle çalışmaya devam eder.
          </li>
          <li>
            <strong>Mobil kullanım pratik değil:</strong> Saha personeli veya depo görevlisi
            telefonda Excel düzenleyemez; bu yüzden hareketler kağıda alınır, sonradan sisteme
            girilir — çift iş, gecikmiş veri.
          </li>
          <li>
            <strong>Otomatik uyarı yok:</strong> Kritik stok seviyesine düşen ürün için Excel
            kendiliğinden bildirim göndermez; periyodik manüel kontrol şarttır.
          </li>
        </ol>

        <h2>Excel ile özel stok takip sistemi karşılaştırması</h2>
        <table>
          <thead>
            <tr>
              <th>Özellik</th>
              <th>Excel</th>
              <th>Özel Stok Sistemi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Eş zamanlı çok kullanıcı</td>
              <td>Hayır (versiyon riski)</td>
              <td>Evet, sınırsız</td>
            </tr>
            <tr>
              <td>Anlık stok görünümü</td>
              <td>Hayır</td>
              <td>Evet</td>
            </tr>
            <tr>
              <td>Mobil kullanım</td>
              <td>Kısıtlı</td>
              <td>Tam mobil uyumlu</td>
            </tr>
            <tr>
              <td>Kritik seviye uyarısı</td>
              <td>Manuel kurulum, kırılgan</td>
              <td>Otomatik bildirim</td>
            </tr>
            <tr>
              <td>Hareket geçmişi sorgusu</td>
              <td>Manuel filtreleme</td>
              <td>Anlık arama ve filtre</td>
            </tr>
            <tr>
              <td>Çok depo / çok şube</td>
              <td>Ayrı dosyalar, kopyalama</td>
              <td>Merkezi, entegre</td>
            </tr>
            <tr>
              <td>Cari hesap entegrasyonu</td>
              <td>Ayrı sheet, bağlantısız</td>
              <td>Aynı sistemde, otomatik</td>
            </tr>
            <tr>
              <td>Kullanıcı yetki kontrolü</td>
              <td>Hayır</td>
              <td>Rol bazlı erişim</td>
            </tr>
            <tr>
              <td>Otomatik yedek</td>
              <td>Manuel veya OneDrive</td>
              <td>Bulut altyapısında sürekli</td>
            </tr>
          </tbody>
        </table>

        <h2>Ne zaman geçiş yapılmalı?</h2>
        <p>
          Aşağıdaki belirtilerden ikisi veya daha fazlası yaşanıyorsa geçiş zamanı gelmiştir:
        </p>
        <ul>
          <li>Stok sayımı ile Excel rakamları sık sık uyuşmuyor</li>
          <li>Siparişler tamamlanmış ama Excel güncellenmemiş hali var</li>
          <li>Birden fazla depo aynı Excel ile yönetilemez hâle geldi</li>
          <li>Muhasebe programıyla stok rakamlarını eşleştirmek saatler alıyor</li>
          <li>Yeni personel Excel'i anlayamıyor, hata yapıyor</li>
        </ul>

        <h2>Excel'den sisteme geçiş nasıl çalışır?</h2>
        <ol>
          <li>
            <strong>Veri envanteri:</strong> Mevcut Excel dosyaları incelenir — ürün kataloğu,
            birim bilgileri, açık siparişler ve geçmiş hareketler tespit edilir.
          </li>
          <li>
            <strong>Veri temizliği:</strong> Mükerrer kayıtlar, yanlış formatlar ve tutarsız
            kodlamalar düzeltilir.
          </li>
          <li>
            <strong>Import:</strong> Temizlenen veriler yeni sisteme aktarılır; açılış bakiyeleri
            doğrulanır.
          </li>
          <li>
            <strong>Paralel çalışma:</strong> 1–2 hafta boyunca hem Excel hem sistem tutulur;
            rakamlar karşılaştırılarak doğrulama yapılır.
          </li>
          <li>
            <strong>Geçiş:</strong> Ekip eğitimi tamamlanınca Excel terk edilir ve sistem
            tek kaynak hâline gelir.
          </li>
        </ol>

        <h2>Gerçek örnek: StokApp</h2>
        <div className="metric-card">
          <p style={{ margin: 0 }}>
            Albanexa'nın toptan ticaret işletmesi için geliştirdiği <strong>StokApp</strong>'ta
            daha önce üç ayrı Excel dosyasında tutulan stok, cari hesap ve sipariş
            bilgisi tek platforma taşındı. Hesap ekstresi hazırlama süresi{" "}
            <strong>2 saatten 30 saniyeye</strong> indi; kritik stok uyarısı sayesinde
            ürün tükenmesinden kaynaklanan satış kayıpları ortadan kalktı.
          </p>
        </div>

        <h2>Maliyet değerlendirmesi</h2>
        <p>
          Excel'den sisteme geçiş ilk etapta maliyet yaratır; ancak şu kalemler hesaba
          katıldığında tablo değişir:
        </p>
        <ul>
          <li>Excel hataları nedeniyle yanlış sipariş verme maliyeti</li>
          <li>Stok sayımı ve mutabakat için harcanan çalışma saatleri</li>
          <li>Kritik stok uyarısı olmadığı için kaçırılan satışlar</li>
          <li>Hazır stok yazılımı kullanılıyorsa aylık lisans ücretleri</li>
        </ul>
        <p>
          Bu maliyetler aylık hesaplandığında özel sistem genellikle{" "}
          <strong>6–12 ay içinde</strong> amortisman noktasına ulaşır.
        </p>

        <h2>Sıkça sorulan sorular</h2>

        <div className="faq-item">
          <h3>Barkod okuyucu veya raf etiketiyle entegre çalışabilir mi?</h3>
          <p>
            Evet. Mobil kamera veya USB barkod okuyucu ile stok giriş-çıkış işlemleri
            fiziksel olarak gerçekleştirilebilir. Bu özellik tasarım aşamasında kapsama
            eklenir.
          </p>
        </div>
        <div className="faq-item">
          <h3>Excel'deki özel formüllerimi sisteme taşıyabilir miyim?</h3>
          <p>
            Formüllerin mantığı analiz edilir ve sisteme fonksiyon olarak eklenir. Örneğin
            özel fiyat hesaplamaları, iskonto mantığı veya depo bazlı maliyet dağılımı
            sisteme yerleşik kural olarak tanımlanabilir.
          </p>
        </div>
        <div className="faq-item">
          <h3>Geçiş sırasında işletme aksamaz mı?</h3>
          <p>
            Paralel çalışma dönemi bu riski ortadan kaldırır. Sistem canlıya alınmadan önce
            ekip eğitimi tamamlanır; geçiş, iş yoğunluğunun düşük olduğu bir dönemde
            planlanır.
          </p>
        </div>

        <hr />

        <div className="callout">
          <p style={{ margin: 0 }}>
            <strong>Excel'den ne zaman geçmeniz gerektiğini birlikte değerlendirelim.</strong>
            <br />
            30 dakikalık ücretsiz görüşmede mevcut Excel yapınızı analiz ediyor,
            özel sistem için net kapsam ve takvim sunuyoruz.{" "}
            <Link href="/iletisim" className="text-accent underline underline-offset-2">
              Görüşme talep edin →
            </Link>
          </p>
        </div>

        <p>
          <Link href="/cozumler/stok-cari-tahsilat" className="text-accent underline underline-offset-2">
            Stok ve cari hesap takip sistemi hizmetimizi inceleyin →
          </Link>
        </p>
      </ArticleLayout>
    </>
  );
}
