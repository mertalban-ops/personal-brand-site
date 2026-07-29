"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { getStudio } from "@/data/studio";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircle2 } from "lucide-react";

export default function FounderTrust() {
  const { language, t } = useLanguage();
  const s = getStudio(language);

  return (
    <AnimatedSection>
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="card-surface rounded-2xl p-8 md:p-12 border border-line">
          <div className="grid gap-10 md:grid-cols-[auto_1fr] items-start">
            {/* Monogram */}
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-3xl font-bold text-accent display shrink-0">
              {s.founder.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            <div>
              <p className="mono-label mb-2">{t.about.label}</p>
              <h2 className="display text-2xl font-bold text-ink md:text-3xl mb-4">
                {s.brand.tagline}
              </h2>
              <p className="text-muted leading-relaxed mb-6 max-w-3xl">
                {s.founder.bio}
              </p>
              <p className="text-xs text-faint mb-4">
                {language === "de" ? "Studio-Leitung: " : language === "en" ? "Studio Lead: " : "Stüdyo Yöneticisi: "}
                <span className="font-medium text-muted">{s.founder.name}</span>
              </p>
              
              <ul className="space-y-4 mb-6">
                {s.founder.principles.slice(0, 3).map((p) => (
                  <li key={p.title} className="text-sm text-muted">
                    <div className="flex items-center gap-2.5 font-semibold text-ink">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                      <span>{p.title}</span>
                    </div>
                    <p className="pl-6 mt-1 text-xs text-muted leading-relaxed max-w-2xl">{p.text}</p>
                  </li>
                ))}
              </ul>
              
              <p className="mt-6 text-sm italic text-faint border-t border-line/60 pt-4">&ldquo;{s.founder.note}&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
