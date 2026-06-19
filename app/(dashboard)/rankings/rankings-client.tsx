"use client";



import { AppShell } from "@/components/tennis/AppShell";
import { RankingProgressionChart } from "@/components/tennis/Charts";
import { PlayerAvatar } from "@/components/tennis/PlayerAvatar";
import { RankingMovement } from "@/components/tennis/RankingMovement";

import {
  getPlayer,
  rankingsForSeason,
  tournamentsBySeason,
} from "@/lib/tennis-data";
import { useSeason } from "@/lib/useSeason";



export default function RankingsClient() {
  const { year } = useSeason();

  const rows = rankingsForSeason(year);
  const tours = tournamentsBySeason(year).filter(
    (t) => t.status === "Completed"
  );

  const progression = tours.reduce(
    (
      acc: {
        label: string;
        p1: number;
        p2: number;
        cumP1: number;
        cumP2: number;
      }[],
      t
    ) => {
      const prev = acc[acc.length - 1] ?? {
        cumP1: 0,
        cumP2: 0,
      };

      const cumP1 =
        prev.cumP1 +
        (t.championId === "p1"
          ? t.points
          : Math.round(t.points * 0.6));

      const cumP2 =
        prev.cumP2 +
        (t.championId === "p2"
          ? t.points
          : Math.round(t.points * 0.6));

      acc.push({
        label: t.shortName,
        p1: cumP1 >= cumP2 ? 1 : 2,
        p2: cumP2 > cumP1 ? 1 : 2,
        cumP1,
        cumP2,
      });

      return acc;
    },
    []
  );

  return (
    <AppShell title="Rankings" eyebrow={`${year} ATP Rivalry Race`}>
      {/* Table */}
      <div className="rounded-xl border border-border/60 bg-card/60">
        <div className="grid grid-cols-12 gap-2 border-b border-border/60 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">Player</div>
          <div className="col-span-1 text-center">Move</div>
          <div className="col-span-2 text-right">Points</div>
          <div className="col-span-1 text-right">Titles</div>
          <div className="col-span-2 text-right">W-L</div>
          <div className="col-span-1 text-right">Win %</div>
        </div>

        {rows.map((r) => {
          const p = getPlayer(r.playerId);

          const total = r.matchesWon + r.matchesLost;
          const pct = total
            ? Math.round((r.matchesWon / total) * 100)
            : 0;

          return (
            <div
              key={r.playerId}
              className="grid grid-cols-12 items-center gap-2 border-b border-border/40 px-5 py-4 last:border-b-0 hover:bg-muted/20"
            >
              <div className="col-span-1 font-display text-3xl text-court">
                {r.rank}
              </div>

              <div className="col-span-4 flex items-center gap-3">
                <PlayerAvatar player={p} />

                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {p.country} · {p.hand}-handed
                  </div>
                </div>
              </div>

              <div className="col-span-1 text-center">
                <RankingMovement
                  current={r.rank}
                  previous={r.previousRank}
                />
              </div>

              <div className="col-span-2 text-right font-display text-xl text-court">
                {r.points.toLocaleString()}
              </div>

              <div className="col-span-1 text-right font-display text-lg">
                {r.titles}
              </div>

              <div className="col-span-2 text-right font-mono text-sm">
                {r.matchesWon}-{r.matchesLost}
              </div>

              <div className="col-span-1 text-right font-display text-lg">
                {pct}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="mt-6 rounded-xl border border-border/60 bg-card/60 p-5">
        <h3 className="font-display text-lg uppercase tracking-wide">
          Ranking History
        </h3>

        <p className="text-xs text-muted-foreground">
          Position after each completed event in {year}.
        </p>

        <div className="mt-4">
          <RankingProgressionChart data={progression} />
        </div>
      </div>
    </AppShell>
  );
}