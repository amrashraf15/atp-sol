import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function StatsCard({
  label,
  value,
  hint,
  icon,
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border/60 bg-card/60 p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        {icon ? <span className="text-court">{icon}</span> : null}
      </div>
      <div className="mt-3 font-display text-4xl tracking-tight">{value}</div>
      {hint ? <div className="mt-1 text-xs text-muted-foreground">{hint}</div> : null}
    </div>
  );
}
