import Link from "next/link";
import Navbar from "@/components/Navbar";
import CtaStrip from "@/components/CtaStrip";
import Breadcrumb from "@/components/layout/Breadcrumb";

type Props = {
  title: string;
  description: string;
  publishedAt: string;
  readingTime: number;
  category: string;
  children: React.ReactNode;
};

export default function ArticleLayout({
  title,
  description,
  publishedAt,
  readingTime,
  category,
  children,
}: Props) {
  const dateFormatted = new Date(publishedAt).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-3xl px-5">
          <Breadcrumb
            crumbs={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Rehber", href: "/rehber" },
              { label: title },
            ]}
          />
          <p className="mono-label mb-4">{category}</p>
          <h1 className="display text-3xl font-bold text-ink md:text-4xl leading-snug">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>
          <div className="mt-6 flex items-center gap-4 text-xs text-faint">
            <span>{dateFormatted}</span>
            <span>·</span>
            <span>{readingTime} dk okuma</span>
            <span>·</span>
            <Link
              href="/iletisim"
              className="text-accent hover:text-accent/80 transition-colors font-medium"
            >
              Ücretsiz Görüşme →
            </Link>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="mx-auto max-w-3xl px-5 pb-20">
        <div className="prose-albanexa">{children}</div>
      </article>

      <CtaStrip />
    </main>
  );
}
