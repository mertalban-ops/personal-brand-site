import Link from "next/link";
import { ArrowRight, Award, Clock, ExternalLink, Signal } from "lucide-react";
import { buildPageMetadata } from "@/lib/metadata";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { siteConfig } from "@/data/config";
import { egitimler, baslangicOnerileri, EGITIM_SON_KONTROL, BTK_UCRETSIZ_DUYURU } from "@/data/egitimler";

// Instagram/TikTok/LinkedIn eğitim içeriklerinin (DM: EĞİTİM) yönlendirdiği sayfa.
// Form, e-posta toplama ya da link gizleme yok: tüm linkler doğrudan resmi kaynağa gider.
const PATH = "/egitimler";
const TITLE = "Ücretsiz ve Sertifikalı Eğitimler: Excel, Yapay Zekâ, Kalite";
const DESC =
  "Excel, yapay zekâ, otomasyon, kalite ve müşteri deneyimi için BTK Akademi'deki 10 ücretsiz, sertifikalı eğitim. Resmi linkler ve son kontrol tarihi.";

export const metadata = buildPageMetadata({ title: TITLE, description: DESC, path: PATH });

const tarih = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

const adIle = (slug: string) => egitimler.find((e) => e.slug === slug)?.ad ?? slug;

const SSS = [
  {
    q: "Bu eğitimler gerçekten ücretsiz mi?",
    a: "Evet. BTK Akademi tüm eğitimlerinin ücretsiz olduğunu resmi duyurusunda belirtiyor. Albanexa bu eğitimlerden ücret ya da komisyon almaz.",
  },
  {
    q: "Albanexa'nın BTK Akademi ile bir bağı var mı?",
    a: "Hayır. Bu sayfa bağımsız bir öneri listesidir; eğitimleri ben de sırayla alıyorum.",
  },
  {
    q: "Sertifika nasıl alınıyor?",
    a: "Videoları izleyip (her videonun en az yarısı) son testi geçtiğinde katılım sertifikası alırsın; sertifika e-Devlet üzerinden doğrulanabiliyor.",
  },
  {
    q: "Süre ya da içerik değişirse?",
    a: "Her kartta son kontrol tarihi var. Kurum içerikleri güncelleyebilir; bir hata görürsen bildirmen yeterli, düzeltirim.",
  },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteConfig.siteUrl}${PATH}#liste`,
  name: "Ücretsiz ve sertifikalı 10 eğitim",
  itemListElement: egitimler.map((e, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Course",
      name: e.ad,
      description: `${e.konu} · ${e.sure} · ${e.seviye} seviye · katılım sertifikalı`,
      url: e.url,
      inLanguage: "tr",
      isAccessibleForFree: true,
      provider: { "@type": "Organization", name: "BTK Akademi", sameAs: "https://www.btkakademi.gov.tr" },
    },
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.siteUrl}${PATH}#sss`,
  mainEntity: SSS.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function EgitimlerPage() {
  const tamamlanan = egitimler.filter((e) => e.durum === "tamamlandi").length;

  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-4xl px-5">
          <Breadcrumb crumbs={[{ label: "Ana Sayfa", href: "/" }, { label: "Ücretsiz Eğitimler" }]} />
          <p className="mono-label mb-4">Ücretsiz · Türkçe · Sertifikalı</p>
          <h1 className="display text-3xl font-bold text-ink md:text-5xl leading-tight text-balance">
            Ücretsiz ve sertifikalı 10 eğitim
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Excel, veri, yapay zekâ, otomasyon ve kalite becerilerini para ödemeden geliştirmek için seçtiğim 10 eğitim.
            Hepsi BTK Akademi&apos;de; Türkçe, ücretsiz ve katılım sertifikalı.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            Bu eğitimleri ben de sırayla alıyorum. Bitirdiklerimi burada &quot;tamamladım&quot; olarak işaretliyorum;
            bitirmediğim bir eğitime &quot;aldım&quot; demiyorum. Şu an: <strong className="text-ink">{tamamlanan}/{egitimler.length} tamamlandı</strong>.
          </p>
          <p className="mt-6 text-xs text-faint">
            Son kontrol: {tarih(EGITIM_SON_KONTROL)} ·{" "}
            <a href={BTK_UCRETSIZ_DUYURU} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-accent hover:underline">
              BTK Akademi: &quot;Tüm eğitimler ücretsizdir&quot; duyurusu
            </a>
          </p>
        </div>
      </section>

      {/* Kayıt adımları */}
      <section className="mx-auto max-w-4xl px-5 pb-12">
        <h2 className="display text-xl font-bold text-ink md:text-2xl">Nasıl kaydolunur? (3 adım)</h2>
        <ol className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            ["btkakademi.gov.tr", "“Giriş Yap” ile e-Devlet ya da e-posta üzerinden hesap aç."],
            ["Eğitime katıl", "Aşağıdaki karttan resmi eğitim sayfasını aç, “Eğitime Katıl”a bas."],
            ["İzle, test, sertifika", "Her videonun en az yarısını izle, son testi geç, sertifikanı indir."],
          ].map(([h, d], i) => (
            <li key={h} className="rounded-xl border border-line bg-bg-raised/20 p-5">
              <span className="mono-label text-accent">0{i + 1}</span>
              <p className="mt-2 font-semibold text-ink">{h}</p>
              <p className="mt-1 text-sm text-muted">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Eğitim kartları */}
      <section className="mx-auto max-w-4xl px-5 pb-12" aria-labelledby="egitimler-baslik">
        <h2 id="egitimler-baslik" className="display text-xl font-bold text-ink md:text-2xl">Eğitimler</h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {egitimler.map((e, i) => (
            <li key={e.slug} id={e.slug} className="flex flex-col rounded-xl border border-line bg-bg-raised/20 p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="mono-label">{String(i + 1).padStart(2, "0")} · {e.konu}</p>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    e.durum === "tamamlandi" ? "bg-accent text-black" : "border border-line text-muted"
                  }`}
                >
                  {e.durum === "tamamlandi" && e.tamamlanmaTarihi ? `Tamamladım · ${tarih(e.tamamlanmaTarihi)}` : "Alıyorum"}
                </span>
              </div>
              <h3 className="display mt-3 text-lg font-bold leading-snug text-ink">{e.ad}</h3>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                <li className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {e.sure}</li>
                <li className="inline-flex items-center gap-1.5"><Signal className="h-3.5 w-3.5" /> {e.seviye} seviye</li>
                <li className="inline-flex items-center gap-1.5"><Award className="h-3.5 w-3.5" /> Katılım sertifikalı · Ücretsiz</li>
              </ul>
              <p className="mt-3 flex-1 text-sm text-muted"><span className="text-ink">Kime uygun:</span> {e.kime}</p>
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-accent transition-colors hover:text-accent/80"
              >
                Resmi eğitim sayfası <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Nereden başlamalı */}
      <section className="mx-auto max-w-4xl px-5 pb-12">
        <h2 className="display text-xl font-bold text-ink md:text-2xl">Hangisinden başlamalı?</h2>
        <ul className="mt-5 space-y-3">
          {baslangicOnerileri.map((o) => (
            <li key={o.durum} className="rounded-xl border border-line bg-bg-raised/10 p-4 text-sm">
              <span className="font-semibold text-ink">{o.durum}:</span>{" "}
              <span className="text-muted">
                {o.yol.map((s, i) => (
                  <span key={s}>
                    {i > 0 && " → "}
                    <a href={`#${s}`} className="hover:text-accent">{adIle(s)}</a>
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* SSS */}
      <section className="mx-auto max-w-4xl px-5 pb-12">
        <h2 className="display text-xl font-bold text-ink md:text-2xl">Sık sorulanlar</h2>
        <dl className="mt-5 space-y-4">
          {SSS.map(({ q, a }) => (
            <div key={q} className="rounded-xl border border-line bg-bg-raised/10 p-5">
              <dt className="font-semibold text-ink">{q}</dt>
              <dd className="mt-1.5 text-sm text-muted">{a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Tek ve yumuşak CTA */}
      <section className="mx-auto max-w-4xl px-5 pb-24">
        <div className="rounded-2xl border border-line bg-bg-raised/20 p-6 text-center md:p-10">
          <h2 className="display text-xl font-bold text-ink md:text-2xl text-balance">İşletmen için bir sonraki adım</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Eğitimler ekibine beceri kazandırır. İşlerin hâlâ Excel, WhatsApp ya da defterde dağınıksa, 15 dakikalık ücretsiz
            keşif görüşmesinde neyin dijitalleşmesi gerektiğine birlikte bakalım. Instagram&apos;dan <strong className="text-ink">SİSTEM</strong> yazman yeterli.
          </p>
          <Link
            href="/instagram"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
          >
            Keşif görüşmesi için yaz <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
