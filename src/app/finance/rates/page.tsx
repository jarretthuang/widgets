import type { Metadata, ResolvingMetadata } from "next";
import RateWidget from "@/app/finance/rates/RateWidget";
import { getRateSeries } from "@/app/finance/rates/series";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const series = getRateSeries(searchParams["series"]);

  return {
    title: series.label,
    description: `A widget that displays ${series.label.toLowerCase()} from FRED.`,
  };
}

export default function RatesPage({ searchParams }: Props) {
  const series = getRateSeries(searchParams["series"]);
  const months = parseMonths(searchParams["months"]);
  const theme = searchParams["theme"] === "dark" ? "dark" : "light";

  return (
    <RateWidget
      months={months}
      seriesId={series.id}
      theme={theme}
    />
  );
}

function parseMonths(value?: string) {
  const months = Number(value);

  if (!Number.isFinite(months)) {
    return 60;
  }

  return Math.min(Math.max(Math.round(months), 1), 120);
}
