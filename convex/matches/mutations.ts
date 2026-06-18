import { mutation } from "../_generated/server";
import { matchValidator } from "../lib/validation";


export const create = mutation({
  args: matchValidator,

  handler: async (ctx, args) => {
    return await ctx.db.insert("matches", args);
  },
});