/**
 * Central route table. The navbar and footer are built from this,
 * so adding a page means adding one entry here (and the .html file).
 */
export const ROUTES = [
  { path: '/index.html', label: 'Home', match: ['/', '/index.html'] },
  { path: '/about.html', label: 'About', match: ['/about.html'] },
  { path: '/projects.html', label: 'Projects', match: ['/projects.html'] },
  { path: '/experience.html', label: 'Experience', match: ['/experience.html'] },
  { path: '/certifications.html', label: 'Certifications', match: ['/certifications.html'] },
  { path: '/contact.html', label: 'Contact', match: ['/contact.html'] }
];

/** Returns true if `pathname` belongs to the given route entry. */
export function isActiveRoute(route, pathname) {
  return route.match.includes(pathname);
}
