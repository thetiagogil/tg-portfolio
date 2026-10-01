// next/image loader for the static export: images are pre-sized by scripts/build-images.mjs into public/images/
// as "<name>-<width>.webp". `src` is the path inside assets/, e.g. "projects/voydex/voydex-1.png".
const WIDTHS = [640, 960, 1280, 1920]; // keep in sync with scripts/build-images.mjs

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}): string {
  const size = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
  const base = src.replace(/^\/+/, "").replace(/\.(png|jpe?g|webp)$/i, "");
  return `/images/${base}-${size}.webp`;
}
