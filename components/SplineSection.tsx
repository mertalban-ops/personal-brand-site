"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { ArrowRight } from "lucide-react";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function SplineSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full opacity-[0.07] blur-[140px]"
        style={{ background: "var(--accent)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[10%] h-[400px] w-[400px] rounded-full opacity-[0.06] blur-[130px]"
        style={{ background: "var(--blue)" }}
      />

      <div className="mx-auto max-w-6xl px-5">
        {/* Section label */}
        <motion.p
          className="mono-label mb-10 text-center"
          {...(reduce ? {} : reveal(0))}
        >
          İnteraktif Teknoloji · 3D Sistem Görselleştirme
        </motion.p>

        {/* Card wrapper */}
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(11,31,51,0.7) 0%, rgba(7,18,28,0.85) 100%)",
            border: "1px solid var(--line)",
            backdropFilter: "blur(12px)",
          }}
          {...(reduce ? {} : reveal(0.05))}
        >
          <Spotlight
            className="-top-40 left-0 md:left-40 md:-top-16"
            fill="rgba(16,185,129,0.28)"
          />

          <div className="flex flex-col lg:flex-row lg:h-[500px]">
            {/* Left — copy */}
            <div className="flex-1 flex flex-col justify-center p-6 md:p-10 lg:p-12 relative z-10">
              <motion.h2
                className="display text-3xl md:text-[2.6rem] font-bold text-ink leading-[1.1]"
                {...(reduce ? {} : reveal(0.1))}
              >
                Sistemleriniz
                <br />
                <span className="text-accent">akıllı,</span> bağlantılı
                <br />
                ve görünür olsun.
              </motion.h2>

              <motion.p
                className="mt-5 max-w-md text-base leading-relaxed"
                style={{ color: "var(--muted)" }}
                {...(reduce ? {} : reveal(0.2))}
              >
                Stok, cari hesap, tahsilat ve otomasyon — tüm operasyonunuzu
                birbirine bağlı tek bir dijital sistemde görün. İşletmenizin
                her boyutunu gerçek zamanlı izleyin.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap gap-3"
                {...(reduce ? {} : reveal(0.3))}
              >
                <a
                  href="/hizmetler"
                  className="btn-shine glow-accent inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
                >
                  Sistem Çözümlerini Gör
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/projeler"
                  className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent"
                  style={{ borderColor: "var(--line)", color: "var(--muted)" }}
                >
                  Projeleri İncele
                </a>
              </motion.div>

              {/* Stats row */}
              <motion.div
                className="mt-8 grid grid-cols-3 gap-3 border-t pt-6"
                style={{ borderColor: "var(--line)" }}
                {...(reduce ? {} : reveal(0.4))}
              >
                {[
                  { value: "14+", label: "Teslim edilen sistem" },
                  { value: "%100", label: "Web tabanlı erişim" },
                  { value: "7/24", label: "Gerçek zamanlı" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="display text-lg font-bold text-accent">{s.value}</p>
                    <p className="mt-0.5 text-[10px] leading-snug" style={{ color: "var(--faint)" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Spline 3D scene (desktop only) */}
            <div className="hidden lg:flex lg:flex-1 relative">
              {/* Gradient fade on left edge to blend into content */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16"
                style={{
                  background:
                    "linear-gradient(to right, rgba(11,31,51,0.7), transparent)",
                }}
              />
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
