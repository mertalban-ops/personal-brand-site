"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedSection from "./AnimatedSection";

type Testimonial = {
  quote: string;
  author: string;
  business: string;
  initials: string;
  tag: string;
  project?: { label: string; href: string };
};

type TestimonialsContent = {
  label: string;
  cta: string;
  ctaHref: string;
  items: Testimonial[];
};

const content: Record<"tr" | "en" | "de", TestimonialsContent> = {
  tr: {
    label: "Müşteri Yorumları",
    cta: "Sizi de benzer bir sisteme kavuşturalım →",
    ctaHref: "/iletisim",
    items: [
      {
        quote:
          "Artık borç takibini rahatça yapabiliyorum, gelir-giderimi anlık görebiliyorum. İşimi gerçekten kolaylaştırdı, çok pratik oldu. Geçen gün bir aracı teslim ettikten hemen sonra servis raporunu müşteriye PDF olarak gönderdim — hem zamandan kazandım hem de dükkâna gerçek anlamda oturmuş bir sistemim oldu.",
        author: "Serdar Hezer",
        business: "Sahibi, Hezer Otoşanzıman · İzmir",
        initials: "SH",
        tag: "Doğrulanmış Müşteri",
      },
      {
        quote:
          "Sipariş, teslimat ve ödeme takibimizi tamamen manuel yapıyorduk; depodaki ürün sayılarını bile net bilmiyorduk. Artık hepsini bize özel hazırlanan sistem üzerinden anlık olarak görebiliyoruz ve her siparişin ardından müşterilerimize PDF gönderebiliyoruz. İşleyişimiz ciddi şekilde kolaylaştı. Mert Bey'in ilgisi ve çözüm odaklı yaklaşımı için ayrıca teşekkür ederim.",
        author: "Sedat İpek",
        business: "Aden Ticaret Sahibi",
        initials: "Sİ",
        tag: "Doğrulanmış Müşteri",
        project: { label: "StockApp kullanıcısı", href: "/projeler/stockapp" },
      },
    ],
  },
  en: {
    label: "Customer Feedback",
    cta: "Let's build the same for you →",
    ctaHref: "/iletisim",
    items: [
      {
        quote:
          "I can now easily track debts and see my income and expenses in real time. It really made my job easier and it's very practical. The other day, right after handing over a vehicle, I sent the customer the service report as a PDF — I saved time and now I truly have a proper system running in my shop.",
        author: "Serdar Hezer",
        business: "Owner, Hezer Otoşanzıman · İzmir, Turkey",
        initials: "SH",
        tag: "Verified Customer",
      },
      {
        quote:
          "We used to track orders, deliveries, and payments completely manually; we didn't even know exactly how many products we had in the warehouse. Now we can see all of it in real time through a system built specifically for us, and after every order we can send our customers a PDF. Our operations have become significantly easier. I'd also like to thank Mert for his attentiveness and solution-focused approach.",
        author: "Sedat İpek",
        business: "Owner, Aden Ticaret",
        initials: "Sİ",
        tag: "Verified Customer",
        project: { label: "StockApp user", href: "/projeler/stockapp" },
      },
    ],
  },
  de: {
    label: "Kundenfeedback",
    cta: "Bauen wir dasselbe für Sie →",
    ctaHref: "/iletisim",
    items: [
      {
        quote:
          "Ich kann jetzt mühelos Schulden verfolgen und meine Einnahmen und Ausgaben in Echtzeit einsehen. Es hat meinen Job wirklich erleichtert und ist sehr praktisch. Neulich, kurz nach der Fahrzeugübergabe, habe ich dem Kunden den Servicebericht direkt als PDF geschickt — ich habe Zeit gespart und habe jetzt ein echtes System in meinem Laden.",
        author: "Serdar Hezer",
        business: "Inhaber, Hezer Otoşanzıman · İzmir, Türkei",
        initials: "SH",
        tag: "Verifizierter Kunde",
      },
      {
        quote:
          "Wir haben Bestellungen, Lieferungen und Zahlungen früher komplett manuell verfolgt; wir wussten nicht einmal genau, wie viele Produkte wir im Lager hatten. Jetzt können wir alles in Echtzeit über ein speziell für uns entwickeltes System sehen und nach jeder Bestellung unseren Kunden ein PDF senden. Unsere Abläufe sind deutlich einfacher geworden. Außerdem möchte ich mich bei Herrn Mert für seine Aufmerksamkeit und seinen lösungsorientierten Ansatz bedanken.",
        author: "Sedat İpek",
        business: "Inhaber, Aden Ticaret",
        initials: "Sİ",
        tag: "Verifizierter Kunde",
        project: { label: "StockApp-Nutzer", href: "/projeler/stockapp" },
      },
    ],
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

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:items-stretch">
          {c.items.map((t, i) => (
            <motion.div
              key={t.author}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: reduce ? 0 : i * 0.1,
              }}
              className="relative flex h-full flex-col card-surface rounded-2xl p-8 md:p-10 border border-line hover:border-accent/30 transition-colors"
            >
              {/* Decorative quote mark */}
              <div
                className="absolute -top-5 left-10 select-none text-7xl font-serif leading-none"
                style={{ color: "var(--accent)", opacity: 0.25 }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <blockquote className="relative z-10 flex h-full flex-col">
                <p className="text-lg md:text-xl font-medium text-ink leading-relaxed">
                  {t.quote}
                </p>

                <footer className="mt-auto flex flex-col gap-4 pt-8">
                  <div className="flex items-center gap-4">
                    {/* Avatar placeholder with initials */}
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-black"
                      style={{ background: "var(--accent)" }}
                      aria-hidden="true"
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-ink">{t.author}</p>
                      <p className="text-sm text-muted">{t.business}</p>
                      {t.project && (
                        <Link
                          href={t.project.href}
                          className="mt-1 inline-flex items-center gap-1 rounded-sm text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                        >
                          {t.project.label}
                          <span aria-hidden="true">→</span>
                        </Link>
                      )}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-accent/30 bg-accent/8 px-3 py-1 text-xs font-semibold text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {t.tag}
                  </span>
                </footer>
              </blockquote>
            </motion.div>
          ))}
        </div>

        {/* CTA below testimonials */}
        <div className="mt-10 text-center">
          <Link
            href={c.ctaHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent opacity-80 transition-opacity hover:opacity-100"
          >
            {c.cta}
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
