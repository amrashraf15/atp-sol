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

export function TournamentPointsField({
  register,
  errors,
}: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
        Ranking Points
      </h3>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Champion Points
        </label>

        <Input
          type="number"
          {...register("points", {
            valueAsNumber: true,
          })}
        />

        {errors.points && (
          <p className="text-sm text-destructive">
            {errors.points.message}
          </p>
        )}
      </div>
    </div>
  );
}