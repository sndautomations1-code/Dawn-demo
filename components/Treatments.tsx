"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const TREATMENTS = [
  {
    name: "The First Light Facial",
    description: "A gentle enzyme and light peel — your introduction to resurfacing.",
    duration: "45 min",
    price: "$180",
  },
  {
    name: "Fractional Laser Resurfacing",
    description: "Targeted collagen renewal for texture and fine lines.",
    duration: "60 min",
    price: "$650",
  },
  {
    name: "IPL Photofacial",
    description: "Light-based correction of sun damage and uneven tone.",
    duration: "45 min",
    price: "$425",
  },
  {
    name: "CO₂ Deep Resurfacing",
    description: "The full restart — deep renewal for scars and etched lines.",
    duration: "90 min",
    price: "$1,200",
  },
  {
    name: "Laser Skin Tightening",
    description: "Gradual firming through gentle dermal heating.",
    duration: "60 min",
    price: "$550",
  },
  {
    name: "The Morning After Peel",
    description: "A medical-grade peel with next-day glow.",
    duration: "30 min",
    price: "$240",
  },
];

/* Cards step upward across each row, like the sun climbing. */
const RISE = ["lg:mt-24", "lg:mt-12", "lg:mt-0"];
/* On mobile the single column sways gently side to side instead. */
const SWAY = ["mr-5 lg:mr-0", "ml-5 lg:ml-0"];

export default function Treatments() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section id="treatments" className="px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="kicker text-ink/60">Treatments — First Light</p>
        <h2 className="mt-5 max-w-2xl font-display text-4xl tracking-[-0.02em] text-ink sm:text-5xl">
          Six ways to <em className="font-light">begin</em> again
        </h2>

        <ul className="mt-16 grid list-none gap-6 sm:gap-8 lg:grid-cols-3">
          {TREATMENTS.map((t, i) => (
            <motion.li
              key={t.name}
              className={`group rounded-3xl border border-line/80 bg-cream/60 p-8 transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_24px_50px_-30px_rgba(217,122,94,0.4)] ${RISE[i % 3]} ${SWAY[i % 2]}`}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px 0px" }}
              transition={{
                duration: 0.7,
                delay: reduceMotion ? 0 : (i % 3) * 0.12,
                ease: EASE,
              }}
            >
              <h3 className="font-display text-2xl tracking-[-0.01em] text-ink">
                {t.name}
                <span aria-hidden className="card-horizon w-3/4" />
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/75">
                {t.description}
              </p>
              <div className="mt-8 flex items-end justify-between gap-4">
                <span className="kicker text-[0.625rem] text-ink/55">
                  {t.duration}
                </span>
                <span className="font-display text-4xl tracking-[-0.02em] text-accent">
                  {t.price}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
