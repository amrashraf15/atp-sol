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

type Tournament = {
  _id: string;
  name: string;
};

type Props = {
  control: Control<MatchFormValues>;
  tournaments: Tournament[];
};

export function MatchTournamentField({
  control,
  tournaments,
}: Props) {
  return (
    <Controller
      control={control}
      name="tournamentId"
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Tournament
          </label>

          <Select
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tournament" />
            </SelectTrigger>

            <SelectContent>
              {tournaments.map(
                (tournament) => (
                  <SelectItem
                    key={tournament._id}
                    value={tournament._id}
                  >
                    {tournament.name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          {fieldState.error && (
            <p className="text-sm text-destructive">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}