import { query } from "./_generated/server";
import { v } from "convex/values";

export const getHeadToHead = query({
  args: {
    player1Id: v.id("players"),
    player2Id: v.id("players"),
  },

  handler: async (ctx, args) => {
    const [player1, player2] = await Promise.all([
      ctx.db.get(args.player1Id),
      ctx.db.get(args.player2Id),
    ]);

    if (!player1 || !player2) {
      throw new Error("Players not found");
    }


    const matches = await ctx.db
      .query("matches")
      .collect();


    const tournaments = await ctx.db
      .query("tournaments")
      .collect();


    const h2hMatches = matches.filter(
      (m) =>
        m.status === "Completed" &&
        (
          (m.player1Id === args.player1Id &&
            m.player2Id === args.player2Id)
          ||
          (m.player1Id === args.player2Id &&
            m.player2Id === args.player1Id)
        )
    );


    const bySurface = {
      Hard: { p1: 0, p2: 0 },
      Clay: { p1: 0, p2: 0 },
      Grass: { p1: 0, p2: 0 },
    };


    let p1Wins = 0;
    let p2Wins = 0;


    for (const match of h2hMatches) {

      if (match.winnerId === args.player1Id) {
        p1Wins++;
      } else {
        p2Wins++;
      }


      const tournament = tournaments.find(
        t => t._id === match.tournamentId
      );


      if (tournament) {
        const surface = tournament.surface;


        if (match.winnerId === args.player1Id) {
          bySurface[surface].p1++;
        } else {
          bySurface[surface].p2++;
        }
      }
    }



    const recent = (
      await Promise.all(
        h2hMatches
          .sort(
            (a,b)=>
              new Date(b.date).getTime()
              -
              new Date(a.date).getTime()
          )
          .slice(0,6)
          .map(async match => {

            const tournament =
              await ctx.db.get(match.tournamentId);


            return {
              ...match,
              tournament,
              player1,
              player2,
            };
          })
      )
    );


    const longest =
      [...h2hMatches]
      .sort(
        (a,b)=>
          b.durationMin-a.durationMin
      )[0] ?? null;



    const biggest =
      [...h2hMatches]
      .sort(
        (a,b)=>
          b.sets.length-a.sets.length
      )[0] ?? null;



    return {
      player1,
      player2,

      total:h2hMatches.length,

      p1Wins,
      p2Wins,

      bySurface,

      recent,

      longest,

      biggest,
    };
  },
});