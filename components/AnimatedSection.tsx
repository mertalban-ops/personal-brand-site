"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number; // geriye dönük uyumluluk — sürekli scroll modunda kullanılmaz
  id?: string;
};

/**
 * Sürekli scroll'a bağlı 3D bölüm:
 * viewport'a girerken perspektifli dönüşle açılır (rotateX 11° → 0),
 * çıkarken ters yöne katlanır (0 → -7°). Hareket her scroll'da canlıdır,
 * tek seferlik giriş animasyonu değildir.
 */
export default function AnimatedSection({ children, className, id }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 65, damping: 20 });

  const rotateX = useTransform(p, [0, 0.22, 0.85, 1], [11, 0, 0, -7]);
  const y = useTransform(p, [0, 0.22, 0.85, 1], [80, 0, 0, -50]);
  const scale = useTransform(p, [0, 0.22, 0.85, 1], [0.96, 1, 1, 0.985]);
  const opacity = useTransform(p, [0, 0.16, 0.9, 1], [0.35, 1, 1, 0.75]);

  if (reduce) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      style={{
        rotateX,
        y,
        scale,
        opacity,
        transformPerspective: 1300,
        transformOrigin: "center 65%",
      }}
    >
      {children}
    </motion.section>
  );
}
