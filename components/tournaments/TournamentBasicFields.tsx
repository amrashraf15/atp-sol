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

export function TournamentBasicFields({
  register,
  errors,
}: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
        Tournament Details
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Tournament Name
          </label>

          <Input
            placeholder="Madrid Open"
            {...register("name")}
          />

          {errors.name && (
            <p className="text-sm text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Short Name
          </label>

          <Input
            placeholder="Madrid"
            {...register("shortName")}
          />

          {errors.shortName && (
            <p className="text-sm text-destructive">
              {errors.shortName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            City
          </label>

          <Input {...register("city")} />

          {errors.city && (
            <p className="text-sm text-destructive">
              {errors.city.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Country
          </label>

          <Input {...register("country")} />

          {errors.country && (
            <p className="text-sm text-destructive">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}