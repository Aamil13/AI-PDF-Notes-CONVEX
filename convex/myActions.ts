import { ConvexVectorStore } from '@langchain/community/vectorstores/convex';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { action } from './_generated/server.js';
import { v } from 'convex/values';
import { api } from './_generated/api.js';

// --------------------
// 🔐 Embedding Model Setup
// --------------------

if (!process.env.GOOGLE_API_KEY) {
  throw new Error('Missing GOOGLE_API_KEY environment variable');
}

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY ?? '',
  model: 'text-embedding-004',
});

// --------------------
// 🧩 Utility: Retry logic for embedding calls
// --------------------

async function embedWithRetry(
  embeddings: GoogleGenerativeAIEmbeddings,
  texts: string[],
  maxRetries = 5
): Promise<number[][]> {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await embeddings.embedDocuments(texts);
    } catch (e: any) {
      if (
        e.message?.includes('RESOURCE_EXHAUSTED') ||
        e.message?.includes('429')
      ) {
        const wait = Math.pow(2, retries) * 1000 + Math.random() * 500;
        console.warn(`⚠️ Rate limited — retrying in ${wait.toFixed(0)} ms`);
        await new Promise((res) => setTimeout(res, wait));
        retries++;
      } else {
        throw e;
      }
    }
  }
  throw new Error('Embedding failed after maximum retries.');
}

// --------------------
// 📥 Ingest Action
// --------------------

export const ingest = action({
  args: { splitText: v.any(), fileId: v.string() },
  handler: async (ctx, args): Promise<void> => {
    const texts: string[] = Array.isArray(args.splitText)
      ? args.splitText
      : [args.splitText];

    const metadata = texts.map(() => ({ fileId: args.fileId }));

    const BATCH_SIZE = 10;
    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      const batch = texts.slice(i, i + BATCH_SIZE);
      const metaBatch = metadata.slice(i, i + BATCH_SIZE);

      await embedWithRetry(embeddings, batch);
      await ConvexVectorStore.fromTexts(batch, metaBatch, embeddings, { ctx });
    }

    console.log(
      `✅ Ingested ${texts.length} text chunks for file ${args.fileId}`
    );
  },
});

// --------------------
// 🔍 Search Action
// --------------------

export const search = action({
  args: { query: v.string(), fileId: v.string(), searchAllPdf: v.boolean() },
  handler: async (
    ctx,
    args
  ): Promise<
    Array<{
      pageContent: string;
      metadata: Record<string, any>;
      id?: string;
    }>
  > => {
    const vectorStore = new ConvexVectorStore(embeddings, { ctx });

    const wantsAll =
      args.searchAllPdf ||
      /\b(all|total|full|entire|everything|complete|whole)\b/i.test(args.query);

    let results: any[];

    if (wantsAll) {
      results = await ctx.runQuery(api.document.getAllDocuments, {
        fileId: args.fileId,
      });
    } else {
      const rawResults = await vectorStore.similaritySearch(args.query, 10);
      results = rawResults.filter(
        (r) => (r.metadata as Record<string, any>).fileId === args.fileId
      );
    }

    console.log(
      `🔎 Search for "${args.query}" (fileId=${args.fileId}) returned ${results.length} results`
    );

    // ✅ Convert LangChain Documents to plain objects for Convex
    return results.map((doc) => ({
      pageContent: doc.pageContent || '',
      metadata: { ...doc.metadata },
      id: doc.id || doc.metadata?.id || undefined,
    }));
  },
});
