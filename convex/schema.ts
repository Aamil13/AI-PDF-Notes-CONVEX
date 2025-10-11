import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    userName: v.string(),
    email: v.string(),
    profileImageUrl: v.string(),
  }),

  pdfFiles: defineTable({
    storageId: v.string(),
    fileId: v.string(),
    fileName: v.string(),
    fileUrl: v.string(),
    createdBy: v.string(),
  }),

  documents: defineTable({
    embedding: v.array(v.number()),
    text: v.string(),
    metadata: v.any(),
  }).vectorIndex('byEmbedding', {
    vectorField: 'embedding',
    dimensions: 768,
  }),
});
