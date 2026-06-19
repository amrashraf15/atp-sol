import { z } from "zod";

export const MATCH_ROUNDS = [
  "R32",
  "R16",
  "QF",
  "SF",
  "F",
] as const;

export const matchSchema = z
  .object({
    tournamentId: z.string().min(1, "Tournament is required"),

    round: z.enum(MATCH_ROUNDS),

    date: z.string().min(1, "Date is required"),

    player1Id: z.string().min(1, "Player 1 is required"),

    player2Id: z.string().min(1, "Player 2 is required"),

    winnerId: z.string().min(1, "Winner is required"),

    score: z
      .string()
      .trim()
      .min(3, "Score is required"),

    durationMin: z
      .number()
      .int()
      .min(1, "Duration must be greater than 0"),
  })
  .refine(
    (v) => v.player1Id !== v.player2Id,
    {
      path: ["player2Id"],
      message: "Players must differ",
    }
  )
  .refine(
    (v) =>
      v.winnerId === v.player1Id ||
      v.winnerId === v.player2Id,
    {
      path: ["winnerId"],
      message:
        "Winner must be one of the players",
    }
  );

export type MatchFormValues =
  z.infer<typeof matchSchema>;