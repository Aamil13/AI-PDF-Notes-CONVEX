import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    userName: v.string(),
    email: v.string(),
    profileImageUrl: v.string(),
    planType: v.optional(v.string()),
    planActiveTill: v.optional(v.number()),
  }),

  pdfFiles: defineTable({
    storageId: v.string(),
    fileId: v.string(),
    fileName: v.string(),
    fileUrl: v.string(),
    createdBy: v.string(),
    fileSize: v.number(),
    updatedAt: v.string(),
  }).index('by_createdBy_updatedAt', ['createdBy', 'updatedAt']),

  documents: defineTable({
    embedding: v.array(v.number()),
    text: v.string(),
    metadata: v.any(),
  }).vectorIndex('byEmbedding', {
    vectorField: 'embedding',
    dimensions: 768,
  }),

  chatMessages: defineTable({
    fileId: v.string(),
    role: v.union(v.literal('user'), v.literal('ai')),
    content: v.string(),
    createdAt: v.number(),
  }),
});
