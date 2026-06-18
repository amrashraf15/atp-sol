import { Doc } from "../_generated/dataModel";

export function playerDisplayName(
  player: Doc<"players">
) {
  return `${player.name} (${player.countryCode})`;
}