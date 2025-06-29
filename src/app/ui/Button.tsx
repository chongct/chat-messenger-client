type ButtonProps = {
  onClick?: () => void;
  text: string;
};

export function Button(props: ButtonProps) {
  const { onClick, text } = props;

  return (
    <button
      className="w-full h-14 px-4 py-2 bg-[var(--button-background)] rounded-xl text-base font-bold hover:bg-blue-700 cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
