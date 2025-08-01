import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/app/providers/AuthProvider';
import { AUTHENTICATED_REDIRECT_ROUTES, RESTRICTED_ROUTES } from '@/app/config';
import { REFRESH_TOKEN_LOCAL_STORAGE_KEY } from '@/app/utils';

export const useRedirectIfAuthenticated = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { loading, accessToken, setAccessToken, setUserId } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (AUTHENTICATED_REDIRECT_ROUTES.includes(pathname) && accessToken) {
      router.push('/');

      return;
    }

    if (RESTRICTED_ROUTES.includes(pathname) && !accessToken) {
      router.push('/login');
    }
  }, [loading, accessToken, router, pathname]);

  const updateAuthContext = ({
    accessToken,
    refreshToken,
    userId,
  }: {
    accessToken: string;
    refreshToken: string;
    userId: string;
  }) => {
    setAccessToken(accessToken);
    setUserId(userId);
    localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, refreshToken);
  };

  return { loading, accessToken, updateAuthContext };
};
