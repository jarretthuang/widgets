import HomeLayout from "@/components/HomeLayout";
import Countdown from "@/components/client/Countdown";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Widgets | Time",
  description: "A collection of web widgets for time-related information",
};

export default function Time() {
  return (
    <HomeLayout title="time">
      <Countdown />
    </HomeLayout>
  );
}
