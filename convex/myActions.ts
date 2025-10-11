import { ConvexVectorStore } from '@langchain/community/vectorstores/convex';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { TaskType } from '@google/generative-ai';
import { action } from './_generated/server.js';
import { v } from 'convex/values';

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    // Ensure splitText is an array
    const splitTextArray = Array.isArray(args.splitText)
      ? args.splitText
      : [args.splitText];

    // Create a metadata object for each chunk
    const metadataArray = splitTextArray.map(() => ({ fileId: args.fileId }));

    await ConvexVectorStore.fromTexts(
      splitTextArray,
      metadataArray,
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY ?? '',
        model: 'text-embedding-004', // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: 'Document title',
      }),
      { ctx }
    );
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY ?? '',
        model: 'text-embedding-004',
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: 'Document title',
      }),
      { ctx }
    );

    const resultOne = await (
      await vectorStore.similaritySearch(args.query, 1)
    ).filter(
      (res) => (res.metadata as Record<string, any>).fileId === args.fileId
    );
    console.log(resultOne);

    return JSON.stringify(resultOne);
  },
});
