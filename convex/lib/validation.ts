import { v } from "convex/values";

export const SetScore = v.object({
  p1: v.number(),
  p2: v.number(),

  tiebreak: v.optional(
    v.object({
      p1: v.number(),
      p2: v.number(),
    })
  ),
});

export const BreakPointStat = v.object({
  won: v.number(),
  total: v.number(),
});

export const MatchStats = v.object({
  aces: v.array(v.number()),
  doubleFaults: v.array(v.number()),
  firstServePct: v.array(v.number()),
  breakPointsWon: v.array(BreakPointStat),
  winnersCount: v.array(v.number()),
  unforcedErrors: v.array(v.number()),
});

export const matchValidator = {
  tournamentId: v.id("tournaments"),

  round: v.union(
    v.literal("R32"),
    v.literal("R16"),
    v.literal("QF"),
    v.literal("SF"),
    v.literal("F")
  ),

  date: v.string(),

  player1Id: v.id("players"),
  player2Id: v.id("players"),

  winnerId: v.id("players"),

  sets: v.array(SetScore),

  durationMin: v.number(),

  stats: MatchStats,

  status: v.union(
    v.literal("Scheduled"),
    v.literal("Live"),
    v.literal("Completed")
  ),
};