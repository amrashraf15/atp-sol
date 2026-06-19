import type { Surface } from "@/lib/tennis-data";
import { cn } from "@/lib/utils";

const styles: Record<Surface, string> = {
  Hard: "bg-[oklch(0.62_0.16_235/0.15)] text-[oklch(0.78_0.14_235)] border-[oklch(0.62_0.16_235/0.4)]",
  Clay: "bg-[oklch(0.65_0.18_45/0.15)] text-[oklch(0.78_0.16_45)] border-[oklch(0.65_0.18_45/0.4)]",
  Grass: "bg-[oklch(0.72_0.18_145/0.15)] text-[oklch(0.85_0.18_145)] border-[oklch(0.72_0.18_145/0.4)]",
};

export function SurfaceBadge({ surface, className }: { surface: Surface; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.15em]",
        styles[surface],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {surface}
    </span>
  );
}