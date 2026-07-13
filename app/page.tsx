import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ProblemsSolutions from "@/components/ProblemsSolutions";
import SystemNetwork from "@/components/SystemNetwork";
import SplineSection from "@/components/SplineSection";
import Testimonial from "@/components/Testimonial";
import CtaStrip from "@/components/CtaStrip";
import LazyVisible from "@/components/LazyVisible";

export default function Home() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />
      <Hero />
      <TrustStrip />
      <ProblemsSolutions />
      <SystemNetwork />
      <LazyVisible>
        <SplineSection />
      </LazyVisible>
      <Testimonial />
      <CtaStrip />
    </main>
  );
}
