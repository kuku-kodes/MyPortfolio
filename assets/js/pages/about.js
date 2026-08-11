import { initCommonLayout, finalizeReveal } from '../main.js';
import { renderEducationTimeline } from '../../../components/timeline.js';
import { applyBlogSchema } from '../../../config/seo.js';
import { escapeHTML } from '../../../utils/helpers.js';

const profile = await initCommonLayout((p) => ({
  path: '/about.html',
  title: `About — ${p.personal.name}`,
  description: p.personal.summary
}));

document.getElementById('about-summary').textContent = profile.personal.summary;

renderEducationTimeline(document.getElementById('education-timeline'), profile.education || []);

document.getElementById('achievements-list').innerHTML = (profile.achievements || [])
  .map((a) => `<li>${escapeHTML(a)}</li>`)
  .join('');

document.getElementById('blog-list').innerHTML = (profile.blogs || [])
  .map(
    (b) => `
    <a href="${b.url}" target="_blank" rel="noopener noreferrer"
       class="block rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
      <p class="font-medium text-slate-900 dark:text-white">${escapeHTML(b.title)}</p>
      <p class="text-sm text-slate-500 dark:text-slate-400 mb-2">${escapeHTML(b.date)} · ${escapeHTML(b.readingTime)} read</p>
      <p class="text-sm text-slate-600 dark:text-slate-400">${escapeHTML(b.excerpt)}</p>
    </a>`
  )
  .join('');

applyBlogSchema(profile);
finalizeReveal();
