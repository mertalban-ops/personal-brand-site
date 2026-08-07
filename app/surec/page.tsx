import { buildPageMetadata } from "@/lib/metadata";
import { processSteps } from "@/data/process";
import { siteConfig } from "@/data/config";
import SurecClient from "./SurecClient";

export const metadata = buildPageMetadata({
  title: "Süreç",
  description: "Keşif görüşmesinden teslime kadar 8 adımlı çalışma sürecimiz ve neleri birlikte yapacağımız.",
  path: "/surec",
});

export default function SurecPage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Albanexa ile yazılım projesi nasıl ilerler?",
    "description": "Keşif görüşmesinden teslime ve destek sürecine kadar 8 adımlı çalışma yöntemimiz.",
    "totalTime": "P4W",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "TRY",
      "value": "İlk görüşmede netleştirilir",
    },
    "supply": [
      { "@type": "HowToSupply", "name": "Operasyon ve süreç tanımı" },
      { "@type": "HowToSupply", "name": "Mevcut araçlar (Excel, defter, WhatsApp vb.)" },
    ],
    "tool": [
      { "@type": "HowToTool", "name": "Next.js" },
      { "@type": "HowToTool", "name": "Supabase" },
      { "@type": "HowToTool", "name": "TypeScript" },
    ],
    "step": processSteps.map((s) => ({
      "@type": "HowToStep",
      "name": `${s.step} — ${s.title}`,
      "text": `${s.description} Çıktı: ${s.output}.`,
      "url": `${siteConfig.siteUrl}/surec#adim-${s.step}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <SurecClient />
    </>
  );
}
