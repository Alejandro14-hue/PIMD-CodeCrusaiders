import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../components/login/LoginPage';
import AppShell from '../views/AppShell';
import { useAuthContext } from '../context/AuthContext';

function AppRoutes() {
  const { user, loading, login } = useAuthContext();

  if (loading) {
    return <div className="loading-screen">Cargando...</div>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <LoginPage onLogin={login} />}
      />
      <Route
        path="/"
        element={user ? <AppShell /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
