"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedSection from "./AnimatedSection";

const content = {
  tr: {
    label: "Müşteri Yorumu",
    quote:
      "Artık borç takibini rahatça yapabiliyorum, gelir-giderimi anlık görebiliyorum. İşimi gerçekten kolaylaştırdı, çok pratik oldu. Geçen gün bir aracı teslim ettikten hemen sonra servis raporunu müşteriye PDF olarak gönderdim — hem zamandan kazandım hem de dükkâna gerçek anlamda oturmuş bir sistemim oldu.",
    author: "Serdar Hezer",
    business: "Sahibi, Hezer Otoşanzıman · İzmir",
    tag: "Doğrulanmış Müşteri",
    cta: "Sizi de benzer bir sisteme kavuşturalım →",
    ctaHref: "/iletisim",
  },
  en: {
    label: "Customer Feedback",
    quote:
      "I can now easily track debts and see my income and expenses in real time. It really made my job easier and it's very practical. The other day, right after handing over a vehicle, I sent the customer the service report as a PDF — I saved time and now I truly have a proper system running in my shop.",
    author: "Serdar Hezer",
    business: "Owner, Hezer Otoşanzıman · İzmir, Turkey",
    tag: "Verified Customer",
    cta: "Let's build the same for you →",
    ctaHref: "/iletisim",
  },
  de: {
    label: "Kundenfeedback",
    quote:
      "Ich kann jetzt mühelos Schulden verfolgen und meine Einnahmen und Ausgaben in Echtzeit einsehen. Es hat meinen Job wirklich erleichtert und ist sehr praktisch. Neulich, kurz nach der Fahrzeugübergabe, habe ich dem Kunden den Servicebericht direkt als PDF geschickt — ich habe Zeit gespart und habe jetzt ein echtes System in meinem Laden.",
    author: "Serdar Hezer",
    business: "Inhaber, Hezer Otoşanzıman · İzmir, Türkei",
    tag: "Verifizierter Kunde",
    cta: "Bauen wir dasselbe für Sie →",
    ctaHref: "/iletisim",
  },
};

export default function Testimonials() {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const c = content[language as keyof typeof content] ?? content.tr;

  return (
    <AnimatedSection id="musteri-yorumu">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="text-center mb-12">
          <p className="mono-label mb-3">{c.label}</p>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl"
        >
          <div className="relative card-surface rounded-2xl p-8 md:p-12 border border-line hover:border-accent/30 transition-colors">
            {/* Decorative quote mark */}
            <div
              className="absolute -top-5 left-10 select-none text-7xl font-serif leading-none"
              style={{ color: "var(--accent)", opacity: 0.25 }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <blockquote className="relative z-10">
              <p className="text-xl md:text-2xl font-medium text-ink leading-relaxed text-balance">
                {c.quote}
              </p>

              <footer className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Avatar placeholder with initials */}
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-black"
                    style={{ background: "var(--accent)" }}
                    aria-hidden="true"
                  >
                    SH
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{c.author}</p>
                    <p className="text-sm text-muted">{c.business}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/8 px-3 py-1 text-xs font-semibold text-accent self-start sm:self-auto">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {c.tag}
                </span>
              </footer>
            </blockquote>
          </div>

          {/* CTA below testimonial */}
          <div className="mt-8 text-center">
            <Link
              href={c.ctaHref}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent opacity-80 transition-opacity hover:opacity-100"
            >
              {c.cta}
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
