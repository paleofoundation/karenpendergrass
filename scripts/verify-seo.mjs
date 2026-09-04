#!/usr/bin/env node
/**
 * Technical SEO checks against a running origin (local or preview).
 * Usage: node scripts/verify-seo.mjs [origin]
 */
const origin = (process.argv[2] || 'http://127.0.0.1:3000').replace(/\/$/, '');

async function probe(path, { method = 'GET', follow = false } = {}) {
  const res = await fetch(`${origin}${path}`, {
    method,
    redirect: follow ? 'follow' : 'manual',
    headers: { 'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' },
  });
  const location = res.headers.get('location');
  const robots = res.headers.get('x-robots-tag');
  let html = '';
  const type = res.headers.get('content-type') || '';
  if (type.includes('html') || type.includes('xml') || type.includes('text')) {
    html = await res.text();
  }
  const canonical = html.match(/rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1]
    || html.match(/href=["']([^"']+)["'][^>]*rel=["']canonical/i)?.[1]
    || null;
  const metaRobots = html.match(/name=["']robots["'][^>]*content=["']([^"']+)/i)?.[1]
    || html.match(/content=["']([^"']+)["'][^>]*name=["']robots/i)?.[1]
    || null;
  return { status: res.status, location, robots, canonical, metaRobots, html };
}

function assert(cond, message) {
  if (!cond) throw new Error(message);
}

const cases = [];

async function check(name, fn) {
  try {
    await fn();
    cases.push({ name, ok: true });
    console.log(`PASS  ${name}`);
  } catch (err) {
    cases.push({ name, ok: false, error: err.message });
    console.error(`FAIL  ${name}: ${err.message}`);
  }
}

await check('homepage is 200 with self canonical', async () => {
  const r = await probe('/');
  assert(r.status === 200, `status ${r.status}`);
  assert(r.canonical?.endsWith('/') || r.canonical?.includes('karenpendergrass.com'), `canonical ${r.canonical}`);
  assert(!/noindex/i.test(r.metaRobots || ''), `robots ${r.metaRobots}`);
});

await check('about is 200 with /about canonical, not homepage', async () => {
  const r = await probe('/about');
  assert(r.status === 200, `status ${r.status}`);
  assert(r.canonical?.includes('/about'), `canonical ${r.canonical}`);
  assert(!r.canonical?.endsWith('karenpendergrass.com/') || r.canonical.includes('/about'), `canonical leaked homepage: ${r.canonical}`);
});

await check('unknown URL is 404 without homepage canonical', async () => {
  const r = await probe('/this-page-does-not-exist-xyz');
  assert(r.status === 404, `status ${r.status}`);
  assert(!r.canonical || !r.canonical.match(/karenpendergrass\.com\/?$/), `404 canonicalized to homepage: ${r.canonical}`);
  assert(/noindex/i.test(r.metaRobots || r.robots || ''), `missing noindex on 404`);
});

await check('dated permalink is a single hop to /writing/:slug', async () => {
  const r = await probe('/2016/08/15/zinc-dyshomeostasis-multiple-sclerosis-pathogenesis/');
  assert([301, 308].includes(r.status), `status ${r.status}`);
  assert(
    /\/writing\/zinc-dyshomeostasis-multiple-sclerosis-pathogenesis\/?$/.test(r.location || ''),
    `location ${r.location}`
  );
  assert(
    !r.location?.endsWith('/zinc-dyshomeostasis-multiple-sclerosis-pathogenesis/'),
    `redirect kept a trailing slash: ${r.location}`
  );
});

await check('unknown dated permalink is 404, not a redirect to a missing post', async () => {
  const r = await probe('/2016/08/15/this-never-existed/');
  assert(r.status === 404, `status ${r.status} location=${r.location}`);
});

await check('root-level published slug redirects to /writing/:slug', async () => {
  const r = await probe('/the-flattening');
  assert([301, 308].includes(r.status), `status ${r.status}`);
  assert(r.location?.endsWith('/writing/the-flattening'), `location ${r.location}`);
});

await check('/faq is 410, not a homepage redirect', async () => {
  const r = await probe('/faq');
  assert(r.status === 410, `status ${r.status} location=${r.location}`);
});

await check('/donation/success stays noindex', async () => {
  const r = await probe('/donation/success');
  assert(r.status === 200, `status ${r.status}`);
  assert(/noindex/i.test(`${r.metaRobots || ''} ${r.robots || ''}`), `robots ${r.metaRobots} ${r.robots}`);
});

await check('sitemap lists only apex URLs and includes /phage', async () => {
  const r = await probe('/sitemap.xml');
  assert(r.status === 200, `status ${r.status}`);
  assert(!r.html.includes('www.karenpendergrass.com'), 'sitemap includes www host');
  assert(r.html.includes('/phage'), 'sitemap missing /phage');
  assert(!r.html.includes('/donation/'), 'sitemap includes donation URL');
  const locs = [...r.html.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  assert(locs.length > 20, `only ${locs.length} urls`);
  for (const loc of locs) {
    assert(loc.startsWith('https://karenpendergrass.com'), `non-canonical loc ${loc}`);
  }
});

await check('trailing slash is a single hop to the slashless URL', async () => {
  const r = await probe('/about/');
  assert([301, 308].includes(r.status), `status ${r.status}`);
  assert(r.location === '/about' || r.location?.endsWith('/about'), `location ${r.location}`);
  assert(!r.location?.endsWith('/about/'), `self-redirect ${r.location}`);
});

await check('robots.txt points at apex sitemap and disallows /donation/', async () => {
  const r = await probe('/robots.txt');
  assert(r.status === 200, `status ${r.status}`);
  assert(r.html.includes('https://karenpendergrass.com/sitemap.xml'), 'missing sitemap');
  assert(r.html.includes('Disallow: /donation/'), 'missing donation disallow');
});

const failed = cases.filter((c) => !c.ok);
console.log(`\n${cases.length - failed.length}/${cases.length} checks passed against ${origin}`);
if (failed.length) process.exit(1);
