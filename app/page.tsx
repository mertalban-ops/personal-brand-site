import { buildPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/config";
import { faqs } from "@/data/faqs";

export const metadata = buildPageMetadata({
  title: "Albanexa — KOBİ'ler İçin Özel Yazılım ve Dijital Sistemler",
  description:
    "Albanexa: KOBİ'ler için özel iş takip sistemleri, stok ve cari hesap yazılımları, kurumsal web siteleri ve SaaS altyapısı. İzmir merkezli, Türkiye geneline hizmet veren dijital ürün stüdyosu.",
  path: "/",
});

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ProblemsSolutions from "@/components/ProblemsSolutions";
import HomeSolutions from "@/components/home/HomeSolutions";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import WebSiteVitrin from "@/components/home/WebSiteVitrin";
import Process from "@/components/Process";
import FAQPreview from "@/components/home/FAQPreview";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.siteUrl}/#faq`,
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="w-full" style={{ overflowX: "clip" }}>
        <Navbar />
        <Hero />
        <TrustStrip />
        <ProblemsSolutions />
        <HomeSolutions />
        <Projects />
        <Testimonials />
        <WebSiteVitrin />
        <Process />
        <FAQPreview />
        <FinalCTA />
      </main>
    </>
  );
}
