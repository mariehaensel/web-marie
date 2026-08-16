// Generates WebP/AVIF siblings for every JPEG/PNG in public/images/uploads/.
// Runs before every build (see package.json "prebuild") so images Marie
// uploads through the CMS get modern-format variants automatically on the
// next deploy, without anyone remembering to run this by hand.
//
// Source files stay untouched; this only adds new .webp/.avif files next to
// them, so the CMS's own image field values (which point at the original
// file) keep working unchanged as the <img> fallback.

import { readdir, stat } from "node:fs/promises";
import { extname, join } from "node:path";
import sharp from "sharp";

const uploadsDir = new URL("../public/images/uploads/", import.meta.url);

const sourceExtensions = new Set([".jpg", ".jpeg", ".png"]);

async function main() {
  const dirPath = uploadsDir.pathname;
  const entries = await readdir(dirPath);
  let generated = 0;

  for (const file of entries) {
    const ext = extname(file).toLowerCase();
    if (!sourceExtensions.has(ext)) continue;

    const sourcePath = join(dirPath, file);
    const base = file.slice(0, -ext.length);
    const webpPath = join(dirPath, `${base}.webp`);
    const avifPath = join(dirPath, `${base}.avif`);

    const sourceStat = await stat(sourcePath);

    for (const [outPath, format] of [
      [webpPath, "webp"],
      [avifPath, "avif"],
    ]) {
      const upToDate = await stat(outPath)
        .then((s) => s.mtimeMs >= sourceStat.mtimeMs)
        .catch(() => false);
      if (upToDate) continue;

      await sharp(sourcePath)[format]({ quality: 78 }).toFile(outPath);
      generated++;
    }
  }

  console.log(
    generated > 0
      ? `Generated ${generated} WebP/AVIF image variant(s).`
      : "Image variants already up to date."
  );
}

main().catch((err) => {
  console.error("Failed to generate image variants:", err);
  process.exit(1);
});
