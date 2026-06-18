import { Doc } from "./_generated/dataModel";
import { internalMutation, mutation, query } from "./_generated/server";
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

export function isActiveSeason(
  season: Doc<"seasons">
) {
  return season.status === "Active";
}

export function isCompletedSeason(
  season: Doc<"seasons">
) {
  return season.status === "Completed";
}



export const seedSeason =
  internalMutation({
    args: {
      seasonId:
        v.id("seasons"),
    },

    handler: async (
      ctx,
      args
    ) => {
      const players =
        await ctx.db
          .query("players")
          .collect();

      let rank = 1;

      for (const player of players) {
        await ctx.db.insert(
          "rankings",
          {
            seasonId:
              args.seasonId,

            playerId:
              player._id,

            rank,

            points: 0,

            titles: 0,

            matchesWon: 0,

            matchesLost: 0,
          }
        );

        rank++;
      }
    },
  });