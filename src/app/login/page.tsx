import { Button, EmailInput, PasswordInput } from '@/app/ui/form';

export default function LoginPage() {
  return (
    <main className="flex items-center h-screen p-4">
      <div className="w-full max-w-md mx-auto pt-8 px-6 bg-[var(--card-background)] rounded-2xl">
        <h3 className="text-center text-2xl text-[var(--foreground)] font-bold">Sign in</h3>
        <p className="mt-2 text-center text-base text-[var(--foreground-text)]">
          Enter your credentials to access your account
        </p>
        <form className="mt-6 space-y-6">
          <EmailInput />
          <PasswordInput />
          <Button text="Sign in" />
        </form>
        <p className="mt-6 mb-8 text-center text-base text-[var(--foreground-text)]">
          Don&apos;t have an account?{' '}
          <a className="font-semibold text-[var(--button-background)]" href="/register">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
