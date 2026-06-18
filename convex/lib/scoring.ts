export function matchScoreString(
  sets: {
    p1: number;
    p2: number;
  }[]
) {
  return sets
    .map((s) => `${s.p1}-${s.p2}`)
    .join(" ");
}

export function setsWon(
  sets: {
    p1: number;
    p2: number;
  }[],
  player: 1 | 2
) {
  return sets.filter((s) =>
    player === 1 ? s.p1 > s.p2 : s.p2 > s.p1
  ).length;
}