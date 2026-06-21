"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Trophy,
  Swords,
  ListOrdered,
  GitCompareArrows,
  BarChart3,
  History,
  CalendarDays,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import Image from "next/image";

const ITEMS = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Rankings",
    href: "/rankings",
    icon: ListOrdered,
  },
  {
    title: "Tournaments",
    href: "/tournaments",
    icon: Trophy,
  },
  {
    title: "Matches",
    href: "/matches",
    icon: Swords,
  },
  {
    title: "Head-to-Head",
    href: "/head-to-head",
    icon: GitCompareArrows,
  },
  {
    title: "Statistics",
    href: "/statistics",
    icon: BarChart3,
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: CalendarDays,
  },
  {
    title: "History",
    href: "/history",
    icon: History,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();

  const collapsed = state === "collapsed";

  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-border/60">
      <SidebarHeader className="border-b border-border/60 px-3 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative flex size-9 items-center justify-center overflow-hidden rounded-md bg-court">
            <Image
              src="/logo.jpg"
              alt="ATP Rivalry logo"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>

          {!collapsed && (
            <div className="leading-none">
              <div className="font-display text-lg uppercase tracking-[0.2em]">
                ATP Rivalry
              </div>

              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Tour Management
              </div>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[10px] uppercase tracking-[0.2em]">
            Tour
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {ITEMS.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group/link relative flex items-center gap-3",
                          active && "text-court",
                        )}
                      >
                        {active && (
                          <span className="absolute -left-3 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-court" />
                        )}

                        <Icon className="size-4" />

                        {!collapsed && (
                          <span className="font-medium tracking-wide">
                            {item.title}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
