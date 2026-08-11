/**
 * Injects SEO metadata into <head> from a single source of truth: profile.json.
 * Every page calls applySEO(profile, pageOverrides) once on load.
 *
 * Note: for best-possible SEO, prerendering (see README > "SEO caveat") beats
 * pure runtime injection because crawlers that don't execute JS see nothing
 * until this script runs. This module is the pragmatic, framework-free
 * middle ground for a static Vite site.
 */

function setMeta(name, content, attr = 'name') {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJSONLD(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * @param {object} profile - full parsed profile.json
 * @param {{title?: string, description?: string, path?: string}} [overrides]
 */
export function applySEO(profile, overrides = {}) {
  const { seo, personal, social } = profile;
  const title = overrides.title || seo.title;
  const description = overrides.description || seo.description;
  const path = overrides.path || '/';
  const url = seo.siteUrl.replace(/\/$/, '') + path;

  document.title = title;
  document.documentElement.lang = 'en';

  setMeta('description', description);
  setMeta('keywords', (seo.keywords || []).join(', '));
  setMeta('theme-color', seo.themeColor);
  setMeta('robots', 'index, follow');

  // Open Graph
  setMeta('og:title', title, 'property');
  setMeta('og:description', description, 'property');
  setMeta('og:type', 'website', 'property');
  setMeta('og:url', url, 'property');
  setMeta('og:image', seo.siteUrl.replace(/\/$/, '') + seo.ogImage, 'property');
  setMeta('og:site_name', personal.name, 'property');

  // Twitter Card
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', seo.siteUrl.replace(/\/$/, '') + seo.ogImage);
  setMeta('twitter:site', seo.twitterHandle);

  setLink('canonical', url);

  // JSON-LD: Person schema (always present)
  setJSONLD('ld-person', {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    jobTitle: personal.role,
    description: personal.summary,
    email: personal.email,
    address: personal.location,
    url: seo.siteUrl,
    sameAs: Object.values(social || {}).filter(Boolean)
  });

  // JSON-LD: Breadcrumb for the current page
  if (path !== '/' && path !== '/index.html') {
    const pageName = title.split('—')[0].trim();
    setJSONLD('ld-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: seo.siteUrl },
        { '@type': 'ListItem', position: 2, name: pageName, item: url }
      ]
    });
  }
}

/** Adds Project/CreativeWork schema for the projects page. Call after rendering project cards. */
export function applyProjectsSchema(profile) {
  const items = (profile.projects || []).map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'CreativeWork',
      name: p.title,
      description: p.description,
      url: p.demo || p.github || profile.seo.siteUrl
    }
  }));
  setJSONLD('ld-projects', {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items
  });
}

/** Adds Blog/Article schema for the blogs listed in profile.json. */
export function applyBlogSchema(profile) {
  const items = (profile.blogs || []).map((b) => ({
    '@type': 'BlogPosting',
    headline: b.title,
    url: b.url,
    datePublished: b.date
  }));
  if (items.length) setJSONLD('ld-blog', { '@context': 'https://schema.org', '@graph': items });
}
