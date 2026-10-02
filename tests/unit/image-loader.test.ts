import { describe, expect, it } from "vitest";
import imageLoader from "@/lib/image-loader";

describe("image loader", () => {
  it("picks the smallest generated width that covers the request", () => {
    expect(imageLoader({ src: "projects/voydex/voydex-1.png", width: 320 })).toBe(
      "/images/projects/voydex/voydex-1-640.webp",
    );
    expect(imageLoader({ src: "projects/voydex/voydex-1.png", width: 1280 })).toBe(
      "/images/projects/voydex/voydex-1-1280.webp",
    );
    expect(imageLoader({ src: "/portrait/tg.png", width: 3840 })).toBe(
      "/images/portrait/tg-1920.webp",
    );
  });
});
