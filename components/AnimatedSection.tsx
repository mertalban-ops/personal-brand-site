"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
};

export default function AnimatedSection({ children, className, delay, id }: Props) {
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  if (reduce || isMobile) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 48, scale: 0.975 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: delay ?? 0, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}
