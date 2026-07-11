"use client";

import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="kimim">
      <div className="mx-auto max-w-4xl px-5 py-20 md:py-28 text-center">
      <div className="card-surface relative flex flex-col items-center justify-center rounded-2xl p-10 md:p-16">
        {/* Dekoratif Işık */}
        <div className="absolute left-1/2 top-0 -z-10 h-32 w-1/2 -translate-x-1/2 rounded-full bg-accent/20 blur-[80px]" />
        
        <p className="mono-label mb-5">{t.about.label}</p>
        <h2 className="display max-w-2xl text-3xl font-bold text-ink md:text-4xl text-balance">
          {t.about.title}
        </h2>
        <div className="mt-8 space-y-4">
          {t.about.paragraphs.map((p, idx) => (
            <p key={idx} className="text-lg md:text-xl font-medium leading-relaxed text-muted text-balance">
              {p}
            </p>
          ))}
        </div>
      </div>
      </div>
    </AnimatedSection>
  );
}
