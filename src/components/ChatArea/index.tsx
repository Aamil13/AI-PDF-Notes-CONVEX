import React from 'react';
import ChatInputBox from '../ChatInputBox';
import ChatMessageContainer from '../ChatMessageContianer';

type Props = {
  fileId: string;
};

const ChatArea = ({ fileId }: Props) => {
  return (
    <div className="hide-scrollbar overflow-scroll h-full flex flex-col justify-between ">
      <div className="flex-1 max-h-[90%] p-4 overflow-scroll hide-scrollbar">
        <ChatMessageContainer />
      </div>
      <ChatInputBox fileId={fileId} />
    </div>
  );
};

export default ChatArea;
