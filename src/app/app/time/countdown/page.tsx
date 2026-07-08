import Countdown from "@/app/time/Countdown";
import HomeLayout from "@/components/HomeLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widgets | Time Countdown",
  description: "Create a configurable countdown widget",
};

export default function AppTimeCountdownPage() {
  return (
    <HomeLayout title="time / countdown">
      <Countdown />
    </HomeLayout>
  );
}
