import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { CasesProvider } from './context/CasesContext';
import { ChatProvider } from './context/ChatContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CasesProvider>
        <ChatProvider>
          <AppRoutes />
        </ChatProvider>
      </CasesProvider>
    </AuthProvider>
  );
}

export default App;