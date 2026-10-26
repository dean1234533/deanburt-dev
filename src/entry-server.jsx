// Build-time server render of a single route, used by scripts/generate-static.mjs for the
// London/England area pages. Only window.location is read while rendering; effects (page
// meta, cookie notice storage) do not run on the server, so the meta comes from resolveRoute.
import { renderToString } from 'react-dom/server';
import App, { resolveRoute, setGeoModule } from './App.jsx';
import * as geoPages from './geoPages.js';
import { SITE_URL } from './siteData.js';

setGeoModule(geoPages);

export function renderPage(path) {
  globalThis.window = { location: { pathname: path, origin: SITE_URL } };
  return { html: renderToString(<App />), meta: resolveRoute(path).meta };
}
