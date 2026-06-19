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
import { MATCH_ROUNDS, MatchFormValues } from "@/schemas/matchSchema";

type Props = {
  control: Control<MatchFormValues>;
};

export function MatchRoundField({
  control,
}: Props) {
  return (
    <Controller
      control={control}
      name="round"
      render={({ field }) => (
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Round
          </label>

          <Select
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {MATCH_ROUNDS.map(
                (round) => (
                  <SelectItem
                    key={round}
                    value={round}
                  >
                    {round}
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