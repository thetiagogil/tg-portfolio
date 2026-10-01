import { defineConfig } from "@playwright/test";

// End-to-end and accessibility tests run against the static build in `out/` (run `npm run build` first).
// Uses the installed Google Chrome, so no browser download is needed.
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: "http://localhost:4000", channel: "chrome" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1280, height: 900 } } },
    {
      name: "phone",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: "npx serve out -l 4000",
    url: "http://localhost:4000",
    reuseExistingServer: true,
  },
});
