import clsx from 'clsx';
import React from 'react';

type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  text?: string;
};

export function Button(props: ButtonProps) {
  const { children, className, onClick, text } = props;

  return (
    <button
      className={clsx(
        className,
        'relative flex justify-center items-center px-4 py-2 rounded-xl text-base font-bold hover:bg-blue-700 cursor-pointer'
      )}
      onClick={onClick}
    >
      {children}
      {text}
    </button>
  );
}
