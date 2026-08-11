import { initCommonLayout, finalizeReveal } from '../main.js';
import { renderExperienceTimeline } from '../../../components/timeline.js';

const profile = await initCommonLayout((p) => ({
  path: '/experience.html',
  title: `Experience — ${p.personal.name}`,
  description: `Work history and highlights for ${p.personal.name}, ${p.personal.role}.`
}));

renderExperienceTimeline(document.getElementById('experience-timeline'), profile.experience || []);
finalizeReveal();
