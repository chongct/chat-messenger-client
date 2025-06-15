import { Button, EmailInput, PasswordInput } from '@/app/ui/form';
import styles from '@/app/ui/icons.module.css';

export default function RegisterPage() {
  return (
    <main className="flex items-center h-screen p-4">
      <div className="w-full max-w-md mx-auto pt-8 px-6 bg-[var(--card-background)] rounded-2xl">
        <h3 className="text-center text-2xl text-[var(--foreground)] font-bold">Sign up</h3>
        <p className="mt-2 text-center text-base text-[var(--foreground-text)]">
          Create your account to get started
        </p>
        <form className="mt-6 space-y-6">
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
                  required
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
                required
                autoComplete="off"
                className="w-full h-10 bg-[var(--background)] pl-10 py-2 mt-3 rounded-xl"
              />
            </div>
          </div>
          <EmailInput />
          <PasswordInput />
          <PasswordInput id="confirmPassword" labelText="Confirm password" />
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
