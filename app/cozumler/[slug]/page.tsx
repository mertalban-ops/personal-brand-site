import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSolutionBySlug, solutionsTr } from "@/data/solutions";
import CozumlerDetailClient from "./CozumlerDetailClient";
import { siteConfig } from "@/data/config";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return solutionsTr.filter((s) => s.slug !== "web-siteleri").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "web-siteleri") notFound();
  const solution = getSolutionBySlug(slug, "tr");
  if (!solution) notFound();
  const title = solution.title;
  const description = solution.seoSummary ?? solution.tagline;
  const url = `${siteConfig.siteUrl}/cozumler/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/cozumler/${slug}` },
    openGraph: {
      title,
      description,
      url,
      locale: "tr_TR",
      type: "website",
      images: [{ url: `/cozumler/${slug}/opengraph-image`, width: 1200, height: 630, alt: solution.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/cozumler/${slug}/opengraph-image`],
    },
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "web-siteleri") notFound();
  const solution = getSolutionBySlug(slug, "tr");
  if (!solution) notFound();

  const graph: object[] = [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
        { "@type": "ListItem", "position": 2, "name": "Çözümler", "item": `${siteConfig.siteUrl}/cozumler` },
        { "@type": "ListItem", "position": 3, "name": solution.title, "item": `${siteConfig.siteUrl}/cozumler/${slug}` },
      ],
    },
    {
      "@type": "Service",
      "name": solution.title,
      "description": solution.seoSummary ?? solution.tagline,
      "provider": { "@id": `${siteConfig.siteUrl}/#organization` },
    },
  ];

  if (solution.pageFaqs && solution.pageFaqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${siteConfig.siteUrl}/cozumler/${slug}#faq`,
      "mainEntity": solution.pageFaqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    });
  }

  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CozumlerDetailClient slug={slug} />
    </>
  );
}
