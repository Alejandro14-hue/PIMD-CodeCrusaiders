const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const authService = {
  getUser: async () => {
    const response = await fetch('/api/v1/auth/me', {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Not authenticated');
    return response.json();
  },
  login: () => {
    window.location.href = '/api/v1/auth/login';
  },
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/api/v1/auth/logout';
  }
};