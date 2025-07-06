import clsx from 'clsx';

import styles from '@/app/ui/icons.module.css';

type PasswordInputProps = {
  error?: string;
  id?: string;
  labelText?: string;
};

export function PasswordInput(props: PasswordInputProps) {
  const { error, id = 'password', labelText = 'Password' } = props;

  return (
    <>
      <label className='uppercase text-sm font-semibold tracking-wider' htmlFor={id}>
        {labelText}
      </label>
      <div className={clsx('mt-3', 'relative', error && 'mb-2')}>
        <div className={styles.lockIcon} />
        <input
          id={id}
          name={id}
          type='password'
          placeholder='******'
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
