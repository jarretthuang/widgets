import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widgets | Finance",
  description: "A collection of web widgets for finance",
};

export default async function FinancePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const selectedTab = getSingleValue(
    resolvedSearchParams.tab ?? resolvedSearchParams.widget
  );

  if (selectedTab === "rates") {
    redirect("/app/finance/rates");
  }

  redirect("/app/finance/stocks");
}

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
