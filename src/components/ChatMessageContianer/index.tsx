import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ChatMessage from '../Atoms/ChatMessage';
import { ChatType } from '../ChatArea';

type Props = {
  chats: ChatType[];
  canLoadMore: boolean;
  loadMore: (value: number) => void;
};

const ChatMessageContainer = ({ chats, canLoadMore, loadMore }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isLoadingMoreRef = useRef(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const handleLoadMore = async () => {
    if (!containerRef.current || isLoadingMoreRef.current) return;

    isLoadingMoreRef.current = true;
    const container = containerRef.current;

    const prevScrollHeight = container.scrollHeight;
    const prevScrollTop = container.scrollTop;

    await loadMore(5);

    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => resolve(), 0);
        });
      });
    });

    const newScrollHeight = container.scrollHeight;
    const heightDiff = newScrollHeight - prevScrollHeight;

    container.scrollTop = prevScrollTop + heightDiff;

    isLoadingMoreRef.current = false;
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { scrollTop, scrollHeight, clientHeight } = container;

    // Check if user is near the bottom (within 100px)
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

    // Check if user is near the top (within 100px)
    const isNearTop = scrollTop < 100;

    setShowScrollToBottom(!isNearBottom);
    setShowLoadMore(isNearTop && canLoadMore);
  }, [canLoadMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Auto-scroll to bottom when new messages arrive (if already at bottom)
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

    if (isNearBottom) {
      scrollToBottom();
    }
  }, [chats.length]);

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto h-full hide-scrollbar relative"
    >
      {/* Load More Button with Animation */}
      <AnimatePresence>
        {canLoadMore && showLoadMore && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="sticky top-0 z-10 flex justify-center py-2"
          >
            <motion.button
              onClick={handleLoadMore}
              disabled={isLoadingMoreRef.current}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoadingMoreRef.current ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="inline-block"
                  >
                    ⟳
                  </motion.span>
                  Loading...
                </span>
              ) : (
                'Load more'
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto flex flex-col gap-4">
        {chats.map((msg, index) => (
          <ChatMessage key={index} sender={msg.role} message={msg.content} />
        ))}
      </div>

      {/* Scroll to Bottom Button with Animation */}
      {/* <AnimatePresence>
        {showScrollToBottom && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={scrollToBottom}
            className="fixed bottom-24 right-8 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 z-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to bottom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default ChatMessageContainer;
