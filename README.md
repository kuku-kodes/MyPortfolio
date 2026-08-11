# Modular Portfolio

A fast, framework-free, JSON-driven portfolio site. Built with Vite, Tailwind CSS v4,
and vanilla JavaScript (ES Modules). Reuse it for yourself by editing **one file**:
`data/profile.json`.

## Quick start

```bash
npm install
npm run dev        # local dev server
npm run build       # production build to dist/ (also regenerates SEO files)
npm run preview     # preview the production build
```

## Make it yours

Everything on the site — name, photo, headline, experience, projects, skills,
certifications, testimonials, social links, and SEO metadata — comes from
`data/profile.json`. Edit that file; no HTML editing required.

1. Replace `data/profile.json` with your own details (keep the same shape).
2. Add your images to `assets/images/` and point to them from `profile.json`.
3. Add your résumé PDF at the path referenced by `personal.resumeUrl`.
4. Run `npm run generate:seo` (or just `npm run build`, which does it for you)
   to regenerate `public/robots.txt`, `public/sitemap.xml`, and
   `public/manifest.json` from your updated profile.
5. Set up the contact form (see below).

### Contact form setup (EmailJS)

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. Create an Email Service and an Email Template.
3. Copy your Service ID, Template ID, and Public Key into
   `config/constants.js` under `EMAILJS`.

EmailJS's public key is safe to ship in client-side code by design — it only
authorizes sending through templates you control, it isn't a secret credential.

## Architecture

```
portfolio/
├── index.html, about.html, projects.html,      Pages. Each is a thin shell:
│   experience.html, certifications.html,        a few empty containers plus
│   contact.html, 404.html                       one <script type="module">.
│
├── assets/
│   ├── css/main.css        Tailwind entrypoint + a handful of custom utilities
│   │                       (skip link, scroll-reveal, reading progress, skeletons)
│   ├── js/main.js          Shared bootstrap: load data, apply SEO, render
│   │                       navbar/footer, wire global UX
│   └── js/pages/*.js       Per-page logic: fetch profile, render that page's
│                           sections using the shared components
│
├── components/             Pure render functions: (data) => HTML string.
│   navbar.js, footer.js, projectCard.js, experienceCard.js,
│   skillCard.js, timeline.js, testimonialCard.js
│
├── config/
│   ├── constants.js         Non-personal config (EmailJS IDs, storage keys)
│   ├── routes.js             Nav structure, single source of truth for links
│   └── seo.js                 Injects <meta>, Open Graph, Twitter Card, and
│                                JSON-LD (Person/Breadcrumb/ItemList) from
│                                profile.json into <head> at runtime
│
├── data/profile.json        THE single source of truth for all content
│
├── utils/
│   ├── fetchData.js          Fetches + caches profile.json once per session
│   ├── theme.js                Light/dark/system theme, persisted, no-FOUC
│   ├── animations.js            Scroll-reveal, reading progress, back-to-top,
│   │                             typing effect — all prefers-reduced-motion aware
│   └── helpers.js                 escapeHTML, debounce, animateCount, inline SVG icons
│
├── scripts/generate-seo-files.js   Regenerates robots.txt/sitemap.xml/manifest.json
│                                    from profile.json (runs automatically on build)
│
└── public/                  robots.txt, sitemap.xml, manifest.json, favicons
```

**Data flow:** each page's script imports `initCommonLayout()` from
`assets/js/main.js`, which fetches `profile.json` once, injects SEO tags,
and renders the navbar/footer. The page script then renders its own
sections by passing slices of the same profile object into the pure
component functions in `components/`.

### Why no framework?

Vanilla ES modules keep the JS payload tiny and avoid any hydration cost —
this is what gets LCP and INP low. Components here are just functions that
return HTML strings; there's no virtual DOM, no build-step JSX. It's less
convenient than React for a large app, but for a mostly-static site it's
faster and has zero framework overhead to ship.

### SEO caveat: runtime injection vs. prerendering

`config/seo.js` sets meta tags, Open Graph/Twitter Card data, canonical URLs,
and JSON-LD **at runtime**, after `profile.json` loads. Modern Googlebot
executes JavaScript and will see these tags, but crawlers/social-media
scrapers that don't run JS (some link-preview bots) will only see the
placeholder `<title>Loading…</title>` in the raw HTML. For maximum
compatibility, consider prerendering the built HTML (e.g. with
`vite-plugin-prerender` or a small Puppeteer script that visits each route
post-build and saves the resulting DOM) so the meta tags are baked into the
static files. This is intentionally left out to keep the stack dependency-free;
add it if your use case needs bots that don't execute JS.

## Performance notes

- No render-blocking JS: all page scripts use `type="module"` (deferred by default).
- Images use `loading="lazy"` (except the hero photo, which uses
  `fetchpriority="high"` since it's likely the LCP element) and explicit
  `width`/`height` to prevent layout shift.
- Vite's multi-entry build code-splits each page and content-hashes assets
  for long-term caching.
- Scroll effects use `IntersectionObserver`/rAF instead of scroll-event
  handlers that run on every frame.
- All animations respect `prefers-reduced-motion`.
- Achieving literal 100/100/100/100 Lighthouse scores also depends on your
  hosting (HTTP/2+, compression, cache headers), real image assets (compressed,
  modern formats like AVIF/WebP), and font-loading strategy — this template
  gives you the code-level groundwork; verify the rest with Lighthouse/PageSpeed
  Insights against your deployed site and tune from there.

## Deployment guides

### GitHub Pages

```bash
npm run build
```

1. Push the repo to GitHub.
2. In `vite.config.js`, set `base: '/your-repo-name/'` if deploying to
   `username.github.io/your-repo-name` (omit if using a custom domain or a
   `username.github.io` root repo).
3. Use a GitHub Action (`actions/deploy-pages`) or the `gh-pages` npm package
   to publish the `dist/` folder to the `gh-pages` branch.
4. Enable GitHub Pages in the repo settings, pointing at that branch.

### Cloudflare Pages

1. Push the repo to GitHub/GitLab and connect it in the Cloudflare Pages dashboard.
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Cloudflare Pages handles HTTPS, HTTP/3, and global CDN caching automatically.

### Netlify

1. Connect the repo in the Netlify dashboard, or run `netlify deploy` via the CLI.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add a `public/_redirects` file with `/* /404.html 404` if you want Netlify
   to serve the custom 404 page for unmatched routes.

## Known scope notes

A few items from an ambitious feature wishlist are intentionally out of
scope for this template, since they need external services or add real
maintenance weight — treat them as extension points, not gaps in the code:

- **GitHub contributions graph / latest repos** — needs a GitHub API call;
  add a small fetch in a new `utils/github.js` and a section on the About
  or Projects page.
- **Coding-profile stats (LeetCode, Codeforces, etc.)** — these platforms
  don't offer stable public APIs; most portfolios link out (already wired
  in the footer via `profile.social`) rather than embed live stats.
- **Command palette / keyboard shortcuts** — not included; a `⌘K` palette
  is a reasonable follow-up component if you want it.
- **Full offline PWA support** — `manifest.json` is generated and the site
  is installable, but no service worker is included; add one (e.g. via
  `vite-plugin-pwa`) if offline support matters for your use case.
