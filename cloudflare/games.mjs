import towerRelease from './tower-release.json' with { type: 'json' };

// Each entry refers to an included Windows build. An absent build has no route.
export const windowsInstallers = {
  'UpWeGoat.zip': { file: 'UpWeGoat-Windows-Setup.exe', bytes: 35517030, sha256: '2b4e4e0a215f5ab8fb6b2c39dc0e424eef7ca4acf559b263777f9b6e29bb772b' },
  'RockPaperCity.zip': { file: 'RockPaperCity-Windows-Setup.exe', bytes: 32294161, sha256: 'f0fce4868ce743e8ab284e3b4e7b850d27d26fc67b0f0683ea5b114454a21e72' },
};
export const partBytes = 16 * 1024 * 1024;
export const games = [
  { file: 'UpWeGoat.zip', bytes: 53198943, sha256: '8d929e63d52459e27b407014e901be21e33474dd31cb2a0658a44d1928586086' },
  { file: 'RockPaperCity.zip', bytes: 46190996, sha256: 'fe99b5cd826b08950ba3af335c683332c2d11798046b21c087f1701def953dde' },
  { file: 'SurfingPoseidon.zip', bytes: 66492806, sha256: '59805fa5b6a215422d94f8f08607b2d62f01926a751d2829e7b9d22e245d9e1e' },
  ...(towerRelease ? [towerRelease] : []),
  ...Object.values(windowsInstallers),
];

export function partsOf(game) {
  return Array.from({ length: Math.ceil(game.bytes / partBytes) }, (_, i) => ({
    path: `/downloads/parts/${game.file}.${String(i + 1).padStart(2, '0')}.bin`,
    bytes: Math.min(partBytes, game.bytes - i * partBytes),
  }));
}
