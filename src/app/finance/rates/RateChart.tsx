"use client";

import TimeSeriesChart, {
  type TimeSeriesDatum,
} from "@/components/TimeSeriesChart";

export type RateObservation = TimeSeriesDatum;

export default function RateChart({
  observations,
  theme,
}: {
  observations: RateObservation[];
  theme: "dark" | "light";
}) {
  return (
    <TimeSeriesChart
      ariaLabel="Interactive rates chart with labeled observations"
      color="#0891b2"
      observations={observations}
      theme={theme}
      valueFormatter={formatPercent}
    />
  );
}

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}
