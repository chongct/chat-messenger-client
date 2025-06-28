import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/app/providers/AuthProvider';
import { AUTHENTICATED_REDIRECT_ROUTES, RESTRICTED_ROUTES } from '@/app/config';

export const useRedirectIfAuthenticated = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { loading, user, refreshUser } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (AUTHENTICATED_REDIRECT_ROUTES.includes(pathname) && user) {
      router.push('/');

      return;
    }

    if (RESTRICTED_ROUTES.includes(pathname) && !user) {
      router.push('/login');
    }
  }, [loading, user, router, pathname]);

  return { loading, user, refreshUser };
};
