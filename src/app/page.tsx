'use client';

import { useRedirectIfAuthenticated } from '@/app/hooks';

export default function HomePage() {
  const { loading, user } = useRedirectIfAuthenticated();

  if (loading || (!loading && !user)) {
    return null;
  }

  return <main>Home page</main>;
}
