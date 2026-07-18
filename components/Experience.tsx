"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import HorizonUnderline from "./HorizonUnderline";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Abstract light compositions, painted in CSS. */
const PANELS = {
  horizon: {
    background: [
      "radial-gradient(ellipse 90% 38% at 50% 66%, rgba(240,164,128,0.55) 0%, rgba(240,164,128,0) 65%)",
      "linear-gradient(180deg, #f4eef3 0%, #ffe9e1 38%, #ffd4c4 60%, #f2b598 66%, #ffdfd0 68%, #fff1e9 100%)",
    ].join(", "),
  },
  mist: {
    background: [
      "radial-gradient(circle at 22% 18%, rgba(250,250,248,0.9) 0%, rgba(250,250,248,0) 55%)",
      "radial-gradient(circle at 78% 80%, rgba(255,212,196,0.7) 0%, rgba(255,212,196,0) 60%)",
      "linear-gradient(160deg, #fbf7f6 0%, #ffe8e0 55%, #fbd8c6 100%)",
    ].join(", "),
  },
  ember: {
    background: [
      "radial-gradient(circle at 50% 82%, rgba(217,122,94,0.55) 0%, rgba(217,122,94,0) 58%)",
      "radial-gradient(circle at 50% 70%, rgba(255,212,196,0.9) 0%, rgba(255,212,196,0) 70%)",
      "linear-gradient(180deg, #fff2ea 0%, #ffe4d6 100%)",
    ].join(", "),
  },
};

const PANEL_SHADOW = "0 30px 70px -35px rgba(217,122,94,0.35)";

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function Experience() {
  const reduceMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const drift = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const driftCounter = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <section
      id="ritual"
      ref={ref}
      className="overflow-hidden px-6 py-28 sm:px-10 sm:py-36 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-x-6 gap-y-16">
        <div className="col-span-12 lg:col-span-5">
          <p className="kicker text-ink/60">The Experience — Golden Hour</p>
        </div>

        {/* tall horizon panel */}
        <Reveal className="col-span-12 sm:col-span-7 lg:col-span-6 lg:col-start-1 lg:row-span-2">
          <motion.div
            aria-hidden
            className="aspect-[4/5] w-full rounded-[2.5rem]"
            style={{
              ...PANELS.horizon,
              boxShadow: PANEL_SHADOW,
              y: reduceMotion ? 0 : drift,
            }}
          />
        </Reveal>

        {/* first text block, offset right */}
        <Reveal
          delay={0.15}
          className="col-span-12 self-center sm:col-span-5 lg:col-span-5 lg:col-start-8"
        >
          <p className="max-w-[38ch] text-base leading-relaxed text-ink/80 sm:text-lg">
            The studio is <HorizonUnderline>quiet on purpose</HorizonUnderline>.
            Warm light, warm linen, and a treatment room that asks nothing of
            you. You arrive, you rest, and the work happens slowly — the way
            skin prefers.
          </p>
        </Reveal>

        {/* small ember panel tucked under the text column */}
        <Reveal
          delay={0.1}
          className="col-span-7 col-start-6 sm:col-span-4 sm:col-start-9 lg:col-span-3 lg:col-start-9"
        >
          <motion.div
            aria-hidden
            className="aspect-square w-full rounded-[2rem]"
            style={{
              ...PANELS.ember,
              boxShadow: PANEL_SHADOW,
              y: reduceMotion ? 0 : driftCounter,
            }}
          />
        </Reveal>

        {/* pull quote */}
        <Reveal className="col-span-12 py-6 lg:col-span-10 lg:col-start-2">
          <blockquote className="font-display text-3xl font-light italic leading-snug tracking-[-0.01em] text-ink sm:text-5xl">
            Every morning, skin begins again.
          </blockquote>
        </Reveal>

        {/* second text block, left */}
        <Reveal className="col-span-12 self-center sm:col-span-5 lg:col-span-4">
          <p className="max-w-[38ch] text-base leading-relaxed text-ink/80 sm:text-lg">
            Resurfacing is not about erasing. It clears what the years have
            left behind, so newer skin can surface{" "}
            <HorizonUnderline>on its own schedule</HorizonUnderline>. You leave
            with a plan, a calm face, and somewhere to be tomorrow.
          </p>
        </Reveal>

        {/* wide mist panel */}
        <Reveal
          delay={0.15}
          className="col-span-12 sm:col-span-7 lg:col-span-7 lg:col-start-6"
        >
          <motion.div
            aria-hidden
            className="aspect-[16/10] w-full rounded-[2.5rem]"
            style={{
              ...PANELS.mist,
              boxShadow: PANEL_SHADOW,
              y: reduceMotion ? 0 : driftCounter,
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
