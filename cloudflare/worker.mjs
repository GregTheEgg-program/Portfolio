import { games, partsOf } from './games.mjs';

async function getPart(assets, baseURL, part) {
  // Do not forward the client's cookies, conditional headers, or Range to a part.
  const response = await assets.fetch(new URL(part.path, baseURL).href, {
    headers: { 'Accept-Encoding': 'identity' },
  });
  if (response.status !== 200 || !response.body) {
    throw new Error(`Unavailable game asset: ${part.path}`);
  }
  return response.body;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const game = games.find(({ file }) => url.pathname === `/downloads/${file}`);
    if (!game) return env.ASSETS.fetch(request);
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }
    const headers = {
      'Content-Type': game.file.endsWith('.zip') ? 'application/zip' : 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'Content-Disposition': `attachment; filename="${game.file}"`,
      'Content-Length': String(game.bytes),
      'Accept-Ranges': 'none',
      'Cache-Control': 'public, max-age=3600, no-transform',
    };
    if (request.method === 'HEAD') return new Response(null, { headers });

    const [first, ...remaining] = partsOf(game);
    let firstBody;
    try {
      firstBody = await getPart(env.ASSETS, request.url, first);
    } catch {
      return new Response('Download unavailable', { status: 503 });
    }
    // FixedLengthStream lets the browser track download progress. Piping one
    // part at a time also keeps the full download out of Worker memory.
    const { readable, writable } = new FixedLengthStream(game.bytes);
    ctx.waitUntil((async () => {
      try {
        await firstBody.pipeTo(writable, { preventClose: true });
        for (const part of remaining) {
          const body = await getPart(env.ASSETS, request.url, part);
          await body.pipeTo(writable, { preventClose: true });
        }
        await writable.close();
      } catch (error) {
        await writable.abort(error).catch(() => {});
      }
    })());
    return new Response(readable, { headers });
  },
};
