"use client";

import { SeasonProvider } from "@/lib/SeasonContext";

export default function SeasonProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SeasonProvider>{children}</SeasonProvider>;
}