// Regenerates public/robots.txt, public/sitemap.xml, and public/manifest.json
// from data/profile.json, so those files never need manual edits either.
// Run with: node scripts/generate-seo-files.js
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const profile = JSON.parse(readFileSync(resolve(root, 'data/profile.json'), 'utf-8'));
const { seo, personal } = profile;
const siteUrl = seo.siteUrl.replace(/\/$/, '');

const pages = [
  { path: '/index.html', priority: '1.0', freq: 'monthly' },
  { path: '/about.html', priority: '0.8', freq: 'monthly' },
  { path: '/projects.html', priority: '0.9', freq: 'weekly' },
  { path: '/experience.html', priority: '0.7', freq: 'monthly' },
  { path: '/certifications.html', priority: '0.6', freq: 'monthly' },
  { path: '/contact.html', priority: '0.5', freq: 'yearly' }
];

writeFileSync(
  resolve(root, 'public/robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
);

const urls = pages
  .map((p) => `  <url><loc>${siteUrl}${p.path}</loc><changefreq>${p.freq}</changefreq><priority>${p.priority}</priority></url>`)
  .join('\n');
writeFileSync(
  resolve(root, 'public/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

writeFileSync(
  resolve(root, 'public/manifest.json'),
  JSON.stringify(
    {
      name: `${personal.name} — Portfolio`,
      short_name: 'Portfolio',
      description: seo.description,
      start_url: '/index.html',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: seo.themeColor,
      icons: [
        { src: '/favicon/KKFavicon2.png', sizes: '192x192', type: 'image/png' },
        { src: '/favicon/KKFavicon.png', sizes: '512x512', type: 'image/png' }
      ]
    },
    null,
    2
  )
);

console.log('Generated robots.txt, sitemap.xml, and manifest.json from data/profile.json');
