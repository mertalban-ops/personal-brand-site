"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Search, CheckCircle2 } from "lucide-react";

export default function CarpassPreview({ reduce }: { reduce: boolean }) {
  if (reduce) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-bg to-accent/5">
        <ShieldCheck className="h-10 w-10 text-emerald-500 opacity-50" />
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[280px] w-full items-center justify-center overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-bg to-accent/5 [perspective:1000px]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Main Car/Risk Card */}
      <motion.div
        animate={{
          y: [-5, 5, -5],
          rotateX: [6, 10, 6],
          rotateY: [4, 8, 4],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="card-surface z-10 flex h-44 w-56 flex-col items-center justify-center rounded-xl border border-line/50 p-4 shadow-2xl"
      >
        <div className="mb-2 rounded-full bg-accent/10 p-3">
          <Search className="h-6 w-6 text-accent" />
        </div>
        <p className="mb-1 font-mono text-xs text-muted">TR-34-CAR-PASS</p>
        <div className="mt-2 flex w-full items-center justify-between rounded-lg border border-line/50 bg-bg/50 p-2">
          <span className="text-[10px] text-muted">Güven Skoru</span>
          <motion.span
            animate={{ color: ["#64748b", "#10b981", "#64748b"] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-xs font-bold"
          >
            %98
          </motion.span>
        </div>
      </motion.div>

      {/* Timeline entries floating past */}
      <motion.div
        animate={{
          y: [40, -40],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="card-surface absolute left-6 z-0 flex w-28 flex-col gap-2 rounded-lg border border-line/30 p-2 opacity-50"
      >
        <div className="h-1.5 w-1/2 rounded bg-line" />
        <div className="h-1.5 w-3/4 rounded bg-line" />
        <div className="h-1.5 w-full rounded bg-line" />
      </motion.div>

      {/* Trust Badge */}
      <motion.div
        animate={{
          scale: [0.8, 1.1, 0.8],
          rotate: [-10, 10, -10],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-6 right-8 z-20"
      >
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
        </div>
      </motion.div>
    </div>
  );
}
