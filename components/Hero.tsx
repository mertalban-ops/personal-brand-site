"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SplineScene } from "@/components/ui/splite";

export default function Hero() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const sectionRef    = useRef<HTMLElement>(null);
  const robotColRef   = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  const { scrollYProgress: hp } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(hp, [0, 1], [0, -90]);
  const textOpacity = useTransform(hp, [0, 0.85], [1, 0.25]);

  // Mouse parallax for phone overlay
  const hoverX = useMotionValue(0);
  const hoverY = useMotionValue(0);
  const spring  = { stiffness: 90, damping: 22 };
  const tiltX   = useSpring(useTransform(hoverY, [-240, 240], [5, -5]),  spring);
  const tiltY   = useSpring(useTransform(hoverX, [-240, 240], [-5, 5]), spring);

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
    if (reduce) return;
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
  }, [reduce]);

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
            <a
              href="/iletisim"
              className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-[#000000] transition-transform hover:-translate-y-0.5"
            >
              {t.hero.primaryBtn}
            </a>
            <a
              href="/projeler"
              className="rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              {t.hero.secondaryBtn}
            </a>
          </motion.div>
          <motion.p className="mt-6 text-xs text-faint" {...enter(0.6)}>
            İşletmeye özel sistemler · Mobil uyumlu paneller · Ölçülebilir süreçler · Geliştirilebilir altyapı
          </motion.p>
        </motion.div>

        {/* Sağ: 3D robot + phone showcase */}
        <motion.div
          ref={robotColRef}
          className="relative h-[340px] sm:h-[480px] lg:h-[560px]"
          onMouseMove={onRobotMouseMove}
          onMouseLeave={onRobotMouseLeave}
          {...enter(0.3)}
        >
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="h-full w-full"
          />

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
