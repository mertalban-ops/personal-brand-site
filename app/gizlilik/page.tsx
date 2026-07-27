import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { contact } from "@/data/contact";

export const metadata: Metadata = {
  title: "Gizlilik Politikası — Albanexa",
  description:
    "Albanexa gizlilik politikası ve kişisel veri işleme bilgilendirmesi.",
};

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
        <p className="text-xs text-faint mb-10">Yürürlük tarihi: {new Date().getFullYear()}</p>

        <div className="space-y-8 text-muted leading-relaxed">
          <section>
            <h2 className="text-ink text-lg font-semibold mb-3">
              1. Kapsam
            </h2>
            <p>
              Bu politika, Albanexa dijital çözüm stüdyosu bünyesinde yürütülen
              proje görüşmeleri ve iletişim süreçlerinde toplanan kişisel
              verilerin nasıl işlendiğini açıklar. Üçüncü taraf platformlar,
              eklentiler veya harici servisler bu politika kapsamında değildir.
            </p>
          </section>

          <section>
            <h2 className="text-ink text-lg font-semibold mb-3">
              2. Toplanan Veriler
            </h2>
            <p>
              İletişim formunu doldurduğunuzda yalnızca formda belirttiğiniz
              bilgiler (ad, e-posta, telefon, proje detayları) tarafımıza
              iletilir. Bu veriler yalnızca proje görüşmesi ve teklif
              hazırlanması amacıyla kullanılır.
            </p>
            <p className="mt-3">
              Site ziyaretinize ilişkin teknik veriler (IP adresi, tarayıcı
              türü) standart sunucu günlükleri aracılığıyla geçici olarak
              kaydedilebilir.
            </p>
          </section>

          <section>
            <h2 className="text-ink text-lg font-semibold mb-3">
              3. Verilerin Kullanımı
            </h2>
            <p>
              Kişisel verileriniz; proje kapsamını değerlendirmek, teklif
              sunmak ve proje ilerleme sürecinde iletişim kurmak amacıyla
              kullanılır. Pazarlama, profilleme veya otomatik karar alma
              süreçlerinde kullanılmaz.
            </p>
          </section>

          <section>
            <h2 className="text-ink text-lg font-semibold mb-3">
              4. Üçüncü Taraflarla Paylaşım
            </h2>
            <p>
              Verileriniz yasal zorunluluklar dışında herhangi bir üçüncü
              tarafla paylaşılmaz, satılmaz veya kiralanmaz.
            </p>
          </section>

          <section>
            <h2 className="text-ink text-lg font-semibold mb-3">
              5. Çerezler
            </h2>
            <p>
              Bu site teknik işlevler için zorunlu minimum çerez
              kullanabilir. Reklam veya izleme amaçlı üçüncü taraf çerezi
              kullanılmamaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-ink text-lg font-semibold mb-3">
              6. Veri Güvenliği
            </h2>
            <p>
              İletişim verileri güvenli altyapıda saklanır. Proje ilişkisi
              sona erdiğinde verileriniz talep üzerine silinir.
            </p>
          </section>

          <section>
            <h2 className="text-ink text-lg font-semibold mb-3">
              7. Haklarınız
            </h2>
            <p>
              Kişisel verilerinize erişim, düzeltme veya silinmesi talebinde
              bulunmak için aşağıdaki e-posta adresine yazabilirsiniz:
            </p>
            <p className="mt-3">
              <a
                href={`mailto:${contact.email}`}
                className="text-accent hover:underline"
              >
                {contact.email}
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-ink text-lg font-semibold mb-3">
              8. Değişiklikler
            </h2>
            <p>
              Bu politika zaman zaman güncellenebilir. Önemli değişiklikler bu
              sayfada duyurulur.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
