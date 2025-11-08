import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
  companyName?: string;
  industry?: string;
  avatarUrl?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  companyName: string;
  industry: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'password123',
    name: 'Admin User',
    companyName: 'TechCorp',
    industry: 'Technology',
    role: 'admin',
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'password123',
    name: 'John Doe',
    companyName: 'Marketing Pro',
    industry: 'Marketing',
    role: 'user',
  },
  {
    id: '3',
    email: 'marketer@example.com',
    password: 'password123',
    name: 'Jane Smith',
    companyName: 'Growth Inc',
    industry: 'E-commerce',
    role: 'user',
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, remember: boolean) => {
    const mockUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!mockUser) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = mockUser;
    setUser(userWithoutPassword);
    
    if (remember) {
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    }
    
    navigate('/dashboard');
  };

  const register = async (data: RegisterData) => {
    const newUser: User = {
      id: String(MOCK_USERS.length + 1),
      email: data.email,
      name: data.name,
      companyName: data.companyName,
      industry: data.industry,
      role: 'user',
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
