"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { Id } from "@/convex/_generated/dataModel";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { MatchForm } from "./MatchForm";

type Player = {
  _id: Id<"players">;
  name: string;
};

type Tournament = {
  _id: Id<"tournaments">;
  name: string;
};

type Props = {
  players: Player[];
  tournaments: Tournament[];
};

export function AddMatchDialog({
  players,
  tournaments,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const disabled =
    players.length < 2 ||
    tournaments.length === 0;

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="gap-2"
          disabled={disabled}
        >
          <Plus className="h-4 w-4" />
          Add Match
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            New Match
          </DialogTitle>

          <DialogDescription>
            Record a completed match
            result.
          </DialogDescription>
        </DialogHeader>

        <MatchForm
          players={players}
          tournaments={tournaments}
          onSuccess={() =>
            setOpen(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
}