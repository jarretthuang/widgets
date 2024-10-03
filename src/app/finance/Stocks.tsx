"use client";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Switch } from "react-aria-components";
import WidgetCard from "@/components/WidgetCard";

type PresetStock = {
  symbol: string;
  displayName: string;
};

function PresetStock(symbol: string, displayName: string): PresetStock {
  return { symbol, displayName };
}

export default function Stocks() {
  const [stockSymbol, updateStockSymbol] = useState("SPX500");
  const [debouncedStockSymbol] = useDebounce(stockSymbol, 500);
  const [useDarkMode, setUseDarkMode] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const theme = useDarkMode ? "dark" : "light";
  const stockChartUrl = `/finance/stocks?symbol=${debouncedStockSymbol}&theme=${theme}`;

  const presetStocks = [
    PresetStock("SPX500", "🇺🇸 S&P 500"),
    PresetStock("AAPL", "🇺🇸 Apple"),
    PresetStock("TSLA", "🇺🇸 Tesla"),
    PresetStock("TSX", "🇨🇦 Toronto"),
    PresetStock("399001", "🇨🇳 Shenzhen"),
  ];

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
          className="group flex cursor-pointer select-none items-center gap-2"
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
          <h3>Stock Symbol</h3>
          <input
            type="text"
            placeholder="Stock Symbol"
            className="input w-full rounded-lg border border-stone-400 bg-white  bg-white/0 p-2 focus:border-stone-800 focus:outline-none md:w-72 dark:border-stone-700 dark:focus:border-gray-600"
            value={stockSymbol}
            onChange={(e) => updateStockSymbol(e.target.value)}
          />
          <div className="flex cursor-pointer select-none flex-wrap gap-4 py-2">
            {presetStocks.map((stock) => (
              <div
                key={stock.symbol}
                className="rounded-lg border border-gray-300 bg-green-100 px-2 py-1 font-medium active:bg-green-50 data-[selected=true]:bg-green-50 hover:bg-green-50 dark:border-stone-700 dark:bg-stone-800 dark:active:bg-stone-700 dark:data-[selected=true]:bg-stone-700 dark:hover:bg-stone-700"
                data-selected={debouncedStockSymbol === stock.symbol}
                onClick={() => updateStockSymbol(stock.symbol)}
              >
                {stock.displayName}
              </div>
            ))}
          </div>
          <h3>Theme</h3>
          {renderThemeToggle()}
        </section>
        <WidgetCard widgetUrl={stockChartUrl} />
      </div>
    </>
  );
}
