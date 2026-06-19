import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { matchValidator } from "./lib/validation";
import { Doc } from "./_generated/dataModel";

export const getTournamentMatches = query({
  args: {
    tournamentId: v.id("tournaments"),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("matches")
      .withIndex("by_tournament", (q) =>
        q.eq("tournamentId", args.tournamentId)
      )
      .collect();
  },
});

export const getAllMatchesWithDetails = query({
  args: {},

  handler: async (ctx) => {
    const matches = await ctx.db
      .query("matches")
      .collect();

    return await Promise.all(
      matches.map(async (match) => ({
        ...match,

        player1: await ctx.db.get(
          match.player1Id
        ),

        player2: await ctx.db.get(
          match.player2Id
        ),

        tournament: await ctx.db.get(
          match.tournamentId
        ),
      }))
    );
  },
});

export const create = mutation({
  args: matchValidator,

  handler: async (ctx, args) => {
    return await ctx.db.insert("matches", args);
  },
});

export function getWinner(
  match: Doc<"matches">
) {
  return match.winnerId;
}

export function totalSetsWon(
  match: Doc<"matches">,
  player: 1 | 2
) {
  return match.sets.filter((s) =>
    player === 1 ? s.p1 > s.p2 : s.p2 > s.p1
  ).length;
}

export const finishMatch = internalMutation({
  args: {
    matchId: v.id("matches"),
    winnerId: v.id("players"),
    sets: v.array(
      v.object({
        p1: v.number(),
        p2: v.number(),
      })
    ),
    durationMin: v.number(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.matchId, {
      winnerId: args.winnerId,
      sets: args.sets,
      durationMin: args.durationMin,
      status: "Completed",
    });
  },
});