"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { TournamentForm } from "./TournamentForm";
import { Id } from "@/convex/_generated/dataModel";

type Props = {
  seasonId: Id<"seasons">;
  year: number;
};

export function AddTournamentDialog({
  seasonId,
  year,
}: Props) {
  const [open, setOpen] =
    useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="gap-2"
        >
          <Plus className="size-4" />
          Add Tournament
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            New Tournament
          </DialogTitle>

          <DialogDescription>
            Add a tournament to the{" "}
            {year} season.
          </DialogDescription>
        </DialogHeader>

        <TournamentForm
          seasonId={seasonId}
          year={year}
          onSuccess={() =>
            setOpen(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
}