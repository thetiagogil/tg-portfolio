// Screenshots a page with real device emulation (headless Chrome's own window can't go below ~500px wide).
// Usage: node scripts/screenshot.mjs <url> <out.png> [width=1280] [height=900] [light|dark] [full] [click-selector]
import { chromium } from "@playwright/test";

const [url, out, w = "1280", h = "900", scheme = "light", full = "", click = ""] =
  process.argv.slice(2);
if (!url || !out) {
  console.error(
    "Usage: node scripts/screenshot.mjs <url> <out.png> [width] [height] [light|dark] [full] [click]",
  );
  process.exit(1);
}
const phone = Number(w) < 768;
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({
  viewport: { width: Number(w), height: Number(h) },
  deviceScaleFactor: 2,
  colorScheme: scheme === "dark" ? "dark" : "light",
  isMobile: phone,
  hasTouch: phone,
  reducedMotion: "reduce",
});
await page.goto(url, { waitUntil: "networkidle" });
// Wait for the web fonts: the fallback font is wider and can cut labels that fit.
await page.evaluate(() => document.fonts.ready);
if (click) {
  await page.click(click);
  await page.waitForTimeout(300);
}
await page.screenshot({ path: out, fullPage: full === "full" });
const { scrollWidth, clientWidth } = await page.evaluate(() => document.documentElement);
console.log(
  `${out}${scrollWidth > clientWidth ? `  (overflows sideways: ${scrollWidth}px > ${clientWidth}px)` : ""}`,
);
await browser.close();
