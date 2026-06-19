import { v } from "convex/values";
import { query } from "./_generated/server";

export const getDashboardData = query({
  args: {
    seasonId: v.id("seasons"),
  },

  handler: async (ctx, args) => {
    const rankings = await ctx.db
      .query("rankings")
      .withIndex("by_season_rank", (q) =>
        q.eq("seasonId", args.seasonId)
      )
      .collect();

    const tournaments = await ctx.db
      .query("tournaments")
      .withIndex("by_season", (q) =>
        q.eq("seasonId", args.seasonId)
      )
      .collect();

    const matches = await ctx.db
      .query("matches")
      .collect();

    const rankingsWithPlayers = await Promise.all(
      rankings.map(async (r) => ({
        ...r,
        player: await ctx.db.get(r.playerId),
      }))
    );

    const tournamentsWithPlayers =
      await Promise.all(
        tournaments.map(async (t) => ({
          ...t,

          champion: t.championId
            ? await ctx.db.get(t.championId)
            : null,

          runnerUp: t.runnerUpId
            ? await ctx.db.get(t.runnerUpId)
            : null,
        }))
      );

    const matchesWithRelations =
      await Promise.all(
        matches.map(async (m) => ({
          ...m,

          player1: await ctx.db.get(
            m.player1Id
          ),

          player2: await ctx.db.get(
            m.player2Id
          ),

          tournament: await ctx.db.get(
            m.tournamentId
          ),
        }))
      );

    return {
      rankings: rankingsWithPlayers,
      tournaments: tournamentsWithPlayers,
      matches: matchesWithRelations,
    };
  },
});