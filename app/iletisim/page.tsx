import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export const metadata = {
  title: "İletişim — Solvaria",
  description: "Projenizi konuşalım. Ücretsiz keşif görüşmesi için iletişime geçin.",
};

export default function IletisimPage() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />
      <FAQ />
      <Contact />
    </main>
  );
}
