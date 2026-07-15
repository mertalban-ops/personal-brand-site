"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  return (
    <AnimatedSection id="sss">
      <div className="mx-auto max-w-4xl px-5 py-20 md:py-28">
        <div className="text-center mb-12">
          <p className="mono-label mb-3">{t.faq.label}</p>
          <h2 className="display text-3xl font-bold text-ink md:text-4xl">
            {t.faq.title}
          </h2>
          <p className="mt-4 text-muted mx-auto max-w-lg">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {t.faq.items.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className={`card-surface rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-accent/40 bg-accent/5 shadow-[0_0_20px_-10px_rgba(16,185,129,0.2)]"
                    : "border-line bg-bg-raised/30 hover:border-accent/20"
                }`}
              >
                <button
                  className="flex w-full items-center justify-between p-5 text-left md:p-6"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="font-semibold text-ink md:text-lg">{faq.q}</span>
                  <span
                    className={`ml-4 flex-shrink-0 text-accent transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-muted md:px-6 md:pb-6 leading-relaxed text-sm">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
