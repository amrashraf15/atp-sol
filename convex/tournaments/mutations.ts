import { mutation } from "../_generated/server";
import { v } from "convex/values";

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

