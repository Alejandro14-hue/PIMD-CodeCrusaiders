import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { chatService } from '../services/chatService';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [currentConvId, setCurrentConvId] = useState(null);
  const [loadedMessages, setLoadedMessages] = useState(null);
  const [sessionKey, setSessionKey] = useState(0);

  // Ref para que saveMessages siempre vea el ID actualizado sin re-crearse
  const currentConvIdRef = useRef(null);
  const savingRef = useRef(false);

  const setConvId = (id) => {
    currentConvIdRef.current = id;
    setCurrentConvId(id);
  };

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
      setConvId(convId);
      setLoadedMessages(res.data?.mensajes || []);
      setSessionKey((k) => k + 1);
    } catch (err) {
      console.error('Error cargando conversación:', err);
    }
  }, []);

  const startNewChat = useCallback(() => {
    setConvId(null);
    setLoadedMessages(null);
    setSessionKey((k) => k + 1);
  }, []);

  const saveMessages = useCallback(
    async (messages) => {
      if (savingRef.current) return;
      savingRef.current = true;
      try {
        const convId = currentConvIdRef.current;
        if (convId) {
          await chatService.updateConversation(convId, messages);
        } else {
          const titulo =
            messages.find((m) => m.role === 'user')?.content?.slice(0, 60) ||
            'Nueva conversación';
          const res = await chatService.createConversation(messages, titulo);
          const newId = res.data?.id;
          setConvId(newId);
        }
        // Refrescar la lista del sidebar
        const res = await chatService.getConversations();
        setConversations(res.data || []);
      } catch (err) {
        console.error('Error guardando conversación:', err);
      } finally {
        savingRef.current = false;
      }
    },
    [], // sin dependencias: usa la ref siempre actualizada
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
