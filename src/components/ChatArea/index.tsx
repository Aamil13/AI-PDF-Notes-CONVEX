'use client';
import React, { useEffect } from 'react';
import ChatInputBox from '../ChatInputBox';
import ChatMessageContainer from '../ChatMessageContianer';
import { useMutation, usePaginatedQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

type Props = {
  fileId: string;
  convexFileId: string;
};

export type ChatType = {
  role: 'user' | 'ai';
  content: string;
  id?: string;
};

const ChatArea = ({ fileId, convexFileId }: Props) => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.chatMessages.getPdfMessages,
    { fileId: fileId },
    { initialNumItems: 5 }
  );

  const [chats, setChats] = React.useState<ChatType[]>([]);

  const updatePdfFile = useMutation(api.pdf_storage.updateFileTimestamp);

  useEffect(() => {
    if (results) {
      setChats(
        [...results]
          .sort((a, b) => a._creationTime - b._creationTime)
          .map((msg) => ({
            role: msg.role,
            content: msg.content,
            id: (msg as any)._id,
          }))
      );
    }
  }, [results]);

  useEffect(() => {
    if (convexFileId.length) {
      updatePdfFile({ _id: convexFileId as any });
    }
  }, [convexFileId]);

  return (
    <div className="hide-scrollbar overflow-scroll h-full flex flex-col justify-between ">
      <div className="flex-1 max-h-[90%] p-4 overflow-scroll hide-scrollbar">
        <ChatMessageContainer
          chats={chats}
          canLoadMore={status == 'CanLoadMore'}
          loadMore={loadMore}
        />
      </div>
      <ChatInputBox fileId={fileId} setChats={setChats} chats={chats} />
    </div>
  );
};

export default ChatArea;
