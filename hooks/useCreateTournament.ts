import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useCreateTournament() {
  return useMutation(
    api.tournaments.create
  );
}