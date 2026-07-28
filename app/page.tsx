import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Albanexa — Web Siteleri, İş Takip Sistemleri ve Dijital Çözümler",
  description:
    "Mert Alban / Albanexa: KOBİ'ler için kurumsal web siteleri, özel iş takip sistemleri, web uygulamaları, SaaS ürünleri ve otomasyon çözümleri.",
  path: "/",
});

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ProblemsSolutions from "@/components/ProblemsSolutions";
import HomeSolutions from "@/components/home/HomeSolutions";
import Projects from "@/components/Projects";
import WebSiteVitrin from "@/components/home/WebSiteVitrin";
import Process from "@/components/Process";
import FounderTrust from "@/components/home/FounderTrust";
import FAQPreview from "@/components/home/FAQPreview";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />
      <Hero />
      <TrustStrip />
      <ProblemsSolutions />
      <HomeSolutions />
      <Projects />
      <WebSiteVitrin />
      <Process />
      <FounderTrust />
      <FAQPreview />
      <FinalCTA />
    </main>
  );
}
