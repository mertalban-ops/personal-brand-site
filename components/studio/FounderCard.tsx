import { CheckCircle2 } from "lucide-react";
import { studio } from "@/data/studio";

export default function FounderCard() {
  return (
    <div className="card-surface rounded-2xl p-8 md:p-10">
      <div className="grid gap-8 md:grid-cols-[auto_1fr]">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-3xl font-bold text-accent display shrink-0">
          {studio.founder.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <h3 className="display text-xl font-bold text-ink">
            {studio.founder.name}
          </h3>
          <p className="text-muted text-sm mb-4">
            {studio.founder.role} &middot; {studio.brand.founded}
          </p>
          <ul className="space-y-2 mb-6">
            {studio.founder.focus.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-muted">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                {f}
              </li>
            ))}
          </ul>
          <p className="text-sm italic text-faint">
            &ldquo;{studio.founder.note}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
