"use client";

import {
  Control,
  Controller,
  UseFormWatch,
} from "react-hook-form";



import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MatchFormValues } from "@/schemas/matchSchema";

type Player = {
  _id: string;
  name: string;
};

type Props = {
  control: Control<MatchFormValues>;
  watch: UseFormWatch<MatchFormValues>;
  players: Player[];
};

export function MatchWinnerField({
  control,
  watch,
  players,
}: Props) {
  const p1 = watch("player1Id");
  const p2 = watch("player2Id");

  const availablePlayers =
    players.filter(
      (player) =>
        player._id === p1 ||
        player._id === p2
    );

  return (
    <Controller
      control={control}
      name="winnerId"
      render={({ field }) => (
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Winner
          </label>

          <Select
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select winner" />
            </SelectTrigger>

            <SelectContent>
              {availablePlayers.map(
                (player) => (
                  <SelectItem
                    key={player._id}
                    value={player._id}
                  >
                    {player.name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
}