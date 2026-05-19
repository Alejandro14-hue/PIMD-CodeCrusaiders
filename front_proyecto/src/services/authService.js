const API_BASE_URL = (import.meta?.env?.VITE_API_BASE_URL || '').replace(/\/$/, '');

const withBase = (path) => {
  if (API_BASE_URL) return `${API_BASE_URL}${path}`;
  return path;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const authService = {
  getUser: async () => {
    const response = await fetch(withBase('/api/v1/auth/me'), {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Not authenticated');
    return response.json();
  },
  login: () => {
    window.location.href = withBase('/api/v1/auth/login');
  },
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = withBase('/api/v1/auth/logout');
  }
};