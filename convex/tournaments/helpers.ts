import { Doc } from "../_generated/dataModel";

export function isTournamentCompleted(
  tournament: Doc<"tournaments">
) {
  return tournament.status === "Completed";
}