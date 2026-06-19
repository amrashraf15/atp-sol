import { PlayerFormInput, playerSchema } from "@/schemas/playerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function usePlayerForm() {
  return useForm<PlayerFormInput>({
    resolver: zodResolver(playerSchema),

    defaultValues: {
      name: "",
      country: "",
      countryCode: "",
      hand: "Right",
      age: 25,
      height: "1.85m",
    },
  });
}