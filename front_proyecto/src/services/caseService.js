const BASE_ENDPOINT = '/api/v1/api';
const RANDOM_ENDPOINT = `${BASE_ENDPOINT}/random/`;

export const caseService = {
  getCases: async () => {
    const response = await fetch(RANDOM_ENDPOINT);
    if (!response.ok) throw new Error('Error loading cases');
    return response.json();
  },

  /**
   * Obtiene un caso específico por su _id.
   * Devuelve la misma estructura que getCases: {ok, message, data}
   */
  getCaseById: async (id) => {
    const response = await fetch(`${BASE_ENDPOINT}/${id}`);
    if (!response.ok) throw new Error('Error loading case');
    return response.json();
  }
};
