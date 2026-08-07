import { buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { siteConfig } from "@/data/config";

export const metadata = buildPageMetadata({
  title: "İş Takip Sistemi Nedir? KOBİ'ler İçin Kapsamlı Rehber",
  description:
    "İş takip sistemi nedir, hangi işletmeler için gereklidir, Excel ve WhatsApp'tan farkı nedir? Operasyonlarını dijitalleştirmek isteyen KOBİ'ler için eksiksiz rehber.",
  path: "/rehber/is-takip-sistemi-nedir-kobiler-icin",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${siteConfig.siteUrl}/rehber/is-takip-sistemi-nedir-kobiler-icin#article`,
  "headline": "İş Takip Sistemi Nedir? KOBİ'ler İçin Kapsamlı Rehber",
  "description":
    "İş takip sistemi nedir, hangi işletmeler için gereklidir, Excel ve WhatsApp'tan farkı nedir? Operasyonlarını dijitalleştirmek isteyen KOBİ'ler için eksiksiz rehber.",
  "datePublished": "2026-07-31",
  "dateModified": "2026-07-31",
  "author": { "@id": `${siteConfig.siteUrl}/#person` },
  "publisher": { "@id": `${siteConfig.siteUrl}/#organization` },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${siteConfig.siteUrl}/rehber/is-takip-sistemi-nedir-kobiler-icin`,
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Rehber", "item": `${siteConfig.siteUrl}/rehber` },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "İş Takip Sistemi Nedir?",
        "item": `${siteConfig.siteUrl}/rehber/is-takip-sistemi-nedir-kobiler-icin`,
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.siteUrl}/rehber/is-takip-sistemi-nedir-kobiler-icin#faq`,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "İş takip sistemi nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "İş takip sistemi, bir işletmenin sipariş, görev, servis talebi veya müşteri süreçlerini dijital ortamda kaydeden, ilerlemeyi izleyen ve ekip içinde koordinasyonu sağlayan yazılımdır. WhatsApp ve Excel gibi araçların karşılayamadığı çok kullanıcılı, gerçek zamanlı ve raporlanabilir bir operasyon altyapısı sunar.",
      },
    },
    {
      "@type": "Question",
      "name": "İş takip sistemi hangi işletmelere gereklidir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Birden fazla kişinin aynı siparişi, görevi veya müşteriyi takip etmesi gereken; sahada çalışan ekibi olan; tekrar eden iş emirleri üreten veya süreç geçmişine hızlıca ulaşmak isteyen her işletme iş takip sisteminden fayda sağlar. Özellikle servis, bakım, montaj, lojistik, üretim ve perakende sektörleri için kritiktir.",
      },
    },
    {
      "@type": "Question",
      "name": "Hazır iş takip yazılımı mı, özel sistem mi tercih edilmeli?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Hazır yazılımlar genel kullanım için tasarlandığından işletmenizin terminolojisine, fiyatlandırma mantığına veya sektörel akışlarına tam uymayabilir. Operasyonunuzun kendine özgü adımları varsa ve mevcut yazılımlara sürekli workaround üretiyorsanız özel sistem daha verimli ve uzun vadede daha uygun maliyetlidir.",
      },
    },
    {
      "@type": "Question",
      "name": "İş takip sistemi ne kadar sürede kurulur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Kapsama bağlı olarak temel iş takip modülü 4–8 haftada tamamlanabilir. Fatura, stok, cari hesap veya saha ekibi özellikleri eklendikçe süre 10–16 haftaya uzayabilir. Net takvim ve bütçe, iş akışları analiz edilerek ilk görüşmede belirlenir.",
      },
    },
  ],
};

export default function IsTakipSistemiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout
        title="İş Takip Sistemi Nedir? KOBİ'ler İçin Kapsamlı Rehber"
        description="İş takip sistemi nedir, hangi işletmeler için gereklidir, Excel ve WhatsApp'tan farkı nedir? Operasyonlarını dijitalleştirmek isteyen KOBİ'ler için eksiksiz rehber."
        publishedAt="2026-07-31"
        readingTime={8}
        category="İş Takip & Operasyon Yönetimi"
      >
        <p>
          <strong>İş takip sistemi</strong>, bir işletmenin sipariş, görev, servis talebi veya
          müşteri süreçlerini dijital ortamda kaydeden, ilerlemeyi izleyen ve ekip içinde
          koordinasyonu sağlayan yazılımdır. Büyüyen işletmelerde WhatsApp mesajları, kağıt
          iş emirleri ve Excel tabloları bu koordinasyonu artık karşılayamamaktadır.
        </p>

        <h2>İş takip sistemi neden gereklidir?</h2>
        <p>
          Operasyonu büyüyen bir işletmede şu soruların cevabı dakikalar içinde net olmalıdır:
        </p>
        <ul>
          <li>Müşterinin talebi hangi aşamada, kim sorumlu?</li>
          <li>Bugün tamamlanması gereken işler neler, hangisi gecikti?</li>
          <li>Geçen ay kaç sipariş alındı, kaçı zamanında teslim edildi?</li>
          <li>Belirli bir müşteriyle geçmişte ne yapıldı?</li>
        </ul>
        <p>
          Bu soruların yanıtı WhatsApp geçmişini karıştırmak veya Excel dosyası açmakla
          verildiğinde hem vakit kaybedilir hem de bilginin doğruluğu güvence altında olmaz.
        </p>

        <h2>İş takip sistemi ne yapar?</h2>
        <p>
          Temel bir iş takip sistemi şu işlevleri yerine getirir:
        </p>
        <ol>
          <li>
            <strong>Kayıt:</strong> Yeni sipariş, görev veya servis talebi sisteme girilir;
            müşteri bilgisi, ürün/hizmet detayı ve son teslim tarihi kaydedilir.
          </li>
          <li>
            <strong>Atama:</strong> İş, sorumlu kişiye veya ekibe atanır; otomatik bildirim gönderilir.
          </li>
          <li>
            <strong>İzleme:</strong> İş, aşamalar arasında ilerler (Bekliyor → Devam Ediyor → Tamamlandı).
            Yönetici panelden tüm işlerin durumunu anlık görür.
          </li>
          <li>
            <strong>Geçmiş:</strong> Her müşteriye ait tüm işlem geçmişi kayıt altında kalır;
            arama veya filtrelemeyle saniyeler içinde ulaşılır.
          </li>
          <li>
            <strong>Raporlama:</strong> Tamamlanan işler, gecikme oranları, ekip performansı
            ve müşteri bazlı iş hacmi otomatik raporlarla görülür.
          </li>
        </ol>

        <h2>Hangi işletmeler iş takip sistemine ihtiyaç duyar?</h2>
        <p>
          Aşağıdaki koşullardan birini yaşayan her işletme bu sisteme ihtiyaç duyar:
        </p>
        <table>
          <thead>
            <tr>
              <th>Belirti</th>
              <th>Sektör Örneği</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Birden fazla kişi aynı siparişi takip ediyor ama bilgiler çakışıyor</td>
              <td>Üretim, montaj, lojistik</td>
            </tr>
            <tr>
              <td>Müşteri araması "İşim nerede?" diye geliyor, kimse hemen yanıt veremiyor</td>
              <td>Servis, bakım, teknik destek</td>
            </tr>
            <tr>
              <td>Tamamlanan işler WhatsApp'ta kaybolup gidiyor</td>
              <td>Temizlik, güvenlik, alan hizmetleri</td>
            </tr>
            <tr>
              <td>Aylık performans raporunu elle hazırlamak saatler alıyor</td>
              <td>Tüm sektörler</td>
            </tr>
            <tr>
              <td>Saha ekibi nerede, hangi işi yapıyor bilinmiyor</td>
              <td>Teknik servis, kurulum, tamir</td>
            </tr>
          </tbody>
        </table>

        <h2>İş takip sistemi ile ERP arasındaki fark nedir?</h2>
        <p>
          ERP (Kurumsal Kaynak Planlaması), muhasebe, stok, üretim, insan kaynakları gibi
          onlarca modülü tek çatı altında toplayan geniş kapsamlı yazılımlardır. Maliyetleri
          yüksek, kurulum süreleri uzun ve kullanımları karmaşıktır.
        </p>
        <p>
          İş takip sistemi ise <strong>operasyonun tam ortasındaki koordinasyon sorununu</strong>{" "}
          çözmek için tasarlanmış, odaklanmış bir araçtır. KOBİ'ler için ERP'nin tüm ağırlığını
          taşımadan spesifik sorunu çözmek genellikle daha doğru bir başlangıç noktasıdır.
        </p>

        <h2>WhatsApp veya Excel ile iş takibinin sınırları</h2>
        <p>
          Çoğu KOBİ iş takibini WhatsApp grubu ve Excel tablosuyla başlatır. Bu yöntem
          5–10 işe kadar çalışabilir; ancak ölçek büyüdüğünde ciddi sorunlar ortaya çıkar:
        </p>
        <ul>
          <li>WhatsApp mesajları kaybolur, üstüne yorum düşüldüğünde eski karar görünmez olur</li>
          <li>Excel'i birden fazla kişi güncellediğinde versiyonlar çakışır</li>
          <li>Kimin hangi işten sorumlu olduğu bulanıklaşır</li>
          <li>Tarihsel veri analizi için manuel filtreleme yapılması gerekir</li>
          <li>Mobil kullanım pratik değildir; saha ekibi gerçek zamanlı güncelleme yapamaz</li>
        </ul>

        <h2>Gerçek örnek: Hezer Auto Service iş takip sistemi</h2>
        <div className="metric-card">
          <p style={{ margin: 0 }}>
            Albanexa'nın araç servisi için geliştirdiği{" "}
            <strong>Hezer Auto Service</strong> sisteminde tüm servis süreci
            kağıt iş emirleri ve WhatsApp koordinasyonundan dijital platforma taşındı.
            Araç geçmişine plaka numarasıyla{" "}
            <strong>saniyeler içinde</strong> ulaşılabiliyor; her iş emrinin
            hangi aşamada olduğu anlık görülüyor ve müşteriye otomatik bildirim gönderiliyor.
          </p>
        </div>

        <h2>Özel iş takip sistemi nasıl hazırlanır?</h2>
        <p>
          İşletmeye özel bir sistem şu adımlarla kurulur:
        </p>
        <ol>
          <li>
            <strong>İş akışı analizi:</strong> Mevcut süreçler, kullanılan terimler ve
            darboğazlar haritalanır.
          </li>
          <li>
            <strong>Modül tasarımı:</strong> Hangi özelliklerin önce hayata geçirileceği
            MVP kapsamında belirlenir.
          </li>
          <li>
            <strong>Geliştirme:</strong> Web tabanlı, mobil uyumlu sistem inşa edilir;
            kullanıcı rolleri ve yetki seviyeleri tanımlanır.
          </li>
          <li>
            <strong>Test ve yayın:</strong> Gerçek iş verileriyle test, ardından ekip eğitimi
            ve canlı kullanıma geçiş.
          </li>
          <li>
            <strong>Bakım ve geliştirme:</strong> Aylık güncelleme ve yeni modül eklemeleri
            planlanır.
          </li>
        </ol>

        <h2>Sıkça sorulan sorular</h2>

        <div className="faq-item">
          <h3>İş takip sistemi bulut tabanlı mı olmalı, yoksa şirket sunucusuna mı kurulmalı?</h3>
          <p>
            KOBİ'ler için bulut tabanlı (SaaS) yapı genellikle daha avantajlıdır: sunucu
            yönetimi gerekmez, mobil erişim kutudan çıkar ve bakım maliyeti düşüktür.
            Veri gizliliği açısından hassas sektörlerde özel sunucu seçeneği de değerlendirilebilir;
            ancak bu seçenek kurulum ve bakım maliyetini artırır.
          </p>
        </div>
        <div className="faq-item">
          <h3>Mevcut muhasebe veya fatura programıyla entegre çalışabilir mi?</h3>
          <p>
            Evet. API entegrasyonu ile Logo, Mikro, Netsis gibi muhasebe yazılımlarına veya
            e-fatura platformlarına bağlantı kurulabilir. Bu entegrasyon tasarım aşamasında
            kapsam olarak belirlenir.
          </p>
        </div>
        <div className="faq-item">
          <h3>Kaç kullanıcı aynı anda sistemi kullanabilir?</h3>
          <p>
            Kullanıcı sayısı sistem mimarisine göre esnek biçimde ölçeklenir. Başlangıçta
            5 kullanıcı olan bir işletme ilerleyen dönemde 50 kullanıcıya geçiş yapabilir;
            bu geçiş sistem yeniden yazılmadan gerçekleşir.
          </p>
        </div>

        <hr />

        <div className="callout">
          <p style={{ margin: 0 }}>
            <strong>İşletmenizin operasyonunu analiz etmek ister misiniz?</strong>
            <br />
            Albanexa, 30 dakikalık ücretsiz keşif görüşmesiyle mevcut iş akışlarınızı
            değerlendirip hangi modüllerin önce hayata geçirileceğini net biçimde ortaya koyar.{" "}
            <Link href="/iletisim" className="text-accent underline underline-offset-2">
              Görüşme talep edin →
            </Link>
          </p>
        </div>

        <p>
          <Link href="/cozumler/is-takip-sistemleri" className="text-accent underline underline-offset-2">
            İş takip sistemi hizmet sayfamızı inceleyin →
          </Link>
        </p>
      </ArticleLayout>
    </>
  );
}
