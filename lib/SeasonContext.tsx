"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { SEASONS } from "./tennis-data";

type Ctx = { year: number; setYear: (y: number) => void };
const SeasonCtx = createContext<Ctx | null>(null);

export function SeasonProvider({ children }: { children: ReactNode }) {
  const [year, setYear] = useState<number>(SEASONS[0].year);
  return <SeasonCtx.Provider value={{ year, setYear }}>{children}</SeasonCtx.Provider>;
}

export function useSeason() {
  const ctx = useContext(SeasonCtx);
  if (!ctx) throw new Error("useSeason must be used inside SeasonProvider");
  return ctx;
}