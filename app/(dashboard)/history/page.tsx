
import { AppShell } from "@/components/ui/tennis/AppShell";
import {
  ALL_TOURNAMENTS,
  getPlayer,
  PLAYERS,
  rankingsForSeason,
  SEASONS,
} from "@/lib/tennis-data";
import { Crown, Trophy } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "History — ATP Rivalry",
};

export default function HistoryPage() {
  const slamsByYear = SEASONS.map((s) => ({
    year: s.year,
    rows: ALL_TOURNAMENTS.filter(
      (t) =>
        t.seasonYear === s.year &&
        t.category === "Grand Slam" &&
        t.status === "Completed"
    ),
  }));

  const yearEndNo1 = SEASONS.map((s) => {
    const r = rankingsForSeason(s.year)[0];
    return {
      year: s.year,
      player: r ? getPlayer(r.playerId) : null,
      points: r?.points ?? 0,
    };
  });

  const totalTitles = PLAYERS.map((p) => ({
    player: p,
    titles: ALL_TOURNAMENTS.filter((t) => t.championId === p.id).length,
    slams: ALL_TOURNAMENTS.filter(
      (t) => t.championId === p.id && t.category === "Grand Slam"
    ).length,
    masters: ALL_TOURNAMENTS.filter(
      (t) => t.championId === p.id && t.category === "Masters 1000"
    ).length,
  })).sort((a, b) => b.titles - a.titles);

  return (
    <AppShell title="History" eyebrow="Hall of records">
      {/* Grand Slam Champions */}
      <section>
        <h2 className="font-display text-2xl uppercase tracking-wide">
          Grand Slam Champions
        </h2>

        <div className="mt-3 overflow-hidden rounded-xl border border-border/60 bg-card/60">
          <div className="grid grid-cols-5 gap-2 border-b border-border/60 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <div>Year</div>
            <div>Australian Open</div>
            <div>Roland Garros</div>
            <div>Wimbledon</div>
            <div>US Open</div>
          </div>

          {slamsByYear.map((g) => (
            <div
              key={g.year}
              className="grid grid-cols-5 items-center gap-2 border-b border-border/40 px-5 py-3 last:border-b-0"
            >
              <div className="font-display text-xl text-court">{g.year}</div>

              {(["ao", "rg", "wi", "us"] as const).map((slug) => {
                const t = g.rows.find((x) => x.id === slug);
                const ch = t?.championId ? getPlayer(t.championId) : null;

                return (
                  <div key={slug}>
                    {ch ? (
                      <div className="flex items-center gap-2">
                        <Trophy className="size-3 text-court" />
                        <span className="font-medium">{ch.shortName}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Stats Sections */}
      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {/* Year-End No.1 */}
        <div className="rounded-xl border border-border/60 bg-card/60 p-5">
          <h2 className="font-display text-xl uppercase tracking-wide">
            Year-End No. 1
          </h2>

          <div className="mt-3 space-y-3">
            {yearEndNo1.map(({ year, player, points }) => (
              <div
                key={year}
                className="flex items-center justify-between rounded-md border border-border/40 bg-background/40 p-3"
              >
                <div className="flex items-center gap-3">
                  <Crown className="size-4 text-court" />
                  <div>
                    <div className="font-display text-lg">{year}</div>
                    <div className="text-xs text-muted-foreground">
                      {player?.country}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-medium">
                    {player?.name ?? "—"}
                  </div>
                  <div className="font-mono text-xs text-court">
                    {points.toLocaleString()} pts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Titles */}
        <div className="rounded-xl border border-border/60 bg-card/60 p-5">
          <h2 className="font-display text-xl uppercase tracking-wide">
            Most Titles
          </h2>

          <div className="mt-3 space-y-3">
            {totalTitles.map((t) => (
              <div
                key={t.player.id}
                className="rounded-md border border-border/40 bg-background/40 p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{t.player.name}</div>
                  <div className="font-display text-2xl text-court">
                    {t.titles}
                  </div>
                </div>

                <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                  <span>{t.slams} Slams</span>
                  <span>{t.masters} Masters</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}