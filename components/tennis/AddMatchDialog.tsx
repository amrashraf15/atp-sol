"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useSeason } from "@/lib/useSeason";

const ROUNDS = ["R32", "R16", "QF", "SF", "F"] as const;

const schema = z.object({
  tournamentId: z.string().min(1),
  round: z.enum(ROUNDS),
  date: z.string(),

  player1Id: z.string().min(1),
  player2Id: z.string().min(1),
  winnerId: z.string().min(1),

  set1P1: z.coerce.number(),
  set1P2: z.coerce.number(),
  set2P1: z.coerce.number(),
  set2P2: z.coerce.number(),

  durationMin: z.coerce.number().min(1),
}).refine(v => v.player1Id !== v.player2Id, {
  path: ["player2Id"],
  message: "Players must differ",
}).refine(v => [v.player1Id, v.player2Id].includes(v.winnerId), {
  path: ["winnerId"],
  message: "Winner must be one of the players",
});

type FormValues = z.infer<typeof schema>;

export function AddMatchDialog() {
  const { year } = useSeason();
  const [open, setOpen] = useState(false);

  const createMatch = useMutation(api.matches.create);

  const players = useQuery(api.players.getAll);
  const tournaments = useQuery(api.tournaments.getAll);

  const seasonTournaments =
    tournaments?.filter((t) => new Date(t.startDate).getFullYear() === year) ?? [];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      tournamentId: "",
      round: "F",
      date: `${year}-06-09`,
      player1Id: "",
      player2Id: "",
      winnerId: "",
      set1P1: 6,
      set1P2: 4,
      set2P1: 6,
      set2P2: 3,
      durationMin: 120,
    },
  });

  const p1 = watch("player1Id");
  const p2 = watch("player2Id");

  const onSubmit = async (values: FormValues) => {
    await createMatch({
      tournamentId: values.tournamentId as Id<"tournaments">,
      round: values.round,
      date: values.date,
      player1Id: values.player1Id as Id<"players">,
      player2Id: values.player2Id as Id<"players">,
      winnerId: values.winnerId as Id<"players">,

      sets: [
        { p1: values.set1P1, p2: values.set1P2 },
        { p1: values.set2P1, p2: values.set2P2 },
      ],

      durationMin: values.durationMin,

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

      status: "Completed",
    });

    reset();
    setOpen(false);
  };

  if (!players || !tournaments) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <Plus className="size-4" />
          Add match
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New match</DialogTitle>
          <DialogDescription>
            Log a completed match into the {year} season.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Tournament */}
          <div>
            <label>Tournament</label>
            <Select
              onValueChange={(v) => setValue("tournamentId", v)}
              value={watch("tournamentId")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {seasonTournaments.map((t) => (
                  <SelectItem key={t._id} value={t._id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p>{errors.tournamentId?.message}</p>
          </div>

          {/* Round */}
          <div>
            <label>Round</label>
            <Select
              onValueChange={(v) => setValue("round", v as any)}
              value={watch("round")}
            >
              <SelectTrigger />
              <SelectContent>
                {ROUNDS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div>
            <label>Date</label>
            <Input type="date" {...register("date")} />
          </div>

          {/* Players */}
          <div>
            <label>Player 1</label>
            <Select onValueChange={(v) => setValue("player1Id", v)} value={p1}>
              <SelectTrigger />
              <SelectContent>
                {players.map((p) => (
                  <SelectItem key={p._id} value={p._id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label>Player 2</label>
            <Select onValueChange={(v) => setValue("player2Id", v)} value={p2}>
              <SelectTrigger />
              <SelectContent>
                {players.map((p) => (
                  <SelectItem key={p._id} value={p._id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Winner */}
          <div>
            <label>Winner</label>
            <Select onValueChange={(v) => setValue("winnerId", v)} value={watch("winnerId")}>
              <SelectTrigger />
              <SelectContent>
                {[p1, p2].filter(Boolean).map((id) => {
                  const player = players.find((x) => x._id === id);
                  return player ? (
                    <SelectItem key={id} value={id}>
                      {player.name}
                    </SelectItem>
                  ) : null;
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Sets */}
          <div className="grid grid-cols-2 gap-2">
            <Input type="number" {...register("set1P1", { valueAsNumber: true })} />
            <Input type="number" {...register("set1P2", { valueAsNumber: true })} />
            <Input type="number" {...register("set2P1", { valueAsNumber: true })} />
            <Input type="number" {...register("set2P2", { valueAsNumber: true })} />
          </div>

          {/* Duration */}
          <Input type="number" {...register("durationMin", { valueAsNumber: true })} />

          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}