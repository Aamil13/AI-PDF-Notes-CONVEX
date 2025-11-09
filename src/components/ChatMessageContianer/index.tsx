import React, { useEffect, useRef } from 'react';
import ChatMessage from '../Atoms/ChatMessage';
import { ChatType } from '../ChatArea';

type Props = {
  chats: ChatType[];
};

const ChatMessageContainer = ({ chats }: Props) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to bottom when chats change
    bottomRef.current?.scrollIntoView({
      behavior: chats.length > 1 ? 'smooth' : 'auto',
    });
  }, [chats]);

  return (
    <div className="overflow-y-auto h-full hide-scrollbar">
      <div className="mx-auto flex flex-col gap-4">
        {chats.map((msg, idx) => (
          <ChatMessage key={idx} sender={msg.role} message={msg.content} />
        ))}
        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatMessageContainer;
