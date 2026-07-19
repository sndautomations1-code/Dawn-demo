"use client";

import { useRef } from "react";
import Image from "next/image";
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
  mist: {
    background: [
      "radial-gradient(circle at 22% 18%, rgba(250,250,248,0.9) 0%, rgba(250,250,248,0) 55%)",
      "radial-gradient(circle at 78% 80%, rgba(255,212,196,0.7) 0%, rgba(255,212,196,0) 60%)",
      "linear-gradient(160deg, #fbf7f6 0%, #ffe8e0 55%, #fbd8c6 100%)",
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

  const drift = useTransform(scrollYProgress, [0, 1], [24, -24]);
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

        {/* tall treatment-room photo, with the editorial word layered
            beneath it, drifting out into the left margin */}
        <Reveal className="relative col-span-12 sm:col-span-7 lg:col-span-6 lg:col-start-1 lg:row-span-2">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-20 top-[56%] -z-10 hidden select-none whitespace-nowrap font-display text-[clamp(6rem,12vw,12.5rem)] font-light italic leading-none text-[#d97a5e]/10 md:block lg:-left-36"
          >
            unhurried
          </span>
          <motion.div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem]"
            style={{
              boxShadow: PANEL_SHADOW,
              y: reduceMotion ? 0 : drift,
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1651065213855-e6094f99ee65?auto=format&fit=crop&q=80&w=1200"
              alt="Sunlit spa treatment room with a linen-covered daybed beside a warm bamboo screen"
              fill
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 55vw, 92vw"
              className="object-cover"
            />
          </motion.div>
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

        {/* small still-life photo tucked under the text column */}
        <Reveal
          delay={0.1}
          className="col-span-7 col-start-6 sm:col-span-4 sm:col-start-9 lg:col-span-3 lg:col-start-9"
        >
          <motion.div
            className="relative aspect-square w-full overflow-hidden rounded-[2rem]"
            style={{
              boxShadow: PANEL_SHADOW,
              y: reduceMotion ? 0 : driftCounter,
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1636714573130-bbb1d4b19cc1?auto=format&fit=crop&q=80&w=800"
              alt="Cream pillar candles and an amber glass jar on white waffle-weave cloth"
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 55vw"
              className="object-cover"
            />
          </motion.div>
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
