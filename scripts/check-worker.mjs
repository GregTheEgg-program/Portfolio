import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createTestHarness } from 'wrangler';
import { games } from '../cloudflare/games.mjs';

// Integration test against the real local Workers runtime and the built dist/.
const server = createTestHarness({ workers: [{ configPath: './wrangler.jsonc' }] });
try {
  await server.listen();
  const home = await server.fetch('/');
  assert.equal(home.status, 200);
  assert.match(await home.text(), /Gregory Sherris/);
  for (const game of games) {
    const path = '/downloads/' + game.file;
    const head = await server.fetch(path, { method: 'HEAD' });
    assert.equal(head.status, 200);
    assert.equal(head.headers.get('content-length'), String(game.bytes));
    const response = await server.fetch(path);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'application/zip');
    assert.equal(response.headers.get('content-disposition'), `attachment; filename="${game.file}"`);
    assert.equal(response.headers.get('content-length'), String(game.bytes));
    const hash = createHash('sha256');
    let bytes = 0;
    for await (const chunk of response.body) {
      bytes += chunk.byteLength;
      hash.update(chunk);
    }
    assert.equal(bytes, game.bytes);
    assert.equal(hash.digest('hex'), game.sha256);
    console.log(`${game.file}: ${bytes} downloaded bytes match the original SHA-256.`);
  }
  assert.equal((await server.fetch('/downloads/nonexistent.zip')).status, 404);
} finally {
  await server.close();
}
