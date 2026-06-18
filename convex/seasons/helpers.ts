import { Doc } from "../_generated/dataModel";

export function isActiveSeason(
  season: Doc<"seasons">
) {
  return season.status === "Active";
}

export function isCompletedSeason(
  season: Doc<"seasons">
) {
  return season.status === "Completed";
}