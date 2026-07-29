import { buildPageMetadata } from "@/lib/metadata";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { contact } from "@/data/contact";

export const metadata = buildPageMetadata({
  title: "Gizlilik Politikası & KVKK Aydınlatma Metni — Albanexa",
  description: "Albanexa dijital çözüm stüdyosu kişisel veri işleme, KVKK aydınlatma metni ve gizlilik ilkeleri.",
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
            { label: "Gizlilik Politikası & KVKK" },
          ]}
        />
        <h1 className="display text-3xl font-bold text-ink mb-2">
          Gizlilik Politikası & KVKK Aydınlatma Metni
        </h1>
        <p className="text-xs text-faint mb-6">Son güncelleme tarihi: Temmuz 2026</p>

        {/* Legal Disclaimer Box */}
        <div className="mb-10 rounded-xl border border-accent/30 bg-accent/5 p-4 text-xs text-muted leading-relaxed">
          <span className="font-semibold text-accent block mb-1">Hukuki Bilgilendirme Notu</span>
          İşbu metin, Albanexa&apos;nın gerçek teknik altyapısı (Vercel, Supabase, n8n, Telegram Bot, Vercel Analytics) ve veri işleme süreçleri esas alınarak şeffaflık amacıyla hazırlanmıştır. İşletmenizin özel hukuki gereksinimleri için profesyonel hukuk danışmanlığı ile nihai kontrolden geçirilmesi tavsiye edilir.
        </div>

        <div className="space-y-8 text-muted leading-relaxed text-sm">
          {/* Section 1 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              1. Veri Sorumlusu
            </h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla <strong>Albanexa Dijital Çözüm Stüdyosu</strong> (Mert Alban yönetimi) tarafından aşağıda açıklanan kapsamda işlenmektedir.
            </p>
            <p className="mt-2 text-xs text-faint">
              İletişim: <a href={`mailto:${contact.email}`} className="text-accent hover:underline">{contact.email}</a> &middot; Konum: {contact.location}
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              2. İşlenen Kişisel Veriler ve Toplama Yöntemleri
            </h2>
            <p className="mb-3">
              Web sitemizi ziyaret ettiğinizde ve iletişim formlarını kullandığınızda aşağıdaki veriler işlenmektedir:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>
                <strong>Kimlik ve İletişim Verileri:</strong> İletişim formunda paylaştığınız Ad Soyad, Firma/Şirket Adı, E-posta Adresi, Telefon Numarası.
              </li>
              <li>
                <strong>Proje ve Talebe İlişkin Veriler:</strong> Seçilen Çözüm Türü, operasyonel darboğaz tanımı, kullanıcı sayısı tahmini, zamanlama ve bütçe tercihleri, ek mesaj notları.
              </li>
              <li>
                <strong>Teknik ve Güvenlik Kayıtları:</strong> IP adresi, erişim zamanı, tarayıcı/cihaz bilgisi, sunucu istek logları ve anti-spam (honeypot) güvenlik doğrulama kayıtları.
              </li>
              <li>
                <strong>Kullanım & Analitik Verileri:</strong> Vercel Analytics altyapısı aracılığıyla toplanan çerezsiz, kişisel veri barındırmayan anonim sayfa gösterim ve performans istatistikleri.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              3. Veri İşleme Amaçları ve Hukuki Sebepleri
            </h2>
            <p className="mb-2">Verileriniz şu amaçlarla ve hukuki sebeplerle işlenir:</p>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>İletişim taleplerinizin değerlendirilmesi ve sizinle iletişim kurulması (Sözleşmenin kurulması ve ifası).</li>
              <li>İşletmenizin ihtiyacına uygun proje kapsamı ve teknik teklif hazırlanması (Meşru menfaat).</li>
              <li>Web sitesi güvenliğinin sağlanması, bot/spam gönderimlerin önlenmesi ve teknik hataların tespiti (Hukuki yükümlülük ve meşru menfaat).</li>
              <li>Kullanıcının ayrıca açık rıza vermesi halinde: Gelecekteki dijital rehber ve çözüm bilgilendirmelerinin iletilmesi (Açık Rıza).</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              4. Gerçek Altyapı ve Veri Aktarımı
            </h2>
            <p className="mb-2">
              Kişisel verileriniz kesinlikle üçüncü taraflara satılmaz veya pazarlama amacıyla kiralanmaz. Operasyonun yürütülmesi için zorunlu olan güvenli teknik altyapı sağlayıcıları:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>
                <strong>Barındırma & CDN (Hosting):</strong> Vercel Inc. (Güvenli bulut altyapısı ve kenar sunucuları).
              </li>
              <li>
                <strong>Bildirim ve Otomasyon:</strong> Form gönderimlerinde anlık bildirim sağlamak üzere Telegram Bot API ve iş akışı otomasyonu için n8n webhook servisleri.
              </li>
              <li>
                <strong>Veritabanı Altyapısı:</strong> Supabase PostgreSQL (Şifrelenmiş veritabanı depolama).
              </li>
              <li>
                <strong>Yasal Zorunluluklar:</strong> Yetkili kamu kurum ve kuruluşları tarafından usulüne uygun talep edilmesi halinde yasal yükümlülükler çerçevesinde.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              5. Yurt Dışı Veri Aktarımı
            </h2>
            <p className="text-xs">
              Sitemizin barındırma hizmeti Vercel küresel bulut ağında sunulduğundan, teknik altyapı gereği veriler AB/ABD lokasyonlu güvenli sunucu merkezlerinde işlenebilmektedir. Tüm sunucular SSL şifreleme ve güncel siber güvenlik standartlarına tabidir.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              6. Saklama Süreleri
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>İletişim Talepleri & Teklif Kayıtları:</strong> Proje görüşme sürecince ve ardından en fazla 2 yıl süreyle saklanır; talep üzerine silinir.</li>
              <li><strong>Güvenlik Kayıtları & IP Logları:</strong> Sistem güvenliği amacıyla en fazla 12 ay süreyle tutulur.</li>
              <li><strong>Anonim İstatistikler:</strong> İstatistiksel analiz için anonim biçimde muhafaza edilebilir.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              7. Haklarınız (KVKK Madde 11)
            </h2>
            <p className="mb-2 text-xs">
              KVKK&apos;nın 11. maddesi uyarınca veri sahibi olarak aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
              <li>Kişisel verilerin silinmesini veya düzeltilmesini isteme,</li>
              <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme.</li>
            </ul>
            <p className="mt-3 text-xs">
              Haklarınızı kullanmak için başvurularınızı <a href={`mailto:${contact.email}`} className="text-accent hover:underline font-medium">{contact.email}</a> e-posta adresine iletebilirsiniz. Talebiniz en geç 30 gün içinde yanıtlanacaktır.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              8. Çerez Politikası
            </h2>
            <p className="text-xs">
              Web sitemizde yalnızca sitenin güvenli ve hızlı çalışmasını sağlayan zorunlu teknik mekanizmalar ve gizlilik odaklı Vercel Analytics kullanılmaktadır. Üçüncü taraf reklam veya izleme çerezleri kullanılmaz.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
