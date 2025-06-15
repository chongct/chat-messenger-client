import styles from '@/app/ui/icons.module.css';

export async function EmailInput() {
  return (
    <>
      <label className="uppercase text-sm font-semibold tracking-wider" htmlFor="email">
        Email Address
      </label>
      <div className="mt-3 relative">
        <div className={styles.mailIcon} />
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          autoComplete="off"
          className="w-full h-10 bg-[var(--background)] pl-10 py-2 rounded-xl"
        />
      </div>
    </>
  );
}
