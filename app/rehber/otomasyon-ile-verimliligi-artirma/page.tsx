import { buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { siteConfig } from "@/data/config";

export const metadata = buildPageMetadata({
  title: "Operasyon Otomasyonu ile Verimliliği Artırma",
  description:
    "KOBİ'ler için tekrar eden iş süreçlerini otomatikleştirme rehberi. n8n ile e-posta bildirimleri, raporlar, stok uyarıları ve sistem entegrasyonları.",
  path: "/rehber/otomasyon-ile-verimliligi-artirma",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${siteConfig.siteUrl}/rehber/otomasyon-ile-verimliligi-artirma#article`,
  "headline": "Operasyon Otomasyonu ile Verimliliği Artırma: KOBİ Rehberi",
  "description":
    "KOBİ'ler için tekrar eden iş süreçlerini otomatikleştirme rehberi. n8n ile e-posta bildirimleri, raporlar, stok uyarıları ve sistem entegrasyonları.",
  "datePublished": "2026-07-31",
  "dateModified": "2026-07-31",
  "author": { "@id": `${siteConfig.siteUrl}/#person` },
  "publisher": { "@id": `${siteConfig.siteUrl}/#organization` },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${siteConfig.siteUrl}/rehber/otomasyon-ile-verimliligi-artirma`,
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Rehber", "item": `${siteConfig.siteUrl}/rehber` },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Operasyon Otomasyonu ile Verimlilik",
        "item": `${siteConfig.siteUrl}/rehber/otomasyon-ile-verimliligi-artirma`,
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.siteUrl}/rehber/otomasyon-ile-verimliligi-artirma#faq`,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "KOBİ'ler için otomasyon ne kadar karmaşık?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Temel otomasyon senaryoları (e-posta bildirimleri, günlük rapor gönderimi, stok uyarıları) teknik bilgi gerektirmez. n8n gibi araçlar görsel akış tasarımı sunar. Karmaşık entegrasyonlar (ERP, muhasebe, API bağlantıları) için geliştirici desteği gerekir.",
      },
    },
    {
      "@type": "Question",
      "name": "n8n nedir, işletmeme nasıl katkı sağlar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "n8n, görsel arayüzle iş akışları oluşturmanızı sağlayan açık kaynaklı bir otomasyon platformudur. E-posta gönderimi, veritabanı tetikleyicileri, API bağlantıları ve zamanlı görevler için kullanılabilir. Kendi sunucunuzda barındırılabilir, bu da maliyet avantajı ve veri güvenliği sağlar.",
      },
    },
    {
      "@type": "Question",
      "name": "Otomasyon için ne kadar bütçe gerekiyor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Basit otomasyon paketleri (3–5 iş akışı) 15.000–40.000 TL aralığında kurulabilir. Karmaşık entegrasyonlar ve çok sayıda sistem bağlantısı gerektiren projeler 60.000 TL ve üzerine çıkabilir. Uzun vadede insan işgücü maliyetine kıyasla hızla amorti olur.",
      },
    },
    {
      "@type": "Question",
      "name": "Hangi iş süreçleri otomasyona en uygun?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Tekrarlayan, kurallara dayalı ve manuel adım gerektiren süreçler otomasyon için idealdir: günlük stok raporları, ödeme hatırlatma e-postaları, yeni sipariş bildirimleri, haftalık satış özetleri, müşteri onboarding e-postaları ve düşük stok uyarıları.",
      },
    },
  ],
};

export default function OtomasyonVerimliligiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout
        title="Operasyon Otomasyonu ile Verimliliği Artırma: KOBİ Rehberi"
        description="KOBİ'ler için tekrar eden iş süreçlerini otomatikleştirme rehberi. n8n ile e-posta bildirimleri, raporlar, stok uyarıları ve sistem entegrasyonları."
        publishedAt="2026-07-31"
        readingTime={8}
        category="Operasyon & Otomasyon"
      >
        <p>
          Her gün aynı raporu hazırlamak, stok bitmeden önce birinden hatırlatma
          beklemek, müşteriye manuel olarak ödeme hatırlatması yazmak —
          bunların tamamı otomatikleştirilebilir. Bu rehber, KOBİ'lerin hangi
          süreçlerini otomasyona taşıyabileceğini ve nasıl başlayacağını
          açıklıyor.
        </p>

        <h2>Otomasyon nedir, robotik sistemlerden farkı ne?</h2>
        <p>
          İş süreci otomasyonu, insan müdahalesi olmadan tekrarlayan görevlerin
          belirli kurallara göre yürütülmesidir. Fabrika robotiğiyle karıştırılmamalıdır
          — burada konuştuğumuz, yazılım sistemleri arasındaki veri akışı ve
          bildirim süreçlerinin otomasyonudur.
        </p>
        <p>
          Örnek: "Stok 10 adedin altına düştüğünde sorumlu ekip üyesine
          WhatsApp mesajı gönder ve tedarikçiye e-posta at." Bu senaryoyu bir
          kez kurarsınız, sonrasında sistem sizin adınıza yürütür.
        </p>

        <h2>KOBİ'ler için en değerli otomasyon senaryoları</h2>

        <h3>1. Stok uyarı sistemi</h3>
        <p>
          Kritik ürünler belirli seviyenin altına düştüğünde anında bildirim
          alın. Tedarikçiye otomatik sipariş e-postası gönderilmesi de
          entegre edilebilir. Elde tutma fazlası ve stok kesintisi riskini
          aynı anda azaltır.
        </p>

        <h3>2. Günlük/haftalık rapor gönderimi</h3>
        <p>
          Her sabah 08:00'de önceki günün satış, tahsilat ve stok özetini
          e-posta veya WhatsApp ile alın. Raporu manuel hazırlamak için harcanan
          30–45 dakika kaybolur; veriler her sabah masanızda hazır olur.
        </p>

        <h3>3. Ödeme ve tahsilat hatırlatmaları</h3>
        <p>
          Vadesi dolmadan 3 gün, 1 gün ve vadesi geçtikten 3 gün sonra
          müşteriye otomatik hatırlatma gönderin. Kişiselleştirilmiş şablonlar
          kullanılabilir. Tahsilat süresi ortalama %30–50 kısalır.
        </p>

        <h3>4. Yeni müşteri karşılama akışı</h3>
        <p>
          Forma kayıt olan her yeni müşteriye sıralı karşılama e-postası
          gönderin: kayıt onayı → kullanım rehberi → 3. gün kontrol sorusu →
          7. gün demo daveti. Bu sırayı elle yürütmek yerine bir kez kurarsınız.
        </p>

        <h3>5. İş emri ve görev bildirimleri</h3>
        <p>
          Sisteme eklenen iş emri ilgili teknikere otomatik bildirim göndersin,
          tamamlandığında müşteriye SMS gitsin. İletişim koordinasyonundan
          kaynaklanan gecikmeler ortadan kalkar.
        </p>

        <h3>6. Muhasebe ve e-fatura entegrasyonu</h3>
        <p>
          Satış sisteminizde oluşturulan fatura otomatik olarak e-fatura
          platformuna iletilsin. Manuel veri girişi ortadan kalkar, hata
          riski sıfıra iner.
        </p>

        <h2>n8n ile otomasyon nasıl kurulur?</h2>
        <p>
          <strong>n8n</strong>, görsel akış tasarımıyla iş süreçlerini
          otomatikleştirmenizi sağlayan açık kaynaklı bir platformdur.
          400'den fazla entegrasyon desteğiyle e-posta, veritabanı, webhook,
          Slack, WhatsApp, Google Sheets ve daha fazlasına bağlanabilir.
        </p>
        <table>
          <thead>
            <tr>
              <th>Senaryo</th>
              <th>Tetikleyici</th>
              <th>Eylem</th>
              <th>Kazanım</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Stok uyarısı</td>
              <td>Stok ≤ 10 adet</td>
              <td>WhatsApp bildirimi</td>
              <td>Stok kesintisi önleme</td>
            </tr>
            <tr>
              <td>Günlük rapor</td>
              <td>Her gün 08:00</td>
              <td>E-posta özeti</td>
              <td>30 dk/gün tasarruf</td>
            </tr>
            <tr>
              <td>Ödeme hatırlatma</td>
              <td>Vade -3 gün</td>
              <td>SMS + e-posta</td>
              <td>Tahsilat hızlanması</td>
            </tr>
            <tr>
              <td>Fatura senkronizasyonu</td>
              <td>Yeni satış kaydı</td>
              <td>E-fatura oluşturma</td>
              <td>Sıfır manuel giriş</td>
            </tr>
            <tr>
              <td>İş emri bildirimi</td>
              <td>Yeni iş emri</td>
              <td>Tekniker SMS</td>
              <td>Koordinasyon tasarrufu</td>
            </tr>
          </tbody>
        </table>

        <h2>Otomasyon kurulmadan önce ne hazır olmalı?</h2>
        <p>
          Otomasyon mevcut kaosa düzen getirmez, düzeni hızlandırır. Süreçleriniz
          tanımlı değilse önce iş akışlarını yazıya dökmek gerekir. Ardından:
        </p>
        <ul>
          <li>Hangi veri nerede tutuluyor? (Excel, yazılım, kağıt)</li>
          <li>Hangi bildirimin kime gitmesi gerekiyor?</li>
          <li>Hangi koşullar gerçekleşince ne yapılmalı?</li>
        </ul>
        <p>
          Bu soruları yanıtlayabiliyorsanız, otomasyon için hazırsınız demektir.
        </p>

        <div className="metric-card">
          <p>
            <strong>Gerçek örnek:</strong> Hezer Auto Service
          </p>
          <p>
            Araç servis işletmesi için iş emri takip ve bildirim akışı kuruldu.
            Müşteriye araç teslim bildirimi, teknikere iş atama ve servis tamamlama
            onayı tamamen otomatik hale getirildi. Koordinasyon için harcanan
            günlük 45 dakika sıfırlandı.
          </p>
          <Link href="/projeler/hezer-auto-service" className="text-accent underline underline-offset-2 text-sm">
            Vaka çalışmasını gör →
          </Link>
        </div>

        <h2>Sıkça sorulan sorular</h2>

        <div className="faq-item">
          <h3>Mevcut yazılımım otomasyona uygun mu?</h3>
          <p>
            Çoğu modern yazılım webhook veya API desteği sunar; bu varsa
            entegrasyon mümkündür. Eski sistemler veya yerel kurulum yazılımlar
            daha karmaşık olabilir. İhtiyaç analizinde bunu değerlendirmek gerekir.
          </p>
        </div>
        <div className="faq-item">
          <h3>Otomasyon kurulunca bakım gerekiyor mu?</h3>
          <p>
            Basit akışlar genellikle bakım gerektirmez. Entegre sistemlerde API
            değişikliği veya kimlik bilgisi yenilemesi gibi durumlar güncelleme
            gerektirebilir. Düzenli kontrol, 3 ayda bir yeterlidir.
          </p>
        </div>
        <div className="faq-item">
          <h3>Veri güvenliği için self-hosted mi kullanılmalı?</h3>
          <p>
            Müşteri verileri ve finansal veriler işleniyorsa kendi sunucunuzda
            barındırılan n8n tercih edilir. Bu hem KVKK uyumu açısından hem
            de veri bağımlılığı riskini azaltmak açısından önemlidir.
          </p>
        </div>

        <hr />

        <div className="callout">
          <p style={{ margin: 0 }}>
            <strong>Hangi süreçlerinizin otomasyona hazır olduğunu öğrenmek ister misiniz?</strong>
            <br />
            30 dakikalık ücretsiz görüşmede mevcut iş akışlarınızı analiz edip
            en yüksek değer üretecek otomasyon senaryolarını belirliyoruz.{" "}
            <Link href="/iletisim" className="text-accent underline underline-offset-2">
              Görüşme talep edin →
            </Link>
          </p>
        </div>
      </ArticleLayout>
    </>
  );
}
