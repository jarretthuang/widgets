import type { Metadata, ResolvingMetadata } from "next";
import RateWidget from "@/app/finance/rates/RateWidget";
import { getRateSeries } from "@/app/finance/rates/series";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const series = getRateSeries(getSingleValue(resolvedSearchParams["series"]));

  return {
    title: series.label,
    description: `A widget that displays ${series.label.toLowerCase()} from FRED.`,
  };
}

export default async function RatesPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const series = getRateSeries(getSingleValue(resolvedSearchParams["series"]));
  const months = parseMonths(getSingleValue(resolvedSearchParams["months"]));
  const theme = getSingleValue(resolvedSearchParams["theme"]) === "dark" ? "dark" : "light";

  return (
    <RateWidget
      months={months}
      seriesId={series.id}
      theme={theme}
    />
  );
}

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parseMonths(value?: string) {
  const months = Number(value);

  if (!Number.isFinite(months)) {
    return 60;
  }

  return Math.min(Math.max(Math.round(months), 1), 120);
}
