"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import PhoneFrame from "./PhoneFrame";
import { useActiveProject, type RobotProjectType } from "@/context/ActiveProjectContext";

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

// Per-project accent color from Solvaria design tokens
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

export default function RobotPhoneShowcase() {
  const reduce = useReducedMotion();
  const { activeType } = useActiveProject();

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

  // Start the per-project timer sequence
  const startProjectCycle = useCallback(
    (type: RobotProjectType) => {
      if (reduce) return;
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
    [reduce, activeType, clearTimers],
  );

  // External override from project card hover
  useEffect(() => {
    if (!activeType) return;
    if (activeType === currentType) return;
    clearTimers();
    setRobotState("switching-app");
    setShowLabel(true);
    const t = setTimeout(() => {
      setCurrentType(activeType);
      setShowLabel(false);
      setRobotState("checking-phone");
    }, 400);
    return () => clearTimeout(t);
  }, [activeType, currentType, clearTimers]);

  // Re-start cycle when type changes or external hover ends
  useEffect(() => {
    startProjectCycle(currentType);
    return clearTimers;
  }, [currentType, startProjectCycle, clearTimers]);

  // Resume auto-rotation when user stops hovering project cards
  useEffect(() => {
    if (activeType === null) startProjectCycle(currentType);
  }, [activeType, currentType, startProjectCycle]);

  const accent = ACCENT[currentType];

  return (
    <div className="relative select-none" aria-hidden="true">
      <PhoneFrame width={188} accentColor={accent} successGlow={successGlow}>
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
