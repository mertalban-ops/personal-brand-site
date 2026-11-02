import { buildPageMetadata } from "@/lib/metadata";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ControllerInfo from "@/components/legal/ControllerInfo";
import { storageInventory, LEGAL_LAST_UPDATED } from "@/data/legal";

export const metadata = buildPageMetadata({
  title: "Gizlilik ve Çerez Politikası",
  description:
    "albanexa.com gizlilik ve çerez politikası — sitede çerez, istatistik veya reklam aracı kullanılmaz; tarayıcı depolaması ve güvenlik uygulamaları.",
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
            { label: "Gizlilik ve Çerez Politikası" },
          ]}
        />
        <h1 className="display text-3xl font-bold text-ink mb-2">Gizlilik ve Çerez Politikası</h1>
        <p className="text-xs text-faint mb-6">Son güncelleme: {LEGAL_LAST_UPDATED}</p>

        <div className="mb-10 rounded-xl border border-accent/30 bg-accent/5 p-4 text-xs text-muted leading-relaxed">
          Kişisel verilerinizin hangi amaç ve hukuki sebeple işlendiği, kimlere aktarıldığı ve
          haklarınız için{" "}
          <a href="/kvkk-aydinlatma" className="font-medium text-accent underline hover:text-accent/80">
            KVKK Aydınlatma Metni
          </a>
          &apos;ni inceleyin.
        </div>

        <div className="space-y-10 text-muted leading-relaxed text-sm">
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">1. Veri Sorumlusu</h2>
            <ControllerInfo />
          </section>

          <section>
            <h2 className="text-ink text-base font-semibold mb-3">2. Sitede Neler Var, Neler Yok?</h2>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>
                <strong>Barındırma:</strong> Site Vercel altyapısında çalışır. Sayfa istekleri
                sırasında IP adresi ve tarayıcı bilgisi gibi teknik veriler Vercel tarafından işlenir.
              </li>
              <li>
                <strong>Yok:</strong> İletişim formu, ziyaretçi istatistiği (Google Analytics, Vercel
                Analytics vb.), reklam ölçümü (Meta Pixel vb.), IP&apos;den konum tespiti.
              </li>
              <li>
                <strong>Yazı tipleri ve 3B sahne:</strong> Sitenin kendi sunucusundan yüklenir; Google
                Fonts veya Spline sunucularına istek gönderilmez.
              </li>
              <li>
                <strong>E-posta ve WhatsApp bağlantıları:</strong> Yalnızca siz tıkladığınızda ilgili
                uygulamayı açar; sayfada otomatik çalışan bir bileşen yoktur. Yazışma, e-posta
                sağlayıcısının veya WhatsApp&apos;ın (Meta) altyapısında işlenir.
              </li>
            </ul>
          </section>

          <section id="cerezler" className="scroll-mt-28">
            <h2 className="text-ink text-base font-semibold mb-3">3. Çerezler ve Tarayıcı Depolaması</h2>
            <p className="text-xs mb-3">
              Site çerez kullanmaz. Yalnızca aşağıdaki işlevsel kayıt, tarayıcınızın yerel
              depolamasında tutulur. Bu kayıt cihazınızdan dışarı gönderilmez, bu nedenle onay
              penceresi gösterilmez. Dilediğiniz zaman tarayıcı ayarlarından silebilirsiniz.
            </p>
            <div className="space-y-3">
              {storageInventory.map((item) => (
                <div key={item.name} className="rounded-xl border border-line bg-surface/20 p-3 text-xs space-y-0.5">
                  <p className="text-ink font-mono">{item.name}</p>
                  <p><strong className="text-ink">Kategori:</strong> {item.category} · {item.storage}</p>
                  <p><strong className="text-ink">Sağlayıcı:</strong> {item.provider}</p>
                  <p><strong className="text-ink">Amaç:</strong> {item.purpose}</p>
                  <p><strong className="text-ink">Süre:</strong> {item.duration}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-ink text-base font-semibold mb-3">4. Güvenlik</h2>
            <p className="text-xs">
              Site HTTPS üzerinden sunulur ve güvenlik başlıklarıyla (HSTS, çerçeveleme engeli vb.)
              yapılandırılmıştır. Hiçbir sistem sıfır risk sunmaz.
            </p>
          </section>

          <section>
            <h2 className="text-ink text-base font-semibold mb-3">5. Haklarınız ve Başvuru</h2>
            <p className="text-xs">
              KVKK m.11 kapsamındaki haklarınız ve başvuru yöntemi{" "}
              <a href="/kvkk-aydinlatma" className="text-accent hover:underline">
                KVKK Aydınlatma Metni
              </a>
              &apos;nde açıklanmıştır. Başvurular en geç 30 gün içinde yanıtlanır.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
