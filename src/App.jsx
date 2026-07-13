import { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import './App.css';
import { ImageToolWorkspace } from './ImageTools';

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

function imageTool(name, slug, description, short, customFaqs) {
  const defaultFaqs = [
    { q: `Is this ${name.toLowerCase()} free?`, a: `Yes. Completely free, no sign-up required, no watermark.` },
    { q: 'Are my files private?', a: 'Yes. All file processing happens directly in your browser. Your files are never uploaded to any server.' },
    { q: 'Can I use this on mobile?', a: 'Yes. The tool is fully responsive and works on phones, tablets, and desktops.' },
    { q: 'Can dean-da-dev help with my website?', a: 'Yes. If your website feels slow, outdated, or is not generating enquiries, dean-da-dev can build a faster, more professional website designed to convert visitors into customers.' },
  ];
  return { name, slug, description, short, title: `${name} | Free Online Tool | dean-da-dev`, metaDescription: description, path: `/tools/${slug}`, faqs: customFaqs || defaultFaqs };
}

const imageTools = [
  imageTool('Image Compressor', 'image-compressor',
    'Compress JPG, PNG, and WebP images online to reduce file size and help websites load faster.',
    'Reduce image file size for faster websites. No sign-up, no watermark.',
    [
      { q: 'Is the Image Compressor free?', a: 'Yes. Completely free, no sign-up required, no watermark.' },
      { q: 'What image formats are supported?', a: 'JPG, PNG, and WebP images are all supported.' },
      { q: 'Are my images private?', a: 'Yes. All image compression happens locally in your browser using the Canvas API. Your images are never uploaded to any server.' },
      { q: 'Why should I compress images for my website?', a: 'Large images are one of the most common reasons websites load slowly. Compressing images improves page speed, user experience, and helps with Google\'s Core Web Vitals performance scoring.' },
      { q: 'What is WebP and should I use it?', a: 'WebP is a modern image format from Google that produces files 25–35% smaller than JPG or PNG at similar quality. It is recommended for website images and is supported by all modern browsers.' },
      { q: 'Can dean-da-dev help with my website speed?', a: 'Yes. A website built by dean-da-dev is optimised for speed from the ground up — compressed assets, fast hosting, and performance best practices included as standard.' },
    ]
  ),
  imageTool('JPG to WebP Converter', 'jpg-to-webp',
    'Convert JPG images to WebP format for smaller file sizes and faster website loading.',
    'Convert JPG to WebP for smaller, faster files. Free, no sign-up.',
    [
      { q: 'Is this JPG to WebP converter free?', a: 'Yes. Completely free, no sign-up, no watermark.' },
      { q: 'What is WebP and why use it?', a: 'WebP is a modern image format from Google that produces files 25–35% smaller than JPG while maintaining comparable quality. Using WebP for website images helps pages load faster.' },
      { q: 'Are my images private?', a: 'Yes. Conversion happens entirely in your browser using the Canvas API. Your images are never sent to any server.' },
      { q: 'Which browsers support WebP?', a: 'WebP is supported by all modern browsers including Chrome, Firefox, Safari, and Edge. It is safe to use for all websites.' },
      { q: 'Can dean-da-dev build a faster website for me?', a: 'Yes. dean-da-dev builds mobile-friendly, speed-optimised websites for UK businesses. Book a free discovery call to get started.' },
    ]
  ),
  imageTool('PNG to WebP Converter', 'png-to-webp',
    'Convert PNG images to WebP format to reduce file size and improve website performance.',
    'Convert PNG to WebP to shrink file sizes and speed up your website. Free and instant.',
    [
      { q: 'Is this PNG to WebP converter free?', a: 'Yes. Free to use, no sign-up, no watermark.' },
      { q: 'Does it preserve transparency?', a: 'Yes. WebP supports transparency, so transparent PNG images will be converted with full transparency preserved.' },
      { q: 'Are my images private?', a: 'Yes. Everything is processed locally in your browser. No server uploads.' },
      { q: 'How much smaller will the WebP file be?', a: 'PNG to WebP conversions typically produce files 25–35% smaller. Results vary depending on image content.' },
      { q: 'Can dean-da-dev help with my website?', a: 'Yes. dean-da-dev builds professional websites for UK businesses, optimised for speed, SEO, and conversions.' },
    ]
  ),
  imageTool('WebP to PNG Converter', 'webp-to-png',
    'Convert WebP files back into PNG format quickly and easily.',
    'Convert WebP images to PNG for universal compatibility. Free and instant.',
    [
      { q: 'Is this WebP to PNG converter free?', a: 'Yes. Completely free, no sign-up required.' },
      { q: 'Why convert WebP to PNG?', a: 'While WebP is great for websites, some software, apps, and services do not support the WebP format. Converting to PNG ensures the image works everywhere.' },
      { q: 'Are my images private?', a: 'Yes. All processing happens in your browser. No uploads to any server.' },
      { q: 'Will converting to PNG increase the file size?', a: 'Yes, PNG files are typically larger than WebP. PNG is best when universal compatibility matters more than file size.' },
      { q: 'Can dean-da-dev build my website?', a: 'Yes. dean-da-dev builds professional websites for UK businesses. Book a free discovery call to discuss your project.' },
    ]
  ),
  imageTool('PNG to JPG Converter', 'png-to-jpg',
    'Convert PNG files into JPG format online for smaller file sizes and easier sharing.',
    'Convert PNG to JPG for smaller, widely compatible files. Free, no sign-up.',
    [
      { q: 'Is this PNG to JPG converter free?', a: 'Yes. Free, no sign-up, no watermark.' },
      { q: 'What happens to transparent areas?', a: 'JPG does not support transparency. Transparent areas in your PNG will be filled with a background colour — white by default. You can choose a custom colour in the tool.' },
      { q: 'Are my images private?', a: 'Yes. Conversion happens locally using the Canvas API. No files are sent to any server.' },
      { q: 'When should I use JPG over PNG?', a: 'JPG is best for photographs and images where smaller file size matters. PNG is better for logos, icons, and images with transparency.' },
      { q: 'Can dean-da-dev help with my website?', a: 'Yes. Book a free discovery call to discuss building a professional website for your business.' },
    ]
  ),
  imageTool('JPG to PNG Converter', 'jpg-to-png',
    'Convert JPG images into PNG format online with a simple free tool.',
    'Convert JPG to PNG for lossless quality and transparency support. Free and instant.',
    [
      { q: 'Is this JPG to PNG converter free?', a: 'Yes. Completely free, no sign-up, no watermark.' },
      { q: 'Why convert JPG to PNG?', a: 'PNG is a lossless format. Converting from JPG stops further quality loss from future re-saving. PNG also supports transparency, which JPG does not.' },
      { q: 'Are my images private?', a: 'Yes. All conversion happens locally in your browser. No server uploads.' },
      { q: 'Will converting improve image quality?', a: 'Converting from JPG to PNG will not recover quality already lost to JPG compression, but it will prevent further quality loss from any future re-saving.' },
      { q: 'Can dean-da-dev build my website?', a: 'Yes. dean-da-dev builds fast, modern websites for UK businesses from £399. Book a discovery call to get started.' },
    ]
  ),
  imageTool('Website Image Size Checker', 'image-size-checker',
    'Check whether an image is too large for website use and get simple advice to improve website speed.',
    'Check if your image is too large for your website and get instant advice. Free.',
    [
      { q: 'What image size is best for a website?', a: 'Most website images should be under 200 KB. Full-width hero images can go up to 400 KB. Images over 500 KB can noticeably slow down a website and may harm your Google ranking.' },
      { q: 'Is this tool free?', a: 'Yes. Completely free, no sign-up required.' },
      { q: 'Are my images private?', a: 'Yes. File analysis happens entirely in your browser. No images are uploaded to any server.' },
      { q: 'What should I do if my image is too large?', a: 'Use the Image Compressor or WebP converter on this site to reduce the file size. Aim for under 200 KB for most website images.' },
      { q: 'Why do large images slow down websites?', a: 'Large images take longer to download, which makes pages feel slow. This can increase bounce rates, reduce conversions, and negatively affect your Google search ranking.' },
      { q: 'Can dean-da-dev help with website speed?', a: 'Yes. Websites built by dean-da-dev include optimised images, fast hosting, and clean code as standard. Book a discovery call to discuss your project.' },
    ]
  ),
  imageTool('PDF Compressor', 'pdf-compressor',
    'Reduce PDF file size online for easier sharing, uploading, and emailing.',
    'Compress PDF files to reduce size for easier sharing. Free, no sign-up, no watermark.',
    [
      { q: 'Is the PDF Compressor free?', a: 'Yes. Free to use, no sign-up, no watermark.' },
      { q: 'Are my PDFs private?', a: 'Yes. PDF processing happens entirely in your browser. Your files are never sent to any server.' },
      { q: 'How much will the file size be reduced?', a: 'Results vary. Text-heavy PDFs typically compress well. PDFs that are mostly large embedded images may see smaller reductions from browser-based compression.' },
      { q: 'What is the maximum file size?', a: 'For best results, keep PDFs under 50 MB. Larger files may take longer to process in the browser.' },
      { q: 'Can dean-da-dev help with my website?', a: 'Yes. dean-da-dev builds professional websites for UK businesses. Book a free discovery call to discuss your project.' },
    ]
  ),
  imageTool('Image to PDF Converter', 'image-to-pdf',
    'Convert JPG and PNG images into a PDF document online.',
    'Convert images to PDF instantly. Multiple images supported. Free, no sign-up.',
    [
      { q: 'Is this Image to PDF converter free?', a: 'Yes. Completely free, no sign-up, no watermark.' },
      { q: 'Can I add multiple images?', a: 'Yes. You can add multiple images and each one will become a separate page in the PDF.' },
      { q: 'Are my images private?', a: 'Yes. All processing happens in your browser. No files are sent to any server.' },
      { q: 'What image formats are supported?', a: 'JPG and PNG images are supported.' },
      { q: 'Can I reorder images before converting?', a: 'Yes. Use the up and down buttons to reorder images before converting to PDF.' },
      { q: 'Can dean-da-dev build my website?', a: 'Yes. dean-da-dev builds professional websites and apps for UK businesses. Book a free discovery call.' },
    ]
  ),
  imageTool('File Size Converter', 'file-size-converter',
    'Convert between bytes, KB, MB, GB, and TB using a simple free calculator.',
    'Instantly convert between bytes, KB, MB, GB, and TB. Simple and free.',
    [
      { q: 'Is this File Size Converter free?', a: 'Yes. Completely free, no sign-up needed.' },
      { q: 'What units does it support?', a: 'Bytes, Kilobytes (KB), Megabytes (MB), Gigabytes (GB), and Terabytes (TB). Calculations use 1 KB = 1,024 bytes (binary standard).' },
      { q: 'What is the difference between KB and KiB?', a: 'KB (Kilobyte) technically means 1,000 bytes in the decimal (SI) system. KiB (Kibibyte) means 1,024 bytes in the binary system. Most storage and web tools use binary, which is what this tool uses.' },
      { q: 'Can dean-da-dev help with my website?', a: 'Yes. dean-da-dev builds fast, mobile-friendly websites for UK businesses. Book a free call to discuss your project.' },
    ]
  ),
];

const TOOL_ICONS = {
  'image-compressor': '🗜️',
  'jpg-to-webp': '🔄',
  'png-to-webp': '🔄',
  'webp-to-png': '🔄',
  'png-to-jpg': '🔄',
  'jpg-to-png': '🔄',
  'image-size-checker': '📏',
  'pdf-compressor': '📄',
  'image-to-pdf': '📑',
  'file-size-converter': '⚖️',
};

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
  ['Tools', '/tools'],
  ['Blog', '/blog'],
  ['Resources', '/resources'],
];

const siteImages = {
  websiteScreen: {
    src: '/images/free/website-screen.jpg',
    alt: 'Website homepage shown on a computer screen',
  },
  appPhone: {
    src: '/images/free/app-phone-laptop.jpg',
    alt: 'Phone app in front of a laptop during development',
  },
  websiteDesignScreen: {
    src: '/images/free/website-design-screen.jpg',
    alt: 'Professional website design shown on a desktop screen',
  },
  codeDesk: {
    src: '/images/free/code-desk.jpg',
    alt: 'Laptop with code on a clean developer desk',
  },
  mobileCode: {
    src: '/images/free/mobile-code.jpg',
    alt: 'Smartphone displaying code',
  },
  businessTools: {
    src: '/images/free/digital-business-dashboard.jpg',
    alt: 'Digital business dashboard with charts and reporting tools',
  },
  wireframes: {
    src: '/images/free/wireframe-sketches.jpg',
    alt: 'Watercolor wireframe sketches for website layouts',
  },
  professionalWorkspace: {
    src: '/images/free/professional-workspace.jpg',
    alt: 'Professional workspace with laptop showing business charts',
  },
  techWork: {
    src: '/images/free/tech-work.jpg',
    alt: 'Professional working on a laptop in an office',
  },
  performance: {
    src: '/images/free/performance-dashboard.jpg',
    alt: 'Analytics dashboard with performance charts',
  },
  appWebsiteMockup: {
    src: '/images/free/app-website-mockup.jpg',
    alt: 'Website and app mockup shown on multiple devices',
  },
  businessToolsDesk: {
    src: '/images/free/business-tools-desk.jpg',
    alt: 'Business tools and planning materials on a desk',
  },
  codeLaptop: {
    src: '/images/free/code-laptop.jpg',
    alt: 'Laptop displaying website code',
  },
  dashboardAnalytics: {
    src: '/images/free/dashboard-analytics.jpg',
    alt: 'Analytics dashboard showing website performance data',
  },
  discoveryMeeting: {
    src: '/images/free/discovery-meeting.jpg',
    alt: 'Business discovery meeting for a website project',
  },
  teamWorkshop: {
    src: '/images/free/team-workshop.jpg',
    alt: 'Team workshop planning a digital project',
  },
  uxPlanning: {
    src: '/images/free/ux-planning.jpg',
    alt: 'UX planning notes for a website structure',
  },
};

const BLOG_CATEGORIES = ['Web Design', 'Website Speed', 'SEO', 'Small Business', 'Booking Systems', 'Free Tools', 'Website Redesigns', 'Industry Websites'];

const BLOG_POSTS = [
  blogPost({
    title: 'How Much Does a Website Cost for a Small Business in the UK?',
    slug: 'how-much-does-a-small-business-website-cost-uk',
    category: 'Small Business',
    keyword: 'small business website cost UK',
    metaTitle: 'How Much Does a Small Business Website Cost in the UK?',
    metaDescription: 'Learn what affects the cost of a small business website in the UK, including design, pages, features, booking systems, and ongoing support.',
    date: '2026-07-05',
    readTime: '7 min read',
    image: siteImages.websiteDesignScreen,
    excerpt: 'A clear guide to what small business website pricing depends on, from page count and design quality to booking systems and ongoing support.',
    cta: 'Need a professional website for your business? Contact dean-da-dev.',
    sections: [
      ['Why website prices vary', 'Website prices vary because no two businesses need exactly the same thing. A one-page brochure site, a five-page service website, and a booking-led website all require different levels of planning, copy, design, testing, and setup. UK small businesses should look beyond the headline price and ask what is included: mobile design, SEO basics, forms, hosting guidance, analytics, launch support, and maintenance.'],
      ['Basic website vs premium website', 'A basic website can be useful when you need a professional presence quickly. A premium website goes further: clearer messaging, stronger service pages, better visual hierarchy, trust sections, faster loading, and better enquiry routes. The difference is not just how it looks; it is how confidently it explains your offer and helps visitors take the next step.'],
      ['What affects the cost', 'The biggest cost factors are page count, content support, design depth, custom functionality, forms, integrations, local SEO setup, performance work, and revisions. A trades website may need area pages and quote forms, while a salon may need treatment pages and booking links. A realistic quote should map the price to the actual work, not hide the details behind a vague package.'],
      ['Booking systems and extra features', 'Booking systems, calendars, payment links, customer forms, galleries, map sections, review feeds, and CMS editing can all add value. They also add planning and testing time. If a feature saves admin time or helps customers enquire more easily, it may be worth the extra investment.'],
      ['Why cheap websites can cost more long term', 'A very cheap website can become expensive if it is slow, hard to update, weak on mobile, missing basic SEO, or unclear to customers. Rebuilding poor foundations later can cost more than doing the important parts properly from the start.'],
      ['How dean-da-dev can help', 'dean-da-dev builds mobile-friendly websites with clear scope, practical SEO foundations, fast-loading pages, and enquiry-focused sections. You can start by using the website cost calculator, then discuss the right approach for your business.'],
    ],
    faqs: [
      ['What is a realistic small business website budget in the UK?', 'It depends on scope, but a professional small business website usually costs more when it includes copy support, SEO setup, booking features, and launch support.'],
      ['Should I choose the cheapest website quote?', 'Not automatically. Compare what is included, how mobile design is handled, whether SEO basics are covered, and how easy the site will be to maintain.'],
      ['Can I add booking later?', 'Yes, but it is usually better to plan the customer journey early so the website structure supports booking from the start.'],
    ],
    toolLinks: ['/free-tools/website-cost-calculator', '/free-tools/freelance-quote-generator'],
  }),
  blogPost({
    title: 'Signs Your Business Website Needs a Redesign',
    slug: 'signs-your-business-website-needs-redesign',
    category: 'Website Redesigns',
    keyword: 'business website redesign',
    metaTitle: 'Signs Your Business Website Needs a Redesign',
    metaDescription: 'Find out the common signs that your business website may need a redesign, from poor mobile layout to slow loading and weak enquiries.',
    date: '2026-07-05',
    readTime: '6 min read',
    image: siteImages.wireframes,
    excerpt: 'Spot the practical signs that your website is holding the business back, including poor mobile layout, slow loading, unclear CTAs, and outdated positioning.',
    cta: 'If your website feels outdated, dean-da-dev can help redesign it.',
    sections: [
      ['Your website looks outdated', 'First impressions matter. If your website looks older than your actual business, visitors may assume the service behind it is also outdated. A redesign can modernise the layout, typography, imagery, and trust signals without losing the core of your brand.'],
      ['It does not work well on mobile', 'Many local customers check websites on their phone before calling, booking, or visiting. If text is hard to read, buttons are awkward, menus are confusing, or forms are painful to complete, the website is losing opportunities.'],
      ['It loads slowly', 'Slow pages make people wait, and people rarely wait patiently online. Oversized images, heavy scripts, poor hosting, and old build approaches can all hurt performance. Start by checking image sizes and compressing obvious problem files.'],
      ['Customers cannot find key information', 'A strong business website answers urgent questions quickly: what you do, where you work, pricing signals, opening hours, reviews, and how to contact you. If visitors have to hunt for these basics, the structure needs attention.'],
      ['There is no clear call to action', 'Every important page should make the next step obvious. That could be call, book, request a quote, send an enquiry, view services, or use a free tool. Weak calls to action create hesitation.'],
      ['It does not match your business anymore', 'Businesses evolve. If your website still talks about old services, old pricing, weak visuals, or the wrong audience, it can attract the wrong enquiries and miss the right ones.'],
      ['How a redesign can improve trust and enquiries', 'A good redesign makes the website clearer, faster, easier to use, and more aligned with what customers need before they contact you. The goal is not decoration; it is confidence and action.'],
    ],
    faqs: [
      ['How often should a business website be redesigned?', 'There is no fixed rule, but if the site is slow, unclear, poor on mobile, or no longer matches the business, it is time to review it.'],
      ['Can I redesign without changing every page?', 'Yes. A focused redesign can prioritise the homepage, service pages, contact flow, and performance first.'],
      ['Will a redesign guarantee more enquiries?', 'No redesign can guarantee results, but clearer messaging, faster pages, and stronger CTAs can improve the chances of visitors contacting you.'],
    ],
    toolLinks: ['/tools/image-size-checker', '/free-tools/meta-title-generator'],
  }),
  blogPost({
    title: 'How to Make Your Website Load Faster by Compressing Images',
    slug: 'how-to-make-website-load-faster-compress-images',
    category: 'Website Speed',
    keyword: 'compress images for website speed',
    metaTitle: 'How to Make Your Website Load Faster by Compressing Images',
    metaDescription: 'Large images can slow down your website. Learn how image compression and WebP conversion can improve website speed.',
    date: '2026-07-05',
    readTime: '5 min read',
    image: siteImages.performance,
    excerpt: 'Large images are one of the easiest speed problems to fix. Learn how compression, WebP, and size checks can make pages feel faster.',
    cta: 'Use the free dean-da-dev image compressor or contact dean-da-dev for website speed improvements.',
    sections: [
      ['Why large images slow websites down', 'Images often make up most of the weight on a small business website. A beautiful hero image can become a problem if it is several megabytes and loaded on mobile. The visitor sees delay before they see value.'],
      ['What image compression does', 'Image compression reduces file size while keeping the image visually acceptable. For website use, the aim is not print-level perfection; it is a sharp-looking image that loads quickly on real devices.'],
      ['Why WebP can help', 'WebP is designed for the web and can often create smaller files than JPG or PNG at similar visual quality. It is especially useful for hero images, service photos, gallery images, and blog graphics.'],
      ['How to check if your images are too large', 'Use an image size checker before uploading images to your website. As a rough rule, most content images should be far below 500 KB, and many can sit under 200 KB after compression.'],
      ['When to redesign or optimise your website properly', 'Compression helps, but it will not fix every performance issue. If your website still feels slow after image optimisation, the problem may be layout, scripts, hosting, caching, or the build itself.'],
    ],
    faqs: [
      ['Does compressing images reduce quality?', 'It can, but sensible compression keeps images looking good while making files much smaller for the web.'],
      ['Should I use WebP for my website?', 'For most modern websites, WebP is a strong choice for photos and graphics because it keeps file sizes lower.'],
      ['Are the dean-da-dev image tools private?', 'Yes. The image tools process files in your browser, so files are not uploaded to a server.'],
    ],
    toolLinks: ['/tools/image-compressor', '/tools/image-size-checker', '/tools/jpg-to-webp', '/tools/png-to-webp'],
  }),
  blogPost({
    title: 'Why Salons and Barbers Need Online Booking Websites',
    slug: 'why-salons-barbers-need-online-booking-websites',
    category: 'Booking Systems',
    keyword: 'online booking website for salons',
    metaTitle: 'Why Salons and Barbers Need Online Booking Websites',
    metaDescription: 'Learn why salons, barbers, and beauty businesses can benefit from online booking websites that help customers book more easily.',
    date: '2026-07-05',
    readTime: '6 min read',
    image: siteImages.appWebsiteMockup,
    excerpt: 'Online booking helps beauty and grooming businesses reduce missed enquiries, improve convenience, and look more professional on mobile.',
    cta: 'Need a booking website for your salon or barber shop? Contact dean-da-dev.',
    sections: [
      ['Customers want convenience', 'Salon and barber customers often decide quickly. If they can view services, prices, opening hours, and availability without messaging back and forth, they are more likely to book.'],
      ['Online booking saves time', 'A booking system can reduce repetitive admin, missed calls, and manual appointment sorting. It also gives customers a clear route to action outside opening hours.'],
      ['Service pages build trust', 'Treatment pages, barbering services, pricing, timings, FAQs, and aftercare notes all help customers choose with confidence. A clear website can answer questions before the appointment.'],
      ['Mobile booking matters', 'Most appointment searches happen on phones. Booking buttons need to be obvious, forms need to be simple, and pages need to load quickly on mobile data.'],
      ['Booking systems reduce missed enquiries', 'When the website only says “message us”, enquiries can disappear into busy inboxes. A proper booking journey captures intent at the moment the customer is ready.'],
      ['A premium website improves first impressions', 'For salons, barbers, and beauty businesses, visual trust matters. A clean, modern website helps the customer feel they are booking with a professional business.'],
    ],
    faqs: [
      ['Do salons need a full booking system?', 'Not always. Some businesses start with strong service pages and booking links, then add deeper calendar features later.'],
      ['What should a salon website include?', 'Services, prices, opening hours, location, reviews, photos, booking buttons, policies, and mobile-friendly contact options.'],
      ['Can a booking website reduce admin?', 'Yes, when the booking flow answers common questions and captures the right appointment details upfront.'],
    ],
    toolLinks: ['/free-tools/website-cost-calculator', '/tools/image-compressor'],
  }),
  blogPost({
    title: 'What Makes a Good Website for a Local Business?',
    slug: 'what-makes-a-good-local-business-website',
    category: 'Small Business',
    keyword: 'good local business website',
    metaTitle: 'What Makes a Good Website for a Local Business?',
    metaDescription: 'A good local business website should be mobile-friendly, clear, trustworthy, fast, and focused on enquiries.',
    date: '2026-07-05',
    readTime: '7 min read',
    image: siteImages.discoveryMeeting,
    excerpt: 'The essentials of a strong local business website: clear message, mobile layout, contact options, service pages, reviews, speed, and local SEO basics.',
    cta: 'dean-da-dev builds premium websites for local businesses.',
    sections: [
      ['Clear headline', 'A local business website should explain what you do, who you help, and where you operate within seconds. Clever copy is less useful than clarity.'],
      ['Strong mobile design', 'Mobile design is not just shrinking the desktop page. Buttons, menus, spacing, forms, galleries, and calls to action all need to work comfortably on a phone.'],
      ['Easy contact options', 'Visitors should not have to search for your phone number, email, booking link, or quote form. Put contact options near the top, in service pages, and near decision points.'],
      ['Trust signals and reviews', 'Reviews, project photos, accreditations, guarantees, case studies, team photos, and clear business details all reduce doubt. Trust signals should be specific and believable.'],
      ['Service pages', 'Each important service deserves a page or section that explains the problem, the process, who it is for, and how to enquire. This helps visitors and search engines.'],
      ['Fast loading', 'Fast websites feel more professional. Compress images, avoid unnecessary clutter, and keep important content visible quickly.'],
      ['Clear call to action', 'A good website guides the visitor. The action could be call now, book online, request a quote, view pricing, or send a project enquiry.'],
      ['Local SEO basics', 'Use location signals naturally, keep page titles clear, add service detail, include contact information, and make sure the website is crawlable and well structured.'],
    ],
    faqs: [
      ['What is the most important part of a local business website?', 'Clarity. Visitors need to understand what you do, where you work, and how to contact you quickly.'],
      ['Do local businesses need SEO?', 'Yes, but it should start with useful service pages, clear metadata, location information, and a technically sound website.'],
      ['How can I make my website look more trustworthy?', 'Use real photos where possible, show reviews, explain services clearly, and make contact details easy to find.'],
    ],
    toolLinks: ['/free-tools/meta-title-generator', '/free-tools/schema-generator'],
  }),
  blogPost({
    title: 'Website Design for Tradespeople: How to Get More Quote Requests',
    slug: 'website-design-for-tradespeople-quote-requests',
    category: 'Industry Websites',
    keyword: 'website design for tradespeople',
    metaTitle: 'Website Design for Tradespeople: How to Get More Quote Requests',
    metaDescription: 'Learn how plumbers, electricians, builders, roofers, and other tradespeople can use better websites to generate more quote requests.',
    date: '2026-07-05',
    readTime: '6 min read',
    image: siteImages.techWork,
    excerpt: 'Trades websites need to build trust quickly, show real work, explain services, and make quote requests easy from any device.',
    cta: 'Need a trades website that gets more enquiries? Contact dean-da-dev.',
    sections: [
      ['Why trust matters', 'Customers invite tradespeople into homes and businesses, so trust is central. Your website should show proof that you are reliable, professional, and clear about the work you do.'],
      ['Clear service pages', 'Separate pages for plumbing, electrical work, roofing, renovations, emergency callouts, or specialist services can help customers find the exact help they need.'],
      ['Before and after galleries', 'Project galleries help visitors judge quality. Keep images compressed so the gallery strengthens trust without slowing the website down.'],
      ['Reviews and proof', 'Use reviews, trade memberships, insurance details, guarantees, and photos of completed work. Specific proof is more convincing than vague claims.'],
      ['Click-to-call buttons', 'On mobile, calls are often the fastest path to a quote. Click-to-call buttons should be visible, especially for urgent services.'],
      ['Quote forms', 'A good quote form asks enough to qualify the enquiry without becoming a chore. Ask about service type, location, urgency, photos, and contact details.'],
      ['Local areas covered', 'Trades websites should clearly state the towns, cities, and areas served. This helps customers and supports local SEO.'],
    ],
    faqs: [
      ['What should a tradesperson website include?', 'Services, areas covered, photos, reviews, contact details, quote forms, and clear emergency or callout information if relevant.'],
      ['Do trades websites need galleries?', 'They are very useful because customers want to see proof of real work before requesting a quote.'],
      ['Can a website help get better quote requests?', 'Yes, a clear form and service structure can attract more relevant enquiries and reduce vague messages.'],
    ],
    toolLinks: ['/tools/image-compressor', '/free-tools/website-cost-calculator'],
  }),
  blogPost({
    title: 'Website Design for Restaurants: Turning Visitors Into Bookings',
    slug: 'website-design-for-restaurants-bookings',
    category: 'Industry Websites',
    keyword: 'restaurant website design',
    metaTitle: 'Website Design for Restaurants: Turning Visitors Into Bookings',
    metaDescription: 'Learn what restaurants, cafés, and takeaways need on their website to increase bookings, orders, calls, and visits.',
    date: '2026-07-05',
    readTime: '6 min read',
    image: siteImages.websiteScreen,
    excerpt: 'Restaurant websites should make menus, opening hours, booking buttons, location, reviews, and mobile actions effortless to find.',
    cta: 'dean-da-dev can build a premium website for your restaurant or café.',
    sections: [
      ['Menu visibility', 'Visitors should be able to find the menu immediately. Avoid burying menus in hard-to-read PDFs if a clean web page would be faster and easier on mobile.'],
      ['Booking buttons', 'Booking, ordering, and calling should be obvious. Put the main action in the header, hero section, and near menu or offer sections.'],
      ['Opening hours', 'Opening hours, special dates, takeaway times, and kitchen closing times should be easy to scan. Outdated hours are a quick way to lose trust.'],
      ['Location and map', 'Show the address, parking notes, nearby landmarks, and a map link. Local customers often check location immediately before deciding.'],
      ['Food photography', 'Strong photos help restaurants sell the experience. Compress images so they stay sharp without dragging page speed down.'],
      ['Reviews', 'Reviews help visitors choose where to eat. Use genuine review highlights and link to trusted profiles where appropriate.'],
      ['Mobile-first design', 'Restaurant searches often happen while people are out. The website must work quickly on mobile, with tap-friendly buttons and clear navigation.'],
      ['Online ordering or reservation systems', 'Booking and ordering tools can reduce friction, but they need to be integrated cleanly so the journey feels professional.'],
    ],
    faqs: [
      ['Should a restaurant menu be a PDF?', 'A PDF can be useful as a backup, but a mobile-friendly menu page is often easier to read and better for SEO.'],
      ['What is the main goal of a restaurant website?', 'Usually bookings, orders, calls, or visits. The website should make those actions obvious.'],
      ['Do restaurant images slow websites down?', 'They can if they are too large, so compression and WebP conversion are important.'],
    ],
    toolLinks: ['/tools/image-compressor', '/tools/jpg-to-webp'],
  }),
  blogPost({
    title: 'Website Design for Gyms and Fitness Businesses',
    slug: 'website-design-for-gyms-fitness-businesses',
    category: 'Industry Websites',
    keyword: 'gym website design',
    metaTitle: 'Website Design for Gyms and Fitness Businesses',
    metaDescription: 'Learn how gyms, fitness studios, personal trainers, and boxing clubs can use better websites to drive enquiries and memberships.',
    date: '2026-07-05',
    readTime: '6 min read',
    image: siteImages.dashboardAnalytics,
    excerpt: 'Fitness websites need clear memberships, class timetables, trainer profiles, trial CTAs, testimonials, strong visuals, and fast mobile performance.',
    cta: 'Need a premium gym website? Contact dean-da-dev.',
    sections: [
      ['Membership pages', 'Membership options should be easy to compare. Explain what is included, who each plan suits, and what the next step is.'],
      ['Class timetables', 'A clear timetable helps members and prospects plan quickly. Keep it readable on mobile and avoid images that become tiny on phones.'],
      ['Trainer profiles', 'Trainer bios build trust, especially for personal training, boxing, coaching, and specialist classes. Include credentials, style, and who they help.'],
      ['Trial session CTA', 'A trial class, free consultation, or first session CTA gives interested visitors a low-friction way to start. Make it visible throughout the site.'],
      ['Mobile design', 'Fitness customers often browse between work, travel, and training. A mobile-first website makes timetables, sign-up, calls, and maps easy.'],
      ['Testimonials', 'Testimonials, transformation stories, and member reviews help prospects picture themselves joining. Keep claims responsible and believable.'],
      ['Strong fitness visuals', 'Use real photos where possible, but optimise them carefully. Large uncompressed gym images can make an otherwise strong website feel slow.'],
    ],
    faqs: [
      ['What should a gym website include?', 'Memberships, classes, timetable, trainers, trial CTA, location, testimonials, photos, and contact details.'],
      ['Do personal trainers need a website?', 'A website can help personal trainers explain packages, show proof, and turn social traffic into enquiries.'],
      ['How can gyms get more trial bookings?', 'Make the trial offer clear, visible, easy to book, and supported by trust signals.'],
    ],
    toolLinks: ['/tools/image-size-checker', '/free-tools/website-roi-calculator'],
  }),
  blogPost({
    title: 'Website Design for Law Firms: Building Trust Online',
    slug: 'website-design-for-law-firms',
    category: 'Industry Websites',
    keyword: 'law firm website design',
    metaTitle: 'Website Design for Law Firms: Building Trust Online',
    metaDescription: 'Learn what makes a professional law firm website trustworthy, clear, and effective at generating enquiries.',
    date: '2026-07-05',
    readTime: '6 min read',
    image: siteImages.professionalWorkspace,
    excerpt: 'Law firm websites should feel calm, credible, easy to navigate, and structured around practice areas, trust, and clear enquiry routes.',
    cta: 'dean-da-dev builds premium websites for professional service businesses.',
    sections: [
      ['Professional first impression', 'Legal websites need a calm, professional first impression. The design should feel credible, not flashy, and should make expertise easy to understand.'],
      ['Practice area pages', 'Separate pages for services such as conveyancing, family law, employment law, commercial work, or wills and probate help visitors find relevant information.'],
      ['Clear enquiry forms', 'Forms should be simple, secure-feeling, and respectful of sensitive information. Ask for enough context to respond properly without overwhelming the visitor.'],
      ['Mobile-friendly design', 'Potential clients may search on mobile during stressful moments. The website needs readable text, clear phone links, and fast page loading.'],
      ['Trust and credibility', 'Use accreditations, team profiles, experience, reviews where appropriate, and transparent process information. Avoid exaggerated claims.'],
      ['Simple navigation', 'Visitors should not need legal knowledge to navigate. Use plain labels, service groupings, and helpful page introductions.'],
      ['Strong but calm copy', 'Law firm copy should be clear, reassuring, and precise. The tone should reduce anxiety and explain the next step.'],
    ],
    faqs: [
      ['What makes a law firm website trustworthy?', 'Clear practice areas, professional design, team information, credibility signals, and straightforward contact options.'],
      ['Should legal websites use plain English?', 'Yes. Plain English helps clients understand services and take action with more confidence.'],
      ['Can a law firm website be modern without feeling flashy?', 'Yes. Modern design can be restrained, fast, accessible, and professional.'],
    ],
    toolLinks: ['/free-tools/meta-description-generator', '/free-tools/schema-generator'],
  }),
  blogPost({
    title: 'Free Website Tools Every Small Business Should Use',
    slug: 'free-website-tools-for-small-businesses',
    category: 'Free Tools',
    keyword: 'free website tools for small businesses',
    metaTitle: 'Free Website Tools Every Small Business Should Use',
    metaDescription: 'Explore free tools that help small businesses compress images, check file sizes, convert images, and improve website performance.',
    date: '2026-07-05',
    readTime: '5 min read',
    image: siteImages.teamWorkshop,
    excerpt: 'A practical list of free dean-da-dev tools for image compression, size checks, WebP conversion, file size conversion, metadata, and planning.',
    cta: 'Try the free dean-da-dev tools or contact dean-da-dev for a better website.',
    sections: [
      ['Image compressor', 'The image compressor helps reduce JPG, PNG, and WebP file sizes before they go on your website. It is one of the easiest ways to improve loading speed.'],
      ['Image size checker', 'The image size checker helps you spot files that are too large for web use. This is useful before uploading galleries, hero images, menu photos, or service images.'],
      ['WebP converters', 'JPG to WebP and PNG to WebP converters help prepare modern web images that are often smaller than traditional formats.'],
      ['File size converter', 'The file size converter helps you understand KB, MB, GB, and file size differences when planning uploads, downloads, and web assets.'],
      ['Why tools help business owners', 'Free tools help you solve small problems quickly and understand what affects website quality. They also make conversations with a developer clearer.'],
      ['When to get professional website help', 'Tools are helpful, but they cannot replace a strong website structure, design system, SEO setup, booking flow, or conversion plan. When the website affects revenue, professional help is usually worth considering.'],
    ],
    faqs: [
      ['Are the dean-da-dev tools free?', 'Yes. The listed tools are free to use in the browser.'],
      ['Do I need technical knowledge to use them?', 'No. They are designed to be simple enough for business owners as well as developers.'],
      ['When should I contact dean-da-dev instead of using a tool?', 'When the issue affects your whole website, customer journey, performance, SEO, or enquiries.'],
    ],
    toolLinks: ['/tools', '/tools/image-compressor', '/tools/image-size-checker', '/tools/file-size-converter'],
  }),
  blogPost({
    title: 'Why Mobile-Friendly Websites Matter for Local Businesses',
    slug: 'why-mobile-friendly-websites-matter-local-businesses',
    category: 'Web Design',
    keyword: 'mobile friendly website for local business',
    metaTitle: 'Why Mobile-Friendly Websites Matter for Local Businesses',
    metaDescription: 'Most customers browse on mobile. Learn why local businesses need websites that work properly on phones.',
    date: '2026-07-05',
    readTime: '5 min read',
    image: siteImages.mobileCode,
    excerpt: 'Local customers often browse on phones. Learn why mobile layout, click-to-call, speed, forms, and trust signals matter.',
    cta: 'Need a website that works properly on mobile? Contact dean-da-dev.',
    sections: [
      ['Customers search on phones', 'Local searches often happen in the moment: someone needs a barber, solicitor, café, gym, clinic, or tradesperson and checks options on a phone. Your website needs to work in that context.'],
      ['Poor mobile layouts lose enquiries', 'Tiny text, cramped buttons, awkward menus, and broken layouts make people leave. Mobile users need a page that feels designed for their screen.'],
      ['Click-to-call matters', 'For many local businesses, phone calls are still one of the strongest enquiry routes. Click-to-call buttons reduce friction and help urgent visitors act quickly.'],
      ['Fast loading matters', 'Mobile visitors may be on slower connections. Compressed images, clean layouts, and lightweight pages help the site feel professional.'],
      ['Mobile booking forms', 'Booking and enquiry forms should be short, clear, and easy to complete. Long forms with tiny fields create drop-off.'],
      ['Trust and first impressions', 'A mobile-friendly site tells customers the business is active, professional, and easy to deal with. A poor mobile site creates doubt before the conversation starts.'],
    ],
    faqs: [
      ['How do I know if my website is mobile-friendly?', 'Test it on a real phone. Check text size, button spacing, forms, navigation, speed, and whether the main CTA is easy to use.'],
      ['Is mobile design important for SEO?', 'Yes. Mobile usability and page experience matter because most users and search engines expect websites to work well on phones.'],
      ['Can an old website be made mobile-friendly?', 'Sometimes. If the foundations are too dated, a redesign may be more practical than patching.'],
    ],
    toolLinks: ['/tools/image-compressor', '/free-tools/css-generator'],
  }),
  blogPost({
    title: 'How a Better Website Can Help You Get More Enquiries',
    slug: 'how-better-website-gets-more-enquiries',
    category: 'Web Design',
    keyword: 'website get more enquiries',
    metaTitle: 'How a Better Website Can Help You Get More Enquiries',
    metaDescription: 'Learn how better design, clearer calls to action, faster loading, and trust signals can help your website generate more enquiries.',
    date: '2026-07-05',
    readTime: '7 min read',
    image: siteImages.uxPlanning,
    excerpt: 'Better websites do more than look nice. They clarify the message, remove friction, build trust, and make the next step easier.',
    cta: 'dean-da-dev can help turn your website into a stronger enquiry tool.',
    sections: [
      ['Clear message', 'Visitors should quickly understand what you offer, who it is for, why it matters, and what to do next. A clearer message reduces confusion and improves enquiry quality.'],
      ['Better calls to action', 'Strong calls to action are specific and timely. “Request a quote”, “Book a consultation”, or “Start your website project” is usually stronger than a vague “Learn more”.'],
      ['Contact forms', 'A good contact form asks the right questions, confirms what happens next, and works smoothly on mobile. It should help the business respond with context.'],
      ['Reviews and proof', 'People want reassurance before contacting a business. Reviews, project examples, before-and-after images, and clear credentials all support the decision.'],
      ['Service pages', 'Service pages let you explain each offer properly and link visitors to the most relevant action. They also create better SEO opportunities than one generic page.'],
      ['Website speed', 'Speed affects trust and patience. If pages feel slow, visitors may leave before reading the offer. Start by compressing images and checking large files.'],
      ['Mobile design', 'A website that works well on mobile captures enquiries from people searching on the go. Buttons, forms, phone links, and layout all matter.'],
      ['Easy navigation', 'Navigation should help visitors move with confidence. Keep labels plain, group related pages logically, and make contact routes visible.'],
    ],
    faqs: [
      ['Can a better website guarantee more enquiries?', 'No. It cannot guarantee enquiries, but it can remove friction, build trust, and make conversion more likely.'],
      ['What is the fastest improvement to make?', 'Clarify the headline, improve the main CTA, add trust signals, and compress large images.'],
      ['Do service pages help enquiries?', 'Yes. They give visitors more relevant information and clearer reasons to contact you.'],
    ],
    toolLinks: ['/free-tools/website-roi-calculator', '/tools/image-size-checker'],
  }),
];

function blogPost(config) {
  return {
    ...config,
    path: `/blog/${config.slug}`,
    author: 'Dean from dean-da-dev',
    authorBio: 'Dean is a web developer at dean-da-dev, building premium, mobile-friendly websites and free tools for local businesses.',
  };
}

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
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
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
  if (path === '/tools') {
    return {
      Component: ImageToolsHubPage,
      meta: {
        title: 'Free Business & Website Tools | dean-da-dev',
        description: 'Free tools from dean-da-dev to compress images, convert files, check website assets, and improve your online presence. No sign-up, no watermark, no hidden paywall.',
        path,
        schema: imageToolsHubSchema(),
      },
    };
  }

  const imageToolMatch = imageTools.find((item) => item.path === path);
  if (imageToolMatch) {
    return {
      Component: ImageToolPage,
      tool: imageToolMatch,
      meta: metaForImageTool(imageToolMatch),
    };
  }

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

  const blogMatch = BLOG_POSTS.find((post) => post.path === path);
  if (blogMatch) {
    return {
      Component: BlogPostPage,
      post: blogMatch,
      meta: metaForBlogPost(blogMatch),
    };
  }

  if (path === '/blog') {
    return {
      Component: BlogPage,
      meta: {
        title: 'Web Design Blog | dean-da-dev',
        description: 'Helpful web design tips, website speed advice, SEO guidance, and business website ideas from dean-da-dev.',
        path,
        schema: blogCollectionSchema(),
      },
    };
  }

  const routes = {
    '/': [HomePage, 'Dean Da Dev | Free Developer and Business Tools UK', 'Free developer, SEO, AI, and business tools from Dean Da Dev, a UK app, web, AI tool, and automation developer.'],
    '/about': [AboutPage, 'About Dean Da Dev | UK Web, App and AI Developer', 'Meet Dean Da Dev, a UK full-stack developer building websites, apps, AI tools, and automation for growing businesses.'],
    '/services': [ServicesPage, 'App, Web and AI Development Services UK', 'Professional apps, websites, AI tools, automation, dashboards, and business tool development services for UK businesses.'],
    '/portfolio': [PortfolioPage, 'Portfolio | Live Websites and Apps by Dean Da Dev', 'Explore live web, app, ecommerce, and AI projects built and launched by Dean Da Dev.'],
    '/pricing': [PricingPage, 'Pricing | App, Website and AI Tool Development UK', 'Clear starting prices for apps, websites, AI tools, dashboards, and business automation projects.'],
    '/contact': [DiscoveryCallPage, 'Contact dean-da-dev | Start Your Website Project', 'Contact dean-da-dev to discuss a premium, mobile-friendly website, booking system, free tool, app, or business automation project.'],
    '/DiscoveryCall': [DiscoveryCallPage, 'Book a Discovery Call | Dean Da Dev', 'Book a discovery call with Dean Da Dev to discuss a website, app, AI tool, dashboard, or automation project.'],
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
    upsertMeta('property', 'og:image', `${SITE_URL}/images/logo.png`);
    upsertMeta('name', 'twitter:card', 'summary');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', `${SITE_URL}/images/logo.png`);
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
        <img src="/images/logo.png" alt="Dean Da Dev logo" className="brand-logo" />
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
          <div className="brand footer-brand"><img src="/images/logo.png" alt="Dean Da Dev logo" className="brand-logo" /><span>Dean Da Dev</span></div>
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
      <ImageFeatureSection />
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
        <HomeToolsPreview navigate={navigate} />
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

function ImageFeatureSection() {
  const featureImages = [
    [siteImages.professionalWorkspace, 'Discovery', 'Turn business goals into a clear build plan.'],
    [siteImages.techWork, 'Development', 'Design, build, test, and refine with care.'],
    [siteImages.performance, 'Launch', 'Measure performance and improve after release.'],
  ];

  return (
    <section className="image-feature-section">
      <div className="image-feature-inner">
        <div className="image-feature-media">
          {featureImages.map(([image, label, copy]) => (
            <figure className="image-feature-card" key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" />
              <figcaption>
                <strong>{label}</strong>
                <span>{copy}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="image-feature-copy">
          <p className="eyebrow">Plan, build, launch</p>
          <h2>Proper websites and apps start with a clear business conversation.</h2>
          <p>Before a build starts, the goal is mapped around the customer journey, content, conversion points, and the simplest version that can ship well.</p>
          <div className="image-feature-points">
            {['Discovery before design', 'UX planning before code', 'Launch support after build'].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </div>
    </section>
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

function ToolFilter({ activeCategory, onChange, includeAll = true }) {
  const options = [...(includeAll ? [{ slug: 'all', label: 'All', count: tools.length }] : []), ...categories.map((category) => ({
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

function HomeToolsPreview({ navigate }) {
  const [activeCategory, setActiveCategory] = useState('ai-tools');
  const previewTools = categoryTools(activeCategory).slice(0, 3);

  return (
    <>
      <ToolFilter activeCategory={activeCategory} onChange={setActiveCategory} includeAll={false} />
      <ToolGrid tools={previewTools} navigate={navigate} />
    </>
  );
}

function ToolsHubPage({ navigate }) {
  const [activeCategory, setActiveCategory] = useState('business-tools');
  const filteredTools = categoryTools(activeCategory);
  const activeLabel = `${categories.find((category) => category.slug === activeCategory)?.label} Tools`;

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
      <Section tone="dark">
        <SectionHeader eyebrow={activeLabel} title="Choose one tool type at a time." copy="Use the filter to switch between AI, SEO, developer, business, design, performance, accessibility, and security tools without scrolling through everything at once." />
        <ToolFilter activeCategory={activeCategory} onChange={setActiveCategory} includeAll={false} />
        <ToolGrid tools={filteredTools} navigate={navigate} />
      </Section>
    </>
  );
}

const HUB_BENEFITS = [
  ['🆓', 'Free to Use', 'Every tool on this page is completely free. No hidden costs, no premium tier.'],
  ['🔐', 'No Sign-Up', 'No account needed. Open a tool, use it, leave. No email required.'],
  ['💧', 'No Watermark', 'Your files come back clean. No branding, no stamps added.'],
  ['⚡', 'Fast & Simple', 'Tools load fast and stay out of the way. Upload, convert, download.'],
  ['🌐', 'Built for Website Speed', 'Compression and conversion tools designed with web performance in mind.'],
  ['🏢', 'Useful for Business', 'File tools for businesses that send proposals, publish content, or manage websites.'],
];

const HUB_FAQS = [
  { q: 'Are these tools really free?', a: 'Yes. Every tool on this page is completely free to use with no sign-up, no subscription, and no hidden costs.' },
  { q: 'Do I need to create an account?', a: 'No. There is no account or sign-up required for any tool on this page.' },
  { q: 'Will there be a watermark on my files?', a: 'No. Your converted and compressed files are completely clean. No logos, branding, or watermarks are added.' },
  { q: 'Are my files private?', a: 'Yes. All file processing happens locally in your browser using JavaScript. Your files are never uploaded to any server.' },
  { q: 'Why should I compress images for my website?', a: 'Large images are one of the most common reasons websites load slowly. Compressing images reduces page load time, improves user experience, and can positively affect your Google search ranking.' },
  { q: 'What is WebP?', a: 'WebP is a modern image format developed by Google. It produces files 25–35% smaller than JPG or PNG at similar quality, making it ideal for website images. All modern browsers support WebP.' },
  { q: 'Can dean-da-dev help improve my website?', a: 'Yes. If your website feels slow, outdated, or is not generating enquiries, dean-da-dev can build a professional, mobile-friendly website designed to make your business look credible and attract more customers.' },
  { q: 'Can I use these tools on mobile?', a: 'Yes. All tools are fully responsive and work on phones, tablets, and desktops.' },
];

function ImageToolCard({ tool: item, navigate }) {
  return (
    <a className="image-tool-card" href={item.path} onClick={(e) => handleLink(e, item.path, navigate)}>
      <div className="image-tool-card-icon" aria-hidden="true">{TOOL_ICONS[item.slug] || '🛠️'}</div>
      <h3>{item.name}</h3>
      <p>{item.short}</p>
      <span className="image-tool-card-cta">Use tool →</span>
    </a>
  );
}

function ImageToolsHubPage({ navigate }) {
  const imageOnlyTools = imageTools.filter((t) =>
    ['image-compressor', 'jpg-to-webp', 'png-to-webp', 'webp-to-png', 'png-to-jpg', 'jpg-to-png', 'image-size-checker'].includes(t.slug)
  );
  const pdfTools = imageTools.filter((t) => ['pdf-compressor', 'image-to-pdf', 'file-size-converter'].includes(t.slug));

  return (
    <>
      <section className="tools-hub-hero">
        <div className="hero-bg" />
        <div className="tools-hub-hero-inner">
          <p className="eyebrow">dean-da-dev · Free Tools</p>
          <h1>Free Tools for Faster Websites and Smarter Business Tasks.</h1>
          <p className="tools-hub-hero-copy">Use free tools from dean-da-dev to compress images, convert files, check website assets, and improve your online presence. No sign-up, no watermark, no hidden paywall.</p>
          <div className="button-row">
            <Button href="#tools" navigate={navigate}>Start Using Tools</Button>
            <Button href="/services" variant="secondary" navigate={navigate}>View Web Design Services</Button>
          </div>
          <div className="tools-hub-badges">
            {['Free to use', 'No sign-up', 'No watermark', 'Browser-based', 'Privacy-friendly'].map((b) => (
              <span className="tool-badge" key={b}>{b}</span>
            ))}
          </div>
          <div className="tools-hub-fazier-badge">
            <a href="https://fazier.com" target="_blank" rel="noopener noreferrer">
              <img src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=light" width="120" alt="Fazier badge" />
            </a>
          </div>
        </div>
      </section>

      <Section tone="dark" className="anchor-section">
        <div id="tools" />
        <SectionHeader eyebrow="Image Tools" title="Compress, convert, and check images for your website." copy="All image tools run directly in your browser. Your files never leave your device." />
        <div className="image-tools-grid">
          {imageOnlyTools.map((t) => <ImageToolCard key={t.slug} tool={t} navigate={navigate} />)}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="PDF & File Tools" title="Compress PDFs, convert images to PDF, and calculate file sizes." copy="Process PDF files and calculate file sizes, all without uploading anything to a server." />
        <div className="image-tools-grid">
          {pdfTools.map((t) => <ImageToolCard key={t.slug} tool={t} navigate={navigate} />)}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeader eyebrow="Developer & SEO Tools" title="More free tools for building better websites." copy="Dean Da Dev also offers a full suite of free developer, SEO, AI, and business tools." />
        <div className="image-tools-grid">
          {tools.slice(0, 6).map((t) => (
            <a className="image-tool-card" href={t.path} onClick={(e) => handleLink(e, t.path, navigate)} key={t.slug}>
              <div className="image-tool-card-icon" aria-hidden="true">🛠️</div>
              <h3>{t.name}</h3>
              <p>{t.short}</p>
              <span className="image-tool-card-cta">Open tool →</span>
            </a>
          ))}
        </div>
        <div className="center-gap">
          <Button href="/free-tools" navigate={navigate}>See all developer &amp; SEO tools</Button>
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeader eyebrow="Why Use These Tools" title="Built for businesses, developers, and website owners." copy="No account needed. No watermarks. Files stay on your device." />
        <div className="benefits-grid">
          {HUB_BENEFITS.map(([icon, title, copy]) => (
            <div className="benefit-card" key={title}>
              <div className="benefit-icon" aria-hidden="true">{icon}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeader eyebrow="Website Performance" title="Why file size matters for your website." />
        <div className="speed-education">
          <p>Large images and oversized files are one of the most common reasons small business websites feel slow. When a visitor lands on a slow page, they often leave before it finishes loading — and that hurts both your enquiry rate and your Google ranking.</p>
          <p>Compressing images, converting to modern formats like WebP, and keeping assets lightweight can significantly improve your website's performance. Google uses page speed as a ranking factor. Faster websites hold visitors' attention longer, which means more enquiries and more sales.</p>
          <p>As a rough guide: most website images should be under 200 KB. Use WebP format where possible. Keep PDFs compact for email and download links. These are small changes that make a real difference.</p>
          <div className="speed-tips">
            {[
              ['📷', 'Images', 'Aim for under 200 KB per image. Use WebP format for the web.'],
              ['📄', 'PDFs', 'Compress PDFs before using them as email attachments or downloads.'],
              ['🌐', 'Performance', 'Faster pages rank better and convert better. Start with your images.'],
            ].map(([icon, label, copy]) => (
              <div className="speed-tip" key={label}>
                <span aria-hidden="true">{icon}</span>
                <div><strong>{label}</strong><p>{copy}</p></div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section className="tools-service-cta">
        <div className="tools-service-cta-inner">
          <p className="eyebrow">Need more than free tools?</p>
          <h2>Build a faster, more professional website with dean-da-dev.</h2>
          <p>If your website feels slow, outdated, or hard to use, dean-da-dev can help you build a premium, mobile-friendly website designed to make your business look professional and get more enquiries.</p>
          <div className="button-row">
            <Button href={BOOKING_URL} navigate={navigate}>Book a free discovery call</Button>
            <Button href="/services" variant="secondary" navigate={navigate}>View web design services</Button>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="FAQ" title="Common questions about the free tools." />
        <FAQList faqs={HUB_FAQS} />
      </Section>
    </>
  );
}

function ImageToolPage({ route, navigate }) {
  const item = route.tool;
  const related = imageTools.filter((t) => t.slug !== item.slug).slice(0, 3);

  return (
    <>
      <section className="tool-hero">
        <div className="tool-hero-inner">
          <Breadcrumbs items={[['Home', '/'], ['Tools', '/tools'], [item.name, item.path]]} navigate={navigate} />
          <p className="eyebrow">Free Online Tool</p>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <div className="tools-hub-badges" style={{ marginTop: 16 }}>
            {['Free to use', 'No sign-up', 'No watermark', 'Browser-based'].map((b) => (
              <span className="tool-badge" key={b}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      <Section className="tool-section">
        <div id="tool" />
        <div className="tool-layout">
          <ImageToolWorkspace slug={item.slug} />
          <aside className="tool-aside">
            <div className="mini-panel">
              <h2>Need a faster website?</h2>
              <p>Large images slow down websites. dean-da-dev builds professionally optimised websites for UK businesses that load fast and convert visitors into enquiries.</p>
              <Button href={BOOKING_URL}>Book a free call</Button>
            </div>
            <div className="mini-panel">
              <h2>Privacy</h2>
              <p>All file processing happens in your browser. Your files are never uploaded to any server.</p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeader eyebrow="Related Tools" title="Keep going with the next useful task." copy="Use these tools together to optimise images and files for your website." />
        <div className="image-tools-grid">
          {related.map((t) => <ImageToolCard key={t.slug} tool={t} navigate={navigate} />)}
        </div>
        <div className="center-gap" style={{ marginTop: 24 }}>
          <Button href="/tools" variant="secondary" navigate={navigate}>See all free tools</Button>
        </div>
      </Section>

      <section className="tools-service-cta">
        <div className="tools-service-cta-inner">
          <p className="eyebrow">Need this built properly?</p>
          <h2>Large images can slow down your website.</h2>
          <p>If your website feels slow or outdated, dean-da-dev can help you build a faster, more professional website — optimised images, clean code, and performance best practices included as standard.</p>
          <Button href={BOOKING_URL} navigate={navigate}>Improve My Website</Button>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="FAQ" title={`Questions about the ${item.name.toLowerCase()}.`} />
        <FAQList faqs={item.faqs} />
      </Section>

      <LeadCTA />
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
  const services = [
    ['Apps', 'App Development', 'Mobile apps and progressive web apps for customer portals, booking flows, marketplaces, AI products, and MVP launches.', siteImages.appPhone],
    ['Websites', 'Web Development', 'Premium websites, landing pages, SEO foundations, booking flows, ecommerce, and CMS builds.', siteImages.websiteDesignScreen],
    ['Operations', 'Business Tools', 'Practical dashboards, calculators, client intake forms, admin views, and workflow helpers for smaller business operations.', siteImages.businessTools],
    ['AI', 'AI Development', 'Prompt systems, AI assistants, automations, document workflows, and lead-generation tools.', siteImages.codeDesk],
  ];

  return (
    <Section>
      <SectionHeader eyebrow="Services" title="When a free tool is not enough, hire the builder." copy="Dean Da Dev designs and ships the production version: mobile apps, fast websites, dashboards, AI workflows, automation, and useful business tools." />
      <div className="service-grid">
        {services.map(([label, title, copy, image]) => (
          <div className="service-card" key={title}>
            <img src={image.src} alt={image.alt} loading="lazy" />
            <span>{label}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
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
  return <><Hero eyebrow="Services" title="App development, web development, AI tools, and automation for UK businesses." copy="From a conversion-focused website to a mobile app, dashboard, or AI workflow, Dean Da Dev handles planning, UX, development, launch, and iteration." primary={['See what you get', '#services-detail']} secondary={['View pricing', '/pricing']} navigate={navigate} /><ImageFeatureSection /><ServicesDetail /><LeadCTA /></>;
}

const MY_PRODUCTS = [
  {
    name: 'Bookrightly',
    tag: 'Booking SaaS',
    url: 'https://www.bookrightly.co.uk/',
    img: '/images/1.jpg',
    desc: 'A UK booking marketplace for barbers, hairdressers, decorators, and personal trainers. Each business gets a public profile, online booking, Stripe payments, and a full dashboard — all on one platform.',
    tags: ['React', 'Firebase', 'Stripe', 'PWA', 'Cloudflare Workers'],
  },
  {
    name: 'Js Grw Up',
    tag: 'Mobile App',
    url: 'https://js-grw-up.com/',
    img: '/images/2.jpg',
    desc: 'A co-parenting mobile app helping separated parents coordinate schedules, communicate clearly, and keep everything in one place.',
    tags: ['React Native', 'Firebase', 'Mobile'],
  },
  {
    name: "DB's AI Trainer",
    tag: 'AI App',
    url: 'https://dbworkouts.co.uk/ai-plans',
    img: '/images/4.jpg',
    desc: 'A personal AI fitness trainer that generates custom workout plans, tracks progress, and adapts its recommendations to the user over time. Built for DB\'s Workouts.',
    tags: ['React', 'AI', 'Firebase'],
  },
];

const PORTFOLIO_APPS = [
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

const DEMO_SITES = [
  {
    name: 'The Beauty Studio',
    tag: 'Salon & Booking System',
    industry: 'Hair salons · Beauty · Barbers',
    url: 'https://dean1234533.github.io/The-Beauty-Studio-Premium-Booking-Website-Demo/',
    adminUrl: 'https://dean1234533.github.io/The-Beauty-Studio-Premium-Booking-Website-Demo/admin',
    desc: 'Premium salon website with an online booking system and admin panel. Show this to hair salon, beauty, and barber prospects.',
  },
  {
    name: 'Da Gym',
    tag: 'Fitness Website',
    industry: 'Gyms · Personal trainers · Fitness centres',
    url: 'https://dean1234533.github.io/Da-Gym-Premium-Fitness-Website-Mockup/',
    desc: 'High-impact gym and fitness website with membership sections, class timetable, and trainer profiles. Built for outreach to fitness businesses.',
  },
  {
    name: 'The Law Firm',
    tag: 'Professional Services',
    industry: 'Law firms · Solicitors',
    url: 'https://dean1234533.github.io/Da-Law-Firm-Premium-Law-Firm-Website-Mockup/',
    desc: 'A calm, credible law firm website with practice area pages, team profiles, and a clear enquiry flow. Built to close legal sector prospects.',
  },
  {
    name: 'Apex Boxing Club',
    tag: 'Sports & Fitness',
    industry: 'Boxing clubs · Martial arts · Sports clubs',
    url: 'https://dean1234533.github.io/Apex-boxing-club-Premium-Website-Mockup/',
    desc: 'Bold, energetic boxing club website with class schedules, coach bios, and a trial session CTA. Works for any combat sport or sports club.',
  },
];

function PortfolioPage({ navigate }) {
  return (
    <>
      <Hero
        eyebrow="Portfolio"
        title="Live products, client work, and industry demos."
        copy="Products I own, websites and apps built for clients, and industry demo sites you can use to close deals in your target sectors."
        primary={['Book a discovery call', BOOKING_URL]}
        secondary={['View pricing', '/pricing']}
        navigate={navigate}
      />

      {/* My Products */}
      <Section tone="dark">
        <SectionHeader eyebrow="My Products" title="Apps and platforms I built, own, and run." copy="Not client work. These are live products with real users — built, launched, and maintained by Dean Da Dev." />
        <div className="my-products-grid">
          {MY_PRODUCTS.map((product) => (
            <div className="my-product-card" key={product.name}>
              <img src={product.img} alt={`${product.name} built by Dean Da Dev`} loading="lazy" />
              <div className="my-product-body">
                <span>{product.tag}</span>
                <h3>{product.name}</h3>
                <p>{product.desc}</p>
                <div className="featured-project-tags">
                  {product.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <a className="button button-primary button-small" href={product.url} target="_blank" rel="noopener noreferrer">View live site</a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Demo Sites */}
      <Section>
        <SectionHeader eyebrow="Industry Demos" title="Ready-made demos for outreach." copy="Use these to show prospects exactly what their industry website could look like — before they commit to anything." />
        <div className="demo-grid">
          {DEMO_SITES.map((demo) => (
            <div className="demo-card" key={demo.name}>
              <div className="demo-card-header">
                <span>{demo.tag}</span>
                <p className="demo-industry">{demo.industry}</p>
              </div>
              <h3>{demo.name}</h3>
              <p>{demo.desc}</p>
              <div className="demo-card-links">
                <a href={demo.url} target="_blank" rel="noopener noreferrer" className="button button-primary button-small">View demo</a>
                {demo.adminUrl && (
                  <a href={demo.adminUrl} target="_blank" rel="noopener noreferrer" className="button button-secondary button-small">Admin demo</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Client Work */}
      <Section tone="dark">
        <SectionHeader eyebrow="Client Work" title="Projects built for real businesses." copy="Each one live, deployed, and in active use by the client." />
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

function BlogPage({ navigate }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const featured = BLOG_POSTS.slice(0, 3);
  const visiblePosts = activeCategory === 'All' ? BLOG_POSTS : BLOG_POSTS.filter((post) => post.category === activeCategory);
  const popular = [BLOG_POSTS[2], BLOG_POSTS[0], BLOG_POSTS[10], BLOG_POSTS[11]];

  return (
    <>
      <section className="blog-hero">
        <div className="hero-bg" />
        <div className="blog-hero-inner">
          <p className="eyebrow">dean-da-dev Blog</p>
          <h1>Web Design Tips for Small Businesses</h1>
          <p>Helpful advice on building faster, better, and more professional websites for local businesses.</p>
          <div className="button-row">
            <Button href="#latest-posts" navigate={navigate}>View Latest Posts</Button>
            <Button href="/contact" variant="secondary" navigate={navigate}>Work With dean-da-dev</Button>
          </div>
        </div>
      </section>

      <Section tone="dark">
        <SectionHeader eyebrow="Featured Posts" title="Start with the decisions that shape a better website." copy="Practical guides for cost, redesigns, speed, bookings, local SEO, and better enquiry journeys." />
        <div className="featured-post-grid">
          {featured.map((post) => <FeaturedBlogCard post={post} navigate={navigate} key={post.slug} />)}
        </div>
      </Section>

      <Section className="blog-list-section">
        <div id="latest-posts" className="anchor-target" />
        <SectionHeader eyebrow="Latest Articles" title="Browse web design guides by topic." copy="Filter the blog by the problem you are trying to solve: speed, SEO, redesigns, booking systems, industry websites, or free tools." />
        <BlogCategoryFilter activeCategory={activeCategory} onChange={setActiveCategory} />
        <div className="blog-content-layout">
          <div className="blog-grid">
            {visiblePosts.map((post) => <BlogCard post={post} navigate={navigate} key={post.slug} />)}
          </div>
          <BlogSidebar popular={popular} navigate={navigate} />
        </div>
      </Section>

      <section className="blog-service-cta">
        <div className="blog-service-cta-inner">
          <p className="eyebrow">Website Project</p>
          <h2>Need a better website for your business?</h2>
          <p>dean-da-dev builds premium, mobile-friendly websites that help local businesses look professional, build trust, and get more enquiries.</p>
          <Button href="/contact" navigate={navigate}>Start Your Website Project</Button>
        </div>
      </section>
    </>
  );
}

function BlogCategoryFilter({ activeCategory, onChange }) {
  const options = ['All', ...BLOG_CATEGORIES].map((category) => ({
    category,
    count: category === 'All' ? BLOG_POSTS.length : BLOG_POSTS.filter((post) => post.category === category).length,
  }));

  return (
    <div className="tool-filter blog-filter" aria-label="Filter blog posts by category">
      {options.map(({ category, count }) => (
        <button
          className={activeCategory === category ? 'active' : ''}
          type="button"
          onClick={() => onChange(category)}
          aria-pressed={activeCategory === category}
          key={category}
        >
          <span>{category}</span>
          <strong>{count}</strong>
        </button>
      ))}
    </div>
  );
}

function FeaturedBlogCard({ post, navigate }) {
  return (
    <article className="featured-post-card">
      <BlogImage post={post} />
      <div>
        <span>{post.category}</span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <small>{post.readTime}</small>
        <Button href={post.path} variant="secondary" navigate={navigate}>Read Article</Button>
      </div>
    </article>
  );
}

function BlogCard({ post, navigate }) {
  return (
    <article className="blog-card">
      <a href={post.path} onClick={(event) => handleLink(event, post.path, navigate)} aria-label={`Read ${post.title}`}>
        <BlogImage post={post} />
      </a>
      <div className="blog-card-body">
        <span>{post.category}</span>
        <h3><a href={post.path} onClick={(event) => handleLink(event, post.path, navigate)}>{post.title}</a></h3>
        <p>{post.excerpt}</p>
        <div className="blog-card-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <small>{post.readTime}</small>
        </div>
        <a className="read-more-link" href={post.path} onClick={(event) => handleLink(event, post.path, navigate)}>Read more</a>
      </div>
    </article>
  );
}

function BlogSidebar({ popular, navigate }) {
  return (
    <aside className="blog-sidebar" aria-label="Blog resources">
      <div className="blog-sidebar-panel">
        <h2>Popular articles</h2>
        {popular.map((post) => (
          <a href={post.path} onClick={(event) => handleLink(event, post.path, navigate)} key={post.slug}>{post.title}</a>
        ))}
      </div>
      <div className="blog-sidebar-panel">
        <h2>Free tools</h2>
        <p>Compress images, check file sizes, convert WebP files, and plan website budgets.</p>
        <Button href="/tools" navigate={navigate}>Open Free Tools</Button>
      </div>
      <div className="blog-sidebar-panel">
        <h2>Web design services</h2>
        <p>Need the site reviewed, redesigned, or built properly? Start with a short project conversation.</p>
        <Button href="/services" variant="secondary" navigate={navigate}>View Services</Button>
        <a href="/contact" onClick={(event) => handleLink(event, '/contact', navigate)}>Contact dean-da-dev</a>
      </div>
    </aside>
  );
}

function BlogPostPage({ route, navigate }) {
  const post = route.post;
  const related = relatedBlogPosts(post);

  return (
    <>
      <section className="blog-post-hero">
        <div className="blog-post-hero-inner">
          <Breadcrumbs items={[['Home', '/'], ['Blog', '/blog'], [post.title, post.path]]} navigate={navigate} />
          <p className="eyebrow">{post.category}</p>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="blog-post-meta">
            <span>{post.author}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <Section className="blog-article-section">
        <div className="blog-article-layout">
          <article className="blog-article">
            <BlogImage post={post} />
            <p className="blog-intro">{introForPost(post)}</p>
            <nav className="table-of-contents" aria-label="Table of contents">
              <h2>Table of contents</h2>
              {post.sections.map(([heading]) => <a href={`#${slugify(heading)}`} key={heading}>{heading}</a>)}
              <a href="#faq">FAQs</a>
            </nav>
            {post.sections.map(([heading, copy], index) => (
              <section id={slugify(heading)} key={heading}>
                <h2>{heading}</h2>
                <p>{copy}</p>
                {index === 2 && (
                  <div className="article-note">
                    <h3>Helpful next step</h3>
                    <p>Use the linked dean-da-dev tools to check the basics, then get professional help when the issue affects enquiries, speed, or trust.</p>
                  </div>
                )}
              </section>
            ))}
            <div className="article-links-panel">
              <h2>Useful links for this topic</h2>
              <div>
                {post.toolLinks.map((href) => <ArticleInternalLink href={href} navigate={navigate} key={href} />)}
                <ArticleInternalLink href="/services" navigate={navigate} label="Web design services" />
                <ArticleInternalLink href="/contact" navigate={navigate} label="Contact dean-da-dev" />
              </div>
            </div>
            <section className="article-cta">
              <h2>{post.cta}</h2>
              <p>Get a website that is clear, fast, mobile-friendly, and connected to the way your customers actually make decisions.</p>
              <Button href="/contact" navigate={navigate}>Start Your Website Project</Button>
            </section>
            <section id="faq" className="article-faq">
              <h2>FAQs</h2>
              <FAQList faqs={post.faqs.map(([q, a]) => ({ q, a }))} />
            </section>
            <section className="author-box">
              <img src="/images/dean.png" alt="Dean from dean-da-dev" loading="lazy" />
              <div>
                <h2>{post.author}</h2>
                <p>{post.authorBio}</p>
              </div>
            </section>
          </article>
          <aside className="related-posts">
            <h2>Related posts</h2>
            {related.map((item) => (
              <a href={item.path} onClick={(event) => handleLink(event, item.path, navigate)} key={item.slug}>
                <span>{item.category}</span>
                <strong>{item.title}</strong>
              </a>
            ))}
          </aside>
        </div>
      </Section>
    </>
  );
}

function BlogImage({ post }) {
  return (
    <figure className="blog-image">
      <img src={post.image.src} alt={`${post.title} - ${post.image.alt}`} loading="lazy" />
    </figure>
  );
}

function ArticleInternalLink({ href, navigate, label }) {
  return <a href={href} onClick={(event) => handleLink(event, href, navigate)}>{label || labelForInternalLink(href)}</a>;
}

function ResourcesPage({ navigate }) {
  const guides = resourceGuides();
  const [activeCategory, setActiveCategory] = useState('business-tools');
  const filteredGuides = guides.filter((guide) => guide.categories.includes(activeCategory));
  const activeLabel = categories.find((category) => category.slug === activeCategory)?.label || 'Business';

  return (
    <>
      <Hero eyebrow="Resources" title="Guides that help businesses plan better digital projects." copy="Every guide supports a tool, answers search intent, and builds confidence before a client conversation." primary={['Explore tools', '/free-tools']} secondary={['Hire Dean', BOOKING_URL]} navigate={navigate} />
      <Section>
        <SectionHeader eyebrow={`${activeLabel} Guides`} title="Filter guides by the thing you are trying to plan." copy="Choose one category at a time so mobile visitors do not have to scroll through every resource card." />
        <ResourceFilter activeCategory={activeCategory} onChange={setActiveCategory} guides={guides} />
        <div className="resource-grid">{filteredGuides.map((guide) => <a className="resource-card" href={guide.path} onClick={(event) => handleLink(event, guide.path, navigate)} key={guide.path}><span>{guide.toolName}</span><h3>{guide.title}</h3><p>{guide.description}</p></a>)}</div>
      </Section>
    </>
  );
}

function ResourceFilter({ activeCategory, onChange, guides }) {
  const options = categories.map((category) => ({
    ...category,
    count: guides.filter((guide) => guide.categories.includes(category.slug)).length,
  })).filter((category) => category.count > 0);

  return (
    <div className="tool-filter resource-filter" aria-label="Filter resource guides by category">
      {options.map((option) => (
        <button
          className={activeCategory === option.slug ? 'active' : ''}
          type="button"
          onClick={() => onChange(option.slug)}
          key={option.slug}
          aria-pressed={activeCategory === option.slug}
          aria-label={`Show ${option.label} guides`}
        >
          <span>{option.label}</span>
          <strong>{option.count}</strong>
        </button>
      ))}
    </div>
  );
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

function relatedBlogPosts(post) {
  const categoryMatches = BLOG_POSTS.filter((candidate) => candidate.slug !== post.slug && candidate.category === post.category);
  const fallback = BLOG_POSTS.filter((candidate) => candidate.slug !== post.slug && !categoryMatches.includes(candidate));
  return [...categoryMatches, ...fallback].slice(0, 3);
}

function introForPost(post) {
  return `If you are a UK small business owner thinking about ${post.keyword}, this guide explains the practical website decisions that matter before you spend time or money. The aim is to help you understand the issue clearly, use the right free tools where they help, and know when a professional website build is the better route.`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value));
}

function labelForInternalLink(href) {
  const named = {
    '/tools': 'Free website tools',
    '/services': 'Web design services',
    '/contact': 'Contact dean-da-dev',
  };
  if (named[href]) return named[href];
  const allTools = [...imageTools, ...tools];
  const match = allTools.find((item) => item.path === href);
  return match ? match.name : labelForPath(href);
}

function resourceGuides() {
  return tools.flatMap((item) => {
    const titles = guideMap[item.slug] || [`How to use the ${item.name} effectively`];
    return titles.map((title) => ({
      title,
      toolName: item.name,
      toolPath: item.path,
      categories: item.categories,
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

function blogCollectionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Web Design Blog | dean-da-dev',
    url: `${SITE_URL}/blog`,
    description: 'Helpful web design tips, website speed advice, SEO guidance, and business website ideas from dean-da-dev.',
    blogPost: BLOG_POSTS.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE_URL}${post.path}`,
      description: post.metaDescription,
      datePublished: post.date,
      author: { '@type': 'Person', name: post.author },
    })),
  };
}

function blogPostSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema([
        ['Home', '/'],
        ['Blog', '/blog'],
        [post.title, post.path],
      ]),
      {
        '@type': 'Article',
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.date,
        dateModified: post.date,
        author: { '@type': 'Person', name: post.author, description: post.authorBio },
        publisher: { '@type': 'Organization', name: 'dean-da-dev', logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png` } },
        image: `${SITE_URL}${post.image.src}`,
        mainEntityOfPage: `${SITE_URL}${post.path}`,
        keywords: post.keyword,
      },
      faqSchema(post.faqs.map(([q, a]) => ({ q, a }))),
    ],
  };
}

function metaForBlogPost(post) {
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    path: post.path,
    schema: blogPostSchema(post),
  };
}

function imageToolsHubSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Free Business & Website Tools | dean-da-dev',
    url: `${SITE_URL}/tools`,
    description: 'Free tools to compress images, convert files, check website assets, and improve online presence. No sign-up, no watermark.',
    hasPart: imageTools.map((item) => ({
      '@type': 'SoftwareApplication',
      name: item.name,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
      url: `${SITE_URL}${item.path}`,
      description: item.description,
    })),
  };
}

function metaForImageTool(item) {
  return {
    title: item.title,
    description: item.metaDescription,
    path: item.path,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumbSchema([['Home', '/'], ['Tools', '/tools'], [item.name, item.path]]),
        {
          '@type': 'SoftwareApplication',
          name: item.name,
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
          url: `${SITE_URL}${item.path}`,
          description: item.description,
        },
        faqSchema(item.faqs),
      ],
    },
  };
}

export default App;
