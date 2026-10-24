// One-off data builder: pulls real place data (Wikipedia list of London areas, list of
// English towns, ONS local authority districts) and writes a compact src/geoData.js.
// Run manually with `node scripts/build-geo-data.mjs`; the output is committed.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const UA = { 'User-Agent': 'dean-da-dev-geo-builder/1.0 (https://www.dean-da-dev.co.uk)' };

const slugify = (value) => value
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/&/g, ' and ').replace(/['’.]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

async function wikitext(page) {
  const res = await fetch(`https://en.wikipedia.org/w/api.php?action=parse&page=${page}&prop=wikitext&format=json&formatversion=2`, { headers: UA });
  return (await res.json()).parse.wikitext;
}

const linkTarget = (cell) => (/\[\[([^\]|#]+)/.exec(cell) || [])[1]?.trim();

const clean = (value) => value
  .replace(/<ref[^>]*\/>/g, '').replace(/<ref[^>]*>.*?<\/ref>/g, '')
  .replace(/\{\{[^}]*\}\}/g, '').replace(/<[^>]+>/g, '')
  .replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1')
  .replace(/\s*\(.*?\)\s*/g, ' ').replace(/&nbsp;/g, ' ').replace(/'''?/g, '').trim();

// ---- London ---------------------------------------------------------------
const BOROUGH_FIX = { City: 'City of London', 'City of Westminster': 'Westminster', 'Hammersmith and Fulham': 'Hammersmith and Fulham' };
const londonText = await wikitext('List_of_areas_of_London');
const gridToEN = (ref) => {
  const match = /TQ(\d{3})(\d{3})/.exec(ref || '') || /TL(\d{3})(\d{3})/.exec(ref || '');
  if (!match) return null;
  const east = (ref.startsWith('TL') ? 500000 : 500000) + Number(match[1]) * 100;
  const north = (ref.startsWith('TL') ? 200000 : 100000) + Number(match[2]) * 100;
  return [east, north];
};

const londonAreas = [];
for (const line of londonText.split('\n')) {
  if (!line.startsWith('|[[') && !line.startsWith('| [[')) continue;
  const cells = line.replace(/^\|\s*/, '').split('||');
  if (cells.length < 5) continue;
  const name = clean(cells[0]).replace(/\s+also.*$/i, '').trim();
  const boroughs = clean(cells[1]).split(',').map((b) => b.trim()).filter(Boolean).map((b) => BOROUGH_FIX[b] || b);
  const postTown = clean(cells[2]).split(',').map((p) => p.trim()).filter(Boolean);
  const postcodes = clean(cells[3]).split(',').map((p) => p.trim()).filter(Boolean);
  const en = gridToEN(cells[5] || '');
  if (!name || !boroughs.length) continue;
  londonAreas.push({ w: linkTarget(cells[0]), n: name, s: slugify(name), b: boroughs, t: postTown, p: postcodes, e: en });
}
// Names that appear twice (e.g. two "Newington") keep the first, so slugs stay unique.
const seen = new Set();
const londonUnique = londonAreas.filter((a) => (seen.has(a.s) ? false : seen.add(a.s)));
const boroughNames = [...new Set(londonUnique.flatMap((a) => a.b))].sort();

// ---- England --------------------------------------------------------------
const REGION_BY_COUNTY = {
  'Cumbria': 'North West', 'Lancashire': 'North West', 'Greater Manchester': 'North West', 'Merseyside': 'North West', 'Cheshire': 'North West',
  'Northumberland': 'North East', 'Tyne and Wear': 'North East', 'Durham': 'North East', 'County Durham': 'North East',
  'North Yorkshire': 'Yorkshire and The Humber', 'West Yorkshire': 'Yorkshire and The Humber', 'South Yorkshire': 'Yorkshire and The Humber', 'East Riding of Yorkshire': 'Yorkshire and The Humber',
  'Derbyshire': 'East Midlands', 'Nottinghamshire': 'East Midlands', 'Leicestershire': 'East Midlands', 'Lincolnshire': 'East Midlands', 'Northamptonshire': 'East Midlands', 'Rutland': 'East Midlands',
  'Staffordshire': 'West Midlands', 'Shropshire': 'West Midlands', 'Herefordshire': 'West Midlands', 'Worcestershire': 'West Midlands', 'Warwickshire': 'West Midlands', 'West Midlands': 'West Midlands',
  'Norfolk': 'East of England', 'Suffolk': 'East of England', 'Cambridgeshire': 'East of England', 'Bedfordshire': 'East of England', 'Hertfordshire': 'East of England', 'Essex': 'East of England',
  'Greater London': 'London',
  'Kent': 'South East', 'East Sussex': 'South East', 'West Sussex': 'South East', 'Surrey': 'South East', 'Hampshire': 'South East', 'Berkshire': 'South East', 'Buckinghamshire': 'South East', 'Oxfordshire': 'South East', 'Isle of Wight': 'South East',
  'Cornwall': 'South West', 'Devon': 'South West', 'Dorset': 'South West', 'Somerset': 'South West', 'Gloucestershire': 'South West', 'Wiltshire': 'South West', 'Bristol': 'South West',
};
const COUNTY_FIX = { Surry: 'Surrey', Sessex: 'Essex', 'Durham/North Yorkshire': 'Durham' };
const townsText = await wikitext('List_of_towns_in_England');
const towns = [];
const unmapped = new Set();
for (const line of townsText.split('\n')) {
  if (!/^\|\s*\[\[/.test(line)) continue;
  const cells = line.replace(/^\|\s*/, '').split('||');
  if (cells.length < 2) continue;
  const name = clean(cells[0]);
  const county = COUNTY_FIX[clean(cells[1])] || clean(cells[1]);
  if (!name || !county) continue;
  const region = REGION_BY_COUNTY[county];
  if (!region) { unmapped.add(county); continue; }
  if (region === 'London') continue;
  towns.push({ w: linkTarget(cells[0]), n: name, c: county, r: region });
}

const ladRes = await fetch('https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/LAD23_RGN23_EN_LU/FeatureServer/0/query?where=1%3D1&outFields=LAD23NM,RGN23NM&f=json&resultRecordCount=2000&returnGeometry=false', { headers: UA });
const lads = (await ladRes.json()).features.map((f) => ({ n: f.attributes.LAD23NM, r: f.attributes.RGN23NM })).filter((l) => l.r !== 'London');


// ---- Enrichment: coordinates (Wikipedia) and population (Wikidata) --------------
const chunk = (list, size) => Array.from({ length: Math.ceil(list.length / size) }, (_, i) => list.slice(i * size, i * size + size));
const getJson = async (url) => (await fetch(url, { headers: UA })).json();

async function enrich(places) {
  const withTitle = places.filter((p) => p.w);
  const itemByTitle = new Map();
  for (const batch of chunk([...new Set(withTitle.map((p) => p.w))], 50)) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=coordinates|pageprops&ppprop=wikibase_item&colimit=max&redirects=1&format=json&formatversion=2&titles=${encodeURIComponent(batch.join('|'))}`;
    const data = (await getJson(url)).query;
    const redirected = new Map([...(data.redirects || []), ...(data.normalized || [])].map((r) => [r.from, r.to]));
    const resolve = (title) => { let t = title; for (let i = 0; i < 3 && redirected.has(t); i++) t = redirected.get(t); return t; };
    const byPage = new Map(data.pages.map((page) => [page.title, page]));
    for (const title of batch) {
      const page = byPage.get(resolve(title));
      if (!page || page.missing) continue;
      const coord = page.coordinates?.[0];
      itemByTitle.set(title, { lat: coord?.lat, lon: coord?.lon, qid: page.pageprops?.wikibase_item });
    }
  }
  const population = new Map();
  const qids = [...new Set([...itemByTitle.values()].map((v) => v.qid).filter(Boolean))];
  for (const batch of chunk(qids, 50)) {
    const data = await getJson(`https://www.wikidata.org/w/api.php?action=wbgetentities&props=claims&format=json&ids=${batch.join('|')}`);
    for (const [qid, entity] of Object.entries(data.entities || {})) {
      const claims = (entity.claims?.P1082 || []).filter((c) => c.mainsnak?.datavalue && c.rank !== 'deprecated');
      const dated = claims.map((c) => ({ amount: Number(c.mainsnak.datavalue.value.amount), time: c.qualifiers?.P585?.[0]?.datavalue?.value?.time || '' }));
      dated.sort((a, b) => b.time.localeCompare(a.time));
      if (dated[0] && dated[0].amount > 0) population.set(qid, dated[0].amount);
    }
  }
  for (const place of places) {
    const item = itemByTitle.get(place.w);
    if (!item) continue;
    if (item.lat != null) { place.lat = Math.round(item.lat * 1e4) / 1e4; place.lon = Math.round(item.lon * 1e4) / 1e4; }
    if (item.qid && population.has(item.qid)) place.pop = population.get(item.qid);
  }
}
await enrich(londonUnique);
await enrich(towns);

const out = {
  boroughs: boroughNames,
  london: londonUnique,
  towns,
  lads,
};
writeFileSync(join(rootDir, 'src/geoData.js'), `// Generated by scripts/build-geo-data.mjs — do not edit by hand.\nexport default ${JSON.stringify(out)};\n`);
console.log({ coords: [...londonUnique, ...towns].filter((p) => p.lat != null).length, pops: [...londonUnique, ...towns].filter((p) => p.pop).length, boroughs: boroughNames.length, london: londonUnique.length, towns: towns.length, lads: lads.length, unmapped: [...unmapped] });
console.log(boroughNames.join(' | '));
