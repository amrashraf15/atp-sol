import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    year: v.number(),
    label: v.string(),

    status: v.union(
      v.literal("Upcoming"),
      v.literal("Active"),
      v.literal("Completed")
    ),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert(
      "seasons",
      args
    );
  },
});

export const activate = mutation({
  args: {
    seasonId: v.id("seasons"),
  },

  handler: async (ctx, args) => {
    const activeSeasons =
      await ctx.db
        .query("seasons")
        .filter((q) =>
          q.eq(q.field("status"), "Active")
        )
        .collect();

    for (const season of activeSeasons) {
      await ctx.db.patch(season._id, {
        status: "Completed",
      });
    }

    await ctx.db.patch(args.seasonId, {
      status: "Active",
    });
  },
});