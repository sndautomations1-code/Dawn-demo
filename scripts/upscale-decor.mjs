/**
 * Upscales public/decor-left.png and public/decor-right.png to 2x the
 * height they render at in the Treatments section on a 1920px viewport
 * (object-cover, height-driven, ~1415px box → 2830px target), so the
 * browser paints them at ≥2x pixel density instead of stretching a
 * smaller source. Lanczos3 + a light sharpen keeps the line-art crisp;
 * alpha is carried through untouched.
 */
import sharp from "sharp";

const TARGET_HEIGHT = 2832;

for (const file of ["public/decor-left.png", "public/decor-right.png"]) {
  const buf = await sharp(file)
    .resize({ height: TARGET_HEIGHT, kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.9 })
    .png()
    .toBuffer();
  await sharp(buf).toFile(file);
  const m = await sharp(file).metadata();
  console.log(`${file}: ${m.width}x${m.height}, alpha=${m.hasAlpha}`);
}
