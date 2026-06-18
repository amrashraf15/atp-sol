"use client";
import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { SeasonSelector } from "./SeasonSelector";

export function AppShell({
  title,
  eyebrow,
  actions,
  children,
}: {
  title: string;
  eyebrow?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border/60 bg-background/80 px-4 backdrop-blur md:px-8">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground" />
              <div className="hidden flex-col leading-tight sm:flex">
                {eyebrow && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-court">
                    {eyebrow}
                  </span>
                )}
                <h1 className="font-display text-xl uppercase tracking-wide">{title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {actions}
              <SeasonSelector />
            </div>
          </header>
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
