import FinanceAppNav from "@/app/app/finance/FinanceAppNav";
import Rates from "@/app/finance/Rates";
import HomeLayout from "@/components/HomeLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widgets | Finance Rates",
  description: "Create a configurable rates widget",
};

export default function AppFinanceRatesPage() {
  return (
    <HomeLayout title="finance / rates">
      <FinanceAppNav activePage="rates" />
      <Rates />
    </HomeLayout>
  );
}
