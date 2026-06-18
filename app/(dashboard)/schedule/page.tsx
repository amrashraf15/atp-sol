import type { Metadata } from "next";
import ScheduleClient from "./schedule-client";


export const metadata: Metadata = {
  title: "Schedule — ATP Rivalry",
};

export default function Page() {
  return <ScheduleClient />;
}