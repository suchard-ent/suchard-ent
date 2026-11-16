import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const site = 'https://suchard-ent.github.io';
const base = '/suchard-ent/';
const expectedOrigin = site + base;

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

function listFiles(path = '') {
  return readdirSync(join(root, path), {withFileTypes:true}).flatMap(item => {
    const rel = join(path, item.name);
    return item.isDirectory() ? listFiles(rel) : [rel];
  });
}

const files = listFiles();
const htmlFiles = files.filter(f => f.endsWith('.html'));
assert.equal(htmlFiles.length, 41, 'Expected 41 Astro HTML pages');

for(const required of [
  'index.html', '404.html', 'ko/index.html', 'en/index.html',
  'ko/credits/index.html', 'en/credits/index.html', 'ja/credits/index.html', 'ja/index.html',
  'ko/works/lovestruck/index.html', 'en/works/lovestruck/index.html', 'ja/works/lovestruck/index.html',
  'images/lovestruck-2015-hero-desktop.webp',
  'images/lovestruck-2015-hero-mobile.webp',
  'images/suchard-og-2026.jpg',
  'favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png', 'favicon-48x48.png',
  'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'site.webmanifest', 'sitemap-index.xml'
]) assert.ok(files.includes(required), 'Missing Pages artifact: ' + required);

for(const path of htmlFiles) {
  const html = read(path);
  assert.ok(!html.includes('http://localhost:'), 'Localhost URL leaked into ' + path);
  assert.ok(!html.includes('https://localhost:'), 'Localhost URL leaked into ' + path);

  const attributes = [...html.matchAll(/\b(?:href|src|srcset)="([^"]+)"/g)].map(x => x[1]);
  for(const value of attributes) {
    if(!value.startsWith('/')) continue;
    assert.ok(value.startsWith(base), 'Root-relative URL missing Pages prefix in ' + path + ': ' + value);

    const withoutAnchor = value.split('#')[0].split('?')[0];
    const withoutBase = withoutAnchor.slice(base.length);
    if(!withoutBase || withoutBase.endsWith('/')) {
      assert.ok(files.includes(withoutBase + 'index.html'), 'Broken HTML route: ' + value + ' in ' + path);
    } else if(/\.(?:css|js|svg|webp|png|jpg|jpeg|ico|woff2?|json)$/.test(withoutBase)) {
      assert.ok(files.includes(withoutBase), 'Broken file URL: ' + value + ' in ' + path);
    }
  }

  if(path === '404.html') continue;

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(canonical?.startsWith(expectedOrigin), 'Bad canonical in ' + path + ': ' + canonical);
  assert.ok(html.includes('content="noindex,nofollow"'), 'Rights-review noindex guard missing: ' + path);

  if(path === 'index.html') continue;

  const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  assert.ok(og?.startsWith(expectedOrigin + 'images/'), 'Bad OG image in ' + path + ': ' + og);

  for(const lang of ['ko','en','ja']) {
    assert.ok(html.includes('hreflang="' + lang + '"'), 'Missing alternate language ' + lang + ' in ' + path);
  }
}

const manifest=JSON.parse(read('site.webmanifest'));
assert.equal(manifest.short_name,'SUCHARD');
assert.equal(manifest.start_url,'./ko/');
for(const icon of manifest.icons){
  const file=icon.src.replace(/^\.\//,'');
  assert.ok(files.includes(file),'Missing webmanifest icon '+icon.src);
}
for(const lang of ['ko','en','ja']){
  const html=read(lang+'/index.html');
  for(const iconFile of ['favicon.ico','favicon-32x32.png','apple-touch-icon.png','site.webmanifest'])
    assert.ok(html.includes(base+iconFile),'Missing linked icon '+lang+' '+iconFile);
}
const sitemap = read('sitemap-0.xml');
assert.ok(sitemap.includes('<loc>' + expectedOrigin + 'ko/</loc>'), 'Korean homepage missing from sitemap');
assert.ok(sitemap.includes('<loc>' + expectedOrigin + 'en/</loc>'), 'English homepage missing from sitemap');
assert.ok(sitemap.includes('<loc>' + expectedOrigin + 'ja/</loc>'), 'Japanese homepage missing from sitemap');
assert.ok(!sitemap.includes('localhost'), 'Localhost leaked into sitemap');

const index = read('index.html');
assert.ok(index.includes('content="0;url=' + base + 'ko/"'), 'Root does not redirect to Korean page');

assert.ok(files.some(f => f.endsWith('.css')), 'No stylesheet in static artifact');

console.log('PAGES_ARTIFACT_QA_PASS: 41 pages, 3-language metadata, noindex, OG, site prefix and assets');
