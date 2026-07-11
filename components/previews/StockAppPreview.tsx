"use client";

import { motion } from "framer-motion";
import { Package, Banknote, FileText } from "lucide-react";

export default function StockAppPreview({ reduce }: { reduce: boolean }) {
  if (reduce) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-bg to-accent/5">
        <Package className="h-10 w-10 text-accent opacity-50" />
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[280px] w-full items-center justify-center overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-bg to-accent/5 [perspective:1000px]">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Main Dashboard Card */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotateX: [8, 12, 8],
          rotateY: [-8, -12, -8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="card-surface z-10 flex h-44 w-60 flex-col rounded-xl border border-line/50 p-4 shadow-2xl"
      >
        <div className="mb-4 h-2 w-1/3 rounded-full bg-line" />
        <div className="space-y-3">
          <div className="h-10 w-full rounded-md bg-accent/10 border border-accent/20" />
          <div className="flex gap-2">
            <div className="h-14 w-1/2 rounded-md bg-line/50" />
            <div className="h-14 w-1/2 rounded-md bg-line/50" />
          </div>
        </div>
      </motion.div>

      {/* Floating Stock Card */}
      <motion.div
        animate={{
          y: [20, -15, 20],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="card-surface absolute left-4 top-8 z-20 flex items-center gap-2 rounded-lg border border-line/50 p-2 shadow-xl"
      >
        <div className="rounded-md bg-accent/20 p-1.5">
          <Package className="h-4 w-4 text-accent" />
        </div>
        <div>
          <p className="text-[10px] leading-none text-muted">Stok Eklendi</p>
          <p className="mt-1 text-xs font-bold leading-none text-ink">+124</p>
        </div>
      </motion.div>

      {/* Floating Payment Card */}
      <motion.div
        animate={{
          y: [10, -20, 10],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 4.5,
          delay: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="card-surface absolute bottom-8 right-4 z-20 flex items-center gap-2 rounded-lg border border-emerald-500/30 p-2 shadow-xl"
      >
        <div className="rounded-md bg-emerald-500/20 p-1.5">
          <Banknote className="h-4 w-4 text-emerald-500" />
        </div>
        <div>
          <p className="text-[10px] leading-none text-muted">Tahsilat</p>
          <p className="mt-1 text-xs font-bold leading-none text-emerald-500">Alındı</p>
        </div>
      </motion.div>

      {/* PDF Report Slide In */}
      <motion.div
        animate={{
          x: [40, 0, 40],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 5,
          delay: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="card-surface absolute -right-2 top-1/2 z-0 flex -translate-y-1/2 items-center gap-2 rounded-l-lg border border-line/50 p-2 shadow-lg"
      >
        <FileText className="h-4 w-4 text-accent" />
        <span className="text-[10px] font-medium text-ink">PDF Ekstre</span>
      </motion.div>
    </div>
  );
}
