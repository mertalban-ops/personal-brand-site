import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import SplineSection from "@/components/SplineSection";
import ProblemsSolutions from "@/components/ProblemsSolutions";
import Testimonial from "@/components/Testimonial";
import CtaStrip from "@/components/CtaStrip";

export default function Home() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />
      <Hero />
      <TrustStrip />
      <ProblemsSolutions />
      <SplineSection />
      <Testimonial />
      <CtaStrip />
    </main>
  );
}
