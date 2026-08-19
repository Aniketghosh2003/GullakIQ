// Application API Configuration
export const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export function getApiUrl(endpoint) {
  if (!endpoint) return API_BASE;
  let path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // Prevent duplicate /api/api when API_BASE ends with /api and endpoint starts with /api
  if (API_BASE.endsWith('/api') && path.startsWith('/api/')) {
    path = path.substring(4);
  }

  return `${API_BASE}${path}`;
}

