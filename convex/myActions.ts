import { ConvexVectorStore } from '@langchain/community/vectorstores/convex';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { action } from './_generated/server.js';
import { v } from 'convex/values';
import { api } from './_generated/api.js';

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const splitTextArray = Array.isArray(args.splitText)
      ? args.splitText
      : [args.splitText];

    const metadataArray = splitTextArray.map(() => ({ fileId: args.fileId }));

    await ConvexVectorStore.fromTexts(
      splitTextArray,
      metadataArray,
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY ?? '',
        model: 'text-embedding-004', // 768 dimensions
      }),
      { ctx }
    );
  },
});

export const search: ReturnType<typeof action> = action({
  args: {
    query: v.string(),
    fileId: v.string(),
    searchAllPdf: v.boolean(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY ?? '',
        model: 'text-embedding-004',
      }),
      { ctx }
    );

    // const wantsAll = /\ball\b/i.test(args.query);
    const wantsAll =
      /\b(all|total|full|entire|everything|complete|whole)\b/i.test(
        args.query
      ) || args.searchAllPdf;
    let results;

    if (wantsAll) {
      results = await ctx.runQuery(api.document.getAllDocuments, {
        fileId: args.fileId,
      });
    } else {
      results = await vectorStore.similaritySearch(args.query, 10);

      results = results.filter(
        (res) => (res.metadata as Record<string, any>).fileId === args.fileId
      );
    }

    return JSON.stringify(results);
  },
});
