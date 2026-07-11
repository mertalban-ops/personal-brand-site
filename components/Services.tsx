"use client";

import {
  ClipboardList,
  Boxes,
  Wallet,
  Users,
  FileText,
  LayoutDashboard,
  Workflow,
  Layers,
  type LucideIcon,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import FloatingCard from "./FloatingCard";
import Reveal3D from "./Reveal3D";
import { useLanguage } from "@/context/LanguageContext";

const icons: Record<string, LucideIcon> = {
  ClipboardList,
  Boxes,
  Wallet,
  Users,
  FileText,
  LayoutDashboard,
  Workflow,
  Layers,
};

export default function Services() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="hizmetler">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <p className="mono-label mb-3">{t.services.label}</p>
      <h2 className="display max-w-2xl text-3xl font-bold text-ink md:text-4xl">
        {t.services.title}
      </h2>
      <p className="mt-4 max-w-2xl text-muted">
        {t.services.subtitle}
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.services.items.map((s, i) => {
          const Icon = icons[s.icon] ?? ClipboardList;
          return (
            <Reveal3D key={s.title} delay={(i % 4) * 0.1} className="h-full">
              <FloatingCard className="h-full">
                <div className="card-surface group flex h-full flex-col rounded-xl p-6 transition-colors hover:border-accent/40 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)]">
                  <div className="mb-4 inline-flex self-start rounded-lg bg-accent/10 p-2.5">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="display text-lg font-semibold text-ink mb-2">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted mb-6 flex-grow">{s.text}</p>
                  
                  <a
                    href="#iletisim"
                    className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent opacity-70 transition-opacity group-hover:opacity-100"
                  >
                    Sistem İstiyorum <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
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
