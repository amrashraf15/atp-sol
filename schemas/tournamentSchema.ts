import { z } from "zod";

export const tournamentSchema = z
  .object({
    name: z.string().trim().min(2).max(80),

    shortName: z
      .string()
      .trim()
      .min(2)
      .max(40),

    city: z.string().trim().min(2).max(60),

    country: z.string().trim().min(2).max(60),

    surface: z.enum([
      "Hard",
      "Clay",
      "Grass",
    ]),

    category: z.enum([
      "Grand Slam",
      "Masters 1000",
    ]),

    startDate: z.string(),

    endDate: z.string(),

    points: z
      .number()
      .int()
      .min(100)
      .max(5000),
  })
  .refine(
    (data) =>
      new Date(data.endDate) >=
      new Date(data.startDate),
    {
      message:
        "End date must be after start date",
      path: ["endDate"],
    }
  );

export type TournamentFormValues =
  z.infer<typeof tournamentSchema>;