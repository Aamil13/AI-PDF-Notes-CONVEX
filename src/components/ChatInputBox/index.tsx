import React, { useRef, useState } from 'react';
import { useAction } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Loader2 } from 'lucide-react';

type Props = {
  fileId: string;
};

const ChatInputBox = ({ fileId }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const searchAI = useAction(api.myActions.search);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState('idle');

  const handleSendMessage = async () => {
    const textarea = textareaRef.current;
    console.log('text', textarea?.value);

    const result = await searchAI({ query: textarea?.value || '', fileId });
    console.log('Search Result:', result);

    const UnFormattedAns = JSON.parse(result);
    let AllUnFormattedAns = '';
    UnFormattedAns.forEach((ans: any) => {
      AllUnFormattedAns += ans.pageContent;
    });

    const PROMPT = `The following is the context information extracted from a PDF document:\n\n${AllUnFormattedAns}\n\nUsing the above information, provide a concise and accurate answer to the user's question: "${textarea?.value}" in HTML format. If the information is insufficient to answer the question, respond with "I don't know" in HTML format.`;
  };
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '112px'; // min-h-28 (28*4=112px)
      textarea.style.height = Math.min(textarea.scrollHeight, 260) + 'px'; // max-h-40 (40*4=160px)
    }
  };

  console.log('state', status);

  const handleSend = async () => {
    if (status === 'loading') return;

    console.log('state loading');
    setStatus('loading');

    await handleSendMessage();

    console.log('state sent');
    setStatus('sent');

    setTimeout(() => {
      console.log('state idle');
      setStatus('idle');
    }, 1000);
  };

  return (
    <div className="w-full flex items-center justify-center relative">
      <textarea
        ref={textareaRef}
        onInput={handleInput}
        className="
      bg-white dark:bg-neutral-800
      hide-scrollbar min-h-28 w-full rounded-lg
      border-2 border-neutral-200 dark:border-neutral-600
      shadow-lg
      focus:border-0
      focus:ring-2 dark:focus:ring-blue-600
      focus:border-blue-400
      outline-none ms-2 me-2 p-2 mb-2 resize-none
       pb-12
    "
        style={{ overflow: 'auto' }}
        placeholder='Start typing your message... (e.g., "Summarize the document")'
      ></textarea>

      {/* <button
        onClick={handleSendMessage}
        type="button"
        className="
      absolute bottom-4 right-4
      bg-blue-600 hover:bg-blue-700 text-white
      rounded-lg py-2 px-4 shadow-md
    "
      >
        Send ➤
      </button> */}

      {/* <motion.button
        type="button"
        onClick={handleSend}
        className="
          absolute bottom-4 right-4
          bg-blue-600 text-white rounded-full p-3
          shadow-md hover:bg-blue-700 focus:outline-none
          flex items-center justify-center
        "
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
        disabled={status === 'loading'}
      >
        <AnimatePresence mode="wait">
          {status === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Loader2 className="w-5 h-5 animate-spin" />
            </motion.div>
          )}

          {status === 'sent' && (
            <motion.div
              key="sent"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Check className="w-5 h-5" />
            </motion.div>
          )}

          {status === 'idle' && (
            <motion.div
              key="send"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Send className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button> */}

      <button
        onClick={handleSend}
        type="button"
        className="
        absolute bottom-4 right-4
        bg-blue-600 hover:bg-blue-700 text-white
        rounded-lg py-2 px-4 shadow-md
        flex items-center gap-2
        transition-all
      "
        disabled={status === 'loading'}
      >
        {/* Button Text */}
        <span>Send</span>

        {/* Animated Icon Section */}
        <AnimatePresence mode="wait">
          {status === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Loader2 className="w-5 h-5 animate-spin" />
            </motion.div>
          )}

          {status === 'sent' && (
            <motion.div
              key="sent"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Check className="w-5 h-5" />
            </motion.div>
          )}

          {status === 'idle' && (
            <motion.div
              key="send"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Send className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default ChatInputBox;
