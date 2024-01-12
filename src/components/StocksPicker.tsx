"use client";
import LinkIcon from "@mui/icons-material/Link";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Switch } from "react-aria-components";

type PresetStock = {
  symbol: string;
  displayName: string;
};

function PresetStock(symbol: string, displayName: string): PresetStock {
  return { symbol, displayName };
}

export default function StocksPicker() {
  const [stockSymbol, updateStockSymbol] = useState("SPX500");
  const [debouncedStockSymbol] = useDebounce(stockSymbol, 500);
  const [useDarkMode, setUseDarkMode] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const theme = useDarkMode ? "dark" : "light";
  const stockChartUrl = `/finance/stocks?symbol=${debouncedStockSymbol}&theme=${theme}`;
  const updateStockSymbolWithDefault = (symbol: string) => {
    const symbolOrDefault = symbol ? symbol : "SPX500";
    updateStockSymbol(symbolOrDefault);
  };

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
  }

  const renderStockChart = () => {
    if (hasLoaded) {
      return (
        <div className="flex-1 rounded-lg border bg-white/50 px-8 py-6 shadow-lg dark:border-stone-700 dark:bg-stone-950/50">
        <div className="flex items-center whitespace-nowrap pb-2 text-lg">
          <span className="pr-2 font-medium">Live Chart</span>
          <a
            className="cursor-pointer hover:opacity-80"
            href={stockChartUrl}
            target="_blank"
          >
            <LinkIcon fontSize="large" />
          </a>
        </div>
        <iframe
          className="mb-4 h-[450px] w-full rounded-lg border bg-transparent p-4 dark:border-stone-700"
          src={stockChartUrl}
        ></iframe>
      </div>
      );
    }
  }

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <div className="py-2 text-3xl">
        <span className="pr-2 font-semibold">Stocks</span>
      </div>
      <div className="flex w-full flex-col gap-2 whitespace-nowrap rounded-lg border bg-white/50 px-8 py-6 shadow-lg dark:border-stone-700 dark:bg-stone-950/50">
        <span className="pb-2 text-lg font-medium">Stock Symbol</span>
        <input
          type="text"
          placeholder="Stock Symbol"
          className="input w-full rounded-lg border border-stone-400 bg-white  bg-white/0 p-2 focus:border-stone-800 focus:outline-none md:w-72 dark:border-stone-700 dark:focus:border-gray-600"
          value={stockSymbol}
          onChange={(e) => updateStockSymbolWithDefault(e.target.value)}
        />
        <div className="flex cursor-pointer select-none flex-wrap gap-4 py-2">
          {presetStocks.map((stock) => (
            <div
              key={stock.symbol}
              className="rounded border  bg-lime-50/80 px-2 py-1 font-medium active:bg-lime-100/70 data-[selected=true]:bg-lime-100/70 hover:bg-lime-100/70 dark:border-stone-700 dark:bg-stone-800 dark:active:bg-stone-900 dark:data-[selected=true]:bg-stone-900 dark:hover:bg-stone-900"
              data-selected={debouncedStockSymbol === stock.symbol}
              onClick={() => updateStockSymbolWithDefault(stock.symbol)}
            >
              {stock.displayName}
            </div>
          ))}
        </div>
        <span className="pb-2 text-lg font-medium">Theme</span>
        {renderThemeToggle()}
      </div>
      {renderStockChart()}
    </div>
  );
}
