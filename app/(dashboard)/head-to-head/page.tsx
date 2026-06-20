"use client";

import { AppShell } from "@/components/tennis/AppShell";
import { PlayerAvatar } from "@/components/tennis/PlayerAvatar";
import { MatchCard } from "@/components/tennis/MatchCard";
import { H2HBarChart } from "@/components/tennis/Charts";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { useSeason } from "@/lib/useSeason";

export default function HeadToHeadPage() {
  const { year } = useSeason();

  const rankings = useQuery(api.rankings.getRankingsBySeason, { year });

  const player1Id = rankings?.[0]?.playerId;
  const player2Id = rankings?.[1]?.playerId;

  const h = useQuery(
    api.h2h.getHeadToHead,
    player1Id && player2Id
      ? {
          player1Id,
          player2Id,
        }
      : "skip",
  );

  if (!h) {
    return <AppShell title="Head To Head">There are no Matches to show head to head</AppShell>;
  }

  const p1 = h.player1;
  const p2 = h.player2;

  const data = [
    {
      surface: "Hard",
      p1: h.bySurface.Hard.p1,
      p2: h.bySurface.Hard.p2,
    },
    {
      surface: "Clay",
      p1: h.bySurface.Clay.p1,
      p2: h.bySurface.Clay.p2,
    },
    {
      surface: "Grass",
      p1: h.bySurface.Grass.p1,
      p2: h.bySurface.Grass.p2,
    },
  ];

  const p1Percentage = h.total > 0 ? (h.p1Wins / h.total) * 100 : 50;

  const p2Percentage = h.total > 0 ? (h.p2Wins / h.total) * 100 : 50;

  return (
    <AppShell title="Head To Head" eyebrow="Career Rivalry">
      {/* Hero */}

      <div
        className="
        rounded-xl
        border
        border-border/60
        bg-card/60
        p-6
      "
      >
        <div
          className="
          grid
          gap-6
          md:grid-cols-3
          items-center
        "
        >
          {/* Player 1 */}

          <div className="text-center md:text-left">
            <PlayerAvatar player={p1} size="xl" className="mx-auto md:mx-0" />

            <div
              className="
              mt-2
              font-display
              text-3xl
              uppercase
            "
            >
              {p1.name}
            </div>

            <div className="text-xs text-muted-foreground">{p1.country}</div>
          </div>

          {/* Score */}

          <div className="text-center">
            <div
              className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-muted-foreground
            "
            >
              All-Time
            </div>

            <div
              className="
              mt-2
              font-display
              text-7xl
              tabular-nums
            "
            >
              <span
                style={{
                  color: p1.color,
                }}
              >
                {h.p1Wins}
              </span>

              <span
                className="
                mx-3
                text-muted-foreground
              "
              >
                ·
              </span>

              <span
                style={{
                  color: p2.color,
                }}
              >
                {h.p2Wins}
              </span>
            </div>

            <div
              className="
              font-mono
              text-[10px]
              uppercase
              tracking-widest
              text-muted-foreground
            "
            >
              {h.total} meetings
            </div>
          </div>

          {/* Player 2 */}

          <div className="text-center md:text-right">
            <PlayerAvatar
              player={p2}
              size="xl"
              className="
                mx-auto
                md:ml-auto
                md:mr-0
              "
            />

            <div
              className="
              mt-2
              font-display
              text-3xl
              uppercase
            "
            >
              {p2.name}
            </div>

            <div className="text-xs text-muted-foreground">{p2.country}</div>
          </div>
        </div>

        <div
          className="
          mt-6
          flex
          overflow-hidden
          rounded-full
          bg-muted/30
        "
        >
          <div
            className="h-2"
            style={{
              width: `${p1Percentage}%`,
              backgroundColor: p1.color,
            }}
          />

          <div
            className="h-2"
            style={{
              width: `${p2Percentage}%`,
              backgroundColor: p2.color,
            }}
          />
        </div>
      </div>

      {/* Surface Cards */}

      <section
        className="
        mt-6
        grid
        gap-4
        md:grid-cols-3
      "
      >
        {(["Hard", "Clay", "Grass"] as const).map((surface) => {
          const stats = h.bySurface[surface];

          const total = stats.p1 + stats.p2;

          return (
            <div
              key={surface}
              className="
              rounded-xl
              border
              border-border/60
              bg-card/60
              p-5
              "
            >
              <div
                className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-muted-foreground
              "
              >
                {surface} Court
              </div>

              <div
                className="
                mt-2
                flex
                items-baseline
                justify-between
              "
              >
                <span
                  className="
                  font-display
                  text-3xl
                  "
                  style={{
                    color: p1.color,
                  }}
                >
                  {stats.p1}
                </span>

                <span
                  className="
                  font-mono
                  text-xs
                  text-muted-foreground
                "
                >
                  vs
                </span>

                <span
                  className="
                  font-display
                  text-3xl
                  "
                  style={{
                    color: p2.color,
                  }}
                >
                  {stats.p2}
                </span>
              </div>

              <div
                className="
                mt-3
                flex
                h-1.5
                overflow-hidden
                rounded-full
                bg-muted/40
              "
              >
                <div
                  style={{
                    backgroundColor: p1.color,
                    width: `${total ? (stats.p1 / total) * 100 : 50}%`,
                  }}
                />

                <div
                  style={{
                    backgroundColor: p2.color,
                    width: `${total ? (stats.p2 / total) * 100 : 50}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </section>

      {/* Chart + Milestones */}

      <section
        className="
        mt-6
        grid
        gap-4
        lg:grid-cols-3
      "
      >
        <div
          className="
          rounded-xl
          border
          border-border/60
          bg-card/60
          p-5
          lg:col-span-2
        "
        >
          <h3
            className="
            font-display
            text-lg
            uppercase
            tracking-wide
          "
          >
            Surface Trend
          </h3>

          <div className="mt-3">
            <H2HBarChart
              data={data}
              players={{
                p1: {
                  shortName: p1.shortName,
                  color: p1.color,
                },
                p2: {
                  shortName: p2.shortName,
                  color: p2.color,
                },
              }}
            />
          </div>
        </div>

        <div
          className="
          rounded-xl
          border
          border-border/60
          bg-card/60
          p-5
        "
        >
          <h3
            className="
            font-display
            text-lg
            uppercase
            tracking-wide
          "
          >
            Milestones
          </h3>

          <div
            className="
            mt-3
            space-y-3
            text-sm
          "
          >
            <div>
              <div
                className="
                font-mono
                text-[10px]
                uppercase
                tracking-widest
                text-muted-foreground
              "
              >
                Win % {p1.shortName}
              </div>

              <div
                className="
                font-display
                text-2xl
                text-court
              "
              >
                {Math.round(p1Percentage)}%
              </div>
            </div>
            <div>
              <div
                className="
                font-mono
                text-[10px]
                uppercase
                tracking-widest
                text-muted-foreground
              "
              >
                Win % {p2.shortName}
              </div>

              <div
                className="
                font-display
                text-2xl
                text-court
              "
              >
                {Math.round(p2Percentage)}%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Meetings */}

      <section className="mt-6">
        <h3
          className="
          font-display
          text-lg
          uppercase
          tracking-wide
        "
        >
          Recent Meetings
        </h3>

        <div
          className="
          mt-3
          grid
          gap-3
          md:grid-cols-2
          xl:grid-cols-3
        "
        >
          {h.recent.map((match) => (
            <MatchCard key={match._id} match={match} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
