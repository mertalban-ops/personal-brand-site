import Link from "next/link";

export default function CaseStudyNextStep() {
  return (
    <section className="border-t border-line py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <p className="mono-label mb-3">Benzer Bir Sistem?</p>
        <h2 className="display text-2xl font-bold text-ink md:text-3xl mb-4">
          İşletmeniz için de benzer bir sistem konuşalım.
        </h2>
        <p className="text-muted mb-8 leading-relaxed">
          Kısa bir ön görüşmede ihtiyacınızı dinleyip ne tür bir sistemin gerçekten işe
          yarayacağını birlikte değerlendiririz.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/iletisim"
            className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            Projeyi Konuşalım
          </Link>
          <Link
            href="/projeler"
            className="rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
          >
            Tüm Projeler
          </Link>
        </div>
      </div>
    </section>
  );
}
