import { ROUTES, isActiveRoute } from '../config/routes.js';
import { icon } from '../utils/helpers.js';
import { getStoredTheme, cycleTheme } from '../utils/theme.js';
import { escapeHTML } from '../utils/helpers.js';

const THEME_ICONS = { light: 'sun', dark: 'moon', system: 'system' };

/**
 * Renders the site navbar into `container`.
 * @param {HTMLElement} container
 * @param {object} profile
 */
export function renderNavbar(container, profile) {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  const theme = getStoredTheme();

  const links = ROUTES.map((route) => {
    const active = isActiveRoute(route, pathname) || isActiveRoute(route, pathname + '.html');
    return `<a href="${route.path}"
        class="px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          active
            ? 'text-white bg-indigo-600'
            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
        }"
        ${active ? 'aria-current="page"' : ''}>${route.label}</a>`;
  }).join('');

  container.innerHTML = `
    <a href="#main-content" class="skip-link">Skip to content</a>
    <nav class="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800" aria-label="Primary">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <a href="/index.html" class="font-bold text-lg text-slate-900 dark:text-white">
            ${escapeHTML(profile.personal.name)}
          </a>
          <div class="hidden md:flex items-center gap-1">${links}</div>
          <div class="flex items-center gap-2">
            <button id="theme-toggle" type="button"
              class="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle color theme (current: ${theme})">
              ${icon(THEME_ICONS[theme], 'w-5 h-5')}
            </button>
            <button id="menu-toggle" type="button"
              class="md:hidden p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
        <div id="mobile-menu" class="md:hidden hidden pb-4 flex flex-col gap-1">${links}</div>
      </div>
    </nav>
  `;

  container.querySelector('#theme-toggle').addEventListener('click', (e) => {
    const next = cycleTheme();
    e.currentTarget.innerHTML = icon(THEME_ICONS[next], 'w-5 h-5');
    e.currentTarget.setAttribute('aria-label', `Toggle color theme (current: ${next})`);
  });

  const menuBtn = container.querySelector('#menu-toggle');
  const mobileMenu = container.querySelector('#mobile-menu');
  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
  });
}
