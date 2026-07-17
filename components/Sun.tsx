"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * The rising sun. A fixed, layered radial-gradient circle that climbs the
 * viewport as the page is scrolled — barely peeking in the hero, fully
 * risen behind the booking CTA.
 */
export default function Sun() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const y = useTransform(
    scrollYProgress,
    [0, 0.85, 1],
    ["-14vh", "-82vh", "-84vh"],
  );
  const scale = useTransform(scrollYProgress, [0, 0.85], [0.8, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85], [0.65, 0.75, 1]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-full -z-20 flex justify-center"
    >
      <motion.div
        className="relative aspect-square w-[min(150vw,58rem)] sm:w-[min(92vw,58rem)]"
        style={
          reduceMotion
            ? { y: "-60vh", scale: 1, opacity: 0.9 }
            : { y, scale, opacity }
        }
      >
        {/* halo */}
        <div
          className="absolute -inset-[18%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,232,224,0.9) 0%, rgba(255,232,224,0.45) 45%, rgba(255,232,224,0) 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* body */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,212,196,0.95) 0%, rgba(255,212,196,0.6) 42%, rgba(255,220,204,0) 72%)",
            filter: "blur(28px)",
          }}
        />
        {/* warm core */}
        <div
          className="absolute inset-[22%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(244,170,138,0.75) 0%, rgba(248,187,158,0.35) 55%, rgba(248,187,158,0) 78%)",
            filter: "blur(24px)",
          }}
        />
      </motion.div>
    </div>
  );
}
