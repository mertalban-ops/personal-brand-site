import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import WhyMe from "@/components/WhyMe";
import Strengths from "@/components/Strengths";
import CtaStrip from "@/components/CtaStrip";

export const metadata = {
  title: "Hizmetler — Solvaria",
  description: "Stok takibi, cari hesap, satış, tahsilat ve otomasyon odaklı web tabanlı iş takip sistemleri.",
};

export default function HizmetlerPage() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />
      <Services />
      <WhyMe />
      <Strengths />
      <CtaStrip />
    </main>
  );
}
