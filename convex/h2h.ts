import { query } from "./_generated/server";

export const getHeadToHead = query({
  args: {},

  handler: async (ctx) => {
    const matches = await ctx.db
      .query("matches")
      .collect();

    const tournaments = await ctx.db
      .query("tournaments")
      .collect();

    const bySurface = {
      Hard: { p1: 0, p2: 0 },
      Clay: { p1: 0, p2: 0 },
      Grass: { p1: 0, p2: 0 },
    };

    for (const match of matches) {
      const tournament = tournaments.find(
        (t) => t._id === match.tournamentId
      );

      if (!tournament) continue;

      const surface = tournament.surface;

      if (match.winnerId === match.player1Id) {
        bySurface[surface].p1++;
      } else {
        bySurface[surface].p2++;
      }
    }

    return {
      bySurface,
    };
  },
});