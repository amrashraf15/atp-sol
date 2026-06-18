import type { Id } from "@/convex/_generated/dataModel";
import type { Tournament } from "@/lib/tennis-data";

type ConvexTournament = {
  _id: Id<"tournaments">;
  name: string;
  shortName: string;
  city: string;
  country: string;
  surface: "Hard" | "Clay" | "Grass";
  category: "Grand Slam" | "Masters 1000";
  startDate: string;
  endDate: string;
  status: "Upcoming" | "In Progress" | "Completed";
  points: number;
  championId?: Id<"players">;
  runnerUpId?: Id<"players">;
  finalScore?: string;
  seasonId: Id<"seasons">;
};

export function toTournament(
  t: ConvexTournament,
  seasonYear: number
): Tournament {
  const start = new Date(t.startDate);

  return {
    id: t._id,
    name: t.name,
    shortName: t.shortName,
    city: t.city,
    country: t.country,
    surface: t.surface,
    category: t.category,
    startDate: t.startDate,
    endDate: t.endDate,
    seasonYear,
    month: start.toLocaleString("en", { month: "long" }),
    championId: t.championId,
    runnerUpId: t.runnerUpId,
    finalScore: t.finalScore,
    status: t.status === "In Progress" ? "Upcoming" : t.status, // optional normalization
    points: t.points,
  };
}