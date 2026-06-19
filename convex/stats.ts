import { query } from "./_generated/server";
import { v } from "convex/values";

export const getDashboardStatistics = query({
  args: {
    seasonId: v.id("seasons"),
  },

  handler: async (ctx, args) => {
    const [
      players,
      rankings,
      tournaments,
      matches,
      seasons,
    ] = await Promise.all([
      ctx.db.query("players").collect(),
      ctx.db.query("rankings")
        .withIndex("by_season", (q) =>
          q.eq("seasonId", args.seasonId)
        )
        .collect(),
      ctx.db.query("tournaments")
        .withIndex("by_season", (q) =>
          q.eq("seasonId", args.seasonId)
        )
        .collect(),
      ctx.db.query("matches").collect(),
      ctx.db.query("seasons").collect(),
    ]);

    const completedTournaments = tournaments.filter(
      (t) => t.status === "Completed"
    );

    const grandSlams = completedTournaments.filter(
      (t) => t.category === "Grand Slam"
    ).length;

    const masters = completedTournaments.filter(
      (t) => t.category === "Masters 1000"
    ).length;

    const totalMatches = matches.length;

    const playerStats = players.map((player) => {
      const playerMatches = matches.filter(
        (m) =>
          m.player1Id === player._id ||
          m.player2Id === player._id
      );

      const wins = playerMatches.filter(
        (m) => m.winnerId === player._id
      ).length;

      const losses =
        playerMatches.length - wins;

      const titles = tournaments.filter(
        (t) => t.championId === player._id
      ).length;

      const slamTitles = tournaments.filter(
        (t) =>
          t.championId === player._id &&
          t.category === "Grand Slam"
      ).length;

      const winPct =
        playerMatches.length === 0
          ? 0
          : Math.round(
              (wins / playerMatches.length) * 100
            );

      return {
        player,
        wins,
        losses,
        titles,
        slamTitles,
        winPct,
      };
    });

    const titlesBySeason = await Promise.all(
      seasons.map(async (season) => {
        const seasonTournaments =
          await ctx.db
            .query("tournaments")
            .withIndex("by_season", (q) =>
              q.eq("seasonId", season._id)
            )
            .collect();

        const stats = players.map((player) => ({
          playerId: player._id,
          titles: seasonTournaments.filter(
            (t) =>
              t.status === "Completed" &&
              t.championId === player._id
          ).length,
        }));

        return {
          seasonYear: season.year,
          stats,
        };
      })
    );

    return {
      totalMatches,
      grandSlams,
      masters,
      playerStats,
      titlesBySeason,
      rankings,
      tournaments,
      matches,
    };
  },
});