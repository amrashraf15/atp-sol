import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AppShell } from "@/components/tennis/AppShell";
import { SurfaceBadge } from "@/components/tennis/SurfaceBadge";
import { PlayerAvatar } from "@/components/tennis/PlayerAvatar";
import { MatchCard } from "@/components/tennis/MatchCard";

import {
  ALL_MATCHES,
  ALL_TOURNAMENTS,
  getPlayer,
  SEASONS,
} from "@/lib/tennis-data";

import { Trophy, MapPin, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  params: { id: string };
  searchParams: { year?: string };
};


export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `${id.toUpperCase()} — ATP Rivalry`,
  };
}

export default async function TournamentDetailPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { year } = await searchParams;

  if (!id) notFound();

  const parsedYear = year ? Number(year) : SEASONS[0].year;

  const tournament = ALL_TOURNAMENTS.find(
    (t) => t.id === id && t.seasonYear === parsedYear
  );

  if (!tournament) notFound();

  const champion = tournament.championId
    ? getPlayer(tournament.championId)
    : null;

  const runnerUp = tournament.runnerUpId
    ? getPlayer(tournament.runnerUpId)
    : null;

  const matches = ALL_MATCHES.filter(
    (m) => m.tournamentId === id && m.date.startsWith(String(parsedYear))
  );

  return (
    <AppShell
      title={tournament.name}
      eyebrow={`${tournament.category} · ${tournament.month} ${year}`}
    >
      <Link
        href="/tournaments"
        className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-court"
      >
        <ArrowLeft className="size-3" />
        All tournaments
      </Link>

      {/* HERO */}
      <div className="relative overflow-hidden rounded-xl border border-court/30 bg-linear-to-br from-card to-background p-8 court-grid">
        <div className="absolute inset-0 bg-linear-to-tr from-court/10 via-transparent to-transparent" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <SurfaceBadge surface={tournament.surface} />

              <span className="rounded-sm border border-court/40 bg-court/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-court">
                {tournament.category}
              </span>

              <span className="rounded-sm border border-border bg-muted/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {tournament.points} pts
              </span>
            </div>

            <h2 className="mt-3 font-display text-5xl uppercase leading-none md:text-6xl">
              {tournament.name}
            </h2>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3" />
                {tournament.city}, {tournament.country}
              </span>

              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3" />
                {tournament.startDate} → {tournament.endDate}
              </span>
            </div>
          </div>

          {champion && (
            <div className="rounded-lg border border-court/40 bg-background/60 p-4 text-center">
              <Trophy className="mx-auto size-6 text-court" />
              <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Champion
              </div>
              <div className="font-display text-2xl">
                {champion.shortName}
              </div>
              <div className="mt-1 font-mono text-xs text-court">
                {tournament.finalScore}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Players */}
      {champion && runnerUp && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            { label: "Champion", p: champion, accent: true },
            { label: "Runner-up", p: runnerUp, accent: false },
          ].map(({ label, p, accent }) => (
            <div
              key={p.id}
              className={`rounded-xl border bg-card/60 p-5 ${
                accent ? "border-court/50" : "border-border/60"
              }`}
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {label}
              </div>

              <div className="mt-3 flex items-center gap-3">
                <PlayerAvatar player={p} size="lg" />
                <div>
                  <div className="font-display text-2xl">{p.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {p.country}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Matches */}
      <section className="mt-8">
        <h3 className="font-display text-xl uppercase tracking-wide">
          Match History
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {matches.length ? (
            matches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))
          ) : (
            <div className="text-sm text-muted-foreground">
              Draw to be released.
            </div>
          )}
        </div>
      </section>
    </AppShell>
  );
}