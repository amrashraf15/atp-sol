import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  tournamentSchema,
  TournamentFormValues,
} from "../schemas/tournamentSchema";

export function useTournamentForm(
  year: number
) {
  return useForm<TournamentFormValues>({
    resolver:
      zodResolver(tournamentSchema),

    defaultValues: {
      name: "",
      shortName: "",
      city: "",
      country: "",

      surface: "Hard",

      category: "Masters 1000",

      startDate: `${year}-01-15`,

      endDate: `${year}-01-22`,

      points: 1000,
    },
  });
}