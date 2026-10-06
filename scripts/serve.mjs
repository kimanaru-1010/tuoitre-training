// Máy chủ chỉ để xem local, không cần khi deploy GitHub Pages.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 4173);
const prefix = process.argv.find((arg) => arg.startsWith('--base='))?.slice(7) || '/';
if (!prefix.startsWith('/') || !prefix.endsWith('/')) throw new Error('--base cần dấu / ở đầu và cuối.');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.xml': 'application/xml; charset=utf-8' };
const server = createServer(async (request, response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400).end('Invalid path'); return; }
  if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405).end(); return; }
  if (!pathname.startsWith(prefix)) { response.writeHead(404).end('Outside site'); return; }
  const relative = pathname.slice(prefix.length);
  const target = path.resolve(root, relative);
  if ((!target.startsWith(root) && target !== path.resolve(root)) || relative.split('/').some((segment) => segment.startsWith('.')) || relative.includes('\\')) {
    response.writeHead(403).end('Forbidden'); return;
  }
  try {
    const metadata = await stat(target);
    let filename = target;
    if (metadata.isDirectory()) {
      if (!pathname.endsWith('/')) { response.writeHead(301, { location: pathname + '/' }).end(); return; }
      filename = path.join(target, 'index.html');
    }
    const content = await readFile(filename);
    response.writeHead(200, { 'Content-Type': types[path.extname(filename)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(await readFile(path.join(root, '404.html')));
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Xem website: http://127.0.0.1:${port}${prefix}`));
