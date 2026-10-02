// Values used in more than one place: the app, next.config.ts and the build scripts all read them from here.

export const SITE_URL = "https://thetiagogil.com";
export const SITE_NAME = "Tiago Gil";

/** The WebP widths scripts/build-images.mjs generates, and the only sizes next/image may ask for. */
export const IMAGE_WIDTHS = [640, 960, 1280, 1920];

/** The paper colour in hex, for what can't read CSS variables (browser bar, link previews, favicons). */
export const PAPER = { light: "#f8f6f3", dark: "#0f1114" };

/** Link-preview images (Open Graph). */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
