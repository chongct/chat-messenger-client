'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button, EmailInput, PasswordInput } from '@/app/ui/form';
import styles from '@/app/ui/icons.module.css';
import { registerUser } from '@/app/services';
import { useRedirectIfAuthenticated } from '@/app/hooks';

export default function RegisterPage() {
  const router = useRouter();
  const { loading, user } = useRedirectIfAuthenticated();
  const [state, formAction] = useActionState(registerUser, {});
  const { error, success } = state ?? {};
  const {
    email: emailError,
    password: passwordError,
    confirmPassword: confirmPasswordError,
  } = error ?? {};

  useEffect(() => {
    if (success) {
      router.push('/');
    }
  }, [router, success]);

  if (loading || (!loading && user)) {
    return null;
  }

  return (
    <main className="flex items-center h-screen p-4">
      <div className="w-full max-w-md mx-auto pt-8 px-6 bg-[var(--card-background)] rounded-2xl">
        <h3 className="text-center text-2xl text-[var(--foreground)] font-bold">Sign up</h3>
        <p className="mt-2 text-center text-base text-[var(--foreground-text)]">
          Create your account to get started
        </p>
        <form action={formAction} className="mt-6 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="uppercase text-sm font-semibold tracking-wider" htmlFor="firstName">
                First name
              </label>
              <div className="mt-3 relative">
                <div className={styles.userIcon} />
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  autoComplete="off"
                  className="w-full h-10 bg-[var(--background)] pl-10 py-2 rounded-xl"
                />
              </div>
            </div>
            <div>
              <label className="uppercase text-sm font-semibold tracking-wider">Last name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Doe"
                autoComplete="off"
                className="w-full h-10 bg-[var(--background)] pl-10 py-2 mt-3 rounded-xl"
              />
            </div>
          </div>
          <EmailInput error={emailError} />
          <PasswordInput error={passwordError} />
          <PasswordInput
            id="confirmPassword"
            labelText="Confirm password"
            error={confirmPasswordError}
          />
          <Button text="Create account" />
        </form>
        <p className="mt-6 mb-8 text-center text-base text-[var(--foreground-text)]">
          Already have an account?{' '}
          <a className="font-semibold text-[var(--button-background)]" href="/login">
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}
