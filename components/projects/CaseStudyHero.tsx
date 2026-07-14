import Breadcrumb from "@/components/layout/Breadcrumb";
import StatusBadge from "@/components/ui/StatusBadge";

type Props = {
  name: string;
  tagline: string;
  status: string;
  problem: string;
  tech: string[];
};

export default function CaseStudyHero({ name, tagline, status, problem, tech }: Props) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="bg-grid absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-5">
        <Breadcrumb
          crumbs={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Projeler", href: "/projeler" },
            { label: name },
          ]}
        />
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <p className="mono-label">Vaka Çalışması</p>
          <StatusBadge status={status} />
        </div>
        <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl mb-4">
          {name}
        </h1>
        <p className="text-lg text-muted mb-6 max-w-2xl">{tagline}</p>
        <div className="mb-8">
          <p className="text-sm text-faint mb-2 font-mono uppercase tracking-wider">Teknoloji</p>
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
          <p className="text-sm font-mono uppercase tracking-wider text-faint mb-2">İş Problemi</p>
          <p className="text-muted leading-relaxed">{problem}</p>
        </div>
      </div>
    </section>
  );
}
