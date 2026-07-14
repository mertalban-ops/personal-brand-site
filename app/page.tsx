import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ProblemsSolutions from "@/components/ProblemsSolutions";
import SystemNetwork from "@/components/SystemNetwork";
import Projects from "@/components/Projects";
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
      <SystemNetwork />
      <Projects />
      <FounderTrust />
      <FAQPreview />
      <FinalCTA />
    </main>
  );
}
