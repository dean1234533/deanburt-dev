import { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import './App.css';

const SITE_URL = 'https://dean-da-dev.co.uk';
const BOOKING_URL = '/DiscoveryCall';
const BOOKING_EMBED_URL = 'https://coding-leads.vercel.app/book';
const CONTACT_EMAIL = 'dean@dean-da-dev.co.uk';

const categories = [
  { slug: 'ai-tools', label: 'AI', intro: 'Prompt and content tools for faster launches.' },
  { slug: 'seo-tools', label: 'SEO', intro: 'Metadata, schema, robots, and sitemap generators.' },
  { slug: 'developer-tools', label: 'Developer', intro: 'Formatters, validators, encoders, IDs, and minifiers.' },
  { slug: 'business-tools', label: 'Business', intro: 'Calculators, invoices, quotes, and planning tools.' },
  { slug: 'productivity', label: 'Productivity', intro: 'Small utilities that remove busywork.' },
  { slug: 'design', label: 'Design', intro: 'Colour, gradient, and CSS generation tools.' },
  { slug: 'accessibility', label: 'Accessibility', intro: 'Practical checks for clearer digital experiences.' },
  { slug: 'performance', label: 'Performance', intro: 'Speed-focused helpers for leaner websites.' },
  { slug: 'security', label: 'Security', intro: 'Simple security utilities for safer projects.' },
];

const guideMap = {
  'website-cost-calculator': [
    'How much should a website cost in 2026?',
    'How to budget for a new business website',
  ],
  'website-roi-calculator': [
    'How to calculate website ROI before you build',
    'Website conversion benchmarks for UK service businesses',
  ],
  'project-cost-calculator': [
    'How to estimate a software project without guessing',
    'Fixed price vs day rate development projects',
  ],
  'freelance-quote-generator': [
    'What to include in a freelance web development quote',
    'How to compare developer quotes fairly',
  ],
  'meta-title-generator': [
    'How to write page titles that win clicks',
    'SEO title length and intent matching guide',
  ],
  'meta-description-generator': [
    'How to write meta descriptions that convert',
    'Common SEO snippet mistakes to avoid',
  ],
};

const tools = [
  tool('Website Cost Calculator', 'website-cost-calculator', 'Business', ['business-tools'], 'Estimate a realistic UK website budget based on pages, features, content, SEO, and support.', 'Plan a professional website budget in minutes with a practical cost range and next steps.'),
  tool('Website ROI Calculator', 'website-roi-calculator', 'Business', ['business-tools'], 'Forecast leads, revenue, payback period, and return on investment for a new website.', 'Work out whether a website project is likely to pay for itself.'),
  tool('AI Prompt Generator', 'ai-prompt-generator', 'AI', ['ai-tools', 'productivity'], 'Create structured prompts for business, coding, marketing, SEO, and product work.', 'Generate stronger AI prompts with role, context, constraints, and output format.'),
  tool('Meta Title Generator', 'meta-title-generator', 'SEO', ['seo-tools'], 'Generate SEO-friendly title tag ideas for service, local, product, and blog pages.', 'Create search titles designed for relevance and clicks.'),
  tool('Meta Description Generator', 'meta-description-generator', 'SEO', ['seo-tools'], 'Write concise search snippets for service pages, products, resources, and tools.', 'Generate polished meta descriptions with a clear CTA.'),
  tool('Schema Generator', 'schema-generator', 'SEO', ['seo-tools'], 'Generate JSON-LD for LocalBusiness, FAQPage, WebSite, Article, Service, and Product schema.', 'Create valid structured data for richer search results.'),
  tool('Open Graph Generator', 'open-graph-generator', 'SEO', ['seo-tools'], 'Build Open Graph and Twitter card tags for better link previews.', 'Generate social sharing metadata for any URL.'),
  tool('Robots.txt Generator', 'robots-txt-generator', 'SEO', ['seo-tools', 'developer-tools'], 'Create a clean robots.txt file with sitemap, crawl rules, and bot access settings.', 'Control crawler access with a simple robots.txt generator.'),
  tool('Sitemap Generator', 'sitemap-generator', 'SEO', ['seo-tools', 'developer-tools'], 'Generate XML sitemap entries from a list of URLs with priority and update frequency.', 'Build a valid XML sitemap for search engines.'),
  tool('Password Generator', 'password-generator', 'Security', ['security'], 'Generate strong passwords with length, symbols, numbers, and ambiguity controls.', 'Create secure passwords locally in your browser.'),
  tool('UUID Generator', 'uuid-generator', 'Developer', ['developer-tools'], 'Generate RFC 4122 UUIDs for test data, apps, databases, and API payloads.', 'Create one or many UUIDs instantly.'),
  tool('JSON Formatter', 'json-formatter', 'Developer', ['developer-tools'], 'Format messy JSON into readable, indented output.', 'Pretty-print JSON for debugging and documentation.'),
  tool('JSON Validator', 'json-validator', 'Developer', ['developer-tools'], 'Validate JSON and find parse errors quickly.', 'Check whether JSON is valid and see helpful error messages.'),
  tool('Base64 Encoder', 'base64-encoder', 'Developer', ['developer-tools'], 'Encode text to Base64 for test payloads and data URLs.', 'Convert plain text into Base64 locally.'),
  tool('Base64 Decoder', 'base64-decoder', 'Developer', ['developer-tools'], 'Decode Base64 into readable text.', 'Convert Base64 back into plain text locally.'),
  tool('Regex Tester', 'regex-tester', 'Developer', ['developer-tools'], 'Test regular expressions against sample text with flags and highlighted matches.', 'Debug regex patterns before using them in production.'),
  tool('Colour Palette Generator', 'colour-palette-generator', 'Design', ['design', 'accessibility'], 'Create accessible colour palettes from a base colour.', 'Generate brand-ready colour ramps and contrast pairings.'),
  tool('Gradient Generator', 'gradient-generator', 'Design', ['design'], 'Build CSS gradients with angle, colours, and copy-ready output.', 'Create polished CSS gradients in seconds.'),
  tool('CSS Generator', 'css-generator', 'Design', ['design', 'developer-tools'], 'Generate CSS for cards, buttons, shadows, spacing, and responsive sections.', 'Create clean CSS snippets for common UI elements.'),
  tool('HTML Minifier', 'html-minifier', 'Performance', ['performance', 'developer-tools'], 'Minify HTML by removing comments and unnecessary whitespace.', 'Compress HTML snippets for faster delivery.'),
  tool('CSS Minifier', 'css-minifier', 'Performance', ['performance', 'developer-tools'], 'Minify CSS by stripping comments, whitespace, and redundant separators.', 'Compress CSS snippets without leaving the browser.'),
  tool('JavaScript Minifier', 'javascript-minifier', 'Performance', ['performance', 'developer-tools'], 'Minify JavaScript snippets for lighter payloads.', 'Remove comments and excess spacing from JavaScript.'),
  tool('Lorem Ipsum Generator', 'lorem-ipsum-generator', 'Productivity', ['productivity', 'design'], 'Generate paragraphs, sentences, or words of placeholder copy.', 'Create clean placeholder text for layouts and prototypes.'),
  tool('QR Code Generator', 'qr-code-generator', 'Productivity', ['productivity', 'business-tools'], 'Generate downloadable QR codes for URLs, contact links, and campaigns.', 'Create crisp QR codes for print and digital use.'),
  tool('Invoice Generator', 'invoice-generator', 'Business', ['business-tools'], 'Create a professional invoice with VAT, payment terms, line items, and totals.', 'Generate a polished invoice summary for client billing.'),
  tool('Freelance Quote Generator', 'freelance-quote-generator', 'Business', ['business-tools'], 'Build a clear freelance project quote with scope, timeline, and pricing.', 'Create a professional project quote for clients.'),
  tool('Project Cost Calculator', 'project-cost-calculator', 'Business', ['business-tools'], 'Estimate project cost from complexity, team size, timeline, integrations, and risk.', 'Scope a realistic software project budget.'),
];

function tool(name, slug, primaryCategory, categoriesForTool, description, short) {
  return {
    name,
    slug,
    primaryCategory,
    categories: categoriesForTool,
    description,
    short,
    title: `${name} | Free ${primaryCategory} Tool | Dean Da Dev`,
    path: `/free-tools/${slug}`,
    faqs: [
      {
        q: `Is the ${name.toLowerCase()} free?`,
        a: `Yes. The ${name} is free to use in your browser with no sign-up required.`,
      },
      {
        q: 'Can Dean Da Dev build this properly into my website or app?',
        a: 'Yes. If you need a polished customer-facing version, Dean Da Dev can design, build, integrate, and deploy it professionally.',
      },
      {
        q: 'Does this tool store my data?',
        a: 'No. The tools run in your browser and are designed for quick calculations, generation, and formatting.',
      },
    ],
  };
}

const navItems = [
  ['Home', '/'],
  ['Services', '/services'],
  ['Portfolio', '/portfolio'],
  ['Pricing', '/pricing'],
  ['Resources', '/resources'],
  ['Free Tools', '/free-tools'],
];

function App() {
  const [path, setPath] = useState(normalizePath(window.location.pathname));

  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const route = useMemo(() => resolveRoute(path), [path]);
  usePageMeta(route.meta);

  const navigate = (href) => {
    if (href.startsWith('http') || href.startsWith('mailto:')) return;
    const next = new URL(href, window.location.origin);
    window.history.pushState({}, '', href);
    setPath(normalizePath(next.pathname));
    if (next.hash) {
      window.setTimeout(() => {
        document.querySelector(next.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-shell">
      <Header navigate={navigate} path={path} />
      <main>
        <route.Component navigate={navigate} route={route} />
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

function normalizePath(value) {
  const clean = value.replace(/\/+$/, '');
  return clean || '/';
}

function resolveRoute(path) {
  const toolMatch = tools.find((item) => item.path === path);
  if (toolMatch) {
    return {
      Component: ToolPage,
      tool: toolMatch,
      meta: metaForTool(toolMatch),
    };
  }

  const categoryMatch = categories.find((item) => `/${item.slug}` === path);
  if (categoryMatch) {
    return {
      Component: CategoryPage,
      category: categoryMatch,
      meta: {
        title: `${categoryMatch.label} Tools | Free Online Tools | Dean Da Dev`,
        description: categoryMatch.intro,
        path,
        schema: collectionSchema(categoryMatch.label, categoryTools(categoryMatch.slug)),
      },
    };
  }

  const guideMatch = resourceGuides().find((guide) => guide.path === path);
  if (guideMatch) {
    return {
      Component: GuidePage,
      guide: guideMatch,
      meta: {
        title: `${guideMatch.title} | Dean Da Dev Resources`,
        description: guideMatch.description,
        path,
        schema: articleSchema(guideMatch),
      },
    };
  }

  const routes = {
    '/': [HomePage, 'Dean Da Dev | Free Developer and Business Tools UK', 'Free developer, SEO, AI, and business tools from Dean Da Dev, a UK app, web, AI tool, and automation developer.'],
    '/about': [AboutPage, 'About Dean Da Dev | UK Web, App and AI Developer', 'Meet Dean Da Dev, a UK full-stack developer building websites, apps, AI tools, and automation for growing businesses.'],
    '/services': [ServicesPage, 'App, Web and AI Development Services UK', 'Professional apps, websites, AI tools, automation, dashboards, and business tool development services for UK businesses.'],
    '/portfolio': [PortfolioPage, 'Portfolio | Live Websites and Apps by Dean Da Dev', 'Explore live web, app, ecommerce, and AI projects built and launched by Dean Da Dev.'],
    '/pricing': [PricingPage, 'Pricing | App, Website and AI Tool Development UK', 'Clear starting prices for apps, websites, AI tools, dashboards, and business automation projects.'],
    '/DiscoveryCall': [DiscoveryCallPage, 'Book a Discovery Call | Dean Da Dev', 'Book a discovery call with Dean Da Dev to discuss a website, app, AI tool, dashboard, or automation project.'],
    '/blog': [ResourcesPage, 'Blog and Resources | Dean Da Dev', 'Practical guides for websites, SEO, app projects, AI tools, and business growth.'],
    '/resources': [ResourcesPage, 'Resources | Website, SEO and Software Guides', 'Helpful guides that support the free tools and help businesses plan better digital projects.'],
    '/free-tools': [ToolsHubPage, 'Free Developer, SEO, AI and Business Tools | Dean Da Dev', 'A premium collection of free online tools for businesses, marketers, designers, and developers.'],
    '/templates': [TemplatesPage, 'Templates | Dean Da Dev', 'Practical website, SEO, project, invoice, and quote templates for growing businesses.'],
  };

  const selected = routes[path] || routes['/'];
  return {
    Component: selected[0],
    meta: { title: selected[1], description: selected[2], path, schema: websiteSchema() },
  };
}

function usePageMeta(meta) {
  useEffect(() => {
    const title = meta.title;
    const description = meta.description;
    const url = `${SITE_URL}${meta.path === '/' ? '/' : meta.path}`;
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', `${SITE_URL}/images/1.jpg`);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', `${SITE_URL}/images/1.jpg`);
    upsertCanonical(url);
    upsertSchema(meta.schema || websiteSchema());
  }, [meta]);
}

function upsertMeta(attr, key, content) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonical(href) {
  let tag = document.head.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

function upsertSchema(schema) {
  let tag = document.head.querySelector('#page-schema');
  if (!tag) {
    tag = document.createElement('script');
    tag.id = 'page-schema';
    tag.type = 'application/ld+json';
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(schema);
}

function metaForTool(item) {
  return {
    title: item.title,
    description: item.description,
    path: item.path,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumbSchema([
          ['Home', '/'],
          ['Free Tools', '/free-tools'],
          [item.name, item.path],
        ]),
        softwareSchema(item),
        faqSchema(item.faqs),
      ],
    },
  };
}

function Header({ navigate, path }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigateFromMenu = (event, href) => {
    handleLink(event, href, navigate);
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <a className="brand" href="/" onClick={(event) => navigateFromMenu(event, '/')} aria-label="Dean Da Dev home">
        <span className="brand-mark">D</span>
        <span>Dean Da Dev</span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map(([label, href]) => (
          <a className={path === href ? 'active' : ''} href={href} onClick={(event) => handleLink(event, href, navigate)} key={href}>
            {label}
          </a>
        ))}
      </nav>
      <a className="button button-primary button-small header-cta" href={BOOKING_URL}>Book a call</a>
      <button
        className={`mobile-menu-button ${menuOpen ? 'is-open' : ''}`}
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} id="mobile-menu">
        <nav aria-label="Mobile navigation">
          {navItems.map(([label, href]) => (
            <a className={path === href ? 'active' : ''} href={href} onClick={(event) => navigateFromMenu(event, href)} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu-actions">
          <a className="button button-primary" href={BOOKING_URL}>Book a call</a>
          <a className="button button-secondary" href={`mailto:${CONTACT_EMAIL}`}>Request a quote</a>
        </div>
      </div>
    </header>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="brand footer-brand"><span className="brand-mark">D</span><span>Dean Da Dev</span></div>
          <p>Free tools for useful traffic. Professional builds for businesses that want the real thing shipped properly.</p>
        </div>
        <div>
          <h3>Platform</h3>
          {['/free-tools', '/resources', '/services', '/pricing'].map((href) => (
            <a href={href} onClick={(event) => handleLink(event, href, navigate)} key={href}>{labelForPath(href)}</a>
          ))}
        </div>
        <div>
          <h3>Tool Categories</h3>
          {categories.slice(0, 6).map((category) => (
            <a href={`/${category.slug}`} onClick={(event) => handleLink(event, `/${category.slug}`, navigate)} key={category.slug}>{category.label}</a>
          ))}
        </div>
        <div>
          <h3>Hire Dean</h3>
          <a href={BOOKING_URL}>Book a discovery call</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>Request a quote</a>
          <a href="/portfolio" onClick={(event) => handleLink(event, '/portfolio', navigate)}>View portfolio</a>
          <a href="https://www.instagram.com/deandadev123" target="_blank" rel="noopener noreferrer" aria-label="Dean Da Dev on Instagram">Instagram @deandadev123</a>
        </div>
      </div>
      <p className="footer-meta">© {new Date().getFullYear()} Dean Da Dev. UK app development, web development, AI tools, dashboards, and automation.</p>
    </footer>
  );
}

function handleLink(event, href, navigate) {
  if (href.startsWith('http') || href.startsWith('mailto:')) return;
  if (href.startsWith('#')) {
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  event.preventDefault();
  navigate(href);
}

function labelForPath(path) {
  return path.replace('/', '').split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ') || 'Home';
}

function HomePage({ navigate }) {
  return (
    <>
      <Hero
        eyebrow="Dean Da Dev"
        title="Apps, websites, AI tools, and automations built to win business."
        copy="UK full-stack developer. 6 live apps shipped. I handle everything — design, build, deployment, and App Store submission — without agency prices."
        primary={['Book a discovery call', BOOKING_URL]}
        secondary={['View live work', '/portfolio']}
        navigate={navigate}
      />
      <SocialProofBanner />
      <Section>
        <SectionHeader eyebrow="What I build" title="A practical build partner for small businesses and founders." copy="Start lean, validate quickly, and ship something real: a website that gets enquiries, an app MVP, or a focused tool that saves time." />
        <div className="value-grid">
          {[
            ['Websites from £399', 'Professional, mobile-optimised websites with clear messaging, contact flows, and SEO foundations.'],
            ['App MVPs from £4,999', 'Focused app builds for booking flows, customer portals, marketplaces, AI products, and early-stage ideas.'],
            ['AI tools from £2,999', 'Prompt systems, dashboards, automations, intake forms, and tools that solve one clear business problem.'],
          ].map(([title, copy]) => (
            <div className="value-card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
        <div className="center-gap">
          <Button href="/pricing" navigate={navigate}>Explore pricing</Button>
        </div>
      </Section>
      <ServicesSnapshot />
      <Section tone="dark">
        <SectionHeader eyebrow="Free Tools" title="Use the tools. Hire me when you need it built properly." copy="The tools hub is there to help you plan better projects. The portfolio shows what happens when the real build is commissioned." />
        <ToolGrid tools={tools.slice(0, 6)} navigate={navigate} />
        <div className="center-gap">
          <Button href="/free-tools" navigate={navigate}>Open the Tools Hub</Button>
        </div>
      </Section>
      <LeadCTA />
    </>
  );
}

function Hero({ eyebrow, title, copy, primary, secondary, navigate }) {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-content">
        <div className="founder-chip">
          <img src="/images/dean.png" alt="Dean Burt, founder of Dean Da Dev" />
          <span>Built by Dean Burt</span>
        </div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-copy">{copy}</p>
        <div className="button-row">
          <Button href={primary[1]} navigate={navigate}>{primary[0]}</Button>
          <Button href={secondary[1]} variant="secondary" navigate={navigate}>{secondary[0]}</Button>
        </div>
        <div className="trust-strip" aria-label="Key credentials">
          {['6 live apps shipped', 'Google Play publisher', 'UK-based developer', '4–8 week delivery'].map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
    </section>
  );
}

function Section({ children, tone = 'light', className = '' }) {
  return <section className={`section section-${tone} ${className}`}><div className="section-inner">{children}</div></section>;
}

function SectionHeader({ eyebrow, title, copy }) {
  return (
    <div className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function Button({ href, children, variant = 'primary', navigate }) {
  return <a className={`button button-${variant}`} href={href} onClick={(event) => navigate && handleLink(event, href, navigate)}>{children}</a>;
}

function CategoryGrid({ navigate }) {
  return (
    <div className="category-grid">
      {categories.map((category) => {
        const count = categoryTools(category.slug).length;
        return (
          <a className="category-card" href={`/${category.slug}`} onClick={(event) => handleLink(event, `/${category.slug}`, navigate)} key={category.slug}>
            <span>{category.label}</span>
            <p>{category.intro}</p>
            <strong>{count || 'Coming'} tools</strong>
          </a>
        );
      })}
    </div>
  );
}

function ToolGrid({ tools: items, navigate }) {
  return (
    <div className="tool-grid">
      {items.map((item) => (
        <a className="tool-card" href={item.path} onClick={(event) => handleLink(event, item.path, navigate)} key={item.slug}>
          <span>{item.primaryCategory}</span>
          <h3>{item.name}</h3>
          <p>{item.short}</p>
          <strong>Open tool</strong>
        </a>
      ))}
    </div>
  );
}

function ToolFilter({ activeCategory, onChange }) {
  const options = [{ slug: 'all', label: 'All', count: tools.length }, ...categories.map((category) => ({
    ...category,
    count: categoryTools(category.slug).length,
  }))];

  return (
    <div className="tool-filter" aria-label="Filter tools by category">
      {options.map((option) => (
        <button
          className={activeCategory === option.slug ? 'active' : ''}
          type="button"
          onClick={() => onChange(option.slug)}
          key={option.slug}
          aria-pressed={activeCategory === option.slug}
          aria-label={`Show ${option.label} tools`}
        >
          <span>{option.label}</span>
          <strong>{option.count}</strong>
        </button>
      ))}
    </div>
  );
}

function ToolsHubPage({ navigate }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredTools = activeCategory === 'all' ? tools : categoryTools(activeCategory);
  const activeLabel = activeCategory === 'all' ? 'All Tools' : `${categories.find((category) => category.slug === activeCategory)?.label} Tools`;

  return (
    <>
      <Hero
        eyebrow="Free Tools"
        title="Free AI, SEO, developer, and business tools for sharper projects."
        copy="Use the tools, learn from the guides, and bring Dean Da Dev in when you need a production-grade build."
        primary={['Start with calculators', '/business-tools']}
        secondary={['Book a discovery call', BOOKING_URL]}
        navigate={navigate}
      />
      <Section>
        <SectionHeader eyebrow="Categories" title="Choose the job you need done." copy="Each category is built around search intent, practical utility, and a natural next step into professional services." />
        <CategoryGrid navigate={navigate} />
      </Section>
      <Section tone="dark">
        <SectionHeader eyebrow={activeLabel} title="Filter the tools by what you need." copy="Choose one category at a time so the grid stays focused on the job you are trying to do." />
        <ToolFilter activeCategory={activeCategory} onChange={setActiveCategory} />
        <ToolGrid tools={filteredTools} navigate={navigate} />
      </Section>
    </>
  );
}

function CategoryPage({ route, navigate }) {
  const items = categoryTools(route.category.slug);
  return (
    <>
      <Hero
        eyebrow={`${route.category.label} Tools`}
        title={`Free ${route.category.label.toLowerCase()} tools for better digital work.`}
        copy={route.category.intro}
        primary={['View tools', '#tools']}
        secondary={['Request a custom tool', BOOKING_URL]}
        navigate={navigate}
      />
      <Section className="anchor-section">
        <div id="tools" />
        <SectionHeader eyebrow="Tools" title={`${items.length || 'Selected'} useful ${route.category.label.toLowerCase()} tools.`} copy="Built to solve real tasks and point visitors toward professional help when they need it." />
        {items.length ? <ToolGrid tools={items} navigate={navigate} /> : <UtilityPanel><p>This category is reserved for future complete tools. Current phase-one tools are available in the hub.</p><Button href="/free-tools" navigate={navigate}>Open Tools Hub</Button></UtilityPanel>}
      </Section>
    </>
  );
}

function ToolPage({ route, navigate }) {
  const item = route.tool;
  const related = relatedTools(item);
  return (
    <>
      <section className="tool-hero">
        <div className="tool-hero-inner">
          <Breadcrumbs items={[['Home', '/'], ['Free Tools', '/free-tools'], [item.name, item.path]]} navigate={navigate} />
          <p className="eyebrow">{item.primaryCategory} Tool</p>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <div className="button-row">
            <Button href="#tool">Use the tool</Button>
            <Button href={BOOKING_URL} variant="secondary">Hire Dean Da Dev</Button>
          </div>
        </div>
      </section>
      <Section className="tool-section">
        <div id="tool" />
        <div className="tool-layout">
          <ToolWorkspace slug={item.slug} />
          <aside className="tool-aside">
            <div className="mini-panel">
              <h2>Need this built professionally?</h2>
              <p>Dean Da Dev can turn calculators, generators, dashboards, automations, and AI workflows into polished tools for your own business.</p>
              <Button href={BOOKING_URL}>Book a discovery call</Button>
            </div>
            <div className="mini-panel">
              <h2>Best for</h2>
              <ul>
                <li>Planning a new website or app</li>
                <li>Improving SEO and conversions</li>
                <li>Creating internal business tools</li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
      <Section tone="dark">
        <SectionHeader eyebrow="Related Tools" title="Keep going with the next useful task." copy="Internal links help visitors solve more problems and help search engines understand the platform." />
        <ToolGrid tools={related} navigate={navigate} />
      </Section>
      <Section>
        <SectionHeader eyebrow="FAQ" title={`Questions about the ${item.name.toLowerCase()}.`} />
        <FAQList faqs={item.faqs} />
      </Section>
      <LeadCTA />
    </>
  );
}

function Breadcrumbs({ items, navigate }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumbs">
      {items.map(([label, href], index) => (
        <span key={href}>
          {index < items.length - 1 ? <a href={href} onClick={(event) => handleLink(event, href, navigate)}>{label}</a> : label}
        </span>
      ))}
    </nav>
  );
}

function ToolWorkspace({ slug }) {
  const common = { panelClass: 'tool-panel' };
  const componentMap = {
    'website-cost-calculator': <WebsiteCostCalculator {...common} />,
    'website-roi-calculator': <WebsiteRoiCalculator {...common} />,
    'ai-prompt-generator': <PromptGenerator {...common} />,
    'meta-title-generator': <MetaTitleGenerator {...common} />,
    'meta-description-generator': <MetaDescriptionGenerator {...common} />,
    'schema-generator': <SchemaGenerator {...common} />,
    'open-graph-generator': <OpenGraphGenerator {...common} />,
    'robots-txt-generator': <RobotsGenerator {...common} />,
    'sitemap-generator': <SitemapGenerator {...common} />,
    'password-generator': <PasswordGenerator {...common} />,
    'uuid-generator': <UuidGenerator {...common} />,
    'json-formatter': <JsonFormatter {...common} mode="format" />,
    'json-validator': <JsonFormatter {...common} mode="validate" />,
    'base64-encoder': <Base64Tool {...common} mode="encode" />,
    'base64-decoder': <Base64Tool {...common} mode="decode" />,
    'regex-tester': <RegexTester {...common} />,
    'colour-palette-generator': <PaletteGenerator {...common} />,
    'gradient-generator': <GradientGenerator {...common} />,
    'css-generator': <CssGenerator {...common} />,
    'html-minifier': <Minifier {...common} type="html" />,
    'css-minifier': <Minifier {...common} type="css" />,
    'javascript-minifier': <Minifier {...common} type="js" />,
    'lorem-ipsum-generator': <LoremGenerator {...common} />,
    'qr-code-generator': <QrGenerator {...common} />,
    'invoice-generator': <InvoiceGenerator {...common} />,
    'freelance-quote-generator': <QuoteGenerator {...common} />,
    'project-cost-calculator': <ProjectCostCalculator {...common} />,
  };
  return componentMap[slug] || null;
}

function UtilityPanel({ children }) {
  return <div className="tool-panel">{children}</div>;
}

function Field({ label, children }) {
  return <label className="field"><span>{label}</span>{children}</label>;
}

function ResultBox({ title, children }) {
  return <div className="result-box"><h3>{title}</h3>{children}</div>;
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  return (
    <button className="copy-button" type="button" onClick={() => {
      navigator.clipboard.writeText(String(value));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }}>{copied ? 'Copied' : 'Copy'}</button>
  );
}

function WebsiteCostCalculator() {
  const [pages, setPages] = useState(4);
  const [complexity, setComplexity] = useState(1);
  const [features, setFeatures] = useState(['cms']);
  const [content, setContent] = useState(true);
  const [seo, setSeo] = useState(true);
  const base = 275 + pages * 30;
  const featureCost = features.reduce((sum, feature) => sum + ({ cms: 250, booking: 300, ecommerce: 850, membership: 750, automation: 650 }[feature] || 0), 0);
  const total = Math.max(399, Math.round((base + featureCost + (content ? 300 : 0) + (seo ? 350 : 0)) * complexity));
  return (
    <div className="tool-panel">
      <div className="form-grid">
        <Field label="Number of pages"><input type="number" min="1" value={pages} onChange={(e) => setPages(Number(e.target.value))} /></Field>
        <Field label="Complexity"><select value={complexity} onChange={(e) => setComplexity(Number(e.target.value))}><option value="1">Simple</option><option value="1.2">Professional</option><option value="1.55">Advanced</option></select></Field>
      </div>
      <CheckGroup label="Features" options={[['cms', 'CMS'], ['booking', 'Booking'], ['ecommerce', 'Ecommerce'], ['membership', 'Membership'], ['automation', 'Automation']]} values={features} setValues={setFeatures} />
      <div className="switch-row"><Toggle checked={content} setChecked={setContent} label="Copywriting/content support" /><Toggle checked={seo} setChecked={setSeo} label="Technical SEO setup" /></div>
      <ResultBox title="Estimated website budget"><p className="big-result">£{money(total)} - £{money(Math.round(total * 1.25))}</p><p>Websites can start from £399 for a focused professional build. Bigger scopes need a fixed plan around pages, integrations, launch date, and support.</p></ResultBox>
    </div>
  );
}

function WebsiteRoiCalculator() {
  const [visitors, setVisitors] = useState(1200);
  const [conversion, setConversion] = useState(3);
  const [leadValue, setLeadValue] = useState(600);
  const [closeRate, setCloseRate] = useState(25);
  const [cost, setCost] = useState(4500);
  const monthlyLeads = visitors * conversion / 100;
  const monthlyRevenue = monthlyLeads * closeRate / 100 * leadValue;
  const annualRevenue = monthlyRevenue * 12;
  const roi = ((annualRevenue - cost) / cost) * 100;
  const payback = monthlyRevenue > 0 ? cost / monthlyRevenue : 0;
  return (
    <div className="tool-panel">
      <div className="form-grid">
        <Field label="Monthly visitors"><input type="number" value={visitors} onChange={(e) => setVisitors(Number(e.target.value))} /></Field>
        <Field label="Website conversion %"><input type="number" value={conversion} onChange={(e) => setConversion(Number(e.target.value))} /></Field>
        <Field label="Average customer value (£)"><input type="number" value={leadValue} onChange={(e) => setLeadValue(Number(e.target.value))} /></Field>
        <Field label="Lead close rate %"><input type="number" value={closeRate} onChange={(e) => setCloseRate(Number(e.target.value))} /></Field>
        <Field label="Project cost (£)"><input type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))} /></Field>
      </div>
      <ResultBox title="Projected return"><p className="big-result">£{money(annualRevenue)} annual revenue</p><p>{Math.round(monthlyLeads)} leads per month, £{money(monthlyRevenue)} monthly revenue, {Math.round(roi)}% first-year ROI, and payback in {payback.toFixed(1)} months.</p></ResultBox>
    </div>
  );
}

function PromptGenerator() {
  const [role, setRole] = useState('senior full-stack developer');
  const [task, setTask] = useState('audit my website and suggest conversion improvements');
  const [audience, setAudience] = useState('UK small business owners');
  const [format, setFormat] = useState('prioritised action plan');
  const output = `Act as a ${role}.\n\nTask: ${task}.\nAudience/context: ${audience}.\n\nRequirements:\n- Ask clarifying questions only if essential.\n- Be practical, specific, and commercially aware.\n- Prioritise high-impact recommendations first.\n- Include risks, trade-offs, and next steps.\n\nReturn the answer as a ${format}.`;
  return <GeneratorPanel fields={[['Role', role, setRole], ['Task', task, setTask], ['Audience or context', audience, setAudience], ['Output format', format, setFormat]]} title="Generated prompt" output={output} />;
}

function MetaTitleGenerator() {
  const [keyword, setKeyword] = useState('web developer UK');
  const [brand, setBrand] = useState('Dean Da Dev');
  const [intent, setIntent] = useState('Hire an expert');
  const titles = [
    `${keyword} | ${brand}`,
    `${keyword}: ${intent} | ${brand}`,
    `Professional ${keyword} for Growing Businesses`,
    `${brand} - ${keyword} and Software Services`,
    `Need a ${keyword}? Build It Properly with ${brand}`,
  ];
  return <GeneratorPanel fields={[['Primary keyword', keyword, setKeyword], ['Brand', brand, setBrand], ['Search intent', intent, setIntent]]} title="Title ideas" output={titles.join('\n')} />;
}

function MetaDescriptionGenerator() {
  const [page, setPage] = useState('web development services');
  const [benefit, setBenefit] = useState('fast, premium websites that generate leads');
  const [cta, setCta] = useState('Book a free discovery call');
  const output = `Get ${benefit} with Dean Da Dev's ${page}. Clear scope, modern UX, technical SEO, and production-ready delivery. ${cta}.`;
  return <GeneratorPanel fields={[['Page topic', page, setPage], ['Main benefit', benefit, setBenefit], ['CTA', cta, setCta]]} title="Meta description" output={output.slice(0, 160)} />;
}

function SchemaGenerator() {
  const [type, setType] = useState('LocalBusiness');
  const [name, setName] = useState('Dean Da Dev');
  const [url, setUrl] = useState(SITE_URL);
  const [description, setDescription] = useState('UK app development, web development, AI tool, and automation services.');
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    url,
    description,
    ...(type === 'FAQPage' ? { mainEntity: [{ '@type': 'Question', name: 'Can you build this professionally?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, Dean Da Dev can design, build, and deploy production-ready tools and websites.' } }] } : {}),
  };
  return <GeneratorPanel select={[type, setType, ['LocalBusiness', 'FAQPage', 'WebSite', 'Article', 'Service', 'Product']]} fields={[['Name', name, setName], ['URL', url, setUrl], ['Description', description, setDescription]]} title="JSON-LD" output={JSON.stringify(schema, null, 2)} />;
}

function OpenGraphGenerator() {
  const [title, setTitle] = useState('Dean Da Dev - Free Developer Tools');
  const [description, setDescription] = useState('Free AI, SEO, developer, and business tools for better websites and software projects.');
  const [url, setUrl] = useState(SITE_URL);
  const [image, setImage] = useState(`${SITE_URL}/images/1.jpg`);
  const output = `<meta property="og:type" content="website">\n<meta property="og:title" content="${escapeHtml(title)}">\n<meta property="og:description" content="${escapeHtml(description)}">\n<meta property="og:url" content="${url}">\n<meta property="og:image" content="${image}">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${escapeHtml(title)}">\n<meta name="twitter:description" content="${escapeHtml(description)}">\n<meta name="twitter:image" content="${image}">`;
  return <GeneratorPanel fields={[['Title', title, setTitle], ['Description', description, setDescription], ['URL', url, setUrl], ['Image URL', image, setImage]]} title="Social metadata" output={output} />;
}

function RobotsGenerator() {
  const [domain, setDomain] = useState(SITE_URL);
  const [allowAll, setAllowAll] = useState(true);
  const [disallow, setDisallow] = useState('/admin\n/private');
  const output = `User-agent: *\n${allowAll ? 'Allow: /' : disallow.split('\n').filter(Boolean).map((line) => `Disallow: ${line}`).join('\n')}\n\nSitemap: ${domain.replace(/\/$/, '')}/sitemap.xml`;
  return <div className="tool-panel"><Field label="Site URL"><input value={domain} onChange={(e) => setDomain(e.target.value)} /></Field><Toggle checked={allowAll} setChecked={setAllowAll} label="Allow all public pages" />{!allowAll && <Field label="Disallow paths"><textarea value={disallow} onChange={(e) => setDisallow(e.target.value)} /></Field>}<ResultBox title="robots.txt"><pre>{output}</pre><CopyButton value={output} /></ResultBox></div>;
}

function SitemapGenerator() {
  const [urls, setUrls] = useState(`${SITE_URL}/\n${SITE_URL}/free-tools\n${SITE_URL}/services`);
  const [freq, setFreq] = useState('weekly');
  const [priority, setPriority] = useState('0.8');
  const output = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.split('\n').filter(Boolean).map((url) => `  <url>\n    <loc>${escapeHtml(url.trim())}</loc>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`).join('\n')}\n</urlset>`;
  return <GeneratorPanel select={[freq, setFreq, ['daily', 'weekly', 'monthly', 'yearly']]} fields={[['URLs, one per line', urls, setUrls, 'textarea'], ['Priority', priority, setPriority]]} title="XML sitemap" output={output} />;
}

function PasswordGenerator() {
  const [length, setLength] = useState(18);
  const [symbols, setSymbols] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [password, setPassword] = useState(() => makePassword(18, true, true));
  return <div className="tool-panel"><div className="form-grid"><Field label="Length"><input type="number" min="8" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))} /></Field></div><div className="switch-row"><Toggle checked={symbols} setChecked={setSymbols} label="Symbols" /><Toggle checked={numbers} setChecked={setNumbers} label="Numbers" /></div><button className="button button-primary" type="button" onClick={() => setPassword(makePassword(length, symbols, numbers))}>Generate password</button><ResultBox title="Password"><p className="mono-result">{password}</p><CopyButton value={password} /></ResultBox></div>;
}

function UuidGenerator() {
  const [count, setCount] = useState(5);
  const values = useMemo(() => Array.from({ length: count }, () => crypto.randomUUID()).join('\n'), [count]);
  const [output, setOutput] = useState(values);
  return <div className="tool-panel"><Field label="How many UUIDs?"><input type="number" min="1" max="100" value={count} onChange={(e) => setCount(Number(e.target.value))} /></Field><button className="button button-primary" type="button" onClick={() => setOutput(Array.from({ length: count }, () => crypto.randomUUID()).join('\n'))}>Generate UUIDs</button><ResultBox title="UUIDs"><pre>{output}</pre><CopyButton value={output} /></ResultBox></div>;
}

function JsonFormatter({ mode }) {
  const [input, setInput] = useState('{"name":"Dean Da Dev","tools":["SEO","AI","Developer"]}');
  let output;
  let valid = true;
  try { output = mode === 'format' ? JSON.stringify(JSON.parse(input), null, 2) : 'Valid JSON'; } catch (error) { valid = false; output = error.message; }
  return <div className="tool-panel"><Field label="JSON input"><textarea value={input} onChange={(e) => setInput(e.target.value)} /></Field><ResultBox title={valid ? (mode === 'format' ? 'Formatted JSON' : 'Validation result') : 'JSON error'}><pre>{output}</pre>{valid && <CopyButton value={output} />}</ResultBox></div>;
}

function Base64Tool({ mode }) {
  const [input, setInput] = useState(mode === 'encode' ? 'Dean Da Dev' : 'RGVhbiBEYSBEZXY=');
  let output;
  try { output = mode === 'encode' ? btoa(unescape(encodeURIComponent(input))) : decodeURIComponent(escape(atob(input))); } catch { output = 'Invalid Base64 input'; }
  return <GeneratorPanel fields={[[mode === 'encode' ? 'Text to encode' : 'Base64 to decode', input, setInput, 'textarea']]} title={mode === 'encode' ? 'Base64 output' : 'Decoded text'} output={output} />;
}

function RegexTester() {
  const [pattern, setPattern] = useState('\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b');
  const [flags, setFlags] = useState('gi');
  const [text, setText] = useState('Email dean@example.com or hello@dean-da-dev.co.uk for a quote.');
  let matches = [];
  let error = '';
  try { matches = [...text.matchAll(new RegExp(pattern, flags))].map((match) => match[0]); } catch (err) { error = err.message; }
  return <div className="tool-panel"><div className="form-grid"><Field label="Pattern"><input value={pattern} onChange={(e) => setPattern(e.target.value)} /></Field><Field label="Flags"><input value={flags} onChange={(e) => setFlags(e.target.value)} /></Field></div><Field label="Sample text"><textarea value={text} onChange={(e) => setText(e.target.value)} /></Field><ResultBox title="Matches">{error ? <p>{error}</p> : <><p>{matches.length} matches found.</p><pre>{matches.join('\n') || 'No matches yet.'}</pre></>} </ResultBox></div>;
}

function PaletteGenerator() {
  const [base, setBase] = useState('#38bdf8');
  const palette = makePalette(base);
  return <div className="tool-panel"><Field label="Base colour"><input type="color" value={base} onChange={(e) => setBase(e.target.value)} /></Field><div className="swatch-grid">{palette.map((color) => <div className="swatch" key={color} style={{ background: color }}><span>{color}</span></div>)}</div><ResultBox title="CSS variables"><pre>{palette.map((color, i) => `--brand-${(i + 1) * 100}: ${color};`).join('\n')}</pre><CopyButton value={palette.map((color, i) => `--brand-${(i + 1) * 100}: ${color};`).join('\n')} /></ResultBox></div>;
}

function GradientGenerator() {
  const [from, setFrom] = useState('#2563eb');
  const [to, setTo] = useState('#06b6d4');
  const [angle, setAngle] = useState(135);
  const css = `background: linear-gradient(${angle}deg, ${from}, ${to});`;
  return <div className="tool-panel"><div className="form-grid"><Field label="From"><input type="color" value={from} onChange={(e) => setFrom(e.target.value)} /></Field><Field label="To"><input type="color" value={to} onChange={(e) => setTo(e.target.value)} /></Field><Field label="Angle"><input type="number" value={angle} onChange={(e) => setAngle(Number(e.target.value))} /></Field></div><div className="gradient-preview" style={{ background: `linear-gradient(${angle}deg, ${from}, ${to})` }} /><ResultBox title="CSS"><pre>{css}</pre><CopyButton value={css} /></ResultBox></div>;
}

function CssGenerator() {
  const [type, setType] = useState('button');
  const snippets = {
    button: `.button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 44px;\n  padding: 0 18px;\n  border-radius: 12px;\n  background: linear-gradient(135deg, #2563eb, #06b6d4);\n  color: #ffffff;\n  font-weight: 700;\n}`,
    card: `.card {\n  border: 1px solid rgba(255,255,255,.1);\n  border-radius: 8px;\n  background: #101827;\n  box-shadow: 0 24px 80px rgba(0,0,0,.24);\n  padding: 24px;\n}`,
    section: `.section {\n  width: 100%;\n  padding: clamp(64px, 10vw, 120px) clamp(20px, 5vw, 56px);\n}\n.section-inner {\n  max-width: 1160px;\n  margin: 0 auto;\n}`,
  };
  return <div className="tool-panel"><Field label="Component"><select value={type} onChange={(e) => setType(e.target.value)}><option value="button">Button</option><option value="card">Card</option><option value="section">Section</option></select></Field><ResultBox title="Generated CSS"><pre>{snippets[type]}</pre><CopyButton value={snippets[type]} /></ResultBox></div>;
}

function Minifier({ type }) {
  const samples = {
    html: '<section>\n  <!-- comment -->\n  <h1>Dean Da Dev</h1>\n  <p>Free tools</p>\n</section>',
    css: '.card {\n  color: white;\n  padding: 24px;\n}\n/* comment */',
    js: 'function hello(name) {\n  // comment\n  return `Hello ${name}`;\n}',
  };
  const [input, setInput] = useState(samples[type]);
  const output = minify(input, type);
  return <GeneratorPanel fields={[[`${type.toUpperCase()} input`, input, setInput, 'textarea']]} title="Minified output" output={output} />;
}

function LoremGenerator() {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState('paragraphs');
  const output = makeLorem(count, unit);
  return <div className="tool-panel"><div className="form-grid"><Field label="Amount"><input type="number" min="1" max="20" value={count} onChange={(e) => setCount(Number(e.target.value))} /></Field><Field label="Unit"><select value={unit} onChange={(e) => setUnit(e.target.value)}><option value="paragraphs">Paragraphs</option><option value="sentences">Sentences</option><option value="words">Words</option></select></Field></div><ResultBox title="Generated copy"><pre>{output}</pre><CopyButton value={output} /></ResultBox></div>;
}

function QrGenerator() {
  const [value, setValue] = useState(SITE_URL);
  const [dataUrl, setDataUrl] = useState('');
  useEffect(() => { QRCode.toDataURL(value || ' ', { width: 320, margin: 2, color: { dark: '#020617', light: '#ffffff' } }).then(setDataUrl); }, [value]);
  return <div className="tool-panel"><Field label="QR code content"><input value={value} onChange={(e) => setValue(e.target.value)} /></Field>{dataUrl && <div className="qr-wrap"><img src={dataUrl} alt="Generated QR code" /><a className="button button-primary" href={dataUrl} download="dean-da-dev-qr.png">Download PNG</a></div>}</div>;
}

function InvoiceGenerator() {
  const [client, setClient] = useState('Client Ltd');
  const [rate, setRate] = useState(650);
  const [days, setDays] = useState(5);
  const [vat, setVat] = useState(20);
  const subtotal = rate * days;
  const tax = subtotal * vat / 100;
  const total = subtotal + tax;
  const output = `Invoice\nClient: ${client}\nService: Web development and delivery\nQuantity: ${days} days\nRate: £${money(rate)}\nSubtotal: £${money(subtotal)}\nVAT (${vat}%): £${money(tax)}\nTotal due: £${money(total)}\nPayment terms: 7 days`;
  return <GeneratorPanel fields={[['Client', client, setClient], ['Day rate (£)', rate, setRate, 'number'], ['Days', days, setDays, 'number'], ['VAT %', vat, setVat, 'number']]} title="Invoice summary" output={output} />;
}

function QuoteGenerator() {
  const [project, setProject] = useState('Business website rebuild');
  const [scope, setScope] = useState('Discovery, UX design, responsive build, CMS setup, technical SEO, launch support');
  const [price, setPrice] = useState(4800);
  const [timeline, setTimeline] = useState('4-6 weeks');
  const output = `Project quote: ${project}\n\nScope:\n${scope.split(',').map((item) => `- ${item.trim()}`).join('\n')}\n\nTimeline: ${timeline}\nInvestment: £${money(Number(price))}\n\nNext step: confirm scope, milestones, payment schedule, and launch date.`;
  return <GeneratorPanel fields={[['Project', project, setProject], ['Scope items, comma separated', scope, setScope, 'textarea'], ['Price (£)', price, setPrice, 'number'], ['Timeline', timeline, setTimeline]]} title="Freelance quote" output={output} />;
}

function ProjectCostCalculator() {
  const [weeks, setWeeks] = useState(6);
  const [people, setPeople] = useState(1);
  const [rate, setRate] = useState(650);
  const [risk, setRisk] = useState(15);
  const [integrations, setIntegrations] = useState(2);
  const subtotal = weeks * 5 * people * rate + integrations * 750;
  const total = subtotal * (1 + risk / 100);
  return <div className="tool-panel"><div className="form-grid"><Field label="Weeks"><input type="number" value={weeks} onChange={(e) => setWeeks(Number(e.target.value))} /></Field><Field label="Team size"><input type="number" value={people} onChange={(e) => setPeople(Number(e.target.value))} /></Field><Field label="Day rate (£)"><input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></Field><Field label="Integrations"><input type="number" value={integrations} onChange={(e) => setIntegrations(Number(e.target.value))} /></Field><Field label="Risk buffer %"><input type="number" value={risk} onChange={(e) => setRisk(Number(e.target.value))} /></Field></div><ResultBox title="Estimated project budget"><p className="big-result">£{money(total)}</p><p>Includes delivery time, integrations, and a {risk}% buffer for unknowns. Use this as a planning range, then scope properly before committing.</p></ResultBox></div>;
}

function GeneratorPanel({ fields, title, output, select }) {
  return (
    <div className="tool-panel">
      {select && <Field label="Schema type"><select value={select[0]} onChange={(e) => select[1](e.target.value)}>{select[2].map((value) => <option key={value} value={value}>{value}</option>)}</select></Field>}
      <div className="form-grid">
        {fields.map(([label, value, setter, kind = 'text']) => (
          <Field label={label} key={label}>
            {kind === 'textarea' ? <textarea value={value} onChange={(e) => setter(e.target.value)} /> : <input type={kind} value={value} onChange={(e) => setter(kind === 'number' ? Number(e.target.value) : e.target.value)} />}
          </Field>
        ))}
      </div>
      <ResultBox title={title}><pre>{output}</pre><CopyButton value={output} /></ResultBox>
    </div>
  );
}

function CheckGroup({ label, options, values, setValues }) {
  return (
    <div className="check-group">
      <span>{label}</span>
      <div>
        {options.map(([value, text]) => <Toggle key={value} checked={values.includes(value)} label={text} setChecked={(checked) => setValues(checked ? [...values, value] : values.filter((item) => item !== value))} />)}
      </div>
    </div>
  );
}

function Toggle({ checked, setChecked, label }) {
  return <label className="toggle"><input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} /><span>{label}</span></label>;
}

function FAQList({ faqs }) {
  return <div className="faq-list">{faqs.map((faq) => <details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</div>;
}

function ServicesSnapshot() {
  return (
    <Section>
      <SectionHeader eyebrow="Services" title="When a free tool is not enough, hire the builder." copy="Dean Da Dev designs and ships the production version: mobile apps, fast websites, dashboards, AI workflows, automation, and useful business tools." />
      <div className="service-grid">
        {[
          ['Apps', 'App Development', 'Mobile apps and progressive web apps for customer portals, booking flows, marketplaces, AI products, and MVP launches.'],
          ['Websites', 'Web Development', 'Premium websites, landing pages, SEO foundations, booking flows, ecommerce, and CMS builds.'],
          ['Operations', 'Business Tools', 'Practical dashboards, calculators, client intake forms, admin views, and workflow helpers for smaller business operations.'],
          ['AI', 'AI Development', 'Prompt systems, AI assistants, automations, document workflows, and lead-generation tools.'],
        ].map(([label, title, copy]) => <div className="service-card" key={title}><span>{label}</span><h3>{title}</h3><p>{copy}</p></div>)}
      </div>
    </Section>
  );
}

function ServicesDetail() {
  const details = [
    ['Website Builds', 'Structure, copy direction, responsive design, enquiry forms, reviews, technical SEO basics, analytics, and launch support.'],
    ['App MVPs', 'User flows, core screens, authentication, simple backend/database, testing, deployment guidance, and a sensible roadmap for version two.'],
    ['AI Tools', 'Prompt systems, intake flows, content helpers, workflow assistants, document processing ideas, and polished interfaces around AI outputs.'],
    ['Dashboards & Automations', 'Admin views, calculators, lead tools, simple reporting, form-to-email workflows, and operations helpers for repetitive tasks.'],
    ['Launch Support', 'Domain setup, deployment, basic tracking, feedback fixes, performance checks, and a clear handover so you are not left guessing.'],
    ['Growth Improvements', 'Conversion sections, SEO metadata, internal links, FAQs, CTAs, and follow-up improvements based on what visitors actually do.'],
  ];

  return (
    <Section tone="dark" className="services-detail-section">
      <div id="services-detail" className="anchor-target" />
      <SectionHeader eyebrow="More Detail" title="What you actually get when we build." copy="The first service cards are the categories. This section explains the practical work behind them." />
      <div className="detail-grid">
        {details.map(([title, copy]) => (
          <div className="detail-card" key={title}>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const REVIEWS = [
  {
    name: 'Jane Ford',
    initials: 'JF',
    color: '#7c3aed',
    service: 'Booking App',
    text: "I recently worked with Dean to build a booking and scheduling app, and I honestly couldn't be happier with the experience. Communication was smooth and consistent — he kept me in the loop at every stage. What really impressed me was how quickly everything came together without any drop in quality. Dean clearly knew what he was doing, but more than that, he genuinely cared about getting it right for me. There were moments where Dean went above and beyond what I expected — suggesting improvements I hadn't even thought of. I'll definitely be working with him again.",
  },
  {
    name: 'Sean Bree',
    initials: 'SB',
    color: '#0369a1',
    service: 'App Rebuild',
    text: "I highly recommend Dean for any mobile app development or app troubleshooting needs. I hired him to fix and rebuild my application, and the results have been incredible. Dean demonstrated deep technical expertise in full-stack app development, quickly identifying the root causes of my app's performance issues and implementing a robust, scalable rebuild. He was professional, transparent about timelines, and maintained excellent communication throughout. His work has significantly improved my app's functionality and user experience.",
  },
  {
    name: 'Blossom Burt',
    initials: 'BB',
    color: '#059669',
    service: 'E-Commerce Website',
    text: "Working with Dean to create bellaflorjewellery was a fantastic experience. I had a specific vision for how I wanted my jewellery pieces to be displayed, and Dean brought that vision to life perfectly. Dean was incredibly patient with my requests and provided great technical advice throughout the process to ensure the site was fast and easy for my customers to navigate. I'm thrilled with the end result — the site looks beautiful and is already helping me grow my business. I couldn't have asked for a better partner for this project!",
  },
];

function SocialProofBanner() {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveReview((index) => (index + 1) % REVIEWS.length);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [activeReview]);

  const moveReview = (direction) => {
    setActiveReview((index) => (index + direction + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section className="reviews-section" aria-label="Client reviews">
      <div className="section-inner">
        <div className="reviews-header">
          <div className="reviews-rating">
            <span className="sp-stars" aria-label="5 stars">★★★★★</span>
            <div>
              <strong>5.0 out of 5</strong>
              <p>9 verified Google Reviews</p>
            </div>
          </div>
          <a className="button button-secondary" href={BOOKING_URL}>Book a free discovery call →</a>
        </div>
        <div className="reviews-viewport">
          <div className="reviews-grid" style={{ '--review-index': activeReview }}>
            {REVIEWS.map((r) => (
            <div className="review-card" key={r.name}>
              <div className="review-stars" aria-label="5 stars">★★★★★</div>
              <p className="review-text">"{r.text}"</p>
              <div className="review-author">
                <div className="review-avatar" style={{ background: r.color }} aria-hidden="true">{r.initials}</div>
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.service}</span>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
        <div className="review-controls" aria-label="Review carousel controls">
          <button type="button" onClick={() => moveReview(-1)} aria-label="Previous review">‹</button>
          <div className="review-dots" aria-hidden="true">
            {REVIEWS.map((r, index) => <span className={activeReview === index ? 'active' : ''} key={r.name} />)}
          </div>
          <button type="button" onClick={() => moveReview(1)} aria-label="Next review">›</button>
        </div>
      </div>
    </section>
  );
}

function LeadCTA() {
  return (
    <section className="lead-cta">
      <div>
        <p className="eyebrow">Need this built professionally?</p>
        <h2>Hire Dean Da Dev to turn the idea into a real product.</h2>
        <p>Book a short discovery call, request a quote, or review live work before deciding.</p>
      </div>
      <div className="button-row">
        <a className="button button-primary" href={BOOKING_URL}>Book a discovery call</a>
        <a className="button button-secondary" href={`mailto:${CONTACT_EMAIL}`}>Request a quote</a>
      </div>
    </section>
  );
}

function AboutPage({ navigate }) {
  return (
    <>
      <Hero
        eyebrow="About Dean Da Dev"
        title="UK developer who builds and ships real products, not mockups."
        copy="6 live apps. Google Play publisher. Full-stack from design to deployment — without agency overhead."
        primary={['Book a discovery call', BOOKING_URL]}
        secondary={['See live work', '/portfolio']}
        navigate={navigate}
      />
      <Section>
        <div className="about-layout">
          <div className="about-photo">
            <img src="/images/dean.png" alt="Dean Burt, founder of Dean Da Dev, UK full-stack developer" />
          </div>
          <div className="about-bio">
            <p className="eyebrow">Dean Burt · Founder</p>
            <h2>Building production-grade apps and websites for UK businesses.</h2>
            <p>Dean Burt is a UK-based full-stack developer who designs, builds, and ships mobile apps, websites, AI tools, and dashboards for local businesses and early-stage founders. Every project is handled end to end — from initial scope and UX through development, App Store submission, and deployment.</p>
            <p>With 6 live production apps, a Google Play publisher account, and a track record of shipping in 4–8 weeks, Dean Da Dev offers the expertise of an agency at a fraction of the price. No account managers, no handoffs, no delays — just a direct line to the developer building your product.</p>
            <div className="about-stats">
              {[['6', 'Live apps shipped'], ['4–8 wk', 'Average time to launch'], ['100%', 'Handled end to end'], ['UK', 'Based and built here']].map(([n, l]) => (
                <div key={l} className="about-stat">
                  <strong>{n}</strong>
                  <span>{l}</span>
                </div>
              ))}
            </div>
            <div className="button-row">
              <Button href={BOOKING_URL} navigate={navigate}>Book a free discovery call</Button>
              <Button href="/portfolio" variant="secondary" navigate={navigate}>See live work</Button>
            </div>
          </div>
        </div>
      </Section>
      <SocialProofBanner />
      <ServicesSnapshot />
    </>
  );
}

function ServicesPage({ navigate }) {
  return <><Hero eyebrow="Services" title="App development, web development, AI tools, and automation for UK businesses." copy="From a conversion-focused website to a mobile app, dashboard, or AI workflow, Dean Da Dev handles planning, UX, development, launch, and iteration." primary={['See what you get', '#services-detail']} secondary={['View pricing', '/pricing']} navigate={navigate} /><ServicesDetail /><LeadCTA /></>;
}

const PORTFOLIO_APPS = [
  {
    name: 'Bookrightly',
    tag: 'Marketplace',
    url: 'https://www.bookrightly.co.uk/',
    img: '/images/1.jpg',
    desc: 'A UK booking marketplace connecting customers with local service providers. Real-time availability, provider profiles, and online booking built end to end.',
  },
  {
    name: 'Js Grw Up',
    tag: 'Mobile App',
    url: 'https://js-grw-up.com/',
    img: '/images/2.jpg',
    desc: 'A co-parenting mobile app helping separated parents coordinate schedules, communicate clearly, and keep everything in one place.',
  },
  {
    name: 'Smart Life',
    tag: 'AI App',
    url: 'https://smart-life-app.pages.dev/',
    img: '/images/3.jpg',
    desc: 'An AI-powered lifestyle app that delivers personalised recommendations and insights to help users build better daily habits.',
  },
  {
    name: "DB's AI Trainer",
    tag: 'AI App',
    url: 'https://pt-ai-helper.pages.dev/#/login',
    img: '/images/4.jpg',
    desc: 'A personal AI fitness trainer that generates custom workout plans, tracks progress, and adapts its recommendations to the user over time.',
  },
  {
    name: 'Bella Flor Jewellery',
    tag: 'E-Commerce',
    url: 'https://www.bellaflorjewellery.co.uk/',
    img: '/images/5.jpg',
    desc: 'A full e-commerce store for a UK handmade jewellery brand — product catalogue, shopping cart, and a checkout experience built to convert.',
  },
  {
    name: 'Payment Card Services',
    tag: 'Website',
    url: 'https://www.paymentcardservices.co.uk/',
    img: '/images/6.jpg',
    desc: 'A professional lead-generation website for a UK payment card services business, built to establish credibility and drive enquiries.',
  },
];

function PortfolioPage({ navigate }) {
  return (
    <>
      <Hero
        eyebrow="Portfolio"
        title="Live builds, not mockups."
        copy="6 production apps and websites shipped end to end — from design and development through to App Store submission and deployment."
        primary={['Book a discovery call', BOOKING_URL]}
        secondary={['View pricing', '/pricing']}
        navigate={navigate}
      />
      <Section>
        <div className="portfolio-grid">
          {PORTFOLIO_APPS.map((app) => (
            <a className="portfolio-card" href={app.url} target="_blank" rel="noreferrer" key={app.name}>
              <img src={app.img} alt={`${app.name} — ${app.tag} built by Dean Da Dev`} loading="lazy" />
              <div>
                <span>{app.tag}</span>
                <h3>{app.name}</h3>
                <p>{app.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </Section>
      <SocialProofBanner />
      <LeadCTA />
    </>
  );
}

function PricingPage() {
  return <><Hero eyebrow="Pricing" title="Clear starting points. Fixed scope before fixed price." copy="Websites can start from £399 and app MVPs from £4,999, undercutting typical UK agency pricing while keeping the scope realistic." primary={['Explore pricing', '#pricing']} secondary={['Use cost calculator', '/free-tools/website-cost-calculator']} /><Section><div id="pricing" className="anchor-target" /><div className="pricing-grid">{[['Essential Website', 'from £399', 'A professional ready-made website setup with your logo, colours, contact details, services, reviews, enquiry form, and mobile optimisation.'], ['Standard Website', 'from £699', 'A tailored business website with custom-written content, SEO titles and descriptions, Google Maps/reviews integration, revisions, and support.'], ['Premium Website', 'from £1,200', 'Extra pages, stronger local SEO, intake forms, conversion sections, and a more complete growth-focused website.'], ['App Prototype', 'from £1,999', 'Clickable app design or lean proof-of-concept for validating the idea, user journey, core screens, and build direction before a full MVP.'], ['Starter App MVP', 'from £4,999', 'A focused app build with UX, core screens, authentication, simple backend/database, testing, and launch-ready foundations.'], ['Growth App', 'from £7,999', 'A more complete app with dashboards, booking, payments, AI features, admin tools, integrations, or launch support.'], ['AI Tool or Dashboard', 'from £2,999', 'A focused AI tool, calculator, dashboard, admin view, intake form, or automation that solves one clear business problem.']].map(([name, price, copy]) => <div className="price-card" key={name}><h3>{name}</h3><strong>{price}</strong><p>{copy}</p></div>)}</div></Section><LeadCTA /></>;
}

function DiscoveryCallPage({ navigate }) {
  return (
    <>
      <Hero
        eyebrow="Discovery Call"
        title="Book a call with Dean Da Dev."
        copy="Tell me what you want to build, where you are now, and what outcome matters. I will help you shape the next sensible step."
        primary={['Open booking form', '#booking']}
        secondary={['View pricing', '/pricing']}
        navigate={navigate}
      />
      <Section className="booking-section">
        <div id="booking" />
        <SectionHeader eyebrow="Booking" title="Choose a time that works." copy="The booking flow is shown here on the Dean Da Dev domain. If it does not load, use the fallback button below." />
        <div className="booking-frame-wrap">
          <iframe
            title="Dean Da Dev discovery call booking"
            src={BOOKING_EMBED_URL}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="center-gap">
          <a className="button button-secondary" href={BOOKING_EMBED_URL} target="_blank" rel="noreferrer">Open booking in a new tab</a>
        </div>
      </Section>
    </>
  );
}

function ResourcesPage({ navigate }) {
  return <><Hero eyebrow="Resources" title="Guides that help businesses plan better digital projects." copy="Every guide supports a tool, answers search intent, and builds confidence before a client conversation." primary={['Explore tools', '/free-tools']} secondary={['Hire Dean', BOOKING_URL]} navigate={navigate} /><Section><div className="resource-grid">{resourceGuides().map((guide) => <a className="resource-card" href={guide.path} onClick={(event) => handleLink(event, guide.path, navigate)} key={guide.path}><span>{guide.toolName}</span><h3>{guide.title}</h3><p>{guide.description}</p></a>)}</div></Section></>;
}

function GuidePage({ route, navigate }) {
  const guide = route.guide;
  return <><Hero eyebrow="Resource Guide" title={guide.title} copy={guide.description} primary={['Use related tool', guide.toolPath]} secondary={['Book a call', BOOKING_URL]} navigate={navigate} /><Section><article className="guide-article"><h2>What to know first</h2><p>{guide.body}</p><h2>How to use the tool</h2><p>Start with realistic numbers, keep assumptions conservative, and use the result as a planning range rather than a final quote.</p><h2>When to get expert help</h2><p>If the project affects revenue, search visibility, operations, or customer experience, a professional scope will save time and avoid expensive rework.</p></article></Section><LeadCTA /></>;
}

function TemplatesPage({ navigate }) {
  const templates = [
    ['Invoice Template', 'Create a client-ready invoice structure with line items, VAT, totals, and payment terms.', '/free-tools/invoice-generator'],
    ['Freelance Quote Template', 'Build a clear quote with scope, timeline, investment, and next steps.', '/free-tools/freelance-quote-generator'],
    ['Project Budget Template', 'Estimate team time, integrations, risk buffer, and delivery cost.', '/free-tools/project-cost-calculator'],
    ['SEO Metadata Template', 'Create page titles, descriptions, Open Graph tags, and schema snippets.', '/seo-tools'],
  ];
  return (
    <>
      <Hero eyebrow="Templates" title="Practical templates for quotes, invoices, SEO planning, and project scoping." copy="Each template is powered by a working tool, so visitors can create useful output immediately instead of landing on an empty download page." primary={['Open invoice tool', '/free-tools/invoice-generator']} secondary={['Open quote tool', '/free-tools/freelance-quote-generator']} navigate={navigate} />
      <Section>
        <SectionHeader eyebrow="Ready to use" title="Templates that produce real business output." copy="Start from a proven structure, adjust the inputs, and use the result to plan or brief a professional build." />
        <div className="resource-grid">
          {templates.map(([title, copy, href]) => (
            <a className="resource-card" href={href} onClick={(event) => handleLink(event, href, navigate)} key={title}>
              <span>Template</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </a>
          ))}
        </div>
      </Section>
      <LeadCTA />
    </>
  );
}

function categoryTools(slug) {
  return tools.filter((item) => item.categories.includes(slug));
}

function relatedTools(item) {
  return tools.filter((candidate) => candidate.slug !== item.slug && candidate.categories.some((category) => item.categories.includes(category))).slice(0, 3);
}

function resourceGuides() {
  return tools.flatMap((item) => {
    const titles = guideMap[item.slug] || [`How to use the ${item.name} effectively`];
    return titles.map((title) => ({
      title,
      toolName: item.name,
      toolPath: item.path,
      path: `/resources/${item.slug}/${slugify(title)}`,
      description: `A practical guide connected to the ${item.name}, written for UK businesses planning better digital projects.`,
      body: `This guide helps you understand the decisions behind ${item.name.toLowerCase()}: budget, scope, realistic assumptions, conversion impact, and when a professional build is worth the investment.`,
    }));
  });
}

function money(value) {
  return Math.round(Number(value || 0)).toLocaleString('en-GB');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function makePassword(length, symbols, numbers) {
  const chars = `ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz${numbers ? '23456789' : ''}${symbols ? '!@#$%^&*+-_?' : ''}`;
  return Array.from(crypto.getRandomValues(new Uint32Array(length))).map((num) => chars[num % chars.length]).join('');
}

function makePalette(hex) {
  const base = parseInt(hex.slice(1), 16);
  const r = base >> 16;
  const g = (base >> 8) & 255;
  const b = base & 255;
  return [-70, -35, 0, 35, 70].map((shift) => rgbToHex(clamp(r + shift), clamp(g + shift), clamp(b + shift)));
}

function clamp(value) {
  return Math.max(0, Math.min(255, value));
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, '0')).join('')}`;
}

function minify(input, type) {
  if (type === 'html') return input.replace(/<!--[\s\S]*?-->/g, '').replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ').trim();
  if (type === 'css') return input.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*([{}:;,])\s*/g, '$1').replace(/;}/g, '}').trim();
  return input.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1').replace(/\s+/g, ' ').replace(/\s*([{}();,:=+\-*/<>])\s*/g, '$1').trim();
}

function makeLorem(count, unit) {
  const words = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'.split(' ');
  if (unit === 'words') return Array.from({ length: count }, (_, i) => words[i % words.length]).join(' ');
  const sentence = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  if (unit === 'sentences') return Array.from({ length: count }, () => sentence).join(' ');
  return Array.from({ length: count }, () => `${sentence} Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`).join('\n\n');
}

function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dean Da Dev',
    url: SITE_URL,
    description: 'Free developer, SEO, AI, and business tools plus professional UK app, web, AI tool, dashboard, and automation development services.',
  };
}

function softwareSchema(item) {
  return {
    '@type': 'SoftwareApplication',
    name: item.name,
    applicationCategory: `${item.primaryCategory}Application`,
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
    url: `${SITE_URL}${item.path}`,
    description: item.description,
  };
}

function faqSchema(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
  };
}

function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], index) => ({ '@type': 'ListItem', position: index + 1, name, item: `${SITE_URL}${path === '/' ? '/' : path}` })),
  };
}

function collectionSchema(name, items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${name} Tools`,
    hasPart: items.map((item) => softwareSchema(item)),
  };
}

function articleSchema(guide) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    author: { '@type': 'Person', name: 'Dean Burt' },
    mainEntityOfPage: `${SITE_URL}${guide.path}`,
  };
}

export default App;
