
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  email: string;
  rememberMe?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    const sessionUser = sessionStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = { email, rememberMe };
    
    // Store user data in localStorage if rememberMe is true, otherwise in sessionStorage
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('user', JSON.stringify(userData));
      // Clear any previous localStorage user
      localStorage.removeItem('user');
    }
    
    setUser(userData);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
