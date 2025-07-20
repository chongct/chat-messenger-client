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

import { checkAuth, getRefreshToken, getCsrfToken } from '@/app/services';
import { noop, REFRESH_TOKEN_LOCAL_STORAGE_KEY } from '@/app/utils';

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
    await getCsrfToken();
    const refreshStatus = await getRefreshToken();
    const { accessToken, refreshToken: refreshTokenFromResponse, userId } = refreshStatus ?? {};

    if (accessToken && userId) {
      setAccessToken(accessToken);
      setUserId(userId);
      localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, refreshTokenFromResponse);
    }
  };

  useEffect(() => {
    const setAuthStatus = async () => {
      try {
        if (!accessToken) {
          await attemptRefreshToken();

          return;
        }

        const authStatus = await checkAuth(accessToken);
        const { userId: checkedUserId } = authStatus ?? {};

        if (checkedUserId) {
          setUserId(checkedUserId);
        } else {
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
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ loading, accessToken, setAccessToken, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
