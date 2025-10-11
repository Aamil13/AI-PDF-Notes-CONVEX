import React from 'react';
import ChatMessage from '../Atoms/ChatMessage';

type Props = {};

const ChatMessageContainer = (props: Props) => {
  const messages = [
    { sender: 'ai', message: 'Hello! 👋 I’ve scanned your results ✅' },
    {
      sender: 'ai',
      message: 'I see your ALT level is slightly elevated at 62 U/L.',
    },
    { sender: 'me', message: 'Should I be worried?' },
    {
      sender: 'ai',
      message:
        'Let’s check your symptoms. Any pain in the upper right abdomen?',
    },
    { sender: 'me', message: 'No pain at all.' },
    {
      sender: 'ai',
      message: 'Do you feel bloating or nausea after eating fatty foods?',
    },
  ];

  return (
    <div className="">
      <div className=" mx-auto flex flex-col gap-4">
        {messages.map((msg, idx) => (
          <ChatMessage
            key={idx}
            sender={msg.sender as 'ai' | 'me'}
            message={msg.message}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatMessageContainer;
