'use client';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';

import { useRedirectIfAuthenticated } from '@/app/hooks';
import { Button } from '@/app/ui/Button';
import { logoutUser } from '@/app/services';
import styles from '@/app/ui/icons.module.css';

export default function HomePage() {
  const router = useRouter();
  const { loading, userId, refreshUser } = useRedirectIfAuthenticated();
  const [isMenuExpanded, setMenuExpanded] = useState(false);

  if (loading || (!loading && !userId)) {
    return null;
  }

  const onClickLogout = async () => {
    const response = await logoutUser();
    const { userId: logoutUserId } = response ?? {};

    if (response && !logoutUserId) {
      refreshUser(logoutUserId);
      router.push('/login');
    }
  };

  const onClickMenu = () => {
    setMenuExpanded(!isMenuExpanded);
  };

  return (
    <div className='flex h-screen'>
      <aside
        className={clsx(
          'flex justify-center h-full bg-[var(--card-background)] transition-[width]',
          isMenuExpanded ? 'w-80' : 'w-0'
        )}
      >
        {isMenuExpanded && (
          <Button
            className='w-9/10 h-10 bg-[var(--background)]'
            onClick={onClickLogout}
            text='Logout'
          >
            <div className={clsx(styles.logoutIcon, 'mr-1')} />
          </Button>
        )}
      </aside>
      <main className='flex flex-col flex-1 h-full'>
        <header className='py-3 px-4'>
          <Button onClick={onClickMenu}>
            <div className={styles.menuIcon} />
          </Button>
        </header>
        <div className='flex-1' />
        <div className='px-4 py-4 bg-[var(--background-contrast)] border-t border-t-(--border)'>
          <input
            className='h-10 w-9/10 px-3 py-2 bg-[var(--background)] border-2 border-(--border) rounded-full'
            type='text'
            id='message'
          />
        </div>
      </main>
    </div>
  );
}
