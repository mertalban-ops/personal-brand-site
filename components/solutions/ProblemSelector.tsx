"use client";

import { useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import type { Solution } from "@/data/solutions";

const problems = [
  { label: "Stokları takip edemiyorum", slug: "stok-cari-tahsilat" },
  { label: "Tahsilatlar karışıyor", slug: "stok-cari-tahsilat" },
  { label: "İş emirleri dağınık", slug: "is-takip-sistemleri" },
  { label: "Rapor hazırlamak uzun sürüyor", slug: "operasyon-otomasyonlari" },
  { label: "Süreçler personele bağlı", slug: "is-takip-sistemleri" },
  { label: "SaaS ürünü geliştirmek istiyorum", slug: "saas-urun-altyapisi" },
];

export default function ProblemSelector({ solutions }: { solutions: Solution[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const highlighted = selected
    ? solutions.filter((s) => s.slug === problems.find((p) => p.label === selected)?.slug)
    : [];

  return (
    <div>
      <p className="mono-label mb-4">Hangi sorun sizin için öncelikli?</p>
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
          <p className="text-sm text-muted mb-2">Önerilen çözüm:</p>
          <p className="font-semibold text-ink mb-1">{highlighted[0].title}</p>
          <p className="text-sm text-muted mb-4">{highlighted[0].tagline}</p>
          <Link
            href={`/cozumler/${highlighted[0].slug}`}
            className="text-sm font-semibold text-accent hover:underline"
          >
            Detayları İncele →
          </Link>
        </div>
      )}
    </div>
  );
}
