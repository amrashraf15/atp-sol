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
    const matches = await ctx.db.query("matches").collect();

    const players = await ctx.db.query("players").collect();
    const tournaments = await ctx.db.query("tournaments").collect();

    return matches.map((m) => ({
      ...m,

      player1: players.find((p) => p._id === m.player1Id) ?? null,
      player2: players.find((p) => p._id === m.player2Id) ?? null,

      tournament:
        tournaments.find((t) => t._id === m.tournamentId) ?? null,
    }));
  },
});

export const getTournamentMatchesWithDetails = query({
  args: {
    tournamentId: v.id("tournaments"),
  },

  handler: async (ctx, args) => {
    const matches = await ctx.db
      .query("matches")
      .withIndex("by_tournament", (q) =>
        q.eq("tournamentId", args.tournamentId)
      )
      .collect();

    return await Promise.all(
      matches.map(async (match) => ({
        ...match,

        player1: await ctx.db.get(match.player1Id),
        player2: await ctx.db.get(match.player2Id),
        tournament: await ctx.db.get(match.tournamentId),
      }))
    );
  },
});

export const create = mutation({
  args: matchValidator,

  handler: async (ctx, args) => {
    const status = args.status ?? "Completed";

    const matchId = await ctx.db.insert("matches", {
      ...args,
      status,
    });

    const isFinalCompleted =
      args.round === "F" && status === "Completed";

    if (!isFinalCompleted) return matchId;

    const tournament = await ctx.db.get(args.tournamentId);

    if (!tournament) {
      throw new Error("Tournament not found");
    }

    if (!args.winnerId) {
      throw new Error("Winner is required for completed final match");
    }

    if (
      args.winnerId !== args.player1Id &&
      args.winnerId !== args.player2Id
    ) {
      throw new Error("Winner must be either player1 or player2");
    }

    const runnerUpId =
      args.winnerId === args.player1Id
        ? args.player2Id
        : args.player1Id;

    const finalScore = args.sets
      .map((set) => `${set.p1}-${set.p2}`)
      .join(", ");

    await ctx.db.patch(args.tournamentId, {
      championId: args.winnerId,
      runnerUpId,
      finalScore,
      status: "Completed",
    });

    const seasonYear = new Date(args.date).getFullYear();

    const season = await ctx.db
      .query("seasons")
      .withIndex("by_year", (q) => q.eq("year", seasonYear))
      .unique();

    if (!season) {
      throw new Error(`Season ${seasonYear} not found`);
    }

    const ranking = await ctx.db
      .query("rankings")
      .withIndex("by_season_player", (q) =>
        q.eq("seasonId", season._id).eq("playerId", args.winnerId)
      )
      .unique();

    if (ranking) {
      await ctx.db.patch(ranking._id, {
        points: ranking.points + tournament.points,
        titles: ranking.titles + 1,
      });
    }

    return matchId;
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
    const match = await ctx.db.get(args.matchId);

    if (!match) {
      throw new Error("Match not found");
    }

    await ctx.db.patch(args.matchId, {
      winnerId: args.winnerId,
      sets: args.sets,
      durationMin: args.durationMin,
      status: "Completed",
    });

    if (match.round !== "F") return;

    const tournament = await ctx.db.get(match.tournamentId);

    if (!tournament) {
      throw new Error("Tournament not found");
    }

    const runnerUpId =
      args.winnerId === match.player1Id
        ? match.player2Id
        : match.player1Id;

    const finalScore = args.sets
      .map((set) => `${set.p1}-${set.p2}`)
      .join(", ");

    await ctx.db.patch(match.tournamentId, {
      championId: args.winnerId,
      runnerUpId,
      finalScore,
      status: "Completed",
    });
  },
});