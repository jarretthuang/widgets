"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import WidgetBuilderLayout from "@/components/WidgetBuilderLayout";
import {
  DEFAULT_RATE_COUNTRY,
  DEFAULT_RATE_SERIES_ID,
  RATE_COUNTRIES,
  type RateCountry,
  getRateSeriesForCountry,
} from "@/app/finance/rates/series";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const rangeOptions = [
  { value: "12", label: "1Y" },
  { value: "36", label: "3Y" },
  { value: "60", label: "5Y" },
  { value: "120", label: "10Y" },
];

export default function Rates() {
  const { theme: appTheme, resolvedTheme } = useTheme();
  const [country, setCountry] = useState<RateCountry>(DEFAULT_RATE_COUNTRY);
  const [seriesId, setSeriesId] = useState<string>(DEFAULT_RATE_SERIES_ID);
  const [months, setMonths] = useState("60");
  const [useDarkMode, setUseDarkMode] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const theme = useDarkMode ? "dark" : "light";
  const ratesUrl = `/finance/rates?series=${seriesId}&months=${months}&theme=${theme}`;
  const countrySeries = getRateSeriesForCountry(country);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (resolvedTheme === "dark" || resolvedTheme === "light") {
      setUseDarkMode(resolvedTheme === "dark");
    }
  }, [appTheme, resolvedTheme]);

  const renderThemeToggle = () => {
    if (!hasLoaded) {
      return null;
    }

    return (
      <div className="flex w-fit select-none items-center gap-2 text-sm font-medium">
        <Switch
          aria-label={useDarkMode ? "Dark" : "Light"}
          checked={useDarkMode}
          onCheckedChange={setUseDarkMode}
        />
        <span>{useDarkMode ? "Dark" : "Light"}</span>
      </div>
    );
  };

  return (
    <WidgetBuilderLayout
      title="Rates"
      widgetIframeClassName="mb-0 h-[445px] px-0 py-0 md:px-0 md:py-0"
      widgetUrl={ratesUrl}
    >
      <h3>Country</h3>
      <Select
        onValueChange={(value) => {
          const nextCountry = value as RateCountry;
          const nextCountrySeries = getRateSeriesForCountry(nextCountry);

          setCountry(nextCountry);
          setSeriesId(nextCountrySeries[0]?.id ?? DEFAULT_RATE_SERIES_ID);
        }}
        value={country}
      >
        <SelectTrigger aria-label="Country" className="w-full md:w-72">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent align="start">
          {RATE_COUNTRIES.map((countryOption) => (
            <SelectItem key={countryOption.value} value={countryOption.value}>
              {countryOption.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <h3>Rate</h3>
      <Select onValueChange={setSeriesId} value={seriesId}>
        <SelectTrigger aria-label="Rate" className="w-full md:w-72">
          <SelectValue placeholder="Select a rate" />
        </SelectTrigger>
        <SelectContent align="start">
          {countrySeries.map((series) => (
            <SelectItem key={series.id} value={series.id}>
              {series.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <h3>Range</h3>
      <Tabs aria-label="Range" onValueChange={setMonths} value={months}>
        <TabsList>
          {rangeOptions.map((range) => (
            <TabsTrigger key={range.value} value={range.value}>
              {range.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <h3>Theme</h3>
      {renderThemeToggle()}
    </WidgetBuilderLayout>
  );
}
