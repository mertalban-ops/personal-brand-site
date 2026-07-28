import { buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { siteConfig } from "@/data/config";

export const metadata = buildPageMetadata({
  title: "KOBİ'ler İçin Stok Takip Programı: Excel ve Hazır Yazılımın Ötesi — Albanexa",
  description:
    "Stok takip programı nedir, Excel neden yetersiz kalır, hazır yazılım ile özel sistem arasındaki fark nedir? KOBİ'ler için kapsamlı rehber.",
  path: "/rehber/stok-takip-programi-kobiler-icin",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${siteConfig.siteUrl}/rehber/stok-takip-programi-kobiler-icin#article`,
  "headline": "KOBİ'ler İçin Stok Takip Programı: Excel ve Hazır Yazılımın Ötesi",
  "description":
    "Stok takip programı nedir, Excel neden yetersiz kalır, hazır yazılım ile özel sistem arasındaki fark nedir? KOBİ'ler için kapsamlı rehber.",
  "datePublished": "2025-07-29",
  "dateModified": "2025-07-29",
  "author": { "@id": `${siteConfig.siteUrl}/#person` },
  "publisher": { "@id": `${siteConfig.siteUrl}/#organization` },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${siteConfig.siteUrl}/rehber/stok-takip-programi-kobiler-icin`,
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Rehber", "item": `${siteConfig.siteUrl}/rehber` },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "KOBİ'ler İçin Stok Takip Programı",
        "item": `${siteConfig.siteUrl}/rehber/stok-takip-programi-kobiler-icin`,
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.siteUrl}/rehber/stok-takip-programi-kobiler-icin#faq`,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Stok takip programı nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Stok takip programı, işletmenin ürün giriş-çıkış hareketlerini, anlık depo miktarlarını ve kritik stok seviyelerini dijital ortamda kaydeden ve raporlayan yazılımdır. Doğru bir stok takip sistemi envanter kayıplarını önler, satın alma kararlarını veriye dayandırır ve tedarik süreçlerini hızlandırır.",
      },
    },
    {
      "@type": "Question",
      "name": "Excel ile stok takibi neden yetersiz kalır?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Excel, birden fazla kişinin eş zamanlı kullandığı ortamlarda veri tutarsızlığına yol açar; anlık stok görünürlüğü sunmaz; mobil kullanımı pratik değildir; kritik seviye uyarısı üretmez ve formül hataları sessizce yanlış stok rakamı oluşturabilir.",
      },
    },
    {
      "@type": "Question",
      "name": "Hazır stok yazılımı mı, özel sistem mi tercih edilmeli?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "İşletmenin terminolojisi, fiyatlandırma mantığı veya raporlama ihtiyacı standart hazır yazılıma uymuyorsa özel sistem daha verimlidir. Hazır yazılımlar genel kullanım için tasarlandığından kullanılmayan özelliklerle dolu karmaşık arayüz, zorunlu lisans bedelleri ve sınırlı özelleştirme esnekliği gibi sorunlara yol açabilir.",
      },
    },
    {
      "@type": "Question",
      "name": "Özel stok takip sistemi ne kadar sürede hazır olur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Kapsamına bağlı olarak temel stok takip modülü 3–6 haftada tamamlanabilir. Cari hesap, raporlama ve çok depo desteği eklendikçe süre 8–12 haftaya uzayabilir. Net takvim, ilk keşif görüşmesinde belirlenir.",
      },
    },
  ],
};

export default function StokTakipPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout
        title="KOBİ'ler İçin Stok Takip Programı: Excel ve Hazır Yazılımın Ötesi"
        description="Stok takip programı nedir, Excel neden yetersiz kalır, hazır yazılım ile özel sistem arasındaki fark nedir? KOBİ'ler için kapsamlı rehber."
        publishedAt="2025-07-29"
        readingTime={7}
        category="Stok & Envanter Yönetimi"
      >
        <p>
          <strong>Stok takip programı</strong>, işletmenin ürün giriş-çıkış hareketlerini, anlık depo
          miktarlarını ve kritik stok seviyelerini dijital ortamda kaydeden ve raporlayan yazılımdır.
          Doğru bir sistem envanter kayıplarını önler, satın alma kararlarını veriye dayandırır ve
          tedarik süreçlerini hızlandırır. Büyüyen işletmelerde Excel bu işlevi artık karşılayamamaktadır.
        </p>

        <h2>Stok takip programı nedir, ne işe yarar?</h2>
        <p>
          Her işletme bir stok takip yöntemi kullanır — kağıt defter, Excel veya özel yazılım. Fark,
          bu yöntemin kaç kullanıcıyı taşıyabildiğinde, ne kadar hızlı güncellenebildiğinde ve hangi
          kararları otomatik olarak tetikleyebildiğinde ortaya çıkar.
        </p>
        <p>
          Bir stok takip programı temel olarak şu soruları yanıtlar: Depoda şu an kaç adet ürün var?
          Hangi ürünler kritik seviyenin altına düştü? Geçen ay en çok ne sattık ve tedarikçiden
          ne zaman sipariş vermeliyiz?
        </p>

        <h2>Excel ile stok takibi neden yetersiz kalır?</h2>
        <p>
          Excel küçük ölçekte pratik görünse de işletme büyüdükçe ciddi operasyonel sorunlara zemin
          hazırlar:
        </p>
        <ul>
          <li>
            <strong>Eş zamanlı düzenleme çakışması:</strong> Birden fazla kişi aynı dosyayı
            güncellediğinde veri tutarsızlıkları kaçınılmaz hale gelir.
          </li>
          <li>
            <strong>Anlık görünürlük yok:</strong> Güncel stok bilgisine ulaşmak için dosyanın
            açılması ve en güncel versiyonunun bulunması gerekir.
          </li>
          <li>
            <strong>Mobil kullanım pratik değil:</strong> Saha veya depo personelinin tabletten
            ya da telefondan güvenilir biçimde veri girmesi mümkün değildir.
          </li>
          <li>
            <strong>Otomatik uyarı mekanizması yok:</strong> Kritik stok eşiğine düşen ürünü
            fark etmek tamamen kullanıcıya bağlıdır.
          </li>
          <li>
            <strong>Sessiz hata riski:</strong> Yanlış sütuna girilen bir rakam veya bozulan
            bir formül, fark edilmeden haftalarca hatalı stok raporu üretebilir.
          </li>
        </ul>

        <h2>Hazır stok yazılımları KOBİ ihtiyaçlarını karşılıyor mu?</h2>
        <p>
          Piyasadaki hazır stok yönetim yazılımları farklı sektörler için genel çözümler sunar.
          Ancak her işletmenin ürün kategorisi, fiyatlandırma mantığı, depo yapısı ve raporlama
          ihtiyacı birbirinden farklıdır. Bu durum hazır yazılımlarda çeşitli sürtünme noktaları yaratır:
        </p>
        <table>
          <thead>
            <tr>
              <th>Hazır Yazılım</th>
              <th>İşletmeye Özel Sistem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Genel terminoloji ve ekranlar</td>
              <td>İşletmenin kendi diliyle tasarlanmış arayüz</td>
            </tr>
            <tr>
              <td>Kullanılmayan modüllerle dolu arayüz</td>
              <td>Yalnızca ihtiyaç duyulan özellikler</td>
            </tr>
            <tr>
              <td>Aylık lisans + zorunlu ek modül bedeli</td>
              <td>Tek seferlik geliştirme maliyeti</td>
            </tr>
            <tr>
              <td>Özelleştirme için yazılım şirketine bağımlılık</td>
              <td>Tam kaynak koduna sahiplik</td>
            </tr>
            <tr>
              <td>Entegrasyon kısıtlı veya ücretli</td>
              <td>Mevcut sistemlerle entegrasyon tasarım aşamasında</td>
            </tr>
          </tbody>
        </table>

        <h2>İşletmeye özel stok takip sistemi nasıl çalışır?</h2>
        <p>
          Özel stok takip sistemi, işletmenin kullandığı ürün kategorileri, depo yapısı ve
          raporlama biçimine göre sıfırdan tasarlanır. Tipik bileşenler şunlardır:
        </p>
        <ol>
          <li>
            <strong>Ürün tanımları:</strong> Kategori, birim, barkod, minimum sipariş miktarı
            ve tedarikçi bilgileri
          </li>
          <li>
            <strong>Hareket kaydı:</strong> Giriş, çıkış, fire, iade ve depo transferleri
          </li>
          <li>
            <strong>Anlık envanter görünümü:</strong> Ürün, kategori ve depo bazında anlık miktar
          </li>
          <li>
            <strong>Kritik seviye uyarısı:</strong> Kullanıcı tarafından tanımlanan eşiğin
            altına düşen ürünler için otomatik bildirim
          </li>
          <li>
            <strong>Raporlama:</strong> Dönemsel hareket raporu, tüketim analizi ve stok
            devir hızı hesabı
          </li>
        </ol>

        <h2>Gerçek örnek: StokApp ile kazanımlar</h2>
        <div className="metric-card">
          <p style={{ margin: 0 }}>
            Albanexa'nın toptan ticaret işletmesi için geliştirdiği{" "}
            <strong>StokApp</strong> uygulamasında hesap ekstresi hazırlama süresi{" "}
            <strong>2 saatten 30 saniyeye</strong> indi. Kritik stok uyarıları
            sayesinde ürün tükenmesinden kaynaklanan satış kayıpları ortadan kalktı.
            Mobil uyumlu arayüzle saha ekibi anlık stok sorgulama yapabilir hale geldi.
          </p>
        </div>

        <h2>Özel stok takip sistemi ne kadar sürede hazır olur?</h2>
        <p>
          Kapsamına bağlı olarak temel stok takip modülü <strong>3–6 haftada</strong>{" "}
          tamamlanabilir. Cari hesap, raporlama ve çok depo desteği eklendikçe süre
          8–12 haftaya uzayabilir. Net takvim ve bütçe, ilk keşif görüşmesinde iş
          akışları analiz edilerek belirlenir.
        </p>

        <h2>Sıkça sorulan sorular</h2>

        <div className="faq-item">
          <h3>Mevcut Excel verilerini yeni sisteme taşıyabilir miyiz?</h3>
          <p>
            Evet. Mevcut Excel dosyaları veya eski sistemdeki kayıtlar, veri temizleme
            ve dönüştürme adımından sonra yeni sisteme aktarılır. Bu süreç ürün
            kataloğu, geçmiş hareketler ve açık sipariş verilerini kapsar.
          </p>
        </div>
        <div className="faq-item">
          <h3>Çok depo veya çok şube desteği mümkün mü?</h3>
          <p>
            Evet. Sistem tasarım aşamasında çok depo ve çok şube mimarisine göre
            kurgulanır; her lokasyonun ayrı envanteri, merkezi raporlaması ve
            lokasyonlar arası transfer akışı tanımlanır.
          </p>
        </div>
        <div className="faq-item">
          <h3>Barkod veya QR okuyucu entegrasyonu yapılabiliyor mu?</h3>
          <p>
            Evet. Mobil kamera veya harici barkod okuyucu ile entegre stok giriş
            ekranları tasarlanabilir; böylece depo personeli fiziksel sayım ve
            hareket kaydını çok daha hızlı gerçekleştirebilir.
          </p>
        </div>

        <hr />

        <div className="callout">
          <p style={{ margin: 0 }}>
            <strong>İşletmenizin stok süreçlerini analiz etmek ister misiniz?</strong>
            <br />
            Albanexa, 30 dakikalık ücretsiz keşif görüşmesiyle mevcut iş akışınızı
            değerlendirip hangi modüllerin öncelikli olduğunu belirlemektedir.{" "}
            <Link href="/iletisim" className="text-accent underline underline-offset-2">
              Görüşme talep edin →
            </Link>
          </p>
        </div>
      </ArticleLayout>
    </>
  );
}
