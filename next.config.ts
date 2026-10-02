import type { NextConfig } from "next";
import { IMAGE_WIDTHS } from "./src/lib/constants";

// Static export: every page is built to HTML in `out/`; there is no server (hosted on Cloudflare).
const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Images are pre-sized by `npm run images` (640 / 960 / 1280 / 1920 WebP); the loader picks the right file.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: IMAGE_WIDTHS,
    imageSizes: [320],
  },
  experimental: {
    // English (/) and Portuguese (/pt) have separate root layouts, so the 404 can't come from either.
    globalNotFound: true,
  },
};

export default nextConfig;
