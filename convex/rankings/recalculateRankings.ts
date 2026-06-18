import { internalMutation } from "../_generated/server";
import { Id } from "../_generated/dataModel";

export const recalculateRankings = internalMutation({
  args: {},

  handler: async (ctx) => {
    // 1. clear old rankings
    const old = await ctx.db.query("rankings").collect();

    for (const r of old) {
      await ctx.db.delete(r._id);
    }

    // 2. get completed tournaments
    const tournaments = await ctx.db
      .query("tournaments")
      .filter((q) =>
        q.eq(q.field("status"), "Completed")
      )
      .collect();

    if (tournaments.length === 0) return;

    // 3. aggregate points
    const pointsMap = new Map<Id<"players">, number>();

    for (const t of tournaments) {
      if (!t.championId) continue;

      pointsMap.set(
        t.championId,
        (pointsMap.get(t.championId) ?? 0) + t.points
      );
    }

    // 4. sort
    const sorted = [...pointsMap.entries()].sort(
      (a, b) => b[1] - a[1]
    );

    // 5. insert rankings
    let rank = 1;

    for (const [playerId, points] of sorted) {
      await ctx.db.insert("rankings", {
        seasonId: tournaments[0].seasonId,
        playerId,
        rank,
        points,
        titles: 0,
        matchesWon: 0,
        matchesLost: 0,
      });

      rank++;
    }
  },
});