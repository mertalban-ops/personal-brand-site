"use client";

import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

/** Fare hareketine göre hafif 3D tilt uygulayan kart sarmalayıcısı. */
export default function FloatingCard({ children, className = "", maxTilt = 12 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(700px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) translateY(-6px) scale(1.02)`
    );
  };

  const onLeave = () => setTransform("");

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-300 will-change-transform ${className}`}
      style={{ transform, transformStyle: "preserve-3d", touchAction: "pan-y" }}
    >
      {children}
    </div>
  );
}
