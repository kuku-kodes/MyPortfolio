import { escapeHTML } from '../utils/helpers.js';

const SOCIAL_LABELS = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  twitter: 'Twitter',
  leetcode: 'LeetCode',
  codeforces: 'Codeforces',
  geeksforgeeks: 'GeeksforGeeks',
  hackerrank: 'HackerRank'
};

/**
 * Renders the site footer into `container`.
 * @param {HTMLElement} container
 * @param {object} profile
 */
export function renderFooter(container, profile) {
  const year = new Date().getFullYear();
  const links = Object.entries(profile.social || {})
    .filter(([, url]) => url)
    .map(
      ([key, url]) => `
      <a href="${url}" target="_blank" rel="noopener noreferrer"
         class="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
        ${SOCIAL_LABELS[key] || key}
      </a>`
    )
    .join('');

  container.innerHTML = `
    <footer class="border-t border-slate-200 dark:border-slate-800 mt-24">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-slate-500 dark:text-slate-400">
          © ${year} ${escapeHTML(profile.personal.name)}. Built with Vite &amp; Tailwind CSS.
        </p>
        <nav class="flex flex-wrap gap-x-5 gap-y-2 justify-center" aria-label="Social links">${links}</nav>
      </div>
    </footer>
    <button id="back-to-top" type="button"
      class="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 text-white shadow-lg opacity-0 transition-opacity duration-200 pointer-events-auto"
      aria-label="Back to top">
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  `;
}
