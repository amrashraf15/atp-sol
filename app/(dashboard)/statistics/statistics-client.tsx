"use client";
import { AppShell } from "@/components/tennis/AppShell";
import { H2HBarChart, PointsProgressionChart } from "@/components/tennis/Charts";
import { PlayerAvatar } from "@/components/tennis/PlayerAvatar";
import { StatsCard } from "@/components/tennis/StatsCard";
import {
  ALL_MATCHES,
  ALL_TOURNAMENTS,
  getPlayer,
  headToHead,
  PLAYERS,
  SEASONS,
  tournamentsBySeason,
} from "@/lib/tennis-data";
import { useSeason } from "@/lib/useSeason";
import {
  Activity,
  Flame,
  Trophy,
  Crown,
} from "lucide-react";

export default function StatisticsClient() {
  const { year } = useSeason();

  const h = headToHead();

  const tours = tournamentsBySeason(year).filter(
    (t) => t.status === "Completed"
  );

  const slams = tours.filter(
    (t) => t.category === "Grand Slam"
  ).length;

  const masters = tours.filter(
    (t) => t.category === "Masters 1000"
  ).length;

  const totalMatches = ALL_MATCHES.length;

  const titlesBySeason = SEASONS.map((s) => {
    const ts = ALL_TOURNAMENTS.filter(
      (t) =>
        t.seasonYear === s.year &&
        t.status === "Completed"
    );

    return {
      label: String(s.year),
      p1: ts.filter((t) => t.championId === "p1").length,
      p2: ts.filter((t) => t.championId === "p2").length,
    };
  });

  const points = tours.reduce(
    (acc: { label: string; p1: number; p2: number }[], t) => {
      const prev = acc[acc.length - 1] ?? {
        p1: 0,
        p2: 0,
      };

      acc.push({
        label: t.shortName,
        p1:
          prev.p1 +
          (t.championId === "p1"
            ? t.points
            : Math.round(t.points * 0.6)),
        p2:
          prev.p2 +
          (t.championId === "p2"
            ? t.points
            : Math.round(t.points * 0.6)),
      });

      return acc;
    },
    []
  );

  return (
    <AppShell title="Statistics" eyebrow="Analytics Dashboard">
      {/* Top Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          label="Total Matches"
          value={totalMatches}
          hint="All seasons"
          icon={<Activity className="size-4" />}
        />
        <StatsCard
          label="Grand Slams"
          value={slams}
          hint={`${year} season`}
          icon={<Crown className="size-4" />}
        />
        <StatsCard
          label="Masters Titles"
          value={masters}
          hint={`${year} season`}
          icon={<Trophy className="size-4" />}
        />
        <StatsCard
          label="Longest Streak"
          value="6"
          hint="Active"
          icon={<Flame className="size-4" />}
        />
      </div>

      {/* Player Cards */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {PLAYERS.map((p) => {
          const wins = ALL_MATCHES.filter(
            (m) => m.winnerId === p.id
          ).length;

          const totalPlayed =
            ALL_MATCHES.filter(
              (m) =>
                m.player1Id === p.id ||
                m.player2Id === p.id
            ).length;

          const losses = totalPlayed - wins;

          const titles = ALL_TOURNAMENTS.filter(
            (t) => t.championId === p.id
          ).length;

          const slamTitles = ALL_TOURNAMENTS.filter(
            (t) =>
              t.championId === p.id &&
              t.category === "Grand Slam"
          ).length;

          const winPct = Math.round(
            (wins / Math.max(totalPlayed, 1)) * 100
          );

          return (
            <div
              key={p.id}
              className="rounded-xl border border-border/60 bg-card/60 p-5"
            >
              <div className="flex items-center gap-3">
                <PlayerAvatar player={p} size="lg" />
                <div>
                  <div className="font-display text-2xl uppercase">
                    {p.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {p.country}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                <div>
                  <div className="font-display text-2xl text-court">
                    {titles}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Titles
                  </div>
                </div>

                <div>
                  <div className="font-display text-2xl">
                    {slamTitles}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Slams
                  </div>
                </div>

                <div>
                  <div className="font-display text-2xl">
                    {wins}-{losses}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    W-L
                  </div>
                </div>

                <div>
                  <div className="font-display text-2xl">
                    {winPct}%
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Win %
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-card/60 p-5">
          <h3 className="font-display text-lg uppercase tracking-wide">
            Points Progression · {year}
          </h3>
          <div className="mt-3">
            <PointsProgressionChart data={points} />
          </div>
        </div>

        <div className="rounded-xl border border-border/60 bg-card/60 p-5">
          <h3 className="font-display text-lg uppercase tracking-wide">
            Titles per Season
          </h3>
          <div className="mt-3">
            <H2HBarChart
              data={titlesBySeason.map((t) => ({
                surface: t.label,
                p1: t.p1,
                p2: t.p2,
              }))}
            />
          </div>
        </div>
      </div>

      {/* Surface Win % */}
      <div className="mt-6 rounded-xl border border-border/60 bg-card/60 p-5">
        <h3 className="font-display text-lg uppercase tracking-wide">
          Win % by Surface (All Time)
        </h3>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {(["Hard", "Clay", "Grass"] as const).map((s) => {
            const v = h.bySurface[s];
            const total = v.p1 + v.p2;

            return (
              <div key={s}>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s}
                </div>

                <div className="mt-1 flex items-center justify-between">
                  <span
                    className="font-display text-2xl"
                    style={{ color: getPlayer("p1").color }}
                  >
                    {total
                      ? Math.round((v.p1 / total) * 100)
                      : 0}
                    %
                  </span>

                  <span
                    className="font-display text-2xl"
                    style={{ color: getPlayer("p2").color }}
                  >
                    {total
                      ? Math.round((v.p2 / total) * 100)
                      : 0}
                    %
                  </span>
                </div>

                <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-muted/40">
                  <div
                    style={{
                      background: getPlayer("p1").color,
                      width: `${
                        total ? (v.p1 / total) * 100 : 50
                      }%`,
                    }}
                  />
                  <div
                    style={{
                      background: getPlayer("p2").color,
                      width: `${
                        total ? (v.p2 / total) * 100 : 50
                      }%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}