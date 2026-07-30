export const SITE_URL = 'https://dean-da-dev.co.uk';
export const BOOKING_URL = '/DiscoveryCall';
export const BOOKING_EMBED_URL = 'https://coding-leads.vercel.app/book';
export const GBP_URL = 'https://share.google/tm6xClvShNu7cLlYt';
export const BUSINESS_LOCATION = 'Stratford, London';
export const BUSINESS_HOURS = 'Mon–Fri, 9am–5pm (UK)';
export const MAP_EMBED_URL = 'https://www.google.com/maps?q=Stratford,+London&output=embed';

export const locationAreas = [
  {
    slug: 'stratford',
    name: 'Stratford',
    intro: 'Home to the Queen Elizabeth Olympic Park and Westfield Stratford City, Stratford has been one of London\'s fastest-growing business and retail hubs since the 2012 Olympics.',
    context: 'With the Elizabeth line, Jubilee line, Central line, and DLR all running through it, Stratford is one of the best-connected commercial areas in East London — which means the businesses here compete with a lot more than the shop next door. A website that loads fast, works properly on mobile, and explains the offer clearly matters more here than almost anywhere else in East London.',
  },
  {
    slug: 'forest-gate',
    name: 'Forest Gate',
    intro: 'Forest Gate borders Wanstead Flats and has a growing scene of independent cafés, restaurants, and small businesses along Woodgrange Road and Green Street.',
    context: 'A lot of Forest Gate businesses are still relying on a Google Business Profile and word of mouth alone. A proper website — even a simple one — gives independent shops and service businesses here a way to be found by people searching online, not just people walking past.',
  },
  {
    slug: 'wanstead',
    name: 'Wanstead',
    intro: 'Wanstead has a leafy, village feel centred on Wanstead High Street and Wanstead Park, with a strong base of independent shops, clinics, and family-run businesses.',
    context: 'Wanstead customers tend to research before they buy or book — clinics, salons, and independent retailers here benefit most from a website that builds trust quickly: clear service pages, real photos, reviews, and an easy way to get in touch or book.',
  },
  {
    slug: 'ilford',
    name: 'Ilford',
    intro: 'Ilford is a major town centre in the London Borough of Redbridge, with a busy retail and service economy centred on Ilford Lane and the town centre shopping area.',
    context: 'With so much competition concentrated in one town centre, Ilford businesses need a website that makes the case for choosing them specifically — clear pricing signals, strong service pages, and fast mobile loading, since most local searches here happen on a phone.',
  },
  {
    slug: 'leyton',
    name: 'Leyton',
    intro: 'Leyton sits close to the Queen Elizabeth Olympic Park and is home to Leyton Orient FC, with a mix of independent retail, trades, and hospitality businesses along Leyton High Road.',
    context: 'Trades and hospitality businesses in Leyton often lose enquiries simply because there is no clear way to get a quote or book online outside of opening hours. A website with a proper enquiry form and clear service pages captures that demand instead of losing it.',
  },
  {
    slug: 'leytonstone',
    name: 'Leytonstone',
    intro: 'Leytonstone is known for its high road shops and markets, a strong small business community, and good transport links via the Central line.',
    context: 'Independent businesses on Leytonstone High Road are often up against national chains with much bigger marketing budgets. A clear, fast, well-structured website is one of the few ways a local business can compete on trust and findability without competing on ad spend.',
  },
  {
    slug: 'east-ham',
    name: 'East Ham',
    intro: 'East Ham has one of East London\'s busiest high streets, with a dense concentration of independent retailers and service businesses.',
    context: 'On a high street this competitive, a business without a website is effectively invisible to anyone searching online before they visit. Even a focused, few-page site with clear services and a way to make contact puts a business back in the running.',
  },
  {
    slug: 'west-ham',
    name: 'West Ham',
    intro: 'West Ham is close to the Olympic Park and carries strong footballing heritage, alongside a growing mix of local trades and small businesses.',
    context: 'Trades and service businesses around West Ham often rely entirely on referrals. A simple, professional website gives those referrals somewhere credible to land — and picks up the local searches that referrals alone will always miss.',
  },
  {
    slug: 'manor-park',
    name: 'Manor Park',
    intro: 'Manor Park is a residential area with a steadily growing small business and trades community along Romford Road.',
    context: 'For trades and home-service businesses based in Manor Park, most new enquiries start with a phone search. A mobile-friendly website with click-to-call, clear service areas, and a simple quote form turns more of those searches into actual enquiries.',
  },
];

export const categories = [
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

export const guideMap = {
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

const CATEGORY_FAQ = {
  Business: { q: 'How accurate is this for a real budget or forecast?', a: 'It is designed as a planning range, not a fixed quote. Use it to sense-check a project before a formal scope and price are agreed.' },
  AI: { q: 'Will this work with any AI model?', a: 'Yes. The output is plain text designed to work with ChatGPT, Claude, Gemini, and other AI assistants.' },
  SEO: { q: 'Will this affect my Google ranking directly?', a: 'Not on its own. It produces correct, well-structured output that removes technical barriers, which supports — but does not guarantee — better rankings.' },
  Developer: { q: 'Can I use the output in production code?', a: 'Yes. The output is generated locally in your browser and is safe to copy directly into your project.' },
  Design: { q: 'Will the output match my existing brand?', a: 'It gives you a strong starting point. Adjust the base values to fit your existing brand colours, spacing, and type scale.' },
  Performance: { q: 'How much faster will my site actually be?', a: 'Results depend on your existing setup, but removing unnecessary bytes from this file type is a real, measurable speed win.' },
  Productivity: { q: 'Can I reuse this for multiple projects?', a: 'Yes. There is no limit on how many times you can use the tool, and nothing is saved between sessions.' },
  Security: { q: 'Is anything I generate sent anywhere or logged?', a: 'No. Generation happens entirely in your browser and nothing is transmitted to or stored on a server.' },
};

export const tools = [
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

export const imageTools = [
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
      { q: 'Can dean-da-dev build my website?', a: 'Yes. dean-da-dev builds fast, modern websites for UK businesses from £249. Book a discovery call to get started.' },
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

export const TOOL_ICONS = {
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
  const categoryFaq = CATEGORY_FAQ[primaryCategory];
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
        a: `Yes. The ${name} is free to use in your browser with no sign-up required. It was built to ${description.charAt(0).toLowerCase()}${description.slice(1).replace(/\.$/, '')}.`,
      },
      {
        q: 'Can Dean Da Dev build this properly into my website or app?',
        a: 'Yes. If you need a polished customer-facing version, Dean Da Dev can design, build, integrate, and deploy it professionally.',
      },
      {
        q: 'Does this tool store my data?',
        a: 'No. The tool runs entirely in your browser and is designed for quick, one-off use rather than saved projects.',
      },
      ...(categoryFaq ? [categoryFaq] : []),
    ],
  };
}

export const siteImages = {
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

export const BLOG_CATEGORIES = ['Web Design', 'Website Speed', 'SEO', 'Small Business', 'Booking Systems', 'Free Tools', 'Website Redesigns', 'Industry Websites'];

export const BLOG_POSTS = [
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
      ['Booking systems reduce missed enquiries', 'When the website only says "message us", enquiries can disappear into busy inboxes. A proper booking journey captures intent at the moment the customer is ready.'],
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
      ['Better calls to action', 'Strong calls to action are specific and timely. "Request a quote", "Book a consultation", or "Start your website project" is usually stronger than a vague "Learn more".'],
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

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const FALLBACK_GUIDE_TITLE = {
  Business: (name) => `Planning with the ${name}: a practical decision guide`,
  AI: (name) => `Getting better results from the ${name}`,
  SEO: (name) => `Using the ${name} without hurting your rankings`,
  Developer: (name) => `Using the ${name} in a real development workflow`,
  Design: (name) => `Building a consistent look with the ${name}`,
  Performance: (name) => `Using the ${name} to actually speed up your site`,
  Productivity: (name) => `Cutting busywork with the ${name}`,
  Security: (name) => `Using the ${name} safely for real projects`,
};

const GUIDE_CONTENT = {
  Business: {
    howToUse: 'Enter your own numbers rather than rough guesses — the more accurate the inputs, the more useful the output is for briefing a developer or agency.',
    expertHelp: 'Business-critical numbers deserve a second pair of eyes. Dean Da Dev can turn this calculation into a fully scoped, fixed-price project so there are no surprises later.',
  },
  AI: {
    howToUse: 'Treat the generated prompt as a first draft — refine the role, context, and constraints until the output matches the tone and depth you actually need.',
    expertHelp: "If you're using AI tools as part of a product or client workflow, Dean Da Dev can integrate prompt logic directly into your app or automation rather than leaving it as a manual copy-paste step.",
  },
  SEO: {
    howToUse: 'Keep titles, descriptions, and schema consistent with the actual page content — search engines reward accuracy over keyword stuffing.',
    expertHelp: 'Technical SEO compounds across a whole site. Dean Da Dev can audit your metadata, structured data, and crawlability as part of a full website build.',
  },
  Developer: {
    howToUse: 'Run real project data through the tool rather than sample text, so you can trust the output before it goes into a build or deployment.',
    expertHelp: 'For production systems, checks like this are usually automated in a CI pipeline. Dean Da Dev can wire this kind of validation into your existing development workflow.',
  },
  Design: {
    howToUse: 'Test the output against real content and real screen sizes — a palette or gradient that looks good in isolation can behave differently once it sits behind text and imagery.',
    expertHelp: 'Dean Da Dev can turn a colour system or CSS pattern into a consistent design system used across every page of your site or app.',
  },
  Performance: {
    howToUse: 'Re-run the tool after every significant change — performance work is cumulative, and a single large asset can undo several smaller wins.',
    expertHelp: 'Performance issues are rarely just one file. Dean Da Dev can review hosting, code splitting, caching, and asset delivery together as part of a proper speed audit.',
  },
  Productivity: {
    howToUse: 'Use the tool to remove one specific piece of manual admin, then check whether the same task recurs often enough to justify automating it fully.',
    expertHelp: 'Recurring manual tasks are usually a sign an internal tool or automation would pay for itself. Dean Da Dev builds exactly these kinds of internal business tools.',
  },
  Security: {
    howToUse: 'Generate fresh values for every project or account rather than reusing them, and store the results in a password manager rather than a plain text file.',
    expertHelp: 'Security is a foundation, not a feature you add later. Dean Da Dev builds websites and apps with sensible security defaults from the first commit.',
  },
};

export function resourceGuides() {
  return tools.flatMap((item) => {
    const customTitles = guideMap[item.slug];
    const titles = customTitles || [FALLBACK_GUIDE_TITLE[item.primaryCategory]?.(item.name) || `How to use the ${item.name} effectively`];
    const content = GUIDE_CONTENT[item.primaryCategory] || GUIDE_CONTENT.Business;
    return titles.map((title) => ({
      title,
      toolName: item.name,
      toolPath: item.path,
      categories: item.categories,
      path: `/resources/${item.slug}/${slugify(title)}`,
      description: item.short,
      body: `${item.description} This guide looks at ${title.toLowerCase().replace(/\?$/, '')}, using the ${item.name} to turn that into a decision you can act on.`,
      howToUse: content.howToUse,
      expertHelp: content.expertHelp,
    }));
  });
}

export const STATIC_PAGES = [
  { path: '/', title: 'Dean Da Dev | Free Developer and Business Tools UK', description: 'Free developer, SEO, AI, and business tools from Dean Da Dev, a UK app, web, AI tool, and automation developer.' },
  { path: '/about', title: 'About Dean Da Dev | UK Web, App and AI Developer', description: 'Meet Dean Da Dev, a UK full-stack developer building websites, apps, AI tools, and automation for growing businesses.' },
  { path: '/services', title: 'App, Web and AI Development Services UK', description: 'Professional apps, websites, AI tools, automation, dashboards, and business tool development services for UK businesses.' },
  { path: '/portfolio', title: 'Portfolio | Live Websites and Apps by Dean Da Dev', description: 'Explore live web, app, ecommerce, and AI projects built and launched by Dean Da Dev.' },
  { path: '/pricing', title: 'Pricing | App, Website and AI Tool Development UK', description: 'Clear starting prices for apps, websites, AI tools, dashboards, and business automation projects.' },
  { path: '/contact', title: 'Contact dean-da-dev | Start Your Website Project', description: 'Contact dean-da-dev to discuss a premium, mobile-friendly website, booking system, free tool, app, or business automation project.' },
  { path: '/DiscoveryCall', title: 'Book a Discovery Call | Dean Da Dev', description: 'Book a discovery call with Dean Da Dev to discuss a website, app, AI tool, dashboard, or automation project.' },
  { path: '/resources', title: 'Resources | Website, SEO and Software Guides', description: 'Helpful guides that support the free tools and help businesses plan better digital projects.' },
  { path: '/free-tools', title: 'Free Developer, SEO, AI and Business Tools | Dean Da Dev', description: 'A premium collection of free online tools for businesses, marketers, designers, and developers.' },
  { path: '/templates', title: 'Templates | Dean Da Dev', description: 'Practical website, SEO, project, invoice, and quote templates for growing businesses.' },
  { path: '/privacy-policy', title: 'Privacy Policy | Dean Da Dev', description: 'How Dean Da Dev collects, uses, and protects information submitted through this website.' },
  { path: '/tools', title: 'Free Business & Website Tools | dean-da-dev', description: 'Free tools from dean-da-dev to compress images, convert files, check website assets, and improve your online presence. No sign-up, no watermark, no hidden paywall.' },
  { path: '/blog', title: 'Web Design Blog | dean-da-dev', description: 'Helpful web design tips, website speed advice, SEO guidance, and business website ideas from dean-da-dev.' },
  { path: '/areas', title: 'Areas Covered | Web Design Near Stratford, London | Dean Da Dev', description: 'Website design and development for businesses in Stratford, Forest Gate, Wanstead, Ilford, Leyton, Leytonstone, East Ham, West Ham, and Manor Park.' },
];

export function getAllRoutes() {
  const routes = [];

  for (const page of STATIC_PAGES) {
    routes.push({ path: page.path, title: page.title, description: page.description, changefreq: page.path === '/' ? 'weekly' : 'monthly', priority: page.path === '/' ? '1.0' : '0.8' });
  }

  for (const category of categories) {
    routes.push({ path: `/${category.slug}`, title: `${category.label} Tools | Free Online Tools | Dean Da Dev`, description: category.intro, changefreq: 'weekly', priority: '0.7' });
  }

  for (const item of tools) {
    routes.push({ path: item.path, title: item.title, description: item.description, changefreq: 'monthly', priority: '0.7' });
  }

  for (const item of imageTools) {
    routes.push({ path: item.path, title: item.title, description: item.metaDescription, changefreq: 'monthly', priority: '0.7' });
  }

  for (const guide of resourceGuides()) {
    routes.push({ path: guide.path, title: `${guide.title} | Dean Da Dev Resources`, description: guide.description, changefreq: 'monthly', priority: '0.6' });
  }

  for (const post of BLOG_POSTS) {
    routes.push({ path: post.path, title: post.metaTitle, description: post.metaDescription, lastmod: post.date, changefreq: 'monthly', priority: '0.6' });
  }

  for (const area of locationAreas) {
    routes.push({ path: `/areas/${area.slug}`, title: `Web Design in ${area.name} | Dean Da Dev`, description: area.intro, changefreq: 'monthly', priority: '0.7' });
  }

  return routes;
}
