import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projectsTr } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";
import { siteConfig } from "@/data/config";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projectsTr.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "tr");
  if (!project) notFound();
  
  return {
    title: `${project.name} — Vaka Çalışması | Solvaria`,
    description: project.caseSummary,
    alternates: {
      canonical: `${siteConfig.baseUrl}/projeler/${slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "tr");
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Ana Sayfa",
            "item": siteConfig.baseUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Projeler",
            "item": `${siteConfig.baseUrl}/projeler`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": project.name,
            "item": `${siteConfig.baseUrl}/projeler/${slug}`
          }
        ]
      },
      {
        "@type": "SoftwareApplication",
        "name": project.name,
        "operatingSystem": "Web Cloud",
        "applicationCategory": "BusinessApplication",
        "description": project.caseSummary,
        "publisher": {
          "@type": "Organization",
          "name": siteConfig.brandName,
          "url": siteConfig.baseUrl
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailClient slug={slug} />
    </>
  );
}
