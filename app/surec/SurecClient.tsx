"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import CtaStrip from "@/components/CtaStrip";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useLanguage } from "@/context/LanguageContext";
import { getProcessSteps, getPricingNote } from "@/data/process";

const labels = {
  tr: {
    breadcrumbHome: "Ana Sayfa",
    breadcrumbPage: "Süreç",
    kicker: "Süreç",
    heading: "Birlikte nasıl çalışıyoruz?",
    subtitle: "Keşif görüşmesinden canlı teslime kadar her adım şeffaf, onay tabanlı ve müşteri odaklı yürür.",
    stepsHeading: "8 Adımlı Çalışma Süreci",
    approvalBadge: "Onay noktası",
    fromYou: "Sizden",
    fromUs: "Bizden",
    output: "Çıktı",
    pricingLabel: "Fiyat ve süre hakkında: ",
    ctaPrimary: "Ücretsiz Keşif Görüşmesi",
    ctaSecondary: "Projeleri İncele",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbPage: "Process",
    kicker: "Process",
    heading: "How do we work together?",
    subtitle: "Every step from the discovery call to live delivery is transparent, approval-based, and client-focused.",
    stepsHeading: "8-Step Work Process",
    approvalBadge: "Approval checkpoint",
    fromYou: "From you",
    fromUs: "From us",
    output: "Output",
    pricingLabel: "About pricing & timeline: ",
    ctaPrimary: "Free Discovery Call",
    ctaSecondary: "Explore Projects",
  },
  de: {
    breadcrumbHome: "Startseite",
    breadcrumbPage: "Prozess",
    kicker: "Prozess",
    heading: "Wie arbeiten wir zusammen?",
    subtitle: "Jeder Schritt vom Erstgespräch bis zur Live-Übergabe ist transparent, genehmigungsbasiert und kundenorientiert.",
    stepsHeading: "8-stufiger Arbeitsprozess",
    approvalBadge: "Genehmigungspunkt",
    fromYou: "Von Ihnen",
    fromUs: "Von uns",
    output: "Ergebnis",
    pricingLabel: "Zu Preis & Zeitplan: ",
    ctaPrimary: "Kostenloses Erstgespräch",
    ctaSecondary: "Projekte erkunden",
  },
};

export default function SurecClient() {
  const { language } = useLanguage();
  const l = labels[language] ?? labels.tr;
  const steps = getProcessSteps(language);
  const pricingNote = getPricingNote(language);

  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-5">
          <Breadcrumb
            crumbs={[
              { label: l.breadcrumbHome, href: "/" },
              { label: l.breadcrumbPage },
            ]}
          />
          <p className="mono-label mb-4">{l.kicker}</p>
          <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl">
            {l.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {l.subtitle}
          </p>
        </div>
      </section>

      {/* Steps */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-10">
            {l.stepsHeading}
          </h2>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="card-surface rounded-2xl p-6 md:p-8"
              >
                <div className="grid gap-6 md:grid-cols-[auto_1fr]">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10">
                    <span className="mono-label text-sm font-bold text-accent">
                      {step.step}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="display text-lg font-bold text-ink">
                        {step.title}
                      </h3>
                      {step.approvalPoint && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                          <CheckCircle2 className="h-3 w-3" />
                          {l.approvalBadge}
                        </span>
                      )}
                    </div>

                    <p className="text-muted leading-relaxed">
                      {step.description}
                    </p>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs font-semibold text-faint uppercase tracking-wide mb-2">
                          {l.fromYou}
                        </p>
                        <ul className="space-y-1">
                          {step.clientProvides.map((item) => (
                            <li key={item} className="text-sm text-muted flex items-start gap-2">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-faint uppercase tracking-wide mb-2">
                          {l.fromUs}
                        </p>
                        <ul className="space-y-1">
                          {step.weDeliver.map((item) => (
                            <li key={item} className="text-sm text-muted flex items-start gap-2">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-faint uppercase tracking-wide mb-2">
                          {l.output}
                        </p>
                        <p className="text-sm text-ink font-medium">
                          {step.output}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="mt-6 ml-6 h-px w-px border-l-2 border-dashed border-line opacity-40 md:ml-[22px]" />
                )}
              </div>
            ))}
          </div>

          {/* Pricing note */}
          <div className="mt-10 rounded-xl border border-line bg-surface/40 px-6 py-5">
            <p className="text-sm text-muted leading-relaxed">
              <span className="font-semibold text-ink">{l.pricingLabel}</span>
              {pricingNote}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/iletisim"
              className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              {l.ctaPrimary}
            </Link>
            <Link
              href="/projeler"
              className="rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              {l.ctaSecondary}
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <CtaStrip />
    </main>
  );
}
