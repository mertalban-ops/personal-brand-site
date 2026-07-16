"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import StatusBadge from "@/components/ui/StatusBadge";
import { useLanguage } from "@/context/LanguageContext";
import { ProjectCategory } from "@/data/projects";

type Props = {
  name: string;
  tagline: string;
  status: string;
  problem: string;
  tech: string[];
  category: ProjectCategory;
};

export default function CaseStudyHero({ name, tagline, status, problem, tech, category }: Props) {
  const { language } = useLanguage();

  // Localized navigation & labels
  const labels = {
    tr: {
      home: "Ana Sayfa",
      projects: "Projeler",
      tech: "Teknolojiler",
      problem: "Başlangıç Problemi",
      "customer-project": "Referans Proje & Vaka Çalışması",
      "product-lab": "Ürün Geliştirme Laboratuvarı",
      "concept-work": "Çözüm Yetkinliği & Konsept Mimari",
      "internal-project": "İç Proje",
    },
    en: {
      home: "Home",
      projects: "Projects",
      tech: "Technologies",
      problem: "Initial Problem",
      "customer-project": "Reference Project & Case Study",
      "product-lab": "Product Development Lab",
      "concept-work": "Solution Competence & Concept Architecture",
      "internal-project": "Internal Project",
    },
    de: {
      home: "Startseite",
      projects: "Projekte",
      tech: "Technologien",
      problem: "Ausgangsproblem",
      "customer-project": "Referenzprojekt & Fallstudie",
      "product-lab": "Produktentwicklungs-Labor",
      "concept-work": "Lösungskompetenz & Konzeptarchitektur",
      "internal-project": "Internes Projekt",
    },
  };

  const l = labels[language] || labels.tr;
  const kicker = l[category] || l["customer-project"];

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="bg-grid absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-5">
        <Breadcrumb
          crumbs={[
            { label: l.home, href: "/" },
            { label: l.projects, href: "/projeler" },
            { label: name },
          ]}
        />
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <p className="mono-label">{kicker}</p>
          <StatusBadge status={status} />
        </div>
        <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl mb-4">
          {name}
        </h1>
        <p className="text-lg text-muted mb-6 max-w-2xl">{tagline}</p>
        <div className="mb-8">
          <p className="text-sm text-faint mb-2 font-mono uppercase tracking-wider">{l.tech}</p>
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="rounded border border-line bg-bg-raised/30 px-2.5 py-1 text-xs font-medium text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="card-surface rounded-xl p-5 max-w-2xl border-l-2 border-l-accent">
          <p className="text-sm font-mono uppercase tracking-wider text-faint mb-2">{l.problem}</p>
          <p className="text-muted leading-relaxed">{problem}</p>
        </div>
      </div>
    </section>
  );
}
