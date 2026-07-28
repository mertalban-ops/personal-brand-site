import type { Metadata } from "next";
import { siteConfig } from "@/data/config";

const OG_IMAGE = "/opengraph-image";

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteConfig.siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      locale: "tr_TR",
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: siteConfig.brandName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
