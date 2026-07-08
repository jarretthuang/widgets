"use client";

import TimeSeriesChart, {
  type TimeSeriesDatum,
} from "@/components/TimeSeriesChart";

export type RateObservation = TimeSeriesDatum;

export default function RateChart({
  observations,
}: {
  observations: RateObservation[];
}) {
  return (
    <TimeSeriesChart
      ariaLabel="Interactive rates chart with labeled observations"
      color="#0891b2"
      observations={observations}
      valueFormatter={formatPercent}
    />
  );
}

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}
