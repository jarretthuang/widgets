import HomeLayout from "@/components/HomeLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widgets | Finance",
  description: "A collection of web widgets for finance",
};

export default function Finance() {
  return (
    <HomeLayout title="finance">
      <h1>Finance Widgets</h1>
      <div className="flex flex-row"></div>
    </HomeLayout>
  );
}
