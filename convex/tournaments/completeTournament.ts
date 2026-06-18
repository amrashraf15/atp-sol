import { internalMutation } from "../_generated/server";
import { Id } from "../_generated/dataModel";

export const completeTournament = internalMutation({
  args: {},

  handler: async (ctx) => {
    const matches = await ctx.db
      .query("matches")
      .filter((q) =>
        q.eq(q.field("status"), "Completed")
      )
      .collect();

    for (const match of matches) {
      const tournament = await ctx.db.get(
        match.tournamentId
      );

      if (!tournament) continue;

      const runnerUpId: Id<"players"> =
        match.winnerId === match.player1Id
          ? match.player2Id
          : match.player1Id;

      await ctx.db.patch(tournament._id, {
        championId: match.winnerId,
        runnerUpId,
        status: "Completed",
        finalScore: match.sets
          .map((s) => `${s.p1}-${s.p2}`)
          .join(" "),
      });
    }
  },
});