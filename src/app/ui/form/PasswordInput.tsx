import styles from '@/app/ui/icons.module.css';

type PasswordInputProps = {
  id?: string;
  labelText?: string;
};

export async function PasswordInput(props: PasswordInputProps) {
  const { id = 'password', labelText = 'Password' } = props;

  return (
    <>
      <label className="uppercase text-sm font-semibold tracking-wider" htmlFor={id}>
        {labelText}
      </label>
      <div className="mt-3 relative">
        <div className={styles.lockIcon} />
        <input
          id={id}
          name={id}
          type="password"
          placeholder="******"
          required
          autoComplete="off"
          className="w-full h-10 bg-[var(--background)] pl-10 py-2 rounded-xl"
        />
      </div>
    </>
  );
}
