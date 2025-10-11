'use client';
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import React from 'react';
import { api } from '../../../../../convex/_generated/api';
// import PDFViewer from '@/components/PdfViewer';

import dynamic from 'next/dynamic';
import ChatArea from '@/components/ChatArea';
import useDeviceType from '@/Hooks/useDeviceType';
import { FileText } from 'lucide-react';
import ChatPdfDrawer from '@/components/ChatPdfDrawer';

const PDFViewer = dynamic(() => import('@/components/PdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-neutral-600">
      <div className="animate-pulse text-gray-500">Loading PDF viewer...</div>
    </div>
  ),
});

type Props = {};

const Chat = (props: Props) => {
  const params = useParams();
  const fileId: string = (params.id as string) || '';
  const fileRecord = useQuery(api.pdf_storage.getFile, { fileId });
  const { isDesktop } = useDeviceType();
  return (
    <div className="relative overflow-auto bg-white dark:bg-neutral-600 w-full h-full rounded-3xl flex flex-col  gap-4">
      {/* <h1 className="text-lg font-bold">Chat</h1> */}
      <ChatPdfDrawer url={fileRecord?.fileUrl || ''} />
      <div className="h-full flex">
        <div className={`${isDesktop ? 'w-1/2' : 'w-full'}  h-full  `}>
          <ChatArea fileId={fileId} />
        </div>
        {fileRecord?.fileUrl.length && isDesktop && (
          <div className="h-full w-1/2 ">
            <PDFViewer fileUrl={fileRecord?.fileUrl || ''} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
