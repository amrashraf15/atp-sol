"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { AppShell } from "@/components/tennis/AppShell";
import { SurfaceBadge } from "@/components/tennis/SurfaceBadge";
import { ArrowLeft, Clock, Trophy } from "lucide-react";
import { PlayerAvatar } from "@/components/tennis/PlayerAvatar";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function MatchDetailPage({
  params,
}: Props) {
  const { id } = use(params);

  const match = useQuery(
    api.matches.getMatchDetails,
    {
      matchId: id as Id<"matches">,
    }
  );

  if (match === undefined) {
    return (
      <AppShell
        title="Loading..."
        eyebrow="Match"
      >
        <div className="text-center py-10">
          Loading match...
        </div>
      </AppShell>
    );
  }

  if (match === null) {
    notFound();
  }

  const p1 = match.player1;
  const p2 = match.player2;
  const t = match.tournament;
  const winner = match.winner;

  if (!p1 || !p2 || !t || !winner) {
    notFound();
  }

  const winnerIs1 =
    match.winnerId === match.player1Id;

  const seasonYear = new Date(
    match.date
  ).getFullYear();

  const statRow = (
    label: string,
    a: string | number,
    b: string | number
  ) => (
    <div className="grid grid-cols-7 items-center gap-2 py-3 border-t border-border/40">
      <div className="col-span-2 text-right font-display text-xl tabular-nums">
        {a}
      </div>

      <div className="col-span-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>

      <div className="col-span-2 text-left font-display text-xl tabular-nums">
        {b}
      </div>
    </div>
  );

  return (
    <AppShell
      title={`${t.shortName} · ${
        match.round === "F"
          ? "Final"
          : match.round
      }`}
      eyebrow={`${seasonYear} Season`}
    >
      <Link
        href="/matches"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" />
        All matches
      </Link>

      <div className="relative mt-4 overflow-hidden rounded-xl border border-court/30 bg-linear-to-br from-card to-background p-8 court-grid">
        <div className="absolute inset-0 bg-linear-to-r from-court/10 via-transparent to-[oklch(0.72_0.16_50/0.10)]" />

        <div className="relative flex items-center justify-between gap-4">
          <SurfaceBadge surface={t.surface} />

          <span className="font-mono text-xs text-muted-foreground">
            {match.date}
          </span>
        </div>

        <div className="relative mt-6 grid grid-cols-3 items-center gap-4">
          {[
            {
              p: p1,
              win: winnerIs1,
              side: "left" as const,
            },

            null,

            {
              p: p2,
              win: !winnerIs1,
              side: "right" as const,
            },
          ].map((x) =>
            x === null ? (
              <div
                key="vs"
                className="text-center"
              >
                <div className="font-display text-5xl text-muted-foreground">
                  vs
                </div>

                <div className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <Clock className="size-3" />

                  {Math.floor(
                    match.durationMin / 60
                  )}
                  h{" "}
                  {match.durationMin % 60}
                  m
                </div>
              </div>
            ) : (
              <div
                key={x.p._id}
                className={cn(
                  "flex flex-col items-center text-center",
                  x.side === "right" &&
                    "md:items-end"
                )}
              >
                <PlayerAvatar
                  player={x.p}
                  size="xl"
                  className={
                    x.win
                      ? "glow-court"
                      : ""
                  }
                />

                <div className="mt-3 font-display text-2xl uppercase">
                  {x.p.name}
                </div>

                <div className="text-xs text-muted-foreground">
                  {x.p.country}
                </div>

                {x.win && (
                  <div className="mt-2 inline-flex items-center gap-1 rounded-sm border border-court/40 bg-court/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-court">
                    <Trophy className="size-3" />
                    Winner
                  </div>
                )}
              </div>
            )
          )}
        </div>

        <div className="relative mt-8 flex justify-center gap-3">
          {match.sets.map((s, i) => (
            <div
              key={i}
              className="rounded-md border border-border/60 bg-background/70 px-4 py-3 text-center"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Set {i + 1}
              </div>

              <div className="font-display text-3xl tabular-nums">
                <span
                  className={
                    winnerIs1
                      ? "text-court"
                      : ""
                  }
                >
                  {s.p1}
                </span>

                <span className="text-muted-foreground">
                  -
                </span>

                <span
                  className={
                    !winnerIs1
                      ? "text-court"
                      : ""
                  }
                >
                  {s.p2}
                </span>
              </div>

              {s.tiebreak && (
                <div className="font-mono text-[10px] text-muted-foreground">
                  TB {s.tiebreak.p1}-
                  {s.tiebreak.p2}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border/60 bg-card/60 p-5">
        <div className="mb-4 grid grid-cols-7 gap-2 text-center">
          <div className="col-span-2 font-display text-sm uppercase tracking-wide">
            {p1.shortName}
          </div>

          <div className="col-span-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Match Statistics
          </div>

          <div className="col-span-2 font-display text-sm uppercase tracking-wide">
            {p2.shortName}
          </div>
        </div>

        {statRow(
          "Aces",
          match.stats.aces[0],
          match.stats.aces[1]
        )}

        {statRow(
          "Double Faults",
          match.stats.doubleFaults[0],
          match.stats.doubleFaults[1]
        )}

        {statRow(
          "1st Serve %",
          `${match.stats.firstServePct[0]}%`,
          `${match.stats.firstServePct[1]}%`
        )}

        {statRow(
          "Break Points Won",
          `${match.stats.breakPointsWon[0].won}/${match.stats.breakPointsWon[0].total}`,
          `${match.stats.breakPointsWon[1].won}/${match.stats.breakPointsWon[1].total}`
        )}

        {statRow(
          "Winners",
          match.stats.winnersCount[0],
          match.stats.winnersCount[1]
        )}

        {statRow(
          "Unforced Errors",
          match.stats.unforcedErrors[0],
          match.stats.unforcedErrors[1]
        )}
      </div>

      <div className="mt-4 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Match won by {winner.name}
      </div>
    </AppShell>
  );
}