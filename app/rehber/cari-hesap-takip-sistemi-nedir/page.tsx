import { buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { siteConfig } from "@/data/config";

export const metadata = buildPageMetadata({
  title: "Cari Hesap Takip Sistemi Nedir? KOBİ'ler İçin Kapsamlı Rehber",
  description:
    "Cari hesap nedir, manuel takibin sorunları nelerdir, özel sistem ne kazandırır? Vadeli satış yapan KOBİ'ler için dijital cari hesap yönetimi rehberi.",
  path: "/rehber/cari-hesap-takip-sistemi-nedir",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${siteConfig.siteUrl}/rehber/cari-hesap-takip-sistemi-nedir#article`,
  "headline": "Cari Hesap Takip Sistemi Nedir? KOBİ'ler İçin Kapsamlı Rehber",
  "description":
    "Cari hesap nedir, manuel takibin sorunları nelerdir, özel sistem ne kazandırır? Vadeli satış yapan KOBİ'ler için dijital cari hesap yönetimi rehberi.",
  "datePublished": "2026-07-29",
  "dateModified": "2026-07-29",
  "author": { "@id": `${siteConfig.siteUrl}/#person` },
  "publisher": { "@id": `${siteConfig.siteUrl}/#organization` },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${siteConfig.siteUrl}/rehber/cari-hesap-takip-sistemi-nedir`,
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Rehber", "item": `${siteConfig.siteUrl}/rehber` },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Cari Hesap Takip Sistemi Nedir?",
        "item": `${siteConfig.siteUrl}/rehber/cari-hesap-takip-sistemi-nedir`,
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.siteUrl}/rehber/cari-hesap-takip-sistemi-nedir#faq`,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Cari hesap nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Cari hesap, bir işletmenin müşterileri veya tedarikçileriyle gerçekleştirdiği alış-veriş, ödeme ve borç işlemlerinin kronolojik kaydını tutan hesaptır. Vadeli satış yapan işletmelerde her müşterinin toplam alımı, yapılan ödemeler ve kalan bakiyesi cari hesap üzerinden izlenir.",
      },
    },
    {
      "@type": "Question",
      "name": "Cari hesap takip sistemi ne işe yarar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Cari hesap takip sistemi, müşteri bazında bakiye, vade ve ödeme geçmişini anlık olarak gösterir; geciken tahsilatlar için otomatik uyarı üretir; müşteriye tek tıkla hesap ekstresi gönderir ve işletmenin tahsilat sağlığını raporlar. Manuel defter veya Excel'in yapamadığı anlık görünürlüğü ve otomasyon katmanını sağlar.",
      },
    },
    {
      "@type": "Question",
      "name": "Muhasebe programı ile cari hesap takip sistemi arasındaki fark nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Muhasebe programları yasal yükümlülükler (fatura, beyanname, defter) için tasarlanmıştır ve muhasebeci odaklıdır. Özel bir cari hesap takip sistemi ise satış ekibinin ve işletme sahibinin günlük operasyonda kullandığı, işletmenin terminolojisine ve iş akışına göre tasarlanmış bir araçtır. İkisi birbirini tamamlar ama aynı ihtiyacı karşılamaz.",
      },
    },
    {
      "@type": "Question",
      "name": "Vadeli satışlarda tahsilat takibi nasıl dijitalleştirilir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Her satış işlemi sisteme girildiğinde müşteri hesabına borç olarak düşer; yapılan ödeme sisteme kaydedildiğinde bakiye güncellenir. Vade tarihi yaklaşan veya geçen alacaklar için otomatik uyarı oluşturulur. İşletme sahibi günlük açık bakiye listesini görerek tahsilat önceliğini belirler.",
      },
    },
  ],
};

export default function CariHesapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout
        title="Cari Hesap Takip Sistemi Nedir? KOBİ'ler İçin Kapsamlı Rehber"
        description="Cari hesap nedir, manuel takibin sorunları nelerdir, özel sistem ne kazandırır? Vadeli satış yapan KOBİ'ler için dijital cari hesap yönetimi rehberi."
        publishedAt="2025-07-29"
        readingTime={6}
        category="Finans & Tahsilat Yönetimi"
      >
        <p>
          <strong>Cari hesap takip sistemi</strong>, müşteri bazında alım, ödeme ve bakiye
          hareketlerini anlık olarak kaydeden ve raporlayan yazılımdır. Vadeli satış yapan
          işletmelerde her müşterinin kalan borcu, ödeme geçmişi ve vade tarihleri tek ekranda
          görünür hale gelir. Manuel defter veya Excel'in sağlayamadığı anlık görünürlük ve
          otomatik uyarı altyapısını sunar.
        </p>

        <h2>Cari hesap nedir?</h2>
        <p>
          Cari hesap, bir işletmenin müşterileri veya tedarikçileriyle yürüttüğü alış-veriş,
          ödeme ve borç işlemlerinin kronolojik kaydıdır. Toptan veya perakende vadeli satış
          yapan her işletmenin fiilen tuttuğu bu hesap; kimin ne kadar borcu olduğunu, hangi
          ödemenin yapıldığını ve hangi alacağın vadesi geçtiğini gösterir.
        </p>
        <p>
          Küçük ölçekte deftere yazılan bu bilgiler, işletme büyüdükçe onlarca hatta yüzlerce
          müşteri satırına dönüşür. Bu noktada manuel yöntem hem hata üretmeye başlar hem de
          yöneticinin zamanının büyük bölümünü tüketir.
        </p>

        <h2>Manuel cari hesap takibinin sorunları</h2>
        <p>
          Defter veya Excel'de yürütülen cari hesap takibi büyüyen işletmede kaçınılmaz
          olarak şu sorunları üretir:
        </p>
        <ul>
          <li>
            <strong>Anlık bakiye bilinmez:</strong> Herhangi bir müşterinin güncel borcunu
            öğrenmek için sayfaları tek tek toplamak gerekir.
          </li>
          <li>
            <strong>Vadesi geçen alacaklar gözden kaçar:</strong> Takip tamamen kullanıcı
            hafızasına dayandığından gecikmeli tahsilat sessizce birikir.
          </li>
          <li>
            <strong>Ekstre hazırlamak uzun sürer:</strong> Müşteriye hesap özeti çıkarmak
            onlarca satırı manuel toplamayı gerektirir; bu süre bazen saatlere ulaşır.
          </li>
          <li>
            <strong>Veri tutarsızlığı riski:</strong> Birden fazla kişi aynı dosyayı
            güncellediğinde çakışma ve kayıp kaçınılmazdır.
          </li>
          <li>
            <strong>Raporlama yapılamaz:</strong> "Bu ay en çok tahsilat hangi müşteriden
            geldi?" gibi sorular manuel sistemde yanıtsız kalır.
          </li>
        </ul>

        <h2>Cari hesap takip sistemi nasıl çalışır?</h2>
        <p>
          Dijital bir cari hesap takip sistemi aşağıdaki akışı otomatikleştirir:
        </p>
        <ol>
          <li>
            Satış gerçekleştiğinde müşteri cari hesabına borç kaydedilir.
          </li>
          <li>
            Ödeme alındığında bakiye güncellenir; ödeme yöntemi ve tarihi loglanır.
          </li>
          <li>
            Vade tarihi yaklaşan alacaklar için sistem otomatik uyarı üretir.
          </li>
          <li>
            Müşteriye tek tıkla PDF hesap ekstresi oluşturulur ve paylaşılır.
          </li>
          <li>
            Yönetici, günlük açık bakiye listesi ve geciken alacak raporuyla
            tahsilat önceliğini belirler.
          </li>
        </ol>

        <h2>Muhasebe programı mı, özel cari hesap sistemi mi?</h2>
        <table>
          <thead>
            <tr>
              <th>Muhasebe Programı</th>
              <th>Özel Cari Hesap Sistemi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Yasal yükümlülükler için tasarlanmış (fatura, beyanname)</td>
              <td>Günlük operasyon ve tahsilat yönetimi için tasarlanmış</td>
            </tr>
            <tr>
              <td>Muhasebeci odaklı arayüz</td>
              <td>Satış ekibi ve işletme sahibi odaklı arayüz</td>
            </tr>
            <tr>
              <td>Genel terminoloji</td>
              <td>İşletmenin kendi dili ve kategorileri</td>
            </tr>
            <tr>
              <td>WhatsApp veya e-posta ile ekstre paylaşımı zordur</td>
              <td>Tek tıkla PDF oluşturma ve paylaşım akışı</td>
            </tr>
            <tr>
              <td>Vade uyarısı sınırlı veya yok</td>
              <td>Otomatik vade ve gecikme uyarısı</td>
            </tr>
          </tbody>
        </table>
        <p>
          İkisi birbirini dışlamaz; muhasebe programı yasal süreçler için, özel cari hesap
          sistemi ise günlük ticari takip için ayrı ayrı kullanılabilir.
        </p>

        <h2>Vadeli satışlarda tahsilat nasıl dijitalleştirilir?</h2>
        <p>
          Vadeli satışın dijital takibinde en kritik üç nokta şunlardır:
        </p>
        <ul>
          <li>
            <strong>Vade tarihi tanımı:</strong> Her satış kaydına vade tarihi ve ödeme
            koşulu eklenir; sistem vadesi gelen alacakları otomatik işaretler.
          </li>
          <li>
            <strong>Kısmi ödeme izleme:</strong> Müşteri taksitli ödeme yapıyorsa her
            taksit ayrı ayrı kaydedilir; kalan bakiye anlık güncellenir.
          </li>
          <li>
            <strong>İletişim entegrasyonu:</strong> Geciken alacak için WhatsApp veya
            e-posta üzerinden müşteriye hesap özeti gönderilebilir.
          </li>
        </ul>

        <h2>Gerçek örnek: StokApp ile tahsilat sürecinde kazanımlar</h2>
        <div className="metric-card">
          <p style={{ margin: 0 }}>
            Albanexa'nın toptan ticaret işletmesi için geliştirdiği{" "}
            <strong>StokApp</strong> uygulamasında hesap ekstresi hazırlama süresi{" "}
            <strong>2 saatten 30 saniyeye</strong> indi. Vade uyarıları sayesinde
            geciken alacaklar eskiye kıyasla çok daha erken tespit edilir ve
            tahsilat önceliklendirilir hale geldi.
          </p>
        </div>

        <h2>Sıkça sorulan sorular</h2>

        <div className="faq-item">
          <h3>Sistemde kaç müşteri tanımlanabilir?</h3>
          <p>
            Özel geliştirilen bir sistemde müşteri sayısına teknik bir üst sınır
            getirilmez. Veritabanı mimarisi baştan ölçeklenebilir biçimde kurulur;
            yüzlerce veya binlerce müşteri kaydı sorunsuz yönetilebilir.
          </p>
        </div>
        <div className="faq-item">
          <h3>Mevcut defter veya Excel'deki cari veriler aktarılabilir mi?</h3>
          <p>
            Evet. Mevcut kayıtlar veri temizleme ve standartlaştırma adımından
            geçirilerek yeni sisteme aktarılır. Geçmiş işlem geçmişi korunur;
            açık bakiyeler doğru biçimde devralınır.
          </p>
        </div>
        <div className="faq-item">
          <h3>Stok sistemiyle entegre çalışabilir mi?</h3>
          <p>
            Evet. Satış işlemi kaydedildiğinde hem stok hareketi hem de cari
            hesap otomatik olarak güncellenir. Bu entegrasyon veri tutarsızlığını
            ortadan kaldırır ve çift giriş ihtiyacını sona erdirir.
          </p>
        </div>

        <hr />

        <div className="callout">
          <p style={{ margin: 0 }}>
            <strong>Cari hesap takibinizi dijitalleştirmek istiyor musunuz?</strong>
            <br />
            Albanexa, 30 dakikalık ücretsiz keşif görüşmesiyle mevcut tahsilat
            sürecinizi analiz edip ihtiyaca özel sistem kapsamını belirlemektedir.{" "}
            <Link href="/iletisim" className="text-accent underline underline-offset-2">
              Görüşme talep edin →
            </Link>
          </p>
        </div>
      </ArticleLayout>
    </>
  );
}
