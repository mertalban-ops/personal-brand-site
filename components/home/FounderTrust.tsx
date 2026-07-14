"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { studio } from "@/data/studio";

export default function FounderTrust() {
  return (
    <AnimatedSection>
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="card-surface rounded-2xl p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-[auto_1fr] items-start">
            {/* Monogram */}
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-3xl font-bold text-accent display shrink-0">
              MA
            </div>

            <div>
              <p className="mono-label mb-2">Solvaria&apos;nın Arkasında Kim Var?</p>
              <h2 className="display text-2xl font-bold text-ink md:text-3xl mb-4">
                {studio.founder.name} — {studio.founder.role}
              </h2>
              <p className="text-muted leading-relaxed mb-6 max-w-2xl">
                {studio.brand.description}
              </p>
              <ul className="space-y-2">
                {studio.founder.focus.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm italic text-faint">&ldquo;{studio.founder.note}&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
