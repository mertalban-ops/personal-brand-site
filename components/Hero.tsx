"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Boxes, Wallet, FileText, TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function Sparkline({ color = "var(--accent)" }: { color?: string }) {
  return (
    <svg viewBox="0 0 120 36" className="h-8 w-full" preserveAspectRatio="none">
      <path
        d="M0 30 L14 26 L28 28 L42 20 L56 22 L70 14 L84 17 L98 9 L120 4"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Bars() {
  const heights = [40, 65, 50, 80, 60, 92];
  return (
    <div className="flex h-9 items-end gap-1.5">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-2.5 rounded-sm bg-blue/60"
          style={{ height: `${h}%`, opacity: 0.4 + i * 0.1 }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  // Duruşta bile eğik duran 3D sahne; fare hareketi eğimi değiştirir
  const rotX = useTransform(sy, [-0.5, 0.5], [16, 4]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-18, -4]);

  // Scroll'da hero derinliğe katlanır: sahne öne devrilir, metin parallax yapar
  const { scrollYProgress: hp } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const foldRX = useTransform(hp, [0, 1], [0, 28]);
  const rotXTotal = useTransform([rotX, foldRX], (v) => (v[0] as number) + (v[1] as number));
  const stageScrollY = useTransform(hp, [0, 1], [0, -150]);
  const textY = useTransform(hp, [0, 1], [0, -90]);
  const textOpacity = useTransform(hp, [0, 0.85], [1, 0.25]);

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

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
      {/* Arka plan: ızgara + iki yumuşak glow */}
      <div className="bg-grid absolute inset-0 -z-10" />
      <div
        className="absolute -top-40 left-1/4 -z-10 h-[480px] w-[480px] rounded-full opacity-[0.2] blur-[130px]"
        style={{ background: "var(--accent)" }}
      />
      <div
        className="absolute top-20 right-0 -z-10 h-[420px] w-[420px] rounded-full opacity-[0.17] blur-[140px]"
        style={{ background: "var(--blue)" }}
      />

      <div
        className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr]"
        onMouseMove={onMove}
      >
        {/* Sol: mesaj — scroll'da parallax */}
        <motion.div style={reduce ? undefined : { y: textY, opacity: textOpacity }}>
          <motion.p className="mono-label mb-5" {...enter(0.05)}>
            {t.hero.kicker}
          </motion.p>
          <motion.h1
            className="display text-balance text-4xl font-bold leading-[1.06] text-ink sm:text-5xl lg:text-[3.4rem]"
            {...enter(0.15)}
          >
            {t.hero.title1}<span className="text-accent">{t.hero.titleHighlight}</span>{t.hero.title2}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
            {...enter(0.3)}
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap gap-4" {...enter(0.45)}>
            <a
              href="#iletisim"
              className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-[#000000] transition-transform hover:-translate-y-0.5"
            >
              {t.hero.primaryBtn}
            </a>
            <a
              href="#hizmetler"
              className="rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              {t.hero.secondaryBtn}
            </a>
          </motion.div>
        </motion.div>

        {/* Sağ: 3D floating dashboard kartları — mobilde küçültülmüş görünür */}
        <motion.div
          ref={stageRef}
          className="relative mt-2 h-[320px] sm:mt-0 sm:h-[420px]"
          style={{ perspective: 1100 }}
          {...enter(0.35)}
        >
          <motion.div
            className="relative h-full w-full"
            style={
              reduce
                ? undefined
                : {
                    rotateX: rotXTotal,
                    rotateY: rotY,
                    y: stageScrollY,
                    transformStyle: "preserve-3d",
                  }
            }
          >
            {/* Stok kartı */}
            <motion.div
              className="card-surface absolute left-0 top-6 w-40 rounded-xl p-3 sm:w-56 sm:p-4"
              style={{ transform: "translateZ(60px)" }}
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="mb-3 flex items-center gap-2">
                <Boxes className="h-4 w-4 text-accent" />
                <span className="mono-label" style={{ fontSize: "0.62rem" }}>
                  {t.hero.cards.stock}
                </span>
              </div>
              <p className="display text-2xl font-bold text-ink">1.248</p>
              <p className="text-xs text-faint" style={{ color: "var(--faint)" }}>
                {t.hero.cards.stockDesc}
              </p>
              <div className="mt-3">
                <Sparkline />
              </div>
            </motion.div>

            {/* Cari kartı */}
            <motion.div
              className="card-surface absolute right-0 top-0 w-44 rounded-xl p-3 sm:w-60 sm:p-4"
              style={{ transform: "translateZ(30px)" }}
              animate={reduce ? undefined : { y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="mb-3 flex items-center gap-2">
                <Wallet className="h-4 w-4 text-blue" />
                <span className="mono-label" style={{ fontSize: "0.62rem", color: "var(--blue)" }}>
                  {t.hero.cards.finance}
                </span>
              </div>
              <p className="display text-2xl font-bold text-ink">₺284.500</p>
              <p className="text-xs" style={{ color: "var(--faint)" }}>
                {t.hero.cards.financeDesc}
              </p>
              <div className="mt-3">
                <Bars />
              </div>
            </motion.div>

            {/* Tahsilat kartı */}
            <motion.div
              className="card-surface absolute bottom-14 left-3 w-44 rounded-xl p-3 sm:bottom-16 sm:left-10 sm:w-60 sm:p-4"
              style={{ transform: "translateZ(90px)" }}
              animate={reduce ? undefined : { y: [0, -14, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="mono-label" style={{ fontSize: "0.62rem" }}>
                  {t.hero.cards.collection}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="display text-2xl font-bold text-ink">₺96.200</p>
                  <p className="text-xs" style={{ color: "var(--faint)" }}>
                    {t.hero.cards.collectionDesc}
                  </p>
                </div>
                <span className="rounded-md bg-accent/15 px-2 py-1 text-xs font-semibold text-accent">
                  +%18
                </span>
              </div>
            </motion.div>

            {/* Rapor kartı */}
            <motion.div
              className="card-surface absolute bottom-0 right-2 w-36 rounded-xl p-3 sm:right-6 sm:w-52 sm:p-4"
              style={{ transform: "translateZ(45px)" }}
              animate={reduce ? undefined : { y: [0, 9, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <div className="mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue" />
                <span className="mono-label" style={{ fontSize: "0.62rem", color: "var(--blue)" }}>
                  {t.hero.cards.report}
                </span>
              </div>
              <p className="text-sm font-medium text-ink">{t.hero.cards.reportTitle}</p>
              <p className="text-xs" style={{ color: "var(--faint)" }}>
                {t.hero.cards.reportDesc}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
