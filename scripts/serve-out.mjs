// Tiny, dependency-free static server for previewing the production export (`out/`).
// Usage: npm run build && npm run preview   (optionally: PORT=4000 npm run preview)
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";

const ROOT = path.resolve("out");
const PORT = Number(process.env.PORT) || 3000;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function resolveFile(urlPath) {
  let pathname;
  try {
    pathname = decodeURIComponent(urlPath.split("?")[0]);
  } catch {
    return null;
  }
  const target = path.normalize(path.join(ROOT, pathname));
  // Block path traversal outside the export directory.
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) return null;
  if (existsSync(target) && statSync(target).isDirectory()) {
    const index = path.join(target, "index.html");
    return existsSync(index) ? index : null;
  }
  return existsSync(target) ? target : null;
}

if (!existsSync(ROOT)) {
  console.error("No `out/` directory found. Run `npm run build` first.");
  process.exit(1);
}

createServer((req, res) => {
  const file = resolveFile(req.url || "/");
  const headers = { "X-Content-Type-Options": "nosniff" };
  if (!file) {
    const notFound = path.join(ROOT, "404.html");
    res.writeHead(404, { ...headers, "Content-Type": TYPES[".html"] });
    if (existsSync(notFound)) createReadStream(notFound).pipe(res);
    else res.end("Not found");
    return;
  }
  res.writeHead(200, { ...headers, "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
  createReadStream(file).pipe(res);
}).listen(PORT, () => console.warn(`Serving out/ at http://localhost:${PORT}`));
