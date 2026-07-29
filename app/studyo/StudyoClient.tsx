"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import CtaStrip from "@/components/CtaStrip";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FounderCard from "@/components/studio/FounderCard";
import { getStudio } from "@/data/studio";
import { useLanguage } from "@/context/LanguageContext";

export default function StudyoClient() {
  const { language } = useLanguage();
  const s = getStudio(language);

  // Localized texts
  const trLabels = {
    crumbs: [{ label: "Ana Sayfa", href: "/" }, { label: "Stüdyo" }],
    kicker: "Stüdyo Yaklaşımı",
    whyHeading: "Neden kuruldu?",
    principlesHeading: "Çalışma İlkeleri",
    techHeading: "Teknoloji Yaklaşımı",
    secHeading: "Güvenlik & Rol Yönetimi",
    ctaReview: "Projeleri İncele",
    ctaContact: "İletişime Geç"
  };

  const enLabels = {
    crumbs: [{ label: "Home", href: "/" }, { label: "Studio" }],
    kicker: "Studio Approach",
    whyHeading: "Why was it built?",
    principlesHeading: "Core Principles",
    techHeading: "Technical Approach",
    secHeading: "Security & Role Access",
    ctaReview: "Review Projects",
    ctaContact: "Get in Touch"
  };

  const deLabels = {
    crumbs: [{ label: "Startseite", href: "/" }, { label: "Studio" }],
    kicker: "Studio-Ansatz",
    whyHeading: "Warum wurde es gegründet?",
    principlesHeading: "Arbeitsprinzipien",
    techHeading: "Technologischer Ansatz",
    secHeading: "Sicherheit & Rollen",
    ctaReview: "Projekte ansehen",
    ctaContact: "Kontakt aufnehmen"
  };

  const l = language === "en" ? enLabels : language === "de" ? deLabels : trLabels;

  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-5">
          <Breadcrumb crumbs={l.crumbs} />
          <p className="mono-label mb-4">{l.kicker}</p>
          <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl">
            {s.brand.name} — {s.brand.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {s.brand.description}
          </p>
        </div>
      </section>

      {/* Why built */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-4">
            {l.whyHeading}
          </h2>
          <p className="text-muted leading-relaxed max-w-2xl text-lg">
            {s.brand.whyBuilt}
          </p>
        </div>
      </AnimatedSection>

      {/* Studio Management */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-8">
            {language === "tr" ? "Stüdyo Yönetimi" : language === "de" ? "Studio-Leitung" : "Studio Management"}
          </h2>
          <FounderCard />
        </div>
      </AnimatedSection>

      {/* Core Principles */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-8">
            {l.principlesHeading}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.founder.principles.map((p) => (
              <div key={p.title} className="card-surface rounded-xl p-6 border border-line bg-surface/10">
                <h3 className="font-semibold text-ink mb-2 text-sm">{p.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Tech and Security */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="display text-xl font-bold text-ink mb-3">
                {l.techHeading}
              </h2>
              <p className="text-sm text-muted leading-relaxed">{s.techApproach}</p>
            </div>
            <div>
              <h2 className="display text-xl font-bold text-ink mb-3">
                {l.secHeading}
              </h2>
              <p className="text-sm text-muted leading-relaxed">{s.securityNote}</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA buttons */}
      <AnimatedSection>
        <div className="mx-auto max-w-3xl px-5 py-12 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/projeler"
              className="rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              {l.ctaReview}
            </Link>
            <Link
              href="/iletisim"
              className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              {l.ctaContact}
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <CtaStrip />
    </main>
  );
}
