import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Solution } from "@/data/solutions";
import { useLanguage } from "@/context/LanguageContext";

export default function SolutionCard({ solution }: { solution: Solution }) {
  const { language } = useLanguage();

  return (
    <article className="card-surface group flex flex-col rounded-2xl p-6 transition-all hover:border-accent/40 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.15)]">
      <h3 className="display text-xl font-bold text-ink mb-2">{solution.title}</h3>
      <p className="text-sm text-muted mb-4 leading-relaxed">{solution.tagline}</p>
      <p className="text-sm text-muted leading-relaxed mb-6 flex-grow">{solution.problemStatement}</p>
      <ul className="mb-6 space-y-1.5">
        {solution.outcomes.slice(0, 2).map((o) => (
          <li key={o} className="flex items-start gap-2 text-xs text-muted">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {o}
          </li>
        ))}
      </ul>
      <Link
        href={`/cozumler/${solution.slug}`}
        className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-accent opacity-80 transition-all group-hover:opacity-100 group-hover:gap-3"
      >
        {language === "tr" ? "Detayları İncele" : language === "de" ? "Details anzeigen" : "View Details"}{" "}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
