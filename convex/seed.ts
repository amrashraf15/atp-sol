import { mutation } from "./_generated/server";

export const seed = mutation(async (ctx) => {
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
    age: 26,
    height: "1.91m",
    color: "oklch(0.72 0.16 50)",
    initials: "KA",
  });

  const ao = await ctx.db.insert("tournaments", {
    name: "Australian Open",
    shortName: "AO",
    city: "Melbourne",
    country: "Australia",
    surface: "Hard",
    category: "Grand Slam",
    startDate: "2026-01-15",
    endDate: "2026-01-28",
    seasonYear: 2026,
    status: "Completed",
    points: 2000,
    championId: p1,
    runnerUpId: p2,
    finalScore: "6-4, 3-6, 7-6, 6-3",
  });

  await ctx.db.insert("matches", {
    tournamentId: ao,
    round: "F",
    date: "2026-01-28",
    player1Id: p1,
    player2Id: p2,
    winnerId: p1,
    sets: [],
    durationMin: 140,
    stats: {},
    status: "Completed",
  });
});