import FinanceAppNav from "@/app/app/finance/FinanceAppNav";
import Stocks from "@/app/finance/Stocks";
import HomeLayout from "@/components/HomeLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widgets | Finance Stocks",
  description: "Create a configurable stock chart widget",
};

export default function AppFinanceStocksPage() {
  return (
    <HomeLayout title="finance / stocks">
      <FinanceAppNav activePage="stocks" />
      <Stocks />
    </HomeLayout>
  );
}
