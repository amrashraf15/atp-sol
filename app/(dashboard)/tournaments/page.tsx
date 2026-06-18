"use client";

import { AppShell } from "@/components/ui/tennis/AppShell";
import { TournamentCard } from "@/components/ui/tennis/TournamentCard";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toTournament } from "@/lib/mappers/tournamentMapper";
import { useSeason } from "@/lib/useSeason";

export default function TournamentsPage() {
  const { year } = useSeason();

  // 1. Get all seasons first
  const seasons = useQuery(api.seasons.getAll);

  // 2. Find seasonId from year
  const season = seasons?.find((s) => s.year === year);

  // 3. Get tournaments by seasonId
  const tournaments = useQuery(
    api.tournaments.getBySeason,
    season ? { seasonId: season._id } : "skip"
  );

  if (!seasons || !tournaments) {
    return (
      <AppShell title="Tournaments" eyebrow={`${year} Tour Calendar`}>
        <div>Loading...</div>
      </AppShell>
    );
  }

  const slams = tournaments.filter(
    (t) => t.category === "Grand Slam"
  );

  const masters = tournaments.filter(
    (t) => t.category === "Masters 1000"
  );

  return (
    <AppShell title="Tournaments" eyebrow={`${year} Tour Calendar`}>
      {/* Grand Slams */}
      <section>
        <div className="mb-3 flex items-baseline gap-3">
          <h2 className="font-display text-2xl uppercase tracking-wide">
            Grand Slams
          </h2>

          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            4 · Best-of-5 · 2000 pts
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {slams.map((t) => (
            <TournamentCard
              key={t._id}
              tournament={toTournament(t, year)}
            />
          ))}
        </div>
      </section>

      {/* Masters */}
      <section className="mt-8">
        <div className="mb-3 flex items-baseline gap-3">
          <h2 className="font-display text-2xl uppercase tracking-wide">
            Masters 1000
          </h2>

          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            9 · 1000 pts each
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {masters.map((t) => (
            <TournamentCard
              key={t._id}
              tournament={toTournament(t, year)}
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}