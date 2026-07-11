"use client";

import { Quote } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

export default function Testimonial() {
  const { t } = useLanguage();
  return (
    <AnimatedSection id="deneyim">
      <div className="mx-auto max-w-4xl px-5 py-20 md:py-28">
      <div className="card-surface relative rounded-2xl p-8 md:p-12">
        <Quote className="absolute -top-4 left-8 h-9 w-9 rounded-lg bg-accent p-2 text-white" />
        <p className="mono-label mb-5">{t.testimonial.label}</p>
        <blockquote className="display text-balance text-xl font-medium leading-relaxed text-ink md:text-2xl">
          “{t.testimonial.quote}”
        </blockquote>
        <p className="mt-6 text-xs" style={{ color: "var(--faint)" }}>
          {t.testimonial.note}
        </p>
      </div>
      </div>
    </AnimatedSection>
  );
}
