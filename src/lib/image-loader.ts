// next/image loader for the static export: scripts/build-images.mjs pre-sizes every image into public/images/ as
// "<name>-<width>.webp". `src` is the path inside assets/, e.g. "projects/voydex/voydex-1.png".
const WIDTHS = [640, 960, 1280, 1920]; // keep in sync with scripts/build-images.mjs and next.config.ts

export default function imageLoader({ src, width }: { src: string; width: number }): string {
  const size = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
  const name = src.replace(/^\/+/, "").replace(/\.(png|jpe?g|webp)$/i, "");
  return `/images/${name}-${size}.webp`;
}
