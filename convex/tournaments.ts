import { Doc, Id } from "./_generated/dataModel";
import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all tournaments
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tournaments").collect();
  },
});

// Get by season
export const getBySeason = query({
  args: {
    seasonId: v.id("seasons"),
  },
  handler: async (ctx, args) => {
    const tournaments = await ctx.db
      .query("tournaments")
      .withIndex("by_season", (q) =>
        q.eq("seasonId", args.seasonId)
      )
      .collect();

    const players = await ctx.db.query("players").collect();

    const playerMap = new Map(players.map(p => [p._id, p]));

    return tournaments.map((t) => ({
      ...t,
       champion: t.championId
        ? playerMap.get(t.championId) ?? null
        : null,

      runnerUp: t.runnerUpId
        ? playerMap.get(t.runnerUpId) ?? null
        : null,
    }));
  },
});



export const getById = query({
  args: {
    id: v.id("tournaments"),
  },
  handler: async (ctx, args) => {
    const tournament = await ctx.db.get(args.id);

    if (!tournament) return null;

    const matches = await ctx.db
      .query("matches")
      .withIndex("by_tournament", (q) =>
        q.eq("tournamentId", args.id)
      )
      .collect();

    const players = await ctx.db.query("players").collect();

    const enrichedMatches = matches.map((m) => ({
      ...m,
      player1: players.find((p) => p._id === m.player1Id) ?? null,
      player2: players.find((p) => p._id === m.player2Id) ?? null,
    }));

    return {
      ...tournament,
      matches: enrichedMatches,
    };
  },
});

export const updateTournamentFromFinal =
  internalMutation({
    args: {
      tournamentId: v.id("tournaments"),
    },

    handler: async (ctx, args) => {
      const finalMatch = await ctx.db
        .query("matches")
        .withIndex("by_tournament", (q) =>
          q.eq("tournamentId", args.tournamentId)
        )
        .filter((q) =>
          q.and(
            q.eq(q.field("round"), "F"),
            q.eq(
              q.field("status"),
              "Completed"
            )
          )
        )
        .first();

      if (!finalMatch) {
        return;
      }

      const runnerUpId =
        finalMatch.winnerId ===
        finalMatch.player1Id
          ? finalMatch.player2Id
          : finalMatch.player1Id;

      const finalScore =
        finalMatch.sets
          .map(
            (set) =>
              `${set.p1}-${set.p2}`
          )
          .join(", ");

      await ctx.db.patch(
        args.tournamentId,
        {
          championId:
            finalMatch.winnerId,

          runnerUpId,

          finalScore,

          status: "Completed",
        }
      );
    },
  });

export const create = mutation({
  args: {
    seasonId: v.id("seasons"), 
    name: v.string(),
    shortName: v.string(),
    city: v.string(),
    country: v.string(),
    surface: v.union(
      v.literal("Hard"),
      v.literal("Clay"),
      v.literal("Grass")
    ),
    category: v.union(
      v.literal("Grand Slam"),
      v.literal("Masters 1000")
    ),
    startDate: v.string(),
    endDate: v.string(),
    status: v.union(
      v.literal("Upcoming"),
      v.literal("In Progress"),
      v.literal("Completed")
    ),
    points: v.number(),
  },

  handler: async (ctx, args) => {
    // 1. extract season year
    const year = new Date(args.startDate).getFullYear();

    // 2. find season
    let season = await ctx.db
      .query("seasons")
      .withIndex("by_year", (q) =>
        q.eq("year", year)
      )
      .unique();

    // 3. create if not exists
    if (!season) {
      const seasonId = await ctx.db.insert("seasons", {
        year,
        label: `${year} Season`,
        status: "Upcoming",
      });

      season = await ctx.db.get(seasonId);
    }

    if (!season) {
      throw new Error("Failed to create or fetch season");
    }

    // 4. insert tournament with seasonId
    return await ctx.db.insert("tournaments", {
      ...args,
      seasonId: season._id,
    });
  },
});

export function isTournamentCompleted(
  tournament: Doc<"tournaments">
) {
  return tournament.status === "Completed";
}

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