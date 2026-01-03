import React from "react";

type Country = "US" | "CA" | "CN";
type StockType = "index" | "tech" | "crypto";

type PresetStock = {
  symbol: string;
  displayName: string;
  type: StockType;
  country?: Country;
};

function createPresetStock(
  symbol: string,
  displayName: string,
  type: StockType,
  country?: Country
): PresetStock {
  return { symbol, displayName, country, type };
}

const presetStocks = [
  createPresetStock("SPX500", "S&P 500", "index", "US"),
  createPresetStock("NDX", "NASDAQ 100", "index", "US"),
  createPresetStock("DJI", "Dow Jones", "index", "US"),
  createPresetStock("TSX", "Toronto", "index", "CA"),
  createPresetStock("399001", "Shenzhen", "index", "CN"),

  createPresetStock("AAPL", "Apple", "tech", "US"),
  createPresetStock("TSLA", "Tesla", "tech", "US"),
  createPresetStock("MSFT", "Microsoft", "tech", "US"),
  createPresetStock("NVDA", "NVIDIA", "tech", "US"),
  createPresetStock("AMZN", "Amazon", "tech", "US"),
  createPresetStock("GOOGL", "Google", "tech", "US"),
  createPresetStock("META", "Meta", "tech", "US"),

  createPresetStock("BTC", "Bitcoin", "crypto"),
  createPresetStock("ETH", "Ethereum", "crypto"),
];

interface StockPresetsProps {
  currentSymbol: string;
  onSelect: (symbol: string) => void;
}

export default function StockPresets({
  currentSymbol,
  onSelect,
}: StockPresetsProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  const renderCountryEmoji = (country?: Country) => {
    switch (country) {
      case "US":
        return "🇺🇸";
      case "CA":
        return "🇨🇦";
      case "CN":
        return "🇨🇳";
    }
    return "";
  };

  const indexStocks = presetStocks.filter((stock) => stock.type === "index");
  const techStocks = presetStocks.filter((stock) => stock.type === "tech");
  const cryptoStocks = presetStocks.filter((stock) => stock.type === "crypto");

  const renderStocks = (stocks: PresetStock[], title: string) => {
    return <div>
      <h4>{title}</h4>
      <div className="flex cursor-pointer select-none flex-wrap gap-4 py-2">
        {
          stocks.map((stock) => (
            <button
              key={stock.symbol}
              className="rounded-lg border border-gray-300 data-[selected=true]:border-gray-400 hover:border-gray-400 px-2 py-1 font-medium bg-white active:bg-gray-50 hover:bg-gray-50 data-[selected=true]:bg-gray-100 dark:border-stone-700 dark:bg-stone-800 dark:active:bg-stone-700 dark:data-[selected=true]:bg-stone-700 dark:hover:bg-stone-700"
              data-selected={currentSymbol === stock.symbol}
              onClick={() => onSelect(stock.symbol)}
            >
              {stock.displayName}
              <span className="ml-2 text-gray-500">{renderCountryEmoji(stock.country)}</span>
            </button>
          ))
        }
      </div>
    </div>
  }

  return (
    <div className="flex flex-col gap-2 p-2">

      {isVisible && (
        <>
          {renderStocks(indexStocks, "Indices")}
          {renderStocks(techStocks, "Tech")}
          {renderStocks(cryptoStocks, "Crypto")}
        </>
      )}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 self-start mb-2"
      >
        {isVisible ? "Hide presets" : "Show presets"}
      </button>
    </div>
  );
}
