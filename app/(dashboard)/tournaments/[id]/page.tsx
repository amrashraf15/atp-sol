"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { notFound } from "next/navigation";
import Link from "next/link";

import { AppShell } from "@/components/tennis/AppShell";
import { SurfaceBadge } from "@/components/tennis/SurfaceBadge";
import { PlayerAvatar } from "@/components/tennis/PlayerAvatar";
import { MatchCard } from "@/components/tennis/MatchCard";

import {
  Trophy,
  MapPin,
  Calendar,
  ArrowLeft,
} from "lucide-react";

type Props = {
  params: { id: string };
  searchParams: { year?: string };
};

export default function TournamentDetailPage({
  params,
  searchParams,
}: Props) {
  const id = params.id;

  // IMPORTANT: Convex requires branded Id type
  const tournament = useQuery(api.tournaments.getById, {
    id: id as Id<"tournaments">,
  });

  if (tournament === undefined) {
    return (
      <AppShell title="Loading..." eyebrow="Tournament">
        <div>Loading...</div>
      </AppShell>
    );
  }

  if (tournament === null) {
    return notFound();
  }

  const matches = tournament.matches ?? [];

  const champion = tournament.championId;
  const runnerUp = tournament.runnerUpId;

  return (
    <AppShell
      title={tournament.name}
      eyebrow={`${tournament.category} · ${tournament.startDate}`}
    >
      {/* BACK LINK */}
      <Link
        href="/tournaments"
        className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" />
        All tournaments
      </Link>

      {/* HERO */}
      <div className="relative overflow-hidden rounded-xl border p-8">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <SurfaceBadge surface={tournament.surface} />

              <span className="text-xs uppercase text-muted-foreground">
                {tournament.category}
              </span>

              <span className="text-xs text-muted-foreground">
                {tournament.points} pts
              </span>
            </div>

            <h1 className="mt-3 font-display text-4xl uppercase">
              {tournament.name}
            </h1>

            <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="size-3" />
                {tournament.city}, {tournament.country}
              </span>

              <span className="flex items-center gap-1">
                <Calendar className="size-3" />
                {tournament.startDate} → {tournament.endDate}
              </span>
            </div>
          </div>

          {/* CHAMPION */}
          {tournament.status === "Completed" && (
            <div className="rounded-lg border p-4 text-center">
              <Trophy className="mx-auto size-5 text-yellow-500" />
              <div className="text-xs uppercase text-muted-foreground">
                Champion
              </div>

              <div className="font-display text-xl">
                {tournament.finalScore ?? "—"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MATCHES */}
      <section className="mt-8">
        <h2 className="font-display text-xl uppercase tracking-wide">
          Match History
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {matches.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No matches found for this tournament.
            </div>
          ) : (
            matches.map((match) => (
              <MatchCard key={match._id} match={match} />
            ))
          )}
        </div>
      </section>
    </AppShell>
  );
}