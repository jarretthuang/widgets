"use client";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Switch } from "react-aria-components";
import Input from "@/components/Input";
import StockPresets from "./StockPresets";
import WidgetCard from "@/components/WidgetCard";

export default function Stocks() {
  const [stockSymbol, updateStockSymbol] = useState("SPX500");
  const [debouncedStockSymbol] = useDebounce(stockSymbol, 500);
  const [useDarkMode, setUseDarkMode] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const theme = useDarkMode ? "dark" : "light";
  const stockChartUrl = `/finance/stocks?symbol=${debouncedStockSymbol}&theme=${theme}`;

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setUseDarkMode(true);
    }
    setHasLoaded(true);
  }, []);

  const renderThemeToggle = () => {
    if (hasLoaded) {
      return (
        <Switch
          className="group flex w-min cursor-pointer select-none items-center gap-2"
          isSelected={useDarkMode}
          onChange={setUseDarkMode}
        >
          <div className="box-border flex h-[26px] w-[44px] shrink-0 rounded-full border border-solid border-white/30 bg-stone-200/80 bg-clip-padding p-[3px] shadow-inner outline-none ring-black transition duration-200 ease-in-out group-focus-visible:ring-2 group-pressed:opacity-80  group-selected:bg-stone-700/50">
            <span className="h-[18px] w-[18px] translate-x-0 transform rounded-full bg-white shadow transition duration-200 ease-in-out group-selected:translate-x-[100%] group-selected:border-stone-700 group-selected:bg-stone-900" />
          </div>
          <span>{useDarkMode ? "Dark" : "Light"}</span>
        </Switch>
      );
    }
  };

  return (
    <>
      <h1 className="px-1">Stocks</h1>
      <div className="flex h-full w-full flex-col gap-16 md:gap-8">
        <section>
          <h2>Configurations</h2>
          <h3>Stock (Asset) Symbol</h3>
          <Input
            className="md:w-72"
            placeholder="e.g. SPX500, AAPL"
            value={stockSymbol}
            onChange={updateStockSymbol}
          ></Input>
          <StockPresets
            currentSymbol={debouncedStockSymbol}
            onSelect={updateStockSymbol}
          />
          <h3>Theme</h3>
          {renderThemeToggle()}
        </section>
        <WidgetCard widgetUrl={stockChartUrl} />
      </div>
    </>
  );
}
