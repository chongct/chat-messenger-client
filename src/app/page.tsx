'use client';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { useRedirectIfAuthenticated } from '@/app/hooks';
import { useAuth } from '@/app/providers/AuthProvider';
import { ChatDialogue } from '@/app/ui/ChatDialogue';
import { Button } from '@/app/ui/Button';
import { logoutUser, postChat } from '@/app/services';
import styles from '@/app/ui/icons.module.css';

export default function HomePage() {
  const router = useRouter();
  const { tempCsrf } = useAuth();
  const { loading, accessToken, updateAuthContext } = useRedirectIfAuthenticated();
  const [isMenuExpanded, setMenuExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [chatDialogue, setChatDialogue] = useState<Record<string, string | boolean>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatOutput, setChatOutput] = useState('');

  const onClickLogout = async () => {
    const response = await logoutUser(tempCsrf);
    const { userId: logoutUserId } = response ?? {};

    if (response && !logoutUserId) {
      updateAuthContext(response);

      router.push('/login');
    }
  };

  const onClickMenu = () => {
    setMenuExpanded(!isMenuExpanded);
  };

  const onClickSend = async () => {
    const inputValue = inputRef.current?.value;

    if (inputRef.current && inputValue) {
      setChatDialogue(chatDialogue.concat({ text: inputValue }));
      setIsLoading(true);
      inputRef.current.value = '';
      const output = await postChat(inputValue);
      setChatOutput(output);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatOutput) {
      setChatDialogue(chatDialogue.concat({ text: chatOutput, isReceived: true }));
      setChatOutput('');
    }
  }, [chatDialogue, chatOutput]);

  if (loading || (!loading && !accessToken)) {
    return null;
  }

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
            className='w-9/10 h-10 px-4 bg-[var(--background)]'
            onClick={onClickLogout}
            text='Logout'
          >
            <div className={clsx(styles.logoutIcon, 'mr-1')} />
          </Button>
        )}
      </aside>
      <main className='flex flex-col flex-1 h-full'>
        <header className='py-3 px-4'>
          <Button className='px-4' onClick={onClickMenu}>
            <div className={styles.menuIcon} />
          </Button>
        </header>
        <div className='flex-1'>
          <ChatDialogue chatDialogue={chatDialogue} isLoading={isLoading} />
        </div>
        <div className='relative px-4 py-4 bg-[var(--background-contrast)] border-t border-t-(--border)'>
          <input
            className='h-10 w-9/10 px-3 py-2 bg-[var(--background)] border-2 border-(--border) rounded-full'
            id='message'
            type='text'
            ref={inputRef}
          />
          <Button className='inline-block align-middle px-3' onClick={onClickSend}>
            <div className={styles.sendIcon} />
          </Button>
        </div>
      </main>
    </div>
  );
}
