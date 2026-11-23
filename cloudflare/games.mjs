// A build must reproduce these exact ZIPs before Wrangler can upload its assets.
export const partBytes = 16 * 1024 * 1024;
export const games = [
  { file: 'UpWeGoat.zip', bytes: 53198943, sha256: '8d929e63d52459e27b407014e901be21e33474dd31cb2a0658a44d1928586086' },
  { file: 'RockPaperCity.zip', bytes: 46190996, sha256: 'fe99b5cd826b08950ba3af335c683332c2d11798046b21c087f1701def953dde' },
];

export function partsOf(game) {
  return Array.from({ length: Math.ceil(game.bytes / partBytes) }, (_, i) => ({
    path: `/downloads/parts/${game.file}.${String(i + 1).padStart(2, '0')}.bin`,
    bytes: Math.min(partBytes, game.bytes - i * partBytes),
  }));
}
