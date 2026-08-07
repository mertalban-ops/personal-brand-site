import { buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { siteConfig } from "@/data/config";

export const metadata = buildPageMetadata({
  title: "Web Uygulaması Nedir, Ne İşe Yarar?",
  description:
    "Web sitesi ile web uygulaması arasındaki fark nedir? Hangi işletmeler web uygulamasına ihtiyaç duyar? KOBİ'ler için kapsamlı açıklama ve karar rehberi.",
  path: "/rehber/web-uygulamasi-nedir-ne-ise-yarar",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${siteConfig.siteUrl}/rehber/web-uygulamasi-nedir-ne-ise-yarar#article`,
  "headline": "Web Uygulaması Nedir, Ne İşe Yarar?",
  "description":
    "Web sitesi ile web uygulaması arasındaki fark nedir? Hangi işletmeler web uygulamasına ihtiyaç duyar? KOBİ'ler için kapsamlı açıklama ve karar rehberi.",
  "datePublished": "2026-07-31",
  "dateModified": "2026-07-31",
  "author": { "@id": `${siteConfig.siteUrl}/#person` },
  "publisher": { "@id": `${siteConfig.siteUrl}/#organization` },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${siteConfig.siteUrl}/rehber/web-uygulamasi-nedir-ne-ise-yarar`,
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Rehber", "item": `${siteConfig.siteUrl}/rehber` },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Web Uygulaması Nedir?",
        "item": `${siteConfig.siteUrl}/rehber/web-uygulamasi-nedir-ne-ise-yarar`,
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.siteUrl}/rehber/web-uygulamasi-nedir-ne-ise-yarar#faq`,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Web uygulaması ile web sitesi arasındaki temel fark nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Web sitesi genellikle tek yönlü bilgi sunar (katalog, portföy, iletişim). Web uygulaması ise kullanıcıların veri girdiği, işlem yaptığı ve sistemin gerçek zamanlı yanıt verdiği iki yönlü bir platformdur. Giriş ekranı, kullanıcı hesabı, rapor, form ve işlem akışları web uygulaması kapsamındadır.",
      },
    },
    {
      "@type": "Question",
      "name": "Native mobil uygulama mı, web uygulaması mı?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Çoğu KOBİ için mobil uyumlu web uygulaması yeterlidir ve %40–60 daha ucuzdur. Native mobil uygulama, cihaz kamerası, push bildirim veya offline mod gibi cihaz özelliklerine ihtiyaç duyulduğunda tercih edilir. İlk sürüm için web uygulamasıyla başlamak önerilir.",
      },
    },
    {
      "@type": "Question",
      "name": "Web uygulaması yaptırmak ne kadar sürer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Kapsama göre değişir. Temel bir panel (giriş, form, basit rapor) 4–6 haftada teslim edilebilir. Çok modüllü, entegrasyonlu sistemler 12–20 hafta gerektirebilir. Kapsam netleşmeden verilen süre tahmini güvenilmezdir.",
      },
    },
    {
      "@type": "Question",
      "name": "SaaS ürünü ile işletmeye özel web uygulaması farkı nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "İşletmeye özel web uygulaması yalnızca o işletme tarafından kullanılır, içeri alınan müşteri yoktur. SaaS ürünü ise birden fazla müşteri işletmenin kullandığı çok-kiracılı (multi-tenant) sistemdir. SaaS daha karmaşık altyapı gerektirir, ancak ölçeklendirme ve abonelik geliri potansiyeli sunar.",
      },
    },
  ],
};

export default function WebUygulamasiNedirPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout
        title="Web Uygulaması Nedir, Ne İşe Yarar?"
        description="Web sitesi ile web uygulaması arasındaki fark nedir? Hangi işletmeler web uygulamasına ihtiyaç duyar? KOBİ'ler için kapsamlı açıklama ve karar rehberi."
        publishedAt="2026-07-31"
        readingTime={7}
        category="Yazılım Geliştirme & Dijitalleşme"
      >
        <p>
          "Web uygulaması yaptırmak istiyoruz" diyen pek çok işletme aslında
          farklı şeyler kastediyor. Kimisi bir form sayfası, kimisi tam bir
          operasyon paneli, kimisi müşteri portalı hayal ediyor. Bu rehber,
          kavramı netleştiriyor ve işletmenizin gerçekten neye ihtiyacı
          olduğunu anlamanıza yardımcı oluyor.
        </p>

        <h2>Web uygulaması nedir?</h2>
        <p>
          Web uygulaması, tarayıcı üzerinden erişilen ancak bir işletim sistemi
          yazılımı gibi çalışan dijital sistemdir. Statik web sitesinden
          farkı, kullanıcının aktif olarak veri girdiği, sistemin bu veriye
          yanıt verdiği ve durumun kaydedildiği iki yönlü etkileşimdir.
        </p>
        <p>
          Tarayıcıdan açılan muhasebe yazılımı, stok yönetim paneli,
          müşteri portalı, iş emri takip ekranı — bunların tamamı web
          uygulamasıdır.
        </p>

        <h2>Web sitesi mi, web uygulaması mı?</h2>
        <table>
          <thead>
            <tr>
              <th>Özellik</th>
              <th>Web Sitesi</th>
              <th>Web Uygulaması</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Temel amaç</td>
              <td>Bilgi sunmak</td>
              <td>İşlem yaptırmak</td>
            </tr>
            <tr>
              <td>Kullanıcı girişi</td>
              <td>Genellikle yok</td>
              <td>Rol bazlı hesaplar</td>
            </tr>
            <tr>
              <td>Veri yönetimi</td>
              <td>Statik içerik</td>
              <td>Gerçek zamanlı veri</td>
            </tr>
            <tr>
              <td>Örnekler</td>
              <td>Katalog, portföy, blog</td>
              <td>Panel, CRM, stok, ERP</td>
            </tr>
            <tr>
              <td>Maliyet</td>
              <td>Düşük–Orta</td>
              <td>Orta–Yüksek</td>
            </tr>
            <tr>
              <td>Geliştirme süresi</td>
              <td>2–6 hafta</td>
              <td>4–20+ hafta</td>
            </tr>
          </tbody>
        </table>

        <h2>Hangi işletmeler web uygulamasına ihtiyaç duyar?</h2>

        <h3>Veri takip eden işletmeler</h3>
        <p>
          Stok, sipariş, müşteri borcu, iş emri, personel görevi — bunları
          Excel'de veya kağıtta takip eden her işletme, büyüdükçe web
          uygulamasına ihtiyaç duyar. Veri kaybolmaya, çakışmaya veya
          güncel kalmamaya başladığında bu ihtiyaç kritik hale gelir.
        </p>

        <h3>Farklı rollerde kullanıcıları olan işletmeler</h3>
        <p>
          Sahip, müdür, saha ekibi ve müşteri aynı sistemi farklı yetkilerle
          kullanmalıysa web uygulaması gereklidir. "Teknikerin görmemesi
          gereken fiyatlar var" veya "müşteri kendi siparişini takip etsin"
          gibi ihtiyaçlar rol yönetimi demektir.
        </p>

        <h3>Süreçleri standartlaştırmak isteyenler</h3>
        <p>
          "Herkes farklı yapıyor" sorununun tek kalıcı çözümü, sürecin
          tek bir sisteme alınmasıdır. Web uygulaması bu standardizasyonu
          sağlar; sözlü talimat veya WhatsApp mesajlarına bağımlılık kalkar.
        </p>

        <h3>Müşterilerine self-servis sunanlar</h3>
        <p>
          Müşteri kendi sipariş geçmişini, fatura durumunu veya hizmet
          talebini kendi panelinden takip edebilirse telefon trafiği azalır,
          müşteri memnuniyeti artar.
        </p>

        <h2>Web uygulamasının temel bileşenleri</h2>

        <h3>Kimlik doğrulama (Authentication)</h3>
        <p>
          Giriş ekranı, şifre yönetimi, oturum süresi. Rol bazlı erişim
          kontrolü: yönetici farklı, çalışan farklı, müşteri farklı ekranlar görür.
        </p>

        <h3>Veritabanı</h3>
        <p>
          Tüm verinin kalıcı olarak tutulduğu katman. PostgreSQL, MySQL veya
          bulut tabanlı çözümler (Supabase gibi) KOBİ projeleri için
          yaygın tercihlerdir.
        </p>

        <h3>API katmanı</h3>
        <p>
          Arayüz ile veritabanı arasındaki iletişimi yönetir. Ayrıca üçüncü
          taraf sistemlerle (muhasebe yazılımı, SMS, e-fatura) bağlantı
          bu katmandan sağlanır.
        </p>

        <h3>Arayüz (Frontend)</h3>
        <p>
          Kullanıcının gördüğü ve etkileşime girdiği ekranlar. Masaüstü ve
          mobil uyumlu tasarım, modern KOBİ projelerinde standart kabul edilir.
        </p>

        <h3>Raporlama ve dashboard</h3>
        <p>
          Yöneticilere özel grafik, özet tablo ve filtrelenebilir raporlar.
          KOBİ'ler için en yüksek değer bu bileşenden gelir: işletmenizin
          verisini anlık ve doğru okuyabilmek.
        </p>

        <h2>Teknoloji seçimi ne kadar önemli?</h2>
        <p>
          KOBİ'ler için teknoloji tercihi genellikle geliştiricide kalmalıdır.
          Bilmeniz gereken tek şey: modern, yaygın ve bakımı sürdürülen
          teknolojilerin kullanılması gerektiğidir. "Biz X teknolojiyle
          yapıyoruz" diyen bir geliştirici, neden tercih ettiğini açıklayabilmelidir.
        </p>
        <p>
          Albanexa projelerinde kullanılan temel stack: <strong>Next.js +
          TypeScript + Supabase + PostgreSQL</strong>. Hızlı geliştirme,
          güvenilir altyapı ve düşük bakım maliyeti dengesi bu tercihin
          arkasındaki nedendir.
        </p>

        <div className="metric-card">
          <p>
            <strong>Gerçek örnek:</strong> StokApp
          </p>
          <p>
            Toptan ticaret işletmesi için stok, cari hesap ve tahsilat
            yönetim web uygulaması. Birden fazla kullanıcı rol bazlı erişimle
            çalışıyor. Hesap ekstresi hazırlama süresi 2 saatten 30 saniyeye indi,
            müşteri bakiyeleri ve stok durumu anlık takip edilebilir hale geldi.
          </p>
          <Link href="/projeler/stockapp" className="text-accent underline underline-offset-2 text-sm">
            Vaka çalışmasını gör →
          </Link>
        </div>

        <h2>Web uygulaması için ne zaman hazırsınız?</h2>
        <p>
          Şu sorulardan 3 veya daha fazlasına "evet" diyorsanız web
          uygulaması ihtiyacı var demektir:
        </p>
        <ul>
          <li>Aynı veriyi birden fazla kişi güncelliyor mu?</li>
          <li>Excel dosyanız 5.000 satırı geçti mi?</li>
          <li>WhatsApp veya e-posta üzerinden iş takibi yapıyor musunuz?</li>
          <li>Müşterilerinize raporlama yapmak zaman mı alıyor?</li>
          <li>Yeni çalışanı eğitmek haftalar mı sürüyor?</li>
          <li>Kritik bilgiler yalnızca birinin aklında mı?</li>
        </ul>

        <h2>Sıkça sorulan sorular</h2>

        <div className="faq-item">
          <h3>Mobil uygulamayla ne farkı var?</h3>
          <p>
            Mobil uygulama App Store veya Google Play üzerinden indirilen native
            uygulamadır. Web uygulaması tarayıcıdan açılır, indirme gerekmez.
            Mobil uyumlu web uygulaması telefondan da kullanılabilir; bu nedenle
            çoğu KOBİ için native mobil uygulama gerekmez.
          </p>
        </div>
        <div className="faq-item">
          <h3>Hazır yazılım neden yeterli değil?</h3>
          <p>
            Hazır yazılımlar en yaygın kullanım senaryosuna göre tasarlanır.
            İşletmenizin spesifik iş akışı, raporlama ihtiyacı veya entegrasyon
            gereksinimleri farklılaştığı anda hazır yazılım ya ücretli modüller
            ister ya da o özelliği hiç sunamaz. Özel geliştirme bu boşluğu kapatır.
          </p>
        </div>
        <div className="faq-item">
          <h3>Web uygulamasına kimlerin erişeceğini nasıl kontrol ederim?</h3>
          <p>
            Rol bazlı erişim kontrolü (RBAC) ile her kullanıcı yalnızca
            yetkili olduğu bölümleri görebilir. Yönetici tam erişime sahipken
            saha çalışanı yalnızca kendi iş emirlerini, müşteri yalnızca
            kendi fatura ve sipariş geçmişini görür.
          </p>
        </div>

        <hr />

        <div className="callout">
          <p style={{ margin: 0 }}>
            <strong>İşletmeniz için hangi sistem gerekli? Birlikte değerlendirelim.</strong>
            <br />
            30 dakikalık ücretsiz görüşmede mevcut süreçlerinizi analiz edip
            web sitesi mi, web uygulaması mı yoksa başka bir çözüm mü
            gerektiğini netleştiriyoruz.{" "}
            <Link href="/iletisim" className="text-accent underline underline-offset-2">
              Görüşme talep edin →
            </Link>
          </p>
        </div>
      </ArticleLayout>
    </>
  );
}
