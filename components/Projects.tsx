"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import FloatingCard from "./FloatingCard";
import Reveal3D from "./Reveal3D";
import { useLanguage } from "@/context/LanguageContext";
import { useActiveProject, type RobotProjectType } from "@/context/ActiveProjectContext";

const ProjectDemoVideo = dynamic(() => import("./ProjectDemoVideo"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[260px] rounded-2xl bg-bg-raised/30 border border-line animate-pulse" />
  ),
});


function getStatusStyle(s: string) {
  s = s.toLowerCase();
  if (s.includes("aktif") || s.includes("active") || s.includes("aktiv") || s.includes("canlı") || s.includes("live")) return "bg-accent/15 text-accent";
  if (s.includes("geliştirme") || s.includes("development") || s.includes("entwicklung")) return "bg-blue/15 text-blue";
  return "bg-ink/10 text-muted";
}

export default function Projects() {
  const { t, language } = useLanguage();
  const { activeType, setActiveType } = useActiveProject();

  const liveClientProjects = t.projects.items.filter(p =>
    p.slug === "stockapp" || p.slug === "hezer-auto-service" || p.slug === "hezer-otosanziman-site"
  );
  const productLabProjects = t.projects.items.filter(p => p.slug === "carpass");
  const conceptProjects = t.projects.items.filter(p => p.slug === "saas-operasyon-altyapisi");

  const renderCard = (p: typeof t.projects.items[0], index: number, cta1: string, cta2: string) => {
    return (
      <Reveal3D key={p.name} delay={(index % 2) * 0.12} className="h-full">
        <FloatingCard maxTilt={2} className="h-full">
          <article
            className="card-surface flex h-full flex-col gap-5 rounded-xl p-5 transition-colors hover:border-accent/40 md:p-6"
            onMouseEnter={() => setActiveType(p.previewType as RobotProjectType)}
            onMouseLeave={() => setActiveType(null)}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="display text-2xl font-bold text-ink">{p.name}</h3>
                <p className="mt-1 text-sm text-muted">{p.tagline}</p>
              </div>
              <span
                className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold ${getStatusStyle(p.status)}`}
              >
                {p.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {p.tech.map((tech) => (
                <span key={tech} className="rounded border border-line bg-bg-raised/30 px-2 py-0.5 text-[0.65rem] font-medium text-muted">
                  {tech}
                </span>
              ))}
            </div>

            <dl className="space-y-4 text-sm leading-relaxed flex-grow">
              <div>
                <dt className="mono-label" style={{ fontSize: "0.6rem", color: "var(--faint)" }}>
                  {t.projects.problemLabel}
                </dt>
                <dd className="mt-0.5 text-muted">{p.problem}</dd>
              </div>
              <div>
                <dt className="mono-label" style={{ fontSize: "0.6rem", color: "var(--faint)" }}>
                  {t.projects.featuresLabel}
                </dt>
                <dd className="mt-1">
                  <ul className="space-y-1.5 text-xs text-muted">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            <div className="border-t border-line/50 pt-5">
              <div className="flex items-center justify-between">
                <Link
                  href={`/projeler/${p.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent opacity-80 transition-opacity hover:opacity-100"
                >
                  {cta1} <span>→</span>
                </Link>
                <a
                  href="/iletisim"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent opacity-80 transition-opacity hover:opacity-100"
                >
                  {cta2}
                </a>
              </div>
            </div>

            <ProjectDemoVideo type={p.previewType as "stockapp" | "auto-service" | "carpass" | "business-dashboard"} play={activeType === p.previewType} />
          </article>
        </FloatingCard>
      </Reveal3D>
    );
  };

  return (
    <AnimatedSection id="projeler">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="text-center mb-16">
          <p className="mono-label mb-3">{t.projects.label}</p>
          <h2 className="display text-3xl font-bold text-ink md:text-4xl text-balance max-w-2xl mx-auto">
            {t.projects.title}
          </h2>
        </div>

        {/* 1. Canlı Müşteri Projeleri */}
        <div className="mb-16">
          <h3 className="display text-lg font-bold text-ink mb-6 border-l-2 border-accent pl-3">
            {language === "tr" ? "Canlı Müşteri Projeleri" : language === "de" ? "Live-Kundenprojekte" : "Live Client Projects"}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {liveClientProjects.map((p, i) =>
              renderCard(
                p,
                i,
                language === "tr" ? "Vaka Çalışmasını İncele" : language === "de" ? "Fallstudie ansehen" : "Read Case Study",
                language === "tr" ? "Benzerini İstiyorum" : language === "de" ? "Ähnliches System anfragen" : "Request Similar System"
              )
            )}
          </div>
        </div>

        {/* 2. Albanexa Ürün Laboratuvarı */}
        <div className="mb-16">
          <h3 className="display text-lg font-bold text-ink mb-6 border-l-2 border-blue pl-3">
            {language === "tr" ? "Albanexa Ürün Laboratuvarı" : language === "de" ? "Albanexa Produktlabor" : "Albanexa Product Lab"}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
            {productLabProjects.map((p, i) =>
              renderCard(
                p,
                i,
                language === "tr" ? "Ürün Geliştirme Sürecini İncele" : language === "de" ? "Produktentwicklung ansehen" : "Explore Product Development",
                language === "tr" ? "Ürün Fikrinizi Konuşalım" : language === "de" ? "Produktidee besprechen" : "Discuss Product Idea"
              )
            )}
          </div>
        </div>

        {/* 3. Konsept ve Teknik Yetkinlik */}
        <div>
          <h3 className="display text-lg font-bold text-ink mb-6 border-l-2 border-muted pl-3">
            {language === "tr" ? "Konsept ve Teknik Yetkinlik" : language === "de" ? "Konzept & Technische Kompetenz" : "Concept & Technical Competence"}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
            {conceptProjects.map((p, i) =>
              renderCard(
                p,
                i,
                language === "tr" ? "Mimari Yaklaşımı İncele" : language === "de" ? "Architektur ansehen" : "Explore Architecture",
                language === "tr" ? "Altyapı Planı Konuşalım" : language === "de" ? "Infrastruktur besprechen" : "Discuss Infrastructure Plan"
              )
            )}
          </div>
        </div>

      </div>
    </AnimatedSection>
  );
}
