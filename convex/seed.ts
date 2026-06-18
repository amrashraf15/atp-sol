import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Prevent duplicate seed
    const existingPlayers = await ctx.db.query("players").collect();

    if (existingPlayers.length > 0) {
      return {
        success: false,
        message: "Database already seeded",
      };
    }

    // =========================
    // Season
    // =========================

    const season2026 = await ctx.db.insert("seasons", {
      year: 2026,
      label: "2026 Season",
      status: "Active",
    });

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
    // Initial Rankings
    // =========================

    await ctx.db.insert("rankings", {
      seasonId: season2026,
      playerId: p1,
      rank: 1,
      points: 0,
      titles: 0,
      matchesWon: 0,
      matchesLost: 0,
    });

    await ctx.db.insert("rankings", {
      seasonId: season2026,
      playerId: p2,
      rank: 2,
      points: 0,
      titles: 0,
      matchesWon: 0,
      matchesLost: 0,
    });

    // =========================
    // Tournaments
    // =========================

    const tournaments = [
      {
        name: "Australian Open",
        shortName: "AO",
        city: "Melbourne",
        country: "Australia",
        surface: "Hard" as const,
        category: "Grand Slam" as const,
        startDate: "2026-01-15",
        endDate: "2026-01-28",
        points: 2000,
      },
      {
        name: "Indian Wells Open",
        shortName: "Indian Wells",
        city: "Indian Wells",
        country: "USA",
        surface: "Hard" as const,
        category: "Masters 1000" as const,
        startDate: "2026-03-06",
        endDate: "2026-03-17",
        points: 1000,
      },
      {
        name: "Miami Open",
        shortName: "Miami",
        city: "Miami",
        country: "USA",
        surface: "Hard" as const,
        category: "Masters 1000" as const,
        startDate: "2026-03-20",
        endDate: "2026-03-31",
        points: 1000,
      },
      {
        name: "Monte-Carlo Masters",
        shortName: "Monte Carlo",
        city: "Monte Carlo",
        country: "Monaco",
        surface: "Clay" as const,
        category: "Masters 1000" as const,
        startDate: "2026-04-07",
        endDate: "2026-04-14",
        points: 1000,
      },
      {
        name: "Madrid Open",
        shortName: "Madrid",
        city: "Madrid",
        country: "Spain",
        surface: "Clay" as const,
        category: "Masters 1000" as const,
        startDate: "2026-04-25",
        endDate: "2026-05-05",
        points: 1000,
      },
      {
        name: "Italian Open",
        shortName: "Rome",
        city: "Rome",
        country: "Italy",
        surface: "Clay" as const,
        category: "Masters 1000" as const,
        startDate: "2026-05-08",
        endDate: "2026-05-19",
        points: 1000,
      },
      {
        name: "Roland Garros",
        shortName: "Roland Garros",
        city: "Paris",
        country: "France",
        surface: "Clay" as const,
        category: "Grand Slam" as const,
        startDate: "2026-05-26",
        endDate: "2026-06-09",
        points: 2000,
      },
      {
        name: "Wimbledon",
        shortName: "Wimbledon",
        city: "London",
        country: "United Kingdom",
        surface: "Grass" as const,
        category: "Grand Slam" as const,
        startDate: "2026-07-01",
        endDate: "2026-07-14",
        points: 2000,
      },
      {
        name: "Canadian Open",
        shortName: "Canada",
        city: "Toronto",
        country: "Canada",
        surface: "Hard" as const,
        category: "Masters 1000" as const,
        startDate: "2026-08-05",
        endDate: "2026-08-11",
        points: 1000,
      },
      {
        name: "Cincinnati Open",
        shortName: "Cincinnati",
        city: "Cincinnati",
        country: "USA",
        surface: "Hard" as const,
        category: "Masters 1000" as const,
        startDate: "2026-08-12",
        endDate: "2026-08-19",
        points: 1000,
      },
      {
        name: "US Open",
        shortName: "US Open",
        city: "New York",
        country: "USA",
        surface: "Hard" as const,
        category: "Grand Slam" as const,
        startDate: "2026-08-26",
        endDate: "2026-09-08",
        points: 2000,
      },
      {
        name: "Shanghai Masters",
        shortName: "Shanghai",
        city: "Shanghai",
        country: "China",
        surface: "Hard" as const,
        category: "Masters 1000" as const,
        startDate: "2026-10-02",
        endDate: "2026-10-13",
        points: 1000,
      },
      {
        name: "Paris Masters",
        shortName: "Paris",
        city: "Paris",
        country: "France",
        surface: "Hard" as const,
        category: "Masters 1000" as const,
        startDate: "2026-10-28",
        endDate: "2026-11-03",
        points: 1000,
      },
    ];

    for (const tournament of tournaments) {
      await ctx.db.insert("tournaments", {
        seasonId: season2026,

        name: tournament.name,
        shortName: tournament.shortName,

        city: tournament.city,
        country: tournament.country,

        surface: tournament.surface,
        category: tournament.category,

        startDate: tournament.startDate,
        endDate: tournament.endDate,

        status: "Upcoming",

        points: tournament.points,
      });
    }

    return {
      success: true,
      season: 2026,
      players: 2,
      rankings: 2,
      tournaments: tournaments.length,
    };
  },
});