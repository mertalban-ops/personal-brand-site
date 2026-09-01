"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  MessageCircle,
  Download,
  Star,
  MapPin,
} from "lucide-react";
import { track } from "@vercel/analytics";
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { siteConfig } from "@/data/config";
import { trackContact, trackLead } from "@/lib/meta-events";
import {
  packages,
  maintenance,
  exclusions,
  losses,
  steps,
  faqs,
  waMessages,
  events,
  teklifPdfPath,
} from "@/data/oto-servis";

const wa = (msg: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;

const fire = (event: string) => {
  try {
    track(event);
    trackContact();
  } catch {
    // yoksay
  }
};

export default function OtoServisClient() {
  const reduce = useReducedMotion();

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* a. HERO */}
      <section className="relative pt-32 pb-14 md:pt-40 md:pb-20">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-4xl px-5 text-center">
          <Breadcrumb crumbs={[{ label: "Ana Sayfa", href: "/" }, { label: "Oto Servis Web Sitesi" }]} />
          <p className="mono-label mb-4">Oto Servisler İçin</p>
          <h1 className="display text-3xl font-bold text-ink md:text-5xl text-balance">
            Müşteri servisi Google'da arıyor.{" "}
            <span className="text-accent">Bir sayfan yoksa seni bulamıyor.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Oto servis, kaporta-boya ve oto elektrikçiler için sade, hızlı ve senin işletmene ait
            bir web sitesi. Sabit fiyat, açık kapsam, sürpriz yok.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#paketler"
              onClick={() => {
                try { track(events.paketleriGor); } catch {}
              }}
              className="btn-shine glow-accent inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              Paketleri ve fiyatları gör <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={wa(waMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => fire(events.whatsapp)}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface/30 px-6 py-3.5 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp'tan yaz
            </a>
          </div>
        </div>
      </section>

      {/* b. SOSYAL KANIT — Hezer (doğrulanmış, aynı sektör, aynı şehir) */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-4xl px-5 py-14">
          <div className="rounded-2xl border border-line bg-bg-raised/30 p-6 md:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-accent/10 px-2.5 py-1 text-[0.7rem] font-semibold text-accent">
                <Star className="h-3.5 w-3.5" /> Doğrulanmış Müşteri
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                <MapPin className="h-3.5 w-3.5 text-accent" /> Aynı sektör · Aynı şehir (İzmir)
              </span>
            </div>
            <blockquote className="text-base leading-relaxed text-ink md:text-lg">
              “Artık borç takibini rahatça yapabiliyorum, gelir-giderimi anlık görebiliyorum. İşimi
              gerçekten kolaylaştırdı, çok pratik oldu. Geçen gün bir aracı teslim ettikten hemen
              sonra servis raporunu müşteriye PDF olarak gönderdim — hem zamandan kazandım hem de
              dükkâna gerçek anlamda oturmuş bir sistemim oldu.”
            </blockquote>
            <div className="mt-5 flex items-center justify-between gap-4 border-t border-line/60 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                  SH
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">Serdar Hezer</p>
                  <p className="text-xs text-muted">Sahibi, Hezer Otoşanzıman · İzmir</p>
                </div>
              </div>
              <Link
                href="/projeler/hezer-otosanziman-site"
                className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-accent hover:underline sm:inline-flex"
              >
                Çalışmayı gör <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* c. SİTESİ OLMAYAN SERVİSİN KAYBETTİĞİ ÜÇ ŞEY */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mb-12 text-center">
            <p className="mono-label mb-2">Neden Önemli</p>
            <h2 className="display text-2xl font-bold text-ink md:text-3xl">
              Sitesi olmayan bir servisin kaybettiği üç şey
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {losses.map((item, i) => (
              <motion.div
                key={item.title}
                {...enter(0.1 * i)}
                className="rounded-xl border border-line bg-bg-raised/20 p-6"
              >
                <div className="mb-3 flex items-center gap-2 text-red-400/80">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span className="text-[0.65rem] font-semibold uppercase tracking-wider">Kayıp</span>
                </div>
                <h3 className="display mb-2 text-lg font-bold text-ink">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* d. PAKETLER VE FİYATLAR */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div id="paketler" className="mx-auto max-w-6xl px-5 py-20 scroll-mt-24">
          <div className="mb-4 text-center">
            <p className="mono-label mb-2">Paketler ve Fiyatlar</p>
            <h2 className="display text-2xl font-bold text-ink md:text-3xl">
              Sabit fiyat. Açık kapsam. Sürpriz yok.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
              Fiyatlar KDV hariçtir ve WhatsApp'tan gönderdiğimiz teklifle aynıdır.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {packages.map((p) => (
              <div
                key={p.id}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  p.highlight
                    ? "border-accent/50 bg-bg-raised/40 shadow-lg shadow-accent/5"
                    : "border-line bg-bg-raised/20"
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[0.65rem] font-bold text-black">
                    En çok tercih edilen
                  </span>
                )}
                <h3 className="display text-xl font-bold text-ink">{p.name}</h3>
                <p className="mt-3 text-3xl font-bold text-accent">{p.priceLabel}</p>
                <p className="mt-3 min-h-[3.5rem] text-sm leading-relaxed text-muted">{p.tagline}</p>

                <ul className="mt-5 space-y-2.5 border-t border-line/60 pt-5">
                  {p.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-sm text-ink">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 space-y-1.5 border-t border-line/60 pt-4 text-xs text-muted">
                  <p>Teslim: <span className="font-semibold text-ink">{p.deliveryDays}</span></p>
                  <p>Düzeltme: <span className="font-semibold text-ink">{p.revisions}</span></p>
                </div>

                <a
                  href={wa(waMessages.pkg(p.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => fire(events.whatsapp)}
                  className={`btn-shine mt-6 inline-flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                    p.highlight
                      ? "glow-accent bg-accent text-black"
                      : "border border-line text-ink hover:border-accent/50 hover:text-accent"
                  }`}
                >
                  <MessageCircle className="h-4 w-4" /> Bu paketi konuşalım
                </a>
              </div>
            ))}
          </div>

          {/* Bakım */}
          <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-line bg-bg-raised/10 p-5 text-center">
            <p className="text-sm text-ink">
              <span className="font-bold text-accent">{maintenance.priceLabel}</span> — {maintenance.desc}
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* e. DAHİL DEĞİLDİR */}
      <AnimatedSection>
        <div className="mx-auto max-w-3xl px-5 py-16">
          <div className="rounded-2xl border border-line bg-bg-raised/20 p-6 md:p-8">
            <h2 className="display mb-4 text-xl font-bold text-ink">Fiyata dahil değildir</h2>
            <p className="mb-5 text-sm text-muted">
              Dürüst olmak için baştan söylüyoruz. Aşağıdakiler paket fiyatına dahil değildir:
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {exclusions.map((ex) => (
                <li key={ex} className="flex items-start gap-2.5 text-sm text-muted">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-faint" />
                  <span>{ex}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>

      {/* f. ÜÇ ADIMLI SÜREÇ */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mb-12 text-center">
            <p className="mono-label mb-2">Nasıl İlerliyoruz</p>
            <h2 className="display text-2xl font-bold text-ink md:text-3xl">Üç adımda hazır</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                {...enter(0.1 * i)}
                className="rounded-xl border border-line bg-bg-raised/20 p-6"
              >
                <span className="font-mono text-2xl font-bold text-accent">{s.step}</span>
                <h3 className="display mt-2 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* g. SSS */}
      <AnimatedSection>
        <div className="mx-auto max-w-3xl px-5 py-20">
          <div className="mb-10 text-center">
            <p className="mono-label mb-2">Sık Sorulan Sorular</p>
            <h2 className="display text-2xl font-bold text-ink md:text-3xl">Aklına takılanlar</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-line bg-bg-raised/20 p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-ink">
                  {f.q}
                  <ArrowRight className="h-4 w-4 shrink-0 text-accent transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* h. KAPANIŞ CTA */}
      <AnimatedSection className="band-petrol border-t border-line">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h2 className="display text-3xl font-bold text-ink md:text-4xl">
            Kısa bir mesaj at, gerisini konuşalım
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted">
            Hangi paketin sana uygun olduğundan emin değilsen dert etme. WhatsApp'tan yaz, birlikte
            karar verelim. Teklifi PDF olarak da indirebilirsin.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={wa(waMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => fire(events.whatsapp)}
              className="btn-shine glow-accent inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp'tan yaz
            </a>
            <a
              href={teklifPdfPath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                try { track(events.teklifIndir); trackLead(); } catch {}
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3.5 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              <Download className="h-4 w-4" /> Teklifi PDF indir
            </a>
          </div>

          {/* Yüksek taahhütlü seçenek */}
          <p className="mt-8 text-sm text-muted">
            Daha ayrıntılı konuşmak istersen{" "}
            <Link
              href="/iletisim"
              onClick={() => {
                try { track(events.ihtiyacAnalizi); } catch {}
              }}
              className="font-semibold text-accent underline underline-offset-2"
            >
              ücretsiz ihtiyaç analizi
            </Link>{" "}
            planlayabilirsin.
          </p>

          {/* Örnekler bağlantısı — sadece buradan verilir */}
          <p className="mt-3 text-sm text-muted">
            Örnek çalışmaları görmek ister misin?{" "}
            <Link href="/ornekler" className="font-semibold text-accent underline underline-offset-2">
              Örnekleri incele
            </Link>
          </p>
        </div>
      </AnimatedSection>
    </main>
  );
}
