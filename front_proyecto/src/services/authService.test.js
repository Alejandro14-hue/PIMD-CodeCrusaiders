import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from './authService';

describe('authService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn();
  });

  it('getUser should fetch the current user', async () => {
    const mockUser = { email: 'test@example.com', name: 'Test User' };

    // Mock successful fetch
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockUser,
    });

    const user = await authService.getUser();

    expect(global.fetch).toHaveBeenCalledWith('/api/v1/auth/me');
    expect(user).toEqual(mockUser);
  });

  it('getUser should throw error if not authenticated', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
    });

    await expect(authService.getUser()).rejects.toThrow('Not authenticated');
  });

  it('login should redirect to the login endpoint', () => {
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    authService.login();

    expect(window.location.href).toBe('/api/v1/auth/login');

    // Restore
    window.location = originalLocation;
  });
});
