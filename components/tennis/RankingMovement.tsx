import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function RankingMovement({ current, previous }: { current: number; previous: number }) {
  const diff = previous - current;
  if (diff === 0)
    return (
      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
        <Minus className="size-3" /> 0
      </span>
    );
  const up = diff > 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-semibold",
        up ? "text-court" : "text-destructive",
      )}
    >
      {up ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
      {Math.abs(diff)}
    </span>
  );
}
