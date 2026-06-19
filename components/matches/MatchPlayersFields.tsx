"use client";

import {
  Control,
  Controller,
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
  players: Player[];
};

export function MatchPlayersFields({
  control,
  players,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Controller
        control={control}
        name="player1Id"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Player 1
            </label>

            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {players.map(
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

      <Controller
        control={control}
        name="player2Id"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Player 2
            </label>

            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {players.map(
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
    </div>
  );
}