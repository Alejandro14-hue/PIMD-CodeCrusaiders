import React from 'react';
import CaseDetailPanel from './components/case-detail/CaseDetailPanel';
import AppLayout from './components/layout/AppLayout';
import ScoreForm from './components/score/ScoreForm';
import CasesSidebar from './components/sidebar/CasesSidebar';
import LoginPage from './components/login/LoginPage';
import AuthStatus from './components/auth/AuthStatus';
import { useCases } from './hooks/useCases';
import { useCaseScoring } from './hooks/useCaseScoring';
import { useAuth } from './hooks/useAuth';
import './App.css';

function App() {
  const { user, loading, login, logout } = useAuth();
  const { cases, selectedCaseId, setSelectedCaseId, selectedCase, details } = useCases();
  const { selectedScores, handleScoreChange, submitSelectedCaseScore } = useCaseScoring({
    selectedCase,
    selectedCaseId,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitSelectedCaseScore();
  };

  if (loading) {
    return <div className='loading-screen'>Cargando aplicación...</div>;
  }

  if (!user) {
    return <LoginPage onLogin={login} />;
  }

  return (
    <AppLayout
      sidebar={<CasesSidebar cases={cases} selectedCaseId={selectedCaseId} onSelectCase={setSelectedCaseId} />}
    >
      <AuthStatus user={user} loading={loading} onLogin={login} onLogout={logout} />
      <section className='app-content'>
        <CaseDetailPanel selectedCase={selectedCase} details={details} />
        {selectedCase && (
          <ScoreForm
            scores={selectedScores}
            onChange={handleScoreChange}
            onSubmit={handleSubmit}
            disabled={!selectedCase}
          />
        )}
      </section>
    </AppLayout>
  );
}

export default App;
