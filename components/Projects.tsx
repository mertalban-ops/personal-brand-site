"use client";

import { Suspense, lazy } from "react";
import dynamic from "next/dynamic";
import AnimatedSection from "./AnimatedSection";
import FloatingCard from "./FloatingCard";
import Reveal3D from "./Reveal3D";
import { useLanguage } from "@/context/LanguageContext";

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

  return (
    <AnimatedSection id="projeler">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      {/* Compact Spline banner */}
      <div
        className="mb-14 flex overflow-hidden rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(11,31,51,0.8) 0%, rgba(7,18,28,0.9) 100%)",
          border: "1px solid var(--line)",
          minHeight: 220,
        }}
      >
        {/* Left — label + heading */}
        <div className="flex flex-col justify-center px-8 py-10 z-10 flex-1">
          <p className="mono-label mb-3">{t.projects.label}</p>
          <h2 className="display max-w-xs text-3xl font-bold text-ink md:text-4xl leading-[1.1]">
            {t.projects.title}
          </h2>
        </div>

        {/* Right — robot (desktop only) */}
        <div className="hidden lg:block relative w-[420px] shrink-0">
          <Suspense fallback={null}>
            <Spline
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              style={{ width: "100%", height: "100%" }}
            />
          </Suspense>
          {/* fade left edge into card */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-20"
            style={{ background: "linear-gradient(to right, rgba(11,31,51,0.8), transparent)" }}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
        {t.projects.items.map((p, i) => (
          <Reveal3D key={p.name} delay={(i % 2) * 0.12} className="h-full">
            <FloatingCard maxTilt={2} className="h-full">
              <article className="card-surface flex h-full flex-col gap-5 rounded-xl p-5 transition-colors hover:border-accent/40 md:p-6">
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

                <div className="border-t border-line pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-sm font-medium text-ink">
                    {p.benefit}
                  </p>
                  <a
                    href="/iletisim"
                    className="shrink-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent opacity-80 transition-opacity hover:opacity-100"
                  >
                    Benzerini İstiyorum <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
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
