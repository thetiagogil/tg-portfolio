import path from "node:path";
import { defineConfig } from "@playwright/test";

const root = path.resolve(__dirname, "..");

// End-to-end and accessibility tests against the static build in `out/` (run `npm run build` first), in the
// installed Google Chrome, so no browser download is needed.
export default defineConfig({
  testDir: ".",
  // Reports of failed runs go to a cache folder, out of the way.
  outputDir: path.join(root, "node_modules/.cache/playwright"),
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:4000",
    channel: "chrome",
    // Checks (contrast especially) see the final state, not a fade halfway through.
    reducedMotion: "reduce",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1280, height: 900 } } },
    {
      name: "phone",
      use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
    },
  ],
  webServer: {
    command: "npm run preview",
    cwd: root,
    url: "http://localhost:4000",
    reuseExistingServer: true,
  },
});
