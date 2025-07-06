'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { EmailInput, PasswordInput } from '@/app/ui/form';
import { Button } from '@/app/ui/Button';
import { loginUser } from '@/app/services';
import { useRedirectIfAuthenticated } from '@/app/hooks';

export default function LoginPage() {
  const router = useRouter();
  const { loading, userId, refreshUser } = useRedirectIfAuthenticated();
  const [state, formAction] = useActionState(loginUser, {});
  const { error, userId: loginUserId } = state ?? {};
  const { email: emailError, password: passwordError, message: errorMessage } = error ?? {};

  useEffect(() => {
    if (loginUserId) {
      refreshUser(loginUserId);
      router.push('/');
    }
  }, [router, loginUserId, refreshUser]);

  if (loading || (!loading && userId)) {
    return null;
  }

  return (
    <main className='flex items-center h-screen p-4'>
      <div className='w-full max-w-md mx-auto pt-8 px-6 bg-[var(--card-background)] rounded-2xl'>
        <h3 className='text-center text-2xl text-[var(--foreground)] font-bold'>Sign in</h3>
        <p className='mt-2 text-center text-base text-[var(--foreground-text)]'>
          Enter your credentials to access your account
        </p>
        <form action={formAction} className='mt-6 space-y-6'>
          <EmailInput error={emailError} />
          <PasswordInput error={passwordError || errorMessage} />
          <Button className='w-full h-14 bg-[var(--button-background)]' text='Sign in' />
        </form>
        <p className='mt-6 mb-8 text-center text-base text-[var(--foreground-text)]'>
          Don&apos;t have an account?{' '}
          <a className='font-semibold text-[var(--button-background)]' href='/register'>
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
