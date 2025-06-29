import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/app/providers/AuthProvider';
import { AUTHENTICATED_REDIRECT_ROUTES, RESTRICTED_ROUTES } from '@/app/config';

export const useRedirectIfAuthenticated = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { loading, userId, refreshUser } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (AUTHENTICATED_REDIRECT_ROUTES.includes(pathname) && userId) {
      router.push('/');

      return;
    }

    if (RESTRICTED_ROUTES.includes(pathname) && !userId) {
      router.push('/login');
    }
  }, [loading, userId, router, pathname]);

  return { loading, userId, refreshUser };
};
