"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Fixed full-viewport layer behind all content. Scroll progress drives the
 * background from cool pre-dawn tones to bright warm morning light.
 */
export default function SunriseBackground() {
  const { scrollYProgress } = useScroll();

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.18, 0.42, 0.68, 0.88, 1],
    ["#f1f0f3", "#faf7f4", "#fdefe6", "#ffe8e0", "#ffdfcd", "#ffe4d5"],
  );

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 -z-30"
      style={{ backgroundColor }}
    />
  );
}
