import { v } from "convex/values";
import { query } from "./_generated/server";

export const getDashboardData = query({
  args: {
    seasonId: v.id("seasons"),
  },

  handler: async (ctx, args) => {
    const rankings = await ctx.db
      .query("rankings")
      .withIndex("by_season_rank", (q) => q.eq("seasonId", args.seasonId))
      .collect();

    const tournaments = await ctx.db
      .query("tournaments")
      .withIndex("by_season", (q) => q.eq("seasonId", args.seasonId))
      .collect();

    const matches = await ctx.db.query("matches").collect();

    const rankingsWithPlayers = await Promise.all(
      rankings.map(async (r) => ({
        ...r,
        player: await ctx.db.get(r.playerId),
      })),
    );

    const tournamentsWithPlayers = await Promise.all(
      tournaments.map(async (t) => ({
        ...t,

        champion: t.championId ? await ctx.db.get(t.championId) : null,

        runnerUp: t.runnerUpId ? await ctx.db.get(t.runnerUpId) : null,
      })),
    );

    const matchesWithRelations = await Promise.all(
      matches.map(async (m) => ({
        ...m,

        player1: await ctx.db.get(m.player1Id),

        player2: await ctx.db.get(m.player2Id),

        tournament: await ctx.db.get(m.tournamentId),
      })),
    );

    const winStreaks = rankingsWithPlayers.map((r) => {
      const playerMatches = matchesWithRelations
        .filter(
          (m) =>
            m.status === "Completed" &&
            (m.player1Id === r.playerId || m.player2Id === r.playerId),
        )
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

      let streak = 0;

      for (const match of playerMatches) {
        if (match.winnerId === r.playerId) {
          streak++;
        } else {
          break;
        }
      }

      return {
        playerId: r.playerId,
        streak,
      };
    });

    return {
      rankings: rankingsWithPlayers,
      tournaments: tournamentsWithPlayers,
      matches: matchesWithRelations,
    };
  },
});
