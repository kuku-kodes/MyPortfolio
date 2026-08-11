/**
 * Escapes text before it's interpolated into innerHTML, since every render
 * function below builds markup with template literals from JSON data.
 * @param {string} str
 */
export function escapeHTML(str = '') {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/** Debounces a function by `wait` ms — used for the project search input. */
export function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

/** Animates a counter from 0 to `end` over `duration` ms. Respects prefers-reduced-motion. */
export function animateCount(el, end, duration = 1200) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    el.textContent = end;
    return;
  }
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    el.textContent = Math.floor(eased * end);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = end;
  }
  requestAnimationFrame(tick);
}

/** Renders an SVG icon by name. Extend this map as you add icons to assets/icons. */
const ICONS = {
  github:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55v-2.16c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.6.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.16v3.2c0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>',
  external:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 5h5v5M19 5l-9 9M9 5H5v14h14v-4"/></svg>',
  sun:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.4 14.7A8.5 8.5 0 0 1 9.3 3.6a.75.75 0 0 0-.9-1 10 10 0 1 0 12.9 12.9.75.75 0 0 0-.9-.8Z"/></svg>',
  system:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
  search:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>'
};

export function icon(name, className = 'w-5 h-5') {
  const svg = ICONS[name] || '';
  return svg.replace('<svg ', `<svg class="${className}" `);
}
