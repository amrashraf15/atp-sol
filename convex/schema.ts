import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// ====================
// Validators
// ====================

const SetScore = v.object({
  p1: v.number(),
  p2: v.number(),

  tiebreak: v.optional(
    v.object({
      p1: v.number(),
      p2: v.number(),
    })
  ),
});

const BreakPointStat = v.object({
  won: v.number(),
  total: v.number(),
});

const MatchStats = v.object({
  aces: v.array(v.number()),
  doubleFaults: v.array(v.number()),
  firstServePct: v.array(v.number()),

  breakPointsWon: v.array(BreakPointStat),

  winnersCount: v.array(v.number()),
  unforcedErrors: v.array(v.number()),
});

// ====================
// Schema
// ====================

export default defineSchema({
  // ====================
  // Seasons
  // ====================

  seasons: defineTable({
    year: v.number(),

    label: v.string(),

    status: v.union(
      v.literal("Upcoming"),
      v.literal("Active"),
      v.literal("Completed")
    ),
  }).index("by_year", ["year"]),

  // ====================
  // Players
  // ====================

  players: defineTable({
    name: v.string(),

    shortName: v.string(),

    country: v.string(),

    countryCode: v.string(),

    hand: v.union(
      v.literal("Right"),
      v.literal("Left")
    ),

    age: v.number(),

    height: v.string(),

    color: v.string(),

    initials: v.string(),
  })
    .index("by_name", ["name"])
    .index("by_country", ["countryCode"]),

  // ====================
  // Rankings
  // ====================

  rankings: defineTable({
    seasonId: v.id("seasons"),

    playerId: v.id("players"),

    rank: v.number(),

    points: v.number(),

    titles: v.number(),

    matchesWon: v.number(),

    matchesLost: v.number(),
  })
    .index("by_season", ["seasonId"])
    .index("by_player", ["playerId"])
    .index("by_season_rank", ["seasonId", "rank"])
    .index("by_season_player", ["seasonId", "playerId"]),

  // ====================
  // Tournaments
  // ====================

  tournaments: defineTable({
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

    startDate: v.string(), // ISO date

    endDate: v.string(), // ISO date

    status: v.union(
      v.literal("Upcoming"),
      v.literal("In Progress"),
      v.literal("Completed")
    ),

    points: v.number(),

    championId: v.optional(v.id("players")),

    runnerUpId: v.optional(v.id("players")),

    finalScore: v.optional(v.string()),
  })
    .index("by_season", ["seasonId"])
    .index("by_status", ["status"])
    .index("by_surface", ["surface"])
    .index("by_category", ["category"]),

  // ====================
  // Matches
  // ====================

  matches: defineTable({
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
  })
    .index("by_tournament", ["tournamentId"])
    .index("by_player1", ["player1Id"])
    .index("by_player2", ["player2Id"])
    .index("by_winner", ["winnerId"])
    .index("by_status", ["status"]),
});