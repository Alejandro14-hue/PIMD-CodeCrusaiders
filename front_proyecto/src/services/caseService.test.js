import { describe, it, expect, vi, beforeEach } from 'vitest';
import { caseService } from './caseService';

describe('caseService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn();
  });

  it('getCases should fetch random cases', async () => {
    const mockData = { ok: true, message: 'Success', data: [{ _id: '1', title: 'Case 1' }] };
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await caseService.getCases();
    
    expect(global.fetch).toHaveBeenCalledWith('/api/v1/api/random/');
    expect(result).toEqual(mockData);
  });

  it('getCaseById should fetch a specific case', async () => {
    const mockData = { ok: true, message: 'Success', data: { _id: '123', title: 'Specific Case' } };
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await caseService.getCaseById('123');
    
    expect(global.fetch).toHaveBeenCalledWith('/api/v1/api/123');
    expect(result).toEqual(mockData);
  });

  it('getCases should throw error if response is not ok', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
    });

    await expect(caseService.getCases()).rejects.toThrow('Error loading cases');
  });
});
