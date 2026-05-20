import { useEffect, useRef, useState } from 'react';
import { useChatContext } from '../../context/ChatContext';
import './ChatbotPanel.css';

const CHAT_API_ENDPOINT = '/api/v1/chatbot/generate/';

const WELCOME = {
  id: 'welcome',
  role: 'assistant',
  content: 'Buenas soy el Chatbot Primaria -CodeCrusaiders',
};

function ChatbotPanel() {
  const { loadedMessages, saveMessages } = useChatContext();

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (loadedMessages === null) {
      setMessages([WELCOME]);
    } else {
      setMessages([
        WELCOME,
        ...loadedMessages.map((m) => ({ id: crypto.randomUUID(), ...m })),
      ]);
    }
  }, [loadedMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const canSend = input.trim().length > 0 && !isLoading;

  const onSend = async () => {
    if (!canSend) return;

    const userText = input.trim();
    setInput('');

    const history = messages
      .filter((m) => m.id !== 'welcome')
      .map(({ role, content }) => ({ role, content }));

    const userMessage = { id: crypto.randomUUID(), role: 'user', content: userText };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Guardar en cuanto el usuario envía (sin esperar a la IA)
    const messagesWithUser = [...history, { role: 'user', content: userText }];
    await saveMessages(messagesWithUser);

    try {
      const token = localStorage.getItem('token');
      const payload = { new_message: { role: 'user', content: userText } };
      if (history.length > 0) payload.history = history;

      const response = await fetch(CHAT_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Error del servidor (${response.status})`);

      const data = await response.json();
      const botText =
        data?.[0]?.generated_text || 'Lo siento, no pude generar una respuesta.';

      const botMessage = { id: crypto.randomUUID(), role: 'assistant', content: botText };
      setMessages((prev) => [...prev, botMessage]);

      // Actualizar la conversación con la respuesta de la IA
      await saveMessages([...messagesWithUser, { role: 'assistant', content: botText }]);
    } catch (error) {
      console.error('Error al llamar a la API del chatbot:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Hubo un error de conexion. Por favor, intentalo de nuevo.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="chatbot">
      <div className="chatbot__panel">
        <div className="chatbot__messages" role="log" aria-label="Chatbot">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`chatbot__message ${m.role === 'user' ? 'is-user' : 'is-assistant'}`}
            >
              {m.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot__composer">
          <input
            className="chatbot__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un mensaje..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSend();
            }}
          />
          <button className="chatbot__send" onClick={onSend} disabled={!canSend}>
            {isLoading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default ChatbotPanel;
