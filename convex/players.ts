import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("players")
      .withIndex("by_name")
      .collect();
  },
});

export const getById = query({
  args: {
    playerId: v.id("players"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.playerId);
  },
});

export const getByCountry = query({
  args: {
    countryCode: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("players")
      .withIndex("by_country", (q) =>
        q.eq("countryCode", args.countryCode)
      )
      .collect();
  },
});
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

export function playerDisplayName(
  player: Doc<"players">
) {
  return `${player.name} (${player.countryCode})`;
}