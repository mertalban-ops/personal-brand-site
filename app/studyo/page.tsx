import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CtaStrip from "@/components/CtaStrip";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FounderCard from "@/components/studio/FounderCard";
import { studio } from "@/data/studio";

export const metadata: Metadata = {
  title: "Stüdyo Hakkında — Solvaria",
  description:
    "Solvaria nedir, kim tarafından kuruldu ve hangi ilkelerle çalışır.",
};

export default function StudyoPage() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-5">
          <Breadcrumb
            crumbs={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Stüdyo" },
            ]}
          />
          <p className="mono-label mb-4">Stüdyo</p>
          <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl">
            {studio.brand.name} — {studio.brand.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {studio.brand.description}
          </p>
        </div>
      </section>

      {/* Neden kuruldu */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-4">
            Neden kuruldu?
          </h2>
          <p className="text-muted leading-relaxed max-w-2xl text-lg">
            {studio.brand.whyBuilt}
          </p>
        </div>
      </AnimatedSection>

      {/* Kurucu */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-8">Kurucu</h2>
          <FounderCard />
        </div>
      </AnimatedSection>

      {/* Çalışma İlkeleri */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-8">
            Çalışma İlkeleri
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studio.principles.map((p) => (
              <div key={p.title} className="card-surface rounded-xl p-6">
                <h3 className="font-semibold text-ink mb-2">{p.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Teknoloji ve Güvenlik */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="display text-xl font-bold text-ink mb-3">
                Teknoloji Yaklaşımı
              </h2>
              <p className="text-muted leading-relaxed">{studio.techApproach}</p>
            </div>
            <div>
              <h2 className="display text-xl font-bold text-ink mb-3">
                Güvenlik
              </h2>
              <p className="text-muted leading-relaxed">{studio.securityNote}</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection>
        <div className="mx-auto max-w-3xl px-5 py-12 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/projeler"
              className="rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              Projeleri İncele
            </Link>
            <Link
              href="/iletisim"
              className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <CtaStrip />
    </main>
  );
}
