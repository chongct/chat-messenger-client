'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { checkAuth } from '@/app/services';

const AuthContext = createContext({ loading: true, user: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAuthStatus = async () => {
    try {
      const authStatus = await checkAuth();
      const { userId } = authStatus ?? {};
      setUser(userId);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAuthStatus();
  }, []);

  return <AuthContext.Provider value={{ loading, user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
