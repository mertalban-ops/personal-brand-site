import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { labProjects, getLabProject, pickText } from "@/data/labs";
import { siteConfig } from "@/data/config";
import LabsProjectClient from "./LabsProjectClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return labProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getLabProject(slug);
  if (!project) notFound();

  const title = `${project.title} — Albanexa Labs`;
  const description = pickText(project.summary, "tr");
  const url = `${siteConfig.siteUrl}/labs/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/labs/${slug}` },
    openGraph: {
      title,
      description,
      url,
      locale: "tr_TR",
      type: "article",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: project.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

export default async function LabsProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getLabProject(slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Labs", item: `${siteConfig.siteUrl}/labs` },
          {
            "@type": "ListItem",
            position: 2,
            name: project.title,
            item: `${siteConfig.siteUrl}/labs/${slug}`,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        name: project.title,
        headline: project.title,
        description: pickText(project.description, "tr"),
        datePublished: project.createdAt,
        dateModified: project.updatedAt ?? project.createdAt,
        url: `${siteConfig.siteUrl}/labs/${slug}`,
        author: { "@id": `${siteConfig.siteUrl}/#person` },
        publisher: { "@id": `${siteConfig.siteUrl}/#organization` },
        keywords: [...(project.technologies ?? []), ...(project.tools ?? [])].join(", "),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LabsProjectClient project={project} />
    </>
  );
}
