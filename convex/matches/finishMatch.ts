import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

export const finishMatch = internalMutation({
  args: {
    matchId: v.id("matches"),
    winnerId: v.id("players"),
    sets: v.array(
      v.object({
        p1: v.number(),
        p2: v.number(),
      })
    ),
    durationMin: v.number(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.matchId, {
      winnerId: args.winnerId,
      sets: args.sets,
      durationMin: args.durationMin,
      status: "Completed",
    });
  },
});