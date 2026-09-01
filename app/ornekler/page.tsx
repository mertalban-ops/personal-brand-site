import { buildPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/config";
import OrneklerClient from "./OrneklerClient";

export const metadata = buildPageMetadata({
  title: "Örnek Çalışmalar — Oto Servis Web Siteleri",
  description:
    "Oto servis, kaporta-boya ve oto elektrik işletmeleri için hazırlanmış temsili web sitesi örnekleri. Tanıtım amaçlıdır; gerçek işletmelere ait değildir.",
  path: "/ornekler",
});

export default function OrneklerPage() {
  const url = `${siteConfig.siteUrl}/ornekler`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": siteConfig.siteUrl },
          { "@type": "ListItem", "position": 2, "name": "Örnekler", "item": url },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        "name": "Örnek Çalışmalar",
        "description":
          "Oto servis işletmeleri için hazırlanmış temsili web sitesi örnekleri.",
        "isPartOf": { "@id": `${siteConfig.siteUrl}/#website` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <OrneklerClient />
    </>
  );
}
