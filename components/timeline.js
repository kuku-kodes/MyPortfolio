import { renderExperienceCard } from './experienceCard.js';
import { escapeHTML } from '../utils/helpers.js';

/**
 * Renders a vertical timeline of experience entries into `container`.
 * @param {HTMLElement} container
 * @param {object[]} experience - profile.json's "experience" array
 */
export function renderExperienceTimeline(container, experience) {
  container.innerHTML = `
    <div class="space-y-10 border-l border-slate-200 dark:border-slate-800">
      ${experience.map(renderExperienceCard).join('')}
    </div>
  `;
}

/**
 * Renders a vertical timeline of education entries into `container`.
 * @param {HTMLElement} container
 * @param {object[]} education - profile.json's "education" array
 */
export function renderEducationTimeline(container, education) {
  container.innerHTML = `
    <div class="space-y-10 border-l border-slate-200 dark:border-slate-800">
      ${education
        .map(
          (edu) => `
        <div data-reveal class="reveal-item relative pl-10">
          <span class="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100 dark:ring-emerald-500/20" aria-hidden="true"></span>
          <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 class="font-semibold text-slate-900 dark:text-white">${escapeHTML(edu.degree)}</h3>
            <span class="text-sm text-slate-500 dark:text-slate-400">${escapeHTML(edu.duration)}</span>
          </div>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">${escapeHTML(edu.institution)}</p>
          <p class="text-sm text-slate-600 dark:text-slate-400">${escapeHTML(edu.description)}</p>
        </div>`
        )
        .join('')}
    </div>
  `;
}
