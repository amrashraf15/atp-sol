import { v } from "convex/values";
import { query } from "../_generated/server";

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