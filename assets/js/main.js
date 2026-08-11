import { getProfile } from '../../utils/fetchData.js';
import { applySEO } from '../../config/seo.js';
import { renderNavbar } from '../../components/navbar.js';
import { renderFooter } from '../../components/footer.js';
import { initScrollReveal, initBackToTop, initReadingProgress } from '../../utils/animations.js';

/**
 * Runs on every page. Loads profile.json once, injects SEO tags,
 * renders the shared navbar/footer, and wires global interactions.
 * Individual pages call this first, then render their own sections
 * with the returned profile object.
 *
 * @param {{title?: string, description?: string, path?: string, readingProgress?: boolean} | ((profile: object) => object)} [seoOverrides]
 *   Either a plain overrides object, or a function that receives the loaded
 *   profile and returns one — useful when the title needs profile data
 *   (e.g. "About — {name}") that isn't available until after the fetch.
 * @returns {Promise<object>} the parsed profile.json
 */
export async function initCommonLayout(seoOverrides = {}) {
  const profile = await getProfile();
  const overrides = typeof seoOverrides === 'function' ? seoOverrides(profile) : seoOverrides;

  applySEO(profile, overrides);

  const navMount = document.getElementById('navbar');
  const footerMount = document.getElementById('footer');
  if (navMount) renderNavbar(navMount, profile);
  if (footerMount) renderFooter(footerMount, profile);

  if (seoOverrides.readingProgress) initReadingProgress();
  initBackToTop();

  return profile;
}

/**
 * Call once after a page has finished rendering its own dynamic content,
 * so [data-reveal] elements added after initCommonLayout are picked up too.
 */
export function finalizeReveal() {
  initScrollReveal();
}
