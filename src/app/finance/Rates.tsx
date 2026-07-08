"use client";

import React, { useEffect, useState } from "react";
import { Switch } from "react-aria-components";
import { useTheme } from "next-themes";
import WidgetCard from "@/components/WidgetCard";
import {
  DEFAULT_RATE_COUNTRY,
  DEFAULT_RATE_SERIES_ID,
  RATE_COUNTRIES,
  type RateCountry,
  getRateSeriesForCountry,
} from "@/app/finance/rates/series";

const rangeOptions = [
  { value: "12", label: "1Y" },
  { value: "36", label: "3Y" },
  { value: "60", label: "5Y" },
  { value: "120", label: "10Y" },
];

export default function Rates() {
  const { theme: appTheme, resolvedTheme } = useTheme();
  const [country, setCountry] = useState<RateCountry>(
    DEFAULT_RATE_COUNTRY
  );
  const [seriesId, setSeriesId] = useState<string>(
    DEFAULT_RATE_SERIES_ID
  );
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
      <Switch
        className="group flex w-min cursor-pointer select-none items-center gap-2"
        isSelected={useDarkMode}
        onChange={setUseDarkMode}
      >
        <div className="box-border flex h-[26px] w-[44px] shrink-0 rounded-full border border-solid border-white/30 bg-stone-200/80 bg-clip-padding p-[3px] shadow-inner outline-none ring-black transition duration-200 ease-in-out group-focus-visible:ring-2 group-pressed:opacity-80 group-selected:bg-stone-700/50">
          <span className="h-[18px] w-[18px] translate-x-0 transform rounded-full bg-white shadow transition duration-200 ease-in-out group-selected:translate-x-[100%] group-selected:border-stone-700 group-selected:bg-stone-900" />
        </div>
        <span>{useDarkMode ? "Dark" : "Light"}</span>
      </Switch>
    );
  };

  return (
    <>
      <h1 className="px-1">Rates</h1>
      <div className="flex h-full w-full flex-col gap-16 md:gap-8">
        <section>
          <h2>Configurations</h2>
          <h3>Country</h3>
          <select
            aria-label="Country"
            className="w-full rounded-lg border border-stone-400 bg-white/0 p-2 focus:border-stone-800 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:focus:border-gray-600 md:w-72"
            onChange={(event) => {
              const nextCountry = event.target.value as RateCountry;
              const nextCountrySeries =
                getRateSeriesForCountry(nextCountry);

              setCountry(nextCountry);
              setSeriesId(
                nextCountrySeries[0]?.id ?? DEFAULT_RATE_SERIES_ID
              );
            }}
            value={country}
          >
            {RATE_COUNTRIES.map((countryOption) => (
              <option key={countryOption.value} value={countryOption.value}>
                {countryOption.label}
              </option>
            ))}
          </select>
          <h3>Rate</h3>
          <select
            aria-label="Rate"
            className="w-full rounded-lg border border-stone-400 bg-white/0 p-2 focus:border-stone-800 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:focus:border-gray-600 md:w-72"
            onChange={(event) => setSeriesId(event.target.value)}
            value={seriesId}
          >
            {countrySeries.map((series) => (
              <option key={series.id} value={series.id}>
                {series.label}
              </option>
            ))}
          </select>
          <h3>Range</h3>
          <div className="flex flex-wrap gap-2">
            {rangeOptions.map((range) => (
              <button
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 font-medium active:bg-gray-50 data-[selected=true]:border-gray-400 data-[selected=true]:bg-gray-100 hover:border-gray-400 hover:bg-gray-50 dark:border-stone-700 dark:bg-stone-800 dark:active:bg-stone-700 dark:data-[selected=true]:bg-stone-700 dark:hover:bg-stone-700"
                data-selected={months === range.value}
                key={range.value}
                onClick={() => setMonths(range.value)}
                type="button"
              >
                {range.label}
              </button>
            ))}
          </div>
          <h3>Theme</h3>
          {renderThemeToggle()}
        </section>
        <WidgetCard
          iframeClassName="mb-0 h-[445px] px-0 py-0 md:px-0 md:py-0"
          widgetUrl={ratesUrl}
        />
      </div>
    </>
  );
}
