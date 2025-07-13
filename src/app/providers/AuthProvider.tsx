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

import { checkAuth, refreshToken } from '@/app/services';
import { noop } from '@/app/utils';

interface IAuthContext {
  loading: boolean;
  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<IAuthContext>({
  loading: true,
  accessToken: '',
  setAccessToken: noop,
  userId: '',
  setUserId: noop,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');

  const attemptRefreshToken = async () => {
    const refreshStatus = await refreshToken();
    const { accessToken, userId } = refreshStatus ?? {};
    setAccessToken(accessToken);
    setUserId(userId);
  };

  useEffect(() => {
    const setAuthStatus = async () => {
      try {
        const authStatus = await checkAuth(accessToken);
        const { userId: checkedUserId } = authStatus ?? {};
        setAccessToken(accessToken);
        setUserId(checkedUserId);

        if (!checkedUserId) {
          await attemptRefreshToken();
        }
      } catch {
        setAccessToken('');
        setUserId('');
      } finally {
        setLoading(false);
      }
    };

    setAuthStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider value={{ loading, accessToken, setAccessToken, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
