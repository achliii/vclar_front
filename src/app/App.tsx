import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { Clientes } from './components/Clientes';
import { Trabajadores } from './components/Trabajadores';
import { OrdenTrabajo } from './components/OrdenTrabajo';
import { Citas } from './components/Citas';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/" />;
}

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/clientes" />} />
        <Route path="/clientes" element={<ProtectedRoute><Clientes /></ProtectedRoute>} />
        <Route path="/trabajadores" element={<ProtectedRoute><Trabajadores /></ProtectedRoute>} />
        <Route path="/ordenes" element={<ProtectedRoute><OrdenTrabajo /></ProtectedRoute>} />
        <Route path="/citas" element={<ProtectedRoute><Citas /></ProtectedRoute>} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
