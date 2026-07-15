import type { Metadata } from "next";
import WebSiteleriClient from "./WebSiteleriClient";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Kurumsal Web Siteleri — Solvaria",
  description:
    "Markanızı yalnızca görünür değil, ikna edici hale getiren hızlı, SEO uyumlu ve premium Next.js web siteleri.",
  alternates: {
    canonical: `${siteConfig.baseUrl}/cozumler/web-siteleri`,
  },
};

export default function WebSiteleriPage() {
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
            "name": "Çözümler",
            "item": `${siteConfig.baseUrl}/cozumler`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Web Siteleri",
            "item": `${siteConfig.baseUrl}/cozumler/web-siteleri`
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Kurumsal Web Siteleri",
        "description": "Markanızı yalnızca görünür değil, ikna edici hale getiren hızlı, SEO uyumlu ve premium Next.js web siteleri.",
        "provider": {
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
      <WebSiteleriClient />
    </>
  );
}
