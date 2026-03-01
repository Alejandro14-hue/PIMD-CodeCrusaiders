const CASES_ENDPOINT = '/api/v1/api/casos';

export const caseService = {
  getCases: async () => {
    const response = await fetch(CASES_ENDPOINT);
    if (!response.ok) throw new Error('Error loading cases');
    return response.json();
  },
  submitCaseScore: async (caseId, scores) => {
    const response = await fetch(`/api/v1/api/casos/${caseId}/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scores)
    });
    if (!response.ok) throw new Error('Error submitting score');
    return response.json();
  }
};
