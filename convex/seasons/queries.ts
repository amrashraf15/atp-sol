import { query } from "../_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("seasons")
      .withIndex("by_year")
      .collect();
  },
});

export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("seasons")
      .filter((q) =>
        q.eq(q.field("status"), "Active")
      )
      .first();
  },
});

export const getByYear = query({
  args: {
    year: v.number(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("seasons")
      .withIndex("by_year", (q) =>
        q.eq("year", args.year)
      )
      .unique();
  },
});