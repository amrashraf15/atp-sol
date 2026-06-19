import {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import { TournamentFormValues } from "@/schemas/tournamentSchema";


type Props = {
  register: UseFormRegister<TournamentFormValues>;
  errors: FieldErrors<TournamentFormValues>;
};

export function TournamentScheduleFields({
  register,
  errors,
}: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
        Schedule
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Start Date
          </label>

          <Input
            type="date"
            {...register("startDate")}
          />

          {errors.startDate && (
            <p className="text-sm text-destructive">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            End Date
          </label>

          <Input
            type="date"
            {...register("endDate")}
          />

          {errors.endDate && (
            <p className="text-sm text-destructive">
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}