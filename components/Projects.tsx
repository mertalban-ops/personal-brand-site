"use client";

import { Suspense, lazy } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import FloatingCard from "./FloatingCard";
import Reveal3D from "./Reveal3D";
import { useLanguage } from "@/context/LanguageContext";
import { useActiveProject, type RobotProjectType } from "@/context/ActiveProjectContext";

const Spline = lazy(() => import("@splinetool/react-spline"));

const ProjectDemoVideo = dynamic(() => import("./ProjectDemoVideo"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[260px] rounded-2xl bg-bg-raised/30 border border-line animate-pulse" />
  ),
});

function getStatusStyle(status: string) {
  const s = status.toLowerCase();
  if (s.includes("aktif") || s.includes("active") || s.includes("aktiv")) return "bg-accent/15 text-accent";
  if (s.includes("geliştirme") || s.includes("development") || s.includes("entwicklung")) return "bg-blue/15 text-blue";
  return "bg-ink/10 text-muted";
}

export default function Projects() {
  const { t } = useLanguage();
  const { setActiveType } = useActiveProject();

  return (
    <AnimatedSection id="projeler">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      {/* Compact Spline banner */}
      <div
        className="mb-14 flex flex-col overflow-hidden rounded-2xl lg:flex-row"
        style={{
          background: "linear-gradient(135deg, rgba(11,31,51,0.8) 0%, rgba(7,18,28,0.9) 100%)",
          border: "1px solid var(--line)",
        }}
      >
        {/* Top / Left — label + heading */}
        <div className="flex flex-col justify-center px-7 pt-8 pb-4 lg:px-10 lg:py-10 z-10 lg:flex-1">
          <p className="mono-label mb-3">{t.projects.label}</p>
          <h2 className="display text-3xl font-bold text-ink md:text-4xl leading-[1.1]">
            {t.projects.title}
          </h2>
        </div>

        {/* Bottom / Right — robot (all screens) */}
        <div className="relative h-[300px] w-full lg:h-auto lg:w-[420px] lg:shrink-0">
          <Suspense fallback={null}>
            <Spline
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              style={{ width: "100%", height: "100%" }}
            />
          </Suspense>
          {/* fade top edge on mobile */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-16 lg:hidden"
            style={{ background: "linear-gradient(to bottom, rgba(11,31,51,0.8), transparent)" }}
          />
          {/* fade left edge on desktop */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-20 hidden lg:block"
            style={{ background: "linear-gradient(to right, rgba(11,31,51,0.8), transparent)" }}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
        {t.projects.items.map((p, i) => (
          <Reveal3D key={p.name} delay={(i % 2) * 0.12} className="h-full">
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
                    <dd className="mt-0.5 text-muted">{p.solution}</dd>
                  </div>
                  <div>
                    <dt className="mono-label" style={{ fontSize: "0.6rem", color: "var(--faint)" }}>
                      {t.projects.featuresLabel}
                    </dt>
                    <dd className="mt-1 text-muted">
                      <ul className="list-inside list-disc space-y-0.5 marker:text-accent/50 text-[0.8rem]">
                        {p.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-line pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-sm font-medium text-ink">
                    {p.benefit}
                  </p>
                  <div className="flex items-center gap-4 shrink-0">
                    <Link
                      href={`/projeler/${p.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-ink"
                    >
                      Vaka Çalışması <span>→</span>
                    </Link>
                    <a
                      href="/iletisim"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent opacity-80 transition-opacity hover:opacity-100"
                    >
                      Benzerini İstiyorum
                    </a>
                  </div>
                </div>

                <ProjectDemoVideo type={p.previewType as "stockapp" | "auto-service" | "carpass" | "business-dashboard"} />
              </article>
            </FloatingCard>
          </Reveal3D>
        ))}
      </div>
      </div>
    </AnimatedSection>
  );
}
