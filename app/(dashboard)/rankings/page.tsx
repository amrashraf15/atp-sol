import type { Metadata } from "next";
import RankingsClient from "./rankings-client";


export const metadata: Metadata = {
  title: "Rankings — ATP Rivalry",
  description:
    "Live ATP-style rankings with points, titles, and rank movement.",
};

export default function Page() {
  return <RankingsClient />;
}