import type { NextConfig } from "next";

// Static export: every page is built to HTML in `out/`; there is no server (hosted on Cloudflare).
// Images are pre-sized by `npm run images`; a custom loader that picks those sizes comes in Phase 3.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
