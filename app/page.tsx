import SceneBackground from "@/components/SceneBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ProblemsSolutions from "@/components/ProblemsSolutions";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import About from "@/components/About";
import WhyMe from "@/components/WhyMe";
import Strengths from "@/components/Strengths";
import Testimonial from "@/components/Testimonial";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <SceneBackground />
      <Navbar />
      <Hero />
      <TrustStrip />
      <ProblemsSolutions />
      <Services />
      <Projects />
      <Process />
      <About />
      <WhyMe />
      <Strengths />
      <Testimonial />
      <FAQ />
      <Contact />
    </main>
  );
}
