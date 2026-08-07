import { buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { siteConfig } from "@/data/config";

export const metadata = buildPageMetadata({
  title: "İzmir'de Yazılım Firması Nasıl Seçilir?",
  description:
    "İzmir'deki KOBİ'ler için yazılım geliştirme firması veya bağımsız geliştirici seçerken sorulması gereken sorular, karşılaştırma kriterleri ve sık yapılan hatalar.",
  path: "/rehber/izmir-yazilim-gelistirme-firmalari",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${siteConfig.siteUrl}/rehber/izmir-yazilim-gelistirme-firmalari#article`,
  "headline": "İzmir'de Yazılım Geliştirme: Doğru Firma Nasıl Seçilir?",
  "description":
    "İzmir'deki KOBİ'ler için yazılım geliştirme firması veya bağımsız geliştirici seçerken sorulması gereken sorular, karşılaştırma kriterleri ve sık yapılan hatalar.",
  "datePublished": "2026-07-31",
  "dateModified": "2026-07-31",
  "author": { "@id": `${siteConfig.siteUrl}/#person` },
  "publisher": { "@id": `${siteConfig.siteUrl}/#organization` },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${siteConfig.siteUrl}/rehber/izmir-yazilim-gelistirme-firmalari`,
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Rehber", "item": `${siteConfig.siteUrl}/rehber` },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "İzmir Yazılım Firması Seçimi",
        "item": `${siteConfig.siteUrl}/rehber/izmir-yazilim-gelistirme-firmalari`,
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.siteUrl}/rehber/izmir-yazilim-gelistirme-firmalari#faq`,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "İzmir'de yazılım geliştirme firması mı, freelancer mı tercih edilmeli?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Orta ölçekli KOBİ projeleri için deneyimli bir bağımsız geliştirici genellikle daha avantajlıdır: daha düşük overhead maliyet, doğrudan iletişim ve gerçek hesap verebilirlik. Büyük kurumsal projeler veya çok sayıda paralel modül gerektirenler için ajans yapısı düşünülebilir.",
      },
    },
    {
      "@type": "Question",
      "name": "İzmir'deki yazılım firmalarının fiyatları nasıl?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "İzmir'de KOBİ odaklı özel yazılım geliştirme maliyeti kapsama göre 30.000 TL'den başlayıp 300.000 TL'nin üzerine çıkabilir. Bağımsız geliştiriciler genellikle %20–40 daha uygun fiyatlıdır ancak kapasite sınırı vardır.",
      },
    },
    {
      "@type": "Question",
      "name": "Yazılım firmasıyla sözleşme nasıl yapılmalı?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Sabit kapsamlı projeler için sabit fiyat sözleşmesi tercih edilmelidir. Sözleşmede kapsam, teslim tarihi, ödeme planı, kaynak kod sahipliği ve garanti süresi açıkça yer almalıdır. Kapsamı belirsiz projelerde zaman ve malzeme modeli kullanılabilir ama bütçe riski yüksektir.",
      },
    },
    {
      "@type": "Question",
      "name": "Yazılım projesi bittikten sonra kim bakacak?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Proje tesliminden önce bakım anlaşmasını netleştirmeniz kritiktir. Aylık bakım ücreti, kapsam ve yanıt süresi sözleşmede tanımlanmalıdır. Kaynak kod size ait değilse bakım sürekli bağımlılık yaratır; bu nedenle kaynak kod sahipliğini baştan talep edin.",
      },
    },
  ],
};

export default function IzmirYazilimGelistirmeFiremalariPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout
        title="İzmir'de Yazılım Geliştirme: Doğru Firma Nasıl Seçilir?"
        description="İzmir'deki KOBİ'ler için yazılım geliştirme firması veya bağımsız geliştirici seçerken sorulması gereken sorular, karşılaştırma kriterleri ve sık yapılan hatalar."
        publishedAt="2026-07-31"
        readingTime={7}
        category="Yazılım Seçimi & Strateji"
      >
        <p>
          İzmir'de yazılım geliştiren onlarca firma ve yüzlerce freelancer var.
          Fiyat aralıkları 3 kata kadar farklılık gösteriyor, teklifler
          birbirinden kopuk, referanslar kısmi. Bu rehber, hangisini seçeceğinizi
          değil <strong>nasıl seçeceğinizi</strong> anlatıyor.
        </p>

        <h2>Önce seçenek türlerini anlayın</h2>

        <h3>Büyük ajanslar</h3>
        <p>
          İzmir'de 10+ çalışanlı yazılım ajansları genellikle büyük kurumsal
          müşterilere odaklanır. KOBİ projeleri zaman zaman junior geliştiricilere
          devredilir, proje yönetim katmanları iletişimi yavaşlatır.
          Fiyatlar yüksek, ancak referans portföyü geniş olabilir.
        </p>

        <h3>Küçük yazılım şirketleri (2–5 kişi)</h3>
        <p>
          KOBİ'ler için en dengeli seçenek olabilir. Ajansa kıyasla daha düşük
          overhead, daha doğrudan iletişim. Ancak kapasite sınırı vardır; proje
          yoğunlaşırsa ek iş kabul etmeyebilirler.
        </p>

        <h3>Bağımsız geliştiriciler / stüdyolar</h3>
        <p>
          Tek kişi veya küçük ortaklık yapısı. Doğrudan hesap verebilirlik,
          esnek fiyatlandırma, iş süreçlerine odaklanma kapasitesi. Risk: bant
          genişliği sınırlı; çok büyük projelerde yetersiz kalabilir.
        </p>

        <h2>Seçim sürecinde sorulması gereken 7 soru</h2>

        <h3>1. Referanslarınıza ulaşabilir miyim?</h3>
        <p>
          Web sitesindeki logo listesi yeterli değildir. Gerçek müşteri referansı
          isteyin — tercihen benzer sektörden veya benzer kapsam büyüklüğünde.
          Referansı arayın, "projeyi zamanında teslim etti mi?" diye sorun.
        </p>

        <h3>2. Kaynak kod kime ait olacak?</h3>
        <p>
          Bazı firmalar kaynak kodu teslim etmez, aylık kiralama modeline
          yönlendirir. Sözleşmede kaynak kodun teslim tarihi ve formatı açıkça
          belirlenmelidir. Bu madde yoksa imzalamayın.
        </p>

        <h3>3. Projeyi kim geliştirecek?</h3>
        <p>
          Ajansla görüşürken "ben yapacağım" diyen kişi ile gerçekten kodu yazan
          kişinin aynı olup olmadığını sorun. Stajyer veya taşeron kullanılıp
          kullanılmadığını netleştirin.
        </p>

        <h3>4. Test ve kabul süreci nasıl işleyecek?</h3>
        <p>
          Teslim öncesi test protokolü olmayan projelerde hatalar canlıya
          taşınır. Manuel test planı, hata bildirimi süreci ve düzeltme süresi
          garantisi sorgulanmalıdır.
        </p>

        <h3>5. Proje dışında çıkan işler nasıl faturalanıyor?</h3>
        <p>
          "Küçük bir ek istek" tanımı muğlak kalırsa her değişiklik ayrı fatura
          üretebilir. Kapsam dışı işlerin nasıl fiyatlandırılacağı sözleşmede
          tanımlı olmalıdır.
        </p>

        <h3>6. Teslimden sonra ne kadar garanti süresi var?</h3>
        <p>
          30–90 günlük hata garanti süresi standart kabul edilir. Bu sürede
          bulunan hataların ücretsiz düzeltileceği yazılı olmalıdır.
        </p>

        <h3>7. İletişim kanalı ne, yanıt süresi kaç saat?</h3>
        <p>
          Proje boyunca bildirim alıp almayacağınızı, haftalık durum güncelleme
          yapılıp yapılmadığını ve acil sorunlarda yanıt süresini netleştirin.
        </p>

        <h2>Karşılaştırma tablosu: Türler arası fark</h2>
        <table>
          <thead>
            <tr>
              <th>Kriter</th>
              <th>Büyük Ajans</th>
              <th>Küçük Şirket</th>
              <th>Bağımsız Stüdyo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Maliyet</td>
              <td>Yüksek</td>
              <td>Orta</td>
              <td>Orta–Düşük</td>
            </tr>
            <tr>
              <td>İletişim</td>
              <td>Dolaylı (PM üzerinden)</td>
              <td>Çoğunlukla doğrudan</td>
              <td>Tamamen doğrudan</td>
            </tr>
            <tr>
              <td>KOBİ odağı</td>
              <td>Sınırlı</td>
              <td>Orta</td>
              <td>Yüksek</td>
            </tr>
            <tr>
              <td>Esneklik</td>
              <td>Düşük</td>
              <td>Orta</td>
              <td>Yüksek</td>
            </tr>
            <tr>
              <td>Kapasite</td>
              <td>Yüksek</td>
              <td>Orta</td>
              <td>Sınırlı</td>
            </tr>
            <tr>
              <td>Referans portfolio</td>
              <td>Geniş</td>
              <td>Orta</td>
              <td>Dar–Derinlikli</td>
            </tr>
          </tbody>
        </table>

        <h2>Sık yapılan hatalar</h2>
        <ul>
          <li>
            <strong>En düşük teklifi seçmek:</strong> Kapsam netleşmemişse
            ucuz teklifin üzerine ek faturalar eklenir; toplam gerçek maliyet
            en yüksek rakamı geçebilir.
          </li>
          <li>
            <strong>Referans kontrolü yapmamak:</strong> Web sitesindeki
            müşteri listesi doğrulanamaz. Telefon numarası alıp aramak 10
            dakika sürer, saatler kazandırır.
          </li>
          <li>
            <strong>Sadece fiyat üzerinden karar vermek:</strong> Maliyet
            önemlidir ama kapsam anlayışı, iletişim kalitesi ve referans
            güvenilirliği daha belirleyicidir.
          </li>
          <li>
            <strong>Sözleşmeyi okumadan imzalamak:</strong> Kaynak kod mülkiyeti,
            ödeme planı ve kapsam dışı iş fiyatlandırması mutlaka okunmalıdır.
          </li>
        </ul>

        <div className="metric-card">
          <p>
            <strong>Albanexa referans projesi:</strong> StokApp
          </p>
          <p>
            İzmir'deki toptan ticaret işletmesi için stok, cari hesap ve
            tahsilat yönetim sistemi. Hesap ekstresi hazırlama süresi
            <strong> 2 saatten 30 saniyeye</strong> indi.
          </p>
          <Link href="/projeler/stockapp" className="text-accent underline underline-offset-2 text-sm">
            Vaka çalışmasını gör →
          </Link>
        </div>

        <h2>Sıkça sorulan sorular</h2>

        <div className="faq-item">
          <h3>Uzaktan çalışan bir geliştiriciyle İzmir'den nasıl koordinasyon sağlanır?</h3>
          <p>
            Video görüşmeleri, proje yönetim araçları (Notion, Linear, Jira)
            ve düzenli haftalık güncellemelerle uzaktan koordinasyon yüz yüze
            kadar verimli olabilir. Kritik olan netlik ve yanıt hızıdır, fiziksel
            konum değil.
          </p>
        </div>
        <div className="faq-item">
          <h3>Teklif toplarken kaç firmadan fiyat almalıyım?</h3>
          <p>
            3 farklı kaynaktan teklif almak kıyaslama için idealdir. Daha
            fazlası zaman kaybına yol açar. Teklifleri karşılaştırırken kapsam
            anlayışını ve referans kalitesini fiyatın önüne koyun.
          </p>
        </div>
        <div className="faq-item">
          <h3>Projeyi izmir dışı bir firmaya yaptırabilir miyim?</h3>
          <p>
            Evet. Fiziksel konum yazılım projelerinde kritik değildir. Türkiye
            genelinde veya uluslararası alanda da çalışılabilir. Saat dilimi
            farkı ve iletişim dili dışında teknik bir fark yoktur.
          </p>
        </div>

        <hr />

        <div className="callout">
          <p style={{ margin: 0 }}>
            <strong>İzmir'deki işletmeniz için ihtiyaç analizi yapmak ister misiniz?</strong>
            <br />
            30 dakikalık ücretsiz görüşmede projenizin kapsamını belirleyip
            gerçekçi bütçe aralığı paylaşıyorum. Taahhüt yok, sürpriz yok.{" "}
            <Link href="/iletisim" className="text-accent underline underline-offset-2">
              Görüşme talep edin →
            </Link>
          </p>
        </div>
      </ArticleLayout>
    </>
  );
}
