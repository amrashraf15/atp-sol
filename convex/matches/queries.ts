import { query } from "../_generated/server";
import { v } from "convex/values";

export const getTournamentMatches = query({
  args: {
    tournamentId: v.id("tournaments"),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("matches")
      .withIndex("by_tournament", (q) =>
        q.eq("tournamentId", args.tournamentId)
      )
      .collect();
  },
});