"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Package, Wallet, ShoppingCart, TrendingUp, BarChart3, Zap } from "lucide-react";

const tok = {
  ink: "#eef2f6",
  muted: "#9baebd",
  faint: "#4b667e",
  accent: "#10b981",
  blue: "#38bdf8",
  amber: "#f59e0b",
  border: "rgba(255,255,255,0.07)",
};

const NODES = [
  { id: "stok",   label: "Stok Takip",   Icon: Package,      cx: 50, cy: 11, color: tok.accent, dur: "1.8s", floatDur: 2.8 },
  { id: "cari",   label: "Cari Hesap",   Icon: Wallet,       cx: 84, cy: 37, color: tok.blue,   dur: "2.3s", floatDur: 3.1 },
  { id: "satis",  label: "Satış",        Icon: ShoppingCart, cx: 72, cy: 79, color: tok.amber,  dur: "1.6s", floatDur: 2.5 },
  { id: "tahsil", label: "Tahsilat",     Icon: TrendingUp,   cx: 28, cy: 79, color: tok.accent, dur: "2.0s", floatDur: 3.0 },
  { id: "rapor",  label: "Raporlama",    Icon: BarChart3,    cx: 16, cy: 37, color: tok.blue,   dur: "1.5s", floatDur: 2.6 },
];
const CORE = { cx: 50, cy: 46 };

function NodeCard({
  label, Icon, cx, cy, color, floatDur, i,
}: (typeof NODES)[0] & { i: number }) {
  return (
    <div
      className="absolute"
      style={{ left: `${cx}%`, top: `${cy}%`, transform: "translate(-50%,-50%)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.08 * i, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: floatDur, ease: "easeInOut" }}
        >
          <div
            style={{
              background: `${color}12`,
              border: `1px solid ${color}35`,
              borderRadius: 10,
              padding: "7px 11px",
              textAlign: "center",
              minWidth: 78,
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
              <Icon size={13} color={color} />
            </div>
            <p style={{ color: tok.ink, fontSize: "0.58rem", fontWeight: 600, whiteSpace: "nowrap" }}>
              {label}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SystemNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 80, damping: 22 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 80, damping: 22 });

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[500px] w-[700px] rounded-full opacity-[0.05] blur-[130px]"
        style={{ background: tok.accent }}
      />

      <div className="mx-auto max-w-5xl px-5">
        <motion.p
          className="mono-label mb-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Dijital Operasyon · Bağlı Sistem Mimarisi
        </motion.p>
        <motion.h2
          className="display text-center text-3xl font-bold text-ink md:text-4xl mb-10"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.07 }}
        >
          Tüm modüller{" "}
          <span style={{ color: tok.accent }}>birbirine bağlı.</span>
        </motion.h2>

        {/* 3D tilt wrapper */}
        <div
          ref={containerRef}
          style={{ perspective: 1200 }}
          onMouseMove={(e) => {
            const r = containerRef.current?.getBoundingClientRect();
            if (!r) return;
            mx.set((e.clientX - r.left) / r.width - 0.5);
            my.set((e.clientY - r.top) / r.height - 0.5);
          }}
          onMouseLeave={() => { mx.set(0); my.set(0); }}
        >
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" as const }}
          >
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden"
              style={{
                height: 400,
                background:
                  "linear-gradient(145deg, rgba(7,18,28,0.98) 0%, rgba(11,31,51,0.92) 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Subtle grid */}
              <div className="bg-grid absolute inset-0 opacity-[0.12]" />

              {/* Corner accent glows */}
              <div
                className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-[0.08] blur-[60px]"
                style={{ background: tok.blue }}
              />
              <div
                className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-[0.06] blur-[50px]"
                style={{ background: tok.accent }}
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
                    {/* Dim base line */}
                    <line
                      x1={CORE.cx} y1={CORE.cy} x2={n.cx} y2={n.cy}
                      stroke={n.color} strokeWidth="0.22" strokeOpacity="0.15"
                    />
                    {/* Animated flowing dashes */}
                    <line
                      x1={CORE.cx} y1={CORE.cy} x2={n.cx} y2={n.cy}
                      stroke={n.color} strokeWidth="0.38" strokeOpacity="0.7"
                      strokeDasharray="2 5" strokeLinecap="round"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0" to="-14"
                        dur={n.dur}
                        repeatCount="indefinite"
                      />
                    </line>
                    {/* Traveling dot */}
                    <circle r="0.7" fill={n.color} fillOpacity="0.9">
                      <animateMotion
                        dur={n.dur}
                        repeatCount="indefinite"
                        path={`M ${CORE.cx} ${CORE.cy} L ${n.cx} ${n.cy}`}
                      />
                    </circle>
                  </g>
                ))}

                {/* Core pulse rings */}
                <circle cx={CORE.cx} cy={CORE.cy} r="3.5" fill="none"
                  stroke={tok.accent} strokeWidth="0.4" strokeOpacity="0">
                  <animate attributeName="r" values="3.5;9;3.5" dur="2.8s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.8s" repeatCount="indefinite" />
                </circle>
                <circle cx={CORE.cx} cy={CORE.cy} r="3.5" fill="none"
                  stroke={tok.accent} strokeWidth="0.3" strokeOpacity="0">
                  <animate attributeName="r" values="3.5;7;3.5" dur="2.8s" begin="1.4s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2.8s" begin="1.4s" repeatCount="indefinite" />
                </circle>
              </svg>

              {/* Center core node */}
              <motion.div
                className="absolute"
                style={{ left: `${CORE.cx}%`, top: `${CORE.cy}%`, transform: "translate(-50%,-50%)" }}
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div
                    style={{
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.45)",
                      boxShadow:
                        "0 0 24px rgba(16,185,129,0.2), 0 0 60px rgba(16,185,129,0.07)",
                      borderRadius: 14,
                      padding: "11px 18px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 5 }}>
                      <Zap size={18} color={tok.accent} />
                    </div>
                    <p
                      style={{
                        color: tok.accent,
                        fontSize: "0.62rem",
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      Operasyon Merkezi
                    </p>
                    <p style={{ color: tok.faint, fontSize: "0.52rem", marginTop: 2 }}>
                      SOLVARIA CORE
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Outer nodes */}
              {NODES.map((n, i) => (
                <NodeCard key={n.id} {...n} i={i} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
