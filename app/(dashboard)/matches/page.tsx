"use client";
import { AppShell } from "@/components/ui/tennis/AppShell";
import { MatchCard } from "@/components/ui/tennis/MatchCard";
import { useSeason } from "@/lib/SeasonContext";
import { matchesBySeason } from "@/lib/tennis-data";




export default function MatchesPage() {
  const { year } = useSeason();

  const matches = matchesBySeason(year).sort((a, b) =>
    a.date < b.date ? 1 : -1
  );

  return (
    <AppShell title="Matches" eyebrow={`${year} · All finals`}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {matches.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
    </AppShell>
  );
}