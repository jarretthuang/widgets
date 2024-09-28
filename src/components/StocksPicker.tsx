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
  const [showPing, setShowPing] = useState(true);

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
  };

  const renderStockChart = () => {
    if (hasLoaded) {
      return (
        <div className="flex-1 rounded-lg border bg-white/50 px-3 py-4 shadow-lg md:px-8 md:py-6 dark:border-stone-700 dark:bg-stone-950/50">
          <h2 className="flex items-center whitespace-nowrap gap-2 relative w-fit">
            <span>Widget</span>
            <a
              className="cursor-pointer hover:opacity-80"
              href={stockChartUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setShowPing(false)}
            >
              <LinkIcon fontSize="large" />
            </a>
            {
              showPing && (
                <span className="absolute right-[-1rem] top-4 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-300 opacity-75 dark:bg-slate-100"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-400 dark:bg-slate-200"></span>
                  </span>
              )
            }
          </h2>
          <iframe
            className="mb-4 h-[450px] w-full rounded-lg border bg-transparent p-1 md:p-4 dark:border-stone-700"
            src={stockChartUrl}
          ></iframe>
        </div>
      );
    }
  };

  return (
    <>
      <h1 className="px-1">Stocks</h1>
      <div className="flex h-full w-full flex-col gap-16 md:gap-8">
        <section
          className="">
          <h2>Configurations</h2>
          <h3>Stock Symbol</h3>
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
                className="rounded-lg border border-gray-300 bg-green-100 active:bg-green-50 hover:bg-green-50 px-2 py-1 font-medium data-[selected=true]:bg-green-50 dark:border-stone-700 dark:bg-stone-800 dark:data-[selected=true]:bg-stone-700 dark:hover:bg-stone-700 dark:active:bg-stone-700"
                data-selected={debouncedStockSymbol === stock.symbol}
                onClick={() => updateStockSymbolWithDefault(stock.symbol)}
              >
                {stock.displayName}
              </div>
            ))}
          </div>
          <h3>Theme</h3>
          {renderThemeToggle()}
        </section>
        {renderStockChart()}
      </div>
    </>
  );
}
