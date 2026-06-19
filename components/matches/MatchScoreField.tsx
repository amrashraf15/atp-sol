"use client";

import {
  Control,
  Controller,
} from "react-hook-form";



import { Input } from "@/components/ui/input";
import { MatchFormValues } from "@/schemas/matchSchema";

type Props = {
  control: Control<MatchFormValues>;
};

export function MatchScoreField({
  control,
}: Props) {
  return (
    <Controller
      control={control}
      name="score"
      render={({ field }) => (
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Score
          </label>

          <Input
            placeholder="6-4, 6-3"
            {...field}
          />
        </div>
      )}
    />
  );
}