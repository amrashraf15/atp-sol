import type { Metadata } from "next";
import DashboardClient from "./dashboard-client";


export const metadata: Metadata = {
  title: "Dashboard — ATP Rivalry",
  description:
    "Live overview of the rivalry: World No.1, rankings, latest match and season trajectory.",
  openGraph: {
    title: "Dashboard — ATP Rivalry",
  },
};

export default function Home() {
  return <DashboardClient />;
}