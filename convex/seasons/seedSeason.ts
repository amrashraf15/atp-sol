import {
  internalMutation,
} from "../_generated/server";
import { v } from "convex/values";

export const seedSeason =
  internalMutation({
    args: {
      seasonId:
        v.id("seasons"),
    },

    handler: async (
      ctx,
      args
    ) => {
      const players =
        await ctx.db
          .query("players")
          .collect();

      let rank = 1;

      for (const player of players) {
        await ctx.db.insert(
          "rankings",
          {
            seasonId:
              args.seasonId,

            playerId:
              player._id,

            rank,

            points: 0,

            titles: 0,

            matchesWon: 0,

            matchesLost: 0,
          }
        );

        rank++;
      }
    },
  });