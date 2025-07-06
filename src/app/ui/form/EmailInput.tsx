import clsx from 'clsx';

import styles from '@/app/ui/icons.module.css';

type EmailInputProps = {
  error?: string;
};

export function EmailInput({ error }: EmailInputProps) {
  return (
    <>
      <label className='uppercase text-sm font-semibold tracking-wider' htmlFor='email'>
        Email Address
      </label>
      <div className={clsx('mt-3', 'relative', error && 'mb-2')}>
        <div className={styles.mailIcon} />
        <input
          id='email'
          name='email'
          type='email'
          placeholder='you@example.com'
          required
          autoComplete='off'
          className='w-full h-10 bg-[var(--background)] pl-10 py-2 rounded-xl'
        />
      </div>
      {error && (
        <div className='relative h-5 text-[var(--warning)] text-sm font-medium'>
          <div className={styles.alertIcon} />
          <span className='absolute left-6'>{error}</span>
        </div>
      )}
    </>
  );
}
