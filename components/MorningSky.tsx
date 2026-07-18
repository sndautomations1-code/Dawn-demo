const CORAL = "#d97a5e";
const INK = "#3d2c29";

/* Rays sit on the lower-left of the sun only, pointing into the page.
   Angles are degrees from the +x axis with y down; start leaves a gap
   beyond the outer halo ring (r 180). */
const RAYS = [
  { angle: 142, start: 198, len: 62 },
  { angle: 155, start: 212, len: 34 },
  { angle: 166, start: 200, len: 78 },
  { angle: 176, start: 216, len: 44 },
  { angle: 187, start: 202, len: 68 },
  { angle: 196, start: 210, len: 36 },
];

function ray({ angle, start, len }: (typeof RAYS)[number]) {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x1: 220 + start * cos,
    y1: 220 + start * sin,
    x2: 220 + (start + len) * cos,
    y2: 220 + (start + len) * sin,
  };
}

/* Partial top-edge outlines for the more defined upper clouds. */
const OUTLINES: Record<string, { d: string; opacity: number }> = {
  a: { d: "M18 92 Q40 58 82 60 Q102 26 150 32 Q196 26 218 58 Q258 56 284 90", opacity: 0.18 },
  b: { d: "M24 96 Q60 52 108 58 Q138 30 178 40 Q228 36 276 88", opacity: 0.15 },
  c: { d: "M12 90 Q48 64 92 62 Q118 34 162 38 Q206 30 234 60 Q268 62 290 92", opacity: 0.19 },
};

/* `tint` mixes a whisper of coral into the fill — sunrise light on the
   clouds nearest the sun. */
const CLOUD_FILL = (o1: number, o2: number, o3: number, tint = 0) =>
  [
    ...(tint
      ? [
          `radial-gradient(ellipse 70% 70% at 60% 40%, rgba(217,122,94,${tint}), transparent 72%)`,
        ]
      : []),
    `radial-gradient(ellipse 55% 60% at 30% 65%, rgba(255,250,246,${o1}), transparent 70%)`,
    `radial-gradient(ellipse 45% 55% at 55% 35%, rgba(255,255,255,${o2}), transparent 72%)`,
    `radial-gradient(ellipse 50% 55% at 75% 60%, rgba(255,250,246,${o3}), transparent 70%)`,
  ].join(", ");

/* Smaller, more defined clouds higher up; larger, softer ones lower —
   sky depth. Drift directions alternate, durations are all different. */
const CLOUDS = [
  { left: "60%", top: "8%", width: "min(13vw, 12rem)", blur: 22, fill: CLOUD_FILL(0.68, 0.72, 0.62, 0.07), outline: "a", drift: "26px", dur: "46s", delay: "-12s" },
  { left: "44%", top: "6%", width: "min(11vw, 10rem)", blur: 24, fill: CLOUD_FILL(0.62, 0.68, 0.58, 0.05), outline: "b", drift: "-22px", dur: "58s", delay: "-30s" },
  { left: "42%", top: "56%", width: "min(19vw, 17rem)", blur: 30, fill: CLOUD_FILL(0.6, 0.66, 0.55), outline: "c", drift: "30px", dur: "66s", delay: "-8s" },
  { left: "67%", top: "80%", width: "min(30vw, 27rem)", blur: 38, fill: CLOUD_FILL(0.52, 0.58, 0.5), drift: "-34px", dur: "74s", delay: "-40s" },
  { left: "33%", top: "83%", width: "min(26vw, 24rem)", blur: 40, fill: CLOUD_FILL(0.5, 0.55, 0.48), drift: "28px", dur: "82s", delay: "-20s" },
] as const;

/* Morning mist: long undulating hairlines layered above the horizon,
   staggered down the lower-middle of the hero. Anchored to the hero's
   bottom so they stay clear of the paragraph and CTA at any height;
   the left edge never reaches the text column. */
const MIST_LINES = [
  { d: "M2 24 C 90 10, 170 32, 260 20 C 340 10, 430 30, 598 18", color: INK, opacity: 0.16, left: "max(32%, 31rem)", bottom: "34%", width: "42vw", drift: "22px", dur: "38s", delay: "-6s" },
  { d: "M2 20 C 110 32, 200 8, 320 22 C 420 32, 500 12, 598 26", color: CORAL, opacity: 0.17, left: "max(30%, 31rem)", bottom: "26%", width: "44vw", drift: "-18px", dur: "52s", delay: "-24s" },
  { d: "M2 18 C 70 28, 190 12, 300 26 C 410 36, 520 14, 598 22", color: INK, opacity: 0.12, left: "36%", bottom: "18%", width: "38vw", drift: "26px", dur: "44s", delay: "-15s" },
  { d: "M2 26 C 120 14, 240 34, 360 18 C 460 8, 540 28, 598 20", color: CORAL, opacity: 0.14, left: "31%", bottom: "10%", width: "46vw", drift: "-20px", dur: "58s", delay: "-33s" },
] as const;

const FOG_BANDS = [
  { left: "34%", bottom: "20%", width: "min(34vw, 32rem)", height: "4.5rem", fillOpacity: 0.42, blur: 44, dur: "10s", delay: "0s" },
  { left: "45%", bottom: "7%", width: "min(40vw, 38rem)", height: "5rem", fillOpacity: 0.38, blur: 56, dur: "13s", delay: "-6s" },
] as const;

/**
 * Morning-sky decor for the hero: a bold coral sun cropped by the
 * top-right corner and a handful of hazy clouds in the empty zones.
 * Purely decorative, out of flow, below the arcs / portrait / text.
 */
export default function MorningSky() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[7] hidden select-none min-[900px]:block"
    >
      {/* corner glow bleeding from the sun */}
      <div
        className="absolute -right-[10%] -top-[14%] aspect-square w-[min(48vw,44rem)] rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(217,122,94,0.09) 0%, rgba(217,122,94,0) 62%)`,
          filter: "blur(120px)",
        }}
      />

      {/* the sun: coral core with offset hairline halo rings and rays */}
      <div className="absolute -right-[8%] -top-[16%] aspect-square w-[min(26vw,24rem)]">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(217,122,94,0.5) 0%, rgba(217,122,94,0.34) 30%, rgba(230,150,120,0.14) 52%, rgba(230,150,120,0) 70%)`,
            filter: "blur(10px)",
          }}
        />
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 440 440"
          fill="none"
        >
          <circle
            className="sky-halo"
            cx="216"
            cy="224"
            r="158"
            stroke={CORAL}
            strokeOpacity="0.2"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            className="sky-halo"
            cx="226"
            cy="214"
            r="180"
            stroke={CORAL}
            strokeOpacity="0.15"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ "--halo-delay": "-4s" } as React.CSSProperties}
          />
          {RAYS.map((r) => {
            const { x1, y1, x2, y2 } = ray(r);
            return (
              <line
                key={r.angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={CORAL}
                strokeOpacity="0.2"
                strokeWidth="1"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
      </div>

      {/* morning haze */}
      {CLOUDS.map((c) => (
        <div
          key={c.left + c.top}
          className="sky-cloud absolute aspect-[5/2]"
          style={
            {
              left: c.left,
              top: c.top,
              width: c.width,
              "--drift": c.drift,
              "--dur": c.dur,
              "--delay": c.delay,
            } as React.CSSProperties
          }
        >
          <div
            className="absolute inset-0"
            style={{ background: c.fill, filter: `blur(${c.blur}px)` }}
          />
          {"outline" in c && c.outline ? (
            <svg
              className="absolute inset-0 h-full w-full overflow-visible"
              viewBox="0 0 300 120"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d={OUTLINES[c.outline].d}
                stroke={INK}
                strokeOpacity={OUTLINES[c.outline].opacity}
                strokeWidth="1"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          ) : null}
        </div>
      ))}

      {/* morning mist above the horizon: undulating hairlines... */}
      {MIST_LINES.map((m) => (
        <svg
          key={m.bottom}
          className="mist-line absolute h-10"
          viewBox="0 0 600 40"
          preserveAspectRatio="none"
          fill="none"
          style={
            {
              left: m.left,
              bottom: m.bottom,
              width: m.width,
              "--drift": m.drift,
              "--dur": m.dur,
              "--delay": m.delay,
            } as React.CSSProperties
          }
        >
          <path
            d={m.d}
            stroke={m.color}
            strokeOpacity={m.opacity}
            strokeWidth="1"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ))}

      {/* ...and fog strips lying between them */}
      {FOG_BANDS.map((f) => (
        <div
          key={f.bottom}
          className="mist-fog absolute"
          style={
            {
              left: f.left,
              bottom: f.bottom,
              width: f.width,
              height: f.height,
              background: `radial-gradient(ellipse 60% 55% at 50% 50%, rgba(255,255,255,${f.fillOpacity}), transparent 75%)`,
              filter: `blur(${f.blur}px)`,
              "--dur": f.dur,
              "--delay": f.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
