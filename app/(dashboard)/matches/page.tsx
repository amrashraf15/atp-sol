"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { AppShell } from "@/components/tennis/AppShell";
import { MatchCard } from "@/components/tennis/MatchCard";
import { useSeason } from "@/lib/useSeason";

export default function MatchesPage() {
  const { year } = useSeason();

  const matches = useQuery(
    api.matches.getAllMatchesWithDetails
  );

  if (!matches) {
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