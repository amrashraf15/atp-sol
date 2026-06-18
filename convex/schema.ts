import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  players: defineTable({
    name: v.string(),
    shortName: v.string(),
    country: v.string(),
    countryCode: v.string(),
    hand: v.string(),
    age: v.number(),
    height: v.string(),
    color: v.string(),
    initials: v.string(),
  }),

  tournaments: defineTable({
    name: v.string(),
    shortName: v.string(),
    city: v.string(),
    country: v.string(),
    surface: v.union(v.literal("Hard"), v.literal("Clay"), v.literal("Grass")),
    category: v.union(v.literal("Grand Slam"), v.literal("Masters 1000")),
    startDate: v.string(),
    endDate: v.string(),
    seasonYear: v.number(),
    status: v.union(v.literal("Completed"), v.literal("Upcoming")),
    points: v.number(),
    championId: v.optional(v.string()),
    runnerUpId: v.optional(v.string()),
    finalScore: v.optional(v.string()),
  }),

  matches: defineTable({
    tournamentId: v.id("tournaments"),
    round: v.string(),
    date: v.string(),
    player1Id: v.string(),
    player2Id: v.string(),
    winnerId: v.string(),
    sets: v.any(),
    durationMin: v.number(),
    stats: v.any(),
    status: v.string(),
  }),
});