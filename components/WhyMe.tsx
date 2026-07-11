"use client";

import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyMe() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="neden" className="band-petrol border-y border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <p className="mono-label mb-3">{t.whyMe.label}</p>
        <h2 className="display max-w-2xl text-3xl font-bold text-ink md:text-4xl">
          {t.whyMe.title}
        </h2>

        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.whyMe.items.map((item, i) => (
            <div key={item.title} className="border-t border-line pt-5">
              <p className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="display mt-2 text-lg font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
