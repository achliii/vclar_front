import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  nombre: string;
  email: string;
  rol: 'administrador' | 'vendedor';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuarios mock
const mockUsers = [
  { id: '1', nombre: 'Admin Principal', email: 'admin', password: 'admin', rol: 'administrador' as const },
  { id: '2', nombre: 'Vendedor 1', email: 'vendedor', password: 'vendedor', rol: 'vendedor' as const },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
