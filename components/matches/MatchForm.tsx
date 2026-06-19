"use client";

import { useState } from "react";

import { Id } from "@/convex/_generated/dataModel";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useMatchForm } from "@/hooks/useMatchForm";
import { useCreateMatch } from "@/hooks/useCreateMatch";
import { parseScore } from "@/utils/tennis-score";
import { MatchTournamentField } from "./MatchTournamentField";
import { MatchRoundField } from "./MatchRoundField";
import { MatchScheduleField } from "./MatchScheduleField";
import { MatchPlayersFields } from "./MatchPlayersFields";
import { MatchWinnerField } from "./MatchWinnerField";
import { MatchScoreField } from "./MatchScoreField";
import { MatchDurationField } from "./MatchDurationField";

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
  onSuccess?: () => void;
};

export function MatchForm({ players, tournaments, onSuccess }: Props) {
  const form = useMatchForm();

  const createMatch = useCreateMatch();

  const [loading, setLoading] = useState(false);

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setLoading(true);

      await createMatch({
        tournamentId: values.tournamentId as Id<"tournaments">,

        round: values.round,

        date: values.date,

        player1Id: values.player1Id as Id<"players">,

        player2Id: values.player2Id as Id<"players">,

        winnerId: values.winnerId as Id<"players">,

        durationMin: values.durationMin,

        sets: parseScore(values.score),

        status: "Completed",

        stats: {
          aces: [0, 0],
          doubleFaults: [0, 0],
          firstServePct: [0, 0],

          breakPointsWon: [
            { won: 0, total: 0 },
            { won: 0, total: 0 },
          ],

          winnersCount: [0, 0],
          unforcedErrors: [0, 0],
        },
      });

      toast.success("Match created successfully");

      form.reset();

      onSuccess?.();
    } catch (error) {
      console.error(error);

      toast.error("Failed to create match");
    } finally {
      setLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <MatchTournamentField control={form.control} tournaments={tournaments} />

      <div className="grid grid-cols-2 gap-4">
        <MatchRoundField control={form.control} />

        <MatchScheduleField control={form.control} />
      </div>

      <MatchPlayersFields control={form.control} players={players} />

      <MatchWinnerField
        control={form.control}
        watch={form.watch}
        players={players}
      />

      <div className="grid grid-cols-2 gap-4">
        <MatchScoreField control={form.control} />

        <MatchDurationField control={form.control} />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating Match..." : "Create Match"}
      </Button>
    </form>
  );
}
