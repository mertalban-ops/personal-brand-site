"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, MessageCircle, ArrowRight, Clock, Shield, Star } from "lucide-react";
import { siteConfig } from "@/data/config";
import { useLanguage } from "@/context/LanguageContext";
import { track } from "@vercel/analytics";

interface CtaStripProps {
  title?: string;
  desc?: string;
}

export default function CtaStrip({ title, desc }: CtaStripProps) {
  const { language } = useLanguage();
  const reduce = useReducedMotion();

  // Localized default texts
  const trDefault = {
    kicker: "Bir adım kaldı",
    title: "İhtiyacınızı birlikte netleştirelim.",
    desc: "İşletmenizin ihtiyaçlarını 30 dakikalık ücretsiz ihtiyaç analiziyle masaya yatıralım. Ücretsiz, taahhütsüz ve sonuç odaklı bir görüşme.",
    emailBtn: "E-posta Gönder",
    whatsappBtn: "WhatsApp'tan Yaz",
    subject: "Proje talebi — Ücretsiz keşif görüşmesi",
    waMsg: "Merhaba, proje görüşmesi yapmak istiyorum."
  };

  const enDefault = {
    kicker: "One step left",
    title: "Let's clarify your needs together.",
    desc: "Let's discuss your business needs in a 30-minute free needs analysis. A free, non-binding, and result-oriented call.",
    emailBtn: "Send Email",
    whatsappBtn: "Chat on WhatsApp",
    subject: "Project inquiry — Free discovery call",
    waMsg: "Hello, I would like to schedule a project call."
  };

  const deDefault = {
    kicker: "Ein Schritt übrig",
    title: "Lassen Sie uns Ihren Bedarf gemeinsam klären.",
    desc: "Lassen Sie uns Ihre Geschäftsanforderungen in einer 30-minütigen kostenlosen Analyse besprechen. Ein kostenloses, unverbindliches und ergebnisorientiertes Gespräch.",
    emailBtn: "E-Mail senden",
    whatsappBtn: "Per WhatsApp schreiben",
    subject: "Projektanfrage — Kostenlose Beratung",
    waMsg: "Hallo, ich möchte ein Projektgespräch vereinbaren."
  };

  const d = language === "en" ? enDefault : language === "de" ? deDefault : trDefault;

  // Real, dürüst / verified trust signals
  const trustSignals = [
    {
      icon: Clock,
      label:
        language === "tr"
          ? "30 dk ücretsiz keşif"
          : language === "de"
          ? "30 Min. kostenlose Analyse"
          : "30 min free discovery",
    },
    {
      icon: Shield,
      label:
        language === "tr"
          ? "Taahhütsüz ilk görüşme"
          : language === "de"
          ? "Unverbindliches Gespräch"
          : "Non-binding consultation",
    },
    {
      icon: Star,
      label:
        language === "tr"
          ? "Doğrudan kurucu iletişimi & Özel kapsam"
          : language === "de"
          ? "Direkte Gründerkommunikation & Individueller Umfang"
          : "Direct founder contact & Custom scope",
    },
  ];

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
          {d.kicker}
        </motion.p>

        <motion.h2
          className="display text-balance text-3xl font-bold text-ink md:text-4xl lg:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          {title ? title : d.title}
        </motion.h2>

        <motion.p
          className="mt-5 text-base leading-relaxed md:text-lg"
          style={{ color: "var(--muted)" }}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {desc ? desc : d.desc}
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
            href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(d.subject)}`}
            onClick={() => {
              try { track("email_click", { location: "cta_strip" }); } catch (err) {}
            }}
            className="btn-shine glow-accent inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            <Mail className="h-4 w-4" />
            {d.emailBtn}
            <ArrowRight className="h-4 w-4" />
          </a>

          {siteConfig.whatsappNumber && (
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(d.waMsg)}`}
              onClick={() => {
                try { track("whatsapp_click", { location: "cta_strip" }); } catch (err) {}
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3.5 font-medium transition-colors hover:border-accent/50 hover:text-accent"
              style={{ borderColor: "var(--line)", color: "var(--muted)" }}
            >
              <MessageCircle className="h-4 w-4" />
              {d.whatsappBtn}
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
          {trustSignals.map(({ icon: Icon, label }) => (
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
