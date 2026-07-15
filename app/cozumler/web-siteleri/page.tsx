import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Layout,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Kurumsal Web Siteleri — Solvaria",
  description:
    "Markanızı yalnızca görünür değil, ikna edici hale getiren hızlı, SEO uyumlu ve premium Next.js web siteleri.",
};

const WEB_TYPES = [
  {
    title: "Kurumsal Web Sitesi",
    desc: "Şirketinizin vizyonunu, referanslarını ve hizmetlerini müşterilerinize en güvenilir şekilde sunan kurumsal dijital kimlik.",
  },
  {
    title: "Kişisel Marka & Portfolyo",
    desc: "Uzmanlığınızı, projelerinizi ve iş yapış şeklinizi öne çıkararak B2B müşterilerin doğrudan sizinle bağ kurmasını sağlayan kişisel marka alanı.",
  },
  {
    title: "SaaS Tanıtım & Landing Page",
    desc: "Yazılım veya dijital ürününüzün değer önerisini, fiyatlandırma planlarını ve özelliklerini sunarak ziyaretçileri aboneliğe dönüştüren tek sayfa vitrin.",
  },
  {
    title: "3D & İnteraktif Deneyimler",
    desc: "Ürünlerinizi veya hizmet süreçlerinizi tarayıcı üzerinde 3D modeller, etkileşimli grafikler ve akıcı animasyonlarla anlatan premium yapılar.",
  },
];

export default function WebSiteleriPage() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-5">
          <Breadcrumb
            crumbs={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Çözümler", href: "/cozumler" },
              { label: "Kurumsal Web Siteleri" },
            ]}
          />
          <p className="mono-label mb-4">Sistem Çözümleri</p>
          <h1 className="display text-4xl font-bold text-ink md:text-5xl lg:text-6xl text-balance max-w-4xl">
            Markanızı yalnızca görünür değil, <span className="text-accent">ikna edici</span> hale getiren web siteleri
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Next.js ve Tailwind CSS’in modern gücüyle; hızıyla arama motorlarını, tasarımıyla ziyaretçileri etkileyen, operasyonel hedeflerinize hizmet eden web siteleri kuruyoruz.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/iletisim"
              className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5 inline-block"
            >
              Web Sitesi Projesi Konuşalım
            </Link>
            <Link
              href="/projeler/personal-brand-site"
              className="rounded-lg border border-line bg-surface/30 px-6 py-3 font-medium text-ink transition-colors hover:border-accent/40 hover:text-accent inline-block"
            >
              Vaka Çalışmasını İnceleyin
            </Link>
          </div>
        </div>
      </section>

      {/* Çözülen Problemler */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="text-center mb-14">
            <p className="mono-label mb-2">Neden Önemli?</p>
            <h2 className="display text-2xl font-bold text-ink md:text-3xl">
              Web sitenizdeki hangi sorunları çözüyoruz?
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                p: "Site eski veya amatör görünüyor, markanıza olan güveni zedeliyor.",
                s: "Kurumsal kimliğinizi yansıtan, modern ve kurumsal tasarım dili.",
              },
              {
                p: "Ziyaretçiler sitenizi inceliyor ancak iletişime geçmeden çıkıyor.",
                s: "Müşterinin karar yolculuğuna uygun net sayfa akışı ve CTA yerleşimi.",
              },
              {
                p: "Siteniz yavaş yükleniyor, mobil kullanıcılar beklemekten sıkılıyor.",
                s: "Next.js statik site üretimi (SSG) ve Core Web Vitals optimizasyonu.",
              },
              {
                p: "Google ve arama motorlarında hizmetleriniz bulunamıyor.",
                s: "Teknik SEO standartları, sitemap, meta yapılandırması ve structured data.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-xl border border-line bg-bg-raised/30 p-5"
              >
                <div>
                  <div className="flex items-center gap-2 text-red-400/80 mb-3">
                    <XCircle className="h-4 w-4 shrink-0" />
                    <span className="text-[0.65rem] font-semibold uppercase tracking-wider">Darboğaz</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed mb-6">{item.p}</p>
                </div>
                <div className="border-t border-line pt-4">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span className="text-[0.65rem] font-semibold uppercase tracking-wider">Sistem Çözümü</span>
                  </div>
                  <p className="text-xs font-semibold text-ink leading-relaxed">{item.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Web Sitesi vs Web Uygulaması Karşılaştırması */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="text-center mb-14">
            <p className="mono-label mb-2">Temel Farklar</p>
            <h2 className="display text-2xl font-bold text-ink md:text-3xl">
              Web Sitesi ile Web Uygulaması arasındaki fark nedir?
            </h2>
            <p className="mt-4 text-muted max-w-2xl mx-auto text-sm leading-relaxed">
              İşletmenizin hangi çözüme ihtiyacı olduğunu netleştirmek, bütçe ve zaman planlaması için ilk adımdır.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-line bg-surface/30">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-line bg-bg-raised/50 text-[0.7rem] font-mono text-faint uppercase tracking-wider">
                  <th className="p-4 md:p-5">Kriter</th>
                  <th className="p-4 md:p-5 text-accent">Kurumsal Web Sitesi</th>
                  <th className="p-4 md:p-5 text-blue">Web Uygulaması (Panel)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60 text-muted">
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-ink">Ana Amaç</td>
                  <td className="p-4 md:p-5">Marka tanıtımı, güven oluşturma, hizmet anlatımı ve lead (müşteri talebi) toplama.</td>
                  <td className="p-4 md:p-5">Kullanıcıların giriş yaptığı, veri eklediği/sildiği, süreç yönettiği ve rapor aldığı çalışan sistem.</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-ink">Kullanıcı Etkileşimi</td>
                  <td className="p-4 md:p-5">İçerik okuma, form doldurma, proje inceleme, WhatsApp’tan doğrudan iletişim.</td>
                  <td className="p-4 md:p-5">Stok girişi, borç kaydı, iş emri atama, PDF hesap ekstresi paylaşma, dashboard izleme.</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-ink">Teknoloji Odağı</td>
                  <td className="p-4 md:p-5">Hızlı FCP (ilk açılış), kusursuz SEO, statik sayfalar (SSG), görsel geçişler ve responsive uyum.</td>
                  <td className="p-4 md:p-5">Güvenli veritabanı (Supabase), rol bazlı yetkilendirme (RBAC), API entegrasyonları, karmaşık formlar.</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-semibold text-ink">Kimler İçin?</td>
                  <td className="p-4 md:p-5">Hizmetlerini internette profesyonelce sunup, yeni B2B müşteriler kazanmak isteyen her işletme.</td>
                  <td className="p-4 md:p-5">Operasyonlarını defter ve Excel’den kurtarıp dijital sisteme bağlamak isteyen KOBİ’ler.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedSection>

      {/* Web Sitesi Türleri */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="text-center mb-14">
            <p className="mono-label mb-2">Hizmet Alanları</p>
            <h2 className="display text-2xl font-bold text-ink md:text-3xl">
              Hangi tür web siteleri geliştiriyoruz?
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {WEB_TYPES.map((type, i) => (
              <div
                key={i}
                className="card-surface rounded-xl p-6 border border-line/45 hover:border-accent/30 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 mb-4">
                  <Layout className="h-5 w-5 text-accent" />
                </div>
                <h3 className="display text-lg font-bold text-ink mb-2">{type.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Hizmet Kapsamı ve Yaklaşımımız */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <p className="mono-label mb-3">Tasarım & Mühendislik</p>
              <h2 className="display text-3xl font-bold text-ink mb-6">
                Sıfırdan yazılan kod, işletmenize tam uyum sağlayan yapı
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Solvaria olarak hazır şablonlar, hantal WordPress eklentileri veya yavaş web kurucuları kullanmıyoruz. Sitenizin her satırını Next.js ile sıfırdan geliştiriyoruz.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Core Web Vitals Standartları", desc: "Açılış hızı Google sıralama kriterleri için en kritik etkendir. Saniyeler içinde açılan sayfalar üretiyoruz." },
                  { title: "Klavye ve Ekran Okuyucu Uyumu (A11y)", desc: "Web sitenizin herkes tarafından kullanılabilir olması için semantik etiketleme ve odak yönetimini önemsiyoruz." },
                  { title: "Structured Data Entegrasyonu", desc: "Arama motorlarının işletmenizi, projelerinizi ve sunduğunuz çözümleri doğru tanıması için arka plana şema yapıları kuruyoruz." },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink text-sm">{item.title}</h4>
                      <p className="text-xs text-muted leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="card-surface rounded-2xl p-6 md:p-8 border border-line bg-gradient-to-br from-bg-raised/40 to-bg-raised/10">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    <span className="text-sm font-semibold text-ink">Personal Brand Site Örneği</span>
                  </div>
                  <span className="rounded bg-accent/10 px-2 py-0.5 text-[0.65rem] font-mono text-accent">Aktif Vaka</span>
                </div>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  Şu an incelediğiniz Solvaria web sitesi, Next.js 16, Tailwind CSS 4 ve Framer Motion ile geliştirdiğimiz çok sayfalı premium kişisel marka sitesine canlı bir örnektir.
                </p>
                <div className="space-y-3 mb-6 border-t border-line/60 pt-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted">Performans Skorları:</span>
                    <span className="font-semibold text-accent">%98+ Mobile / %100 Desktop</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Teknoloji Stack:</span>
                    <span className="font-semibold text-ink">Next.js App Router, TS, Tailwind v4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Özellikler:</span>
                    <span className="font-semibold text-ink">Çok dilli, interaktif, responsive</span>
                  </div>
                </div>
                <Link
                  href="/projeler/personal-brand-site"
                  className="btn-shine glow-accent flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-center text-xs font-semibold text-black"
                >
                  Vaka Çalışmasını İncele <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Süreç Özeti */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="text-center mb-14">
            <p className="mono-label mb-2">Çalışma Şeklimiz</p>
            <h2 className="display text-2xl font-bold text-ink md:text-3xl">
              Web siteniz nasıl geliştirilecek?
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "İhtiyacı Anlama", text: "Hedef kitlenizi, markanızın güçlü yönlerini ve rakipleri analiz ederek bilgi mimarisini kurguluyoruz." },
              { step: "02", title: "Yapıyı Tasarlama", desc: "Sade, okunabilir ve dönüşüm odaklı sayfa akışlarını, mobil öncelikli olacak şekilde tasarlıyoruz." },
              { step: "03", title: "Next.js Geliştirme", text: "Tasarımı en temiz kod yapısıyla, SEO kurallarına ve hız bütçelerine bağlı kalarak Next.js ile kodluyoruz." },
              { step: "04", title: "Test ve Yayına Alma", text: "Tüm linkleri, formları, Core Web Vitals skorlarını ve responsive yapıyı test edip sitenizi Vercel’de yayına alıyoruz." },
            ].map((step, idx) => (
              <div key={idx} className="relative rounded-xl border border-line bg-bg-raised/10 p-5">
                <span className="font-mono text-xs font-bold text-accent">{step.step}</span>
                <h3 className="display mt-2 font-bold text-ink text-sm">{step.title}</h3>
                <p className="text-xs text-muted leading-relaxed mt-2">{step.text || step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/surec"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              Çalışma Sürecimizin Tüm Aşamalarını Görün <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Final CTA */}
      <AnimatedSection>
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <p className="mono-label mb-3">Hemen Başlayın</p>
          <h2 className="display text-3xl font-bold text-ink md:text-4xl mb-6">
            Müşterilerinizin güvenle inceleyeceği dijital vitrininizi birlikte kuralım
          </h2>
          <p className="text-muted leading-relaxed mb-8 max-w-2xl mx-auto">
            Hizmet kapsamını belirlemek, işletmeniz için doğru sayfa yapısını çıkarmak ve fiyat teklifi almak için 15 dakikalık ücretsiz bir keşif görüşmesi planlayabilirsiniz.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/iletisim"
              className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5 inline-block"
            >
              Projenizi Anlatın
            </Link>
            <a
              href="https://wa.me/905000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-line bg-surface/30 px-6 py-3 font-medium text-ink transition-colors hover:border-accent/40 hover:text-accent inline-block"
            >
              WhatsApp&apos;tan Yazın
            </a>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
