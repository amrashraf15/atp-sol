import { query } from "../_generated/server";
import { v } from "convex/values";

export const getSeasonRanking = query({
  args: {
    seasonId: v.id("seasons"),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("rankings")
      .withIndex("by_season_rank", (q) =>
        q.eq("seasonId", args.seasonId)
      )
      .collect();
  },
});