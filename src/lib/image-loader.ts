// next/image loader for the static export: scripts/build-images.mjs pre-sizes every image into public/images/ as
// "<name>-<width>.webp". `src` is the path inside assets/, e.g. "projects/voydex/voydex-1.png".
import { IMAGE_WIDTHS } from "./constants";

export default function imageLoader({ src, width }: { src: string; width: number }): string {
  const size = IMAGE_WIDTHS.find((w) => w >= width) ?? IMAGE_WIDTHS.at(-1);
  const name = src.replace(/^\/+/, "").replace(/\.(png|jpe?g|webp)$/i, "");

  return `/images/${name}-${size}.webp`;
}
