"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/data/config";
import { track } from "@vercel/analytics";
import { trackContact } from "@/lib/meta-events";

const content = {
  tr: {
    title1: "İşletmeniz için doğru dijital çözümü",
    titleHighlight: "birlikte belirleyelim.",
    desc: "İhtiyacınızı kısaca paylaşın. Mevcut süreci, hedefleri ve uygulanabilir çözüm seçeneklerini birlikte değerlendirelim.",
    cta1: "Ücretsiz ihtiyaç analizi al",
    cta2: "Projeleri incele",
    ctaWa: "WhatsApp'tan yaz",
    waMsg: "Merhaba, işletmem için bir dijital çözüm hakkında kısaca konuşmak istiyorum.",
  },
  en: {
    title1: "Let's define the right digital solution",
    titleHighlight: "for your business together.",
    desc: "Share your needs briefly. We'll assess the current process, goals, and viable solution options together.",
    cta1: "Get a free needs analysis",
    cta2: "View projects",
    ctaWa: "Chat on WhatsApp",
    waMsg: "Hello, I would like to briefly discuss a digital solution for my business.",
  },
  de: {
    title1: "Lassen Sie uns gemeinsam die richtige",
    titleHighlight: "digitale Lösung für Ihr Unternehmen definieren.",
    desc: "Teilen Sie Ihre Anforderungen kurz mit. Wir bewerten gemeinsam den aktuellen Prozess, die Ziele und mögliche Lösungsoptionen.",
    cta1: "Kostenlose Bedarfsanalyse anfordern",
    cta2: "Projekte ansehen",
    ctaWa: "Per WhatsApp schreiben",
    waMsg: "Hallo, ich möchte kurz über eine digitale Lösung für mein Unternehmen sprechen.",
  },
};

export default function FinalCTA() {
  const { t, language } = useLanguage();
  const reduce = useReducedMotion();
  const c = content[language] ?? content.tr;

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
          {c.title1}{" "}
          <span className="text-accent">{c.titleHighlight}</span>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted max-w-xl mx-auto">
          {c.desc}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/iletisim"
            className="btn-shine glow-accent rounded-lg bg-accent px-8 py-3.5 font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            {c.cta1}
          </Link>
          <Link
            href="/projeler"
            className="inline-flex items-center gap-2 rounded-lg border border-line px-8 py-3.5 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
          >
            {c.cta2}
          </Link>
          {siteConfig.whatsappNumber && (
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(c.waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { try { track("whatsapp_click", { location: "home_final_cta" }); trackContact(); } catch {} }}
              className="inline-flex items-center gap-2 rounded-lg border border-line px-8 py-3.5 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              <MessageCircle className="h-4 w-4" /> {c.ctaWa}
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
