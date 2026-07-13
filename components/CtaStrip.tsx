"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, MessageCircle, ArrowRight, Clock, Shield, Star } from "lucide-react";
import { contact } from "@/data/contact";

const TRUST_SIGNALS = [
  { icon: Clock, label: "30 dk ücretsiz keşif" },
  { icon: Shield, label: "Taahhütsüz ilk görüşme" },
  { icon: Star, label: "14+ teslim edilen sistem" },
];

export default function CtaStrip() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden py-20 md:py-24"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.07), transparent 70%)",
        borderTop: "1px solid var(--line)",
      }}
    >
      {/* Subtle grid */}
      <div className="bg-grid absolute inset-0 -z-10 opacity-30" />

      <div className="mx-auto max-w-4xl px-5 text-center">
        <motion.p
          className="mono-label mb-4"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Bir adım kaldı
        </motion.p>

        <motion.h2
          className="display text-balance text-3xl font-bold text-ink md:text-4xl lg:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          Projenizi birlikte{" "}
          <span className="text-accent">hayata geçirelim.</span>
        </motion.h2>

        <motion.p
          className="mt-5 text-base leading-relaxed md:text-lg"
          style={{ color: "var(--muted)" }}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          İşletmenizin ihtiyaçlarını 30 dakikada masaya yatıralım.{" "}
          Ücretsiz, taahhütsüz ve sonuç odaklı bir görüşme.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href={`mailto:${contact.email}?subject=${encodeURIComponent("Proje talebi — Ücretsiz keşif görüşmesi")}`}
            className="btn-shine glow-accent inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            <Mail className="h-4 w-4" />
            E-posta Gönder
            <ArrowRight className="h-4 w-4" />
          </a>

          {contact.whatsapp && (
            <a
              href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Merhaba, proje görüşmesi yapmak istiyorum.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3.5 font-medium transition-colors hover:border-accent/50 hover:text-accent"
              style={{ borderColor: "var(--line)", color: "var(--muted)" }}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp&apos;tan Yaz
            </a>
          )}
        </motion.div>

        {/* Trust signals */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm" style={{ color: "var(--faint)" }}>
              <Icon className="h-4 w-4 flex-shrink-0" style={{ color: "var(--accent)" }} />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
