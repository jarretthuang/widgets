"use client";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useTheme } from "next-themes";
import StockPresets from "./StockPresets";
import WidgetBuilderLayout from "@/components/WidgetBuilderLayout";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function Stocks() {
  const { theme: appTheme, resolvedTheme } = useTheme();
  const [stockSymbol, updateStockSymbol] = useState("SPX500");
  const [debouncedStockSymbol] = useDebounce(stockSymbol, 500);
  const [useDarkMode, setUseDarkMode] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const theme = useDarkMode ? "dark" : "light";
  const stockChartUrl = `/finance/stocks?symbol=${debouncedStockSymbol}&theme=${theme}`;

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (resolvedTheme === "dark" || resolvedTheme === "light") {
      setUseDarkMode(resolvedTheme === "dark");
    }
  }, [appTheme, resolvedTheme]);

  const renderThemeToggle = () => {
    if (hasLoaded) {
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
    }
  };

  return (
    <WidgetBuilderLayout title="Stocks" widgetUrl={stockChartUrl}>
      <h3>Stock (Asset) Symbol</h3>
      <Input
        className="md:w-72"
        placeholder="e.g. SPX500, AAPL"
        value={stockSymbol}
        onChange={(event) => updateStockSymbol(event.target.value)}
      />
      <StockPresets
        currentSymbol={debouncedStockSymbol}
        onSelect={updateStockSymbol}
      />
      <h3>Theme</h3>
      {renderThemeToggle()}
    </WidgetBuilderLayout>
  );
}
