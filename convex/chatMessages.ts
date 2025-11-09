import { paginationOptsValidator } from 'convex/server';
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const getPdfMessages = query({
  args: { paginationOpts: paginationOptsValidator, fileId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('chatMessages')
      .filter((q) => q.eq(q.field('fileId'), args.fileId))
      .order('asc')
      .paginate(args.paginationOpts);
  },
});

export const createPdfMessages = mutation({
  args: {
    content: v.string(),
    fileId: v.string(),
    role: v.union(v.literal('user'), v.literal('ai')),
  },
  handler: async (ctx, args) => {
    const message = await ctx.db.insert('chatMessages', {
      content: args.content,
      role: args.role,
      fileId: args.fileId,
      createdAt: Date.now(),
    });
    return message;
  },
});
