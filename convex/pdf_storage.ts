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
    fileSize: v.number(),
    updatedAt: v.string(),
  },

  handler: async (
    ctx,
    { storageId, fileId, fileName, createdBy, fileUrl, fileSize, updatedAt }
  ) => {
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('email'), createdBy))
      .first();

    const allFiles = await ctx.db
      .query('pdfFiles')
      .filter((q) => q.eq(q.field('createdBy'), createdBy))
      .collect();

    if (user && user.planType === 'free' && allFiles.length >= 5) {
      throw new Error(
        `Free plan users can only upload up to 5 files. Please upgrade your plan to upload more files.`
      );
    }
    const result = await ctx.db.insert('pdfFiles', {
      storageId,
      fileId,
      fileName,
      createdBy,
      fileUrl,
      fileSize,
      updatedAt,
    });
    // return result;
    return 'Inserted Successfully';
  },
});

export const updateFileTimestamp = mutation({
  args: { _id: v.id('pdfFiles') },
  handler: async (ctx, { _id }) => {
    console.log('_id', _id);

    await ctx.db.patch(_id, {
      updatedAt: new Date().toISOString(),
    });
    return 'File updated successfully';
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

export const getUserRecentFiles = query({
  args: { createdBy: v.string() },
  handler: async (ctx, args) => {
    const files = await ctx.db
      .query('pdfFiles')
      .withIndex('by_createdBy_updatedAt', (q) =>
        q.eq('createdBy', args.createdBy)
      )
      .order('desc')
      .take(10);

    return files;
  },
});

export const getUserAllFiles = query({
  args: {
    createdBy: v.string(),
    pageIndex: v.optional(v.number()),
    pageSize: v.optional(v.number()),
    sortBy: v.optional(
      v.union(v.literal('fileName'), v.literal('_creationTime'))
    ),
    sortOrder: v.optional(v.union(v.literal('asc'), v.literal('desc'))),
  },
  handler: async (ctx, args) => {
    // Default pagination values
    const pageIndex = args.pageIndex ?? 0;
    const pageSize = args.pageSize ?? 9;
    const sortBy = args.sortBy ?? '_creationTime';
    const sortOrder = args.sortOrder ?? 'desc';

    // Get all user's files
    const allFiles = await ctx.db
      .query('pdfFiles')
      .filter((q) => q.eq(q.field('createdBy'), args.createdBy))
      .collect();

    const totalCount = allFiles.length;
    const totalPages = Math.ceil(totalCount / pageSize);

    // Validate pageIndex
    const validPageIndex = Math.max(0, Math.min(pageIndex, totalPages - 1));

    // Sort files based on sortBy and sortOrder
    const sortedFiles = allFiles.sort((a, b) => {
      let aValue = a[sortBy as keyof typeof a];
      let bValue = b[sortBy as keyof typeof b];

      // Handle numeric values (like _creationTime)
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    // Paginate results
    const startIndex = validPageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedFiles = sortedFiles.slice(startIndex, endIndex);

    return {
      data: paginatedFiles,
      pageIndex: validPageIndex,
      pageSize,
      totalCount,
      totalPages,
      hasNextPage: validPageIndex < totalPages - 1,
      hasPreviousPage: validPageIndex > 0,
    };
  },
});

export const getUserFileCount = query({
  args: {
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const allFiles = await ctx.db
      .query('pdfFiles')
      .filter((q) => q.eq(q.field('createdBy'), args.createdBy))
      .collect();

    return { totalCount: allFiles.length };
  },
});
