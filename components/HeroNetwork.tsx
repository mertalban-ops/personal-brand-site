"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Package, Wallet, ShoppingCart, TrendingUp, BarChart3, Zap } from "lucide-react";

const C = {
  accent: "#10b981",
  blue: "#38bdf8",
  amber: "#f59e0b",
  ink: "#eef2f6",
  faint: "#4b667e",
};

const NODES = [
  { id: "stok",   label: "Stok",     Icon: Package,      cx: 50, cy: 7,  color: C.accent, dur: "1.8s", floatDur: 2.8 },
  { id: "cari",   label: "Cari",     Icon: Wallet,       cx: 85, cy: 34, color: C.blue,   dur: "2.3s", floatDur: 3.1 },
  { id: "satis",  label: "Satış",    Icon: ShoppingCart, cx: 73, cy: 80, color: C.amber,  dur: "1.6s", floatDur: 2.5 },
  { id: "tahsil", label: "Tahsilat", Icon: TrendingUp,   cx: 27, cy: 80, color: C.accent, dur: "2.0s", floatDur: 3.0 },
  { id: "rapor",  label: "Rapor",    Icon: BarChart3,    cx: 15, cy: 34, color: C.blue,   dur: "1.5s", floatDur: 2.6 },
];
const CORE = { cx: 50, cy: 46 };

export default function HeroNetwork() {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative h-full w-full rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(7,18,28,0.98) 0%, rgba(11,31,51,0.92) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="bg-grid absolute inset-0 opacity-[0.12]" />

      <div
        className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-[0.12] blur-[60px]"
        style={{ background: C.blue }}
      />
      <div
        className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full opacity-[0.08] blur-[50px]"
        style={{ background: C.accent }}
      />

      {/* SVG connection lines */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        {NODES.map((n) => (
          <g key={n.id}>
            <line
              x1={CORE.cx} y1={CORE.cy} x2={n.cx} y2={n.cy}
              stroke={n.color} strokeWidth="0.25" strokeOpacity="0.15"
            />
            <line
              x1={CORE.cx} y1={CORE.cy} x2={n.cx} y2={n.cy}
              stroke={n.color} strokeWidth="0.4" strokeOpacity="0.7"
              strokeDasharray="2 5" strokeLinecap="round"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0" to="-14"
                dur={n.dur} repeatCount="indefinite"
              />
            </line>
            <circle r="0.7" fill={n.color} fillOpacity="0.9">
              <animateMotion
                dur={n.dur} repeatCount="indefinite"
                path={`M ${CORE.cx} ${CORE.cy} L ${n.cx} ${n.cy}`}
              />
            </circle>
          </g>
        ))}

        <circle cx={CORE.cx} cy={CORE.cy} r="3.5" fill="none"
          stroke={C.accent} strokeWidth="0.4" strokeOpacity="0">
          <animate attributeName="r" values="3.5;9;3.5" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx={CORE.cx} cy={CORE.cy} r="3.5" fill="none"
          stroke={C.accent} strokeWidth="0.3" strokeOpacity="0">
          <animate attributeName="r" values="3.5;7;3.5" dur="2.8s" begin="1.4s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2.8s" begin="1.4s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Center core node */}
      <motion.div
        className="absolute"
        style={{ left: `${CORE.cx}%`, top: `${CORE.cy}%`, transform: "translate(-50%,-50%)" }}
        animate={reduce ? undefined : { y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <div
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.45)",
              boxShadow: "0 0 24px rgba(16,185,129,0.2), 0 0 60px rgba(16,185,129,0.07)",
              borderRadius: 12,
              padding: "9px 14px",
              textAlign: "center",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
              <Zap size={15} color={C.accent} />
            </div>
            <p style={{
              color: C.accent, fontSize: "0.58rem", fontFamily: "monospace",
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap",
            }}>
              Operasyon Merkezi
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Outer nodes */}
      {NODES.map((n, i) => (
        <div
          key={n.id}
          className="absolute"
          style={{ left: `${n.cx}%`, top: `${n.cy}%`, transform: "translate(-50%,-50%)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 + 0.08 * i, ease: "easeOut" }}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: n.floatDur, ease: "easeInOut" }}
            >
              <div
                style={{
                  background: `${n.color}12`,
                  border: `1px solid ${n.color}35`,
                  borderRadius: 8,
                  padding: "6px 9px",
                  textAlign: "center",
                  backdropFilter: "blur(8px)",
                  minWidth: 56,
                }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>
                  <n.Icon size={11} color={n.color} />
                </div>
                <p style={{ color: C.ink, fontSize: "0.54rem", fontWeight: 600, whiteSpace: "nowrap" }}>
                  {n.label}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
