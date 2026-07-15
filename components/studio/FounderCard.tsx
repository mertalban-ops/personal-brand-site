"use client";

import { CheckCircle2 } from "lucide-react";
import { getStudio } from "@/data/studio";
import { useLanguage } from "@/context/LanguageContext";

export default function FounderCard() {
  const { language } = useLanguage();
  const s = getStudio(language);

  return (
    <div className="card-surface rounded-2xl p-8 md:p-10 border border-line">
      <div className="grid gap-8 md:grid-cols-[auto_1fr]">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-3xl font-bold text-accent display shrink-0">
          {s.founder.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <h3 className="display text-xl font-bold text-ink">
            {s.founder.name}
          </h3>
          <p className="text-muted text-sm mb-4">
            {s.founder.role} &middot; {s.brand.location}
          </p>
          <p className="text-sm text-muted leading-relaxed mb-6 max-w-3xl">
            {s.founder.bio}
          </p>
          
          <ul className="space-y-4 mb-6">
            {s.founder.principles.map((p) => (
              <li key={p.title} className="text-sm text-muted">
                <div className="flex items-center gap-2.5 font-semibold text-ink">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                  <span>{p.title}</span>
                </div>
                <p className="pl-6 mt-1 text-xs text-muted leading-relaxed max-w-2xl">{p.text}</p>
              </li>
            ))}
          </ul>
          
          <p className="text-sm italic text-faint border-t border-line/60 pt-4">
            &ldquo;{s.founder.note}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
