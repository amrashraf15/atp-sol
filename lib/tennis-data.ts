export type Surface = "Hard" | "Clay" | "Grass";
export type TournamentCategory = "Grand Slam" | "Masters 1000";
export type MatchStatus = "Completed" | "Upcoming" | "Live";

export interface Player {
  id: string;
  name: string;
  shortName: string;
  country: string;
  countryCode: string;
  hand: "Right" | "Left";
  age: number;
  height: string;
  color: string; // accent color for charts
  initials: string;
}

export interface SetScore {
  p1: number;
  p2: number;
  tiebreak?: { p1: number; p2: number };
}

export interface MatchStats {
  aces: [number, number];
  doubleFaults: [number, number];
  firstServePct: [number, number];
  breakPointsWon: [string, string]; // e.g. "3/7"
  winnersCount: [number, number];
  unforcedErrors: [number, number];
}

export interface Match {
  id: string;
  tournamentId: string;
  round: string; // R32, R16, QF, SF, F
  date: string;
  player1Id: string;
  player2Id: string;
  winnerId: string;
  sets: SetScore[];
  durationMin: number;
  stats: MatchStats;
  status: MatchStatus;
}

export type PlayerPreview = {
  _id: string;
  name: string;
  shortName?: string;
};

export type Tournament = {
  id: string;

  name: string;
  shortName: string;

  city: string;
  country: string;

  surface: "Hard" | "Clay" | "Grass";
  category: "Grand Slam" | "Masters 1000";

  startDate: string;
  endDate: string;

  seasonYear: number;
  month: string;

  status: "Upcoming" | "In Progress" | "Completed";

  points: number;

  championId?: string;
  runnerUpId?: string;

  champion?: PlayerPreview | null;
  runnerUp?: PlayerPreview | null;

  finalScore?: string;
};

export interface RankingRow {
  rank: number;
  previousRank: number;
  playerId: string;
  points: number;
  titles: number;
  matchesWon: number;
  matchesLost: number;
}

export interface Season {
  year: number;
  label: string;
}

// --- Players ---
export const PLAYERS: Player[] = [
  {
    id: "p1",
    name: "Lucas Carter",
    shortName: "L. Carter",
    country: "United States",
    countryCode: "USA",
    hand: "Right",
    age: 27,
    height: "1.88m",
    color: "oklch(0.78 0.20 138)",
    initials: "LC",
  },
  {
    id: "p2",
    name: "Matteo Rinaldi",
    shortName: "M. Rinaldi",
    country: "Italy",
    countryCode: "ITA",
    hand: "Left",
    age: 26,
    height: "1.91m",
    color: "oklch(0.72 0.16 50)",
    initials: "MR",
  },
];

export const SEASONS: Season[] = [
  { year: 2026, label: "2026 Season" },
  { year: 2027, label: "2027 Season" },
  { year: 2028, label: "2028 Season" },
];

// --- Tournaments (one season template, reused per year) ---
type T = Omit<Tournament, "seasonYear" | "status" | "championId" | "runnerUpId" | "finalScore">;
const TOURNAMENT_TEMPLATE: T[] = [
  { id: "ao", name: "Australian Open", shortName: "AO", city: "Melbourne", country: "Australia", surface: "Hard", category: "Grand Slam", startDate: "01-15", endDate: "01-28", month: "January", points: 2000 },
  { id: "iw", name: "Indian Wells Open", shortName: "Indian Wells", city: "Indian Wells", country: "USA", surface: "Hard", category: "Masters 1000", startDate: "03-06", endDate: "03-17", month: "March", points: 1000 },
  { id: "mi", name: "Miami Open", shortName: "Miami", city: "Miami", country: "USA", surface: "Hard", category: "Masters 1000", startDate: "03-20", endDate: "03-31", month: "March", points: 1000 },
  { id: "mc", name: "Monte-Carlo Masters", shortName: "Monte Carlo", city: "Monte Carlo", country: "Monaco", surface: "Clay", category: "Masters 1000", startDate: "04-07", endDate: "04-14", month: "April", points: 1000 },
  { id: "ma", name: "Madrid Open", shortName: "Madrid", city: "Madrid", country: "Spain", surface: "Clay", category: "Masters 1000", startDate: "04-25", endDate: "05-05", month: "May", points: 1000 },
  { id: "ro", name: "Italian Open", shortName: "Rome", city: "Rome", country: "Italy", surface: "Clay", category: "Masters 1000", startDate: "05-08", endDate: "05-19", month: "May", points: 1000 },
  { id: "rg", name: "Roland Garros", shortName: "Roland Garros", city: "Paris", country: "France", surface: "Clay", category: "Grand Slam", startDate: "05-26", endDate: "06-09", month: "June", points: 2000 },
  { id: "wi", name: "Wimbledon", shortName: "Wimbledon", city: "London", country: "United Kingdom", surface: "Grass", category: "Grand Slam", startDate: "07-01", endDate: "07-14", month: "July", points: 2000 },
  { id: "ca", name: "Canadian Open", shortName: "Canada", city: "Toronto", country: "Canada", surface: "Hard", category: "Masters 1000", startDate: "08-05", endDate: "08-11", month: "August", points: 1000 },
  { id: "ci", name: "Cincinnati Open", shortName: "Cincinnati", city: "Cincinnati", country: "USA", surface: "Hard", category: "Masters 1000", startDate: "08-12", endDate: "08-19", month: "August", points: 1000 },
  { id: "us", name: "US Open", shortName: "US Open", city: "New York", country: "USA", surface: "Hard", category: "Grand Slam", startDate: "08-26", endDate: "09-08", month: "September", points: 2000 },
  { id: "sh", name: "Shanghai Masters", shortName: "Shanghai", city: "Shanghai", country: "China", surface: "Hard", category: "Masters 1000", startDate: "10-02", endDate: "10-13", month: "October", points: 1000 },
  { id: "pa", name: "Paris Masters", shortName: "Paris", city: "Paris", country: "France", surface: "Hard", category: "Masters 1000", startDate: "10-28", endDate: "11-03", month: "November", points: 1000 },
];

function buildTournaments(year: number): Tournament[] {
  // Deterministic scripted results per season
  const scripts: Record<number, Record<string, { winner: string; score: string }>> = {
    2026: {
      ao: { winner: "p1", score: "6-4, 3-6, 7-6(5), 6-3" },
      iw: { winner: "p2", score: "7-6(4), 6-4" },
      mi: { winner: "p1", score: "6-3, 6-4" },
      mc: { winner: "p2", score: "6-2, 6-4" },
      ma: { winner: "p2", score: "7-5, 6-3" },
      ro: { winner: "p2", score: "6-4, 7-6(3)" },
      rg: { winner: "p2", score: "6-3, 6-2, 6-4" },
      wi: { winner: "p1", score: "6-4, 3-6, 6-3, 7-6(5)" },
      ca: { winner: "p1", score: "6-2, 6-4" },
      ci: { winner: "p2", score: "7-5, 6-4" },
      us: { winner: "p1", score: "6-3, 4-6, 6-4, 6-7(3), 7-5" },
      sh: { winner: "p1", score: "6-4, 6-3" },
      pa: { winner: "p1", score: "6-3, 7-5" },
    },
    2027: {
      ao: { winner: "p2", score: "6-4, 6-3, 6-4" },
      iw: { winner: "p1", score: "7-6(5), 6-4" },
      mi: { winner: "p2", score: "6-3, 7-6(2)" },
      mc: { winner: "p2", score: "6-4, 6-2" },
      ma: { winner: "p1", score: "7-5, 6-7(4), 6-3" },
      ro: { winner: "p2", score: "6-3, 6-4" },
      rg: { winner: "p2", score: "6-2, 6-4, 7-5" },
      wi: { winner: "p1", score: "7-6(4), 6-4, 6-3" },
      ca: { winner: "p2", score: "6-4, 7-5" },
      ci: { winner: "p1", score: "6-3, 6-4" },
      us: { winner: "p1", score: "6-4, 6-3, 7-6(5)" },
      sh: { winner: "p2", score: "6-4, 6-4" },
      pa: { winner: "p1", score: "7-5, 6-4" },
    },
    2028: {},
  };
  const script = scripts[year] ?? {};
  return TOURNAMENT_TEMPLATE.map((t) => {
    const s = script[t.id];
    const completed = !!s;
    return {
      ...t,
      seasonYear: year,
      startDate: `${year}-${t.startDate}`,
      endDate: `${year}-${t.endDate}`,
      status: (completed ? "Completed" : "Upcoming") as "Completed" | "Upcoming",
      championId: s?.winner,
      runnerUpId: s ? (s.winner === "p1" ? "p2" : "p1") : undefined,
      finalScore: s?.score,
    };
  });
}

export const ALL_TOURNAMENTS: Tournament[] = SEASONS.flatMap((s) => buildTournaments(s.year));

export function tournamentsBySeason(year: number) {
  return ALL_TOURNAMENTS.filter((t) => t.seasonYear === year);
}

// --- Matches: generate finals from tournaments + a couple earlier rounds ---
function parseScoreToSets(score: string): SetScore[] {
  return score.split(",").map((s) => {
    const m = s.trim().match(/(\d+)-(\d+)(?:\((\d+)\))?/);
    if (!m) return { p1: 0, p2: 0 };
    const p1 = parseInt(m[1], 10);
    const p2 = parseInt(m[2], 10);
    const tb = m[3] ? parseInt(m[3], 10) : undefined;
    return tb !== undefined
      ? { p1, p2, tiebreak: { p1: p1 === 7 ? 7 : tb, p2: p2 === 7 ? 7 : tb } }
      : { p1, p2 };
  });
}

function rngStats(seed: number, sets: number): MatchStats {
  const r = (n: number) => Math.floor(((Math.sin(seed * 9301 + n * 49297) + 1) / 2) * 100);
  const aces1 = 6 + (r(1) % 15);
  const aces2 = 4 + (r(2) % 14);
  return {
    aces: [aces1, aces2],
    doubleFaults: [1 + (r(3) % 5), 2 + (r(4) % 6)],
    firstServePct: [58 + (r(5) % 15), 55 + (r(6) % 18)],
    breakPointsWon: [`${2 + (r(7) % 4)}/${4 + (r(8) % 6)}`, `${1 + (r(9) % 4)}/${3 + (r(10) % 6)}`],
    winnersCount: [25 + sets * 8 + (r(11) % 10), 22 + sets * 7 + (r(12) % 10)],
    unforcedErrors: [18 + (r(13) % 12), 22 + (r(14) % 14)],
  };
}

export const ALL_MATCHES: Match[] = ALL_TOURNAMENTS.flatMap((t, ti) => {
  if (t.status !== "Completed" || !t.championId || !t.runnerUpId || !t.finalScore) return [];
  const sets = parseScoreToSets(t.finalScore);
  const seed = ti + 1;
  const final: Match = {
    id: `${t.id}-${t.seasonYear}-F`,
    tournamentId: t.id,
    round: "F",
    date: t.endDate,
    player1Id: t.championId,
    player2Id: t.runnerUpId,
    winnerId: t.championId,
    sets,
    durationMin: 90 + sets.length * 30 + (seed * 7) % 25,
    stats: rngStats(seed, sets.length),
    status: "Completed",
  };
  return [final];
});

// --- Rankings: derived per season ---
export function rankingsForSeason(year: number): RankingRow[] {
  const tours = ALL_TOURNAMENTS.filter((t) => t.seasonYear === year && t.status === "Completed");
  const stats: Record<string, { points: number; titles: number; won: number; lost: number }> = {
    p1: { points: 0, titles: 0, won: 0, lost: 0 },
    p2: { points: 0, titles: 0, won: 0, lost: 0 },
  };
  for (const t of tours) {
    if (!t.championId || !t.runnerUpId) continue;
    stats[t.championId].points += t.points;
    stats[t.championId].titles += 1;
    stats[t.championId].won += 6; // assumed run
    stats[t.runnerUpId].points += Math.round(t.points * 0.6);
    stats[t.runnerUpId].won += 5;
    stats[t.runnerUpId].lost += 1;
  }
  const rows = (["p1", "p2"] as const).map((id) => ({
    rank: 0,
    previousRank: 0,
    playerId: id,
    points: stats[id].points,
    titles: stats[id].titles,
    matchesWon: stats[id].won,
    matchesLost: stats[id].lost,
  }));
  rows.sort((a, b) => b.points - a.points);
  rows.forEach((r, i) => {
    r.rank = i + 1;
    r.previousRank = i === 0 ? 2 : 1;
  });
  return rows;
}

// Helpers
export const getPlayer = (id: string) => PLAYERS.find((p) => p.id === id)!;
export const getTournament = (id: string, year: number) =>
  ALL_TOURNAMENTS.find((t) => t.id === id && t.seasonYear === year);

export function matchesBySeason(year: number) {
  return ALL_MATCHES.filter((m) => {
    const t = ALL_TOURNAMENTS.find((x) => x.id === m.tournamentId && x.seasonYear === year);
    return !!t;
  });
}

export function headToHead() {
  const all = ALL_MATCHES;
  const total = all.length;
  const p1Wins = all.filter((m) => m.winnerId === "p1").length;
  const p2Wins = total - p1Wins;
  const bySurface: Record<Surface, { p1: number; p2: number }> = {
    Hard: { p1: 0, p2: 0 },
    Clay: { p1: 0, p2: 0 },
    Grass: { p1: 0, p2: 0 },
  };
  for (const m of all) {
    const t = ALL_TOURNAMENTS.find((x) => x.id === m.tournamentId && x.seasonYear === parseInt(m.date.slice(0, 4), 10));
    if (!t) continue;
    if (m.winnerId === "p1") bySurface[t.surface].p1 += 1;
    else bySurface[t.surface].p2 += 1;
  }
  return { total, p1Wins, p2Wins, bySurface };
}

export const SURFACE_COLOR: Record<Surface, string> = {
  Hard: "var(--hard)",
  Clay: "var(--clay)",
  Grass: "var(--grass)",
};