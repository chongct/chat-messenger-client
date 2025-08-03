import clsx from 'clsx';

type ChatBubbleProps = {
  isReceived?: boolean;
  key: number;
  text: string;
};

export function ChatBubble(props: ChatBubbleProps) {
  const { isReceived = false, text } = props ?? {};

  return (
    <div
      className={clsx(
        'block basis-full w-full px-4 py-2 mb-3 max-w-md text-base text-[var(--foreground-text)] rounded-2xl',
        isReceived ? 'bg-[var(--background-contrast)]' : 'bg-[var(--chat-background)]',
        !isReceived && 'ml-[25%]'
      )}
    >
      {text}
    </div>
  );
}
