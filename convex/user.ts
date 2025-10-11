import { mutation } from './_generated/server';

import { v } from 'convex/values';

export const createUser = mutation({
  args: {
    userName: v.string(),
    email: v.string(),
    profileImageUrl: v.string(),
  },

  handler: async (ctx, args) => {
    const { userName, email, profileImageUrl } = args;

    // Check if the user already exists
    const existingUser = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('email'), email))
      .first();

    if (existingUser) {
      return 'User already exists';
    }

    // Create a new user
    const res = await ctx.db.insert('users', {
      userName,
      email,
      profileImageUrl,
    });

    return res;
  },
});
