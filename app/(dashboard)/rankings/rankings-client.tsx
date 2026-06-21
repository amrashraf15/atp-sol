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

  const rows = useQuery(api.rankings.getRankingsBySeason, { year });
  const tours = useQuery(api.rankings.getRankingProgression, { year });

  /**
   * Sort players by highest points descending
   */
  const sortedRows = useMemo(() => {
    if (!rows) return null;

    return [...rows].sort((a, b) => b.points - a.points);
  }, [rows]);

  /**
   * Top 2 players after sorting by points
   */
  const players = useMemo(() => {
    if (!sortedRows || sortedRows.length < 2) return null;

    return {
      p1: sortedRows[0].player,
      p2: sortedRows[1].player,
    };
  }, [sortedRows]);

  /**
   * Ranking progression chart data
   * Uses top 2 players from sortedRows
   */
  const progression = useMemo(() => {
    if (!sortedRows || !tours || sortedRows.length < 2) {
      return [];
    }

    const player1 = sortedRows[0];
    const player2 = sortedRows[1];

    return tours.reduce<
      {
        label: string;
        p1: number;
        p2: number;
      }[]
    >((acc, tournament) => {
      const previous = acc[acc.length - 1] ?? {
        p1: 1,
        p2: 1,
      };

      const p1Points =
        tournament.championId === player1.player._id
          ? tournament.points
          : Math.round(tournament.points * 0.6);

      const p2Points =
        tournament.championId === player2.player._id
          ? tournament.points
          : Math.round(tournament.points * 0.6);

      const totalP1 = previous.p1 + p1Points;
      const totalP2 = previous.p2 + p2Points;

      acc.push({
        label: tournament.label,

        // ranking position
        p1: totalP1 >= totalP2 ? 1 : 2,
        p2: totalP2 > totalP1 ? 1 : 2,
      });

      return acc;
    }, []);
  }, [sortedRows, tours]);

  if (!sortedRows || !tours) {
    return (
      <AppShell title="Rankings" eyebrow={`${year} ATP Rivalry Race`}>
        Loading rankings...
      </AppShell>
    );
  }

  if (sortedRows.length === 0) {
    return (
      <AppShell title="Rankings" eyebrow={`${year} ATP Rivalry Race`}>
        No rankings available.
      </AppShell>
    );
  }

  return (
    <AppShell title="Rankings" eyebrow={`${year} ATP Rivalry Race`}>
      {/* Rankings Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-border/60 bg-card/60">
        <div
          className="
            grid
            grid-cols-[80px_minmax(220px,1fr)_120px_120px_120px_120px]
            gap-4
            border-b
            px-6
            py-4
            text-xs
            font-mono
            uppercase
            tracking-widest
            text-muted-foreground
          "
        >
          <div>Rank</div>
          <div>Player</div>
          <div className="text-right">Points</div>
          <div className="text-right">Titles</div>
          <div className="text-right">W-L</div>
          <div className="text-right">Win %</div>
        </div>

        {sortedRows.map((r, index) => {
          const total = r.matchesWon + r.matchesLost;
          const winPercentage = total
            ? Math.round((r.matchesWon / total) * 100)
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
                px-6
                py-4
              "
            >
              {/* rank based on sorted points */}
              <div className="font-display text-3xl text-court">
                {index + 1}
              </div>

              <div className="flex items-center gap-3">
                <PlayerAvatar player={r.player} />

                <div>
                  <div className="font-medium">{r.player.name}</div>

                  <div className="text-xs text-muted-foreground">
                    {r.player.country}
                    {" · "}
                    {r.player.hand}-handed
                  </div>
                </div>
              </div>

              <div className="text-right font-display text-xl text-court">
                {r.points.toLocaleString()}
              </div>

              <div className="text-right">{r.titles}</div>

              <div className="text-right">
                {r.matchesWon}-{r.matchesLost}
              </div>

              <div className="text-right">{winPercentage}%</div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div
        className="
          mt-6
          rounded-xl
          border
          border-border/60
          bg-card/60
          p-5
        "
      >
        <h3 className="font-display text-lg uppercase">Ranking History</h3>

        <p className="text-xs text-muted-foreground">
          Position after each completed event in {year}.
        </p>

        <div className="mt-4">
          {players && (
            <RankingProgressionChart
              data={progression}
              players={{
                p1: {
                  shortName: players.p1.shortName,
                  color: players.p1.color,
                },
                p2: {
                  shortName: players.p2.shortName,
                  color: players.p2.color,
                },
              }}
            />
          )}
        </div>
      </div>
    </AppShell>
  );
}