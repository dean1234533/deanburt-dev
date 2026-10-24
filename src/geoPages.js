// Location landing pages for London and England. Everything here is plain data so the
// React app (rendering), siteData (sitemap) and the prerender script all share one source.
// Place data comes from src/geoData.js (see scripts/build-geo-data.mjs).
import geo from './geoData.js';

const HOME = { easting: 538500, northing: 184500 }; // Stratford, E15 (OS grid)

export const slugifyPlace = (value) => value
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/&/g, ' and ').replace(/['’.]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const hash = (value) => [...value].reduce((total, char) => (total * 31 + char.charCodeAt(0)) >>> 0, 7);
const pick = (key, options) => options[hash(key) % options.length];
const byName = (a, b) => a.name.localeCompare(b.name);
const plural = (count, word, many = `${word}s`) => `${count} ${count === 1 ? word : many}`;

// Rotating window of siblings so each page links to a different set of neighbours
// instead of every page in a group linking to the same first few entries.
function neighbours(list, self, size) {
  const index = list.findIndex((item) => item.path === self.path);
  const others = [...list.slice(index + 1), ...list.slice(0, index)];
  return others.slice(0, size);
}

const HOME_LATLON = [51.5416, -0.0042];
const toRad = (deg) => (deg * Math.PI) / 180;
function haversineMiles(a, b) {
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLon / 2) ** 2;
  return 3958.8 * 2 * Math.asin(Math.sqrt(h));
}
const hasCoords = (place) => place.lat != null && place.lon != null;
const formatMiles = (miles) => (miles < 1 ? 'under a mile' : `${miles < 10 ? miles.toFixed(1).replace(/\.0$/, '') : Math.round(miles)} miles`);
const formatPop = (pop) => (pop >= 1000 ? Math.round(pop / 100) * 100 : pop).toLocaleString('en-GB');

// Closest places by real distance, so internal links and "nearby" copy reflect the map.
function nearest(place, pool, count) {
  if (!hasCoords(place)) return [];
  return pool
    .filter((other) => other.path !== place.path && hasCoords(other))
    .map((other) => ({ other, miles: haversineMiles([place.lat, place.lon], [other.lat, other.lon]) }))
    .sort((a, b) => a.miles - b.miles)
    .slice(0, count);
}

// Copy that depends on the size of the place, so a city and a village don't get the same advice.
function marketParagraph(place, nearby) {
  const { name, pop } = place;
  const noun = place.kind === 'london-area' ? 'area' : 'town';
  const near = nearby.slice(0, 3).map(({ other }) => other.name);
  const nearText = near.length ? ` People searching here often look at ${near.join(', ')} too, so naming the wider area on your site helps you appear in those searches.` : '';
  if (!pop) return near.length ? `${name} sits close to ${near.join(', ')}, and local customers often search across all of them, so a website that names the wider area helps you show up beyond a single postcode.` : null;
  const people = `${formatPop(pop)} people`;
  if (pop >= 100000) return `With roughly ${people}, ${name} is a large, competitive local market: many businesses in each trade fight for the same searches, so clear service pages, reviews and fast mobile loading make a real difference.`;
  if (pop >= 20000) return `${name} is a sizeable ${noun} of around ${people}. Local searches for services are common but the results are often thin, so a well-structured website with proper service pages can stand out.${nearText}`;
  if (pop >= 5000) return `${name} is a smaller ${noun} of about ${people}. Most customers already know a few local options, so your website's job is to confirm you are credible, show what you offer and make it easy to get in touch.${nearText}`;
  return `${name} is a small community of about ${people}, so many customers also search across neighbouring towns. A simple, fast website that lists the areas you cover brings in enquiries a single high street cannot.${nearText}`;
}

const SMALL_BUSINESS_SETS = [
  ['independent shops', 'cafés and restaurants', 'salons and barbers'],
  ['plumbers, electricians and builders', 'landscapers and cleaners', 'mobile trades and installers'],
  ['clinics and therapists', 'personal trainers and gyms', 'tutors and coaches'],
  ['accountants and consultants', 'estate and letting agents', 'small professional firms'],
  ['makers and online shops', 'event and wedding suppliers', 'photographers and creatives'],
];

const PRICE_LINE = 'Websites start from £249, simple tools from £399 and custom web apps from £699, each with the scope and price agreed before work starts.';

function makePage(base) {
  return { changefreq: 'monthly', ...base };
}

// ---- Index ------------------------------------------------------------------
let cache;

export function buildGeoIndex(curatedAreas = []) {
  if (cache) return cache;
  const curatedBySlug = new Map(curatedAreas.map((area) => [area.slug, area]));
  const pages = new Map();
  const add = (page) => { pages.set(page.path, page); return page; };

  // --- London ---
  const boroughNames = geo.boroughs;
  const londonAreaPages = geo.london
    // Wikipedia also lists boroughs as "areas" (Hackney, Croydon...); the borough page covers those.
    .filter((area) => !['london', 'england'].includes(area.s) && !boroughNames.some((b) => slugifyPlace(b) === area.s))
    .map((area) => {
      const curated = curatedBySlug.get(area.s);
      const miles = area.e ? Math.hypot(area.e[0] - HOME.easting, area.e[1] - HOME.northing) / 1609.34 : null;
      return {
        kind: 'london-area',
        path: `/areas/${area.s}`,
        slug: area.s,
        name: area.n,
        boroughs: area.b,
        postTowns: area.t,
        postcodes: area.p,
        miles,
        curated,
        lat: area.lat,
        lon: area.lon,
        pop: area.pop,
      };
    });

  const boroughPages = boroughNames.map((name) => ({
    kind: 'borough',
    path: `/areas/london/${slugifyPlace(name)}`,
    name,
    areas: londonAreaPages.filter((area) => area.boroughs.includes(name)).sort(byName),
  }));
  const boroughByName = new Map(boroughPages.map((borough) => [borough.name, borough]));

  // --- England ---
  const regionNames = [...new Set([...geo.towns.map((t) => t.r), ...geo.lads.map((l) => l.r)])].sort();
  const regionPages = regionNames.map((name) => ({ kind: 'region', path: `/areas/england/${slugifyPlace(name)}`, name, counties: [], districts: [] }));
  const regionByName = new Map(regionPages.map((region) => [region.name, region]));

  const countyPages = [];
  for (const town of geo.towns) {
    const region = regionByName.get(town.r);
    let county = region.counties.find((c) => c.name === town.c);
    if (!county) {
      county = { kind: 'county', path: `${region.path}/${slugifyPlace(town.c)}`, name: town.c, region, towns: [] };
      region.counties.push(county);
      countyPages.push(county);
    }
    county.towns.push({ kind: 'town', path: `${county.path}/${slugifyPlace(town.n)}`, name: town.n, county, region, lat: town.lat, lon: town.lon, pop: town.pop });
  }
  for (const region of regionPages) {
    region.counties.sort(byName);
    for (const county of region.counties) county.towns.sort(byName);
  }

  const takenNames = new Set([...countyPages.map((c) => c.name.toLowerCase()), ...geo.towns.map((t) => t.n.toLowerCase())]);
  for (const lad of geo.lads) {
    const name = lad.n.split(',')[0].trim();
    if (takenNames.has(name.toLowerCase())) continue;
    const region = regionByName.get(lad.r);
    if (!region || region.districts.some((d) => d.name === name)) continue;
    region.districts.push({ kind: 'district', path: `${region.path}/districts/${slugifyPlace(name)}`, name, region });
  }
  for (const region of regionPages) region.districts.sort(byName);

  const londonHub = { kind: 'london-hub', path: '/areas/london', name: 'London', boroughs: boroughPages };
  const englandHub = { kind: 'england-hub', path: '/areas/england', name: 'England', regions: regionPages };

  add(londonHub);
  add(englandHub);
  boroughPages.forEach(add);
  londonAreaPages.forEach(add);
  regionPages.forEach(add);
  countyPages.forEach(add);
  countyPages.forEach((county) => county.towns.forEach(add));
  regionPages.forEach((region) => region.districts.forEach(add));

  const allTowns = countyPages.flatMap((county) => county.towns);
  cache = { allTowns, pages, londonHub, englandHub, boroughPages, boroughByName, londonAreaPages, regionPages, countyPages };
  return cache;
}

// ---- Page models ------------------------------------------------------------
const link = (page, blurb = '') => ({ href: page.path, name: page.name, blurb });

function sharedFaqs(name) {
  return [
    { q: `Do you build websites for businesses in ${name}?`, a: `Yes. Dean Da Dev designs and builds websites, web apps and business tools for ${name} businesses. ${PRICE_LINE}` },
    { q: `How much does a website cost in ${name}?`, a: `A professional small-business website for a ${name} business starts from £249. Larger sites, booking systems and custom web apps are scoped and quoted as a fixed price before any work begins, so the cost does not change once work starts.` },
    { q: 'Can we meet to discuss my project?', a: `Yes. Book a free discovery call to talk it through. Dean works with businesses in ${name}, and you can meet by video, phone or in person, whichever suits you.` },
    { q: `Will a new website help me show up in local Google searches for ${name}?`, a: `It gives you the foundations: clear service pages, local wording, page titles and descriptions, structured data and a Google Business Profile checklist. Nobody can guarantee a ranking, but a fast, well-structured site is what local rankings are built on.` },
    { q: 'How long does a website take to build?', a: 'Most small-business websites are delivered in days to a few weeks, depending on how quickly content and feedback come back. You get a clear timeline in the fixed quote.' },
  ];
}

const FOOTER_LINKS = [
  { href: '/pricing', name: 'See pricing', blurb: 'Fixed starting prices for websites, tools and web apps.' },
  { href: '/DiscoveryCall', name: 'Book a free discovery call', blurb: 'A no-obligation chat about your project.' },
];

function localBodyParagraphs(name, whereText, key) {
  const set = pick(key, SMALL_BUSINESS_SETS);
  return [
    pick(key + 'a', [
      `${name} businesses are often found through a quick phone search before anyone calls or visits. A fast, mobile-friendly website that states what you do, where you work and how to get in touch turns that search into an enquiry.`,
      `If you run a business ${whereText}, your website is usually the first thing a customer checks after finding you on Google or Maps. It needs to load quickly on a phone, show your services clearly and make contacting you effortless.`,
      `Customers in ${name} compare a few options before they call. A clear website with real services, reviews, photos and a simple enquiry or booking route gives you a better chance of being the one they choose.`,
    ]),
    pick(key + 'b', [
      `Every ${name} project is fixed-price with the scope agreed up front: a mobile-friendly design, an enquiry form or booking link, page titles and descriptions, LocalBusiness and FAQ structured data, and a Google Business Profile checklist so you can be found for ${name} searches.`,
      `Each build includes the practical SEO groundwork for ${name}: sensible page structure, local wording, structured data for search and AI assistants, fast loading and a contact route that works on a phone.`,
    ]),
    `Websites like this suit ${set[0]}, ${set[1]} and ${set[2]}.`,
  ];
}

export function getGeoPage(path) {
  if (!cache) throw new Error('buildGeoIndex() must be called before getGeoPage()');
  const entity = cache.pages.get(path);
  if (!entity) return null;
  return describe(entity);
}

// Keep titles near 60 characters and descriptions under 160 so search snippets are not cut off.
function fitMeta(page, keepTitle) {
  let { title, description } = page;
  if (!keepTitle && title.length > 68) {
    title = title.replace(' | Websites from £249', ' | From £249');
    if (title.length > 68) title = title.replace(' | Dean Da Dev', '');
  }
  for (const [from, to] of [[' Based in Stratford, London.', ''], ['Website design and development', 'Web design'], ['enquiry forms and SEO foundations', 'SEO foundations'], ['Mobile-friendly websites', 'Websites']]) {
    if (description.length <= 160) break;
    description = description.replace(from, to);
  }
  return { ...page, title, description };
}

function mapQueryFor(entity) {
  switch (entity.kind) {
    case 'london-area': return `${entity.name}, ${entity.boroughs[0]}, London`;
    case 'borough': return `${entity.name}, London`;
    case 'town': return `${entity.name}, ${entity.county.name}, England`;
    case 'county': return `${entity.name}, England`;
    case 'district': return `${entity.name}, ${entity.region.name}, England`;
    default: return null;
  }
}

function describe(entity) {
  return { ...fitMeta(describeRaw(entity), entity.kind === 'london-area' && Boolean(entity.curated)), mapQuery: mapQueryFor(entity) };
}

function describeRaw(entity) {
  const { londonHub, englandHub, boroughByName, londonAreaPages, regionPages } = cache;
  const base = { path: entity.path, kind: entity.kind, name: entity.name };
  const eyebrowPrefix = 'Web design in';

  if (entity.kind === 'london-hub') {
    const total = londonAreaPages.length;
    return {
      ...base,
      title: 'Web Design London | Every Borough & Area Covered | Dean Da Dev',
      description: `Website design and development for businesses in every London borough and ${total}+ areas, from £249. Based in Stratford, E15. Fixed prices, direct with the developer.`,
      eyebrow: 'London',
      h1: 'Web design and development for businesses across London.',
      lede: `Dean Da Dev is based in Stratford, East London, and builds websites, web apps and business tools for businesses in all ${entity.boroughs.length} London boroughs.`,
      quickAnswer: `Yes. Dean Da Dev covers all of London: ${plural(entity.boroughs.length, 'borough')} and ${total}+ neighbourhoods, from Stratford and Hackney to Croydon and Richmond. ${PRICE_LINE}`,
      facts: [['Coverage', `${entity.boroughs.length} London boroughs, ${total}+ areas`], ['Based in', 'Stratford, London E15'], ['Starting price', 'Websites from £249'], ['Hours', 'Mon–Fri, 9am–5pm (UK)']],
      paragraphs: [
        'London is made up of many local high streets, each with its own customers and competitors. Choose your borough below to find your area.',
      ],
      faqs: sharedFaqs('London'),
      linkGroups: [{ eyebrow: 'Boroughs', title: 'Choose your London borough.', items: entity.boroughs.map((borough) => link(borough, `${plural(borough.areas.length, 'area')} covered`)) }, { eyebrow: 'Wider coverage', title: 'Outside London?', items: [link(englandHub, 'Towns, counties and regions across England')] }],
      breadcrumbs: [['Home', '/'], ['Areas', '/areas'], ['London', entity.path]],
      areaServed: ['London', ...entity.boroughs.map((b) => b.name)],
      placeType: 'AdministrativeArea',
    };
  }

  if (entity.kind === 'borough') {
    const siblings = neighbours(londonHub.boroughs, entity, 8);
    const label = /^City of|^Westminster$/.test(entity.name) ? entity.name : `the London Borough of ${entity.name}`;
    return {
      ...base,
      title: `Web Design ${entity.name}, London | Websites from £249 | Dean Da Dev`,
      description: `Website design and development for ${entity.name} businesses across ${plural(entity.areas.length, 'local area')}. Mobile-friendly websites from £249, fixed prices, based in Stratford.`,
      eyebrow: `${eyebrowPrefix} ${entity.name}`,
      h1: `Web design and development for ${entity.name} businesses.`,
      lede: `Mobile-friendly websites from £249, web apps from £699 and clear enquiry routes for businesses in ${label}.`,
      quickAnswer: `Yes. Dean Da Dev builds websites, web apps and business tools for businesses across ${label}, covering ${plural(entity.areas.length, 'local area')} including ${entity.areas.slice(0, 3).map((a) => a.name).join(', ')}. ${PRICE_LINE}`,
      facts: [['Borough', entity.name], ['County', 'Greater London'], ['Areas covered', String(entity.areas.length)], ['Based in', 'Stratford, London E15']],
      paragraphs: localBodyParagraphs(entity.name, `in ${entity.name}`, entity.path),
      faqs: sharedFaqs(entity.name),
      linkGroups: [
        { eyebrow: 'Local areas', title: `Areas in ${entity.name}.`, items: entity.areas.map((area) => link(area, area.postcodes.join(', '))) },
        { eyebrow: 'Nearby boroughs', title: 'Also covering these boroughs.', items: siblings.map((b) => link(b)) },
      ],
      breadcrumbs: [['Home', '/'], ['Areas', '/areas'], ['London', londonHub.path], [entity.name, entity.path]],
      areaServed: [entity.name, ...entity.areas.map((a) => a.name)],
      placeType: 'AdministrativeArea',
      containedIn: 'London',
    };
  }

  if (entity.kind === 'london-area') {
    const curated = entity.curated;
    const home = boroughPageFor(entity);
    const close = nearest(entity, londonAreaPages, 8);
    const siblings = close.length ? close.map(({ other }) => other) : home ? neighbours(home.areas, entity, 8) : [];
    const market = marketParagraph(entity, close);
    const boroughText = entity.boroughs.join(' and ');
    const distance = entity.miles == null ? null : entity.miles < 1 ? 'under a mile' : `about ${entity.miles.toFixed(1).replace(/\.0$/, '')} miles`;
    const facts = [
      ['Area', entity.name],
      [entity.boroughs.length > 1 ? 'Boroughs' : 'Borough', boroughText],
      ['County', 'Greater London'],
      ...(entity.postcodes.length ? [[entity.postcodes.length > 1 ? 'Postcode districts' : 'Postcode district', entity.postcodes.join(', ')]] : []),
      ...(distance && entity.name !== 'Stratford' ? [['From Stratford', `${distance} (straight line)`]] : []),
      ...(entity.pop ? [['Population (approx.)', formatPop(entity.pop)]] : []),
      ['Based in', 'Stratford, London E15'],
    ];
    return {
      ...base,
      title: curated ? `Web Design ${entity.name} | Websites from £249 | Dean Da Dev` : `Web Design ${entity.name}, London | Websites from £249 | Dean Da Dev`,
      description: `Website design and development for ${entity.name} businesses${entity.boroughs[0] ? ` in ${entity.boroughs[0]}` : ''}. Mobile-friendly websites from £249, enquiry forms and SEO foundations. Based in Stratford, London.`,
      eyebrow: `${eyebrowPrefix} ${entity.name}`,
      h1: `Web design and development for ${entity.name} businesses.`,
      lede: `Mobile-friendly websites from £249, web apps from £699 and clear enquiry routes. Work directly with Dean Burt, based in Stratford, serving ${entity.name}${home ? ` (${boroughText})` : ''} and businesses across the UK.`,
      quickAnswer: `Yes. Dean Da Dev designs and builds websites for ${entity.name} businesses${entity.boroughs.length ? ` in ${boroughText}, London` : ''}${entity.postcodes.length ? ` (${entity.postcodes.join(', ')})` : ''}. ${PRICE_LINE}`,
      facts,
      paragraphs: [...(curated ? [curated.intro, curated.context] : []), ...(market && !curated ? [market] : []), ...(curated ? [] : localBodyParagraphs(entity.name, `in ${entity.name}, ${boroughText}`, entity.path))],
      faqs: sharedFaqs(entity.name),
      linkGroups: [
        ...(close.length ? [{ eyebrow: 'Nearby areas', title: `Closest areas to ${entity.name}.`, items: close.map(({ other, miles }) => link(other, `${formatMiles(miles)} away${other.postcodes.length ? ` · ${other.postcodes.join(', ')}` : ''}`)) }] : siblings.length ? [{ eyebrow: 'Nearby areas', title: `More areas in ${boroughText}.`, items: siblings.map((a) => link(a, a.postcodes.join(', '))) }] : []),
        { eyebrow: 'Wider coverage', title: 'Explore more of London.', items: [...entity.boroughs.map((b) => boroughByName.get(b)).filter(Boolean).map((b) => link(b, 'Borough overview')), link(londonHub, 'All London boroughs')] },
      ],
      breadcrumbs: [['Home', '/'], ['Areas', '/areas'], ['London', londonHub.path], ...(home ? [[home.name, home.path]] : []), [entity.name, entity.path]],
      areaServed: [entity.name, ...entity.boroughs],
      geo: hasCoords(entity) ? [entity.lat, entity.lon] : null,
      placeType: 'Place',
      containedIn: entity.boroughs[0] || 'London',
    };
  }

  if (entity.kind === 'england-hub') {
    return {
      ...base,
      title: 'Web Design England | Towns, Counties & Regions Covered | Dean Da Dev',
      description: `Website design and development for businesses in every region of England: ${plural(entity.regions.length, 'region')}, ${plural(cache.countyPages.length, 'county', 'counties')} and ${geo.towns.length}+ towns. Websites from £249, fixed prices.`,
      eyebrow: 'England',
      h1: 'Web design and development for businesses across England.',
      lede: 'Dean Da Dev works with small businesses and founders in every region of England: fixed prices, one developer, and no account managers.',
      quickAnswer: `Yes. Dean Da Dev builds websites, web apps and business tools for businesses anywhere in England, covering ${entity.regions.length} regions, ${cache.countyPages.length} counties and ${geo.towns.length}+ towns. ${PRICE_LINE}`,
      facts: [['Coverage', `${entity.regions.length} regions, ${cache.countyPages.length} counties, ${geo.towns.length}+ towns`], ['Starting price', 'Websites from £249'], ['Based in', 'Stratford, London E15']],
      paragraphs: ['Choose your region to find your county and town. Every page covers the same fixed-price services, written around the area you work in.'],
      faqs: sharedFaqs('England'),
      linkGroups: [{ eyebrow: 'Regions', title: 'Choose your region of England.', items: entity.regions.map((r) => link(r, plural(r.counties.length, 'county', 'counties'))) }, { eyebrow: 'London', title: 'In London?', items: [link(londonHub, 'Every borough and area')] }],
      breadcrumbs: [['Home', '/'], ['Areas', '/areas'], ['England', entity.path]],
      areaServed: ['England', ...entity.regions.map((r) => r.name)],
      placeType: 'Country',
    };
  }

  if (entity.kind === 'region') {
    const siblings = neighbours(regionPages, entity, 4);
    const townCount = entity.counties.reduce((total, c) => total + c.towns.length, 0);
    return {
      ...base,
      title: `Web Design ${entity.name} | Websites from £249 | Dean Da Dev`,
      description: `Website design and development for businesses across ${entity.name}, England — ${plural(entity.counties.length, 'county', 'counties')} and ${townCount}+ towns. Websites from £249, fixed prices.`,
      eyebrow: `${eyebrowPrefix} ${entity.name}`,
      h1: `Web design and development for businesses in ${entity.name}.`,
      lede: `Mobile-friendly websites from £249 and web apps from £699 for ${entity.name} businesses with a free discovery call.`,
      quickAnswer: `Yes. Dean Da Dev builds websites, web apps and business tools for businesses across ${entity.name}, England, across ${entity.counties.length} counties and ${townCount}+ towns. ${PRICE_LINE}`,
      facts: [['Region', entity.name], ['Country', 'England'], ['Counties covered', String(entity.counties.length)]],
      paragraphs: localBodyParagraphs(entity.name, `in ${entity.name}`, entity.path),
      faqs: sharedFaqs(entity.name),
      linkGroups: [
        ...(entity.counties.length ? [{ eyebrow: 'Counties', title: `Counties in ${entity.name}.`, items: entity.counties.map((c) => link(c, plural(c.towns.length, 'town'))) }] : []),
        ...(entity.districts.length ? [{ eyebrow: 'Districts', title: `Other local authority districts in ${entity.name}.`, items: entity.districts.map((d) => link(d)) }] : []),
        { eyebrow: 'Other regions', title: 'Also covering these regions.', items: siblings.map((r) => link(r)) },
      ],
      breadcrumbs: [['Home', '/'], ['Areas', '/areas'], ['England', englandHub.path], [entity.name, entity.path]],
      areaServed: [entity.name, ...entity.counties.map((c) => c.name)],
      placeType: 'AdministrativeArea',
      containedIn: 'England',
    };
  }

  if (entity.kind === 'county') {
    const siblings = neighbours(entity.region.counties, entity, 6);
    return {
      ...base,
      title: `Web Design ${entity.name}${entity.name === entity.region.name ? ' County' : ''} | Websites from £249 | Dean Da Dev`,
      description: `Website design and development for businesses in ${entity.name}, ${entity.region.name}. Websites from £249 across ${entity.towns.length} towns, fixed prices.`,
      eyebrow: `${eyebrowPrefix} ${entity.name}`,
      h1: `Web design and development for ${entity.name} businesses.`,
      lede: `Mobile-friendly websites from £249 and web apps from £699 for businesses across ${entity.name} with a free discovery call.`,
      quickAnswer: `Yes. Dean Da Dev builds websites, web apps and business tools for businesses across ${entity.name} in ${entity.region.name}, including ${entity.towns.slice(0, 3).map((t) => t.name).join(', ')}. ${PRICE_LINE}`,
      facts: [['County', entity.name], ['Region', entity.region.name], ['Country', 'England'], ['Towns covered', String(entity.towns.length)]],
      paragraphs: localBodyParagraphs(entity.name, `in ${entity.name}`, entity.path),
      faqs: sharedFaqs(entity.name),
      linkGroups: [
        { eyebrow: 'Towns', title: `Towns in ${entity.name}.`, items: entity.towns.map((t) => link(t)) },
        { eyebrow: 'Nearby counties', title: `More of ${entity.region.name}.`, items: [link(entity.region, 'Region overview'), ...siblings.map((c) => link(c))] },
      ],
      breadcrumbs: [['Home', '/'], ['Areas', '/areas'], ['England', englandHub.path], [entity.region.name, entity.region.path], [entity.name, entity.path]],
      areaServed: [entity.name, ...entity.towns.map((t) => t.name)],
      placeType: 'AdministrativeArea',
      containedIn: entity.region.name,
    };
  }

  if (entity.kind === 'town') {
    const { county, region } = entity;
    const close = nearest(entity, cache.allTowns, 8);
    const siblings = close.length ? close.map(({ other }) => other) : neighbours(county.towns, entity, 8);
    const market = marketParagraph(entity, close);
    const homeMiles = hasCoords(entity) ? haversineMiles([entity.lat, entity.lon], HOME_LATLON) : null;
    return {
      ...base,
      title: `Web Design ${entity.name}, ${county.name} | Websites from £249 | Dean Da Dev`,
      description: `Website design and development for ${entity.name} businesses in ${county.name}. Mobile-friendly websites from £249, enquiry forms and SEO foundations. Fixed prices.`,
      eyebrow: `${eyebrowPrefix} ${entity.name}`,
      h1: `Web design and development for ${entity.name} businesses.`,
      lede: `Mobile-friendly websites from £249, web apps from £699 and clear enquiry routes for ${entity.name}, ${county.name}. Work directly with Dean Burt at a fixed price.`,
      quickAnswer: `Yes. Dean Da Dev designs and builds websites for businesses in ${entity.name}, ${county.name}. ${PRICE_LINE} Start with a free discovery call.`,
      facts: [['Town', entity.name], ['County', county.name], ['Region', region.name], ['Country', 'England'], ...(entity.pop ? [['Population (approx.)', formatPop(entity.pop)]] : []), ...(homeMiles ? [['From Stratford', `about ${formatMiles(homeMiles)} (straight line)`]] : []), ['Based in', 'Stratford, London E15']],
      paragraphs: [...(market ? [market] : []), ...localBodyParagraphs(entity.name, `in ${entity.name}, ${county.name}`, entity.path)],
      faqs: sharedFaqs(entity.name),
      linkGroups: [
        ...(close.length ? [{ eyebrow: 'Nearby towns', title: `Closest towns to ${entity.name}.`, items: close.map(({ other, miles }) => link(other, `${formatMiles(miles)} away · ${other.county.name}`)) }] : siblings.length ? [{ eyebrow: 'Nearby towns', title: `More towns in ${county.name}.`, items: siblings.map((t) => link(t)) }] : []),
        { eyebrow: 'Wider coverage', title: `Explore ${county.name} and ${region.name}.`, items: [link(county, `All ${county.towns.length} towns`), link(region, 'Region overview'), link(englandHub, 'All of England')] },
      ],
      breadcrumbs: [['Home', '/'], ['Areas', '/areas'], ['England', englandHub.path], [region.name, region.path], [county.name, county.path], [entity.name, entity.path]],
      areaServed: [entity.name, county.name, ...close.slice(0, 3).map(({ other }) => other.name)],
      geo: hasCoords(entity) ? [entity.lat, entity.lon] : null,
      placeType: 'City',
      containedIn: county.name,
    };
  }

  // district
  const { region } = entity;
  const siblings = neighbours(region.districts, entity, 8);
  return {
    ...base,
    title: `Web Design ${entity.name}, ${region.name} | Websites from £249 | Dean Da Dev`,
    description: `Website design and development for businesses in ${entity.name}, ${region.name}. Mobile-friendly websites from £249, fixed prices, built by a UK developer.`,
    eyebrow: `${eyebrowPrefix} ${entity.name}`,
    h1: `Web design and development for ${entity.name} businesses.`,
    lede: `Mobile-friendly websites from £249 and web apps from £699 for businesses in the ${entity.name} area of ${region.name}.`,
    quickAnswer: `Yes. Dean Da Dev designs and builds websites for businesses in ${entity.name}, ${region.name}. ${PRICE_LINE} Start with a free discovery call.`,
    facts: [['Area', entity.name], ['Type', 'Local authority district'], ['Region', region.name], ['Country', 'England']],
    paragraphs: localBodyParagraphs(entity.name, `in ${entity.name}`, entity.path),
    faqs: sharedFaqs(entity.name),
    linkGroups: [
      { eyebrow: 'Nearby areas', title: `More of ${region.name}.`, items: [link(region, 'Region overview'), ...siblings.map((d) => link(d))] },
    ],
    breadcrumbs: [['Home', '/'], ['Areas', '/areas'], ['England', englandHub.path], [region.name, region.path], [entity.name, entity.path]],
    areaServed: [entity.name, region.name],
    placeType: 'AdministrativeArea',
    containedIn: region.name,
  };
}

function boroughPageFor(area) {
  return area.boroughs.map((b) => cache.boroughByName.get(b)).find(Boolean) || null;
}

export function geoFooterLinks() {
  return FOOTER_LINKS;
}

// ---- Exports for the sitemap and llms files ----------------------------------
export function geoRoutes(curatedAreas = []) {
  buildGeoIndex(curatedAreas);
  const priorityFor = { 'london-hub': '0.7', 'england-hub': '0.7', borough: '0.6', region: '0.6', county: '0.6' };
  return [...cache.pages.values()]
    .filter((entity) => !(entity.kind === 'london-area' && entity.curated))
    .map((entity) => {
      const page = describe(entity);
      return makePage({ path: page.path, title: page.title, description: page.description, priority: priorityFor[entity.kind] || '0.5' });
    });
}

export function geoLlmsText(siteUrl) {
  const { londonHub, englandHub } = cache;
  const lines = [
    '# Dean Da Dev — areas covered',
    '',
    '> Dean Da Dev (Stratford, London E15) builds fixed-price websites (from £249), simple tools (from £399) and custom web apps (from £699) for small businesses. Every page below covers one place in London or England; the service and prices are the same everywhere.',
    '',
    `## London (${londonHub.boroughs.length} boroughs)`,
  ];
  for (const borough of londonHub.boroughs) {
    lines.push(`- [${borough.name}](${siteUrl}${borough.path}): ${borough.areas.map((a) => a.name).join(', ')}`);
  }
  lines.push('', '## England');
  for (const region of englandHub.regions) {
    lines.push(`### ${region.name}`, `- [${region.name} overview](${siteUrl}${region.path})`);
    for (const county of region.counties) {
      lines.push(`- [${county.name}](${siteUrl}${county.path}): ${county.towns.map((t) => t.name).join(', ')}`);
    }
  }
  return `${lines.join('\n')}\n`;
}
