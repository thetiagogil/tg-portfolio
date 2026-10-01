// Generates responsive WebP sizes from the source images in `assets/` into `public/images/` (git-ignored).
// Runs before `dev` and `build`; a file is only regenerated when its source is newer.
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, "assets");
const outputRoot = path.join(root, "public/images");

// Keep in sync with the image loader (Phase 3).
const WIDTHS = [640, 960, 1280, 1920];
const QUALITY = 80;

const isNewer = async (source, target) => {
  try {
    const [s, t] = await Promise.all([stat(source), stat(target)]);
    return s.mtimeMs > t.mtimeMs;
  } catch {
    return true;
  }
};

const listImages = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return listImages(full);
      return /\.(png|jpe?g|webp)$/i.test(entry.name) ? [full] : [];
    }),
  );
  return files.flat();
};

const processImage = async (source) => {
  const relative = path.relative(sourceRoot, source);
  const outputDir = path.join(outputRoot, path.dirname(relative));
  const name = path.parse(source).name;
  const { width: sourceWidth = 0 } = await sharp(source).metadata();
  let written = 0;

  await mkdir(outputDir, { recursive: true });
  for (const width of WIDTHS) {
    const target = path.join(outputDir, `${name}-${width}.webp`);
    if (!(await isNewer(source, target))) continue;
    await sharp(source)
      .resize({ width: Math.min(width, sourceWidth), withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(target);
    written += 1;
  }
  return written;
};

const startedAt = performance.now();
const sources = await listImages(sourceRoot);
let written = 0;
for (const source of sources) written += await processImage(source);
const seconds = ((performance.now() - startedAt) / 1000).toFixed(1);
console.log(`images: ${sources.length} sources, ${written} files written (${seconds}s)`);
