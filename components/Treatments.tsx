"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const TREATMENTS = [
  {
    name: "The First Light Facial",
    description: "A gentle enzyme and light peel — your introduction to resurfacing.",
    duration: "45 min",
    price: "$180",
    /* soft morning light on calm water */
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "Fractional Laser Resurfacing",
    description: "Targeted collagen renewal for texture and fine lines.",
    duration: "60 min",
    price: "$650",
    /* a precise blade of light across a warm wall */
    image:
      "https://images.unsplash.com/photo-1685955978440-1189dbe6a0d4?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "IPL Photofacial",
    description: "Light-based correction of sun damage and uneven tone.",
    duration: "45 min",
    price: "$425",
    /* warm dusk-gradient glow */
    image:
      "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "CO₂ Deep Resurfacing",
    description: "The full restart — deep renewal for scars and etched lines.",
    duration: "90 min",
    price: "$1,200",
    /* macro serum texture with air bubbles */
    image:
      "https://images.unsplash.com/photo-1748543668687-624e058c367c?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "Laser Skin Tightening",
    description: "Gradual firming through gentle dermal heating.",
    duration: "60 min",
    price: "$550",
    /* clean terracotta architectural curves */
    image:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "The Morning After Peel",
    description: "A medical-grade peel with next-day glow.",
    duration: "30 min",
    price: "$240",
    /* blush botanical macro, fresh and soft */
    image:
      "https://images.unsplash.com/photo-1651154872905-b0f53800de90?auto=format&fit=crop&q=80&w=600",
  },
];

export default function Treatments() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section id="treatments" className="px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="kicker text-ink/60">Treatments — First Light</p>
        <h2 className="mt-5 max-w-2xl font-display text-4xl tracking-[-0.02em] text-ink sm:text-5xl">
          Six ways to <em className="font-light">begin</em> again
        </h2>
        <div aria-hidden className="mt-4 h-[1px] w-24 bg-neutral-200/60" />

        <ul className="mt-16 grid list-none gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {TREATMENTS.map((t, i) => (
            <motion.li
              key={t.name}
              className="group rounded-3xl border border-neutral-200/50 bg-cream/60 p-6 shadow-sm transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1.5 hover:border-neutral-300/70 hover:shadow-md sm:p-7"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px 0px" }}
              transition={{
                duration: 0.7,
                delay: reduceMotion ? 0 : (i % 3) * 0.12,
                ease: EASE,
              }}
            >
              <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-xl">
                <Image
                  src={t.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="font-display text-2xl tracking-[-0.01em] text-ink">
                {t.name}
                <span aria-hidden className="card-horizon w-3/4" />
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/75">
                {t.description}
              </p>
              <div className="mt-8 flex items-end justify-between gap-4">
                <span className="kicker text-[0.625rem] text-ink/70">
                  {t.duration}
                </span>
                <span className="font-display text-4xl tracking-[-0.02em] text-ink transition-colors duration-500 group-hover:text-accent">
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
