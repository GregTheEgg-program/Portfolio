import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, open, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { partBytes } from '../cloudflare/games.mjs';

// Import a playable, packaged Windows build; the private Unreal project is not needed.
const root = fileURLToPath(new URL('../', import.meta.url));
const [, , input, ...extra] = process.argv;
if (!input || extra.length) {
  console.error('Usage: npm run import:tower -- "path/to/your/packaged-windows-build.zip"');
  process.exit(1);
}
const zip = await open(resolve(input), 'r');
try {
  const stat = await zip.stat();
  const { size } = stat;
  if (!stat.isFile() || size < 22) throw new Error('Supply the packaged game ZIP.');
  // Read the directory in the ZIP, without unpacking or following paths.
  async function readBytes(position, length) {
    const bytes = Buffer.allocUnsafe(length);
    let used = 0;
    while (used < length) {
      const r = await zip.read(bytes, used, length - used, position + used);
      if (!r.bytesRead) throw new Error('Unexpected end of ZIP.');
      used += r.bytesRead;
    }
    return bytes;
  }
  const trailer = await readBytes(Math.max(0, size - 65557), Math.min(size, 65557));
  let end = trailer.length - 22;
  while (end >= 0 && !(trailer.readUInt32LE(end) === 0x06054b50 &&
         end + 22 + trailer.readUInt16LE(end + 20) === trailer.length)) end--;
  if (end < 0 || trailer.readUInt32LE(end + 4) !== 0) throw new Error('Expected a complete, single-volume ZIP.');
  let entries = trailer.readUInt16LE(end + 10);
  let offset = trailer.readUInt32LE(end + 16);
  let centralSize = trailer.readUInt32LE(end + 12);
  if (entries === 0xffff || offset === 0xffffffff || centralSize === 0xffffffff) {
    const absoluteEnd = size - trailer.length + end;
    const locator = await readBytes(absoluteEnd - 20, 20);
    if (locator.readUInt32LE(0) !== 0x07064b50) throw new Error('Invalid ZIP64 directory.');
    const record = await readBytes(Number(locator.readBigUInt64LE(8)), 56);
    if (record.readUInt32LE(0) !== 0x06064b50) throw new Error('Invalid ZIP64 record.');
    entries = Number(record.readBigUInt64LE(32));
    centralSize = Number(record.readBigUInt64LE(40));
    offset = Number(record.readBigUInt64LE(48));
  }
  if (!Number.isSafeInteger(offset + centralSize) || offset + centralSize > size ||
      centralSize > 96 * 1024 * 1024) throw new Error('Invalid or unusually large ZIP directory.');
  const directory = await readBytes(offset, centralSize);
  let cursor = 0, hasExe = false, hasCookedContent = false;
  for (let i = 0; i < entries; i++) {
    if (cursor + 46 > directory.length || directory.readUInt32LE(cursor) !== 0x02014b50)
      throw new Error('Invalid ZIP entry.');
    const length = directory.readUInt16LE(cursor + 28);
    const next = cursor + 46 + length + directory.readUInt16LE(cursor + 30) + directory.readUInt16LE(cursor + 32);
    if (next > directory.length) throw new Error('Truncated ZIP directory.');
    if (directory.readUInt16LE(cursor + 8) & 1) throw new Error('Use a ZIP without a password.');
    const name = directory.toString('utf8', cursor + 46, cursor + 46 + length).replaceAll('\\', '/');
    if (/\.uproject$/i.test(name)) throw new Error('This ZIP contains the Unreal source project. Choose the packaged Windows game instead.');
    if (/\.exe$/i.test(name) && !/crashreport|prereq/i.test(name)) hasExe = true;
    if (/\.(pak|utoc|ucas|umap)$/i.test(name)) hasCookedContent = true;
    cursor = next;
  }
  if (!hasExe || !hasCookedContent) throw new Error('No packaged Unreal game was found. Include the game .exe and its cooked content in the ZIP.');

  const dest = join(root, 'public/downloads/parts');
  await mkdir(dest, { recursive: true });
  const stage = await mkdtemp(join(dest, '.tower-import-'));
  try {
    const file = 'TheTower.zip';
    const hash = createHash('sha256');
    const parts = [];
    for (let pos = 0; pos < size; pos += partBytes) {
      const data = await readBytes(pos, Math.min(partBytes, size - pos));
      hash.update(data);
      const name = file + '.' + String(parts.length + 1).padStart(2, '0') + '.bin';
      await writeFile(join(stage, name), data);
      parts.push(name);
    }
    const manifestPath = join(root, 'cloudflare/tower-release.json');
    const old = JSON.parse(await readFile(manifestPath, 'utf8'));
    const manifest = { file, bytes: size, sha256: hash.digest('hex') };
    await writeFile(join(stage, 'release.json'), JSON.stringify(manifest, null, 2) + '\n');
    for (const name of parts) await rename(join(stage, name), join(dest, name));
    await rename(join(stage, 'release.json'), manifestPath);
    if (old?.file === file) {
      for (let i = parts.length + 1; i <= Math.ceil(old.bytes / partBytes); i++)
        await rm(join(dest, file + '.' + String(i).padStart(2, '0') + '.bin'), { force: true });
    }
    console.log(`Imported ${basename(input)}: ${parts.length} parts, ${size} bytes. Commit public/downloads/parts and cloudflare/tower-release.json.`);
  } finally {
    await rm(stage, { recursive: true, force: true });
  }
} finally {
  await zip.close();
}
