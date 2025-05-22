import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import api from '../configs/api';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  error: Error | null;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // tanstack query
  
  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api.base_url}/user/me`);
      setUser(res.data);
      setError(null);
    } catch (err: any) {
      setError(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, fetchUser }}>
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