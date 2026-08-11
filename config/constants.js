/**
 * Global constants. Keep anything here that isn't personal data
 * (personal data belongs in data/profile.json).
 */
export const DATA_URL = '/data/profile.json';

export const THEME_STORAGE_KEY = 'portfolio-theme'; // 'light' | 'dark' | 'system'

export const PROJECT_FILTER_ALL = 'All';

export const EMAILJS = {
  // Fill these in from your EmailJS dashboard (emailjs.com).
  // Never hardcode a private API key here — EmailJS's public key is safe
  // for client-side use by design.
  serviceId: 'YOUR_EMAILJS_SERVICE_ID',
  templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY'
};

export const ANALYTICS = {
  // Set to a real ID to enable. Left blank, the analytics hook is a no-op.
  plausibleDomain: '',
  gaMeasurementId: ''
};
