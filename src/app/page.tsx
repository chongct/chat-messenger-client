'use client';

import { useRouter } from 'next/navigation';

import { useRedirectIfAuthenticated } from '@/app/hooks';
import { Button } from '@/app/ui/Button';
import { logoutUser } from '@/app/services';

export default function HomePage() {
  const router = useRouter();
  const { loading, userId, refreshUser } = useRedirectIfAuthenticated();

  if (loading || (!loading && !userId)) {
    return null;
  }

  const onClick = async () => {
    const response = await logoutUser();
    const { userId: logoutUserId } = response ?? {};

    if (response && !logoutUserId) {
      refreshUser(logoutUserId);
      router.push('/login');
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="h-full w-80 bg-[var(--card-background)] transition-[width]">
        <Button onClick={onClick} text="Logout" />
      </aside>
      <main className="flex-1 h-full">Home page</main>
    </div>
  );
}
