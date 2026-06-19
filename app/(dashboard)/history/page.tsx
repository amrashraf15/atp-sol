"use client";
import { AppShell } from "@/components/tennis/AppShell";
import { Crown, Trophy } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function HistoryPage() {
  const data = useQuery(api.history.getHistoryData);
  if (!data) {
    return (
      <AppShell title="History" eyebrow="ATP Records">
        Loading history...
      </AppShell>
    );
  }

  return (
    <AppShell title="History" eyebrow="ATP Records">
      {/* Grand Slam Champions */}

      <section>
        <h2 className="font-display text-xl uppercase tracking-wide">
          Grand Slam Champions
        </h2>

        <div
          className="
          mt-3
          overflow-hidden
          rounded-xl
          border
          border-border/60
          bg-card/60
        "
        >
          <div
            className="
            grid
            grid-cols-5
            gap-2
            border-b
            px-5
            py-3
            font-mono
            text-[10px]
            uppercase
            tracking-widest
            text-muted-foreground
          "
          >
            <div>Year</div>

            <div>Australian Open</div>

            <div>Roland Garros</div>

            <div>Wimbledon</div>

            <div>US Open</div>
          </div>

          {data.grandSlams.map((t) => (
            <div
              key={t._id}
              className="
                  grid
                  grid-cols-5
                  px-5
                  py-3
                  border-b
                "
            >
              <div>{new Date(t.startDate).getFullYear()}</div>

              <div className="flex gap-2">
                <Trophy className="size-3 text-court" />

                {t.champion?.shortName ?? "—"}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {/* Year End No1 */}

        <div
          className="
          rounded-xl
          border
          p-5
        "
        >
          <h2 className="font-display text-xl">Year-End No.1</h2>

          {data.yearEndNo1.map((x) => (
            <div
              key={x.year}
              className="
                  mt-3
                  flex
                  justify-between
                  rounded-md
                  border
                  p-3
                "
            >
              <div className="flex gap-3">
                <Crown className="size-4" />

                {x.year}
              </div>

              <div>
                {x.player?.name ?? "—"}

                <div className="text-xs text-muted-foreground">
                  {x.points} pts
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Most Titles */}

        <div
          className="
          rounded-xl
          border
          p-5
        "
        >
          <h2 className="font-display text-xl">Most Titles</h2>

          {data.mostTitles.map((x) => (
            <div
              key={x.player._id}
              className="
                  mt-3
                  flex
                  justify-between
                  rounded-md
                  border
                  p-3
                "
            >
              <span>{x.player.name}</span>

              <span className="text-court">{x.titles}</span>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
