"use client";

import { AppShell } from "@/components/tennis/AppShell";
import { TournamentCard } from "@/components/tennis/TournamentCard";
import { AddTournamentDialog } from "@/components/tournaments/AddTournamentDialog";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useSeason } from "@/lib/useSeason";
import { toTournament } from "@/lib/mappers/tournamentMapper";

export default function TournamentsPage() {
  const { year } = useSeason();

  // 1. Load seasons
  const seasons = useQuery(api.seasons.getAll);

  // 2. Find current season
  const season = seasons?.find((s) => s.year === year);

  // 3. Load tournaments only if season exists
  const tournaments = useQuery(
    api.tournaments.getBySeason,
    season ? { seasonId: season._id } : "skip",
  );

  if (!seasons || !season || !tournaments) {
    return (
      <AppShell
        title="Tournaments"
        eyebrow={`${year} Tour Calendar`}
        actions={null}
      >
        <div className="text-muted-foreground">Loading...</div>
      </AppShell>
    );
  }

  const slams = tournaments.filter((t) => t.category === "Grand Slam");

  const masters = tournaments.filter((t) => t.category === "Masters 1000");

  console.log("SLAMS:", slams);
  

  return (
    <AppShell
      title="Tournaments"
      eyebrow={`${year} Tour Calendar`}
      actions={<AddTournamentDialog seasonId={season._id} year={year} />}
    >
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
            <TournamentCard key={t._id} tournament={toTournament(t, year)} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-baseline gap-3">
          <h2 className="font-display text-2xl uppercase tracking-wide">
            Masters 1000
          </h2>

          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            9 · 1000 pts each
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {masters.map((t) => (
            <TournamentCard key={t._id} tournament={toTournament(t, year)} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
