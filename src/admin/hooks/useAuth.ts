import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types/auth';
import { encryptData, decryptData } from '../utils/encryption';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      try {
        const decryptedUser = decryptData(storedUser);
        setUser(JSON.parse(decryptedUser));
      } catch (error) {
        console.error('Failed to decrypt user data:', error);
        localStorage.removeItem('admin_user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, validate credentials against a backend
    if (email === 'admin@payflow.com' && password === 'admin123') {
      const userData: User = {
        id: '1',
        email,
        name: 'Admin User',
        role: 'admin',
      };
      const encryptedUser = encryptData(JSON.stringify(userData));
      localStorage.setItem('admin_user', encryptedUser);
      setUser(userData);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_user');
    setUser(null);
  };

  return { user, login, logout };
};