import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";

export const metadata = {
  title: "Projeler — Solvaria",
  description: "Gerçek firmalar için geliştirdiğimiz iş takip ve otomasyon sistemleri.",
};

export default function ProjelerPage() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />
      <Projects />
    </main>
  );
}
