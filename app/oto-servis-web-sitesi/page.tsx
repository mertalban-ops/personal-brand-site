import { buildPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/config";
import { packages, maintenance, faqs, CURRENCY } from "@/data/oto-servis";
import OtoServisClient from "./OtoServisClient";

export const metadata = buildPageMetadata({
  title: "Oto Servis Web Sitesi — Sabit Fiyatlı Paketler",
  description:
    "Oto servisler, kaporta-boya ve oto elektrik işletmeleri için web sitesi. Sabit fiyatlı paketler, açık kapsam, hızlı teslim. İzmir ve Türkiye geneli.",
  path: "/oto-servis-web-sitesi",
});

export default function OtoServisWebSitesiPage() {
  const url = `${siteConfig.siteUrl}/oto-servis-web-sitesi`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
          { "@type": "ListItem", "position": 2, "name": "Oto Servis Web Sitesi", "item": url },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        "name": "Oto Servis Web Sitesi",
        "serviceType": "Oto servis işletmeleri için web sitesi tasarımı",
        "description":
          "Oto servis, kaporta-boya ve oto elektrik işletmeleri için sabit fiyatlı web sitesi paketleri.",
        "provider": { "@id": `${siteConfig.siteUrl}/#organization` },
        "areaServed": { "@type": "Country", "name": "Türkiye" },
        "offers": [
          ...packages.map((p) => ({
            "@type": "Offer",
            "name": `${p.name} Paketi`,
            "price": String(p.price),
            "priceCurrency": CURRENCY,
            "description": p.tagline,
            "url": url,
            "availability": "https://schema.org/InStock",
          })),
          {
            "@type": "Offer",
            "name": "Aylık Bakım",
            "price": String(maintenance.price),
            "priceCurrency": CURRENCY,
            "description": maintenance.desc,
            "url": url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        "mainEntity": faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <OtoServisClient />
    </>
  );
}
