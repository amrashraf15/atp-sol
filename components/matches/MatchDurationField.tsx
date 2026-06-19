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

export function MatchDurationField({
  control,
}: Props) {
  return (
    <Controller
      control={control}
      name="durationMin"
      render={({ field }) => (
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Duration (minutes)
          </label>

          <Input
            type="number"
            value={field.value}
            onChange={(e) =>
              field.onChange(
                Number(e.target.value)
              )
            }
          />
        </div>
      )}
    />
  );
}