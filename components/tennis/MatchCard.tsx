import Link from "next/link";

import { Clock, Trophy } from "lucide-react";

import { cn } from "@/lib/utils";
import { SurfaceBadge } from "./SurfaceBadge";

interface MatchCardProps {
  match: {
    _id: string;

    round: string;
    date: string;

    player1Id: string;
    player2Id: string;
    winnerId: string;

    durationMin: number;

    sets: {
      p1: number;
      p2: number;
    }[];

    player1: {
      name: string;
      shortName: string;
      color: string;
    } | null;

    player2: {
      name: string;
      shortName: string;
      color: string;
    } | null;

    tournament: {
      shortName: string;
      surface: "Hard" | "Clay" | "Grass";
    } | null;
  };
}

export function MatchCard({
  match,
}: MatchCardProps) {
  if (
    !match.player1 ||
    !match.player2 ||
    !match.tournament
  ) {
    return null;
  }

  const winnerIsPlayer1 =
    match.winnerId === match.player1Id;

  const rows = [
    {
      player: match.player1,
      winner: winnerIsPlayer1,
      sets: match.sets.map((set) => set.p1),
    },
    {
      player: match.player2,
      winner: !winnerIsPlayer1,
      sets: match.sets.map((set) => set.p2),
    },
  ];

  return (
    <Link
      href={`/matches/${match._id}`}
      className="group block rounded-lg border border-border/60 bg-card/60 p-4 transition-colors hover:border-court/50"
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        <div className="flex items-center gap-2">
          <SurfaceBadge
            surface={match.tournament.surface}
          />

          <span className="font-display">
            {match.tournament.shortName}
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