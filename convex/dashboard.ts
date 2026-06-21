import { v } from "convex/values";
import { query } from "./_generated/server";

export const getDashboardData = query({
  args: {
    seasonId: v.id("seasons"),
  },

  handler: async (ctx, args) => {
    // Get rankings for this season
    const rankings = await ctx.db
      .query("rankings")
      .withIndex("by_season_rank", (q) => q.eq("seasonId", args.seasonId))
      .collect();

    // Get tournaments for this season
    const tournaments = await ctx.db
      .query("tournaments")
      .withIndex("by_season", (q) => q.eq("seasonId", args.seasonId))
      .collect();

    // Get matches
    const matches = await ctx.db.query("matches").collect();

    /**
     * Attach player to each ranking row
     */
    const rankingsWithPlayersRaw = await Promise.all(
      rankings.map(async (r) => ({
        ...r,
        player: await ctx.db.get(r.playerId),
      })),
    );

    /**
     * Sort rankings by highest points first
     * Then regenerate rank numbers so:
     * highest points => rank 1
     * second highest => rank 2
     * etc...
     */
    const rankingsWithPlayers = rankingsWithPlayersRaw
      .sort((a, b) => {
        // 1) highest points first
        if (b.points !== a.points) return b.points - a.points;

        // optional tie breakers
        if (b.titles !== a.titles) return b.titles - a.titles;
        if (b.matchesWon !== a.matchesWon) return b.matchesWon - a.matchesWon;

        return 0;
      })
      .map((r, index) => ({
        ...r,
        rank: index + 1,
      }));

    /**
     * Attach champion / runner-up to tournaments
     */
    const tournamentsWithPlayers = await Promise.all(
      tournaments.map(async (t) => ({
        ...t,
        champion: t.championId ? await ctx.db.get(t.championId) : null,
        runnerUp: t.runnerUpId ? await ctx.db.get(t.runnerUpId) : null,
      })),
    );

    /**
     * Attach relations to matches
     */
    const matchesWithRelations = await Promise.all(
      matches.map(async (m) => ({
        ...m,
        player1: await ctx.db.get(m.player1Id),
        player2: await ctx.db.get(m.player2Id),
        tournament: await ctx.db.get(m.tournamentId),
      })),
    );

    /**
     * Win streaks (optional if you want to use them later)
     */
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
      winStreaks,
    };
  },
});