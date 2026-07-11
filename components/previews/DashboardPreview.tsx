"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, TrendingUp, Bell } from "lucide-react";

export default function DashboardPreview({ reduce }: { reduce: boolean }) {
  if (reduce) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-bg to-accent/5">
        <LayoutDashboard className="h-10 w-10 text-accent opacity-50" />
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[280px] w-full items-center justify-center overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-bg to-accent/5 [perspective:1000px]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Main Graph Card */}
      <motion.div
        animate={{
          y: [-4, 4, -4],
          rotateX: [5, 10, 5],
          rotateY: [-5, -10, -5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="card-surface z-10 flex h-48 w-64 flex-col justify-between rounded-xl border border-line/50 p-4 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted">Aylık Gelir (MRR)</p>
            <p className="text-sm font-bold text-ink">₺42.500</p>
          </div>
          <div className="rounded bg-emerald-500/10 px-2 py-1">
            <span className="flex items-center text-[10px] font-bold text-emerald-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +%12
            </span>
          </div>
        </div>

        {/* Animated Bar Chart */}
        <div className="mt-4 flex h-24 items-end justify-between gap-2">
          {[40, 50, 30, 60, 80, 100].map((height, i) => (
            <motion.div
              key={i}
              className="w-full rounded-t-sm bg-accent/20"
              initial={{ height: "10%" }}
              animate={{ height: `${height}%` }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.1,
              }}
            >
              <div className="h-full w-full rounded-t-sm bg-accent" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating Notification */}
      <motion.div
        animate={{
          y: [20, -20, 20],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="card-surface absolute right-4 top-8 z-20 flex items-center gap-3 rounded-lg border border-line/50 p-3 shadow-xl"
      >
        <div className="relative">
          <Bell className="h-4 w-4 text-accent" />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-emerald-500" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-ink">Yeni Abone</p>
          <p className="text-[10px] text-muted">Pro Plan (Yıllık)</p>
        </div>
      </motion.div>
    </div>
  );
}
