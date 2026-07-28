import Link from "next/link";
import { ArrowLeft, Home, Layers, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <main className="w-full flex flex-col min-h-screen" style={{ overflowX: "clip" }}>
      <Navbar />

      <section className="relative flex-grow flex items-center justify-center pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div
          className="absolute -top-32 left-1/2 -z-10 h-[450px] w-[600px] -translate-x-1/2 rounded-full opacity-[0.12] blur-[140px]"
          style={{ background: "var(--accent)" }}
        />

        <div className="mx-auto max-w-2xl px-5 text-center">
          <span className="mono-label mb-4 inline-block text-accent">404 — SAYFA BULUNAMADI</span>
          <h1 className="display text-4xl font-bold text-ink md:text-5xl mb-6">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </h1>
          <p className="text-muted text-base leading-relaxed mb-10 max-w-lg mx-auto">
            Gitmeye çalıştığınız bağlantı değişmiş olabilir. Aşağıdaki hızlı bağlantılardan işletmeniz için doğru çözüme ulaşabilirsiniz.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="btn-shine glow-accent inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              <Home className="h-4 w-4" />
              Ana Sayfa
            </Link>
            <Link
              href="/cozumler"
              className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              <Layers className="h-4 w-4" />
              Çözümleri İncele
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              <Mail className="h-4 w-4" />
              İletişime Geç
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
