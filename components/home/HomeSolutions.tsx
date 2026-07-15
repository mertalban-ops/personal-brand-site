"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Globe,
  ClipboardList,
  Boxes,
  LayoutDashboard,
  Layers,
  Workflow,
  ArrowRight,
  XCircle,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Reveal3D from "@/components/Reveal3D";
import FloatingCard from "@/components/FloatingCard";
import { solutions } from "@/data/solutions";
import { useLanguage } from "@/context/LanguageContext";

const iconMap = {
  "web-siteleri": Globe,
  "is-takip-sistemleri": ClipboardList,
  "stok-cari-tahsilat": Boxes,
  "web-uygulamalari": LayoutDashboard,
  "saas-urun-altyapisi": Layers,
  "operasyon-otomasyonlari": Workflow,
};

export default function HomeSolutions() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <AnimatedSection id="cozum-alanlari">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="text-center mb-16">
          <motion.p className="mono-label mb-3" {...enter(0)}>
            {t.services.label}
          </motion.p>
          <motion.h2
            className="display text-3xl font-bold text-ink md:text-4xl text-balance max-w-2xl mx-auto"
            {...enter(0.1)}
          >
            İşletmeniz için çalışan{" "}
            <span className="text-accent">dijital altyapılar</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-muted max-w-xl mx-auto text-sm leading-relaxed"
            {...enter(0.2)}
          >
            Süreçlerinizi kopyala-yapıştır yazılımlara uydurmaya çalışmayın.
            İhtiyacınıza göre ölçeklenen özel modüllerle çalışın.
          </motion.p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((sol, i) => {
            const Icon = iconMap[sol.slug] || Globe;
            const singleOutcome = sol.outcomes[0] || "İş akışının kontrol altına alınması";

            return (
              <Reveal3D key={sol.slug} delay={i * 0.08} className="h-full">
                <FloatingCard className="h-full">
                  <div className="card-surface group flex h-full flex-col justify-between rounded-2xl p-6 transition-all hover:border-accent/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/15">
                          <Icon className="h-5 w-5 text-accent" />
                        </div>
                        <span className="text-[0.65rem] font-mono text-faint uppercase tracking-wider">
                          Sistem #{i + 1}
                        </span>
                      </div>

                      <h3 className="display text-lg font-bold text-ink mb-4 group-hover:text-accent transition-colors">
                        {sol.title}
                      </h3>

                      {/* Content Stack */}
                      <div className="space-y-4 mb-6 border-t border-line/60 pt-4">
                        <div>
                          <div className="flex items-center gap-1.5 text-red-400/80 mb-1">
                            <XCircle className="h-3 w-3 shrink-0" />
                            <span className="text-[0.65rem] font-semibold uppercase tracking-wider">
                              Darboğaz
                            </span>
                          </div>
                          <p className="text-xs text-muted leading-relaxed line-clamp-2">
                            {sol.problemStatement}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 text-accent mb-1">
                            <CheckCircle2 className="h-3 w-3 shrink-0" />
                            <span className="text-[0.65rem] font-semibold uppercase tracking-wider">
                              Çözüm
                            </span>
                          </div>
                          <p className="text-xs text-ink font-medium leading-relaxed">
                            {sol.tagline}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 text-blue/80 mb-1">
                            <TrendingUp className="h-3 w-3 shrink-0" />
                            <span className="text-[0.65rem] font-semibold uppercase tracking-wider">
                              Fayda
                            </span>
                          </div>
                          <p className="text-xs text-muted leading-relaxed line-clamp-1">
                            {singleOutcome}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA Link */}
                    <div className="border-t border-line/45 pt-4">
                      <Link
                        href={`/cozumler/${sol.slug}`}
                        className="inline-flex w-full items-center justify-between text-xs font-semibold text-muted group-hover:text-accent transition-colors"
                      >
                        <span>Sistemi İncele</span>
                        <ArrowRight className="h-3.5 w-3.5 transform transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </FloatingCard>
              </Reveal3D>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
