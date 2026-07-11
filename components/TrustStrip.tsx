"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Settings, Smartphone, BarChart3, Layers, LayoutTemplate } from "lucide-react";
import { useReducedMotion, motion } from "framer-motion";

export default function TrustStrip() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  // Sabit güven şeridi maddeleri
  const items = [
    { text: "İşletmeye Özel Sistem", icon: Settings },
    { text: "Mobil Uyumlu Panel", icon: Smartphone },
    { text: "Raporlanabilir Süreçler", icon: BarChart3 },
    { text: "Geliştirilebilir Altyapı", icon: Layers },
    { text: "Sade Arayüz", icon: LayoutTemplate },
  ];

  return (
    <section className="relative z-10 border-y border-line bg-bg/80 py-4 backdrop-blur-md sm:py-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-5 sm:justify-between sm:gap-4 md:px-8">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              <Icon className="h-4 w-4 text-accent/80" />
              <span>{item.text}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
