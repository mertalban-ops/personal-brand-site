import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import CtaStrip from "@/components/CtaStrip";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { solutions, getSolutionBySlug } from "@/data/solutions";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();
  return {
    title: `${solution.title} — Solvaria`,
    description: solution.tagline,
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

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
              { label: "Çözümler", href: "/cozumler" },
              { label: solution.title },
            ]}
          />
          <p className="mono-label mb-4">Çözüm</p>
          <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl">
            {solution.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {solution.tagline}
          </p>
          <div className="mt-8">
            <Link
              href="/iletisim"
              className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5 inline-block"
            >
              {solution.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Tanımı */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-4">Tanıdık mı geliyor?</h2>
          <p className="text-muted text-lg leading-relaxed mb-8 max-w-2xl">
            {solution.problemStatement}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {solution.commonProblems.map((p) => (
              <div
                key={p}
                className="flex items-start gap-3 rounded-xl border border-line bg-bg-raised/30 p-4"
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-400/70" />
                <span className="text-sm text-muted">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Kimler İçin */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-6">Kimler için uygun?</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {solution.forWhom.map((w) => (
              <div key={w} className="flex items-center gap-3 text-sm text-muted">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                {w}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Sistem Modülleri */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-8">Sistem bileşenleri</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solution.modules.map((mod) => (
              <div key={mod.title} className="card-surface rounded-xl p-5">
                <h3 className="font-semibold text-ink mb-3 text-sm">{mod.title}</h3>
                <ul className="space-y-1.5">
                  {mod.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-muted">
                      <span className="h-1 w-1 rounded-full bg-accent/70 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Çıktılar */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-6">
            İşletmenize sağlayacağı değer
          </h2>
          <div className="space-y-4">
            {solution.outcomes.map((o) => (
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

      {/* Diğer Çözümler */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="mono-label mb-3">Diğer Çözümler</p>
          <h2 className="display text-2xl font-bold text-ink mb-8">
            Başka ne ihtiyacınız olabilir?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions
              .filter((s) => s.slug !== solution.slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/cozumler/${s.slug}`}
                  className="card-surface group rounded-xl p-5 transition-all hover:border-accent/40"
                >
                  <h3 className="font-semibold text-ink mb-1 text-sm group-hover:text-accent transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed mb-3">{s.tagline}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent opacity-70 group-hover:opacity-100 group-hover:gap-2 transition-all">
                    İncele <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </AnimatedSection>

      <CtaStrip />
    </main>
  );
}
