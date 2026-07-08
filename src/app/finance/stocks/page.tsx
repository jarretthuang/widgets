import StockChart from "@/app/finance/stocks/StockChart";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const stockSymbol = getSingleValue(resolvedSearchParams["symbol"]) ?? "AMEX:VOO";

  return {
    title: stockSymbol,
    description: `A widget that displays a live chart of the stock ${stockSymbol}`,
  };
}

export default async function StocksPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const stockSymbol = getSingleValue(resolvedSearchParams["symbol"]) ?? "AMEX:VOO";
  const height = getSingleValue(resolvedSearchParams["height"]) ?? "400";
  const allowChange = getSingleValue(resolvedSearchParams["allowChange"]) === "true";
  const theme = getSingleValue(resolvedSearchParams["theme"]) ?? "light";

  return (
    <>
      <StockChart
        stockSymbol={stockSymbol}
        height={height}
        allowChange={allowChange}
        theme={theme}
      ></StockChart>
    </>
  );
}

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
