import { query } from "../_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tournaments").collect();
  },
});

export const getBySeason = query({
  args: {
    seasonId: v.id("seasons"),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("tournaments")
      .withIndex("by_season", (q) =>
        q.eq("seasonId", args.seasonId)
      )
      .collect();
  },
});