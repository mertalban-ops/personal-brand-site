"use client";

type Status = "active" | "development" | "concept" | "planned";

type Props = {
  status: string;
  className?: string;
};

function parseStatus(status: string): Status {
  const s = status.toLowerCase();
  if (s.includes("aktif") || s.includes("active") || s.includes("canlı") || s.includes("live")) return "active";
  if (s.includes("geliştirme") || s.includes("development") || s.includes("aşama")) return "development";
  if (s.includes("konsept") || s.includes("concept") || s.includes("mimari")) return "concept";
  return "planned";
}

const styles: Record<Status, string> = {
  active: "bg-accent/15 text-accent border-accent/20",
  development: "bg-blue/15 text-blue border-blue/20",
  concept: "bg-ink/10 text-muted border-line",
  planned: "bg-ink/10 text-muted border-line",
};

const labels: Record<Status, string> = {
  active: "Canlı",
  development: "Geliştirme Aşamasında",
  concept: "Konsept / Mimari",
  planned: "Planlanan",
};

export default function StatusBadge({ status, className = "" }: Props) {
  const parsed = parseStatus(status);
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${styles[parsed]} ${className}`}
    >
      {labels[parsed]}
    </span>
  );
}
