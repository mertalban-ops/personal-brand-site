"use client";

import { CheckCircle2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

export default function Strengths() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="uzmanlik" className="border-y border-line bg-bg-raised/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[0.4fr_0.6fr] md:py-28">
        <div>
          <p className="mono-label mb-3">{t.strengths.label}</p>
          <h2 className="display text-3xl font-bold text-ink md:text-4xl">
            {t.strengths.title}
          </h2>
          <p className="mt-4 text-muted">
            {t.strengths.subtitle}
          </p>
        </div>
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {t.strengths.items.map((s) => (
            <li key={s} className="flex items-center gap-3 border-b border-line pb-4">
              <span className="rounded-md bg-accent/10 p-1">
                <CheckCircle2 className="h-4 w-4 text-accent" />
              </span>
              <span className="font-medium text-ink">{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  );
}
