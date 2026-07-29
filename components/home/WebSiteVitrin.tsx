"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Globe, Smartphone, Zap, Search, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

export default function WebSiteVitrin() {
  const { language } = useLanguage();
  const reduce = useReducedMotion();

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  // Translations
  const trContent = {
    kicker: "Kurumsal Web Siteleri",
    title: "Markanızı yalnızca görünür değil, ikna edici kılan web siteleri",
    desc: "Ziyaretçinin kim olduğunuzu, ne yaptığınızı ve neden sizi seçmesi gerektiğini ilk bakışta anlaması için net sayfa akışı, güçlü tasarım ve doğru iletişim yapısı kuruyoruz.",
    features: [
      { icon: Globe, label: "Kurumsal görünüm", desc: "Markanızı güvenilir ve profesyonel gösteren tasarım." },
      { icon: Smartphone, label: "Mobil uyumlu", desc: "Farklı ekran boyutlarında tutarlı ve esnek responsive yapı." },
      { icon: Zap, label: "Hız ve performans", desc: "Core Web Vitals odaklı, hızlı açılan sayfalar." },
      { icon: Search, label: "SEO temeli", desc: "Arama motorlarının siteyi daha kolay taramasını ve anlamasını destekleyen teknik altyapı." },
    ],
    primaryCta: "Web Sitesi Hizmetini İnceleyin",
    secondaryCta: "Web Sitesi Konuşalım",
    types: [
      { type: "Kurumsal Site", tag: "En çok tercih" },
      { type: "Kişisel Marka", tag: "" },
      { type: "Landing Page", tag: "" },
      { type: "SaaS Tanıtım", tag: "" },
      { type: "Portfolyo", tag: "" },
      { type: "Ürün Lansmanı", tag: "" },
    ]
  };

  const enContent = {
    kicker: "Corporate Websites",
    title: "Websites that make your brand not just visible, but convincing",
    desc: "We build clear page flows, strong visual design, and conversion pipelines so that visitors instantly understand who you are, what you do, and why they should choose you.",
    features: [
      { icon: Globe, label: "Corporate Image", desc: "Bespoke design showing your brand as reliable and professional." },
      { icon: Smartphone, label: "Mobile Optimized", desc: "Responsive layout that works flawlessly on every screen size." },
      { icon: Zap, label: "Speed & Performance", desc: "Core Web Vitals focused, blazing fast page loads." },
      { icon: Search, label: "SEO Foundation", desc: "Solid backend setup to boost search engine visibility." },
    ],
    primaryCta: "Examine Website Services",
    secondaryCta: "Let's Talk Websites",
    types: [
      { type: "Corporate Site", tag: "Most Popular" },
      { type: "Personal Brand", tag: "" },
      { type: "Landing Page", tag: "" },
      { type: "SaaS Promo", tag: "" },
      { type: "Portfolio", tag: "" },
      { type: "Product Launch", tag: "" },
    ]
  };

  const deContent = {
    kicker: "Unternehmenswebsites",
    title: "Websites, die Ihre Marke nicht nur sichtbar, sondern überzeugend machen",
    desc: "Wir konzipieren klare Seitenabläufe, starkes Design und die richtige Kommunikation, damit Besucher sofort verstehen, wer Sie sind, was Sie tun und warum sie sich für Sie entscheiden sollten.",
    features: [
      { icon: Globe, label: "Unternehmerischer Look", desc: "Design, das Ihre Marke vertrauenswürdig und professionell macht." },
      { icon: Smartphone, label: "Mobiloptimiert", desc: "Responsive Layouts, die auf jedem Gerät einwandfrei funktionieren." },
      { icon: Zap, label: "Geschwindigkeit & Leistung", desc: "Auf Core Web Vitals ausgerichtete, schnell ladende Seiten." },
      { icon: Search, label: "SEO-Fundament", desc: "Infrastruktur zur Steigerung der Sichtbarkeit in Suchmaschinen." },
    ],
    primaryCta: "Website-Dienstleistungen prüfen",
    secondaryCta: "Über Websites sprechen",
    types: [
      { type: "Unternehmensseite", tag: "Beliebt" },
      { type: "Persönliche Marke", tag: "" },
      { type: "Landingpage", tag: "" },
      { type: "SaaS-Promo", tag: "" },
      { type: "Portfolio", tag: "" },
      { type: "Produkt-Launch", tag: "" },
    ]
  };

  const c = language === "en" ? enContent : language === "de" ? deContent : trContent;

  return (
    <AnimatedSection className="band-petrol border-y border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">

          {/* Left Column: Text */}
          <div>
            <motion.p className="mono-label mb-3" {...enter(0)}>
              {c.kicker}
            </motion.p>
            <motion.h2
              className="display text-3xl font-bold text-ink md:text-4xl text-balance"
              {...enter(0.1)}
            >
              {language === "tr" ? (
                <>
                  Markanızı yalnızca görünür değil, <span className="text-accent">ikna edici</span> kılan web siteleri
                </>
              ) : language === "de" ? (
                <>
                  Websites, die Ihre Marke nicht nur sichtbar, sondern <span className="text-accent">überzeugend</span> machen
                </>
              ) : (
                <>
                  Websites that make your brand not just visible, but <span className="text-accent">convincing</span>
                </>
              )}
            </motion.h2>
            <motion.p className="mt-5 text-muted leading-relaxed max-w-lg" {...enter(0.2)}>
              {c.desc}
            </motion.p>

            <motion.div className="mt-8 grid grid-cols-2 gap-4" {...enter(0.3)}>
              {c.features.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{label}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div className="mt-9 flex flex-wrap gap-4" {...enter(0.4)}>
              <Link
                href="/cozumler/web-siteleri"
                className="btn-shine glow-accent inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
              >
                {c.primaryCta} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/40 hover:text-accent"
              >
                {c.secondaryCta}
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Site Types cards */}
          <motion.div className="grid grid-cols-2 gap-3" {...enter(0.2)}>
            {c.types.map(({ type, tag }, i) => (
              <motion.div
                key={type}
                initial={reduce ? undefined : { opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * i, ease: "easeOut" }}
                className="card-surface relative rounded-xl p-4 transition-all hover:border-accent/30"
              >
                {tag && (
                  <span className="absolute right-3 top-3 rounded-md bg-accent/10 px-2 py-0.5 text-[0.6rem] font-semibold text-accent">
                    {tag}
                  </span>
                )}
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                  <Globe className="h-4 w-4 text-accent" />
                </div>
                <p className="text-sm font-semibold text-ink">{type}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </AnimatedSection>
  );
}
