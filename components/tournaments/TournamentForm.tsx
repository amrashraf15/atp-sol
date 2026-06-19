"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useCreateTournament } from "@/hooks/useCreateTournament";
import { useTournamentForm } from "@/hooks/useTournamentForm";
import { toast } from "sonner";
import { TournamentBasicFields } from "./TournamentBasicFields";
import { TournamentClassificationFields } from "./TournamentClassificationFields";
import { TournamentScheduleFields } from "./TournamentScheduleFields";
import { Button } from "../ui/button";
import { TournamentPointsField } from "./TournamentPointsField";

type Props = {
  seasonId: Id<"seasons">;
  year: number;
  onSuccess?: () => void;
};

export function TournamentForm({
  seasonId,
  year,
  onSuccess,
}: Props) {
  const form =
    useTournamentForm(year);

  const createTournament =
    useCreateTournament();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmit =
    handleSubmit(async (values) => {
      try {
        await createTournament({
          seasonId,

          ...values,

          status: "Upcoming",
        });

        toast.success(
          "Tournament created"
        );

        reset();

        onSuccess?.();
      } catch {
        toast.error(
          "Failed to create tournament"
        );
      }
    });

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <TournamentBasicFields
        register={register}
        errors={errors}
      />

      <TournamentClassificationFields
        form={form}
      />

      <TournamentScheduleFields
        register={register}
        errors={errors}
      />

      <TournamentPointsField
        register={register}
        errors={errors}
      />

      <Button
        type="submit"
        className="w-full"
      >
        Create Tournament
      </Button>
    </form>
  );
}