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

export function MatchScheduleField({
  control,
}: Props) {
  return (
    <Controller
      control={control}
      name="date"
      render={({ field }) => (
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Match Date
          </label>

          <Input
            type="date"
            {...field}
          />
        </div>
      )}
    />
  );
}