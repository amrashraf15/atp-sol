import { UseFormReturn } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TournamentFormValues } from "@/schemas/tournamentSchema";


type Props = {
  form: UseFormReturn<TournamentFormValues>;
};

export function TournamentClassificationFields({
  form,
}: Props) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
        Classification
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Surface
          </label>

          <Select
            value={watch("surface")}
            onValueChange={(value) =>
              setValue(
                "surface",
                value as
                  | "Hard"
                  | "Clay"
                  | "Grass"
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Hard">
                Hard
              </SelectItem>

              <SelectItem value="Clay">
                Clay
              </SelectItem>

              <SelectItem value="Grass">
                Grass
              </SelectItem>
            </SelectContent>
          </Select>

          {errors.surface && (
            <p className="text-sm text-destructive">
              {errors.surface.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Category
          </label>

          <Select
            value={watch("category")}
            onValueChange={(value) =>
              setValue(
                "category",
                value as
                  | "Grand Slam"
                  | "Masters 1000"
              )
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Grand Slam">
                Grand Slam
              </SelectItem>

              <SelectItem value="Masters 1000">
                Masters 1000
              </SelectItem>
            </SelectContent>
          </Select>

          {errors.category && (
            <p className="text-sm text-destructive">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}