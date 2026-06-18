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
    return await ctx.db
      .query("tournaments")
      .withIndex("by_season", (q) =>
        q.eq("seasonId", args.seasonId)
      )
      .collect();
  },
});

// ⭐ NEW: Get single tournament by id
export const getById = query({
  args: {
    id: v.id("tournaments"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
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
    return await ctx.db.insert("tournaments", args);
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