/**
 * Extracts the two botanical line-art panels from scripts/decor-source.png
 * into public/decor-left.png and public/decor-right.png.
 *
 * The source has a baked-in gray "transparency" checkerboard between and
 * below the panels, so panel bounds are detected by classifying pixels as
 * checker-gray vs. panel (near-white / rose-gold art). The white panel
 * background is then converted to alpha with a tolerance ramp so the soft
 * gradients in the line-art survive.
 */
import sharp from "sharp";

const SRC = new URL("./decor-source.png", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const px = (x, y) => {
  const i = (y * width + x) * channels;
  return [data[i], data[i + 1], data[i + 2], data[i + 3]];
};

/* Checker squares are neutral mid-grays; panel pixels are bright and/or
   warm-tinted. Transparent pixels also count as "checker" (non-panel). */
function isPanelPixel(x, y) {
  const [r, g, b, a] = px(x, y);
  if (a < 200) return false;
  const lum = (r + g + b) / 3;
  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  return lum > 175 || spread > 18;
}

function panelFraction(fixed, along, isColumn) {
  let hits = 0;
  const samples = 64;
  for (let s = 0; s < samples; s++) {
    const t = Math.floor((along * s) / samples);
    if (isColumn ? isPanelPixel(fixed, t) : isPanelPixel(t, fixed)) hits++;
  }
  return hits / samples;
}

/* Find runs of consecutive "panel" columns. */
const colIsPanel = [];
for (let x = 0; x < width; x++) colIsPanel.push(panelFraction(x, height, true) > 0.55);

const runs = [];
let start = -1;
for (let x = 0; x <= width; x++) {
  const on = x < width && colIsPanel[x];
  if (on && start === -1) start = x;
  if (!on && start !== -1) {
    if (x - start > width * 0.15) runs.push([start, x]);
    start = -1;
  }
}
if (runs.length !== 2) {
  throw new Error(`Expected 2 panels, found ${runs.length}: ${JSON.stringify(runs)}`);
}

/* Convert near-white to transparency. Alpha ramps with distance from
   white; color is un-premultiplied so the art keeps its hue over any
   backdrop. TOL is the distance at which a pixel becomes fully opaque. */
const TOL = 90;
function whiteToAlpha(buf) {
  for (let i = 0; i < buf.length; i += 4) {
    const r = buf[i], g = buf[i + 1], b = buf[i + 2];
    const dist = Math.max(255 - r, 255 - g, 255 - b);
    const a = Math.min(1, dist / TOL);
    if (a <= 0.02) {
      buf[i + 3] = 0;
      continue;
    }
    buf[i] = Math.max(0, Math.min(255, Math.round((r - 255 * (1 - a)) / a)));
    buf[i + 1] = Math.max(0, Math.min(255, Math.round((g - 255 * (1 - a)) / a)));
    buf[i + 2] = Math.max(0, Math.min(255, Math.round((b - 255 * (1 - a)) / a)));
    buf[i + 3] = Math.round(a * buf[i + 3]);
  }
  return buf;
}

async function extract([x0, x1], out) {
  /* Trim checker rows top/bottom within this column range. */
  let top = 0;
  let bottom = height;
  const frac = (y) => {
    let hits = 0;
    const samples = 64;
    for (let s = 0; s < samples; s++) {
      const x = x0 + Math.floor(((x1 - x0) * s) / samples);
      if (isPanelPixel(x, y)) hits++;
    }
    return hits / samples;
  };
  while (top < height && frac(top) < 0.55) top++;
  while (bottom > top && frac(bottom - 1) < 0.55) bottom--;

  /* Small inset so anti-aliased checker edges never survive. */
  const inset = 3;
  const region = {
    left: x0 + inset,
    top: top + inset,
    width: x1 - x0 - inset * 2,
    height: bottom - top - inset * 2,
  };

  const { data: crop } = await sharp(SRC)
    .extract(region)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  await sharp(whiteToAlpha(crop), {
    raw: { width: region.width, height: region.height, channels: 4 },
  })
    .png()
    .toFile(out);

  console.log(`${out}: ${region.width}x${region.height} (cols ${x0}-${x1}, rows ${top}-${bottom})`);
}

await extract(runs[0], "public/decor-left.png");
await extract(runs[1], "public/decor-right.png");
