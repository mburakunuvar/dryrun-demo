# Suggested Improvements

Review target: `index.html`, `primitives.html`, `ape.html` (the deployed Azure Static Web App).
Source issue: [#6 Code Review and Performance](../../issues/6).

Findings below are split into **code quality / accessibility** and **performance**. Each
actionable item is tracked in its own GitHub issue (see _Filed issues_ at the end).

---

## 1. Code quality & accessibility

### 1.1 Semantic HTML
- `index.html` wraps everything in a generic `<div class="container">`. There is no
  `<header>`, `<main>`, `<nav>`, or `<footer>` landmark. Screen readers and search
  engines rely on these for structure.
- The navigation buttons on `index.html` are plain anchors inside a `div`. Wrap them in
  `<nav aria-label="Primary">`.
- `primitives.html` and `ape.html` use `<header>` / `<main>` / `<nav>` — good — but the
  active nav link should expose `aria-current="page"`.

### 1.2 Alt text & decorative content
- No `<img>` tags exist today, so no missing `alt` attributes currently ship. A convention
  must be added to the README so any future image includes meaningful `alt` text
  (or `alt=""` when purely decorative).
- Decorative glyphs injected via CSS `::before` (e.g. the `→` arrow in
  `.surfaces li::before`) should be marked `aria-hidden="true"` or confirmed as
  ignored by assistive tech.

### 1.3 Color contrast / high-contrast mode
- `ape.html` renders its `<h1>` with `color: transparent` + `background-clip: text`. In
  Windows high-contrast mode the text can disappear. Provide a solid `color:` fallback
  before the gradient-clip rules.
- The muted `--text-dim: #9da7b3` on `--bg: #0d1117` is close to the 4.5:1 WCAG AA
  threshold for body copy. Verify with an automated check once tests land.

### 1.4 Error handling / robustness
- All pages are static HTML — no runtime error handling is needed today. When JS is added,
  wrap listeners in try/catch and log to the console only in development builds.

---

## 2. Performance

### 2.1 CSS delivery
- Each page inlines 5–9 KB of CSS in `<style>`. Inline CSS is not technically
  render-blocking, but it bloats every HTML response and prevents browser caching of the
  stylesheet between pages. Design tokens are duplicated across all three files.
- **Recommendation:** extract shared rules into `styles/site.css`, link it with
  `<link rel="stylesheet" href="/styles/site.css">`, and keep only the critical
  above-the-fold subset inline.

### 2.2 Missing meta tags
Every page is missing one or more of:

| Tag | Status | Impact |
| --- | --- | --- |
| `<meta name="description">` | missing | SEO snippet |
| `<meta name="theme-color">` | missing | mobile chrome color |
| `<link rel="canonical">` | missing | SEO duplication |
| `<link rel="icon">` | missing | favicon fallback |
| `og:title` / `og:description` / `og:url` / `og:image` | missing | link previews |
| `twitter:card` / `twitter:title` / `twitter:description` | missing | Twitter previews |

### 2.3 Caching headers
- Azure Static Web Apps uses sensible defaults for HTML, but once CSS / images are
  externalized, add a `staticwebapp.config.json` rule to serve hashed static assets with
  `Cache-Control: public, max-age=31536000, immutable`.

### 2.4 Fonts & third-party assets
- No custom fonts or third-party scripts are loaded today — keep it that way. If fonts
  are added later, `preconnect` to the font origin and use `font-display: swap`.

### 2.5 Image pipeline (preventive)
- No images ship today. When added, require:
  - modern formats (`avif` / `webp`) with `<picture>` fallback,
  - explicit `width` / `height` to prevent CLS,
  - `loading="lazy"` for below-the-fold images.

---

## 3. Testing gap
The repo has **no automated tests**. Even a minimal harness (parse every HTML file,
assert required meta tags, check internal links resolve) would catch the regressions
most likely to occur during the other fixes.

---

## 4. Filed issues

In creation order (last one is the deployment trigger, per issue #6):

1. [Fix: missing alt attributes and semantic HTML](../../issues/9)
2. [Fix: render-blocking CSS and missing meta tags](../../issues/11)
3. [Write and run unit tests for the application](../../issues/10)
4. [Deploy latest version to Azure](../../issues/12)

---

## 5. Recommended order of work
1. Land the semantic-HTML fix (issue #9) — unblocks accessibility assertions in tests.
2. Land the meta-tags + CSS extraction fix (issue #11) — unblocks caching config.
3. Add the test suite (issue #10) — guards both of the above.
4. Trigger the Azure deployment (issue #12) — ships everything.
