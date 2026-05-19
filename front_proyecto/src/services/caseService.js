const API_BASE_URL = (import.meta?.env?.VITE_API_BASE_URL || '').replace(/\/$/, '');
const withBase = (path) => {
  if (API_BASE_URL) return `${API_BASE_URL}${path}`;
  return path;
};

// Nginx (prod) maps /api/v1/api/* -> backend /v1/api/*
const BASE_ENDPOINT = '/api/v1/api';
const RANDOM_ENDPOINT = `${BASE_ENDPOINT}/random/`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const caseService = {
  getCases: async () => {
    const response = await fetch(withBase(RANDOM_ENDPOINT), {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Error loading cases');
    const payload = await response.json();
    if (Array.isArray(payload)) return payload;
    if (payload && Array.isArray(payload.data)) return payload.data;
    return [];
  },
  getCaseById: async (id) => {
    const response = await fetch(withBase(`${BASE_ENDPOINT}/${id}`), {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Error loading case');
    const payload = await response.json();
    if (payload && typeof payload === 'object' && 'data' in payload) return payload.data;
    return payload;
  }
};