import { buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { siteConfig } from "@/data/config";

export const metadata = buildPageMetadata({
  title: "WhatsApp ile İş Takibi Neden Yanlış? — Albanexa",
  description:
    "WhatsApp grubunda sipariş, görev ve müşteri takibi neden işletmelere zarar verir? 7 kritik sorun ve profesyonel alternatif.",
  path: "/rehber/whatsapp-is-takibi-neden-yanlis",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${siteConfig.siteUrl}/rehber/whatsapp-is-takibi-neden-yanlis#article`,
  "headline": "WhatsApp ile İş Takibi Neden Yanlış?",
  "description":
    "WhatsApp grubunda sipariş, görev ve müşteri takibi neden işletmelere zarar verir? 7 kritik sorun ve profesyonel alternatif.",
  "datePublished": "2026-07-31",
  "dateModified": "2026-07-31",
  "author": { "@id": `${siteConfig.siteUrl}/#person` },
  "publisher": { "@id": `${siteConfig.siteUrl}/#organization` },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${siteConfig.siteUrl}/rehber/whatsapp-is-takibi-neden-yanlis`,
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Rehber", "item": `${siteConfig.siteUrl}/rehber` },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "WhatsApp ile İş Takibi Neden Yanlış?",
        "item": `${siteConfig.siteUrl}/rehber/whatsapp-is-takibi-neden-yanlis`,
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.siteUrl}/rehber/whatsapp-is-takibi-neden-yanlis#faq`,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "WhatsApp iş yönetimi için neden yetersizdir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "WhatsApp mesajları kaybolur, aranmaz ve raporlanamaz. Kimin hangi işten sorumlu olduğu belirsizleşir; tamamlanan işler diğer mesajların altında kalır. Geçmiş bir siparişi bulmak için onlarca mesaj kaydırmak gerekebilir. Birden fazla kişinin aynı konuya yanıt vermesiyle bilgi karmaşası oluşur. Yönetici tek ekrandan tüm işlerin durumunu göremez.",
      },
    },
    {
      "@type": "Question",
      "name": "WhatsApp Business WhatsApp'tan farkı nedir, yeterli midir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "WhatsApp Business müşteri iletişimini kolaylaştırır (katalog, hızlı yanıtlar, etiketler), ancak iç operasyon yönetimi için tasarlanmamıştır. Ekip içi görev dağılımı, iş emri takibi veya raporlama sunmaz. Müşteri iletişimi için kullanılabilir; iç iş takibi için yetersizdir.",
      },
    },
    {
      "@type": "Question",
      "name": "WhatsApp yerine ne kullanmalıyım?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "İşletmenin boyutuna ve ihtiyacına göre seçenekler değişir. Hazır araçlar (Trello, Asana, ClickUp) genel amaçlı görev yönetimi sunar. İşletmeye özel bir iş takip sistemi ise kendi terminolojinize, iş akışlarınıza ve raporlama ihtiyaçlarınıza göre tasarlanır; sektöre özgü süreçleri standart araçlardan çok daha iyi karşılar.",
      },
    },
    {
      "@type": "Question",
      "name": "WhatsApp'tan sisteme geçiş zor mudur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Geçiş teknik değil, alışkanlık meselesidir. WhatsApp'tan sisteme geçişin en büyük direnci 'herkes alışmış' engelidir. Ancak sistem mobil uyumlu ve sezgisel tasarlandığında çoğu ekip 1–2 haftada adapte olur. Geçiş eğitimi ve kısa bir paralel çalışma süreci bu geçişi sorunsuzlaştırır.",
      },
    },
  ],
};

export default function WhatsAppIsTakibiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout
        title="WhatsApp ile İş Takibi Neden Yanlış?"
        description="WhatsApp grubunda sipariş, görev ve müşteri takibi neden işletmelere zarar verir? 7 kritik sorun ve profesyonel alternatif."
        publishedAt="2026-07-31"
        readingTime={6}
        category="İş Takip & Operasyon Yönetimi"
      >
        <p>
          Türkiye'deki KOBİ'lerin büyük çoğunluğu işletme içi koordinasyonu WhatsApp
          grubuyla yönetiyor. Bu tercih anlaşılır: WhatsApp zaten kullanılıyor, ücretsiz
          ve kurulum gerektirmiyor. Ancak işletme büyüdükçe bu alışkanlık ciddi operasyonel
          hasara dönüşüyor.
        </p>

        <h2>WhatsApp iş takibinin 7 kritik sorunu</h2>

        <h3>1. Bilgi kaybolur, aranmaz</h3>
        <p>
          Bir müşterinin 3 ay önceki siparişine ya da geçen hafta verilen karara ulaşmak
          istediğinizde onlarca mesaj kaydırmanız gerekir. WhatsApp'ta arama sınırlıdır;
          eski bir kararı, talebi veya anlaşmayı bulmak dakikalar alabilir — ya da hiç bulunamaz.
        </p>

        <h3>2. Sorumluluk belirsizleşir</h3>
        <p>
          "Bu işi kim yapacak?" sorusu WhatsApp'ta çoğu zaman belirsiz kalır. Mesaj
          okunur ama yanıt verilmez; herkes diğerinin üstlendiğini düşünür. Sonuç:
          tamamlanmamış iş, kızgın müşteri, "ben görmedim" tartışması.
        </p>

        <h3>3. Durum takibi imkânsız</h3>
        <p>
          Yönetici olarak "şu an kaç açık iş var, hangisi gecikti?" sorusunu
          WhatsApp'ta yanıtlayamazsınız. Her siparişin hangi aşamada olduğunu görmek
          için her çalışana tek tek sormak gerekir.
        </p>

        <h3>4. Kişisel ve iş mesajları iç içe girer</h3>
        <p>
          Çalışan telefonunu değiştirdiğinde, izine çıktığında veya işten ayrıldığında
          iş geçmişi de onunla gider. WhatsApp hesabı kişiye bağlıdır, işletmeye değil.
        </p>

        <h3>5. Raporlama sıfırdır</h3>
        <p>
          Geçen ay kaç sipariş alındı? Hangi müşteri en çok iş üretiyor? Hangi çalışan
          en fazla görevi tamamladı? Bu soruların yanıtı WhatsApp'ta yok. Rapor
          hazırlamak için mesajları manüel saymak gerekir.
        </p>

        <h3>6. Müşteri bilgisi dağılır</h3>
        <p>
          Müşteriyle ilgili geçmiş konuşmalar farklı chatlerde (birebir, grup, başka
          grup) dağılır. Yeni başlayan bir çalışan müşterinin geçmişine ulaşamaz;
          her seferinde müşteriden aynı bilgiyi istenmek zorunda kalınır.
        </p>

        <h3>7. Güvenlik ve gizlilik riski</h3>
        <p>
          Müşteri bilgileri, fiyat teklifleri ve ticari kararlar kişisel telefonlardaki
          WhatsApp grubunda durmaktadır. Telefon kaybolduğunda, çalışan işten
          ayrıldığında veya telefon çalındığında bu veriler korumasız kalır.
        </p>

        <h2>WhatsApp Business yeterli mi?</h2>
        <p>
          WhatsApp Business, <em>müşteri iletişimi</em> için faydalı araçlar sunar:
          katalog, hızlı yanıtlar, durum etiketi. Ancak <em>iç operasyon yönetimi</em>{" "}
          için tasarlanmamıştır.
        </p>
        <table>
          <thead>
            <tr>
              <th>İhtiyaç</th>
              <th>WhatsApp Business</th>
              <th>İş Takip Sistemi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Müşteri mesajlaşması</td>
              <td>✓</td>
              <td>Entegre edilebilir</td>
            </tr>
            <tr>
              <td>Görev atama ve takip</td>
              <td>✗</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>İş emri durumu (Bekliyor / Devam / Tamam)</td>
              <td>✗</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Çalışan bazlı yük dağılımı</td>
              <td>✗</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Aylık performans raporu</td>
              <td>✗</td>
              <td>✓ (otomatik)</td>
            </tr>
            <tr>
              <td>Müşteri geçmişi tek ekranda</td>
              <td>✗</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Mobil erişim</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
          </tbody>
        </table>

        <h2>Ne zaman geçiş yapılmalı?</h2>
        <p>
          Şu belirtilerden ikisi yaşanıyorsa geçiş zamanı gelmiştir:
        </p>
        <ul>
          <li>Müşteriden "bu işi unuttunuz mu?" telefonu geliyor</li>
          <li>Çalışanlar hangi işi kimin yaptığı konusunda sık tartışıyor</li>
          <li>Ayın sonunda iş hacmini ve gelirleri manüel hesaplamak gerekiyor</li>
          <li>Yeni işe giren çalışan geçmiş bilgilere ulaşamıyor</li>
          <li>İzinli olan çalışanın WhatsApp'ındaki bilgilere erişilemiyor</li>
        </ul>

        <h2>Geçiş nasıl olur?</h2>
        <p>
          WhatsApp'tan sisteme geçişin en büyük engeli teknik değil, alışkanlıktır.
          Bunu aşmanın kanıtlanmış yolu:
        </p>
        <ol>
          <li>Sistem mobil uyumlu ve sezgisel tasarlanır — telefonda WhatsApp kadar kolay kullanılır</li>
          <li>Ekip 1 hafta boyunca hem WhatsApp hem sistemi paralel kullanır</li>
          <li>Yönetici sistemi aktif kullandığında ekip kendiliğinden uyum sağlar</li>
          <li>2. haftadan itibaren WhatsApp grubu yalnızca sosyal iletişime kalır</li>
        </ol>

        <div className="metric-card">
          <p style={{ margin: 0 }}>
            Albanexa'nın geliştirdiği <strong>Hezer Auto Service</strong> sisteminde
            araç servisi operasyonu tamamen WhatsApp ve kağıt iş emirlerinden dijitale
            taşındı. Araç geçmişine plaka numarasıyla{" "}
            <strong>saniyeler içinde</strong> ulaşılabiliyor; ekip üyeleri
            sorumlu oldukları işleri sistemden görüyor.
          </p>
        </div>

        <h2>Sıkça sorulan sorular</h2>

        <div className="faq-item">
          <h3>WhatsApp'taki eski iş geçmişini sisteme taşıyabilir miyim?</h3>
          <p>
            WhatsApp mesaj geçmişinin yapısal veriye dönüştürülmesi pratik değildir.
            Geçiş genellikle "sıfırdan başlama" şeklinde yapılır — yani açık işler
            sisteme girilir, tamamlananlar arşivde bırakılır.
          </p>
        </div>
        <div className="faq-item">
          <h3>Müşteriler bize hâlâ WhatsApp'tan ulaşabilir mi?</h3>
          <p>
            Evet. Müşteri iletişimi WhatsApp'ta devam edebilir; gelen talepler
            sisteme iş emri olarak kaydedilir. Bu entegrasyon otomatik veya
            yarı otomatik biçimde kurulabilir.
          </p>
        </div>

        <hr />

        <div className="callout">
          <p style={{ margin: 0 }}>
            <strong>WhatsApp grubunu kapatıp sisteme geçmeye hazır mısınız?</strong>
            <br />
            30 dakikalık ücretsiz görüşmede mevcut operasyonunuzu dinliyor,
            işletmenize uygun sistemi birlikte tasarlıyoruz.{" "}
            <Link href="/iletisim" className="text-accent underline underline-offset-2">
              Görüşme talep edin →
            </Link>
          </p>
        </div>

        <p>
          <Link href="/cozumler/is-takip-sistemleri" className="text-accent underline underline-offset-2">
            İş takip sistemi hizmetimizi inceleyin →
          </Link>
        </p>
      </ArticleLayout>
    </>
  );
}
