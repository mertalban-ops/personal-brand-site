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

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const { language, t } = useLanguage();
  const project = getProjectBySlug(slug, language);

  if (!project) notFound();

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
      />

      {/* Summary and Target User */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="display text-2xl font-bold text-ink mb-4">
                {language === "tr" ? "Proje Özeti" : language === "de" ? "Projektübersicht" : "Project Summary"}
              </h2>
              <p className="text-muted leading-relaxed">{project.caseSummary}</p>
            </div>
            <div>
              <h2 className="display text-2xl font-bold text-ink mb-4">
                {language === "tr" ? "Hedef Kullanıcı" : language === "de" ? "Zielgruppe" : "Target User"}
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
            {language === "tr" ? "Çözüm Yaklaşımı" : language === "de" ? "Lösungsansatz" : "Solution Approach"}
          </h2>
          <p className="text-muted leading-relaxed max-w-2xl text-lg">{project.solution}</p>
        </div>
      </AnimatedSection>

      {/* System Modules */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-8">
            {language === "tr" ? "Sistem Modülleri" : language === "de" ? "Systemmodule" : "System Modules"}
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
            {language === "tr" ? "Kullanıcı Yolculuğu" : language === "de" ? "Benutzerreise" : "User Journey"}
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
            {language === "tr" ? "Sağlanan Çıktılar" : language === "de" ? "Ergebnisse" : "Outcomes"}
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
        </div>
      </AnimatedSection>

      {/* Lessons (if any) */}
      {project.lessons && project.lessons.length > 0 && (
        <AnimatedSection>
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="display text-2xl font-bold text-ink mb-6">
              {language === "tr" ? "Öğrenimler" : language === "de" ? "Erkenntnisse" : "Lessons Learned"}
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
              {language === "tr" ? "Gelecek Planlar" : language === "de" ? "Zukunftspläne" : "Future Plans"}
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

      <CaseStudyNextStep />
    </main>
  );
}
