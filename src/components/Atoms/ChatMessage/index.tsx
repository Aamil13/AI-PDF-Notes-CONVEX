import React from 'react';
import { Bot, User } from 'lucide-react'; // You can use any icons you prefer
import { removeHtmlBackticks } from '@/lib/utils';

interface ChatMessageProps {
  sender: 'ai' | 'user';
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, message }) => {
  const isAI = sender === 'ai';

  const sanitizedMessage = removeHtmlBackticks(message);
  return (
    <div
      className={`flex items-start gap-3  ${
        isAI ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full ${
          isAI
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-700 text-gray-200 dark:bg-gray-600'
        }`}
      >
        {isAI ? <Bot size={20} /> : <User size={20} />}
      </div>

      {/* Message bubble */}
      <div
        className={`max-w-xs mt-4 md:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
          isAI
            ? 'bg-indigo-600 dark:bg-indigo-800  text-white dark:text-neutral-300 rounded-tl-none'
            : 'bg-gray-800 dark:bg-gray-900 text-gray-100 dark:text-neutral-300 rounded-tr-none border border-gray-700'
        }`}
        dangerouslySetInnerHTML={{ __html: sanitizedMessage }}
      ></div>
      {/* <div
        className={`max-w-xs mt-4 md:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
          isAI
            ? 'bg-indigo-500 dark:bg-indigo-800  text-white dark:text-neutral-300 rounded-tl-none'
            : 'bg-gray-800 dark:bg-gray-900 text-gray-100 dark:text-neutral-300 rounded-tr-none border border-gray-700'
        }`}
      >
        {message}
      </div> */}
    </div>
  );
};

export default ChatMessage;
