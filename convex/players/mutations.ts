import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    shortName: v.string(),
    country: v.string(),
    countryCode: v.string(),
    hand: v.union(v.literal("Right"), v.literal("Left")),
    age: v.number(),
    height: v.string(),
    color: v.string(),
    initials: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("players", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("players"),
    age: v.optional(v.number()),
    height: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: {
    id: v.id("players"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});