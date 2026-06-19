import { v } from "convex/values";
import { query } from "./_generated/server";


export const getHistoryData = query({

  args: {},


  handler: async (ctx) => {


    // =========================
    // Seasons
    // =========================

    const seasons =
      await ctx.db
        .query("seasons")
        .collect();



    // =========================
    // Grand Slam Champions
    // =========================

    const tournaments =
      await ctx.db
        .query("tournaments")
        .collect();



    const grandSlams =
      await Promise.all(

        tournaments

          .filter(
            (t) =>
              t.category === "Grand Slam" &&
              t.status === "Completed"
          )

          .map(async (t) => ({

            ...t,

            champion:
              t.championId
                ? await ctx.db.get(
                    t.championId
                  )
                : null,

          }))

      );



    // =========================
    // Year End No.1
    // =========================


    const yearEndNo1 =
      await Promise.all(

        seasons.map(async (season) => {


          const ranking =
            await ctx.db
              .query("rankings")
              .withIndex(
                "by_season_rank",
                (q) =>
                  q
                    .eq(
                      "seasonId",
                      season._id
                    )
                    .eq(
                      "rank",
                      1
                    )
              )
              .unique();



          return {

            year:
              season.year,


            player:
              ranking
                ? await ctx.db.get(
                    ranking.playerId
                  )
                : null,


            points:
              ranking?.points ?? 0,

          };


        })

      );



    // =========================
    // Most Titles
    // =========================


    const allRankings =
      await ctx.db
        .query("rankings")
        .collect();



    const titleMap =
      new Map();



    for (const r of allRankings) {


      const player =
        await ctx.db.get(
          r.playerId
        );


      if (!player)
        continue;



      const current =
        titleMap.get(
          r.playerId
        ) ?? {

          player,

          titles: 0,

          slams: 0,

          masters: 0,

        };



      current.titles += r.titles;



      titleMap.set(
        r.playerId,
        current
      );

    }



    const mostTitles =
      Array.from(
        titleMap.values()
      )
      .sort(
        (a,b)=>
          b.titles -
          a.titles
      );



    return {


      grandSlams,


      yearEndNo1,


      mostTitles,


    };

  },

});