export const authService = {
  checkAuth: async () => {
    try {
      const response = await fetch('/auth/me');
      if (response.ok) {
        const user = await response.json();
        return user.error ? null : user;
      }
      return null;
    } catch (error) {
      console.error('Auth check failed', error);
      return null;
    }
  },
  login: () => {
    window.location.href = '/auth/login';
  },
  logout: () => {
    window.location.href = '/auth/logout';
  },
};
