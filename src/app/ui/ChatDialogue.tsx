import { ChatBubble } from './ChatBubble';

type ChatDialogueProps = {
  chatDialogue: Record<string, string | boolean>[];
  isLoading: boolean;
};

export function ChatDialogue(props: ChatDialogueProps) {
  const { chatDialogue, isLoading } = props ?? {};
  const renderedChatBubbles = chatDialogue.map((chat, chatIndex) => {
    return <ChatBubble key={chatIndex} {...(chat as { isReceived?: boolean; text: string })} />;
  });

  return (
    <div className='px-4'>
      <div className='flex flex-wrap'>{renderedChatBubbles}</div>
      {isLoading && <p className='italic'>Thinking...</p>}
    </div>
  );
}
