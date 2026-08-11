/**
 * Subtle, dependency-free animation helpers.
 * Everything here respects prefers-reduced-motion and uses IntersectionObserver
 * instead of scroll listeners for reveal effects (cheaper on the main thread).
 */

const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Fades + slides in any element with [data-reveal] as it enters the viewport.
 * Call once after your components are rendered into the DOM.
 */
export function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (REDUCE_MOTION || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  targets.forEach((el) => io.observe(el));
}

/** Updates a fixed progress bar's width to reflect scroll position. */
export function initReadingProgress(barSelector = '#reading-progress') {
  const bar = document.querySelector(barSelector);
  if (!bar) return;
  let ticking = false;
  function update() {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = `${pct}%`;
    ticking = false;
  }
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
}

/** Shows/hides a "back to top" button and wires its click handler. */
export function initBackToTop(buttonSelector = '#back-to-top') {
  const btn = document.querySelector(buttonSelector);
  if (!btn) return;
  const toggle = () => btn.classList.toggle('opacity-0', window.scrollY < 400);
  window.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: REDUCE_MOTION ? 'auto' : 'smooth' })
  );
  toggle();
}

/** Types out `text` into `el` one character at a time. Skips straight to full text if reduced motion is preferred. */
export function typeText(el, text, speed = 45) {
  if (REDUCE_MOTION) {
    el.textContent = text;
    return;
  }
  let i = 0;
  el.textContent = '';
  (function step() {
    el.textContent += text.charAt(i);
    i += 1;
    if (i < text.length) setTimeout(step, speed);
  })();
}
