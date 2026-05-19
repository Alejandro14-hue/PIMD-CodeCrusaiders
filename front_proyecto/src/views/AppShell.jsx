import { useMemo } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import CasesSidebar from '../components/sidebar/CasesSidebar';
import CaseDetailPanel from '../components/case-detail/CaseDetailPanel';
import ChatbotPanel from '../components/chatbot/ChatbotPanel';
import { useAuthContext } from '../context/AuthContext';
import { useCasesContext } from '../context/CasesContext';

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

  const onDownloadResults = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      user: user?.email || user?.name || null,
      selectedCaseId: selectedCaseId || null,
      selectedCase: selectedCase || null,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultados.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const sidebar = useMemo(() => {
    return (
      <>
        <SidebarModeTabs />
        <CasesSidebar
          cases={cases}
          selectedCaseId={selectedCaseId}
          onSelectCase={setSelectedCaseId}
        />
      </>
    );
  }, [cases, selectedCaseId, setSelectedCaseId]);

  return (
    <AppLayout
      sidebar={sidebar}
      user={user}
      onLogout={logout}
      onDownloadResults={onDownloadResults}
    >
      <Routes>
        <Route path="/" element={<CaseDetailPanel selectedCase={selectedCase} />} />
        <Route path="/chat" element={<ChatbotPanel />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default AppShell;
