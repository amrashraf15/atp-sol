"use client";

import { tournamentsBySeason, getPlayer } from "@/lib/tennis-data";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { AppShell } from "@/components/tennis/AppShell";
import { SurfaceBadge } from "@/components/tennis/SurfaceBadge";
import { useSeason } from "@/lib/useSeason";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ScheduleClient() {
  const { year } = useSeason();
  const tours = tournamentsBySeason(year);

  const byMonth = MONTHS.map((m) => ({
    month: m,
    items: tours.filter((t) => t.month === m),
  })).filter((x) => x.items.length);

  return (
    <AppShell title="Schedule" eyebrow={`${year} Season Calendar`}>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 hidden w-px bg-linear-to-b from-court/40 via-border to-transparent md:block" />

        <div className="space-y-8">
          {byMonth.map(({ month, items }) => (
            <div key={month} className="md:pl-12">
              <div className="relative mb-3 flex items-center gap-3">
                <div className="absolute -left-12 hidden size-3 -translate-y-px rounded-full bg-court ring-4 ring-background md:block" />

                <h2 className="font-display text-3xl uppercase tracking-wide">
                  {month}
                </h2>

                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {items.length} event{items.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {items.map((t) => {
                  const ch = t.championId
                    ? getPlayer(t.championId)
                    : null;

                  return (
                    <Link
                      key={t.id}
                      href={`/tournaments/${t.id}?year=${year}`}
                      className="block rounded-lg border border-border/60 bg-card/60 p-4 transition hover:border-court/50"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <SurfaceBadge surface={t.surface} />

                            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                              {t.category}
                            </span>
                          </div>

                          <h3 className="mt-2 font-display text-xl uppercase">
                            {t.name}
                          </h3>

                          <p className="text-xs text-muted-foreground">
                            {t.city}, {t.country}
                          </p>
                        </div>

                        <div className="text-right font-mono text-xs text-muted-foreground">
                          {t.startDate.slice(5)}
                          <div>→ {t.endDate.slice(5)}</div>
                        </div>
                      </div>

                      {ch && (
                        <div className="mt-3 inline-flex items-center gap-1 rounded-sm border border-court/40 bg-court/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-court">
                          <Trophy className="size-3" /> {ch.shortName}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}