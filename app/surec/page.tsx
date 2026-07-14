import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CtaStrip from "@/components/CtaStrip";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { processSteps, pricingNote } from "@/data/process";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Süreç — Solvaria",
  description:
    "Keşif görüşmesinden teslime kadar 8 adımlı çalışma sürecimiz ve neleri birlikte yapacağımız.",
};

export default function SurecPage() {
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
              { label: "Süreç" },
            ]}
          />
          <p className="mono-label mb-4">Süreç</p>
          <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl">
            Birlikte nasıl çalışıyoruz?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Keşif görüşmesinden canlı teslime kadar her adım şeffaf, onay
            tabanlı ve müşteri odaklı yürür.
          </p>
        </div>
      </section>

      {/* 8 Adımlı Süreç */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-2xl font-bold text-ink mb-10">
            8 Adımlı Çalışma Süreci
          </h2>
          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <div
                key={step.step}
                className="card-surface rounded-2xl p-6 md:p-8"
              >
                <div className="grid gap-6 md:grid-cols-[auto_1fr]">
                  {/* Step number */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10">
                    <span className="mono-label text-sm font-bold text-accent">
                      {step.step}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="display text-lg font-bold text-ink">
                        {step.title}
                      </h3>
                      {step.approvalPoint && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                          <CheckCircle2 className="h-3 w-3" />
                          Onay noktası
                        </span>
                      )}
                    </div>

                    <p className="text-muted leading-relaxed">
                      {step.description}
                    </p>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs font-semibold text-faint uppercase tracking-wide mb-2">
                          Sizden
                        </p>
                        <ul className="space-y-1">
                          {step.clientProvides.map((item) => (
                            <li
                              key={item}
                              className="text-sm text-muted flex items-start gap-2"
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-faint uppercase tracking-wide mb-2">
                          Bizden
                        </p>
                        <ul className="space-y-1">
                          {step.weDeliver.map((item) => (
                            <li
                              key={item}
                              className="text-sm text-muted flex items-start gap-2"
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-faint uppercase tracking-wide mb-2">
                          Çıktı
                        </p>
                        <p className="text-sm text-ink font-medium">
                          {step.output}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector line — not on last item */}
                {index < processSteps.length - 1 && (
                  <div className="mt-6 ml-6 h-px w-px border-l-2 border-dashed border-line opacity-40 md:ml-[22px]" />
                )}
              </div>
            ))}
          </div>

          {/* Pricing note */}
          <div className="mt-10 rounded-xl border border-line bg-surface/40 px-6 py-5">
            <p className="text-sm text-muted leading-relaxed">
              <span className="font-semibold text-ink">Fiyat ve süre hakkında: </span>
              {pricingNote}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/iletisim"
              className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              Ücretsiz Keşif Görüşmesi
            </Link>
            <Link
              href="/projeler"
              className="rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              Projeleri İncele
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <CtaStrip />
    </main>
  );
}
