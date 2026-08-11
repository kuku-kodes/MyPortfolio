import { escapeHTML } from '../utils/helpers.js';

/**
 * Returns markup for a single testimonial.
 * @param {object} t - one entry from profile.json's "testimonials" array
 */
export function renderTestimonialCard(t) {
  return `
    <figure data-reveal class="reveal-item rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
      <blockquote class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        “${escapeHTML(t.quote)}”
      </blockquote>
      <figcaption class="mt-4 flex items-center gap-3">
        <img src="${t.avatar}" alt="" loading="lazy" width="40" height="40"
          class="w-10 h-10 rounded-full object-cover bg-slate-100 dark:bg-slate-800" onerror="this.style.display='none'" />
        <div>
          <p class="text-sm font-semibold text-slate-900 dark:text-white">${escapeHTML(t.name)}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">${escapeHTML(t.role)}</p>
        </div>
      </figcaption>
    </figure>
  `;
}
