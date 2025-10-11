import { NextResponse } from 'next/server';
import { WebPDFLoader } from '@langchain/community/document_loaders/web/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

// const pdfUrl =
//   'https://fleet-meadowlark-749.convex.cloud/api/storage/31a98a94-9e03-46cd-aa68-f23b41edf661';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pdfUrl = searchParams.get('pdfUrl') || '';
  const res = await fetch(pdfUrl);
  const blob = await res.blob();
  const loader = new WebPDFLoader(blob);

  const docs = await loader.load();

  let combinedText = '';
  docs.forEach((doc) => {
    combinedText = combinedText + doc.pageContent;
  });

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });

  const output = await splitter.createDocuments([combinedText]);

  const splitterList = output.map((doc) => doc.pageContent) || [];

  return NextResponse.json({ message: splitterList });
}
