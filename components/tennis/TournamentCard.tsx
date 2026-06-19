import Link from "next/link";
import { SurfaceBadge } from "./SurfaceBadge";
import { Calendar, MapPin, Medal, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type PlayerPreview = {
  _id?: string;
  name: string;
  shortName?: string;
};

type TournamentCardTournament = {
  _id?: string;
  id?: string;

  seasonYear?: number;

  name: string;
  shortName?: string;
  city: string;
  country: string;

  surface: "Hard" | "Clay" | "Grass";
  category: "Grand Slam" | "Masters 1000";

  startDate?: string;
  month?: string;

  status: "Upcoming" | "In Progress" | "Completed";

  points: number;

  champion?: PlayerPreview | null;
  runnerUp?: PlayerPreview | null;

  finalScore?: string;
};

function getId(t: TournamentCardTournament) {
  return t._id ?? t.id;
}

function getMonth(t: TournamentCardTournament) {
  if (t.month) return t.month;
  if (!t.startDate) return "TBA";

  const d = new Date(t.startDate);
  return Number.isNaN(d.getTime())
    ? "TBA"
    : d.toLocaleString("en", { month: "short" });
}

function getPlayer(p?: PlayerPreview | null) {
  return p?.name ?? p?.shortName ?? "TBD";
}

export function TournamentCard({
  tournament,
}: {
  tournament: TournamentCardTournament;
}) {
  const id = getId(tournament);
  const month = getMonth(tournament);

  const champion = tournament.champion ?? null;
  const runnerUp = tournament.runnerUp ?? null;
  console.log("champion : ",champion)

  const isCompleted = tournament.status === "Completed";
  const isSlam = tournament.category === "Grand Slam";


  const href = id
    ? `/tournaments/${id}${
        tournament.seasonYear
          ? `?year=${tournament.seasonYear}`
          : ""
      }`
    : "/tournaments";

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-lg border border-border/60 bg-card/60 p-5 backdrop-blur transition-all hover:border-court/60 hover:bg-card"
    >
      {/* glow */}
      <div
        className={cn(
          "absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full opacity-20 blur-2xl",
          isSlam ? "bg-court" : "bg-[oklch(0.7_0.14_50)]"
        )}
      />

      {/* header */}
      <div className="relative flex justify-between">
        <div>
          <div className="flex items-center gap-2">
            <SurfaceBadge surface={tournament.surface} />

            <span
              className={cn(
                "rounded-sm border px-2 py-0.5 text-[10px] uppercase",
                isSlam
                  ? "border-court/50 bg-court/10 text-court"
                  : "border-border bg-muted/40 text-muted-foreground"
              )}
            >
              {tournament.category}
            </span>
          </div>

          <h3 className="mt-3 font-display text-2xl uppercase">
            {tournament.name}
          </h3>

          <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="size-3" />
              {tournament.city}, {tournament.country}
            </span>

            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              {month}
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] uppercase text-muted-foreground">
            {tournament.status}
          </div>
          <div className="mt-1 font-display text-lg text-court">
            {tournament.points} pts
          </div>
        </div>
      </div>

      {/* RESULT */}
      {isCompleted && champion ? (
        <div className="mt-5 space-y-2 rounded-md border border-border/40 bg-background/50 px-3 py-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="size-4 text-court" />
              <span className="text-sm font-medium">
                {getPlayer(champion)}
              </span>
            </div>

            {tournament.finalScore && (
              <span className="text-xs font-mono text-muted-foreground">
                {tournament.finalScore}
              </span>
            )}
          </div>

          {runnerUp && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Medal className="size-3.5" />
              Runner-up: {getPlayer(runnerUp)}
            </div>
          )}
        </div>
      ) : isCompleted ? (
        <div className="mt-5 text-center text-xs text-muted-foreground">
          Completed
        </div>
      ) : tournament.status === "In Progress" ? (
        <div className="mt-5 text-center text-xs text-muted-foreground">
          Tournament in progress
        </div>
      ) : (
        <div className="mt-5 text-center text-xs text-muted-foreground">
          Upcoming · Draw to be released
        </div>
      )}
    </Link>
  );
}