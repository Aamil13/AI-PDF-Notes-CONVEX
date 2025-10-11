'use client';
import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { FileText } from 'lucide-react';
import PDFViewer from '../PdfViewer';
import useDeviceType from '@/Hooks/useDeviceType';

type Props = {
  url: string;
};

const ChatPdfDrawer = ({ url }: Props) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className={` lg:hidden fixed top-2 md:top-12  right-4 z-50`}>
          <div className="relative ">
            <div className={`absolute  top-4 right-4`}>
              {/* Sonar Ring */}
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-40 animate-sonar" />

              {/* Button */}
              <div className="relative w-8 h-8 bg-gradient-to-r from-[#24AFFC] to-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </DrawerTrigger>

      {/* Drawer content — override the default full-screen behavior */}
      <DrawerContent className="mx-auto w-full max-w-3xl h-[80vh] rounded-t-2xl p-4">
        <DrawerHeader>
          <DrawerTitle>Document Preview</DrawerTitle>
          <DrawerDescription>View your uploaded PDF file.</DrawerDescription>
        </DrawerHeader>

        <div className="h-[60vh] overflow-hidden">
          <PDFViewer fileUrl={url || ''} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatPdfDrawer;
