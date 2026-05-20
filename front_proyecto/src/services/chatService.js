const API_BASE_URL = (import.meta?.env?.VITE_API_BASE_URL || '').replace(/\/$/, '');

const withBase = (path) => (API_BASE_URL ? `${API_BASE_URL}${path}` : path);

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const chatService = {
  getConversations: async () => {
    const res = await fetch(withBase('/api/v1/conversations/'), {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Error al obtener conversaciones');
    return res.json();
  },

  createConversation: async (mensajes, titulo) => {
    const res = await fetch(withBase('/api/v1/conversations/'), {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ mensajes, titulo }),
    });
    if (!res.ok) throw new Error('Error al crear conversación');
    return res.json();
  },

  updateConversation: async (convId, mensajes) => {
    const res = await fetch(withBase(`/api/v1/conversations/${convId}`), {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ mensajes }),
    });
    if (!res.ok) throw new Error('Error al actualizar conversación');
    return res.json();
  },

  getConversation: async (convId) => {
    const res = await fetch(withBase(`/api/v1/conversations/${convId}`), {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Error al obtener conversación');
    return res.json();
  },
};
