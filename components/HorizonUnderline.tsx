"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Wraps a key phrase; a thin gradient horizon line draws itself
 * left-to-right beneath it when it enters the viewport.
 */
export default function HorizonUnderline({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <span className="relative inline-block">
      {children}
      <motion.span
        aria-hidden
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left"
        style={{
          background: "linear-gradient(90deg, #ffd4c4, #d97a5e)",
        }}
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </span>
  );
}
