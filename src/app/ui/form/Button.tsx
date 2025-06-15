type ButtonProps = {
  text: string;
};

export async function Button(props: ButtonProps) {
  const { text } = props;

  return (
    <button className="w-full h-14 px-4 py-2 bg-[var(--button-background)] rounded-xl text-base font-bold">
      {text}
    </button>
  );
}
