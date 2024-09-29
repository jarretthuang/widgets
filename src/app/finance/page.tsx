import HomeLayout from "@/components/HomeLayout";
import type { Metadata } from "next";
import Stocks from "@/app/finance/Stocks";
export const metadata: Metadata = {
  title: "Widgets | Finance",
  description: "A collection of web widgets for finance",
};

export default function FinancePage() {
  return (
    <HomeLayout title="finance">
      <Stocks />
    </HomeLayout>
  );
}
