"use client";

import { useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import type { Solution } from "@/data/solutions";
import { useLanguage } from "@/context/LanguageContext";

const problemsTr = [
  { label: "Stokları takip edemiyorum", slug: "stok-cari-tahsilat" },
  { label: "Tahsilatlar karışıyor", slug: "stok-cari-tahsilat" },
  { label: "İş emirleri dağınık", slug: "is-takip-sistemleri" },
  { label: "Rapor hazırlamak uzun sürüyor", slug: "operasyon-otomasyonlari" },
  { label: "Süreçler personele bağlı", slug: "is-takip-sistemleri" },
  { label: "SaaS ürünü geliştirmek istiyorum", slug: "saas-urun-altyapisi" },
];

const problemsEn = [
  { label: "I can't track inventory", slug: "stok-cari-tahsilat" },
  { label: "Collections are messy", slug: "stok-cari-tahsilat" },
  { label: "Work orders are disorganized", slug: "is-takip-sistemleri" },
  { label: "Preparing reports takes too long", slug: "operasyon-otomasyonlari" },
  { label: "Workflows depend on individuals", slug: "is-takip-sistemleri" },
  { label: "I want to build a SaaS product", slug: "saas-urun-altyapisi" },
];

const problemsDe = [
  { label: "Ich kann den Bestand nicht verfolgen", slug: "stok-cari-tahsilat" },
  { label: "Zahlungen sind ungeordnet", slug: "stok-cari-tahsilat" },
  { label: "Arbeitsaufträge sind unorganisiert", slug: "is-takip-sistemleri" },
  { label: "Die Berichterstellung dauert zu lange", slug: "operasyon-otomasyonlari" },
  { label: "Abläufe hängen von Personen ab", slug: "is-takip-sistemleri" },
  { label: "Ich möchte ein SaaS-Produkt entwickeln", slug: "saas-urun-altyapisi" },
];

export default function ProblemSelector({ solutions }: { solutions: Solution[] }) {
  const { language } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const problems = language === "en" ? problemsEn : language === "de" ? problemsDe : problemsTr;

  const highlighted = selected
    ? solutions.filter((s) => s.slug === problems.find((p) => p.label === selected)?.slug)
    : [];

  return (
    <div>
      <p className="mono-label mb-4">
        {language === "tr"
          ? "Hangi sorun sizin için öncelikli?"
          : language === "de"
          ? "Welches Problem hat für Sie Priorität?"
          : "Which issue is your main priority?"}
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {problems.map((p) => (
          <button
            key={p.label}
            onClick={() => setSelected(selected === p.label ? null : p.label)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
              selected === p.label
                ? "border-accent bg-accent/10 text-accent"
                : "border-line text-muted hover:border-accent/40 hover:text-ink"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      {highlighted.length > 0 && (
        <div
          className={`card-surface rounded-xl p-5 border border-accent/30 ${
            reduce ? "" : "animate-[fadeIn_0.3s_ease]"
          }`}
        >
          <p className="text-sm text-muted mb-2">
            {language === "tr" ? "Önerilen çözüm:" : language === "de" ? "Empfohlene Lösung:" : "Recommended solution:"}
          </p>
          <p className="font-semibold text-ink mb-1">{highlighted[0].title}</p>
          <p className="text-sm text-muted mb-4">{highlighted[0].tagline}</p>
          <Link
            href={`/cozumler/${highlighted[0].slug}`}
            className="text-sm font-semibold text-accent hover:underline"
          >
            {language === "tr" ? "Detayları İncele" : language === "de" ? "Details anzeigen" : "View Details"} →
          </Link>
        </div>
      )}
    </div>
  );
}
