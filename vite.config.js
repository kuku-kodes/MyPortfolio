import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { cpSync, existsSync } from 'fs';

/**
 * data/profile.json lives at the project root (per the documented folder
 * structure) rather than under public/, because that's where you edit it.
 * Vite's public/ dir is the only folder copied verbatim to dist/ on build,
 * so this tiny plugin copies data/ (and data/profile.json specifically)
 * into dist/data/ at the end of the build — the runtime fetch('/data/profile.json')
 * in utils/fetchData.js then resolves the same way in dev and in production.
 */
function copyProfileData() {
  return {
    name: 'copy-profile-data',
    closeBundle() {
      const src = resolve(__dirname, 'data');
      const dest = resolve(__dirname, 'dist/data');
      if (existsSync(src)) cpSync(src, dest, { recursive: true });
    }
  };
}

/**
 * Vite config.
 * - Multi-page app: each top-level .html file is its own entry.
 * - Tailwind v4 is wired in via the official Vite plugin (no separate PostCSS config needed).
 */
export default defineConfig({
  plugins: [tailwindcss(), copyProfileData()],
  build: {
    target: 'es2022',
    cssMinify: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        projects: resolve(__dirname, 'projects.html'),
        experience: resolve(__dirname, 'experience.html'),
        certifications: resolve(__dirname, 'certifications.html'),
        contact: resolve(__dirname, 'contact.html')
      },
      output: {
        // Predictable, cache-friendly, code-split chunks
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/chunk.[hash].js',
        assetFileNames: 'assets/[ext]/[name].[hash].[ext]'
      }
    }
  },
  server: { port: 5173, open: true }
});
