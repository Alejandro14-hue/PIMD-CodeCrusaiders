import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const userData = await authService.checkAuth();
      setUser(userData);
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = () => authService.login();
  const logout = () => authService.logout();

  return { user, loading, login, logout };
}
