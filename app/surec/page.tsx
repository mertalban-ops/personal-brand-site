import Navbar from "@/components/Navbar";
import Process from "@/components/Process";
import About from "@/components/About";
import CtaStrip from "@/components/CtaStrip";

export const metadata = {
  title: "Süreç & Hakkımda — Solvaria",
  description: "Nasıl çalışıyoruz ve kimiz? Dijital dönüşüm sürecimiz hakkında.",
};

export default function SurecPage() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />
      <Process />
      <About />
      <CtaStrip />
    </main>
  );
}
