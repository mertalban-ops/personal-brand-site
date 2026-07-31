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
  
  let titleSuffix = "Vaka Çalışması";
  const pStatus = project.projectStatus;
  if (pStatus === "inDevelopmentProduct") {
    titleSuffix = "Geliştirme Aşamasındaki Ürün";
  } else if (pStatus === "conceptArchitecture") {
    titleSuffix = "Konsept Mimari";
  } else if (pStatus === "internalProject") {
    titleSuffix = "İç Proje";
  } else if (pStatus === "liveClientProject") {
    titleSuffix = "Müşteri Projesi";
  }
  
  const title = `${project.name} — ${titleSuffix} | Albanexa`;
  const description = project.caseSummary;
  const url = `${siteConfig.siteUrl}/projeler/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/projeler/${slug}` },
    openGraph: {
      title,
      description,
      url,
      locale: "tr_TR",
      type: "website",
      images: [{ url: `/projeler/${slug}/opengraph-image`, width: 1200, height: 630, alt: project.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/projeler/${slug}/opengraph-image`],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "tr");
  if (!project) notFound();

  const isSoftware = project.category === "customer-project" || project.category === "product-lab";

  const productSchema = isSoftware
    ? {
        "@type": "SoftwareApplication",
        "name": project.name,
        "operatingSystem": "Web Cloud",
        "applicationCategory": "BusinessApplication",
        "description": project.caseSummary,
        "publisher": { "@id": `${siteConfig.siteUrl}/#organization` },
      }
    : {
        "@type": "CreativeWork",
        "name": project.name,
        "description": project.caseSummary,
        "creator": { "@id": `${siteConfig.siteUrl}/#person` },
        "publisher": { "@id": `${siteConfig.siteUrl}/#organization` },
      };

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
            "item": siteConfig.siteUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Projeler",
            "item": `${siteConfig.siteUrl}/projeler`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": project.name,
            "item": `${siteConfig.siteUrl}/projeler/${slug}`
          }
        ]
      },
      productSchema,
      {
        "@type": "Article",
        "@id": `${siteConfig.siteUrl}/projeler/${slug}#article`,
        "headline": `${project.name} — Vaka Çalışması`,
        "description": project.caseSummary,
        "datePublished": "2025-07-01",
        "dateModified": "2026-07-31",
        "author": { "@id": `${siteConfig.siteUrl}/#person` },
        "publisher": { "@id": `${siteConfig.siteUrl}/#organization` },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `${siteConfig.siteUrl}/projeler/${slug}` }
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
