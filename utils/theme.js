import { THEME_STORAGE_KEY } from '../config/constants.js';

const media = window.matchMedia('(prefers-color-scheme: dark)');

/** Resolves 'system' to the OS preference; passes through 'light'/'dark'. */
function resolve(mode) {
  return mode === 'system' ? (media.matches ? 'dark' : 'light') : mode;
}

/** Applies the resolved theme to <html data-theme="..."> and the class Tailwind's dark: variant expects. */
function apply(mode) {
  const resolved = resolve(mode);
  document.documentElement.setAttribute('data-theme', resolved);
  document.documentElement.classList.toggle('dark', resolved === 'dark');
}

/** Reads the stored preference ('light' | 'dark' | 'system'), defaulting to 'system'. */
export function getStoredTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY) || 'system';
}

/** Persists and applies a theme choice. */
export function setTheme(mode) {
  localStorage.setItem(THEME_STORAGE_KEY, mode);
  apply(mode);
}

/** Call once per page load, as early as possible (see the inline snippet in each HTML head). */
export function initTheme() {
  apply(getStoredTheme());
  media.addEventListener('change', () => {
    if (getStoredTheme() === 'system') apply('system');
  });
}

/** Cycles light -> dark -> system -> light. Used by the navbar toggle button. */
export function cycleTheme() {
  const order = ['light', 'dark', 'system'];
  const next = order[(order.indexOf(getStoredTheme()) + 1) % order.length];
  setTheme(next);
  return next;
}
