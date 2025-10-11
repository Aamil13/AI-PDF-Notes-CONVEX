'use client';

import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

export default function PDFViewer({ fileUrl }: { fileUrl: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url
    ).toString();

    setIsClient(true);
  }, []);

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  if (!isClient) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-neutral-600">
        <div className="animate-pulse text-gray-500">Loading PDF viewer...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-y-scroll hide-scrollbar bg-gray-100 dark:bg-neutral-700 flex justify-center"
    >
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_, index) => (
          <div key={`page_${index + 1}`} className="relative mb-4 bg-red-400">
            <Page
              width={containerWidth || undefined}
              pageNumber={index + 1}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
