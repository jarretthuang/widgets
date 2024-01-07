"use client";
import LinkIcon from "@mui/icons-material/Link";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function StocksPicker() {
  const [stockSymbol, updateStockSymbol] = useState("AMEX:VOO");
  const [debouncedStockSymbol] = useDebounce(stockSymbol, 500);

  const stockChartUrl = `/finance/stocks?symbol=${debouncedStockSymbol}`;

  return (
    <div className="flex h-full w-full flex-col">
      <div className="py-4 text-2xl">
        <span className="pr-2">Stocks</span>
      </div>
      <div className="flex w-full flex-col whitespace-nowrap py-4 md:w-72">
        <span className="pb-2 text-lg">Stock Symbol</span>
        <input
          type="text"
          placeholder="Stock Symbol"
          className="input w-full rounded-lg border-2 border-slate-500 bg-transparent bg-white p-2 focus:border-slate-300 focus:outline-none dark:border-slate-200 dark:focus:border-gray-400"
          value={stockSymbol}
          onChange={(e) => updateStockSymbol(e.target.value)}
        />
      </div>
      <div className="flex-1 py-4">
        <div className="flex items-center whitespace-nowrap pb-2 text-lg">
          <span className="pr-2">Live Chart</span>
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
