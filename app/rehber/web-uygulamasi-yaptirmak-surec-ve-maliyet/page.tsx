import { buildPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { siteConfig } from "@/data/config";

export const metadata = buildPageMetadata({
  title: "Web Uygulaması Yaptırmak: Süreç, Maliyet ve Dikkat Edilecekler — Albanexa",
  description:
    "İşletmenize özel web uygulaması yaptırmayı düşünüyor musunuz? Süreç nasıl işler, maliyetler nasıl belirlenir, hangi soruları sormalısınız? Eksiksiz rehber.",
  path: "/rehber/web-uygulamasi-yaptirmak-surec-ve-maliyet",
});

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${siteConfig.siteUrl}/rehber/web-uygulamasi-yaptirmak-surec-ve-maliyet#article`,
  "headline": "Web Uygulaması Yaptırmak: Süreç, Maliyet ve Dikkat Edilecekler",
  "description":
    "İşletmenize özel web uygulaması yaptırmayı düşünüyor musunuz? Süreç nasıl işler, maliyetler nasıl belirlenir, hangi soruları sormalısınız? Eksiksiz rehber.",
  "datePublished": "2026-07-31",
  "dateModified": "2026-07-31",
  "author": { "@id": `${siteConfig.siteUrl}/#person` },
  "publisher": { "@id": `${siteConfig.siteUrl}/#organization` },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${siteConfig.siteUrl}/rehber/web-uygulamasi-yaptirmak-surec-ve-maliyet`,
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Rehber", "item": `${siteConfig.siteUrl}/rehber` },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Web Uygulaması Yaptırmak",
        "item": `${siteConfig.siteUrl}/rehber/web-uygulamasi-yaptirmak-surec-ve-maliyet`,
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.siteUrl}/rehber/web-uygulamasi-yaptirmak-surec-ve-maliyet#faq`,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Web uygulaması nedir, web sitesinden farkı nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Web sitesi, bilgi sunan statik veya içerik odaklı bir dijital varoluştur. Web uygulaması ise kullanıcıların giriş yaptığı, veri girdiği, işlem yaptığı ve rapor aldığı etkileşimli bir sistemdir. İş takip paneli, stok yönetimi, sipariş takibi, müşteri portalı — bunların hepsi web uygulamasıdır.",
      },
    },
    {
      "@type": "Question",
      "name": "Web uygulaması yaptırmak ne kadar sürer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Kapsama bağlıdır. Tek modüllü basit bir uygulama (örneğin yalnızca iş emri takibi) 4–6 haftada tamamlanabilir. Stok, cari hesap, fatura ve çok kullanıcı gibi kapsamlı bir sistem 10–16 hafta gerektirir. Keşif görüşmesinde iş akışları analiz edilerek gerçekçi takvim sunulur.",
      },
    },
    {
      "@type": "Question",
      "name": "Web uygulaması geliştirme maliyeti ne kadar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Modül sayısı, kullanıcı rolleri, entegrasyon ihtiyacı ve proje kapsamına göre değişir. Temel bir operasyon uygulaması için başlangıç bütçesi 30.000–80.000 TL aralığında olabilir; karmaşık sistemler bu rakamın üzerine çıkar. Net rakam, iş akışları belirlendikten sonra teklif olarak sunulur.",
      },
    },
    {
      "@type": "Question",
      "name": "Geliştirme sonrası bakım ve güncelleme nasıl işler?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Teslim sonrası aylık bakım anlaşmasıyla güvenlik güncellemeleri, altyapı izleme ve küçük geliştirmeler planlanır. Yeni modül eklemeleri ayrı proje kapsamında değerlendirilir. Bakım anlaşması olmayan projeler için de acil destek taleplerine yanıt verilir.",
      },
    },
  ],
};

export default function WebUygulamasiYaptirmakPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout
        title="Web Uygulaması Yaptırmak: Süreç, Maliyet ve Dikkat Edilecekler"
        description="İşletmenize özel web uygulaması yaptırmayı düşünüyor musunuz? Süreç nasıl işler, maliyetler nasıl belirlenir, hangi soruları sormalısınız? Eksiksiz rehber."
        publishedAt="2026-07-31"
        readingTime={8}
        category="Yazılım Geliştirme & Dijitalleşme"
      >
        <p>
          İşletmenize özel bir web uygulaması yaptırmak, hazır yazılımların çözemediği operasyonel
          sorunları kalıcı biçimde çözmenin en etkili yoludur. Ancak süreç hakkında yeterli bilgisi
          olmayan işletme sahipleri zaman zaman yanlış kişilerle çalışarak hayal kırıklığı yaşar.
          Bu rehber, süreci baştan sona anlamanıza yardımcı olmak için hazırlandı.
        </p>

        <h2>Web uygulaması nedir?</h2>
        <p>
          Web uygulaması, kullanıcıların tarayıcı üzerinden giriş yaptığı, veri girdiği, işlem
          yaptığı ve rapor aldığı etkileşimli dijital sistemdir. Bir web sitesinin aksine,
          web uygulaması yalnızca bilgi göstermez — çalıştırılır, kullanılır, veri üretir.
        </p>
        <p>Örnekler:</p>
        <ul>
          <li>Ekip içi iş emri ve görev takip paneli</li>
          <li>Müşterilere açık sipariş ve teslimat takip portalı</li>
          <li>Stok girişi, çıkışı ve raporu için depo yönetim sistemi</li>
          <li>Müşteri bazlı cari hesap ve tahsilat takip uygulaması</li>
          <li>Randevu, rezervasyon veya saha ekibi yönetim sistemi</li>
        </ul>

        <h2>Web uygulaması yaptırma süreci nasıl işler?</h2>
        <p>
          Profesyonel bir geliştirme süreci şu aşamalardan oluşur:
        </p>
        <ol>
          <li>
            <strong>Keşif görüşmesi (Discovery):</strong> İşletmenizin operasyonu, yaşanan
            sorunlar ve beklentiler dinlenir. Bu görüşme ücretsizdir ve teklife zemin hazırlar.
          </li>
          <li>
            <strong>Kapsam ve MVP tanımı:</strong> Hangi özelliklerin ilk sürümde olacağı
            (MVP — Minimum Viable Product) netleştirilir. Bu adım bütçeyi ve takvimi belirler.
          </li>
          <li>
            <strong>Teknik tasarım:</strong> Veri modeli, kullanıcı rolleri, ekranlar ve
            entegrasyon noktaları tasarlanır. Onayınız alınmadan geliştirmeye başlanmaz.
          </li>
          <li>
            <strong>Geliştirme:</strong> Sprint bazlı (genellikle 2 haftalık döngüler)
            geliştirme yapılır. Her sprint sonunda ilerlemeyi görebilirsiniz.
          </li>
          <li>
            <strong>Test ve kabul:</strong> Gerçek verilerle test edilir, geri bildiriminize
            göre düzeltmeler yapılır.
          </li>
          <li>
            <strong>Canlıya alma ve eğitim:</strong> Sistem yayına alınır, ekip eğitimi
            verilir, kullanım kılavuzu hazırlanır.
          </li>
          <li>
            <strong>Bakım:</strong> Teslim sonrası güvenlik güncellemeleri ve destek
            planlanır.
          </li>
        </ol>

        <h2>Maliyet nasıl belirlenir?</h2>
        <p>
          Web uygulaması geliştirme maliyetini etkileyen başlıca faktörler:
        </p>
        <table>
          <thead>
            <tr>
              <th>Faktör</th>
              <th>Düşük Maliyet Senaryosu</th>
              <th>Yüksek Maliyet Senaryosu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Modül sayısı</td>
              <td>1–2 temel modül</td>
              <td>5+ karmaşık modül</td>
            </tr>
            <tr>
              <td>Kullanıcı rolleri</td>
              <td>1–2 rol (admin + personel)</td>
              <td>5+ rol, karmaşık yetki yapısı</td>
            </tr>
            <tr>
              <td>Entegrasyon</td>
              <td>Yok veya basit</td>
              <td>ERP, muhasebe, e-fatura, SMS</td>
            </tr>
            <tr>
              <td>Veri hacmi</td>
              <td>Küçük (binler)</td>
              <td>Büyük (milyonlar), özel indeksleme</td>
            </tr>
            <tr>
              <td>Mobil uygulama</td>
              <td>Yalnızca web (mobil uyumlu)</td>
              <td>Native iOS + Android app</td>
            </tr>
          </tbody>
        </table>
        <p>
          Teknik bilgi gerektiren bir fiyat hesabı yapmak yerine keşif görüşmesinde iş akışlarınızı
          paylaşmanız, gerçekçi ve şeffaf bir teklif almanızı sağlar.
        </p>

        <h2>Geliştirici seçerken dikkat edilmesi gerekenler</h2>
        <p>
          Yanlış geliştirici seçimi zaman ve bütçe kaybına neden olur. Şu soruları sormak işe yarar:
        </p>
        <ul>
          <li>Benzer sektörden referans projeler gösterebilir misiniz?</li>
          <li>Kaynak kod mülkiyeti kime ait olacak?</li>
          <li>Teslim sonrası bakım ve destek nasıl sağlanıyor?</li>
          <li>Hangi teknoloji yığınını kullanıyorsunuz ve neden?</li>
          <li>Proje kapsamı değişirse süreç nasıl işliyor?</li>
          <li>Ödeme takvimi nasıl yapılandırılıyor?</li>
        </ul>
        <p>
          Kesin fiyat vermeden önce kapsam tanımlamayı reddeden veya referans gösteremeyen
          geliştiricilerle çalışmak risklidir.
        </p>

        <h2>Hangi teknolojiler kullanılmalı?</h2>
        <p>
          Teknoloji seçimi projenin ömrünü ve bakım maliyetini doğrudan etkiler. Albanexa
          tüm web uygulamaları için şu yığını tercih eder:
        </p>
        <ul>
          <li><strong>Frontend:</strong> Next.js + React + TypeScript — hızlı, SEO uyumlu, geniş ekosistem</li>
          <li><strong>Backend / Veritabanı:</strong> Supabase (PostgreSQL tabanlı) — güçlü, ölçeklenebilir, gerçek zamanlı</li>
          <li><strong>Altyapı:</strong> Vercel (frontend) + Supabase Cloud — yönetilen, güvenli, 99.9% uptime</li>
          <li><strong>Otomasyon:</strong> n8n — görsel iş akışı oluşturma, 400+ entegrasyon</li>
        </ul>
        <p>
          Bu yığın yaygın, belgelenmiş ve bağımsız geliştirici topluluğuna sahip araçlardan
          oluşur. İleride başka bir geliştirici ekibiyle devam etmek istediğinizde sorun yaşamazsınız.
        </p>

        <h2>Gerçek örnek</h2>
        <div className="metric-card">
          <p style={{ margin: 0 }}>
            Albanexa'nın toptan ticaret işletmesi için geliştirdiği{" "}
            <strong>StokApp</strong>'ta stok takibi, müşteri cari hesabı ve tahsilat
            modülleri 10 haftada tamamlandı. Sistem tesliminden bu yana hesap ekstresi
            hazırlama süresi <strong>2 saatten 30 saniyeye</strong> indi.
            Araç servisi için geliştirilen <strong>Hezer Auto Service</strong> sisteminde
            tüm servis akışı kağıt ve WhatsApp'tan dijitale taşındı; araç geçmişine
            plaka ile saniyeler içinde ulaşılıyor.
          </p>
        </div>

        <h2>Sıkça sorulan sorular</h2>

        <div className="faq-item">
          <h3>Fikrim var ama tam olarak ne istediğimi bilmiyorum. Yine de başlayabilir miyiz?</h3>
          <p>
            Evet. Keşif görüşmesinin amacı tam olarak budur: operasyonunuzu ve yaşadığınız
            sorunları dinleyerek ne inşa edilmesi gerektiğini birlikte netleştiriyoruz.
            Hazır bir spec belgesine ihtiyaç duymadan başlayabilirsiniz.
          </p>
        </div>
        <div className="faq-item">
          <h3>Uygulama teslim edildikten sonra kendim güncelleyebilir miyim?</h3>
          <p>
            Statik içerik (metin, resim, liste) için yönetim paneli kurulabilir. Yeni
            özellik veya modül eklemek geliştirme çalışması gerektirir. Bu ayrım
            proje başında netleştirilir.
          </p>
        </div>
        <div className="faq-item">
          <h3>Uygulama birden fazla cihazda çalışır mı?</h3>
          <p>
            Evet. Tüm web uygulamaları bilgisayar, tablet ve telefonda sorunsuz çalışacak
            biçimde geliştirilir (responsive tasarım). Ayrı mobil uygulama (iOS/Android)
            talep edilmesi durumunda bu kapsama eklenir.
          </p>
        </div>

        <hr />

        <div className="callout">
          <p style={{ margin: 0 }}>
            <strong>Projenizi konuşmaya hazır mısınız?</strong>
            <br />
            30 dakikalık ücretsiz keşif görüşmesinde iş akışlarınızı birlikte analiz
            ediyor; kapsam, takvim ve bütçe üzerine net bir teklif sunuyoruz.{" "}
            <Link href="/iletisim" className="text-accent underline underline-offset-2">
              Görüşme talep edin →
            </Link>
          </p>
        </div>

        <p>
          <Link href="/cozumler/web-uygulamalari" className="text-accent underline underline-offset-2">
            Web uygulaması geliştirme hizmetimizi inceleyin →
          </Link>
        </p>
      </ArticleLayout>
    </>
  );
}
