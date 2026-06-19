import { query } from "./_generated/server";
import { v } from "convex/values";

export const getRankingsBySeason = query({
  args: {
    year: v.number(),
  },

  handler: async (ctx, args) => {
    // Get season
    const season = await ctx.db
      .query("seasons")
      .withIndex("by_year", (q) => q.eq("year", args.year))
      .first();

    if (!season) {
      return [];
    }

    const rankings = await ctx.db
      .query("rankings")
      .withIndex("by_season_rank", (q) => q.eq("seasonId", season._id))
      .collect();

    const result = await Promise.all(
      rankings.map(async (ranking) => {
        const player = await ctx.db.get(ranking.playerId);

        if (!player) {
          return null;
        }

        return {
          ...ranking,
          player,
        };
      }),
    );

    return result.filter((r): r is NonNullable<typeof r> => r !== null);
  },
});

export const getRankingProgression = query({
  args: {
    year: v.number(),
  },

  handler: async (ctx, args) => {
    const season = await ctx.db
      .query("seasons")
      .withIndex("by_year", (q) => q.eq("year", args.year))
      .first();

    if (!season) {
      return [];
    }

    const tournaments = await ctx.db
      .query("tournaments")
      .withIndex("by_season", (q) => q.eq("seasonId", season._id))
      .filter((q) => q.eq(q.field("status"), "Completed"))
      .collect();

    return tournaments
      .sort((a, b) => a.endDate.localeCompare(b.endDate))
      .map((t) => ({
        label: t.shortName,

        championId: t.championId,

        points: t.points,
      }));
  },
});
