"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSeason } from "@/lib/SeasonContext";
import { SEASONS } from "@/lib/tennis-data";
import { Calendar } from "lucide-react";

export function SeasonSelector() {
  const { year, setYear } = useSeason();
  return (
    <div className="flex items-center gap-2">
      <Calendar className="size-4 text-court" />
      <Select value={String(year)} onValueChange={(v) => setYear(parseInt(v, 10))}>
        <SelectTrigger className="h-9 w-35 border-border/70 bg-card/60 font-display tracking-widest">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SEASONS.map((s) => (
            <SelectItem key={s.year} value={String(s.year)} className="font-display tracking-widest">
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
