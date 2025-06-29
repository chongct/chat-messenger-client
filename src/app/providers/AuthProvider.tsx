'use client';

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { checkAuth } from '@/app/services';
import { noop } from '@/app/utils';

interface IAuthContext {
  loading: boolean;
  userId: string;
  refreshUser: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<IAuthContext>({ loading: true, userId: '', refreshUser: noop });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  const setAuthStatus = async () => {
    try {
      const authStatus = await checkAuth();
      const { userId: checkedUserId } = authStatus ?? {};
      setUserId(checkedUserId);
    } catch {
      setUserId('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ loading, userId, refreshUser: setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
