"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import PhoneFrame from "./PhoneFrame";
import { useActiveProject, type RobotProjectType } from "@/context/ActiveProjectContext";

function useIsVisible(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function usePageVisible() {
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const handler = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);
  return pageVisible;
}

const ProjectDemoVideo = dynamic(() => import("@/components/ProjectDemoVideo"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100%", background: "#040c14" }} />,
});

type RobotState =
  | "idle"
  | "checking-phone"
  | "reviewing-app"
  | "positive-reaction"
  | "switching-app";

const ROTATION: RobotProjectType[] = [
  "stockapp",
  "auto-service",
  "carpass",
  "business-dashboard",
];

// Per-project accent color from Albanexa design tokens
const ACCENT: Record<RobotProjectType, string> = {
  "stockapp":            "#10b981",
  "auto-service":        "#38bdf8",
  "carpass":             "#10b981",
  "business-dashboard":  "#38bdf8",
};

// Label shown on the phone bezel area during switch
const APP_LABEL: Record<RobotProjectType, string> = {
  "stockapp":            "StockApp",
  "auto-service":        "Hezer Auto",
  "carpass":             "CARPASS",
  "business-dashboard":  "SaaS Platform",
};

// Full cycle per project before auto-advance (4 screens × 4.5s each)
const CYCLE_MS = 18_000;
// Success screen is at index 3 → appears at 3 × 4500ms = 13 500ms
const SUCCESS_DELAY_MS = 13_500;
const SUCCESS_GLOW_MS  = 2_200;

export default function RobotPhoneShowcase({ width: phoneW = 188 }: { width?: number }) {
  const reduce = useReducedMotion();
  const { activeType } = useActiveProject();

  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible    = useIsVisible(containerRef);
  const pageVisible  = usePageVisible();
  const active       = isVisible && pageVisible;

  const [currentType, setCurrentType] = useState<RobotProjectType>("stockapp");
  const [robotState, setRobotState]   = useState<RobotState>("checking-phone");
  const [successGlow, setSuccessGlow] = useState(false);
  const [showLabel, setShowLabel]     = useState(false);

  // Timers we need to cancel on type change
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    if (cycleTimerRef.current)   clearTimeout(cycleTimerRef.current);
  }, []);

  const startProjectCycle = useCallback(
    () => {
      if (reduce || !active) return;
      clearTimers();

      // Show success glow when success screen appears
      successTimerRef.current = setTimeout(() => {
        setSuccessGlow(true);
        setRobotState("positive-reaction");
        setTimeout(() => {
          setSuccessGlow(false);
          setRobotState("checking-phone");
        }, SUCCESS_GLOW_MS);
      }, SUCCESS_DELAY_MS);

      // Auto-advance to next project after full cycle
      cycleTimerRef.current = setTimeout(() => {
        if (activeType) return; // user has hovered a card, don't auto-advance
        setRobotState("switching-app");
        setShowLabel(true);
        setTimeout(() => {
          setCurrentType(prev => {
            const idx = ROTATION.indexOf(prev);
            return ROTATION[(idx + 1) % ROTATION.length];
          });
          setShowLabel(false);
          setRobotState("checking-phone");
        }, 600);
      }, CYCLE_MS);
    },
    [reduce, active, activeType, clearTimers],
  );

  useEffect(() => {
    if (!activeType) return;
    if (activeType === currentType) return;
    clearTimers();
    const tStart = setTimeout(() => {
      setRobotState("switching-app");
      setShowLabel(true);
    }, 0);
    const t = setTimeout(() => {
      setCurrentType(activeType);
      setShowLabel(false);
      setRobotState("checking-phone");
    }, 400);
    return () => {
      clearTimeout(tStart);
      clearTimeout(t);
    };
  }, [activeType, currentType, clearTimers]);

  useEffect(() => {
    startProjectCycle();
    return clearTimers;
  }, [startProjectCycle, clearTimers]);

  useEffect(() => {
    if (activeType === null) startProjectCycle();
  }, [activeType, startProjectCycle]);

  const accent = ACCENT[currentType];

  // All dimensions scale proportionally with phoneW
  const SC          = phoneW / 188;
  const glowTop     = -Math.round(56 * SC);
  const fingerW     = Math.max(6,  Math.round(13 * SC));
  const fingerGap   = Math.max(3,  Math.round(5  * SC));
  const palmW       = Math.max(38, Math.round(80 * SC));
  const palmH       = Math.max(7,  Math.round(11 * SC));
  const handBelow   = Math.round(28 * SC);

  return (
    <div ref={containerRef} className="relative select-none" aria-hidden="true">
      {/* Screen-light glow — illuminates robot body above phone */}
      {!reduce && (
        <motion.div
          animate={{
            opacity: successGlow ? 0.5 : 0.09,
            scaleX: successGlow ? 1.35 : 1,
          }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: glowTop,
            left: "50%",
            transform: "translateX(-50%)",
            width: "88%",
            height: 68,
            borderRadius: "50%",
            background: accent,
            filter: "blur(30px)",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
      )}

      <PhoneFrame width={phoneW} accentColor={accent} successGlow={successGlow}>
        {/* App screen area — key forces remount on type change, resetting idx to 0 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentType}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ width: "100%", height: "100%" }}
          >
            <ProjectDemoVideo type={currentType} hideChrome />
          </motion.div>
        </AnimatePresence>

        {/* App-switch transition overlay */}
        <AnimatePresence>
          {showLabel && !reduce && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(4,12,20,0.88)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                zIndex: 20,
              }}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.08 }}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: `2px solid ${accent}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: accent,
                    opacity: 0.85,
                  }}
                />
              </motion.div>
              <span
                style={{
                  color: accent,
                  fontSize: "0.58rem",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {APP_LABEL[activeType ?? currentType]}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </PhoneFrame>

      {/* Emotion particles — rise from phone during positive reaction */}
      <AnimatePresence>
        {robotState === "positive-reaction" && !reduce && (
          <>
            {[
              { dx: -34, icon: "✓", delay: 0 },
              { dx: 14,  icon: "✦", delay: 0.13 },
              { dx: -56, icon: "✦", delay: 0.27 },
              { dx: 38,  icon: "✓", delay: 0.07 },
              { dx: -12, icon: "★", delay: 0.21 },
            ].map(({ dx, icon, delay }, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 8, x: dx }}
                animate={{ opacity: [0, 1, 0], y: -70 }}
                exit={{}}
                transition={{ duration: 1.4, delay, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  top: "22%",
                  left: "50%",
                  fontSize: "0.70rem",
                  fontWeight: 700,
                  color: accent,
                  pointerEvents: "none",
                  zIndex: 30,
                  userSelect: "none",
                }}
              >
                {icon}
              </motion.span>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Robotic hand — 4 fingers + palm holding phone from below (scales with phoneW) */}
      {!reduce && (
        <div
          style={{
            position: "absolute",
            bottom: -handBelow,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <div style={{ display: "flex", gap: fingerGap }}>
            {[20, 26, 26, 20].map((h, i) => (
              <motion.div
                key={i}
                animate={{
                  borderColor: successGlow ? accent : "rgba(56,189,248,0.22)",
                  boxShadow: successGlow ? `0 0 10px ${accent}55` : "none",
                }}
                transition={{ duration: 0.5 }}
                style={{
                  width: fingerW,
                  height: Math.round(h * SC),
                  borderRadius: "3px 3px 0 0",
                  background: "linear-gradient(to bottom, #1e4a6e, #0f2035)",
                  border: "1px solid rgba(56,189,248,0.22)",
                }}
              />
            ))}
          </div>
          <motion.div
            animate={{
              boxShadow: successGlow ? `0 2px 14px ${accent}44` : "none",
              borderColor: successGlow ? `${accent}55` : "rgba(56,189,248,0.15)",
            }}
            transition={{ duration: 0.5 }}
            style={{
              width: palmW,
              height: palmH,
              background: "linear-gradient(to bottom, #1e4a6e, #0f2035)",
              border: "1px solid rgba(56,189,248,0.15)",
              borderTop: "none",
              borderRadius: "0 0 4px 4px",
            }}
          />
        </div>
      )}

      {/* Ambient glow beneath phone */}
      {!reduce && (
        <motion.div
          animate={{
            opacity: successGlow ? 0.55 : 0.22,
            scale:   successGlow ? 1.1 : 1,
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            position: "absolute",
            bottom: -20,
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: 32,
            borderRadius: "50%",
            background: accent,
            filter: "blur(18px)",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
      )}

      {/* Robot state indicator — tiny dot in corner */}
      {!reduce && (
        <motion.div
          animate={{
            background:
              robotState === "positive-reaction"
                ? "#10b981"
                : robotState === "switching-app"
                ? "#f59e0b"
                : "#38bdf8",
            scale: robotState === "positive-reaction" ? [1, 1.4, 1] : 1,
          }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            top: 10,
            right: -6,
            width: 8,
            height: 8,
            borderRadius: "50%",
            border: "1.5px solid rgba(7,18,28,0.9)",
          }}
        />
      )}
    </div>
  );
}
