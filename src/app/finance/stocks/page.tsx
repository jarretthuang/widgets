import HomeLayout from "@/components/HomeLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widgets | Finance",
  description: "A collection of web widgets for finance",
};

export default function Stocks() {
  return (
    <HomeLayout title="finance / stocks">
      <h1>Finance Widgets / Stocks</h1>
      <div className="flex flex-row"></div>
    </HomeLayout>
  );
}
