import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const updatePoints = mutation({
  args: {
    rankingId: v.id("rankings"),
    points: v.number(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.rankingId, {
      points: args.points,
    });
  },
});