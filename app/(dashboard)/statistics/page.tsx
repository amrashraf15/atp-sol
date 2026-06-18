import type { Metadata } from "next";
import StatisticsClient from "./statistics-client";

export const metadata: Metadata = {
  title: "Statistics — ATP Rivalry",
};

export default function Page() {
  return <StatisticsClient />;
}