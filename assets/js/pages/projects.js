import { initCommonLayout, finalizeReveal } from '../main.js';
import { renderProjectCard } from '../../../components/projectCard.js';
import { applyProjectsSchema } from '../../../config/seo.js';
import { debounce } from '../../../utils/helpers.js';
import { PROJECT_FILTER_ALL } from '../../../config/constants.js';

const profile = await initCommonLayout((p) => ({
  path: '/projects.html',
  title: `Projects — ${p.personal.name}`,
  description: `Selected projects by ${p.personal.name}, including tech stack, architecture, and impact.`
}));

const grid = document.getElementById('projects-grid');
const filterButtons = document.getElementById('filter-buttons');
const searchInput = document.getElementById('project-search');
const noResults = document.getElementById('no-results');

const categories = [PROJECT_FILTER_ALL, ...new Set(profile.projects.map((p) => p.category))];
let activeCategory = PROJECT_FILTER_ALL;

function renderFilterButtons() {
  filterButtons.innerHTML = categories
    .map(
      (cat) => `
      <button type="button" data-category="${cat}"
        class="px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
          cat === activeCategory
            ? 'bg-indigo-600 border-indigo-600 text-white'
            : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
        }" aria-pressed="${cat === activeCategory}">${cat}</button>`
    )
    .join('');
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const cards = grid.querySelectorAll('[data-title]');
  let visibleCount = 0;
  cards.forEach((card) => {
    const matchesCategory = activeCategory === PROJECT_FILTER_ALL || card.dataset.category === activeCategory;
    const matchesQuery = !query || card.dataset.title.includes(query);
    const visible = matchesCategory && matchesQuery;
    card.classList.toggle('hidden', !visible);
    if (visible) visibleCount += 1;
  });
  noResults.classList.toggle('hidden', visibleCount !== 0);
}

grid.innerHTML = profile.projects.map(renderProjectCard).join('');
renderFilterButtons();
applyProjectsSchema(profile);

filterButtons.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-category]');
  if (!btn) return;
  activeCategory = btn.dataset.category;
  renderFilterButtons();
  applyFilters();
});

searchInput.addEventListener('input', debounce(applyFilters, 150));

finalizeReveal();
