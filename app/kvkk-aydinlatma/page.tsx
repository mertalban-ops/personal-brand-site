import { buildPageMetadata } from "@/lib/metadata";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { contact } from "@/data/contact";

export const metadata = buildPageMetadata({
  title: "KVKK Aydınlatma Metni — Albanexa",
  description:
    "6698 sayılı KVKK kapsamında Albanexa kişisel veri işleme aydınlatma metni — işlenen veriler, amaçlar, saklama süreleri ve ilgili kişi hakları.",
  path: "/kvkk-aydinlatma",
});

export default function KvkkAydinlatmaPage() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />
      <div className="mx-auto max-w-3xl px-5 pt-32 pb-20 md:pt-40">
        <Breadcrumb
          crumbs={[
            { label: "Ana Sayfa", href: "/" },
            { label: "KVKK Aydınlatma Metni" },
          ]}
        />
        <h1 className="display text-3xl font-bold text-ink mb-2">
          KVKK Aydınlatma Metni
        </h1>
        <p className="text-xs text-faint mb-6">Son güncelleme: Temmuz 2026</p>

        {/* Legal Disclaimer */}
        <div className="mb-10 rounded-xl border border-accent/30 bg-accent/5 p-4 text-xs text-muted leading-relaxed">
          <span className="font-semibold text-accent block mb-1">Bilgilendirme Notu</span>
          Bu metin, Albanexa&apos;nın gerçek teknik altyapısı ve veri işleme süreçleri esas alınarak
          hazırlanmıştır. 6698 sayılı KVKK&apos;nın 10. maddesi kapsamında aydınlatma yükümlülüğünü
          yerine getirmeye yönelik düzenlenmiş olup açık rıza beyanının alınması amacı taşımamaktadır.
          Özel hukuki gereksinimleriniz için profesyonel hukuk danışmanlığı tavsiye edilir.
        </div>

        <div className="space-y-8 text-muted leading-relaxed text-sm">

          {/* 1 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">1. Veri Sorumlusu</h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca,
              iletişim formunuzu doldurduğunuzda ve sitemizi ziyaret ettiğinizde kişisel verileriniz,
              veri sorumlusu sıfatıyla <strong>Albanexa</strong> (Mert Alban yönetiminde bağımsız
              dijital çözüm stüdyosu) tarafından aşağıda açıklanan kapsamda işlenmektedir.
            </p>
            <p className="mt-2 text-xs text-faint">
              İletişim:{" "}
              <a href={`mailto:${contact.email}`} className="text-accent hover:underline">
                {contact.email}
              </a>
              {" "}&middot;{" "}{contact.location}
            </p>
            <p className="mt-2 text-xs text-faint border border-line/60 rounded-lg px-3 py-2 bg-surface/20">
              <strong className="text-muted">Hukukçu kontrolü gereken alan:</strong> Veri sorumlusu
              sıfatının gerçek hukuki kişiye (gerçek kişi veya tüzel kişilik) ait olması KVKK
              gereğidir. Albanexa&apos;nın tüzel kişilik kazanması durumunda bu bölümün şirket
              bilgileriyle güncellenmesi gerekir.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">2. İşlenen Kişisel Veriler</h2>
            <p className="mb-3">
              İletişim formu aracılığıyla ve site ziyaretiniz sırasında aşağıdaki veriler işlenmektedir:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>
                <strong>Kimlik ve İletişim:</strong> Ad soyad, firma/proje adı, e-posta adresi,
                telefon numarası (isteğe bağlı).
              </li>
              <li>
                <strong>Proje Talebi İçeriği:</strong> Seçilen çözüm türü, operasyonel darboğaz
                tanımı, mevcut iş takip yöntemi, sistem kullanıcı sayısı tahmini, zamanlama ve
                bütçe tercihleri, ek mesaj notları.
              </li>
              <li>
                <strong>Teknik ve Güvenlik Kayıtları:</strong> IP adresi, tahmini coğrafi konum
                (şehir, ülke), İnternet Servis Sağlayıcısı (İSS), saat dilimi, tarayıcı türü,
                işletim sistemi, cihaz türü, başvuru kaynağı, form gönderim zamanı.
              </li>
              <li>
                <strong>Analitik Veriler:</strong> Vercel Analytics aracılığıyla toplanan çerezsiz,
                kişisel kimlik barındırmayan anonim sayfa görüntüleme istatistikleri.
              </li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              3. Kişisel Verilerin Toplanma Yöntemi
            </h2>
            <p className="text-xs">
              Veriler; web sitesi iletişim formu, teknik sunucu logları ve analitik ölçümleme
              araçları aracılığıyla elektronik ortamda toplanmaktadır. Form gönderimi zorunlu
              değildir; yalnızca siteyi ziyaret etmeniz hâlinde teknik güvenlik logları ve anonim
              analitik veriler işlenir.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              4. İşleme Amaçları ve Hukuki Dayanakları
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>
                İletişim talebinin değerlendirilmesi ve proje görüşmesinin yürütülmesi
                <span className="text-faint"> — Sözleşmenin kurulması/ifası ve meşru menfaat</span>
              </li>
              <li>
                Talebinize uygun proje kapsamı ve teknik teklif hazırlanması
                <span className="text-faint"> — Meşru menfaat</span>
              </li>
              <li>
                Web sitesi güvenliğinin sağlanması, spam ve bot gönderimlerin önlenmesi
                <span className="text-faint"> — Hukuki yükümlülük ve meşru menfaat</span>
              </li>
              <li>
                Teknik hataların tespiti ve sistem güvenilirliğinin izlenmesi
                <span className="text-faint"> — Meşru menfaat</span>
              </li>
              <li>
                Anonim sayfa görüntüleme istatistiklerinin izlenmesi (kişisel kimlik içermez)
                <span className="text-faint"> — Meşru menfaat</span>
              </li>
              <li>
                Gelecekteki bilgilendirme ve rehber içeriklerin iletilmesi{" "}
                <span className="text-faint">
                  — Yalnızca formda ayrıca işaretlenen isteğe bağlı onay (açık rıza) ile; bu onay
                  verilmeksizin form gönderilebilir
                </span>
              </li>
            </ul>
            <p className="mt-3 text-xs text-faint border border-line/60 rounded-lg px-3 py-2 bg-surface/20">
              <strong className="text-muted">Hukukçu kontrolü gereken alan:</strong> Belirtilen
              hukuki dayanaklar KVKK madde 5 kapsamında değerlendirilmiştir. Nihai hukuki
              değerlendirme için profesyonel hukuk danışmanlığı tavsiye edilir.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              5. Kullanılan Teknik Altyapı ve Veri Aktarımı
            </h2>
            <p className="mb-2 text-xs">
              Kişisel verileriniz kesinlikle üçüncü taraflara satılmaz veya pazarlama amacıyla
              aktarılmaz. Hizmetin yürütülmesi için kullanılan teknik altyapı sağlayıcıları:
            </p>
            <ul className="list-disc pl-5 space-y-3 text-xs">
              <li>
                <strong>Barındırma ve CDN:</strong> Vercel Inc. — Web sitesinin çalıştırıldığı
                altyapı. ABD merkezli olup global edge lokasyonlarında hizmet vermektedir.
              </li>
              <li>
                <strong>Form Bildirimi:</strong> Telegram Bot API — İletişim formu gönderimlerinde
                anlık bildirim amacıyla kullanılmaktadır. Form içeriği (ad, e-posta, proje talebi)
                ve teknik bilgiler (tahmini konum, cihaz, tarayıcı, başvuru kaynağı) bu bildirime
                dahil edilmektedir. Telegram ABD merkezli bir servistir.
              </li>
              <li>
                <strong>İş Akışı Otomasyonu:</strong> n8n — Form verilerini işlemek ve yönlendirmek
                üzere webhook entegrasyonu ile kullanılmaktadır.
              </li>
              <li>
                <strong>Coğrafi Konum Tespiti:</strong> ip-api.com — Form gönderiminde IP adresine
                dayalı yaklaşık konum bilgisi (şehir, ülke, İSS) elde etmek için kullanılmaktadır.
                Almanya merkezlidir.
              </li>
              <li>
                <strong>Anonim Analitik:</strong> Vercel Analytics — Kişisel kimlik veya çerez
                içermeyen sayfa görüntüleme ölçümlemesi.
              </li>
              <li>
                <strong>Yasal Zorunluluklar:</strong> Yetkili kamu kurum ve kuruluşlarının usulüne
                uygun talebi hâlinde yasal yükümlülükler çerçevesinde aktarım yapılabilir.
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">6. Yurt Dışı Veri Aktarımı</h2>
            <p className="text-xs mb-2">
              Yukarıda belirtilen teknik altyapı sağlayıcılarının (Vercel, Telegram, ip-api.com)
              yurt dışında konuşlanmış sunucu altyapısını kullanması nedeniyle form verileriniz
              yurt dışına aktarılmaktadır.
            </p>
            <p className="text-xs">
              Bu aktarımda ilgili sağlayıcıların güncel veri işleme sözleşmeleri (DPA) ve
              uluslararası aktarım mekanizmaları esas alınmaktadır. SSL/TLS şifreleme, teknik
              bir güvenlik unsurudur; ancak tek başına KVKK kapsamındaki yurt dışı aktarım
              hukuki dayanağını oluşturmaz.
            </p>
            <p className="mt-2 text-xs text-faint border border-line/60 rounded-lg px-3 py-2 bg-surface/20">
              <strong className="text-muted">Hukukçu kontrolü gereken alan:</strong> KVKK madde 9
              kapsamında yurt dışı aktarımın hukuki dayanağı (yeterli koruma, ilgili kişi rızası
              veya standart sözleşme klozu) profesyonel hukuk danışmanlığı ile değerlendirilmelidir.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">7. Saklama Süreleri</h2>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>
                <strong>İletişim Talepleri ve Proje Yazışmaları:</strong> Proje görüşmesi süresince
                ve tamamlanmasından itibaren en fazla 2 yıl; talep üzerine daha erken silinir.
              </li>
              <li>
                <strong>Telegram Bildirimleri:</strong> Telegram platformunun kendi saklama
                politikasına tabidir.
              </li>
              <li>
                <strong>Teknik Güvenlik Logları (IP, zaman damgası):</strong> En fazla 12 ay.
              </li>
              <li>
                <strong>Anonim Analitik Veriler:</strong> Kişisel kimlik içermediğinden istatistiksel
                analiz amacıyla muhafaza edilebilir.
              </li>
            </ul>
          </section>

          {/* 8 — ALL KVKK Art. 11 rights */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              8. İlgili Kişinin Hakları (KVKK Madde 11)
            </h2>
            <p className="mb-2 text-xs">
              KVKK&apos;nın 11. maddesi uyarınca kişisel veri sahibi olarak aşağıdaki haklara
              sahipsiniz:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>
                <strong>a)</strong> Kişisel verilerinizin işlenip işlenmediğini öğrenme,
              </li>
              <li>
                <strong>b)</strong> Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,
              </li>
              <li>
                <strong>c)</strong> Kişisel verilerin işlenme amacını ve bunların amacına uygun
                kullanılıp kullanılmadığını öğrenme,
              </li>
              <li>
                <strong>d)</strong> Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı
                üçüncü kişileri bilme,
              </li>
              <li>
                <strong>e)</strong> Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde
                bunların düzeltilmesini isteme,
              </li>
              <li>
                <strong>f)</strong> KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde
                kişisel verilerinizin silinmesini veya yok edilmesini isteme,
              </li>
              <li>
                <strong>g)</strong> (e) ve (f) bentleri uyarınca yapılan işlemlerin kişisel
                verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme,
              </li>
              <li>
                <strong>h)</strong> İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla
                analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,
              </li>
              <li>
                <strong>i)</strong> Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle
                zarara uğramanız hâlinde zararın giderilmesini talep etme.
              </li>
            </ul>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              9. Başvuru Yöntemi
            </h2>
            <p className="text-xs mb-2">
              Yukarıdaki haklarınızı kullanmak için{" "}
              <a
                href={`mailto:${contact.email}`}
                className="text-accent hover:underline font-medium"
              >
                {contact.email}
              </a>{" "}
              adresine e-posta ile başvurabilirsiniz.
            </p>
            <p className="text-xs mb-2">
              Başvurunuzda bulunması faydalı bilgiler:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Ad soyad ve iletişim bilginiz</li>
              <li>Form gönderim tarihi veya e-posta adresiniz (verinin tespiti için)</li>
              <li>Kullanmak istediğiniz hak ve talebinizin açıklaması</li>
            </ul>
            <p className="mt-3 text-xs">
              Başvurunuz en geç <strong>30 gün</strong> içinde değerlendirilecek ve yanıt
              verilecektir. Talebinizin yerine getirilmesi için kimlik doğrulama istenebilir.
            </p>
            <p className="mt-2 text-xs text-faint">
              Başvurunuzun yanıtsız kalması veya yetersiz bulunması hâlinde Kişisel Verileri
              Koruma Kurumu&apos;na (KVKK) şikâyette bulunma hakkınız saklıdır.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              10. Metnin Güncellenmesi
            </h2>
            <p className="text-xs">
              Bu metin, teknik altyapıdaki veya hukuki gerekliliklerdeki değişikliklere bağlı
              olarak güncellenebilir. Son güncelleme tarihi sayfanın üst kısmında belirtilmektedir.
            </p>
          </section>

        </div>

        <div className="mt-12 rounded-xl border border-line bg-surface/20 p-4 text-xs text-muted">
          Site kullanımı, çerez politikası ve genel gizlilik uygulamalarımız için{" "}
          <a href="/gizlilik" className="text-accent hover:underline font-medium">
            Gizlilik Politikası
          </a>{" "}
          sayfasını inceleyebilirsiniz.
        </div>
      </div>
    </main>
  );
}
