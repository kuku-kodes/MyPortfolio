import { DATA_URL } from '../config/constants.js';

let cache = null;
let inFlight = null;

/**
 * Loads data/profile.json once and caches it in memory for the session.
 * Every page imports this instead of fetching profile.json directly,
 * so the network only pays for it once.
 * @returns {Promise<object>}
 */
export async function getProfile() {
  if (cache) return cache;
  if (inFlight) return inFlight;

  inFlight = fetch(DATA_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load profile.json: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      cache = data;
      return data;
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}
