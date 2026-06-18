import Link from "next/link";

import type { Match } from "@/lib/tennis-data";
import { ALL_TOURNAMENTS, getPlayer } from "@/lib/tennis-data";



import { Clock, Trophy } from "lucide-react";

import { cn } from "@/lib/utils";
import { SurfaceBadge } from "./SurfaceBadge";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const year = Number.parseInt(
    match.date.slice(0, 4),
    10
  );

  const tournament = ALL_TOURNAMENTS.find(
    (t) =>
      t.id === match.tournamentId &&
      t.seasonYear === year
  );

  const player1 = getPlayer(match.player1Id);
  const player2 = getPlayer(match.player2Id);

  if (!tournament || !player1 || !player2) {
    return null;
  }

  const winnerIsPlayer1 =
    match.winnerId === match.player1Id;

  const rows = [
    {
      player: player1,
      winner: winnerIsPlayer1,
      sets: match.sets.map((set) => set.p1),
    },
    {
      player: player2,
      winner: !winnerIsPlayer1,
      sets: match.sets.map((set) => set.p2),
    },
  ];

  return (
    <Link
      href={`/matches/${match.id}`}
      className="group block rounded-lg border border-border/60 bg-card/60 p-4 transition-colors hover:border-court/50"
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        <div className="flex items-center gap-2">
          <SurfaceBadge
            surface={tournament.surface}
          />

          <span className="font-display">
            {tournament.shortName}
          </span>

          <span>·</span>

          <span>
            {match.round === "F"
              ? "Final"
              : match.round}
          </span>
        </div>

        <span className="font-mono">
          {match.date}
        </span>
      </div>

      <div className="mt-3 space-y-1.5">
        {rows.map((row, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-between rounded-md px-3 py-2",
              row.winner
                ? "bg-court/10"
                : "bg-muted/20"
            )}
          >
            <div className="flex items-center gap-2">
              {row.winner ? (
                <Trophy className="size-3.5 text-court" />
              ) : (
                <span className="size-3.5" />
              )}

              <span
                className={cn(
                  "font-medium",
                  row.winner
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {row.player.shortName}
              </span>
            </div>

            <div className="flex gap-3 font-mono text-sm tabular-nums">
              {row.sets.map(
                (score, scoreIndex) => (
                  <span
                    key={scoreIndex}
                    className={cn(
                      "min-w-5 text-center",
                      row.winner
                        ? "text-court"
                        : "text-muted-foreground"
                    )}
                  >
                    {score}
                  </span>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground">
        <Clock className="size-3" />

        <span>
          {Math.floor(
            match.durationMin / 60
          )}
          h {match.durationMin % 60}m
        </span>
      </div>
    </Link>
  );
}