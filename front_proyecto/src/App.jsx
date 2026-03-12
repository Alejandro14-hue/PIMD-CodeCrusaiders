import React, { useEffect } from 'react';
import AppLayout from './components/layout/AppLayout';
import CasesSidebar from './components/sidebar/CasesSidebar';
import CaseDetailPanel from './components/case-detail/CaseDetailPanel';
import LoginPage from './components/login/LoginPage';
import { useCases } from './hooks/useCases';
import { useAuth } from './hooks/useAuth';
import './App.css';

function App() {
  const { user, loading, login, logout, checkAuth } = useAuth();
  const { cases, selectedCaseId, setSelectedCaseId, selectedCase } = useCases(!!user);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      window.history.replaceState({}, '', '/');
      checkAuth();
    }
  }, []);

  if (loading) {
    return <div className='loading-screen'>Cargando...</div>;
  }

  if (!user) {
    return <LoginPage onLogin={login} />;
  }

  return (
    <AppLayout
      sidebar={
        <CasesSidebar
          cases={cases}
          selectedCaseId={selectedCaseId}
          onSelectCase={setSelectedCaseId}
        />
      }
      user={user}
      onLogout={logout}
    >
      <CaseDetailPanel selectedCase={selectedCase} />
    </AppLayout>
  );
}

export default App;