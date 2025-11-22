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

    const userMessage: ChatType = { role: 'user', content: textarea.value };
    const updatedChats: ChatType[] = [...chats, userMessage];

    setChats(updatedChats);
    pushMessageToConvex({ ...userMessage, fileId });

    try {
      // Step 1: Search PDF content
      const result = await searchAI({
        query: textarea.value,
        fileId,
        searchAllPdf,
      });

      let allText = result.map((doc: any) => doc.pageContent).join('\n\n');

      // Step 2: Summarize if too large
      const MAX_PROMPT_LENGTH = 3000;
      if (allText.length > MAX_PROMPT_LENGTH) {
        const summarizePrompt = `
You are given a long text extracted from a PDF resume or document. 
Summarize it concisely but keep **key information only** — such as skills, roles, dates, companies, and achievements.
Avoid generic phrasing. Output plain text (no formatting).

Text:
${allText}
`;

        const summary = await generateGeminiAnswer(summarizePrompt);
        allText = summary || allText.slice(0, MAX_PROMPT_LENGTH);
      }

      // Step 3: Build the main prompt
      const PROMPT = `
You are given the following extracted text from a PDF resume or document:

${allText}

Current date: ${new Date().toISOString().split('T')[0]}.

Answer the user's question: "${textarea.value}" in detailed HTML format.

Guidelines:
- Do not repeat the question in your answer.
- Use structured HTML: <div class="gap-2"> for containers, <h3>, <ul>, <li>, <p> all with class "mb-1".
- Do not include explanations outside HTML; respond **only with HTML content**.
`;

      // Step 4: Generate AI answer
      const answer = await generateGeminiAnswer(PROMPT);

      // Step 5: Update chat state and store
      pushMessageToConvex({ role: 'ai', content: answer, fileId });
      setChats([...updatedChats, { role: 'ai' as const, content: answer }]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage = '⚠️ An error occurred while generating the answer.';
      pushMessageToConvex({ role: 'ai', content: errorMessage, fileId });
      setChats([
        ...updatedChats,
        { role: 'ai' as const, content: errorMessage },
      ]);
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '112px'; // min-h-28 (28*4=112px)
      textarea.style.height = Math.min(textarea.scrollHeight, 260) + 'px'; // max-h-40 (40*4=160px)
    }
  };

  //   const handleSend = async () => {
  //     if (status === 'loading') return;

  //     setStatus('loading');

  //     await handleSendMessage();

  //     setStatus('sent');
  //     setStatus('idle');
  //     textareaRef.current = null;
  //   };

  const handleSend = async () => {
    if (status === 'loading') return;

    setStatus('loading');

    await handleSendMessage();

    setStatus('sent');
    setTimeout(() => {
      setStatus('idle');
      const ta = textareaRef.current;
      if (ta) {
        ta.value = '';
        ta.style.height = '112px';
      }
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Shift + Enter → newline (default behavior)
        return;
      }

      // Enter alone → send message
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full flex items-center justify-center relative">
      <textarea
        ref={textareaRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
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
