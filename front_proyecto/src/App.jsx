import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { CasesProvider } from './context/CasesContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CasesProvider>
        <AppRoutes />
      </CasesProvider>
    </AuthProvider>
  );
}

export default App;