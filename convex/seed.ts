import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// =========================
// Types
// =========================

type SeasonStatus = "Upcoming" | "Active" | "Completed";

type SeasonSeed = {
  year: number;
  label: string;
  status: SeasonStatus;
};

type TournamentTemplate = {
  name: string;
  shortName: string;
  city: string;
  country: string;
  surface: "Hard" | "Clay" | "Grass";
  category: "Grand Slam" | "Masters 1000";
  startDate: string; // template base year = 2026
  endDate: string;   // template base year = 2026
  points: number;
};

// =========================
// Helpers
// =========================

function replaceYear(date: string, targetYear: number) {
  const [, month, day] = date.split("-");
  return `${targetYear}-${month}-${day}`;
}

// =========================
// Seed
// =========================

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Prevent duplicate seed
    const existingPlayers = await ctx.db.query("players").take(1);

    if (existingPlayers.length > 0) {
      return {
        success: false,
        message: "Database already seeded",
      };
    }

    // =========================
    // Seasons
    // =========================

    const seasonsData: SeasonSeed[] = [
      { year: 2026, label: "2026 Season", status: "Active" },
      { year: 2027, label: "2027 Season", status: "Upcoming" },
      { year: 2028, label: "2028 Season", status: "Upcoming" },
      { year: 2029, label: "2029 Season", status: "Upcoming" },
    ];

    const seasonIds: Record<number, Id<"seasons">> = {};

    for (const season of seasonsData) {
      const id = await ctx.db.insert("seasons", season);
      seasonIds[season.year] = id;
    }

    const season2026Id = seasonIds[2026];
    const season2027Id = seasonIds[2027];
    const season2028Id = seasonIds[2028];
    const season2029Id = seasonIds[2029];

    // =========================
    // Players
    // =========================

    const p1 = await ctx.db.insert("players", {
      name: "Amr Ashraf",
      shortName: "A. Ashraf",
      country: "Egypt",
      countryCode: "EGY",
      hand: "Right",
      age: 22,
      height: "1.88m",
      color: "oklch(0.78 0.20 138)",
      initials: "AA",
    });

    const p2 = await ctx.db.insert("players", {
      name: "Khalid Ashraf",
      shortName: "K. Ashraf",
      country: "Egypt",
      countryCode: "EGY",
      hand: "Right",
      age: 22,
      height: "1.91m",
      color: "oklch(0.72 0.16 50)",
      initials: "KA",
    });

    // =========================
    // Rankings (initial 2026 ranking only)
    // =========================

    await ctx.db.insert("rankings", {
      seasonId: season2026Id,
      playerId: p1,
      rank: 1,
      points: 0,
      titles: 0,
      matchesWon: 0,
      matchesLost: 0,
    });

    await ctx.db.insert("rankings", {
      seasonId: season2026Id,
      playerId: p2,
      rank: 2,
      points: 0,
      titles: 0,
      matchesWon: 0,
      matchesLost: 0,
    });

    // =========================
    // Tournament templates (base year = 2026)
    // =========================

    const tournamentTemplates: TournamentTemplate[] = [
      {
        name: "Australian Open",
        shortName: "AO",
        city: "Melbourne",
        country: "Australia",
        surface: "Hard",
        category: "Grand Slam",
        startDate: "2026-01-15",
        endDate: "2026-01-28",
        points: 2000,
      },
      {
        name: "Indian Wells Open",
        shortName: "Indian Wells",
        city: "Indian Wells",
        country: "USA",
        surface: "Hard",
        category: "Masters 1000",
        startDate: "2026-03-06",
        endDate: "2026-03-17",
        points: 1000,
      },
      {
        name: "Miami Open",
        shortName: "Miami",
        city: "Miami",
        country: "USA",
        surface: "Hard",
        category: "Masters 1000",
        startDate: "2026-03-20",
        endDate: "2026-03-31",
        points: 1000,
      },
      {
        name: "Monte-Carlo Masters",
        shortName: "Monte Carlo",
        city: "Monte Carlo",
        country: "Monaco",
        surface: "Clay",
        category: "Masters 1000",
        startDate: "2026-04-07",
        endDate: "2026-04-14",
        points: 1000,
      },
      {
        name: "Madrid Open",
        shortName: "Madrid",
        city: "Madrid",
        country: "Spain",
        surface: "Clay",
        category: "Masters 1000",
        startDate: "2026-04-25",
        endDate: "2026-05-05",
        points: 1000,
      },
      {
        name: "Italian Open",
        shortName: "Rome",
        city: "Rome",
        country: "Italy",
        surface: "Clay",
        category: "Masters 1000",
        startDate: "2026-05-08",
        endDate: "2026-05-19",
        points: 1000,
      },
      {
        name: "Roland Garros",
        shortName: "Roland Garros",
        city: "Paris",
        country: "France",
        surface: "Clay",
        category: "Grand Slam",
        startDate: "2026-05-26",
        endDate: "2026-06-09",
        points: 2000,
      },
      {
        name: "Wimbledon",
        shortName: "Wimbledon",
        city: "London",
        country: "United Kingdom",
        surface: "Grass",
        category: "Grand Slam",
        startDate: "2026-07-01",
        endDate: "2026-07-14",
        points: 2000,
      },
      {
        name: "Canadian Open",
        shortName: "Canada",
        city: "Toronto",
        country: "Canada",
        surface: "Hard",
        category: "Masters 1000",
        startDate: "2026-08-05",
        endDate: "2026-08-11",
        points: 1000,
      },
      {
        name: "Cincinnati Open",
        shortName: "Cincinnati",
        city: "Cincinnati",
        country: "USA",
        surface: "Hard",
        category: "Masters 1000",
        startDate: "2026-08-12",
        endDate: "2026-08-19",
        points: 1000,
      },
      {
        name: "US Open",
        shortName: "US Open",
        city: "New York",
        country: "USA",
        surface: "Hard",
        category: "Grand Slam",
        startDate: "2026-08-26",
        endDate: "2026-09-08",
        points: 2000,
      },
      {
        name: "Shanghai Masters",
        shortName: "Shanghai",
        city: "Shanghai",
        country: "China",
        surface: "Hard",
        category: "Masters 1000",
        startDate: "2026-10-02",
        endDate: "2026-10-13",
        points: 1000,
      },
      {
        name: "Paris Masters",
        shortName: "Paris",
        city: "Paris",
        country: "France",
        surface: "Hard",
        category: "Masters 1000",
        startDate: "2026-10-28",
        endDate: "2026-11-03",
        points: 1000,
      },
    ];

    // =========================
    // Seed tournaments for all seasons
    // =========================

    const seasonsToSeed = [
      { year: 2026, seasonId: season2026Id },
      { year: 2027, seasonId: season2027Id },
      { year: 2028, seasonId: season2028Id },
      { year: 2029, seasonId: season2029Id },
    ];

    for (const season of seasonsToSeed) {
      for (const tournament of tournamentTemplates) {
        await ctx.db.insert("tournaments", {
          seasonId: season.seasonId,
          name: tournament.name,
          shortName: tournament.shortName,
          city: tournament.city,
          country: tournament.country,
          surface: tournament.surface,
          category: tournament.category,
          startDate: replaceYear(tournament.startDate, season.year),
          endDate: replaceYear(tournament.endDate, season.year),
          status: "Upcoming",
          points: tournament.points,
        });
      }
    }

    // =========================
    // Result
    // =========================

    return {
      success: true,
      seasons: seasonsData.length,
      players: 2,
      rankings: 2,
      tournaments: tournamentTemplates.length * seasonsToSeed.length, // 13 * 4 = 52
    };
  },
});