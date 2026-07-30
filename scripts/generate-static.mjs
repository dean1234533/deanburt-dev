import { writeFileSync, readFileSync, mkdirSync, createReadStream, existsSync, statSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import puppeteer from 'puppeteer';
import { getAllRoutes, SITE_URL } from '../src/siteData.js';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(rootDir, 'dist');
const PORT = 4173;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

function buildSitemap(routes) {
  const urls = routes.map((route) => {
    const loc = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
    const lastmod = route.lastmod || new Date().toISOString().slice(0, 10);
    return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${route.changefreq}</changefreq><priority>${route.priority}</priority></url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

function startStaticServer() {
  const server = createServer((req, res) => {
    const cleanPath = req.url.split('?')[0];
    const filePath = join(distDir, cleanPath);
    const hasExtension = extname(cleanPath) !== '';
    const target = hasExtension && existsSync(filePath) && statSync(filePath).isFile()
      ? filePath
      : join(distDir, 'index.html');
    const type = MIME_TYPES[extname(target)] || 'application/octet-stream';
    res.setHeader('Content-Type', type);
    createReadStream(target).pipe(res);
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

const routes = getAllRoutes();
writeFileSync(join(distDir, 'sitemap.xml'), buildSitemap(routes));

const server = await startStaticServer();
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();

const allRoutes = [{ path: '/' }, ...routes];

for (const route of allRoutes) {
  const url = `http://localhost:${PORT}${route.path}`;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForSelector('footer', { timeout: 10000 }).catch(() => {});
  const html = await page.content();

  const outPath = route.path === '/'
    ? join(distDir, 'index.html')
    : join(distDir, route.path.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
}

await browser.close();
server.close();

console.log(`Generated sitemap.xml (${routes.length} URLs) and fully prerendered ${allRoutes.length} routes.`);
