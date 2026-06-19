"use client";

import { useMemo } from "react";

import { AppShell } from "@/components/tennis/AppShell";
import { RankingProgressionChart } from "@/components/tennis/Charts";
import { PlayerAvatar } from "@/components/tennis/PlayerAvatar";

import { useSeason } from "@/lib/useSeason";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";


export default function RankingsClient() {
  const { year } = useSeason();


  const rows = useQuery(
    api.rankings.getRankingsBySeason,
    { year }
  );


  const tours = useQuery(
    api.rankings.getRankingProgression,
    { year }
  );



  const progression = useMemo(() => {

    if (!rows || !tours || rows.length < 2) {
      return [];
    }


    const player1 = rows[0];
    const player2 = rows[1];


    return tours.reduce(
      (
        acc: {
          label: string;
          p1: number;
          p2: number;
          cumP1: number;
          cumP2: number;
        }[],
        tournament
      ) => {


        const previous =
          acc[acc.length - 1] ?? {
            cumP1: 0,
            cumP2: 0,
          };


        const cumP1 =
          previous.cumP1 +
          (
            tournament.championId === player1.player._id
              ? tournament.points
              : Math.round(tournament.points * 0.6)
          );


        const cumP2 =
          previous.cumP2 +
          (
            tournament.championId === player2.player._id
              ? tournament.points
              : Math.round(tournament.points * 0.6)
          );



        acc.push({
          label: tournament.label,

          p1:
            cumP1 >= cumP2
              ? 1
              : 2,

          p2:
            cumP2 > cumP1
              ? 1
              : 2,

          cumP1,
          cumP2,
        });


        return acc;

      },
      []
    );


  }, [rows, tours]);



  if (!rows || !tours) {
    return (
      <AppShell
        title="Rankings"
        eyebrow={`${year} ATP Rivalry Race`}
      >
        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
          Loading rankings...
        </div>
      </AppShell>
    );
  }



  if (rows.length === 0) {
    return (
      <AppShell
        title="Rankings"
        eyebrow={`${year} ATP Rivalry Race`}
      >
        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
          No rankings available.
        </div>
      </AppShell>
    );
  }



  return (
    <AppShell
      title="Rankings"
      eyebrow={`${year} ATP Rivalry Race`}
    >


      {/* Rankings Table */}

      <div className="mt-6 overflow-hidden rounded-xl border border-border/60 bg-card/60">


        {/* Header */}

        <div
          className="
            grid
            grid-cols-[80px_minmax(220px,1fr)_120px_120px_120px_120px]
            items-center
            gap-4
            border-b
            border-border/60
            px-6
            py-4
            text-xs
            font-mono
            uppercase
            tracking-widest
            text-muted-foreground
          "
        >

          <div>
            Rank
          </div>


          <div>
            Player
          </div>


          <div className="text-right">
            Points
          </div>


          <div className="text-right">
            Titles
          </div>


          <div className="text-right">
            W-L
          </div>


          <div className="text-right">
            Win %
          </div>


        </div>




        {/* Rows */}

        {
          rows.map((r)=>{

            const player = r.player;


            const total =
              r.matchesWon +
              r.matchesLost;


            const winPercentage =
              total
                ? Math.round(
                    (r.matchesWon / total) * 100
                  )
                : 0;



            return (

              <div
                key={r._id}
                className="
                  grid
                  grid-cols-[80px_minmax(220px,1fr)_120px_120px_120px_120px]
                  items-center
                  gap-4
                  border-b
                  border-border/40
                  px-6
                  py-4
                  transition-colors
                  last:border-b-0
                  hover:bg-muted/20
                "
              >


                {/* Rank */}

                <div className="font-display text-3xl text-court">
                  {r.rank}
                </div>




                {/* Player */}

                <div className="flex items-center gap-3">

                  <PlayerAvatar
                    player={player}
                  />


                  <div>

                    <div className="font-medium">
                      {player.name}
                    </div>


                    <div className="text-xs text-muted-foreground">
                      {player.country}
                      {" · "}
                      {player.hand}-handed
                    </div>

                  </div>


                </div>




                {/* Points */}

                <div className="text-right font-display text-xl text-court">
                  {r.points.toLocaleString()}
                </div>




                {/* Titles */}

                <div className="text-right font-display text-lg">
                  {r.titles}
                </div>




                {/* Record */}

                <div className="text-right font-mono text-sm">
                  {r.matchesWon}-{r.matchesLost}
                </div>




                {/* Win % */}

                <div className="text-right font-display text-lg">
                  {winPercentage}%
                </div>


              </div>

            );

          })
        }


      </div>




      {/* Chart */}


      <div className="
        mt-6
        rounded-xl
        border
        border-border/60
        bg-card/60
        p-5
      ">


        <h3 className="font-display text-lg uppercase tracking-wide">
          Ranking History
        </h3>


        <p className="text-xs text-muted-foreground">
          Position after each completed event in {year}.
        </p>



        <div className="mt-4">

          <RankingProgressionChart
            data={progression}
          />

        </div>


      </div>


    </AppShell>
  );
}