export type RateCountry = "US" | "CA" | "CN";

export type RateSeries = {
  country: RateCountry;
  id: string;
  label: string;
  shortLabel: string;
  description: string;
};

export const RATE_COUNTRIES = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "CN", label: "China" },
] as const satisfies { label: string; value: RateCountry }[];

export const RATE_SERIES = [
  {
    country: "US",
    id: "FEDFUNDS",
    label: "Federal funds rate",
    shortLabel: "Fed funds rate",
    description: "Effective federal funds rate",
  },
  {
    country: "US",
    id: "DGS2",
    label: "2-year Treasury yield",
    shortLabel: "2Y Treasury yield",
    description: "Market yield on U.S. Treasury securities at 2-year maturity",
  },
  {
    country: "US",
    id: "DGS10",
    label: "10-year Treasury yield",
    shortLabel: "10Y Treasury yield",
    description: "Market yield on U.S. Treasury securities at 10-year maturity",
  },
  {
    country: "US",
    id: "MORTGAGE30US",
    label: "30-year mortgage rate",
    shortLabel: "30Y mortgage rate",
    description: "Average 30-year fixed mortgage rate",
  },
  {
    country: "CA",
    id: "IR3TIB01CAM156N",
    label: "3-month interbank rate",
    shortLabel: "3M interbank rate",
    description: "Canada 3-month or 90-day interbank rate",
  },
  {
    country: "CA",
    id: "IRLTLT01CAM156N",
    label: "10-year government bond yield",
    shortLabel: "10Y government bond yield",
    description: "Canada 10-year government bond yield",
  },
  {
    country: "CN",
    id: "IR3TIB01CNM156N",
    label: "3-month interbank rate",
    shortLabel: "3M interbank rate",
    description: "China 3-month or 90-day interbank rate",
  },
] as const satisfies RateSeries[];

export const DEFAULT_RATE_SERIES_ID = RATE_SERIES[0].id;
export const DEFAULT_RATE_COUNTRY: RateCountry =
  RATE_SERIES[0].country;

export function getRateSeries(seriesId?: string): RateSeries {
  return (
    RATE_SERIES.find((series) => series.id === seriesId) ??
    RATE_SERIES[0]
  );
}

export function getRateSeriesForCountry(
  country: RateCountry
): RateSeries[] {
  return RATE_SERIES.filter((series) => series.country === country);
}
