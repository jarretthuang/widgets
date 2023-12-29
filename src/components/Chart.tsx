"use client";
import React, { memo } from "react";
import Script from "next/script";

function Chart({
  stockSymbol,
  height,
}: {
  stockSymbol: string;
  height: string;
}) {
  const config = `
  {
    "height": "${height}",
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

export default memo(Chart);
