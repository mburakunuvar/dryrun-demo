import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { parseHTML } from 'linkedom';

const repoRoot = path.resolve(import.meta.dirname, '..');
const pages = ['index.html', 'primitives.html', 'ape.html'];

function loadPage(file) {
  const html = readFileSync(path.join(repoRoot, file), 'utf8');
  const { document } = parseHTML(html);
  return document;
}

function getAttrCI(el, name) {
  for (const attr of el.attributes) {
    if (attr.name.toLowerCase() === name.toLowerCase()) return attr.value;
  }
  return null;
}

for (const page of pages) {
  test(`${page}: parses and has <html>`, () => {
    const html = readFileSync(path.join(repoRoot, page), 'utf8');
    let doc;
    assert.doesNotThrow(() => {
      doc = parseHTML(html).document;
    });
    assert.ok(doc.documentElement, 'has <html> element');
    assert.equal(doc.documentElement.tagName.toLowerCase(), 'html');
  });

  test(`${page}: <html> has non-empty lang`, () => {
    const doc = loadPage(page);
    const lang = doc.documentElement.getAttribute('lang');
    assert.ok(lang && lang.trim().length > 0, 'lang attribute present and non-empty');
  });

  test(`${page}: <head> has non-empty <title>`, () => {
    const doc = loadPage(page);
    const title = doc.querySelector('head > title');
    assert.ok(title, 'title exists');
    assert.ok(title.textContent.trim().length > 0, 'title non-empty');
  });

  test(`${page}: has <meta charset>`, () => {
    const doc = loadPage(page);
    const metas = [...doc.querySelectorAll('meta')];
    const hasCharset = metas.some((m) => getAttrCI(m, 'charset') !== null);
    assert.ok(hasCharset, 'meta charset present');
  });

  test(`${page}: has <meta name="viewport">`, () => {
    const doc = loadPage(page);
    const m = doc.querySelector('meta[name="viewport"]');
    assert.ok(m, 'viewport meta present');
  });

  test(`${page}: has <meta name="description"> with non-empty content`, () => {
    const doc = loadPage(page);
    const m = doc.querySelector('meta[name="description"]');
    assert.ok(m, 'description meta present');
    const content = m.getAttribute('content') || '';
    assert.ok(content.trim().length > 0, 'description non-empty');
  });

  test(`${page}: has <link rel="canonical"> with non-empty href`, () => {
    const doc = loadPage(page);
    const l = doc.querySelector('link[rel="canonical"]');
    assert.ok(l, 'canonical link present');
    const href = l.getAttribute('href') || '';
    assert.ok(href.trim().length > 0, 'canonical href non-empty');
  });

  test(`${page}: has <meta property="og:title"> with non-empty content`, () => {
    const doc = loadPage(page);
    const m = doc.querySelector('meta[property="og:title"]');
    assert.ok(m, 'og:title meta present');
    const content = m.getAttribute('content') || '';
    assert.ok(content.trim().length > 0, 'og:title non-empty');
  });

  test(`${page}: has <main> and <nav>`, () => {
    const doc = loadPage(page);
    assert.ok(doc.querySelectorAll('main').length >= 1, 'at least one <main>');
    assert.ok(doc.querySelectorAll('nav').length >= 1, 'at least one <nav>');
  });

  test(`${page}: internal .html/.css references exist on disk`, () => {
    const doc = loadPage(page);
    const urls = [];
    for (const a of doc.querySelectorAll('a[href]')) urls.push(a.getAttribute('href'));
    for (const l of doc.querySelectorAll('link[rel]')) {
      const h = l.getAttribute('href');
      if (h) urls.push(h);
    }
    for (const raw of urls) {
      if (!raw) continue;
      if (/^(https?:|data:|mailto:|tel:)/i.test(raw)) continue;
      if (raw.startsWith('#')) continue;
      const stripped = raw.split('#')[0].split('?')[0];
      if (!stripped) continue;
      if (!/\.(html|css)$/i.test(stripped)) continue;
      if (stripped.startsWith('/')) continue;
      const target = path.join(repoRoot, stripped);
      assert.ok(existsSync(target), `referenced file exists: ${stripped} (from ${page})`);
    }
  });
}

test('index.html links to primitives.html and ape.html', () => {
  const doc = loadPage('index.html');
  const hrefs = [...doc.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));
  const hasPrim = hrefs.some((h) => {
    const s = (h || '').split('#')[0].split('?')[0];
    return s === 'primitives.html' || s.endsWith('/primitives.html');
  });
  const hasApe = hrefs.some((h) => {
    const s = (h || '').split('#')[0].split('?')[0];
    return s === 'ape.html' || s.endsWith('/ape.html');
  });
  assert.ok(hasPrim, 'index links to primitives.html');
  assert.ok(hasApe, 'index links to ape.html');
});
