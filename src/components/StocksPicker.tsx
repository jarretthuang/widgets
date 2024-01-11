"use client";
import LinkIcon from "@mui/icons-material/Link";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function StocksPicker() {
  const [stockSymbol, updateStockSymbol] = useState("SPX500");
  const [debouncedStockSymbol] = useDebounce(stockSymbol, 500);

  const stockChartUrl = `/finance/stocks?symbol=${debouncedStockSymbol}`;

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <div className="py-2 text-3xl">
        <span className="pr-2 font-semibold">Stocks</span>
      </div>
      <div className="flex w-full flex-col gap-2 whitespace-nowrap rounded-lg border border-stone-700 px-8 py-6 dark:bg-stone-950/50">
        <span className="pb-2 text-lg font-medium">Stock Symbol</span>
        <input
          type="text"
          placeholder="Stock Symbol"
          className="input w-full rounded-lg border border-stone-700 bg-white bg-white/0 p-2 focus:border-slate-400 focus:outline-none md:w-72 dark:border-stone-700 dark:focus:border-gray-600"
          value={stockSymbol}
          onChange={(e) => updateStockSymbol(e.target.value)}
        />
        <div className="flex cursor-pointer select-none flex-wrap gap-4 py-2">
          <div
            className="rounded border border-stone-700 px-2 py-1 font-medium text-slate-800 hover:opacity-90 active:opacity-90 dark:bg-stone-50"
            onClick={() => updateStockSymbol("SPX500")}
          >
            🇺🇸 S&P 500
          </div>
          <div
            className="rounded border border-stone-700 px-2 py-1 font-medium text-slate-800 hover:opacity-90 active:opacity-90 dark:bg-stone-50"
            onClick={() => updateStockSymbol("AAPL")}
          >
            🇺🇸 Apple
          </div>
          <div
            className="rounded border border-stone-700 px-2 py-1 font-medium text-slate-800 hover:opacity-90 active:opacity-90 dark:bg-stone-50"
            onClick={() => updateStockSymbol("TSX")}
          >
            🇨🇦 Toronto
          </div>
          <div
            className="rounded border border-stone-700 px-2 py-1 font-medium text-slate-800 hover:opacity-90 active:opacity-90 dark:bg-stone-50"
            onClick={() => updateStockSymbol("399001")}
          >
            🇨🇳 Shenzhen
          </div>
        </div>
      </div>
      <div className="flex-1 rounded-lg border border-stone-700 px-8 py-6 dark:bg-stone-950/50">
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
          className="h-[450px] w-full rounded-lg bg-white p-4"
          src={stockChartUrl}
        ></iframe>
      </div>
    </div>
  );
}
