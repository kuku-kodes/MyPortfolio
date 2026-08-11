import { initCommonLayout, finalizeReveal } from '../main.js';
import { renderProjectCard } from '../../../components/projectCard.js';
import { renderSkillsGrid } from '../../../components/skillCard.js';
import { renderTestimonialCard } from '../../../components/testimonialCard.js';
import { typeText, initScrollReveal } from '../../../utils/animations.js';
import { animateCount, escapeHTML } from '../../../utils/helpers.js';

const profile = await initCommonLayout({ path: '/index.html' });
const { personal, projects, skills, testimonials } = profile;

// Hero
document.getElementById('hero-available').textContent = personal.availableForWork
  ? '● Available for new opportunities'
  : '';
document.getElementById('hero-name').textContent = personal.name;
document.getElementById('hero-summary').textContent = personal.summary;
document.getElementById('hero-photo').src = personal.photo;
document.getElementById('hero-photo').alt = `Portrait of ${personal.name}`;
document.getElementById('hero-resume').href = personal.resumeUrl;
document.getElementById('hero-github').href = profile.social.github;
document.getElementById('hero-linkedin').href = profile.social.linkedin;

typeText(document.getElementById('hero-typed'), personal.headline);

// Stats (animated counters)
const statTargets = {
  'stat-years': personal.yearsExperience,
  'stat-projects': projects.length,
  'stat-certs': (profile.certifications || []).length,
  'stat-visitors': 12000
};
const statsSection = document.getElementById('stat-years').closest('section');
const statsObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      Object.entries(statTargets).forEach(([id, value]) => animateCount(document.getElementById(id), value));
      statsObserver.disconnect();
    }
  },
  { threshold: 0.4 }
);
statsObserver.observe(statsSection);

// Featured projects
const featured = projects.filter((p) => p.featured);
document.getElementById('featured-projects').innerHTML = (featured.length ? featured : projects.slice(0, 2))
  .map(renderProjectCard)
  .join('');

// Skills
renderSkillsGrid(document.getElementById('skills-grid'), skills);

// Testimonials
document.getElementById('testimonials-grid').innerHTML = (testimonials || []).map(renderTestimonialCard).join('');

finalizeReveal();
