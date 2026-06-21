"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useSeason() {
  const seasons = useQuery(api.seasons.getAll);
  const currentSeason = useQuery(api.seasons.getCurrent);
  const activate = useMutation(api.seasons.activate);

  const setYear = async (year: number) => {
    if (!seasons) return;

    const target = seasons.find((s) => s.year === year);
    if (!target) return;

    await activate({ seasonId: target._id });
  };

  return {
    year: currentSeason?.year ?? 2026,
    seasonId: currentSeason?._id,
    setYear,
    seasons,
    currentSeason,
  };
}