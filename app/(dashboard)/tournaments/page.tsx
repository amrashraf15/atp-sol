"use client";
import { AppShell } from "@/components/ui/tennis/AppShell";
import { TournamentCard } from "@/components/ui/tennis/TournamentCard";
import { useSeason } from "@/lib/SeasonContext";
import { tournamentsBySeason } from "@/lib/tennis-data";
export default function TournamentsPage() {
  const { year } = useSeason();

  const tours = tournamentsBySeason(year);

  const slams = tours.filter(
    (t) => t.category === "Grand Slam"
  );

  const masters = tours.filter(
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
            <TournamentCard key={t.id} tournament={t} />
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
            <TournamentCard key={t.id} tournament={t} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}