"use client"

import { Switch } from "@/components/ui/switch";
import { AppShell } from "@/components/tennis/AppShell";
import { PlayerAvatar } from "@/components/tennis/PlayerAvatar";
import { AddPlayerDialog } from "@/components/players/AddPlayerDialog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";



export default function SettingsPage() {
  const players = useQuery(api.players.getAll)

  if (!players) {
    return (
      <AppShell title="Matches">
        Loading...
      </AppShell>
    );
  }
  return (
    <AppShell title="Settings" eyebrow="Configuration" actions={<AddPlayerDialog />}>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Players */}
        <div className="lg:col-span-2 rounded-xl border border-border/60 bg-card/60 p-5">
          <h3 className="font-display text-lg uppercase tracking-wide">
            Players
          </h3>

          <p className="text-xs text-muted-foreground">
            The All competitors of the rivalry tour.
          </p>

          <div className="mt-4 space-y-3">
            {players.map((p) => (
              <div
                key={p._id}
                className="flex items-center gap-4 rounded-md border border-border/40 bg-background/40 p-4"
              >
                <PlayerAvatar player={p} size="lg" />

                <div className="flex-1">
                  <div className="font-display text-xl">{p.name}</div>

                  <div className="text-xs text-muted-foreground">
                    {p.country} · {p.hand}-handed · {p.height}
                  </div>
                </div>

                <div
                  className="size-4 rounded-full"
                  style={{ background: p.color }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border/60 bg-card/60 p-5">
            <h3 className="font-display text-lg uppercase tracking-wide">
              Preferences
            </h3>

            <div className="mt-3 space-y-3">
              {[
                { label: "Dark Mode", checked: true },
                { label: "Live Match Alerts", checked: true },
                { label: "Weekly Recap Email", checked: false },
              ].map((p) => (
                <div
                  key={p.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm">{p.label}</span>
                  <Switch defaultChecked={p.checked} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AppShell>
  );
}