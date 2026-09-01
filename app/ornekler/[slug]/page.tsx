import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ornekler, getOrnek, DISCLAIMER } from "@/data/ornekler";
import { siteConfig } from "@/data/config";
import OrnekDetailClient from "./OrnekDetailClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ornekler.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const o = getOrnek(slug);
  if (!o) notFound();
  const title = `${o.name} — Örnek Çalışma`;
  return {
    title,
    description: `${o.summary} ${DISCLAIMER}`,
    alternates: { canonical: `/ornekler/${slug}` },
    openGraph: {
      title,
      description: o.summary,
      url: `${siteConfig.siteUrl}/ornekler/${slug}`,
      locale: "tr_TR",
      type: "website",
    },
  };
}

export default async function OrnekDetailPage({ params }: Props) {
  const { slug } = await params;
  const o = getOrnek(slug);
  if (!o) notFound();

  const url = `${siteConfig.siteUrl}/ornekler/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Örnekler", "item": `${siteConfig.siteUrl}/ornekler` },
      { "@type": "ListItem", "position": 3, "name": o.name, "item": url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <OrnekDetailClient slug={slug} />
    </>
  );
}
