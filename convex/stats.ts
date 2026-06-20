import { query } from "./_generated/server";
import { v } from "convex/values";

export const getDashboardStatistics = query({
  args: {
    seasonId: v.id("seasons"),
  },

  handler: async (ctx, args) => {
    const [
      players,
      tournaments,
      matches,
      rankings,
      seasons,
    ] = await Promise.all([
      ctx.db.query("players").collect(),

      ctx.db
        .query("tournaments")
        .withIndex("by_season", (q) =>
          q.eq("seasonId", args.seasonId)
        )
        .collect(),

      ctx.db
        .query("matches")
        .filter((q) =>
          q.eq(q.field("status"), "Completed")
        )
        .collect(),

      ctx.db
        .query("rankings")
        .withIndex("by_season_rank", (q) =>
          q.eq("seasonId", args.seasonId)
        )
        .collect(),

      ctx.db.query("seasons").collect(),
    ]);


    const completedTournaments =
      tournaments.filter(
        (t) => t.status === "Completed"
      );


    const grandSlams =
      completedTournaments.filter(
        (t) => t.category === "Grand Slam"
      ).length;


    const masters =
      completedTournaments.filter(
        (t) => t.category === "Masters 1000"
      ).length;



    /*
      Player Statistics
    */

    const playerStats = players.map((player) => {

      const playerMatches =
        matches.filter(
          (m) =>
            m.player1Id === player._id ||
            m.player2Id === player._id
        );


      const wins =
        playerMatches.filter(
          (m) =>
            m.winnerId === player._id
        ).length;


      const losses =
        playerMatches.length - wins;


      const titles =
        tournaments.filter(
          (t) =>
            t.championId === player._id
        ).length;


      const slamTitles =
        tournaments.filter(
          (t) =>
            t.championId === player._id &&
            t.category === "Grand Slam"
        ).length;


      const winPct =
        playerMatches.length
          ? Math.round(
              (wins / playerMatches.length) * 100
            )
          : 0;



      /*
        Win streak
      */

      const streak =
        playerMatches
          .sort(
            (a,b)=>
              new Date(b.date).getTime() -
              new Date(a.date).getTime()
          )
          .reduce(
            (count,match)=>{

              if(match.winnerId === player._id)
                return count + 1;

              if(count > 0)
                return count;

              return 0;

            },
            0
          );


      return {
        player,
        wins,
        losses,
        titles,
        slamTitles,
        winPct,
        streak,
      };
    });



    /*
      Points progression
    */

    const progression =
      completedTournaments
        .sort(
          (a,b)=>
            new Date(a.startDate).getTime() -
            new Date(b.startDate).getTime()
        )
        .reduce(
          (
            acc:{
              label:string;
              p1:number;
              p2:number;
            }[],
            t
          )=>{


            const prev =
              acc[acc.length-1] ?? {
                p1:0,
                p2:0
              };


            const top1 =
              rankings[0]?.playerId;

            const top2 =
              rankings[1]?.playerId;



            acc.push({

              label:t.shortName,


              p1:
                prev.p1 +
                (
                  t.championId === top1
                  ? t.points
                  : Math.round(t.points*0.6)
                ),


              p2:
                prev.p2 +
                (
                  t.championId === top2
                  ? t.points
                  : Math.round(t.points*0.6)
                ),

            });


            return acc;

          },
          []
        );




    /*
      Titles per season
    */

    const titlesBySeason =
      await Promise.all(

        seasons.map(async(season)=>{


          const seasonTours =
            await ctx.db
              .query("tournaments")
              .withIndex("by_season",(q)=>
                q.eq(
                  "seasonId",
                  season._id
                )
              )
              .collect();



          return {

            label:String(season.year),

            p1:
              seasonTours.filter(
                t =>
                t.championId === players[0]?._id
              ).length,


            p2:
              seasonTours.filter(
                t =>
                t.championId === players[1]?._id
              ).length,

          };

        })

      );




    /*
      Surface statistics
    */

    const surfaceStats =
      ["Hard","Clay","Grass"].map(
        surface=>{


          const surfaceMatches =
            matches.filter(async m=>{

              const tournament =
                await ctx.db.get(
                  m.tournamentId
                );

              return tournament?.surface === surface;

            });


          return {
            surface,
            matches:surfaceMatches.length
          };

        }
      );



    return {

      totalMatches:matches.length,

      grandSlams,

      masters,

      playerStats,

      progression,

      titlesBySeason,

      surfaceStats,

      rankings,

      tournaments,

    };
  },
});