import { buildPageMetadata } from "@/lib/metadata";
import WebSiteleriClient from "./WebSiteleriClient";
import { siteConfig } from "@/data/config";

export const metadata = buildPageMetadata({
  title: "Kurumsal Web Siteleri",
  description: "Markanızı yalnızca görünür değil, ikna edici hale getiren hızlı, SEO uyumlu ve premium Next.js web siteleri.",
  path: "/cozumler/web-siteleri",
});

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
            "item": siteConfig.siteUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Çözümler",
            "item": `${siteConfig.siteUrl}/cozumler`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Web Siteleri",
            "item": `${siteConfig.siteUrl}/cozumler/web-siteleri`
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
          "url": siteConfig.siteUrl
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
