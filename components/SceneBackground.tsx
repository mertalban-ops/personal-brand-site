"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

function GlassPanel({
  className,
  y,
  rotateX,
  rotateY,
  z,
}: {
  className: string;
  y: MotionValue<number> | number;
  rotateX: MotionValue<number> | number;
  rotateY: MotionValue<number> | number;
  z: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-2xl border border-line/40 bg-white/[0.03] shadow-[0_18px_40px_-20px_rgba(15,42,80,0.15)] ${className}`}
      style={{ y, rotateX, rotateY, translateZ: z, transformStyle: "preserve-3d" }}
    >
      <div className="absolute left-4 top-4 h-1.5 w-1/3 rounded-full bg-accent/20" />
      <div className="absolute left-4 top-8 h-1.5 w-2/3 rounded-full bg-blue/10" />
      <div className="absolute left-4 top-12 h-1.5 w-1/2 rounded-full bg-ink/8" />
    </motion.div>
  );
}

function StaticBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-32 left-[12%] h-[420px] w-[420px] rounded-full opacity-[0.1] blur-[120px]"
        style={{ background: "var(--accent)" }}
      />
      <div
        className="absolute bottom-[-10%] right-[8%] h-[380px] w-[380px] rounded-full opacity-[0.09] blur-[120px]"
        style={{ background: "var(--blue)" }}
      />
    </div>
  );
}

export default function SceneBackground() {
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 55, damping: 20 });

  const gridShift = useTransform(p, [0, 1], [0, 220]);
  const gridRotZ  = useTransform(p, [0, 1], [0, 8]);

  const orbA = useTransform(p, [0, 1], [0, -340]);
  const orbB = useTransform(p, [0, 1], [0, 280]);

  const panel1Y  = useTransform(p, [0, 1], [0, -520]);
  const panel1RX = useTransform(p, [0, 1], [12, -14]);
  const panel1RY = useTransform(p, [0, 1], [-14, 10]);

  const panel2Y  = useTransform(p, [0, 1], [0, -300]);
  const panel2RX = useTransform(p, [0, 1], [-8, 16]);
  const panel2RY = useTransform(p, [0, 1], [12, -12]);

  const panel3Y  = useTransform(p, [0, 1], [0, -700]);
  const panel3RX = useTransform(p, [0, 1], [16, -8]);
  const panel3RY = useTransform(p, [0, 1], [-6, 18]);

  const panel4Y  = useTransform(p, [0, 1], [0, -180]);
  const panel4RX = useTransform(p, [0, 1], [-12, 8]);
  const panel4RY = useTransform(p, [0, 1], [8, -16]);

  if (reduce || isMobile) {
    return <StaticBackground />;
  }

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ perspective: 1400 }}
    >
      <motion.div
        className="absolute -top-32 left-[12%] h-[420px] w-[420px] rounded-full opacity-[0.1] blur-[120px]"
        style={{ background: "var(--accent)", y: orbA }}
      />
      <motion.div
        className="absolute top-[55%] right-[6%] h-[400px] w-[400px] rounded-full opacity-[0.09] blur-[120px]"
        style={{ background: "var(--blue)", y: orbB }}
      />

      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        <motion.div
          className="absolute bottom-[-22%] left-[-30%] h-[75vh] w-[160%] opacity-[0.5]"
          style={{
            rotateX: 63,
            rotateZ: gridRotZ,
            transformOrigin: "center bottom",
            backgroundImage:
              "linear-gradient(var(--line) 1.5px, transparent 1.5px), linear-gradient(90deg, var(--line) 1.5px, transparent 1.5px)",
            backgroundSize: "84px 84px",
            backgroundPositionY: gridShift,
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent 85%)",
          }}
        />

        <GlassPanel
          className="left-[4%] top-[24%] h-24 w-40 md:left-[6%] md:h-36 md:w-56"
          y={panel1Y} rotateX={panel1RX} rotateY={panel1RY} z={-160}
        />
        <GlassPanel
          className="right-[5%] top-[38%] h-20 w-32 md:right-[9%] md:top-[36%] md:h-32 md:w-48"
          y={panel2Y} rotateX={panel2RX} rotateY={panel2RY} z={-320}
        />
        <GlassPanel
          className="left-[44%] top-[62%] h-20 w-32 lg:left-[38%] lg:h-28 lg:w-44"
          y={panel3Y} rotateX={panel3RX} rotateY={panel3RY} z={-90}
        />
        <GlassPanel
          className="right-[22%] top-[80%] h-20 w-32 md:right-[26%] md:top-[78%] md:h-24 md:w-36"
          y={panel4Y} rotateX={panel4RX} rotateY={panel4RY} z={-420}
        />
      </div>
    </div>
  );
}
