import HomeLayout from "@/components/HomeLayout";
import Countdown from "@/app/time/Countdown";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Widgets | Time",
  description: "A collection of web widgets for time-related information",
};

export default function TimePage() {
  return (
    <HomeLayout title="time">
      <Countdown />
    </HomeLayout>
  );
}
