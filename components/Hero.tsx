"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import MorningSky from "./MorningSky";

const EASE = [0.22, 1, 0.36, 1] as const;

function MaskedLine({
  children,
  delay,
  className,
  reduceMotion,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
  reduceMotion: boolean;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={reduceMotion ? false : { y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.85, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion() ?? false;

  const fadeIn = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden px-6 sm:px-10 lg:px-16">
      {/* ambient pre-dawn blobs, drifting extremely slowly */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -right-[10%] -top-[12%] h-[55vmin] w-[55vmin] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(226,220,236,0.6) 0%, rgba(226,220,236,0) 70%)",
            filter: "blur(50px)",
          }}
          animate={reduceMotion ? undefined : { x: [0, -45, 0], y: [0, 35, 0] }}
          transition={{ duration: 75, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[-12%] top-[30%] h-[60vmin] w-[60vmin] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,232,224,0.75) 0%, rgba(255,232,224,0) 70%)",
            filter: "blur(50px)",
          }}
          animate={reduceMotion ? undefined : { x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 88, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-8%] right-[8%] h-[50vmin] w-[50vmin] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,212,196,0.5) 0%, rgba(255,212,196,0) 70%)",
            filter: "blur(50px)",
          }}
          animate={reduceMotion ? undefined : { x: [0, -35, 0], y: [0, -40, 0] }}
          transition={{ duration: 64, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <MorningSky />

      {/* dawn rays: thin concentric arcs rising behind the portrait */}
      <svg
        aria-hidden
        className="dawn-rays pointer-events-none absolute left-[75%] top-[70%] -z-[6] hidden aspect-square w-[min(56vw,53rem)] -translate-x-1/2 -translate-y-1/2 select-none min-[900px]:block"
        viewBox="0 0 1000 1000"
        fill="none"
      >
        <g className="dawn-rays-group">
          {[
            { r: 140, sweep: 240, start: -35, color: "#d97a5e", o: 0.2, d: 0.6 },
            { r: 220, sweep: 265, start: 130, color: "#d97a5e", o: 0.16, d: 0.75 },
            { r: 310, sweep: 205, start: 210, color: "#3d2c29", o: 0.12, d: 0.9 },
            { r: 400, sweep: 250, start: 75, color: "#d97a5e", o: 0.14, d: 1.05 },
            { r: 470, sweep: 220, start: 300, color: "#d97a5e", o: 0.1, d: 1.2 },
          ].map((arc) => (
            <circle
              key={arc.r}
              className="dawn-rays-arc"
              cx="500"
              cy="500"
              r={arc.r}
              pathLength={360}
              stroke={arc.color}
              strokeOpacity={arc.o}
              strokeWidth="1"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              strokeDasharray={`${arc.sweep} 360`}
              transform={`rotate(${arc.start} 500 500)`}
              style={
                {
                  "--sweep": arc.sweep,
                  animationDelay: `${arc.d}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </g>
      </svg>

      {/* hero portrait, dissolving into the pre-dawn light on the right */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-0 top-[9svh] -z-[5] hidden w-[min(44vw,42rem)] select-none min-[900px]:block"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.7, ease: EASE }}
      >
        {/* peach glow: the light source behind her face and shoulder */}
        <div
          className="absolute left-[12%] top-[6%] h-[62%] w-[74%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,212,196,0.85) 0%, rgba(217,122,94,0.32) 48%, rgba(217,122,94,0) 72%)",
            filter: "blur(90px)",
          }}
        />
        <Image
          src="/dawn-portrait-blend.png"
          alt=""
          width={750}
          height={826}
          priority
          className="relative h-auto w-full"
          style={{
            filter: "saturate(0.74) brightness(1.08) contrast(0.95)",
            WebkitMaskImage:
              "radial-gradient(115% 115% at 42% 32%, #000 52%, transparent 93%)",
            maskImage:
              "radial-gradient(115% 115% at 42% 32%, #000 52%, transparent 93%)",
          }}
        />
      </motion.div>

      <motion.p className="kicker pt-10 text-ink/70 sm:pt-12" {...fadeIn(1.35)}>
        Dawn — Laser &amp; Skin Resurfacing
      </motion.p>

      <div className="flex flex-1 flex-col justify-center py-16">
        <h1 className="font-display tracking-[-0.02em] text-ink">
          <MaskedLine
            delay={0.15}
            reduceMotion={reduceMotion}
            className="text-[clamp(3.4rem,11.5vw,12.5rem)] uppercase leading-[0.94]"
          >
            Your skin,
          </MaskedLine>
          <MaskedLine
            delay={0.27}
            reduceMotion={reduceMotion}
            className="pl-[16vw] text-[clamp(2.1rem,7vw,7.25rem)] font-light italic leading-[1.05] md:pl-[24vw]"
          >
            starting
          </MaskedLine>
          {/* horizon line drawing itself under “starting” */}
          <span
            aria-hidden
            className="block pl-[16vw] pt-1 md:pl-[24vw]"
          >
            <motion.span
              className="block h-px w-[38vw] origin-left md:w-[26vw]"
              style={{ background: "linear-gradient(90deg, #ffd4c4, #d97a5e)" }}
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.05, ease: EASE }}
            />
          </span>
          <MaskedLine
            delay={0.39}
            reduceMotion={reduceMotion}
            className="text-[clamp(3.4rem,11.5vw,12.5rem)] uppercase leading-[0.94]"
          >
            <span className="gradient-word">over</span>
            <span className="text-accent">.</span>
          </MaskedLine>
        </h1>

        <motion.p
          className="mt-10 max-w-md text-base leading-relaxed text-ink/80 sm:text-lg"
          {...fadeIn(1.45)}
        >
          A quiet new beginning for your skin — laser and resurfacing
          treatments built around renewal, not correction.
        </motion.p>

        <motion.div className="mt-9" {...fadeIn(1.55)}>
          <a
            href="https://splendessa.com"
            className="cta-pill px-9 py-4 text-sm font-medium"
          >
            Book your session
          </a>
        </motion.div>
      </div>

      <motion.p
        className="kicker pb-8 text-[0.5625rem] text-ink/50"
        {...fadeIn(1.75)}
      >
        Scroll — the morning unfolds
      </motion.p>
    </section>
  );
}
