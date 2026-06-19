"use client";

import Link from "next/link";



import {
  ALL_MATCHES,
  getPlayer,
  headToHead,
  rankingsForSeason,
  tournamentsBySeason,
} from "@/lib/tennis-data";
import {
  Crown,
  Swords,
  ArrowRight,
  Activity,
  Flame,
  Trophy,
} from "lucide-react";
import { AppShell } from "@/components/tennis/AppShell";
import { PlayerAvatar } from "@/components/tennis/PlayerAvatar";
import { SurfaceBadge } from "@/components/tennis/SurfaceBadge";
import { RankingMovement } from "@/components/tennis/RankingMovement";
import { MatchCard } from "@/components/tennis/MatchCard";
import { StatsCard } from "@/components/tennis/StatsCard";
import { PointsProgressionChart } from "@/components/tennis/Charts";
import { TournamentCard } from "@/components/tennis/TournamentCard";
import { useSeason } from "@/lib/useSeason";

export default function DashboardClient() {
  const { year } = useSeason();

  const rankings = rankingsForSeason(year);
  const no1 = getPlayer(rankings[0].playerId);

  const seasonMatches = ALL_MATCHES
    .filter((m) => m.date.startsWith(String(year)))
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const latest = seasonMatches[0];

  const tours = tournamentsBySeason(year);

  const upcoming =
    tours.find((t) => t.status === "Upcoming") ??
    tours[tours.length - 1];

  const champions = tours
    .filter((t) => t.status === "Completed")
    .slice(-3)
    .reverse();

  const h2h = headToHead();

  const seasonPoints = tours
    .filter((t) => t.status === "Completed")
    .reduce(
      (acc: { label: string; p1: number; p2: number }[], t) => {
        const prev = acc[acc.length - 1] ?? {
          p1: 0,
          p2: 0,
        };

        const add = (id?: string) =>
          id === "p1"
            ? t.points
            : id === "p2"
            ? Math.round(t.points * 0.6)
            : 0;

        acc.push({
          label: t.shortName,
          p1:
            prev.p1 +
            add(t.championId === "p1" ? "p1" : undefined) +
            (t.runnerUpId === "p1"
              ? Math.round(t.points * 0.6)
              : 0),
          p2:
            prev.p2 +
            add(t.championId === "p2" ? "p2" : undefined) +
            (t.runnerUpId === "p2"
              ? Math.round(t.points * 0.6)
              : 0),
        });

        return acc;
      },
      []
    );

  return (
    <AppShell title="Dashboard" eyebrow={`${year} Season · Live`}>
      {/* HERO */}
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="relative col-span-2 overflow-hidden rounded-xl border border-court/40 bg-linear-to-br from-card via-card to-background p-6 court-grid">
          <div className="absolute inset-0 bg-linear-to-tr from-court/20 via-transparent to-transparent" />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Crown className="size-4 text-court" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-court">
                  World No. 1
                </span>
              </div>

              <h2 className="mt-2 font-display text-5xl uppercase md:text-7xl">
                {no1.name}
              </h2>

              <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span>{no1.country}</span>
                <span className="size-1 rounded-full bg-border" />
                <span>{no1.hand}-Handed</span>
                <span className="size-1 rounded-full bg-border" />
                <span>{no1.height}</span>
              </div>

              <div className="mt-5 flex gap-6">
                <div>
                  <div className="font-mono text-[10px] uppercase">
                    Points
                  </div>
                  <div className="font-display text-3xl text-court">
                    {rankings[0].points.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase">
                    Titles
                  </div>
                  <div className="font-display text-3xl">
                    {rankings[0].titles}
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase">
                    W-L
                  </div>
                  <div className="font-display text-3xl">
                    {rankings[0].matchesWon}-
                    {rankings[0].matchesLost}
                  </div>
                </div>
              </div>
            </div>

            <PlayerAvatar
              player={no1}
              size="xl"
              className="self-start glow-court"
            />
          </div>
        </div>

        {/* H2H */}
        <div className="rounded-xl border border-border/60 bg-card/60 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Swords className="size-4 text-court" />
              <span className="font-mono text-[10px] uppercase">
                Head-to-Head
              </span>
            </div>

            <Link
              href="/head-to-head"
              className="text-xs text-court hover:underline"
            >
              View <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="mt-4 flex justify-around">
            {[getPlayer("p1"), getPlayer("p2")].map(
              (p, i) => (
                <div key={p.id} className="text-center">
                  <PlayerAvatar player={p} size="lg" />
                  <div className="mt-2 font-display text-3xl">
                    {i === 0 ? h2h.p1Wins : h2h.p2Wins}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border/60 bg-card/60 p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg uppercase tracking-wide">Current Rankings</h3>
            <Link href="/rankings" className="text-xs text-court hover:underline">
              Full table →
            </Link>
          </div>
          <div className="mt-4 divide-y divide-border/50">
            {rankings.map((r) => {
              const p = getPlayer(r.playerId);
              return (
                <div key={r.playerId} className="flex items-center gap-4 py-3">
                  <div className="w-8 font-display text-2xl text-court">{r.rank}</div>
                  <PlayerAvatar player={p} />
                  <div className="flex-1">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.country}</div>
                  </div>
                  <RankingMovement current={r.rank} previous={r.previousRank} />
                  <div className="hidden w-20 text-right text-sm sm:block">
                    <div className="font-display text-lg">{r.titles}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Titles
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    <div className="font-display text-xl text-court">
                      {r.points.toLocaleString()}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Points
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border/60 bg-card/60 p-5">
            <h3 className="font-display text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Latest Match
            </h3>
            {latest ? (
              <div className="mt-3">
                <MatchCard match={latest} />
              </div>
            ) : (
              <div className="mt-3 text-sm text-muted-foreground">No matches yet.</div>
            )}
          </div>
          <div className="rounded-xl border border-border/60 bg-card/60 p-5">
            <h3 className="font-display text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Next Up
            </h3>
            {upcoming && (
              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <SurfaceBadge surface={upcoming.surface} />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {upcoming.month}
                  </span>
                </div>
                <h4 className="mt-2 font-display text-2xl uppercase">{upcoming.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {upcoming.city}, {upcoming.country}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
       {/* Stats */}
      <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          label="Season Titles"
          value={tours.filter((t) => t.status === "Completed").length}
          hint="Across all categories"
          icon={<Trophy className="size-4" />}
        />
        <StatsCard
          label="Matches Played"
          value={seasonMatches.length}
          hint="Finals on record"
          icon={<Activity className="size-4" />}
        />
        <StatsCard
          label="Win Streak"
          value="6"
          hint={`${no1.shortName} · active`}
          icon={<Flame className="size-4" />}
        />
        <StatsCard
          label="Total Rivalry"
          value={h2h.total}
          hint={`${h2h.p1Wins}-${h2h.p2Wins} all-time`}
          icon={<Swords className="size-4" />}
        />
      </section>

      {/* Chart */}
      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border/60 bg-card/60 p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg uppercase tracking-wide">Points Progression</h3>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {year} Season
            </span>
          </div>
          <div className="mt-3">
            <PointsProgressionChart data={seasonPoints} />
          </div>
        </div>
        <div className="rounded-xl border border-border/60 bg-card/60 p-5">
          <h3 className="font-display text-lg uppercase tracking-wide">Recent Champions</h3>
          <div className="mt-3 space-y-2">
            {champions.map((t) => {
              const ch = t.championId ? getPlayer(t.championId) : null;
              return (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-md border border-border/50 bg-background/40 p-3"
                >
                  <div>
                    <div className="font-display text-sm uppercase tracking-wide">{t.shortName}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {t.month} · {t.surface}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{ch?.shortName}</div>
                    <div className="font-mono text-[10px] text-court">{t.finalScore}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Upcoming tournaments preview */}
      <section className="mt-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-lg uppercase tracking-wide">Upcoming Tournaments</h3>
          <Link href="/tournaments" className="text-xs text-court hover:underline">
            All tournaments →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tours
            .filter((t) => t.status === "Upcoming")
            .slice(0, 3)
            .map((t) => (
              <TournamentCard key={t.id} tournament={t} />
            ))}
          {tours.filter((t) => t.status === "Upcoming").length === 0 &&
            tours.slice(-3).map((t) => <TournamentCard key={t.id} tournament={t} />)}
        </div>
      </section>

      
    </AppShell>
  );
}