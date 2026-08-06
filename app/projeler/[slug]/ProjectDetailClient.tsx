"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection";
import CaseStudyHero from "@/components/projects/CaseStudyHero";
import CaseStudyNextStep from "@/components/projects/CaseStudyNextStep";
import { getProjectBySlug, getProjects } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { trackViewContent } from "@/lib/meta-events";

// Dynamic lazy import of visual preview mockups
import dynamic from "next/dynamic";

const StockAppPreview = dynamic(() => import("@/components/previews/StockAppPreview"), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-bg-raised w-full h-full rounded-xl" />,
});
const AutoServicePreview = dynamic(() => import("@/components/previews/AutoServicePreview"), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-bg-raised w-full h-full rounded-xl" />,
});
const CarpassPreview = dynamic(() => import("@/components/previews/CarpassPreview"), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-bg-raised w-full h-full rounded-xl" />,
});

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const { language, t } = useLanguage();
  const project = getProjectBySlug(slug, language);

  if (!project) notFound();

  useEffect(() => {
    trackViewContent(slug);
  }, [slug]);

  const isConcept = project.category === "concept-work";

  const sectionLabels: Record<string, Record<string, string>> = {
    tr: {
      summary: isConcept ? "Çözülmek İstenen Problem" : "Proje Özeti",
      target: isConcept ? "Hedeflenen Kullanıcı Kitlesi" : "Hedef Kullanıcı",
      solution: isConcept ? "Mimari Yaklaşım ve Hedefler" : "Çözüm Yaklaşımı",
      modules: isConcept ? "Önerilen Sistem Bileşenleri" : "Sistem Modülleri",
      journey: isConcept ? "Örnek Ürünleştirme Akışı" : "Kullanıcı Yolculuğu",
      outcomes: isConcept ? "Mimari Hedefler & Faydalar" : "Sağlanan Çıktılar",
      lessons: isConcept ? "Teknik Kararlar" : "Öğrenimler",
      future: isConcept ? "Genişletilebilir Modüller" : "Gelecek Planlar",
    },
    en: {
      summary: isConcept ? "Problem to Solve" : "Project Summary",
      target: isConcept ? "Target User Group" : "Target User",
      solution: isConcept ? "Architectural Approach & Goals" : "Solution Approach",
      modules: isConcept ? "Proposed System Components" : "System Modules",
      journey: isConcept ? "Example Product Flow" : "User Journey",
      outcomes: isConcept ? "Architectural Targets & Benefits" : "Outcomes",
      lessons: isConcept ? "Technical Decisions" : "Lessons Learned",
      future: isConcept ? "Extensible Modules" : "Future Plans",
    },
    de: {
      summary: isConcept ? "Zu lösendes Problem" : "Projektübersicht",
      target: isConcept ? "Zielgruppe" : "Zielgruppe",
      solution: isConcept ? "Architekturansatz & Ziele" : "Lösungsansatz",
      modules: isConcept ? "Vorgeschlagene Systemkomponenten" : "Systemmodule",
      journey: isConcept ? "Beispielhafter Produktfluss" : "Benutzerreise",
      outcomes: isConcept ? "Architektonische Ziele & Vorteile" : "Ergebnisse",
      lessons: isConcept ? "Technische Entscheidungen" : "Erkenntnisse",
      future: isConcept ? "Erweiterbare Module" : "Zukunftspläne",
    }
  };

  const l = sectionLabels[language] || sectionLabels.tr;

  // Filter other projects to display in local language
  const otherProjects = getProjects(language).filter((p) => p.slug !== project.slug);

  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      <CaseStudyHero
        name={project.name}
        tagline={project.tagline}
        status={project.status}
        problem={project.problem}
        tech={project.tech}
        category={project.category}
      />

      {/* Visual Prototype / Interactive Mockup */}
      {(project.slug === "stockapp" || project.slug === "hezer-auto-service" || project.slug === "carpass") && (
        <AnimatedSection className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <div className="grid gap-10 lg:grid-cols-5 items-center">
              <div className="lg:col-span-2">
                <span className="mono-label mb-2 block">
                  {language === "tr" ? "TEMSİLİ ARAYÜZ GÖRSELİ" : language === "de" ? "REPRÄSENTATIVE ANSICHT" : "REPRESENTATIVE INTERFACE"}
                </span>
                <h2 className="display text-3xl font-bold text-ink mb-4">
                  {language === "tr" ? "Sistem Arayüzü ve Akış Tasarımı" : language === "de" ? "Systemoberfläche & Ablaufdesign" : "System Interface & Flow Design"}
                </h2>
                <p className="text-muted leading-relaxed">
                  {language === "tr"
                    ? "İşletmenin ihtiyaçlarına göre tasarlanan operasyonel arayüzün temsili görseli. Gerçek uygulama ekranlarından ilham alınarak hazırlanmıştır."
                    : language === "de"
                    ? "Repräsentative Darstellung der operativen Benutzeroberfläche, inspiriert von den echten Anwendungsbildschirmen."
                    : "Representative visualization of the operational interface, inspired by actual application screens."}
                </p>
              </div>
              <div className="lg:col-span-3 card-surface p-6 rounded-2xl border border-line relative overflow-hidden bg-bg-raised/10">
                <div className="w-full h-80 rounded-xl overflow-hidden bg-bg">
                  {project.slug === "stockapp" && <StockAppPreview reduce={false} />}
                  {project.slug === "hezer-auto-service" && <AutoServicePreview reduce={false} />}
                  {project.slug === "carpass" && <CarpassPreview reduce={false} />}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Summary and Target User */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="display text-2xl font-bold text-ink mb-4">
                {l.summary}
              </h2>
              <p className="text-muted leading-relaxed">{project.caseSummary}</p>
            </div>
            <div>
              <h2 className="display text-2xl font-bold text-ink mb-4">
                {l.target}
              </h2>
              <p className="text-muted leading-relaxed">{project.targetUser}</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Solution Approach */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-4">
            {l.solution}
          </h2>
          <p className="text-muted leading-relaxed max-w-2xl text-lg">{project.solution}</p>
        </div>
      </AnimatedSection>

      {/* System Modules */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-8">
            {l.modules}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {project.caseModules.map((mod) => (
              <div key={mod.name} className="card-surface rounded-xl p-5">
                <h3 className="font-semibold text-ink mb-3 text-sm">{mod.name}</h3>
                <ul className="space-y-1.5">
                  {mod.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted">
                      <span className="h-1 w-1 rounded-full bg-accent/70 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* User Journey */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-8">
            {l.journey}
          </h2>
          <ol className="space-y-4">
            {project.userJourney.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-muted">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </AnimatedSection>

      {/* Outcomes */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-6">
            {l.outcomes}
          </h2>
          <div className="space-y-3">
            {project.outcomes.map((o) => (
              <div
                key={o}
                className="flex items-start gap-4 rounded-xl border border-line bg-accent/5 p-5"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                <span className="font-medium text-ink">{o}</span>
              </div>
            ))}
          </div>

          {/* Before / After metrics (only when real data exists) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-10">
              <p className="mono-label mb-4">
                {language === "tr" ? "ÖLÇÜLEBILIR ETKİ" : language === "de" ? "MESSBARER EINFLUSS" : "MEASURABLE IMPACT"}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-line bg-bg-raised/30 p-5"
                  >
                    <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">{m.label}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-center">
                        <p className="text-xs text-red-400/70 mb-0.5">{language === "tr" ? "Önce" : language === "de" ? "Vorher" : "Before"}</p>
                        <p className="font-bold text-red-400">{m.before}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-accent" />
                      <div className="flex-1 rounded-lg bg-accent/10 border border-accent/20 px-3 py-2 text-center">
                        <p className="text-xs text-accent/70 mb-0.5">{language === "tr" ? "Sonra" : language === "de" ? "Nachher" : "After"}</p>
                        <p className="font-bold text-accent">{m.after}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Client Testimonial (only when real, non-placeholder text exists) */}
      {project.clientTestimonial && !project.clientTestimonial.text.includes("eklenecek") && (
        <AnimatedSection>
          <div className="mx-auto max-w-6xl px-5 py-16">
            <p className="mono-label mb-6">
              {language === "tr" ? "MÜŞTERİ YORUMU" : language === "de" ? "KUNDENFEEDBACK" : "CLIENT FEEDBACK"}
            </p>
            <div className="relative card-surface rounded-2xl p-8 md:p-10 border border-line hover:border-accent/30 transition-colors max-w-3xl">
              <div
                className="absolute -top-5 left-10 select-none text-7xl font-serif leading-none"
                style={{ color: "var(--accent)", opacity: 0.2 }}
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <blockquote className="relative z-10">
                <p className="text-lg md:text-xl font-medium text-ink leading-relaxed">
                  {project.clientTestimonial.text}
                </p>
                <footer className="mt-6 flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-black"
                    style={{ background: "var(--accent)" }}
                    aria-hidden="true"
                  >
                    {project.clientTestimonial.author.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-sm">{project.clientTestimonial.author}</p>
                    <p className="text-xs text-muted">{project.clientTestimonial.role}</p>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Lessons (if any) */}
      {project.lessons && project.lessons.length > 0 && (
        <AnimatedSection>
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="display text-2xl font-bold text-ink mb-6">
              {l.lessons}
            </h2>
            <ul className="space-y-3">
              {project.lessons.map((lesson) => (
                <li key={lesson} className="flex items-start gap-3 text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                  {lesson}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      )}

      {/* Future Work (if any) */}
      {project.futureWork && project.futureWork.length > 0 && (
        <AnimatedSection className="band-petrol border-y border-line">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="display text-2xl font-bold text-ink mb-6">
              {l.future}
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.futureWork.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-line bg-bg-raised/30 px-4 py-2 text-sm text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Live Url (if any) */}
      {project.liveUrl && (
        <AnimatedSection>
          <div className="mx-auto max-w-6xl px-5 py-10">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-accent/40 px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/5"
            >
              <ExternalLink className="h-4 w-4" />
              {language === "tr" ? "Canlı Sistemi Görüntüle" : language === "de" ? "Live-System anzeigen" : "View Live System"}
            </a>
          </div>
        </AnimatedSection>
      )}

      {/* Other Projects */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="mono-label mb-3">{t.projects.label}</p>
          <h2 className="display text-2xl font-bold text-ink mb-8">
            {language === "tr" ? "Başka ne geliştirdik?" : language === "de" ? "Was haben wir noch entwickelt?" : "What else have we developed?"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/projeler/${p.slug}`}
                className="card-surface group rounded-xl p-5 transition-all hover:border-accent/40"
              >
                <h3 className="font-semibold text-ink mb-1 text-sm group-hover:text-accent transition-colors">
                  {p.name}
                </h3>
                <p className="text-xs text-muted leading-relaxed mb-3">{p.tagline}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent opacity-70 group-hover:opacity-100 group-hover:gap-2 transition-all">
                  {language === "tr" ? "İncele" : language === "de" ? "Prüfen" : "Review"} <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <CaseStudyNextStep projectSlug={project.slug} projectName={project.name} />
    </main>
  );
}
