"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Globe,
  ClipboardList,
  Workflow,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Reveal3D from "@/components/Reveal3D";
import FloatingCard from "@/components/FloatingCard";
import { useLanguage } from "@/context/LanguageContext";

export default function HomeSolutions() {
  const { language, t } = useLanguage();
  const reduce = useReducedMotion();

  const trOfferings = [
    {
      title: "Operasyon Sistemleri",
      desc: "İşletmenizin günlük işleyişini, siparişlerini, stoklarını ve ödemelerini dijitalleştiren özel yönetim panelleri.",
      features: [
        "İş takip sistemi",
        "Stok yönetimi",
        "Cari hesap & Tahsilat",
        "Servis operasyonu",
        "Yönetici dashboard'u",
        "PDF raporlama & Ekstre"
      ],
      cta: "Operasyon sistemlerini incele",
      href: "/cozumler",
      icon: ClipboardList
    },
    {
      title: "Web ve Dijital Marka",
      desc: "Müşterilerinize güven veren, Core Web Vitals odaklı çalışan yüksek dönüşümlü web siteleri.",
      features: [
        "Kurumsal web sitesi",
        "Kişisel marka & Portföy sitesi",
        "SaaS tanıtım siteleri",
        "Yüksek dönüşümlü Landing page'ler",
        "İnteraktif & 3D deneyimler",
        "Teknik SEO uyumlu altyapı"
      ],
      cta: "Web sitesi çözümlerini incele",
      href: "/cozumler/web-siteleri",
      icon: Globe
    },
    {
      title: "SaaS ve Otomasyon",
      desc: "Tekrarlanan işlerinizi otomatikleştiren veya ürün fikrinizi pazara sunan bulut tabanlı altyapılar.",
      features: [
        "MVP (Minimum Viable Product)",
        "Abonelik & Ödeme entegrasyonları",
        "Multi-tenant (Çok kiracılı) mimari",
        "n8n ile arka plan otomasyonları",
        "Yapay zekâ (AI Agent) entegrasyonları",
        "Gelişmiş API & Webhook akışları"
      ],
      cta: "SaaS ve otomasyonu incele",
      href: "/cozumler",
      icon: Workflow
    }
  ];

  const enOfferings = [
    {
      title: "Operations Systems",
      desc: "Bespoke dashboards and portals digitizing your daily workflows, order intake, stock levels, and collections.",
      features: [
        "Work tracking systems",
        "Inventory management",
        "Current accounts & collections",
        "Service intake & operations",
        "Executive dashboards",
        "PDF invoicing & export"
      ],
      cta: "Explore operations systems",
      href: "/cozumler",
      icon: ClipboardList
    },
    {
      title: "Web & Digital Brand",
      desc: "High-converting, lightning-fast corporate websites built with strict Core Web Vitals optimization.",
      features: [
        "Corporate websites",
        "Personal brand & portfolio sites",
        "SaaS product marketing pages",
        "High-conversion Landing pages",
        "Interactive & 3D experiences",
        "Technical SEO optimized structure"
      ],
      cta: "Explore website solutions",
      href: "/cozumler/web-siteleri",
      icon: Globe
    },
    {
      title: "SaaS & Automation",
      desc: "Cloud architectures automating your manual flows or launching your SaaS product idea to market.",
      features: [
        "MVP (Minimum Viable Product)",
        "Subscription & payment gateway integration",
        "Multi-tenant system architectures",
        "n8n backend automations",
        "Artificial Intelligence (AI agent) features",
        "Advanced APIs & Webhook integrations"
      ],
      cta: "Explore SaaS & automation",
      href: "/cozumler",
      icon: Workflow
    }
  ];

  const deOfferings = [
    {
      title: "Operative Systeme",
      desc: "Maßgeschneiderte Dashboards und Portale zur Digitalisierung Ihrer täglichen Arbeitsabläufe, Bestellungen und Bestände.",
      features: [
        "Arbeitsverfolgungssysteme",
        "Lagerbestandverwaltung",
        "Kontokorrent & Inkasso",
        "Serviceannahme & Betrieb",
        "Geschäftsführer-Dashboards",
        "PDF-Rechnungen & Berichte"
      ],
      cta: "Operative Systeme erkunden",
      href: "/cozumler",
      icon: ClipboardList
    },
    {
      title: "Web & Digitale Marke",
      desc: "Konversionsstarke, blitzschnelle Websites für Unternehmen mit Fokus auf Core Web Vitals.",
      features: [
        "Unternehmenswebsites",
        "Persönliche Marken- & Portfolioseiten",
        "SaaS-Produktmarketingseiten",
        "Konversionsstarke Landingpages",
        "Interaktive & 3D-Erlebnisse",
        "Technische SEO-optimierte Struktur"
      ],
      cta: "Webseitenelemente erkunden",
      href: "/cozumler/web-siteleri",
      icon: Globe
    },
    {
      title: "SaaS & Automatisierung",
      desc: "Cloud-Infrastrukturen zur Automatisierung manueller Aufgaben oder zur schnellen Markteinführung Ihrer SaaS-Idee.",
      features: [
        "MVP (Minimum Viable Product)",
        "Abonnement- & Zahlungsintegrationen",
        "Mandantenfähige Systemarchitekturen",
        "n8n-Hintergrundautomatisierungen",
        "Integration künstlicher Intelligenz (KI)",
        "Erweiterte APIs & Webhook-Verbindungen"
      ],
      cta: "SaaS & Automatisierung erkunden",
      href: "/cozumler",
      icon: Workflow
    }
  ];

  const offerings = language === "en" ? enOfferings : language === "de" ? deOfferings : trOfferings;

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <AnimatedSection id="cozum-alanlari">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="text-center mb-16">
          <motion.p className="mono-label mb-3" {...enter(0)}>
            {t.services.label}
          </motion.p>
          <motion.h2
            className="display text-3xl font-bold text-ink md:text-4xl text-balance max-w-2xl mx-auto"
            {...enter(0.1)}
          >
            {language === "tr"
              ? "İşletmeniz için çalışan dijital altyapılar"
              : language === "de"
              ? "Digitale Infrastrukturen für Ihr Unternehmen"
              : "Digital infrastructures working for your business"}
          </motion.h2>
          <motion.p
            className="mt-4 text-muted max-w-xl mx-auto text-sm leading-relaxed"
            {...enter(0.2)}
          >
            {language === "tr"
              ? "Süreçlerinizi kopyala-yapıştır yazılımlara uydurmaya çalışmayın. İhtiyacınıza göre ölçeklenen özel modüllerle çalışın."
              : language === "de"
              ? "Passen Sie Ihre Prozesse nicht an Standardsoftware an. Arbeiten Sie mit maßgeschneiderten Modulen, die nach Ihren Bedürfnissen skalieren."
              : "Stop trying to adapt your workflows to cookie-cutter software. Work with customized modules that scale exactly as you need."}
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {offerings.map((offering, i) => {
            const Icon = offering.icon;

            return (
              <Reveal3D key={offering.title} delay={i * 0.1} className="h-full">
                <FloatingCard className="h-full">
                  <div className="card-surface group flex h-full flex-col justify-between rounded-2xl p-6 border border-line hover:border-accent/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/15">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <span className="text-[0.65rem] font-mono text-faint uppercase tracking-wider">
                          Offer 0{i + 1}
                        </span>
                      </div>

                      <h3 className="display text-xl font-bold text-ink mb-3 group-hover:text-accent transition-colors">
                        {offering.title}
                      </h3>

                      <p className="text-xs text-muted leading-relaxed mb-6">
                        {offering.desc}
                      </p>

                      {/* Features List */}
                      <ul className="space-y-2 mb-8 border-t border-line/60 pt-6">
                        {offering.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2 text-xs text-muted">
                            <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom CTA Link */}
                    <div className="border-t border-line/45 pt-4">
                      <Link
                        href={offering.href}
                        className="inline-flex w-full items-center justify-between text-xs font-semibold text-muted group-hover:text-accent transition-colors"
                      >
                        <span>{offering.cta}</span>
                        <ArrowRight className="h-3.5 w-3.5 transform transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </FloatingCard>
              </Reveal3D>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
