import { initCommonLayout, finalizeReveal } from '../main.js';
import { escapeHTML } from '../../../utils/helpers.js';

const profile = await initCommonLayout((p) => ({
  path: '/certifications.html',
  title: `Certifications — ${p.personal.name}`,
  description: `Professional certifications earned by ${p.personal.name}.`
}));

document.getElementById('certifications-list').innerHTML = (profile.certifications || [])
  .map(
    (c) => `
    <a data-reveal href="${c.credentialUrl}" target="_blank" rel="noopener noreferrer"
       class="reveal-item block rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md transition-shadow bg-white dark:bg-slate-900">
      <p class="font-semibold text-slate-900 dark:text-white">${escapeHTML(c.name)}</p>
      <p class="text-sm text-slate-500 dark:text-slate-400">${escapeHTML(c.issuer)} · ${escapeHTML(c.date)}</p>
    </a>`
  )
  .join('');

finalizeReveal();
