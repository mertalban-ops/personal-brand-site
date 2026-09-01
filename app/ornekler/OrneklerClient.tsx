"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle, Info, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { siteConfig } from "@/data/config";
import { ornekler, disclaimer, ornekLabels } from "@/data/ornekler";
import { getOtoServis, events } from "@/data/oto-servis";
import { useLanguage } from "@/context/LanguageContext";
import { track } from "@vercel/analytics";
import { trackContact } from "@/lib/meta-events";

export default function OrneklerClient() {
  const { language } = useLanguage();
  const L = ornekLabels[language] ?? ornekLabels.tr;
  const waGeneral = getOtoServis(language).waMessages.general;
  const reduce = useReducedMotion();
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  const crumbHome = language === "de" ? "Startseite" : language === "en" ? "Home" : "Ana Sayfa";

  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      <section className="relative pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-4xl px-5 text-center">
          <Breadcrumb crumbs={[{ label: crumbHome, href: "/" }, { label: L.galleryKicker }]} />
          <p className="mono-label mb-4">{L.galleryKicker}</p>
          <h1 className="display text-3xl font-bold text-ink md:text-5xl text-balance">{L.galleryTitle}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">{L.galleryDesc}</p>
        </div>
      </section>

      {/* Zorunlu görünür uyarı */}
      <div className="mx-auto max-w-4xl px-5">
        <div className="flex items-start gap-3 rounded-xl border border-line bg-bg-raised/30 p-4 text-sm text-muted">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p>{disclaimer[language] ?? disclaimer.tr}</p>
        </div>
      </div>

      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {ornekler.map((o, i) => {
              const t = o.i18n[language] ?? o.i18n.tr;
              return (
                <motion.div key={o.slug} {...enter(0.08 * i)}>
                  <Link
                    href={`/ornekler/${o.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-bg-raised/20 transition-colors hover:border-accent/40"
                  >
                    {/* temsili görsel bant */}
                    <div
                      className="relative h-32 w-full"
                      style={{
                        background: `linear-gradient(135deg, ${o.accent}22, transparent 70%)`,
                        borderBottom: "1px solid var(--line)",
                      }}
                    >
                      <span className="absolute left-3 top-3 rounded-md bg-black/40 px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-white/80 backdrop-blur">
                        {L.sampleTag}
                      </span>
                      <span
                        className="absolute bottom-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold"
                        style={{ background: `${o.accent}22`, color: o.accent }}
                      >
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-accent">{t.sector}</p>
                      <h2 className="display mt-1 text-lg font-bold text-ink">{t.name}</h2>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                        <MapPin className="h-3 w-3" /> {t.city}
                      </p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{t.summary}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                        {L.openExample} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="band-petrol border-t border-line">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className="display text-2xl font-bold text-ink md:text-3xl">{L.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{L.ctaDesc}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/oto-servis-web-sitesi#paketler"
              className="btn-shine glow-accent inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              {L.ctaPackages} <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(waGeneral)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { try { track(events.whatsapp); trackContact(); } catch {} }}
              className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3.5 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              <MessageCircle className="h-4 w-4" /> {L.ctaWhatsapp}
            </a>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
