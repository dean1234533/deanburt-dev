import { writeFileSync, readFileSync, mkdirSync, createReadStream, existsSync, statSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
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

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
}

// Fallback used if a headless browser isn't available in this environment:
// swaps in the correct title/description/canonical/OG tags per route without
// full content, so a build can never fail outright over the prerender step.
function injectMeta(html, route) {
  const canonicalUrl = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);

  return html
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?"\s*\/?>/s, `<meta name="description" content="${description}" />`)
    .replace(/<link rel="canonical" href=".*?"\s*\/?>/s, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:url" content=".*?"\s*\/?>/s, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta property="og:title" content=".*?"\s*\/?>/s, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content=".*?"\s*\/?>/s, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta name="twitter:title" content=".*?"\s*\/?>/s, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content=".*?"\s*\/?>/s, `<meta name="twitter:description" content="${description}" />`);
}

function writeMetaOnlyFallback(routes, baseHtml) {
  for (const route of routes) {
    if (route.path === '/') continue;
    const outDir = join(distDir, route.path.replace(/^\//, ''));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), injectMeta(baseHtml, route));
  }
  console.log(`Headless browser unavailable — wrote meta-only fallback for ${routes.length} routes.`);
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

async function launchBrowser() {
  // Vercel's build container can't run the plain `puppeteer` bundled Chrome
  // (missing system shared libs like libnspr4), so use the serverless-friendly
  // Chromium build there. Locally (mac/dev) use regular puppeteer instead,
  // since @sparticuz/chromium only ships a Linux binary.
  if (process.env.VERCEL || process.platform === 'linux') {
    const { default: chromium } = await import('@sparticuz/chromium');
    const { default: puppeteerCore } = await import('puppeteer-core');
    return puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  const { default: puppeteer } = await import('puppeteer');
  return puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
}

const routes = getAllRoutes();
writeFileSync(join(distDir, 'sitemap.xml'), buildSitemap(routes));

const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf8');
const server = await startStaticServer();

try {
  const browser = await launchBrowser();
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
  console.log(`Generated sitemap.xml (${routes.length} URLs) and fully prerendered ${allRoutes.length} routes.`);
} catch (err) {
  console.error('Full-content prerender failed:', err.message);
  writeMetaOnlyFallback(routes, baseHtml);
} finally {
  server.close();
}
