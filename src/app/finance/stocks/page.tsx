import Chart from "@/components/Chart";

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

export default function Stocks({ params, searchParams }: Props) {
  const stockSymbol = searchParams["symbol"] ?? "AMEX:VOO";
  const height = searchParams["height"] ?? "400";
  const allowChange: boolean = searchParams["allowChange"] === "true";

  return (
    <>
      <Chart
        stockSymbol={stockSymbol}
        height={height}
        allowChange={allowChange}
      ></Chart>
    </>
  );
}
