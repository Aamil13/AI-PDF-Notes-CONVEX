import { mutation, query } from './_generated/server';

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
      planType: 'free',
    });

    return res;
  },
});

export const updateUserPlan = mutation({
  args: {
    email: v.string(),
    planType: v.string(),
  },
  handler: async (ctx, args) => {
    const { email, planType } = args;

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('email'), email))
      .first();

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    //  Define plan durations (in days)
    const planDurations: Record<string, number> = {
      free: 0,
      pro: 30,
      team: 90,
      yearly: 365,
    };

    const durationDays = planDurations[planType] ?? 30; // fallback to 30 days
    const planActiveTill = Date.now() + durationDays * 24 * 60 * 60 * 1000;

    await ctx.db.patch(user._id, {
      planType,
      planActiveTill,
    });

    return {
      success: true,
      message: `Plan '${planType}' activated for ${durationDays} days`,
      planActiveTill,
    };
  },
});

export const getUserDataByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const { email } = args;

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('email'), email))
      .first();

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    return user;
  },
});
