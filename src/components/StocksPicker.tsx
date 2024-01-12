"use client";
import LinkIcon from "@mui/icons-material/Link";
import { useState } from "react";
import { useDebounce } from "use-debounce";

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

  const stockChartUrl = `/finance/stocks?symbol=${debouncedStockSymbol}`;

  const presetStocks = [
    PresetStock("SPX500", "🇺🇸 S&P 500"),
    PresetStock("AAPL", "🇺🇸 Apple"),
    PresetStock("TSLA", "🇺🇸 Tesla"),
    PresetStock("TSX", "🇨🇦 Toronto"),
    PresetStock("399001", "🇨🇳 Shenzhen"),
  ];

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
          onChange={(e) => updateStockSymbol(e.target.value)}
        />
        <div className="flex cursor-pointer select-none flex-wrap gap-4 py-2">
          {presetStocks.map((stock) => (
            <div
              key={stock.symbol}
              className="rounded border  bg-lime-50/80 px-2 py-1 font-medium hover:bg-lime-100/70 active:bg-lime-100/70 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-900 dark:active:bg-stone-900"
              onClick={() => updateStockSymbol(stock.symbol)}
            >
              {stock.displayName}
            </div>
          ))}
        </div>
      </div>
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
          className="mb-4 h-[450px] w-full rounded-lg border bg-white p-4"
          src={stockChartUrl}
        ></iframe>
      </div>
    </div>
  );
}
