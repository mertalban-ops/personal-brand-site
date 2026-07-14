"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  width?: number;
  accentColor?: string;
  successGlow?: boolean;
}

export default function PhoneFrame({
  children,
  width = 168,
  accentColor = "#10b981",
  successGlow = false,
}: PhoneFrameProps) {
  const reduce = useReducedMotion();
  const height = Math.round(width * 2.1);

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        flexShrink: 0,
        filter: successGlow && !reduce
          ? `drop-shadow(0 0 18px ${accentColor}55)`
          : "drop-shadow(0 8px 24px rgba(0,0,0,0.55))",
        transition: "filter 0.6s ease",
      }}
      aria-hidden="true"
    >
      {/* Phone shell */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(160deg, #0d2236 0%, #07121c 100%)",
          borderRadius: width * 0.12,
          border: "1.5px solid rgba(255,255,255,0.10)",
          overflow: "hidden",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3)",
        }}
      >
        {/* Side buttons */}
        <div
          style={{
            position: "absolute",
            right: -2,
            top: "28%",
            width: 3,
            height: 28,
            background: "rgba(255,255,255,0.08)",
            borderRadius: "0 2px 2px 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -2,
            top: "22%",
            width: 3,
            height: 20,
            background: "rgba(255,255,255,0.06)",
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -2,
            top: "30%",
            width: 3,
            height: 20,
            background: "rgba(255,255,255,0.06)",
            borderRadius: "2px 0 0 2px",
          }}
        />

        {/* Screen area */}
        <div
          style={{
            position: "absolute",
            top: width * 0.07,
            left: width * 0.04,
            right: width * 0.04,
            bottom: width * 0.07,
            background: "#040c14",
            borderRadius: width * 0.08,
            overflow: "hidden",
          }}
        >
          {/* Notch */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "35%",
              height: 10,
              background: "#07121c",
              borderRadius: "0 0 8px 8px",
              zIndex: 10,
            }}
          />

          {/* Status bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 10px",
              zIndex: 9,
              background: "rgba(4,12,20,0.8)",
            }}
          >
            <span
              style={{
                color: "#9baebd",
                fontSize: "0.44rem",
                fontFamily: "monospace",
                fontWeight: 600,
              }}
            >
              9:41
            </span>
            <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
              {[3, 2, 1].map((h) => (
                <div
                  key={h}
                  style={{
                    width: 3,
                    height: h * 2 + 2,
                    background: accentColor,
                    borderRadius: 1,
                    opacity: 0.7,
                  }}
                />
              ))}
              <div
                style={{
                  width: 12,
                  height: 6,
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 2,
                  marginLeft: 3,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 1,
                    background: accentColor,
                    borderRadius: 1,
                    width: "70%",
                  }}
                />
              </div>
            </div>
          </div>

          {/* App content — starts below status bar */}
          <div style={{ position: "absolute", inset: 0, top: 18 }}>
            {children}
          </div>
        </div>

        {/* Home indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 6,
            left: "50%",
            transform: "translateX(-50%)",
            width: "30%",
            height: 3,
            background: "rgba(255,255,255,0.12)",
            borderRadius: 2,
          }}
        />

        {/* Success glow overlay */}
        {successGlow && !reduce && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.18, 0] }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at 50% 60%, ${accentColor}44 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </div>
  );
}
