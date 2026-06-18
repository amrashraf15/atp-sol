import Link from "next/link";

import type { Tournament } from "@/lib/tennis-data";
import { getPlayer } from "@/lib/tennis-data";

import { SurfaceBadge } from "./SurfaceBadge";

import {
  Trophy,
  MapPin,
  Calendar,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface TournamentCardProps {
  tournament: Tournament;
}

export function TournamentCard({
  tournament,
}: TournamentCardProps) {
  const champion = tournament.championId
    ? getPlayer(tournament.championId)
    : null;

  const isSlam =
    tournament.category === "Grand Slam";

  return (
    <Link
      href={`/tournaments/${tournament.id}?year=${tournament.seasonYear}`}
      className="group relative block overflow-hidden rounded-lg border border-border/60 bg-card/60 p-5 backdrop-blur transition-all hover:border-court/60 hover:bg-card"
    >
      <div
        className={cn(
          "absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40",
          isSlam
            ? "bg-court"
            : "bg-[oklch(0.7_0.14_50)]"
        )}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <SurfaceBadge
              surface={tournament.surface}
            />

            <span
              className={cn(
                "rounded-sm border px-2 py-0.5 text-[10px] uppercase tracking-[0.15em]",
                isSlam
                  ? "border-court/50 bg-court/10 text-court"
                  : "border-border bg-muted/40 text-muted-foreground"
              )}
            >
              {tournament.category}
            </span>
          </div>

          <h3 className="mt-3 font-display text-2xl uppercase tracking-wide">
            {tournament.name}
          </h3>

          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3" />
              {tournament.city},{" "}
              {tournament.country}
            </span>

            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3" />
              {tournament.month}
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {tournament.status}
          </div>

          <div className="mt-1 font-display text-lg text-court">
            {tournament.points} pts
          </div>
        </div>
      </div>

      {champion ? (
        <div className="relative mt-5 flex items-center justify-between rounded-md border border-border/40 bg-background/50 px-3 py-2">
          <div className="flex items-center gap-2">
            <Trophy className="size-4 text-court" />

            <span className="text-sm font-medium">
              {champion.shortName}
            </span>
          </div>

          <span className="font-mono text-xs text-muted-foreground">
            {tournament.finalScore}
          </span>
        </div>
      ) : (
        <div className="relative mt-5 rounded-md border border-dashed border-border/40 px-3 py-2 text-center text-xs text-muted-foreground">
          Upcoming · Draw to be released
        </div>
      )}
    </Link>
  );
}