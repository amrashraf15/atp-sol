import { Doc } from "../_generated/dataModel";

export function getWinner(
  match: Doc<"matches">
) {
  return match.winnerId;
}

export function totalSetsWon(
  match: Doc<"matches">,
  player: 1 | 2
) {
  return match.sets.filter((s) =>
    player === 1 ? s.p1 > s.p2 : s.p2 > s.p1
  ).length;
}