import { useMemo } from 'react';
import AppLayout from '../components/layout/AppLayout';
import CasesSidebar from '../components/sidebar/CasesSidebar';
import CaseDetailPanel from '../components/case-detail/CaseDetailPanel';
import ChatbotPanel from '../components/chatbot/ChatbotPanel';
import { useAuthContext } from '../context/AuthContext';
import { useCasesContext } from '../context/CasesContext';

function AppShell() {
  const { user, logout } = useAuthContext();
  const { cases, selectedCaseId, setSelectedCaseId, selectedCase } = useCasesContext();

  const sidebar = useMemo(() => {
    return (
      <>
        <CasesSidebar
          cases={cases}
          selectedCaseId={selectedCaseId}
          onSelectCase={setSelectedCaseId}
        />
        <ChatbotPanel />
      </>
    );
  }, [cases, selectedCaseId, setSelectedCaseId]);

  return (
    <AppLayout sidebar={sidebar} user={user} onLogout={logout}>
      <CaseDetailPanel selectedCase={selectedCase} />
    </AppLayout>
  );
}

export default AppShell;
