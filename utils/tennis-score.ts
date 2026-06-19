export type SetScore = {
  p1: number;
  p2: number;
};

export function parseScore(
  score: string
): SetScore[] {
  return score
    .split(",")
    .map((set) => set.trim())
    .filter(Boolean)
    .map((set) => {
      const [p1, p2] = set
        .split("-")
        .map((n) => Number(n.trim()));

      return {
        p1,
        p2,
      };
    });
}

export function formatScore(
  sets: SetScore[]
): string {
  return sets
    .map((set) => `${set.p1}-${set.p2}`)
    .join(", ");
}