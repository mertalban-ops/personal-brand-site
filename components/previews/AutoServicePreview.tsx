"use client";

import { motion } from "framer-motion";
import { Wrench, Check } from "lucide-react";

export default function AutoServicePreview({ reduce }: { reduce: boolean }) {
  if (reduce) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-bg to-accent/5">
        <Wrench className="h-10 w-10 text-accent opacity-50" />
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[280px] w-full items-center justify-center overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-bg to-accent/5 [perspective:1000px]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Main Service Card */}
      <motion.div
        animate={{
          y: [-3, 3, -3],
          rotateX: [4, 8, 4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="card-surface z-10 flex w-56 flex-col rounded-xl border border-line/50 p-4 shadow-2xl"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-md bg-accent/10 p-2">
            <Wrench className="h-4 w-4 text-accent" />
          </div>
          <div>
            <p className="text-[10px] text-muted">İş Emri</p>
            <p className="text-xs font-bold text-ink">#SRV-089</p>
          </div>
        </div>

        {/* Steps */}
        <div className="relative pl-2 space-y-4">
          {/* Vertical Line */}
          <div className="absolute bottom-2 left-[11px] top-2 w-[1px] bg-line/50" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="rounded-full bg-accent p-0.5">
              <Check className="h-2 w-2 text-bg" />
            </div>
            <span className="text-[10px] font-medium text-ink">Araç Kabul Edildi</span>
          </div>

          <motion.div
            className="relative z-10 flex items-center gap-3"
            animate={{ opacity: [0.3, 1, 1], scale: [0.95, 1, 1] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 1] }}
          >
            <div className="rounded-full bg-accent p-0.5">
              <Check className="h-2 w-2 text-bg" />
            </div>
            <span className="text-[10px] font-medium text-ink">Bakım Yapıldı</span>
          </motion.div>

          <motion.div
            className="relative z-10 flex items-center gap-3"
            animate={{ opacity: [0.3, 0.3, 1], scale: [0.95, 0.95, 1] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.5, 1] }}
          >
            <div className="rounded-full bg-emerald-500 p-0.5">
              <Check className="h-2 w-2 text-bg" />
            </div>
            <span className="text-[10px] font-bold text-emerald-500">Teslimata Hazır</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Background decorative cards */}
      <motion.div
        animate={{
          x: [20, -10, 20],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-6 top-6 h-8 w-24 rounded border border-line/30 bg-line/20"
      />
      <motion.div
        animate={{
          x: [-20, 10, -20],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-6 right-6 h-10 w-32 rounded border border-line/30 bg-line/20"
      />
    </div>
  );
}
