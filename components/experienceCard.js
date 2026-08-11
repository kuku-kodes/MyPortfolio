import { escapeHTML } from '../utils/helpers.js';

/**
 * Returns markup for one job entry. Designed to be placed inside
 * the timeline wrapper produced by components/timeline.js.
 * @param {object} job - one entry from profile.json's "experience" array
 */
export function renderExperienceCard(job) {
  const highlights = (job.highlights || [])
    .map((h) => `<li class="text-sm text-slate-600 dark:text-slate-400">${escapeHTML(h)}</li>`)
    .join('');

  return `
    <div data-reveal class="reveal-item relative pl-10">
      <span class="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-indigo-100 dark:ring-indigo-500/20" aria-hidden="true"></span>
      <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 class="font-semibold text-slate-900 dark:text-white">${escapeHTML(job.role)} · ${escapeHTML(job.company)}</h3>
        <span class="text-sm text-slate-500 dark:text-slate-400">${escapeHTML(job.duration)}</span>
      </div>
      <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">${escapeHTML(job.location)}</p>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">${escapeHTML(job.description)}</p>
      <ul class="list-disc list-inside space-y-1">${highlights}</ul>
    </div>
  `;
}
