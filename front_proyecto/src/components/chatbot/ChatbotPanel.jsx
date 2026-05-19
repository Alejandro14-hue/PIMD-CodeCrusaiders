import { useState } from 'react';
import './ChatbotPanel.css';

const CHAT_API_ENDPOINT = 'https://cloud.riberadeltajo.es:11200/generate/';

function ChatbotPanel() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Buenas soy el Chatbot Primaria -CodeCrusaiders',
    },
  ]);

  const canSend = input.trim().length > 0 && !isLoading;

  const onSend = async () => {
    if (!canSend) return;

    const userText = input.trim();

    const userMessage = { id: crypto.randomUUID(), role: 'user', content: userText };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const payload = {
        new_message: {
          role: 'user',
          content: userText,
        },
      };

      if (history.length > 0) {
        payload.history = history;
      }

      const response = await fetch(CHAT_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor (${response.status})`);
      }

      const data = await response.json();
      const botText = data?.[0]?.generated_text || 'Lo siento, no pude generar una respuesta.';

      const botMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: botText,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error al llamar a la API:', error);
      const errorMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Hubo un error de conexion. Por favor, intentalo de nuevo.',
      };
      setMessages((prev) => [...prev, errorMessage]);
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
