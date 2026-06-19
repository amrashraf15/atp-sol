import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";

export function useCreateMatch() {
  return useMutation(
    api.matches.create
  );
}