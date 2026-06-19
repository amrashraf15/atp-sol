import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useCreatePlayer() {
  return useMutation(api.players.create);
}