import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/app/providers/AuthProvider';

export const useRedirectIfAuthenticated = () => {
  const router = useRouter();
  const { loading, user } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      router.push('/');

      return;
    }

    router.push('/login');
  }, [loading, user, router]);

  return { loading, user };
};
