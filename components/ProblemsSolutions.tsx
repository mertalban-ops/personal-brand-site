"use client";

import { XCircle, CheckCircle2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import Reveal3D from "./Reveal3D";
import FloatingCard from "./FloatingCard";
import { useLanguage } from "@/context/LanguageContext";

export default function ProblemsSolutions() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="cozumler" className="band-petrol border-y border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <p className="mono-label mb-3">{t.problems.label}</p>
        <h2 className="display max-w-2xl text-3xl font-bold text-ink md:text-4xl">
          {t.problems.title}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.problems.items.map((row, i) => (
            <Reveal3D key={row.problem} delay={i * 0.1} className="h-full">
              <FloatingCard className="h-full">
                <div className="card-surface group flex h-full flex-col justify-between rounded-2xl p-6 transition-all hover:border-accent/40">
                  <div className="mb-6">
                    <div className="mb-3 flex items-center gap-2 text-red-400/80">
                      <XCircle className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Problem</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted transition-colors group-hover:text-ink/80">
                      {row.problem}
                    </p>
                  </div>
                  
                  <div className="relative pt-6">
                    <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-line via-line to-transparent" />
                    <div className="mb-3 flex items-center gap-2 text-accent">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Sistem Çözümü</span>
                    </div>
                    <p className="display font-semibold text-ink group-hover:text-accent transition-colors">
                      {row.solution}
                    </p>
                  </div>
                </div>
              </FloatingCard>
            </Reveal3D>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
