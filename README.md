# Dean Da Dev: portfolio and business website

**The source for [dean-da-dev.co.uk](https://www.dean-da-dev.co.uk/), my developer portfolio and web development business site. It showcases live projects, services, and pricing, with a library of free developer, SEO, and business tools.**

[![Live site](https://img.shields.io/badge/live-dean--da--dev.co.uk-111827?style=flat-square)](https://www.dean-da-dev.co.uk/)
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=flat-square&logo=puppeteer&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

**Live:** [www.dean-da-dev.co.uk](https://www.dean-da-dev.co.uk/)

---

## Screenshots

<!-- Add images to docs/screenshots/ and uncomment. -->
<!--
| Home | Portfolio | Free tools |
|---|---|---|
| ![](docs/screenshots/home.png) | ![](docs/screenshots/portfolio.png) | ![](docs/screenshots/tools.png) |
-->

_Screenshots coming soon. For now, see the [live site](https://www.dean-da-dev.co.uk/)._

---

## Features

- **Portfolio** of live products, client sites, and industry demo sites,
  including [BackTheVibes](https://www.backthevibes.com/),
  [Bookrightly](https://www.bookrightly.co.uk/), the
  [AI Growth Audit](https://app.dean-da-dev.co.uk/), and more
- **Services and pricing** pages with fixed starting prices and FAQs
- **About 30 free online tools**, grouped into AI, SEO, developer, business,
  productivity, and design categories. They include a meta tag and schema
  generator, robots.txt and sitemap generators, JSON, Base64, and regex tools,
  minifiers, a QR code generator, an invoice and quote generator, cost and ROI
  calculators, and image tools.
- **Blog, resources, and templates** for small business owners
- **Local area pages** covering Stratford, Forest Gate, Wanstead, Ilford,
  Leyton, and other nearby areas
- **Discovery call booking** and a contact form, both backed by the
  [Client Acquisition Engine](https://github.com/dean1234533/coding-leads)
- **SEO first.** Every route is pre-rendered to static HTML with Puppeteer at
  build time. The site also has per-page meta tags, JSON-LD structured data, a
  sitemap, and `llms.txt` for AI answer engines.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS 4 |
| Pre-rendering | Puppeteer (`scripts/generate-static.mjs`) |
| Documents | pdf-lib and qrcode |
| Hosting | Vercel, on a custom domain |

---

## Getting started

```bash
git clone https://github.com/dean1234533/deanburt-dev.git
cd deanburt-dev
npm install
npm run dev
```

```bash
npm run build   # vite build + pre-render every route to static HTML
npm run lint
```

---

## Project structure

```
src/
  App.jsx         routes, pages and page components
  siteData.js     site config, tools, areas, blog posts, SEO metadata, route list
  ImageTools.jsx  in-browser image tools
  ContactForm.jsx, ContactModal.jsx
scripts/generate-static.mjs   pre-renders every route for SEO
public/          icons, images, robots.txt, llms.txt
```

---

## Author

Built by **Dean Da Dev**, a UK full-stack developer building web apps, websites,
and AI tools.

🌐 [dean-da-dev.co.uk](https://www.dean-da-dev.co.uk/) · 💼 [More projects](https://www.dean-da-dev.co.uk/portfolio) · 🐙 [GitHub](https://github.com/dean1234533)
