import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import CtaStrip from "@/components/CtaStrip";
import AnimatedSection from "@/components/AnimatedSection";
import Reveal3D from "@/components/Reveal3D";
import FloatingCard from "@/components/FloatingCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projeler — Solvaria",
  description: "Gerçek firmalar için geliştirdiğimiz web siteleri, iş takip sistemleri, web uygulamaları ve otomasyon çözümleri.",
};

export default function ProjelerPage() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-5">
          <p className="mono-label mb-4">Projeler</p>
          <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl">
            Gerçek firmalar için{" "}
            <span className="text-accent">gerçek sistemler</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Her proje, elle yazılmış ihtiyaç analizi ve özel geliştirmeyle hayata geçirildi.
            Hazır şablonlar değil; işletmenin çalışma biçimine uyan sistemler.
          </p>
        </div>
      </section>

      {/* Project Grid */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 pb-20 md:pb-28">
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal3D key={project.slug} delay={(i % 2) * 0.1} className="h-full">
                <FloatingCard maxTilt={2} className="h-full">
                  <article className="card-surface flex h-full flex-col gap-5 rounded-xl p-5 transition-colors hover:border-accent/40 md:p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="display text-2xl font-bold text-ink">{project.name}</h2>
                        <p className="mt-1 text-sm text-muted">{project.tagline}</p>
                      </div>
                      <StatusBadge status={project.status} />
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-line bg-bg-raised/30 px-2 py-0.5 text-[0.65rem] font-medium text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Summary */}
                    <p className="text-sm text-muted leading-relaxed flex-grow">
                      {project.caseSummary}
                    </p>

                    {/* CTA */}
                    <div className="border-t border-line pt-4 flex items-center justify-between gap-4">
                      <p className="text-sm font-medium text-ink line-clamp-1">
                        {project.benefit}
                      </p>
                      <Link
                        href={`/projeler/${project.slug}`}
                        className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent opacity-80 transition-all hover:opacity-100 hover:gap-2.5"
                      >
                        Vaka Çalışmasını İncele <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </article>
                </FloatingCard>
              </Reveal3D>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <CtaStrip />
    </main>
  );
}
