// Production entry for Node hosts (Railway).
//
// `vite build` emits a web-standard fetch handler at dist/server/server.js,
// not an HTTP listener, so this wraps it in one. Static client assets are
// served first; anything they don't match falls through to SSR.
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, relative, isAbsolute } from 'node:path';
import { Readable } from 'node:stream';
import { fileURLToPath } from 'node:url';
import { serve } from 'srvx';
import serverEntry from './dist/server/server.js';

const CLIENT_DIR = fileURLToPath(new URL('./dist/client', import.meta.url));

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.ico': 'image/vnd.microsoft.icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
};

// Everything Vite writes to /assets/ carries a content hash in its filename,
// so it can be cached forever. The rest may change under a stable name.
const cacheControl = (pathname) =>
  pathname.startsWith('/assets/')
    ? 'public, max-age=31536000, immutable'
    : 'public, max-age=0, must-revalidate';

// srvx's own serveStatic is unusable on Windows: its traversal guard compares a
// backslash path against a dir it suffixed with "/", so nothing ever matches.
// `relative` handles both separators, which keeps `npm start` working locally.
async function serveStatic(request, next) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return next();

  const { pathname } = new URL(request.url);
  let filePath;
  try {
    filePath = join(CLIENT_DIR, decodeURIComponent(pathname));
  } catch {
    return next(); // malformed percent-encoding
  }

  const rel = relative(CLIENT_DIR, filePath);
  if (rel === '' || rel.startsWith('..') || isAbsolute(rel)) return next();

  const stats = await stat(filePath).catch(() => null);
  if (!stats?.isFile()) return next();

  const headers = {
    'Content-Length': String(stats.size),
    'Content-Type': MIME_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream',
    'Cache-Control': cacheControl(pathname),
  };

  if (request.method === 'HEAD') return new Response(null, { headers });
  return new Response(Readable.toWeb(createReadStream(filePath)), { headers });
}

serve({
  port: Number(process.env.PORT ?? 3000),
  hostname: '0.0.0.0',
  middleware: [serveStatic],
  fetch: serverEntry.fetch,
});
