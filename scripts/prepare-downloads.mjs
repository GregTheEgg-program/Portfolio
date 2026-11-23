import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { games, partsOf } from '../cloudflare/games.mjs';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const limit = 25 * 1024 * 1024;
await mkdir(join(dist, 'downloads/parts'), { recursive: true });

for (const game of games) {
  const parts = partsOf(game);
  const output = part => join(dist, part.path.slice(1));
  // v10 and v11 repositories already contain the originals. Work only on
  // Vite's generated copies; leave the developer's source files untouched.
  const oldLocations = ['downloads', 'media'].map(dir => join(dist, dir, game.file));
  if (!parts.every(part => existsSync(output(part)))) {
    const original = oldLocations.find(path => existsSync(path));
    if (!original) throw new Error(`Missing parts or original file for ${game.file}`);
    const archive = await readFile(original);
    if (archive.length !== game.bytes) throw new Error(`Unexpected file size: ${game.file}`);
    let offset = 0;
    for (const part of parts) {
      await writeFile(output(part), archive.subarray(offset, offset + part.bytes));
      offset += part.bytes;
    }
  }

  const hash = createHash('sha256');
  for (const part of parts) {
    const bytes = await readFile(output(part));
    if (bytes.length !== part.bytes) throw new Error(`Wrong part size: ${part.path}`);
    hash.update(bytes);
  }
  if (hash.digest('hex') !== game.sha256) throw new Error(`Game download integrity check failed: ${game.file}`);
  for (const path of oldLocations) await rm(path, { force: true });
  console.log(`${game.file}: ${parts.length} parts verified`);
}

// Fail the build with the offending path if a future asset exceeds the cap.
async function checkDirectory(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await checkDirectory(path);
    else if ((await stat(path)).size > limit) {
      throw new Error(`Cloudflare static asset exceeds 25 MiB: ${relative(dist, path)}`);
    }
  }
}
await checkDirectory(dist);
console.log('All deployable static assets fit the 25 MiB limit.');
