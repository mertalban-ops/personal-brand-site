import { buildPageMetadata } from "@/lib/metadata";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { contact } from "@/data/contact";

export const metadata = buildPageMetadata({
  title: "Gizlilik Politikası — Albanexa",
  description:
    "Albanexa dijital çözüm stüdyosu gizlilik politikası — site kullanımı, teknik altyapı, çerezler ve veri güvenliği uygulamaları.",
  path: "/gizlilik",
});

export default function GizlilikPage() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />
      <div className="mx-auto max-w-3xl px-5 pt-32 pb-20 md:pt-40">
        <Breadcrumb
          crumbs={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Gizlilik Politikası" },
          ]}
        />
        <h1 className="display text-3xl font-bold text-ink mb-2">
          Gizlilik Politikası
        </h1>
        <p className="text-xs text-faint mb-6">Son güncelleme: Temmuz 2026</p>

        {/* KVKK link callout */}
        <div className="mb-10 rounded-xl border border-accent/30 bg-accent/5 p-4 text-xs text-muted leading-relaxed">
          <span className="font-semibold text-accent block mb-1">KVKK Aydınlatma Metni</span>
          Kişisel verilerinizin işlenmesine ilişkin ayrıntılı bilgi, veri sorumlusu, işleme amaçları
          ve KVKK kapsamındaki haklarınız için{" "}
          <a href="/kvkk-aydinlatma" className="font-medium text-accent underline hover:text-accent/80">
            KVKK Aydınlatma Metni
          </a>{" "}
          sayfasını inceleyebilirsiniz. Bu sayfa; site kullanımına ilişkin genel gizlilik
          uygulamalarını, teknik altyapıyı ve çerez politikasını açıklamaktadır.
        </div>

        {/* Legal note */}
        <div className="mb-10 rounded-xl border border-line bg-surface/20 p-4 text-xs text-muted leading-relaxed">
          <span className="font-semibold text-muted block mb-1">Hukuki Bilgilendirme Notu</span>
          Bu metin, Albanexa&apos;nın gerçek teknik altyapısı (Vercel, Telegram Bot API, n8n,
          ip-api.com, Vercel Analytics) ve veri işleme süreçleri esas alınarak şeffaflık amacıyla
          hazırlanmıştır. İşletmenizin özel hukuki gereksinimleri için profesyonel hukuk
          danışmanlığı ile nihai kontrolden geçirilmesi tavsiye edilir.
        </div>

        <div className="space-y-8 text-muted leading-relaxed text-sm">

          {/* 1 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">1. Veri Sorumlusu</h2>
            <p>
              6698 sayılı KVKK uyarınca, sitemizi kullandığınızda kişisel verileriniz veri sorumlusu
              sıfatıyla <strong>Albanexa</strong> (Mert Alban yönetiminde bağımsız dijital çözüm
              stüdyosu) tarafından aşağıda açıklanan kapsamda işlenmektedir.
            </p>
            <p className="mt-2 text-xs text-faint">
              İletişim:{" "}
              <a href={`mailto:${contact.email}`} className="text-accent hover:underline">
                {contact.email}
              </a>
              {" "}&middot;{" "}{contact.location}
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              2. Toplanan Veri Kategorileri
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>
                <strong>İletişim Formu Verileri:</strong> Ad soyad, firma adı, e-posta, telefon
                (isteğe bağlı), proje talebi içeriği, zamanlama ve bütçe tercihleri.
              </li>
              <li>
                <strong>Teknik Güvenlik Kayıtları:</strong> IP adresi, tahmini coğrafi konum
                (şehir, ülke), İnternet Servis Sağlayıcısı, saat dilimi, tarayıcı türü, işletim
                sistemi, cihaz türü, başvuru kaynağı (referer), form gönderim zamanı.
              </li>
              <li>
                <strong>Anonim Analitik Veriler:</strong> Vercel Analytics aracılığıyla toplanan,
                kişisel kimlik veya çerez içermeyen sayfa görüntüleme istatistikleri.
              </li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              3. Veri Akışı ve Kullanılan Altyapı
            </h2>
            <p className="mb-2 text-xs">
              İletişim formu gönderildiğinde veriler şu teknik süreçlerden geçer:
            </p>
            <ul className="list-disc pl-5 space-y-3 text-xs">
              <li>
                <strong>Vercel (Barındırma ve Sunucu Tarafı İşleme):</strong> Web sitesinin
                çalıştırıldığı altyapı. Form isteği önce Vercel sunucularında işlenir.
                ABD merkezlidir; global edge lokasyonlarında hizmet verir.
              </li>
              <li>
                <strong>ip-api.com (Coğrafi Konum):</strong> Form gönderiminde IP adresine dayalı
                yaklaşık konum bilgisi (şehir, ülke, İSS) elde etmek için kullanılır.
                Almanya merkezlidir.
              </li>
              <li>
                <strong>Telegram Bot API (Anlık Bildirim):</strong> Form içeriği (ad, e-posta,
                proje talebi) ve teknik bilgiler (tahmini konum, cihaz, tarayıcı, başvuru
                kaynağı) anlık bildirim olarak iletilir. Telegram ABD merkezli bir servistir.
              </li>
              <li>
                <strong>n8n (İş Akışı Otomasyonu):</strong> Form verilerini işleyip yönlendirmek
                üzere webhook entegrasyonu ile kullanılmaktadır.
              </li>
              <li>
                <strong>Vercel Analytics (Anonim Ölçümleme):</strong> Kişisel kimlik veya çerez
                içermeyen sayfa görüntüleme ölçümlemesi.
              </li>
            </ul>
            <p className="mt-3 text-xs text-faint">
              Form verileri üçüncü taraflara satılmaz veya pazarlama amacıyla aktarılmaz.
              Yetkili kamu kurum ve kuruluşlarının yasal talebi hâlinde aktarım yapılabilir.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">4. Yurt Dışı Veri Aktarımı</h2>
            <p className="text-xs mb-2">
              Sitemizin teknik altyapısında kullanılan sağlayıcıların (Vercel, Telegram,
              ip-api.com) yurt dışında konuşlanmış sunucular kullanması nedeniyle form
              verileri yurt dışına aktarılmaktadır.
            </p>
            <p className="text-xs mb-2">
              Bu aktarımlarda ilgili sağlayıcıların güncel veri işleme sözleşmeleri (DPA) ve
              uluslararası aktarım mekanizmaları esas alınmaktadır. SSL/TLS şifreleme teknik
              güvenlik sağlar; ancak KVKK kapsamındaki yurt dışı aktarım hukuki dayanağını
              tek başına oluşturmaz.
            </p>
            <p className="text-xs text-faint border border-line/60 rounded-lg px-3 py-2 bg-surface/20">
              <strong className="text-muted">Hukukçu kontrolü gereken alan:</strong> KVKK madde 9
              kapsamında yurt dışı aktarımın hukuki dayanağı (yeterli koruma, açık rıza veya
              standart sözleşme klozu) profesyonel hukuk danışmanlığı ile değerlendirilmelidir.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">5. Saklama Süreleri</h2>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>
                <strong>İletişim ve Proje Yazışmaları:</strong> Proje görüşmesi süresince ve
                tamamlanmasından itibaren en fazla 2 yıl; talep üzerine daha erken silinir.
              </li>
              <li>
                <strong>Telegram Bildirimleri:</strong> Telegram platformunun kendi saklama
                politikasına tabidir.
              </li>
              <li>
                <strong>Teknik Güvenlik Logları:</strong> En fazla 12 ay.
              </li>
              <li>
                <strong>Anonim Analitik Veriler:</strong> Kişisel kimlik içermediğinden
                istatistiksel analiz amacıyla muhafaza edilebilir.
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              6. Güvenlik Uygulamaları
            </h2>
            <p className="text-xs">
              Web sitesi SSL/TLS şifreleme ile sunulmaktadır. Form gönderimlerinde honeypot
              (bot koruması) ve IP tabanlı hız sınırlama (rate limiting) mekanizmaları
              uygulanmaktadır. Teknik güvenlik önlemleri, projenin kapsamı ve kullanılan
              altyapıya göre değerlendirilerek planlanır; hiçbir sistem sıfır risk sunmaz.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">7. Çerez Politikası</h2>
            <p className="text-xs">
              Web sitemizde reklam veya izleme çerezi kullanılmaz. Yalnızca sitenin güvenli
              ve hızlı çalışmasını sağlayan zorunlu teknik mekanizmalar ile gizlilik odaklı,
              çerezsiz Vercel Analytics kullanılmaktadır.
            </p>
          </section>

          {/* 8 — All KVKK Art. 11 rights */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              8. İlgili Kişinin Hakları (KVKK Madde 11)
            </h2>
            <p className="mb-2 text-xs">
              KVKK&apos;nın 11. maddesi uyarınca kişisel veri sahibi olarak aşağıdaki haklara
              sahipsiniz:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
              <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,</li>
              <li>
                Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp
                kullanılmadığını öğrenme,
              </li>
              <li>
                Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü
                kişileri bilme,
              </li>
              <li>
                Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların
                düzeltilmesini isteme,
              </li>
              <li>
                KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel
                verilerinizin silinmesini veya yok edilmesini isteme,
              </li>
              <li>
                Düzeltme veya silme işlemlerinin kişisel verilerinizin aktarıldığı üçüncü
                kişilere bildirilmesini isteme,
              </li>
              <li>
                İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi
                suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,
              </li>
              <li>
                Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız
                hâlinde zararın giderilmesini talep etme.
              </li>
            </ul>
            <p className="mt-3 text-xs">
              Haklarınızı kullanmak için{" "}
              <a
                href={`mailto:${contact.email}`}
                className="text-accent hover:underline font-medium"
              >
                {contact.email}
              </a>{" "}
              adresine e-posta ile başvurabilirsiniz. Talebiniz en geç 30 gün içinde
              yanıtlanacaktır.
            </p>
          </section>

        </div>

        <div className="mt-12 rounded-xl border border-line bg-surface/20 p-4 text-xs text-muted">
          KVKK kapsamındaki kişisel veri işleme, veri sorumlusu ve haklarınıza ilişkin tam
          aydınlatma için{" "}
          <a href="/kvkk-aydinlatma" className="text-accent hover:underline font-medium">
            KVKK Aydınlatma Metni
          </a>{" "}
          sayfasını inceleyebilirsiniz.
        </div>
      </div>
    </main>
  );
}
