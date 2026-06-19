import { z } from "zod";

export const playerSchema = z.object({
  name: z.string().trim().min(2).max(60),
  country: z.string().trim().min(2).max(60),
  countryCode: z.string().trim().min(2).max(3),
  hand: z.enum(["Right", "Left"]),
  age: z.number().int().min(14).max(60),
  height: z.string().trim().min(2).max(8),
});

export type PlayerFormInput =
  z.input<typeof playerSchema>;

export type PlayerFormValues =
  z.output<typeof playerSchema>;