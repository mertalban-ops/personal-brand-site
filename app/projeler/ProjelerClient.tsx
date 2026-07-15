"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
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
  const [activeFilter, setActiveFilter] = useState("all");

  // Sync state with URL parameter on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat");
    const validCats = ["customer-project", "product-lab", "concept-work", "internal-project"];
    if (cat && validCats.includes(cat)) {
      setActiveFilter(cat);
    }
  }, []);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    const url = new URL(window.location.href);
    if (filter === "all") {
      url.searchParams.delete("cat");
    } else {
      url.searchParams.set("cat", filter);
    }
    window.history.pushState(null, "", url.pathname + url.search);
  };

  const filterTabs = [
    { id: "all", label: language === "tr" ? "Tümü" : language === "de" ? "Alle" : "All" },
    { id: "customer-project", label: language === "tr" ? "Müşteri Projeleri" : language === "de" ? "Kundenprojekte" : "Customer Projects" },
    { id: "product-lab", label: language === "tr" ? "Ürünler" : language === "de" ? "Produkte" : "Products" },
    { id: "concept-work", label: language === "tr" ? "Konseptler" : language === "de" ? "Konzepte" : "Concepts" },
    { id: "internal-project", label: language === "tr" ? "İç Projeler" : language === "de" ? "Interne Projekte" : "Internal Projects" },
  ];

  // Group definitions matching exact B2B requirement headings
  const categories = [
    {
      id: "customer-project" as ProjectCategory,
      title: language === "tr" ? "Gerçek işletmeler için geliştirilen sistemler" : language === "de" ? "Für echte Unternehmen entwickelte Systeme" : "Systems developed for real businesses",
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
          ? "Geliştirdiğimiz dijital ürünler"
          : language === "de"
          ? "Von uns entwickelte digitale Produkte"
          : "Digital products we develop",
      desc:
        language === "tr"
          ? "Geleceğin SaaS fikirlerini, yapay zekâ entegrasyonlarını ve otomasyon yaklaşımlarını geliştirdiğimiz laboratuvarımız."
          : language === "de"
          ? "Unser Labor, in dem wir SaaS-Ideen, KI-Integrationen und Automatisierungsansätze entwickeln."
          : "Our lab where we test and build future SaaS ideas, AI integrations, and automation approaches.",
    },
    {
      id: "concept-work" as ProjectCategory,
      title:
        language === "tr"
          ? "Konsept ve teknik çözüm çalışmaları"
          : language === "de"
          ? "Konzept- und technische Lösungstudien"
          : "Concept and technical solution works",
      desc:
        language === "tr"
          ? "Teknik mimari yetkinliklerimizi, çok-kiracılı (multi-tenant) sistem tasarımlarımızı gösteren referans modeller."
          : language === "de"
          ? "Referenzmodelle, die unsere technischen Architekturkompetenzen und Mandantensystemdesigns demonstrieren."
          : "Reference models demonstrating our technical architectural capabilities and multi-tenant system designs.",
    },
    {
      id: "internal-project" as ProjectCategory,
      title:
        language === "tr"
          ? "Solvaria için geliştirdiğimiz sistemler"
          : language === "de"
          ? "Für Solvaria entwickelte Systeme"
          : "Systems we develop for Solvaria",
      desc:
        language === "tr"
          ? "Kendi stüdyomuzun dijital varlığını ve işleyişini yönetmek için sıfırdan inşa ettiğimiz çözümler."
          : language === "de"
          ? "Lösungen, die wir von Grund auf neu entwickelt haben, um die digitale Präsenz unseres eigenen Studios zu verwalten."
          : "Bespoke solutions we built from scratch to manage our own studio's digital presence and operations.",
    },
  ];

  const visibleCategories = categories.filter((cat) => activeFilter === "all" || cat.id === activeFilter);

  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-8 md:pt-40 md:pb-12">
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

      {/* Filter Tabs */}
      <section className="relative z-20 mb-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-center gap-2 border-b border-line pb-4" role="tablist" aria-label="Project filter">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleFilterChange(tab.id)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-accent text-[#000000] font-bold shadow-sm"
                      : "border border-line hover:border-accent/40 text-muted hover:text-ink"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories sections */}
      <div className="space-y-16 pb-20 md:pb-28">
        {visibleCategories.map((cat) => {
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
