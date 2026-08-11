import { escapeHTML } from '../utils/helpers.js';

/**
 * Renders one skill category (e.g. "Frontend") as a card of pills.
 * @param {string} category
 * @param {string[]} items
 */
export function renderSkillCard(category, items) {
  const pills = items
    .map(
      (item) =>
        `<span class="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">${escapeHTML(
          item
        )}</span>`
    )
    .join('');

  return `
    <div data-reveal class="reveal-item rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900">
      <h3 class="font-semibold text-slate-900 dark:text-white mb-3">${escapeHTML(category)}</h3>
      <div class="flex flex-wrap gap-2">${pills}</div>
    </div>
  `;
}

/**
 * Renders every category in profile.skills into `container`.
 * @param {HTMLElement} container
 * @param {Record<string,string[]>} skills
 */
export function renderSkillsGrid(container, skills) {
  container.innerHTML = Object.entries(skills)
    .map(([category, items]) => renderSkillCard(category, items))
    .join('');
}
