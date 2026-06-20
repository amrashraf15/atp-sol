"use client";

import { AppShell } from "@/components/tennis/AppShell";
import {
  H2HBarChart,
  PointsProgressionChart,
} from "@/components/tennis/Charts";

import { PlayerAvatar } from "@/components/tennis/PlayerAvatar";
import { StatsCard } from "@/components/tennis/StatsCard";

import { Activity, Flame, Trophy, Crown } from "lucide-react";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSeason } from "@/lib/useSeason";

export default function StatisticsClient() {
  const { year } = useSeason();

  const season = useQuery(api.seasons.getByYear, { year });

  const stats = useQuery(
    api.stats.getDashboardStatistics,
    season
      ? {
          seasonId: season._id,
        }
      : "skip",
  );

  if (!stats) return <AppShell title="Statistics">Loading...</AppShell>;

  const longestStreak = Math.max(...stats.playerStats.map((p) => p.streak));

  return (
    <AppShell title="Statistics" eyebrow={`${year} Performance`}>
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          label="Total Matches"
          value={stats.totalMatches}
          hint="Completed"
          icon={<Activity />}
        />

        <StatsCard
          label="Grand Slams"
          value={stats.grandSlams}
          hint={String(year)}
          icon={<Trophy />}
        />

        <StatsCard
          label="Masters Titles"
          value={stats.masters}
          hint={String(year)}
          icon={<Crown />}
        />

        <StatsCard
          label="Longest Streak"
          value={longestStreak}
          hint="Active"
          icon={<Flame />}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {stats.playerStats.map(({ player, ...s }) => (
          <div
            key={player._id}
            className="
              rounded-xl
              border
              border-border/60
              bg-card/60
              p-5
            "
          >
            <div className="flex gap-3 items-center">
              <PlayerAvatar player={player} size="lg" />

              <div>
                <div className="font-display text-2xl">{player.name}</div>

                <div className="text-xs text-muted-foreground">
                  {player.country}
                </div>
              </div>
            </div>

            <div
              className="
              mt-5
              grid grid-cols-4
              text-center
            "
            >
              <div>
                <div className="text-2xl text-court">{s.titles}</div>
                <span>Titles</span>
              </div>

              <div>
                <div className="text-2xl">{s.slamTitles}</div>
                <span>Slams</span>
              </div>

              <div>
                <div className="text-2xl">
                  {s.wins}-{s.losses}
                </div>
                <span>W-L</span>
              </div>

              <div>
                <div className="text-2xl">{s.winPct}%</div>
                <span>Win%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <div>
          <PointsProgressionChart
            data={stats.progression}
            players={{
              p1: {
                shortName: stats.playerStats[0].player.shortName,
                color: stats.playerStats[0].player.color,
              },
              p2: {
                shortName: stats.playerStats[1].player.shortName,
                color: stats.playerStats[1].player.color,
              },
            }}
          />
        </div>

        <div>
          <H2HBarChart
            data={stats.titlesBySeason.map((x) => ({
              surface: x.label,
              p1: x.p1,
              p2: x.p2,
            }))}
            players={{
              p1: {
                shortName: stats.playerStats[0].player.shortName,
                color: stats.playerStats[0].player.color,
              },

              p2: {
                shortName: stats.playerStats[1].player.shortName,
                color: stats.playerStats[1].player.color,
              },
            }}
          />
        </div>
      </div>
    </AppShell>
  );
}
