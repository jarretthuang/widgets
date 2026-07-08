import React from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Country = "US" | "CA" | "CN" | "HK" | "JP";
type StockType = "index" | "tech" | "etf" | "crypto";

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
  return { symbol, displayName: `${symbol} (${displayName})`, country, type };
}

const presetStocks = [
  createPresetStock("SPX500", "S&P 500", "index", "US"),
  createPresetStock("NASDAQ", "NASDAQ 100", "index", "US"),
  createPresetStock("DJI", "Dow Jones", "index", "US"),
  createPresetStock("TSX", "S&P/TSX", "index", "CA"),
  createPresetStock("399001", "Shenzhen Composite", "index", "CN"),
  createPresetStock("HSI", "Hang Seng Index", "index", "HK"),
  createPresetStock("NIKKEI", "Nikkei 225", "index", "JP"),

  createPresetStock("AAPL", "Apple", "tech", "US"),
  createPresetStock("TSLA", "Tesla", "tech", "US"),
  createPresetStock("MSFT", "Microsoft", "tech", "US"),
  createPresetStock("NVDA", "NVIDIA", "tech", "US"),
  createPresetStock("AMZN", "Amazon", "tech", "US"),
  createPresetStock("GOOGL", "Google", "tech", "US"),
  createPresetStock("META", "Meta", "tech", "US"),

  createPresetStock("VOO", "Vanguard S&P 500", "etf", "US"),
  createPresetStock("QQQM", "Invesco NASDAQ 100", "etf", "US"),
  createPresetStock("SPY", "SPDR S&P 500", "etf", "US"),
  createPresetStock("QQQ", "Invesco QQQ", "etf", "US"),
  createPresetStock("VTI", "Vanguard Total Stock Market", "etf", "US"),
  createPresetStock("IVV", "iShares Core S&P 500", "etf", "US"),
  createPresetStock("BND", "Vanguard Total Bond Market", "etf", "US"),
  createPresetStock("VFV", "Vanguard S&P 500", "etf", "CA"),
  createPresetStock("VEQT", "Vanguard All-Equity", "etf", "CA"),
  createPresetStock("VGRO", "Vanguard Growth Portfolio", "etf", "CA"),
  createPresetStock("VDY", "Vanguard FTSE High Dividend Yield", "etf", "CA"),

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
  const [isVisible, setIsVisible] = React.useState(false);

  const renderCountryEmoji = (country?: Country) => {
    switch (country) {
      case "US":
        return "🇺🇸";
      case "CA":
        return "🇨🇦";
      case "CN":
        return "🇨🇳";
      case "HK":
        return "🇭🇰";
      case "JP":
        return "🇯🇵";
    }
    return "";
  };

  const indexStocks = presetStocks.filter((stock) => stock.type === "index");
  const techStocks = presetStocks.filter((stock) => stock.type === "tech");
  const etfStocks = presetStocks.filter((stock) => stock.type === "etf");
  const cryptoStocks = presetStocks.filter((stock) => stock.type === "crypto");

  const renderStocks = (stocks: PresetStock[], title: string) => {
    return (
      <div>
        <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
        <ToggleGroup
          className="flex w-full flex-wrap gap-4 py-2"
          onValueChange={(symbol) => {
            if (symbol) {
              onSelect(symbol);
            }
          }}
          type="single"
          value={currentSymbol}
          variant="outline"
        >
          {stocks.map((stock) => (
            <ToggleGroupItem
              key={stock.symbol}
              className="data-[state=on]:border-primary/35 h-auto px-2 py-1 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
              value={stock.symbol}
            >
              {stock.displayName}
              <span className="ml-2 text-gray-500">
                {renderCountryEmoji(stock.country)}
              </span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      {isVisible && (
        <>
          {renderStocks(indexStocks, "Indices")}
          {renderStocks(etfStocks, "ETFs")}
          {renderStocks(techStocks, "Tech")}
          {renderStocks(cryptoStocks, "Crypto")}
        </>
      )}
      <Button
        onClick={() => setIsVisible(!isVisible)}
        className="mb-2 self-start px-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        variant="link"
      >
        {isVisible ? "Hide presets" : "Show presets"}
      </Button>
    </div>
  );
}
