// Serve o build estático (pasta /out): npm run build && npm start
import { createServer } from 'node:http';
import { stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const root = join(import.meta.dirname, "..", "out");
const port = Number(process.env.PORT) || 5173;
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp',
  '.mp4': 'video/mp4', '.json': 'application/json',
};

createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';
  const file = normalize(join(root, path));
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  try {
    let info = await stat(file);
    if (info.isDirectory()) { path = join(path, 'index.html'); info = await stat(join(file, 'index.html')); }
    const target = normalize(join(root, path));
    const type = types[extname(target)] || 'application/octet-stream';
    // vídeos precisam de Range para avançar/voltar e para o Safari
    const range = req.headers.range && /bytes=(\d*)-(\d*)/.exec(req.headers.range);
    if (range) {
      const start = range[1] ? Number(range[1]) : 0;
      const end = range[2] ? Number(range[2]) : info.size - 1;
      res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${info.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
      createReadStream(target, { start, end }).pipe(res);
      return;
    }
    res.writeHead(200, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Length': info.size });
    createReadStream(target).pipe(res);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(port, () => console.log(`G/A em http://localhost:${port}`));
