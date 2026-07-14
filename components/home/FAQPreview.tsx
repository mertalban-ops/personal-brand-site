"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { getHomepageFAQs } from "@/data/faqs";
import Link from "next/link";

export default function FAQPreview() {
  const reduce = useReducedMotion();
  const items = getHomepageFAQs();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <AnimatedSection>
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
        <p className="mono-label mb-3 text-center">Sık Sorulan Sorular</p>
        <h2 className="display text-center text-3xl font-bold text-ink mb-10">
          Merak ettikleriniz
        </h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={item.q} className="card-surface rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-medium text-ink">{item.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="border-t border-line px-5 pb-5 pt-4 text-sm leading-relaxed text-muted"
                >
                  {item.a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Daha fazla soru için{" "}
          <Link href="/iletisim" className="text-accent hover:underline">
            iletişime geçin
          </Link>
        </p>
      </div>
    </AnimatedSection>
  );
}
