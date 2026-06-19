"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PlayerHandSelect } from "./PlayerHandSelect";

import {
  generateInitials,
  generatePlayerColor,
  generateShortName,
} from "@/utils/player.utils";

import { usePlayerForm } from "@/hooks/usePlayerForm";
import { useCreatePlayer } from "@/hooks/useCreatePlayer";
import { PlayerFormValues } from "@/schemas/playerSchema";

type Props = {
  onSuccess?: () => void;
};

export function PlayerForm({
  onSuccess,
}: Props) {
  const createPlayer = useCreatePlayer();

  const form = usePlayerForm();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = form;

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: PlayerFormValues) => {
    try {
      setLoading(true);

      await createPlayer({
        ...values,
        shortName: generateShortName(values.name),
        initials: generateInitials(values.name),
        color: generatePlayerColor(),
      });

      toast.success("Player created successfully");

      reset();

      onSuccess?.();
    } catch {
      toast.error("Failed to create player");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {/* Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Full Name
        </label>

        <Input
          {...register("name")}
          placeholder="Novak Djokovic"
        />

        {errors.name && (
          <p className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Country */}
      <div className="grid grid-cols-2 gap-4">
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

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Country Code
          </label>

          <Input
            maxLength={3}
            {...register("countryCode")}
          />

          {errors.countryCode && (
            <p className="text-sm text-destructive">
              {errors.countryCode.message}
            </p>
          )}
        </div>
      </div>

      {/* Other fields */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Hand
          </label>

          <PlayerHandSelect
            value={watch("hand")}
            onChange={(value) =>
              setValue(
                "hand",
                value as "Right" | "Left"
              )
            }
          />

          {errors.hand && (
            <p className="text-sm text-destructive">
              {errors.hand.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Age
          </label>

          <Input
            type="number"
            {...register("age", {
              valueAsNumber: true,
            })}
          />

          {errors.age && (
            <p className="text-sm text-destructive">
              {errors.age.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Height
          </label>

          <Input {...register("height")} />

          {errors.height && (
            <p className="text-sm text-destructive">
              {errors.height.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading
          ? "Creating..."
          : "Create Player"}
      </Button>
    </form>
  );
}