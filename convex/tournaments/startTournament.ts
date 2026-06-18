import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

export const startTournament = internalMutation({
  args: {
    tournamentId: v.id("tournaments"),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.tournamentId, {
      status: "In Progress",
    });
  },
});