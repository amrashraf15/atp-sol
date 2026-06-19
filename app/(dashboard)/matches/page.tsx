"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { AppShell } from "@/components/tennis/AppShell";
import { MatchCard } from "@/components/tennis/MatchCard";
import { useSeason } from "@/lib/useSeason";
import { AddMatchDialog } from "@/components/matches/AddMatchDialog";

export default function MatchesPage() {
  const { year } = useSeason();

  const matches = useQuery(
    api.matches.getAllMatchesWithDetails
  );

  const players = useQuery(api.players.getAll);
  const tournaments = useQuery(api.tournaments.getAll);

  if (!matches || !players || !tournaments) {
    return (
      <AppShell title="Matches">
        Loading...
      </AppShell>
    );
  }

  const sortedMatches = [...matches].sort((a, b) =>
    a.date < b.date ? 1 : -1
  );

  return (
    <AppShell
      title="Matches"
      eyebrow={`${year} · All finals`}
      actions={
        <AddMatchDialog
          players={players}
          tournaments={tournaments}
        />
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sortedMatches.map((match) => (
          <MatchCard
            key={match._id}
            match={match}
          />
        ))}
      </div>
    </AppShell>
  );
}