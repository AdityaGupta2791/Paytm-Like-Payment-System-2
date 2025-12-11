import axios from 'axios';

// Vite exposes env vars on `import.meta.env`. Use `VITE_API_BASE` if set.
const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE) || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${API_BASE}/api/v1`,
});

// Attach token from localStorage to every request
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore localStorage errors
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
