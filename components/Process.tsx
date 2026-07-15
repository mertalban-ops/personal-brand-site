"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

export default function Process() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22 });
  const { t } = useLanguage();

  const disableAnim = reduce || isMobile;

  return (
    <AnimatedSection id="surec">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <p className="mono-label mb-3">{t.process.label}</p>
      <h2 className="display max-w-2xl text-3xl font-bold text-ink md:text-4xl">
        {t.process.title}
      </h2>

      <div ref={trackRef} className="relative mt-14 pl-8 md:pl-0">
        {/* Dikey çizgi (mobil) / yatay çizgi (desktop) */}
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-line md:left-0 md:right-0 md:top-[11px] md:bottom-auto md:h-px md:w-auto" />
        {/* İlerleme çizgisi — mobilde dikey, masaüstünde yatay */}
        <motion.div
          className="absolute left-[11px] top-2 w-px origin-top bg-accent md:hidden"
          style={{
            height: "calc(100% - 1rem)",
            scaleY: disableAnim ? 1 : progress,
          }}
        />
        <motion.div
          className="absolute left-0 right-0 top-[11px] hidden h-px origin-left bg-accent md:block"
          style={{ scaleX: disableAnim ? 1 : progress }}
        />

        <div className="grid gap-10 md:grid-cols-4 md:gap-6">
          {t.process.items.map((step, i) => (
            <motion.div
              key={step.step}
              initial={disableAnim ? false : { opacity: 0, y: 24 }}
              animate={disableAnim ? { opacity: 1, y: 0 } : undefined}
              whileInView={disableAnim ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <span className="absolute -left-8 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-accent/50 bg-bg md:static md:mb-5">
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>
              <p className="font-mono text-sm text-accent">{step.step}</p>
              <h3 className="display mt-2 text-lg font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </AnimatedSection>
  );
}
