import HomeLayout from "@/components/HomeLayout";
import type { Metadata } from "next";
import StocksPicker from "@/components/StocksPicker";
export const metadata: Metadata = {
  title: "Widgets | Finance",
  description: "A collection of web widgets for finance",
};

export default function Finance() {
  return (
    <HomeLayout title="finance">
      <StocksPicker />
    </HomeLayout>
  );
}
