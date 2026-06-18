
"use client";
import {
  ALL_MATCHES,
  ALL_TOURNAMENTS,
  getPlayer,
  headToHead,
  PLAYERS,
} from "@/lib/tennis-data";
import { AppShell } from "@/components/ui/tennis/AppShell";
import { PlayerAvatar } from "@/components/ui/tennis/PlayerAvatar";
import { MatchCard } from "@/components/ui/tennis/MatchCard";
import { H2HBarChart } from "@/components/ui/tennis/Charts";


export default function HeadToHeadPage() {
  const h = headToHead();

  const p1 = getPlayer("p1");
  const p2 = getPlayer("p2");

  if (!p1 || !p2) {
    return (
      <AppShell title="Head-to-Head" eyebrow="The Rivalry">
        <div className="rounded-xl border border-border/60 bg-card/60 p-6">
          Players not found.
        </div>
      </AppShell>
    );
  }

  const recent = [...ALL_MATCHES]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 6);

  const longest = [...ALL_MATCHES].sort(
    (a, b) => b.durationMin - a.durationMin
  )[0];

  const biggest = [...ALL_MATCHES].sort(
    (a, b) => b.sets.length - a.sets.length
  )[0];

  const data = [
    {
      surface: "Hard",
      p1: h.bySurface.Hard.p1,
      p2: h.bySurface.Hard.p2,
    },
    {
      surface: "Clay",
      p1: h.bySurface.Clay.p1,
      p2: h.bySurface.Clay.p2,
    },
    {
      surface: "Grass",
      p1: h.bySurface.Grass.p1,
      p2: h.bySurface.Grass.p2,
    },
  ];

  const p1Percentage =
    h.total > 0 ? (h.p1Wins / h.total) * 100 : 50;

  const p2Percentage =
    h.total > 0 ? (h.p2Wins / h.total) * 100 : 50;

  return (
    <AppShell title="Head-to-Head" eyebrow="The Rivalry">
      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card/60 p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-center">
          <div className="text-center md:text-left">
            <PlayerAvatar
              player={p1}
              size="xl"
              className="mx-auto md:mx-0"
            />

            <div className="mt-2 font-display text-3xl uppercase">
              {p1.name}
            </div>

            <div className="text-xs text-muted-foreground">
              {p1.country}
            </div>
          </div>

          <div className="text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              All-Time
            </div>

            <div className="mt-2 font-display text-7xl tabular-nums">
              <span style={{ color: p1.color }}>
                {h.p1Wins}
              </span>

              <span className="mx-3 text-muted-foreground">
                ·
              </span>

              <span style={{ color: p2.color }}>
                {h.p2Wins}
              </span>
            </div>

            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {h.total} meetings
            </div>
          </div>

          <div className="text-center md:text-right">
            <PlayerAvatar
              player={p2}
              size="xl"
              className="mx-auto md:ml-auto md:mr-0"
            />

            <div className="mt-2 font-display text-3xl uppercase">
              {p2.name}
            </div>

            <div className="text-xs text-muted-foreground">
              {p2.country}
            </div>
          </div>
        </div>

        <div className="mt-6 flex overflow-hidden rounded-full bg-muted/30">
          <div
            className="h-2"
            style={{
              width: `${p1Percentage}%`,
              backgroundColor: p1.color,
            }}
          />

          <div
            className="h-2"
            style={{
              width: `${p2Percentage}%`,
              backgroundColor: p2.color,
            }}
          />
        </div>
      </div>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {(["Hard", "Clay", "Grass"] as const).map((surface) => {
          const stats = h.bySurface[surface];
          const total = stats.p1 + stats.p2;

          return (
            <div
              key={surface}
              className="rounded-xl border border-border/60 bg-card/60 p-5"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {surface} Court
              </div>

              <div className="mt-2 flex items-baseline justify-between">
                <span
                  className="font-display text-3xl"
                  style={{ color: p1.color }}
                >
                  {stats.p1}
                </span>

                <span className="font-mono text-xs text-muted-foreground">
                  vs
                </span>

                <span
                  className="font-display text-3xl"
                  style={{ color: p2.color }}
                >
                  {stats.p2}
                </span>
              </div>

              <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-muted/40">
                <div
                  style={{
                    backgroundColor: p1.color,
                    width: `${
                      total > 0
                        ? (stats.p1 / total) * 100
                        : 50
                    }%`,
                  }}
                />

                <div
                  style={{
                    backgroundColor: p2.color,
                    width: `${
                      total > 0
                        ? (stats.p2 / total) * 100
                        : 50
                    }%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border/60 bg-card/60 p-5 lg:col-span-2">
          <h3 className="font-display text-lg uppercase tracking-wide">
            Surface Trend
          </h3>

          <div className="mt-3">
            <H2HBarChart data={data} />
          </div>
        </div>

        <div className="rounded-xl border border-border/60 bg-card/60 p-5">
          <h3 className="font-display text-lg uppercase tracking-wide">
            Milestones
          </h3>

          <div className="mt-3 space-y-3 text-sm">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Longest Match
              </div>

              <div className="font-medium">
                {
                  ALL_TOURNAMENTS.find(
                    (t) => t.id === longest?.tournamentId
                  )?.shortName
                }{" "}
                · {Math.floor(longest.durationMin / 60)}h{" "}
                {longest.durationMin % 60}m
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Biggest Stage
              </div>

              <div className="font-medium">
                {
                  ALL_TOURNAMENTS.find(
                    (t) => t.id === biggest?.tournamentId
                  )?.name
                }
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Win % {p1.shortName}
              </div>

              <div className="font-display text-2xl text-court">
                {Math.round(p1Percentage)}%
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h3 className="font-display text-lg uppercase tracking-wide">
          Recent Meetings
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {recent.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
            />
          ))}
        </div>
      </section>

      <div className="hidden">
        {PLAYERS.length}
      </div>
    </AppShell>
  );
}