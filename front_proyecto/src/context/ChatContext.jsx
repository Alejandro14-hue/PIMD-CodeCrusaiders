import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { chatService } from '../services/chatService';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [currentConvId, setCurrentConvId] = useState(null);
  const [loadedMessages, setLoadedMessages] = useState(null);
  // sessionKey fuerza el remontaje de ChatbotPanel al cambiar de conversación
  const [sessionKey, setSessionKey] = useState(0);
  const savingRef = useRef(false);

  const loadConversations = useCallback(async () => {
    try {
      const res = await chatService.getConversations();
      setConversations(res.data || []);
    } catch (err) {
      console.error('Error cargando conversaciones:', err);
    }
  }, []);

  const selectConversation = useCallback(async (convId) => {
    try {
      const res = await chatService.getConversation(convId);
      setCurrentConvId(convId);
      setLoadedMessages(res.data?.mensajes || []);
      setSessionKey((k) => k + 1);
    } catch (err) {
      console.error('Error cargando conversación:', err);
    }
  }, []);

  const startNewChat = useCallback(() => {
    setCurrentConvId(null);
    setLoadedMessages(null);
    setSessionKey((k) => k + 1);
  }, []);

  // Llamar tras cada respuesta de la IA con los mensajes actuales (sin el welcome)
  const saveMessages = useCallback(
    async (messages) => {
      if (savingRef.current) return;
      savingRef.current = true;
      try {
        if (currentConvId) {
          await chatService.updateConversation(currentConvId, messages);
          await loadConversations();
        } else {
          const titulo =
            messages.find((m) => m.role === 'user')?.content?.slice(0, 60) ||
            'Nueva conversación';
          const res = await chatService.createConversation(messages, titulo);
          const newId = res.data?.id;
          setCurrentConvId(newId);
          await loadConversations();
        }
      } catch (err) {
        console.error('Error guardando conversación:', err);
      } finally {
        savingRef.current = false;
      }
    },
    [currentConvId, loadConversations],
  );

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConvId,
        loadedMessages,
        sessionKey,
        loadConversations,
        selectConversation,
        startNewChat,
        saveMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider');
  return ctx;
}
