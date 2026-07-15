import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CtaStrip from "@/components/CtaStrip";
import { solutions } from "@/data/solutions";
import SolutionCard from "@/components/solutions/SolutionCard";
import ProblemSelector from "@/components/solutions/ProblemSelector";
import AnimatedSection from "@/components/AnimatedSection";
import Reveal3D from "@/components/Reveal3D";
import FloatingCard from "@/components/FloatingCard";

export const metadata: Metadata = {
  title: "Çözümler — Solvaria",
  description:
    "İşletmeye özel dijital sistemler: iş takibi, stok ve cari hesap, operasyon otomasyonları, SaaS altyapısı.",
};

export default function CozumlerPage() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-5">
          <p className="mono-label mb-4">Çözümler</p>
          <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl">
            Web sitesinden iş takip sistemine,{" "}
            <span className="text-accent">işletmenize özel çözümler</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Kurumsal web siteleri, web uygulamaları, iş takip sistemleri, SaaS altyapıları
            ve otomasyon çözümleri — işletmenizin gerçek ihtiyacına göre tasarlanmış,
            sıfırdan geliştirilen dijital yapılar.
          </p>
        </div>
      </section>

      {/* Problem Selector */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 pb-16">
          <ProblemSelector solutions={solutions} />
        </div>
      </AnimatedSection>

      {/* Solution Cards */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 pb-20 md:pb-28">
          <h2 className="display text-2xl font-bold text-ink mb-8 md:text-3xl">
            Tüm Çözüm Kategorileri
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {solutions.map((solution, i) => (
              <Reveal3D key={solution.slug} delay={i * 0.1} className="h-full">
                <FloatingCard className="h-full">
                  <SolutionCard solution={solution} />
                </FloatingCard>
              </Reveal3D>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <CtaStrip />
    </main>
  );
}
