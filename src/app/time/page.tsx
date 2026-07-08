import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widgets | Time",
  description: "A collection of web widgets for time-related information",
};

export default function TimePage() {
  redirect("/app/time/countdown");
}
