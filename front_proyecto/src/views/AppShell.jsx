import { useMemo } from 'react';
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import CasesSidebar from '../components/sidebar/CasesSidebar';
import CaseDetailPanel from '../components/case-detail/CaseDetailPanel';
import ChatbotPanel from '../components/chatbot/ChatbotPanel';
import ChatHistorySidebar from '../components/chat-history/ChatHistorySidebar';
import { useAuthContext } from '../context/AuthContext';
import { useCasesContext } from '../context/CasesContext';
import { useChatContext } from '../context/ChatContext';

function SidebarModeTabs() {
  return (
    <div className="sidebar-mode-tabs" role="tablist" aria-label="Modo">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `sidebar-mode-tabs__tab${isActive ? ' is-active' : ''}`
        }
      >
        Casos
      </NavLink>
      <NavLink
        to="/chat"
        className={({ isActive }) =>
          `sidebar-mode-tabs__tab${isActive ? ' is-active' : ''}`
        }
      >
        Chat IA
      </NavLink>
    </div>
  );
}

function AppShell() {
  const { user, logout } = useAuthContext();
  const { cases, selectedCaseId, setSelectedCaseId, selectedCase } = useCasesContext();
  const { sessionKey } = useChatContext();
  const location = useLocation();

  const isChat = location.pathname.startsWith('/chat');

  const sidebar = useMemo(() => {
    return (
      <>
        <SidebarModeTabs />
        {isChat ? (
          <ChatHistorySidebar />
        ) : (
          <CasesSidebar
            cases={cases}
            selectedCaseId={selectedCaseId}
            onSelectCase={setSelectedCaseId}
          />
        )}
      </>
    );
  }, [isChat, cases, selectedCaseId, setSelectedCaseId]);

  return (
    <AppLayout sidebar={sidebar} user={user} onLogout={logout}>
      <Routes>
        <Route path="/" element={<CaseDetailPanel selectedCase={selectedCase} />} />
        <Route path="chat" element={<ChatbotPanel key={sessionKey} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default AppShell;
