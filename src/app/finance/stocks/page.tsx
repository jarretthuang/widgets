"use client";
import React, { memo } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";

function Stocks() {
  const searchParams = useSearchParams();

  const stockSymbol = searchParams.get("symbol") ?? "AMEX:VOO";

  const config = `
  {
    "autosize": true,
    "symbol": "${stockSymbol}",
    "interval": "D",
    "timezone": "Etc/UTC",
    "theme": "light",
    "style": "1",
    "locale": "en",
    "enable_publishing": false,
    "allow_symbol_change": true,
    "support_host": "https://www.tradingview.com"
  }`;

  return (
    <>
      <Script
        src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
        id="script"
      >
        {config}
      </Script>
    </>
  );
}

export default memo(Stocks);
