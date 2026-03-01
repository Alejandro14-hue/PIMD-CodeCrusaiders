const CASES_ENDPOINT = '/api/v1/api/';

export const caseService = {
  getCases: async () => {
    const response = await fetch(CASES_ENDPOINT);
    if (!response.ok) throw new Error('Error loading cases');
    return response.json();
  }
};
