import { escapeHTML, icon } from '../utils/helpers.js';

/**
 * Returns the markup for a single project card.
 * Carries data-category / data-title attributes so projects.html
 * can filter and search purely via the DOM, no re-render needed.
 * @param {object} project - one entry from profile.json's "projects" array
 */
export function renderProjectCard(project) {
  const tech = project.tech
    .map(
      (t) =>
        `<span class="text-xs font-medium px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">${escapeHTML(
          t
        )}</span>`
    )
    .join('');

  return `
    <article data-reveal
      class="reveal-item group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
      data-category="${escapeHTML(project.category)}"
      data-title="${escapeHTML(project.title.toLowerCase())}">
      <div class="aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img src="${project.image}" alt="Screenshot of ${escapeHTML(project.title)}"
          loading="lazy" decoding="async" width="640" height="360"
          class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          onerror="this.style.display='none'" />
      </div>
      <div class="p-5 flex flex-col gap-3 flex-1">
        <div class="flex items-start justify-between gap-2">
          <h3 class="font-semibold text-slate-900 dark:text-white">${escapeHTML(project.title)}</h3>
          ${project.featured ? '<span class="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-400/10 dark:text-amber-300">Featured</span>' : ''}
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-400">${escapeHTML(project.description)}</p>
        <div class="flex flex-wrap gap-1.5">${tech}</div>
        <div class="mt-auto flex items-center gap-4 pt-2">
          ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400" aria-label="View source of ${escapeHTML(project.title)} on GitHub">${icon('github', 'w-4 h-4')} Code</a>` : ''}
          ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400" aria-label="View live demo of ${escapeHTML(project.title)}">${icon('external', 'w-4 h-4')} Live demo</a>` : ''}
        </div>
      </div>
    </article>
  `;
}
