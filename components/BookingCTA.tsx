"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BookingCTA() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative flex min-h-[85svh] items-center justify-center overflow-hidden px-6 py-28 sm:px-10">
      {/* local glow that gently intensifies as the section enters view */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(120vw,52rem)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,224,206,0.85) 0%, rgba(255,224,206,0.4) 45%, rgba(255,224,206,0) 70%)",
          filter: "blur(30px)",
        }}
        initial={reduceMotion ? false : { opacity: 0.5, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-25% 0px" }}
        transition={{ duration: 1.4, ease: EASE }}
      />

      <motion.div
        className="flex max-w-2xl flex-col items-center text-center"
        initial={reduceMotion ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <p className="kicker text-ink/60">Full Morning</p>
        <h2 className="mt-6 font-display text-5xl tracking-[-0.02em] text-ink sm:text-7xl">
          Your new morning <em className="font-light">starts</em> here
        </h2>
        <p className="mt-7 max-w-md text-base leading-relaxed text-ink/80 sm:text-lg">
          Every visit begins with a quiet consultation — no commitment, no
          rush.
        </p>
        <a
          href="https://splendessa.com"
          className="cta-pill mt-10 px-11 py-5 text-base font-medium"
        >
          Book your session
        </a>
      </motion.div>
    </section>
  );
}
