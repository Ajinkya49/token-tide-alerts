
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../utils/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // For demo purposes, we'll simulate a successful login
    // In a real app, you would make an API call to your backend
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          savedAirdrops: [],
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve();
      }, 1000);
    });
  };

  const signup = async (email: string, password: string, name: string) => {
    // For demo purposes, we'll simulate a successful signup
    // In a real app, you would make an API call to your backend
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: '1',
          email,
          name,
          savedAirdrops: [],
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
