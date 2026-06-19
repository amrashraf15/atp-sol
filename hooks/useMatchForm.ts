import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  matchSchema,
  MatchFormValues,
} from "../schemas/matchSchema";

export function useMatchForm() {
  return useForm<MatchFormValues>({
    resolver: zodResolver(matchSchema),

    defaultValues: {
      tournamentId: "",
      round: "F",
      date: new Date()
        .toISOString()
        .slice(0, 10),

      player1Id: "",
      player2Id: "",
      winnerId: "",

      score: "",

      durationMin: 120,
    },
  });
}