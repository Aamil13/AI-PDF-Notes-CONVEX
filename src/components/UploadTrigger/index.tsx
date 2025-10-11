import React, { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { FiUpload } from 'react-icons/fi';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Spinner } from '../Atoms/Spinner';
import { useMutation, useAction } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
type Props = {
  isNavbarCollapsed: boolean;
};

const UploadTrigger = ({ isNavbarCollapsed }: Props) => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { user } = useUser();
  const generateUploadUrl = useMutation(api.pdf_storage.generateUploadUrl);
  const insertFileEntry = useMutation(api.pdf_storage.addFile);
  const getFileUrl = useMutation(api.pdf_storage.getFileUrl);
  const embedDocument = useAction(api.myActions.ingest);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name.replace(/\.pdf$/i, ''));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl();

      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': file!.type },
        body: file,
      });

      const { storageId } = await result.json();
      const fileUrl = await getFileUrl({ storageId });
      const fileId = uuid4();
      await insertFileEntry({
        storageId,
        fileId,
        fileName: fileName + '.pdf',
        createdBy: user?.primaryEmailAddress?.emailAddress || 'unknown',
        fileUrl: fileUrl || '',
      });

      const getResult = await axios.get('/api/pdf-loader?pdfUrl=' + fileUrl);
      await embedDocument({
        splitText: getResult.data.message,
        fileId: fileId,
      });
      setFile(null);
      setFileName('');
      setLoading(false);
      setIsUploadModalOpen(false);
    } catch (error) {
      setLoading(false);
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
      <form className="w-full" onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsUploadModalOpen(true)}
            style={{ borderRadius: 10 }}
            className={`bg-[#24AFFC] mx-auto text-white hover:bg-[#24AFFC] active:bg-[#000000] hover:scale-105 transition-all duration-700 text-lg font-poppins flex items-center gap-2 ${isNavbarCollapsed ? 'w-2/3 ' : ' w-11/12 h-12'}`}
          >
            <FiUpload size={32} /> {!isNavbarCollapsed && 'Upload PDF'}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle>Upload PDF</DialogTitle>
            <DialogDescription>
              Select a PDF file and give it a name.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="pdf-file">PDF File</Label>
              <Input
                id="pdf-file"
                name="pdf-file"
                type="file"
                accept="application/pdf"
                className="rounded-md border px-2 py-1"
                onChange={handleFileChange}
                ref={fileInputRef}
                required
              />
              {file && (
                <span className="text-sm text-gray-500">{file.name}</span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="pdf-name">Name</Label>
              <Input
                id="pdf-name"
                name="pdf-name"
                value={fileName}
                onChange={handleNameChange}
                className="rounded-md border px-2 py-1"
                placeholder="Enter PDF name"
                required
                disabled={!file}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={(e) => handleSubmit(e)}
              disabled={!file || !fileName}
            >
              {loading ? <Spinner /> : 'Upload'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default UploadTrigger;
