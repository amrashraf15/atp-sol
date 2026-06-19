
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

type Player = Doc<"players">;

export function PlayerAvatar({
  player,
  size = "md",
  className,
}: {
  player: Player;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: "size-7 text-[10px]",
    md: "size-10 text-sm",
    lg: "size-14 text-base",
    xl: "size-20 text-2xl",
  };
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-display font-bold ring-1 ring-border",
        sizes[size],
        className,
      )}
      style={{
        background: `linear-gradient(135deg, ${player.color}, oklch(0.25 0.02 150))`,
        color: "oklch(0.14 0.02 150)",
      }}
    >
      {player.initials}
    </div>
  );
}
