import z from "zod";

export const matchSchema = z
  .object({
    tournamentId: z.string().min(1),
    round: z.enum(["R32", "R16", "QF", "SF", "F"]),
    date: z.string(),

    player1Id: z.string().min(1),
    player2Id: z.string().min(1),

    winnerId: z.string().min(1),

    set1P1: z.coerce.number().min(0),
    set1P2: z.coerce.number().min(0),

    set2P1: z.coerce.number().min(0),
    set2P2: z.coerce.number().min(0),

    durationMin: z.coerce.number().min(1),
  })
  .refine((v) => v.player1Id !== v.player2Id, {
    path: ["player2Id"],
    message: "Players must differ",
  });