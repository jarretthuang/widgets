import React, { memo } from "react";
import Script from "next/script";

function Chart({
  stockSymbol,
  height,
  allowChange,
  theme,
}: {
  stockSymbol: string;
  height: string;
  allowChange: boolean;
  theme: string;
}) {
  const config = `
  {
    "height": "${height}",
    "symbol": "${stockSymbol}",
    "interval": "D",
    "timezone": "Etc/UTC",
    "theme": "${theme}",
    "style": "1",
    "locale": "en",
    "enable_publishing": false,
    "allow_symbol_change": ${allowChange},
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
