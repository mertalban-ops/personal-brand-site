"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
} from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import dynamic from "next/dynamic";

const SplineScene = dynamic(() => import("@/components/ui/splite").then((m) => m.SplineScene), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="h-8 w-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
      />
    </div>
  ),
});

export default function Hero() {
  const { t, language } = useLanguage();
  const reduce = useReducedMotion();
  const sectionRef    = useRef<HTMLElement>(null);
  const robotColRef   = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress: hp } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(hp, [0, 1], [0, -90]);
  const textOpacity = useTransform(hp, [0, 0.85], [1, 0.25]);

  // Mouse parallax for phone overlay
  const hoverX = useMotionValue(0);
  const hoverY = useMotionValue(0);

  const onRobotMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    isHoveringRef.current = true;
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    hoverX.set(e.clientX - r.left  - r.width  / 2);
    hoverY.set(e.clientY - r.top   - r.height / 2);
  };
  const onRobotMouseLeave = () => {
    isHoveringRef.current = false;
    hoverX.set(0);
    hoverY.set(0);
  };

  // Gaze simulation — make Spline robot look at phone when user is not hovering
  useEffect(() => {
    if (reduce || isMobile) return;
    const interval = setInterval(() => {
      if (isHoveringRef.current) return;
      const col = robotColRef.current;
      if (!col) return;
      const canvas = col.querySelector("canvas");
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      // Phone is at left-5 corner, ~70% from top → robot looks down-left at phone
      canvas.dispatchEvent(
        new MouseEvent("mousemove", {
          bubbles: true,
          cancelable: true,
          clientX: r.left + r.width  * 0.18,
          clientY: r.top  + r.height * 0.70,
        })
      );
    }, 3500);
    return () => clearInterval(interval);
  }, [reduce, isMobile]);

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <div className="bg-grid absolute inset-0 -z-10" />
      <div
        className="absolute -top-40 left-1/4 -z-10 h-[480px] w-[480px] rounded-full opacity-[0.2] blur-[130px]"
        style={{ background: "var(--accent)" }}
      />
      <div
        className="absolute top-20 right-0 -z-10 h-[420px] w-[420px] rounded-full opacity-[0.17] blur-[140px]"
        style={{ background: "var(--blue)" }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-[1fr_1fr]">
        {/* Sol: mesaj */}
        <motion.div style={reduce ? undefined : { y: textY, opacity: textOpacity }}>
          <motion.p className="mono-label mb-5" {...enter(0.05)}>
            {t.hero.kicker}
          </motion.p>
          <motion.h1
            className="display text-balance text-4xl font-bold leading-[1.06] text-ink sm:text-5xl lg:text-[3.4rem]"
            {...enter(0.15)}
          >
            {t.hero.title1}
            <span className="text-accent">{t.hero.titleHighlight}</span>
            {t.hero.title2}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
            {...enter(0.3)}
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap gap-4" {...enter(0.45)}>
            <Link
              href="/iletisim"
              className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-[#000000] transition-transform hover:-translate-y-0.5"
            >
              {t.hero.primaryBtn}
            </Link>
            <Link
              href="/projeler"
              className="rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              {t.hero.secondaryBtn}
            </Link>
          </motion.div>
        </motion.div>

        {/* Sağ: 3D robot + phone showcase */}
        <motion.div
          ref={robotColRef}
          className="relative h-[340px] sm:h-[480px] lg:h-[560px]"
          onMouseMove={onRobotMouseMove}
          onMouseLeave={onRobotMouseLeave}
          {...enter(0.3)}
        >
          {isMobile ? (
            <div className="w-full h-full flex items-center justify-center relative bg-bg-raised/20 rounded-2xl border border-line/50 overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-[0.08]" />
              <div className="text-center p-6 z-10">
                <div className="relative inline-block mb-4">
                  <div className="h-16 w-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto animate-pulse">
                    <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-ink font-semibold text-base mb-1">
                  {language === "tr" ? "Güvenli B2B Dijital Çözümler" : language === "de" ? "Sichere B2B-Digitallösungen" : "Secure B2B Digital Solutions"}
                </h3>
                <p className="text-muted text-xs max-w-xs mx-auto">
                  {language === "tr"
                    ? "Solvaria ile iş süreçlerinizi otomatikleştirin ve ölçeklenebilir altyapılar kurun."
                    : language === "de"
                    ? "Automatisieren Sie Ihre Geschäftsprozesse und bauen Sie skalierbare Infrastrukturen mit Solvaria auf."
                    : "Automate your business processes and build scalable infrastructures with Solvaria."}
                </p>
              </div>
            </div>
          ) : (
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="h-full w-full"
            />
          )}

          {/* Subtle Solvaria color grading — blends canvas tones toward brand palette */}
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(145deg, rgba(16,185,129,0.05) 0%, transparent 45%, rgba(56,189,248,0.04) 100%)",
            }}
          />

        </motion.div>
      </div>
    </section>
  );
}
