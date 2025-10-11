import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const addFile = mutation({
  args: {
    storageId: v.string(),
    fileId: v.string(),
    fileName: v.string(),
    createdBy: v.string(),
    fileUrl: v.string(),
  },

  handler: async (ctx, { storageId, fileId, fileName, createdBy, fileUrl }) => {
    const result = await ctx.db.insert('pdfFiles', {
      storageId,
      fileId,
      fileName,
      createdBy,
      fileUrl,
    });
    // return result;
    return 'Inserted Successfully';
  },
});

export const getFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, { storageId }) => {
    const url = await ctx.storage.getUrl(storageId);
    return url;
  },
});

export const getFile = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const res = await ctx.db
      .query('pdfFiles')
      .filter((q) => q.eq(q.field('fileId'), args.fileId))
      .first();
    return res;
  },
});
