import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { contact } from "@/data/contact";

export const metadata: Metadata = {
  title: "Kullanım Koşulları — Albanexa",
  description: "Albanexa web sitesi kullanım koşulları.",
};

export default function KullanimKosullariPage() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />
      <div className="mx-auto max-w-3xl px-5 pt-32 pb-20 md:pt-40">
        <Breadcrumb
          crumbs={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Kullanım Koşulları" },
          ]}
        />
        <h1 className="display text-3xl font-bold text-ink mb-2">
          Kullanım Koşulları
        </h1>
        <p className="text-xs text-faint mb-10">Yürürlük tarihi: {new Date().getFullYear()}</p>

        <div className="space-y-8 text-muted leading-relaxed">
          <section>
            <h2 className="text-ink text-lg font-semibold mb-3">
              1. Kapsam
            </h2>
            <p>
              Bu koşullar, albanexa.com alan adı altında yayınlanan web
              sitesini ziyaret eden ve kullanan kişiler için geçerlidir.
              Siteyi kullanarak bu koşulları kabul etmiş sayılırsınız.
            </p>
          </section>

          <section>
            <h2 className="text-ink text-lg font-semibold mb-3">
              2. Hizmet Kapsamı
            </h2>
            <p>
              Bu site, Albanexa dijital çözüm stüdyosunu tanıtmak ve potansiyel
              müşterilerle iletişim kurmak amacıyla yayınlanmaktadır. Sitede
              sunulan bilgiler genel bilgilendirme amaçlıdır; hukuki, mali veya
              teknik danışmanlık niteliği taşımaz.
            </p>
          </section>

          <section>
            <h2 className="text-ink text-lg font-semibold mb-3">
              3. Fikri Mülkiyet
            </h2>
            <p>
              Sitedeki tüm içerik (metin, görsel, kod örnekleri, marka adı)
              Albanexa&apos;ya aittir. İzin alınmaksızın kopyalanamaz,
              çoğaltılamaz veya ticari amaçla kullanılamaz.
            </p>
          </section>

          <section>
            <h2 className="text-ink text-lg font-semibold mb-3">
              4. Sorumluluk Sınırı
            </h2>
            <p>
              Sitedeki bilgilerin doğruluğu için azami özen gösterilmekle
              birlikte, Albanexa sitedeki içerikten kaynaklanan doğrudan veya
              dolaylı zararlardan sorumlu tutulamaz. Proje anlaşmazlıkları,
              imzalanmış sözleşme hükümleri çerçevesinde değerlendirilir.
            </p>
          </section>

          <section>
            <h2 className="text-ink text-lg font-semibold mb-3">
              5. Dış Bağlantılar
            </h2>
            <p>
              Sitede yer alan üçüncü taraf bağlantıları yalnızca kolaylık
              amacıyla sunulmuştur. Bu sitelerin içeriğinden Albanexa sorumlu
              değildir.
            </p>
          </section>

          <section>
            <h2 className="text-ink text-lg font-semibold mb-3">
              6. Değişiklikler
            </h2>
            <p>
              Bu koşullar önceden haber verilmeksizin güncellenebilir.
              Güncel versiyona her zaman bu sayfadan ulaşabilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-ink text-lg font-semibold mb-3">
              7. İletişim
            </h2>
            <p>
              Bu koşullarla ilgili sorularınız için:
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
        </div>
      </div>
    </main>
  );
}
