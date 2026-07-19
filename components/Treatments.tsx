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
    /* warm facial mask brushed on in a serene spa setting */
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600",
    alt: "Client relaxing while a warm facial mask is gently brushed onto her skin at a spa",
  },
  {
    name: "Fractional Laser Resurfacing",
    description: "Targeted collagen renewal for texture and fine lines.",
    duration: "60 min",
    price: "$650",
    /* handheld resurfacing device gliding over a client's cheek in-clinic */
    image:
      "https://images.unsplash.com/photo-1761819920857-7edc5e808fd3?auto=format&fit=crop&q=80&w=600",
    alt: "Clinician guiding a precision skin-resurfacing device across a client's cheek",
  },
  {
    name: "IPL Photofacial",
    description: "Light-based correction of sun damage and uneven tone.",
    duration: "45 min",
    price: "$425",
    /* glowing, even-toned skin washed in soft warm light */
    image:
      "https://images.unsplash.com/photo-1675773051474-55c4b7d2cf53?auto=format&fit=crop&q=80&w=600",
    alt: "Close-up of luminous, even-toned skin bathed in soft warm light",
  },
  {
    name: "CO₂ Deep Resurfacing",
    description: "The full restart — deep renewal for scars and etched lines.",
    duration: "90 min",
    price: "$1,200",
    /* macro serum texture with air bubbles */
    image:
      "https://images.unsplash.com/photo-1748543668687-624e058c367c?auto=format&fit=crop&q=80&w=600",
    alt: "Golden resurfacing serum in overlapping droplet discs, photographed up close",
  },
  {
    name: "Laser Skin Tightening",
    description: "Gradual firming through gentle dermal heating.",
    duration: "60 min",
    price: "$550",
    /* golden close-up of firm, lifted skin */
    image:
      "https://images.unsplash.com/photo-1624819318229-f006595a4993?auto=format&fit=crop&q=80&w=600",
    alt: "Close-up of firm, radiant skin along the cheek and jawline in golden light",
  },
  {
    name: "The Morning After Peel",
    description: "A medical-grade peel with next-day glow.",
    duration: "30 min",
    price: "$240",
    /* blush botanical macro, fresh and soft */
    image:
      "https://images.unsplash.com/photo-1651154872905-b0f53800de90?auto=format&fit=crop&q=80&w=600",
    alt: "Soft blush flower in delicate morning light",
  },
];

export default function Treatments() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="treatments"
      className="relative isolate overflow-x-hidden px-6 py-28 sm:px-10 sm:py-36 lg:px-16"
    >
      {/* botanical line-art decor hugging the section edges, behind all
          content; hidden on mobile where there's no room to breathe */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-14 -z-10 hidden w-64 select-none opacity-60 md:block lg:w-80"
      >
        <Image
          src="/decor-left.png"
          alt=""
          fill
          sizes="320px"
          className="object-cover object-left"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -right-14 -z-10 hidden w-64 select-none opacity-60 md:block lg:w-80"
      >
        <Image
          src="/decor-right.png"
          alt=""
          fill
          sizes="320px"
          className="object-cover object-right"
        />
      </div>

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
                  alt={t.alt}
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
