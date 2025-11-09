import React, { useRef, useState } from 'react';
import { useAction, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Loader2 } from 'lucide-react';
import { generateGeminiAnswer } from '@/configs/AIModal';
import { ChatType } from '../ChatArea';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {
  fileId: string;
  setChats: (chats: ChatType[]) => void;
  chats: ChatType[];
};

const ChatInputBox = ({ fileId, setChats, chats }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const searchAI = useAction(api.myActions.search);
  const [searchAllPdf, setSearchAllPdf] = useState(false);
  const [status, setStatus] = useState('idle');
  const pushMessageToConvex = useMutation(api.chatMessages.createPdfMessages);

  const handleSendMessage = async () => {
    const textarea = textareaRef.current;

    if (!textarea?.value) return;
    setChats([...chats, { role: 'user', content: textarea.value }]);
    pushMessageToConvex({ role: 'user', content: textarea.value, fileId });

    const result = await searchAI({
      query: textarea?.value,
      fileId,
      searchAllPdf,
    });

    const userMessage = { role: 'user', content: textarea.value };
    const chatsWithUser = [...chats, userMessage];

    const UnFormattedAns = JSON.parse(result);
    let AllUnFormattedAns = '';
    UnFormattedAns.forEach((ans: any) => {
      AllUnFormattedAns += ans.pageContent;
    });

    const PROMPT = `
You are given the following extracted text from a PDF resume or document:

${AllUnFormattedAns}

Current date: ${new Date().toISOString().split('T')[0]}.

Answer the user's question: "${textarea?.value}" in detailed HTML format.

Guidelines:
1. Always base your answer strictly on the extracted text above. If the question involves facts, summaries, skills, or descriptions — answer only using what's present in the text.
2. If the question involves **dates, durations, or calculations** (for example: "total work experience", "duration of employment", "time between roles", etc.), you must:
   - Identify all date ranges mentioned (e.g., 07/2023 - 12/2023, 04/2024 - 2025).
   - Treat end dates with only a year (e.g., "2025") as ongoing up to the current date unless explicitly stated otherwise.
   - Compute durations in months and provide a human-friendly format (e.g., "2 years and 1 month").
   - Include the breakdown for each experience in your HTML.
3. If context is too limited to calculate or answer confidently, respond only with: "I don't know".
4. Use clean structured HTML tags: <h3>, <ul>, <li>, <p>, and <div>.
5. Apply Tailwind CSS classes for styling:
   - Every <div> must have class "gap-2".
   - All other tags (<p>, <h3>, <ul>, <li>, etc.) should include class "mb-1".
   - Never use max-w, fixed heights, or width restrictions.
6. Respond **only with the HTML** content. Do not restate the question or add explanations outside HTML.

Now generate the HTML answer following all the above rules.
`;

    const answer = await generateGeminiAnswer(PROMPT);
    pushMessageToConvex({ role: 'ai', content: answer, fileId });
    setChats([...chatsWithUser, { role: 'ai' as any, content: answer }]);
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '112px'; // min-h-28 (28*4=112px)
      textarea.style.height = Math.min(textarea.scrollHeight, 260) + 'px'; // max-h-40 (40*4=160px)
    }
  };

  const handleSend = async () => {
    if (status === 'loading') return;

    setStatus('loading');

    await handleSendMessage();

    setStatus('sent');
    setStatus('idle');
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

      <div className=" absolute  bottom-4 right-32 flex items-center ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Switch
                  checked={searchAllPdf}
                  onCheckedChange={setSearchAllPdf}
                  className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-300"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="max-w-md">
                <p>Enable deep search</p>
                <p className="text-xs text-gray-500">
                  (Search across all pages of the PDF and uses more tokens. You
                  can also include words like "all", "entire", "full",
                  "everything" in your query to enable this automatically)
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
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
