"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Mail } from "lucide-react";
import { contact } from "@/data/contact";
import { useLanguage } from "@/context/LanguageContext";

export default function FinalCTA() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-[140px]"
        style={{ background: "var(--accent)" }}
      />
      <motion.div
        className="mx-auto max-w-3xl px-5 text-center"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mono-label mb-4">{t.contact.label}</p>
        <h2 className="display text-balance text-4xl font-bold text-ink md:text-5xl">
          Web siteniz, sisteminiz veya uygulamanız —{" "}
          <span className="text-accent">birlikte inşa edelim.</span>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted max-w-xl mx-auto">
          İhtiyacınızı kısa bir ön görüşmede değerlendirelim; hangi çözümün gerçekten
          gerekli olduğunu birlikte netleştirelim. İlk görüşme ücretsiz.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/iletisim"
            className="btn-shine glow-accent rounded-lg bg-accent px-8 py-3.5 font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            Projemi Anlat
          </Link>
          <a
            href={`mailto:${contact.email}?subject=${encodeURIComponent("Proje talebi")}`}
            className="inline-flex items-center gap-2 rounded-lg border border-line px-8 py-3.5 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
          >
            <Mail className="h-4 w-4" />
            E-posta Gönder
          </a>
        </div>
      </motion.div>
    </section>
  );
}
