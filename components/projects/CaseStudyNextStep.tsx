"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type Props = {
  projectSlug: string;
  projectName: string;
};

export default function CaseStudyNextStep({ projectSlug, projectName }: Props) {
  const { language } = useLanguage();

  const content: Record<string, Record<string, { label: string; title: string; desc: string; cta: string }>> = {
    tr: {
      stockapp: {
        label: "Benzer Bir Operasyon Sistemi?",
        title: "Benzer bir stok ve cari hesap sistemi konuşalım.",
        desc: "Kısa bir ön görüşmede ihtiyacınızı dinleyip ne tür bir sistemin işe yarayacağını birlikte değerlendiririz.",
        cta: "Benzer Bir Operasyon Sistemi İçin Görüşelim",
      },
      "hezer-auto-service": {
        label: "Servis Operasyonu?",
        title: "Servis operasyonunuzu birlikte dijitalleştirelim.",
        desc: "İş akışlarınızı basitleştirecek özel takip modüllerini planlayalım.",
        cta: "Servis Operasyonunuzu Birlikte Dijitalleştirelim",
      },
      carpass: {
        label: "Ürün Fikri?",
        title: "Ürün fikrinizi veya platformunuzu konuşalım.",
        desc: "SaaS projenizin teknik altyapısını ve MVP geliştirme adımlarını planlayalım.",
        cta: "Ürün Fikrinizi Konuşalım",
      },
      "saas-operasyon-altyapisi": {
        label: "SaaS Mimari?",
        title: "SaaS mimarinizi birlikte planlayalım.",
        desc: "Ölçeklenebilir, multi-tenant bulut mimari bileşenlerini tasarlayalım.",
        cta: "SaaS Mimarinizi Birlikte Planlayalım",
      },
      default: {
        label: "Benzer Bir Sistem?",
        title: "İşletmeniz için de benzer bir çözüm konuşalım.",
        desc: "Ön görüşmede ihtiyaçlarınızı değerlendirip uygun yaklaşımı netleştirelim.",
        cta: "Projeyi Konuşalım",
      },
    },
    en: {
      stockapp: {
        label: "Similar Operation System?",
        title: "Let's discuss a custom inventory and receivables system for your business.",
        desc: "In a short discovery call, we will evaluate what kind of system will work for you.",
        cta: "Let's Discuss a Similar Operations System",
      },
      "hezer-auto-service": {
        label: "Service Operations?",
        title: "Let's digitize your service operations together.",
        desc: "Let's plan custom tracking modules to simplify your workflows.",
        cta: "Let's Digitize Your Service Operations Together",
      },
      carpass: {
        label: "Product Idea?",
        title: "Let's discuss your product idea or platform.",
        desc: "Let's plan the technical stack and MVP steps for your SaaS project.",
        cta: "Let's Discuss Your Product Idea",
      },
      "saas-operasyon-altyapisi": {
        label: "SaaS Architecture?",
        title: "Let's plan your SaaS architecture together.",
        desc: "Let's design scalable, multi-tenant cloud architecture components.",
        cta: "Let's Plan Your SaaS Architecture Together",
      },
      default: {
        label: "Similar System?",
        title: "Let's discuss a similar solution for your business.",
        desc: "Let's clarify the appropriate approach for your digital needs.",
        cta: "Discuss Project",
      },
    },
    de: {
      stockapp: {
        label: "Ähnliches Betriebssystem?",
        title: "Lassen Sie uns über ein benutzerdefiniertes Bestands- und Debitorensystem sprechen.",
        desc: "In einem kurzen Gespräch bewerten wir, welche Art von System für Sie am besten geeignet ist.",
        cta: "Ähnliches Betriebssystem besprechen",
      },
      "hezer-auto-service": {
        label: "Serviceabläufe?",
        title: "Lassen Sie uns Ihre Serviceabläufe gemeinsam digitalisieren.",
        desc: "Lassen Sie uns benutzerdefinierte Verfolgungsmodule planen, um Ihre Arbeitsabläufe zu vereinfachen.",
        cta: "Serviceabläufe gemeinsam digitalisieren",
      },
      carpass: {
        label: "Produktidee?",
        title: "Lassen Sie uns über Ihre Produktidee oder Plattform sprechen.",
        desc: "Lassen Sie uns die technische Architektur und die MVP-Schritte für Ihr SaaS-Projekt planen.",
        cta: "Produktidee besprechen",
      },
      "saas-operasyon-altyapisi": {
        label: "SaaS-Architektur?",
        title: "Lassen Sie uns Ihre SaaS-Architektur gemeinsam planen.",
        desc: "Lassen Sie uns skalierbare, mandantenfähige Cloud-Architekturkomponenten entwerfen.",
        cta: "SaaS-Architektur gemeinsam planen",
      },
      default: {
        label: "Ähnliches System?",
        title: "Lassen Sie uns eine ähnliche Lösung für Ihr Unternehmen besprechen.",
        desc: "Lassen Sie uns den geeigneten Ansatz für Ihre digitalen Anforderungen klären.",
        cta: "Projekt besprechen",
      },
    },
  };

  const activeLang = content[language] || content.tr;
  const c = activeLang[projectSlug] || activeLang.default;

  return (
    <section className="border-t border-line py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <p className="mono-label mb-3">{c.label}</p>
        <h2 className="display text-2xl font-bold text-ink md:text-3xl mb-4">
          {c.title}
        </h2>
        <p className="text-muted mb-8 leading-relaxed">
          {c.desc}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/iletisim"
            className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            {c.cta}
          </Link>
          <Link
            href="/projeler"
            className="rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
          >
            {language === "tr" ? "Tüm Projeler" : language === "de" ? "Alle Projekte" : "All Projects"}
          </Link>
        </div>
      </div>
    </section>
  );
}
