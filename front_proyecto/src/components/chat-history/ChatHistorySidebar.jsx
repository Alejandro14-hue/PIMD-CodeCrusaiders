import { useEffect } from 'react';
import { useChatContext } from '../../context/ChatContext';
import './ChatHistorySidebar.css';

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
}

function ChatHistorySidebar() {
  const { conversations, currentConvId, loadConversations, selectConversation, startNewChat } =
    useChatContext();

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  return (
    <nav className="chat-history">
      <div className="chat-history__header">
        <h2 className="chat-history__title">Conversaciones</h2>
        <button className="chat-history__new" onClick={startNewChat} title="Nueva conversación">
          +
        </button>
      </div>

      {conversations.length === 0 ? (
        <p className="chat-history__empty">Sin conversaciones guardadas</p>
      ) : (
        <ul className="chat-history__list">
          {conversations.map((conv) => (
            <li
              key={conv._id}
              className={`chat-history__item${currentConvId === conv._id ? ' is-active' : ''}`}
              onClick={() => selectConversation(conv._id)}
            >
              <span className="chat-history__item-title">{conv.titulo || 'Conversación'}</span>
              <span className="chat-history__item-date">
                {formatDate(conv.actualizado_en)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default ChatHistorySidebar;
