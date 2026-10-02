// One-off: renders the favicon PNGs from src/app/icon.svg (light version). Re-run if the monogram changes.
// Writes src/app/apple-icon.png (180, on paper) and src/app/favicon.ico (32 and 16, PNG inside an ICO).
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { PAPER } from "../src/lib/constants.ts";

const svg = (await readFile("src/app/icon.svg", "utf8")).replace(/@media[^}]*\}[^}]*\}[^}]*\}/, "");
const png = (size, pad = 0) =>
  sharp(Buffer.from(svg), { density: 600 })
    .resize(size - pad * 2, size - pad * 2)
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: PAPER.light })
    .flatten({ background: PAPER.light })
    .png()
    .toBuffer();

await writeFile("src/app/apple-icon.png", await png(180, 20));

// ICO with PNG entries: 6-byte header, a 16-byte entry per image, then the PNG data.
const images = await Promise.all(
  [32, 16].map((s) => sharp(Buffer.from(svg), { density: 600 }).resize(s, s).png().toBuffer()),
);
const header = Buffer.alloc(6 + 16 * images.length);

header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;

images.forEach((img, i) => {
  const size = [32, 16][i];
  const e = 6 + 16 * i;

  header.writeUInt8(size, e);
  header.writeUInt8(size, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(img.length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += img.length;
});
await writeFile("src/app/favicon.ico", Buffer.concat([header, ...images]));
console.log("icons: apple-icon.png, favicon.ico");
