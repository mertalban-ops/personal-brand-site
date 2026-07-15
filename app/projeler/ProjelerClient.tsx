"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection";
import Reveal3D from "@/components/Reveal3D";
import FloatingCard from "@/components/FloatingCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { getProjects, ProjectCategory } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjelerClient() {
  const { language, t } = useLanguage();
  const allProjects = getProjects(language);

  // Group definitions
  const categories = [
    {
      id: "customer-project" as ProjectCategory,
      title: language === "tr" ? "Müşteri Projeleri" : language === "de" ? "Kundenprojekte" : "Customer Projects",
      desc:
        language === "tr"
          ? "İşletmelerin operasyonel darboğazlarını çözmek için özel geliştirilmiş ve canlıda çalışan aktif sistemler."
          : language === "de"
          ? "Speziell entwickelte und live funktionierende Systeme zur Lösung betrieblicher Engpässe von Unternehmen."
          : "Bespoke systems specially developed and actively running to resolve operational bottlenecks for businesses.",
    },
    {
      id: "product-lab" as ProjectCategory,
      title:
        language === "tr"
          ? "Solvaria Ürün Laboratuvarı"
          : language === "de"
          ? "Solvaria Produktlabor"
          : "Solvaria Product Lab",
      desc:
        language === "tr"
          ? "Geleceğin SaaS fikirlerini, yapay zekâ entegrasyonlarını ve otomasyon yaklaşımlarını geliştirdiğimiz laboratuvarımız."
          : language === "de"
          ? "Unser Labor, in dem wir SaaS-Ideen, KI-Integrationen und Automatisierungsansätze entwickeln."
          : "Our lab where we test and build future SaaS ideas, AI integrations, and automation approaches.",
    },
    {
      id: "internal-project" as ProjectCategory,
      title: language === "tr" ? "İç Projeler" : language === "de" ? "Interne Projekte" : "Internal Projects",
      desc:
        language === "tr"
          ? "Kendi stüdyomuzun dijital varlığını ve işleyişini yönetmek için sıfırdan inşa ettiğimiz çözümler."
          : language === "de"
          ? "Lösungen, die wir von Grund auf neu entwickelt haben, um die digitale Präsenz unseres eigenen Studios zu verwalten."
          : "Bespoke solutions we built from scratch to manage our own studio's digital presence and operations.",
    },
    {
      id: "concept-work" as ProjectCategory,
      title:
        language === "tr"
          ? "Çözüm Yetkinlikleri & Konsept Mimari"
          : language === "de"
          ? "Lösungskompetenzen & Konzeptarchitektur"
          : "Solution Capabilities & Concept Architecture",
      desc:
        language === "tr"
          ? "Teknik mimari yetkinliklerimizi, çok-kiracılı (multi-tenant) sistem tasarımlarımızı gösteren referans modeller."
          : language === "de"
          ? "Referenzmodelle, die unsere technischen Architekturkompetenzen und Mandantensystemdesigns demonstrieren."
          : "Reference models demonstrating our technical architectural capabilities and multi-tenant system designs.",
    },
  ];

  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-5">
          <p className="mono-label mb-4">{t.projects.label}</p>
          <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl">
            {language === "tr"
              ? "Gerçek firmalar için gerçek sistemler"
              : language === "de"
              ? "Echte Systeme für echte Unternehmen"
              : "Real systems for real businesses"}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {language === "tr"
              ? "Her proje, terzi usulü süreç analizi ve özel kodlama ile geliştirilmiştir. Hazır şablonlar veya kısıtlayıcı ERP sistemleri yerine, işletmenin gerçek çalışma düzenine odaklanıyoruz."
              : language === "de"
              ? "Jedes Projekt wurde mit einer maßgeschneiderten Prozessanalyse und individueller Codierung entwickelt. Wir konzentrieren uns auf den tatsächlichen Arbeitsablauf des Unternehmens."
              : "Each project was developed with bespoke process analysis and custom coding. Instead of rigid templates or restrictive ERPs, we focus on the actual daily operation of the business."}
          </p>
        </div>
      </section>

      {/* Categories sections */}
      <div className="space-y-16 pb-20 md:pb-28">
        {categories.map((cat) => {
          const list = allProjects.filter((p) => p.category === cat.id);
          if (list.length === 0) return null;

          return (
            <AnimatedSection key={cat.id} className="relative">
              <div className="mx-auto max-w-6xl px-5">
                {/* Category Header */}
                <div className="border-b border-line pb-4 mb-8">
                  <h2 className="display text-xl font-bold text-ink md:text-2xl flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {cat.title}
                  </h2>
                  <p className="mt-2 text-xs text-muted max-w-2xl leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                {/* Grid */}
                <div className="grid gap-6 sm:grid-cols-2">
                  {list.map((project, i) => (
                    <Reveal3D key={project.slug} delay={(i % 2) * 0.1} className="h-full">
                      <FloatingCard maxTilt={2} className="h-full">
                        <article className="card-surface flex h-full flex-col gap-5 rounded-xl p-5 transition-colors hover:border-accent/40 md:p-6">
                          {/* Header */}
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="display text-xl font-bold text-ink">{project.name}</h3>
                              <p className="mt-1 text-xs text-muted">{project.tagline}</p>
                            </div>
                            <StatusBadge status={project.status} />
                          </div>

                          {/* Tech stack */}
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                className="rounded border border-line bg-bg-raised/30 px-2 py-0.5 text-[0.65rem] font-medium text-muted"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Summary */}
                          <p className="text-xs text-muted leading-relaxed flex-grow">
                            {project.caseSummary}
                          </p>

                          {/* Footer CTA */}
                          <div className="border-t border-line/60 pt-4 flex items-center justify-between gap-4">
                            <p className="text-xs font-semibold text-ink line-clamp-1">
                              {project.benefit}
                            </p>
                            {project.category !== "concept-work" ? (
                              <Link
                                href={`/projeler/${project.slug}`}
                                className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent opacity-80 transition-all hover:opacity-100 hover:gap-2.5"
                              >
                                {language === "tr" ? "İncele" : language === "de" ? "Prüfen" : "Review"} <ArrowRight className="h-3 w-3" />
                              </Link>
                            ) : (
                              <span className="shrink-0 text-[0.65rem] font-mono text-faint uppercase">
                                {language === "tr" ? "Konsept Mimari" : language === "de" ? "Konzept" : "Concept"}
                              </span>
                            )}
                          </div>
                        </article>
                      </FloatingCard>
                    </Reveal3D>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </main>
  );
}
