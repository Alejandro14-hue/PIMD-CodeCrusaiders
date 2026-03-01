export const authService = {
  getUser: async () => {
    const response = await fetch('/api/v1/auth/me');
    if (!response.ok) throw new Error('Not authenticated');
    return response.json();
  },
  login: () => {
    window.location.href = '/api/v1/auth/login';
  },
  logout: async () => {
    await fetch('/api/v1/auth/logout', { method: 'POST' });
    window.location.href = '/';
  }
};
