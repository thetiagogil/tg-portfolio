import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

/** Geist and Geist Mono as the renderer needs them (TTF files from the geist package). */
export async function loadFonts() {
  const dir = join(process.cwd(), "node_modules/geist/dist/fonts");
  const [sans, mono] = await Promise.all([
    readFile(join(dir, "geist-sans/Geist-Medium.ttf")),
    readFile(join(dir, "geist-mono/GeistMono-Regular.ttf")),
  ]);

  return [
    { name: "Geist", data: sans, weight: 500 as const, style: "normal" as const },
    { name: "Geist Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

/** A project screenshot from assets/, resized and inlined (the renderer can't read local files). */
export async function coverDataUrl(image: string): Promise<string> {
  const file = join(process.cwd(), "assets/projects", image);
  const png = await sharp(file).resize(1040).png().toBuffer();

  return `data:image/png;base64,${png.toString("base64")}`;
}
