"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

/**
 * Fixed full-viewport layer behind all content. Scroll progress drives the
 * background from cool pre-dawn tones to bright warm morning light.
 *
 * Each stop is its own opaque layer fading in over its segment of scroll —
 * cross-fading opaque colors yields the same in-between color as animating
 * background-color, but opacity runs on the compositor instead of forcing a
 * full-viewport repaint on every scroll frame.
 */
const STOPS = [
  { color: "#faf7f4", from: 0, to: 0.18 },
  { color: "#fdefe6", from: 0.18, to: 0.42 },
  { color: "#ffe8e0", from: 0.42, to: 0.68 },
  { color: "#ffdfcd", from: 0.68, to: 0.88 },
  { color: "#ffe4d5", from: 0.88, to: 1 },
];

function ColorLayer({
  progress,
  color,
  from,
  to,
}: {
  progress: MotionValue<number>;
  color: string;
  from: number;
  to: number;
}) {
  const opacity = useTransform(progress, [from, to], [0, 1]);
  return (
    <motion.div
      className="absolute inset-0"
      style={{ backgroundColor: color, opacity, willChange: "opacity" }}
    />
  );
}

export default function SunriseBackground() {
  const { scrollYProgress } = useScroll();

  return (
    <div aria-hidden className="fixed inset-0 -z-30 bg-[#f1f0f3]">
      {STOPS.map((stop) => (
        <ColorLayer key={stop.color} progress={scrollYProgress} {...stop} />
      ))}
    </div>
  );
}
