import StockChart from "@/app/finance/stocks/StockChart";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const stockSymbol = searchParams["symbol"] ?? "AMEX:VOO";
  const height = searchParams["height"] ?? "400";

  return {
    title: stockSymbol,
    description: `A widget that displays a live chart of the stock ${stockSymbol}`,
  };
}

export default function StocksPage({ params, searchParams }: Props) {
  const stockSymbol = searchParams["symbol"] ?? "AMEX:VOO";
  const height = searchParams["height"] ?? "400";
  const allowChange: boolean = searchParams["allowChange"] === "true";
  const theme: string = searchParams["theme"] ?? "light";

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
