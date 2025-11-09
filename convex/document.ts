import { query } from './_generated/server';
import { v } from 'convex/values';

export const getAllDocuments = query({
  args: { fileId: v.string() },
  handler: async (ctx, args) => {
    const docs = await ctx.db
      .query('documents')
      .filter((q) => q.eq(q.field('metadata.fileId'), args.fileId))
      .collect();

    // return docs.map((doc) => ({
    //   text: doc.text,
    //   metadata: doc.metadata,
    // }));

    return docs
      .sort((a, b) => a._creationTime - b._creationTime)
      .map((doc) => ({
        pageContent: doc.text,
        metadata: doc.metadata,
      }));
  },
});
