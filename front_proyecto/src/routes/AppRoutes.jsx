import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../components/login/LoginPage';
import AppShell from '../views/AppShell';
import { useAuthContext } from '../context/AuthContext';

function AppShellSafe() {
  try {
    return <AppShell />;
  } catch (err) {
    return (
      <div style={{ padding: 16 }}>
        <h2>Ha ocurrido un error al cargar la aplicacion</h2>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{String(err)}</pre>
      </div>
    );
  }
}

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
      {/* Allow nested routes under AppShell (e.g. /chat) */}
      <Route path="/*" element={user ? <AppShellSafe /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
