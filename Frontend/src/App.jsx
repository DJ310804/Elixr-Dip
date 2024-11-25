import { AuthProvider } from './components/context/AuthContext';
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
    <AuthProvider>
    <Dashboard/>
    </AuthProvider>
  );
}

export default App;
