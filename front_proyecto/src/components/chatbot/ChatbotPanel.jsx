import { useState } from 'react';
import './ChatbotPanel.css';

function ChatbotPanel() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Buenas soy el Chatbot Primaria -CodeCrusaiders',
    },
  ]);

  const canSend = input.trim().length > 0;

  const onSend = () => {
    if (!canSend) return;

    const userMessage = { id: crypto.randomUUID(), role: 'user', content: input.trim() };
    const botMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'Buenas soy el Chatbot Primaria -CodeCrusaiders',
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput('');
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
            Enviar
          </button>
        </div>
      </div>
    </section>
  );
}

export default ChatbotPanel;
