import type { Id } from "@/convex/_generated/dataModel";
import type { Tournament } from "@/lib/tennis-data";

type PlayerPreview = {
  _id: Id<"players">;
  name: string;
  shortName?: string;
};

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

  champion?: PlayerPreview | null;
  runnerUp?: PlayerPreview | null;

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

    month: start.toLocaleString("en", {
      month: "long",
    }),

    championId: t.championId,
    runnerUpId: t.runnerUpId,

    champion: t.champion ?? null,
    runnerUp: t.runnerUp ?? null,

    finalScore: t.finalScore,

    status: t.status,
    points: t.points,
  };
}