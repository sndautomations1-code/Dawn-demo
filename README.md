# DAWN — Laser & Skin Resurfacing

A one-page demo landing site for a fictional med-spa brand. The page is a
sunrise: it opens in pale pre-dawn tones and warms with every scroll, while a
soft sun climbs the viewport and is fully risen behind the booking CTA.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS with custom theme tokens
- Framer Motion for scroll-linked color/sun motion and entrance choreography
- Fraunces (display) + Jost (body) via `next/font`

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (fully static)
```

## Structure

- `components/SunriseBackground.tsx` — fixed layer, scroll-driven background warming
- `components/Sun.tsx` — the rising sun, position mapped to scroll progress
- `components/GrainOverlay.tsx` — film-grain SVG noise over the whole page
- `components/Hero.tsx` / `Treatments.tsx` / `Experience.tsx` / `BookingCTA.tsx` / `Footer.tsx` — page sections

`prefers-reduced-motion` disables ambient loops and entrance animations.
All content and pricing are fictional. Design & build: [Splendessa](https://splendessa.com).
