import { ImageResponse } from "next/og";

// Route metadata — Next serves this file at /opengraph-image and wires up the
// og:image meta tag (Twitter falls back to og:image when no twitter:image set).
export const runtime = "edge";
export const alt = "DAWN — Laser & Skin Resurfacing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Site palette (mirrors tailwind.config.ts / globals.css).
const ink = "#3D2C29";
const rose = "#FFE8E0";
const peach = "#FFD4C4";
const cream = "#FAFAF8";
const accent = "#D97A5E";

// Load the site's display face (Fraunces) as raw font data for satori. Google
// subsets the file to just the glyphs we render (via &text) and returns a
// truetype src, which is what ImageResponse can embed. Falls back to the
// built-in font if the fetch is unavailable so the image always generates.
async function loadFraunces(text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&text=${encodeURIComponent(
      text
    )}`;
    const css = await (await fetch(url)).text();
    const src = css.match(
      /src:\s*url\((.+?)\)\s*format\('(?:opentype|truetype)'\)/
    );
    if (!src) return null;
    const res = await fetch(src[1]);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const fraunces = await loadFraunces("DAWNYour skin, starting over.");
  const display = fraunces ? "Fraunces" : "serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: ink,
          backgroundColor: cream,
          // Dawn gradient: a soft sun glow rising from the top edge, warming
          // into peach at the base — the same rose→peach light the page sits on.
          backgroundImage: `radial-gradient(circle at 50% 6%, ${rose} 0%, rgba(255,232,224,0) 55%), linear-gradient(180deg, ${cream} 0%, #FFF1EA 52%, ${peach} 100%)`,
        }}
      >
        {/* Kicker — the site's uppercase, wide-tracked label style. */}
        <div
          style={{
            fontSize: 28,
            letterSpacing: 9,
            textTransform: "uppercase",
            color: accent,
            marginBottom: 34,
          }}
        >
          Laser & Skin Resurfacing
        </div>

        {/* Brand wordmark in the display face. */}
        <div
          style={{
            fontFamily: display,
            fontSize: 190,
            fontWeight: 500,
            letterSpacing: 10,
            lineHeight: 1,
            color: ink,
          }}
        >
          DAWN
        </div>

        {/* Horizon rule — the peach→coral line the treatment cards use. */}
        <div
          style={{
            width: 200,
            height: 3,
            marginTop: 40,
            marginBottom: 40,
            borderRadius: 3,
            backgroundImage: `linear-gradient(90deg, ${peach}, ${accent})`,
          }}
        />

        {/* Tagline. */}
        <div
          style={{
            fontFamily: display,
            fontSize: 46,
            color: "rgba(61,44,41,0.74)",
          }}
        >
          Your skin, starting over.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fraunces
        ? [{ name: "Fraunces", data: fraunces, style: "normal", weight: 500 }]
        : [],
    }
  );
}
