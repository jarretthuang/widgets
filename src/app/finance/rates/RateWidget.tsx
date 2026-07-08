import { getRateSeries } from "@/app/finance/rates/series";
import RateChart from "@/app/finance/rates/RateChart";
import RateWidgetTheme from "@/app/finance/rates/RateWidgetTheme";

type FredObservation = {
  date: string;
  value: string;
};

type FredObservationsResponse = {
  observations?: FredObservation[];
  error_message?: string;
};

type RateObservation = {
  date: string;
  value: number;
};

type RateData =
  | {
      status: "ready";
      observations: RateObservation[];
    }
  | { status: "missing-key" }
  | { status: "empty" }
  | { message: string; status: "error" };

const revalidateSeconds = 60 * 60 * 24 * 7;
const rateFrequency = "m";

export default async function RateWidget({
  months,
  seriesId,
  theme,
}: {
  months: number;
  seriesId: string;
  theme: "dark" | "light";
}) {
  const series = getRateSeries(seriesId);
  const data = await getRateData(series.id, months);
  const isDark = theme === "dark";

  return (
    <>
      <RateWidgetTheme theme={theme} />
      <main
        className={`flex h-svh w-full overflow-hidden ${
          isDark ? "bg-black text-stone-50" : "bg-white text-stone-900"
        }`}
      >
        <div
          className={`flex min-h-0 w-full flex-col gap-2 border px-4 py-3 ${
            isDark
              ? "border-stone-800 bg-black"
              : "border-stone-200 bg-white"
          }`}
        >
          <header className="flex shrink-0 items-start">
            <div className="min-w-0">
              <h1 className="truncate py-0 text-base font-semibold md:text-lg">
                {series.country} · {formatTitle(series.shortLabel)} ·{" "}
                {formatRange(months)}
              </h1>
              <p
                className={`truncate text-xs ${
                  isDark ? "text-stone-400" : "text-stone-500"
                }`}
              >
                {series.description}
              </p>
            </div>
          </header>
          {renderContent(data, theme)}
        </div>
      </main>
    </>
  );
}

async function getRateData(
  seriesId: string,
  months: number
): Promise<RateData> {
  const apiKey = process.env.FRED_API_KEY;

  if (!apiKey) {
    return { status: "missing-key" };
  }

  const observationStart = getObservationStartDate(months);
  const observationsUrl = new URL(
    "https://api.stlouisfed.org/fred/series/observations"
  );
  observationsUrl.search = new URLSearchParams({
    api_key: apiKey,
    file_type: "json",
    aggregation_method: "eop",
    frequency: rateFrequency,
    observation_start: observationStart,
    series_id: seriesId,
  }).toString();

  try {
    const observationsResponse = await fetch(observationsUrl, {
      next: { revalidate: revalidateSeconds },
    });

    const observationsJson =
      (await observationsResponse.json()) as FredObservationsResponse;

    if (!observationsResponse.ok) {
      return {
        message: observationsJson.error_message ?? "FRED returned an error.",
        status: "error",
      };
    }

    const observations = (observationsJson.observations ?? [])
      .map((observation) => ({
        date: observation.date,
        value: Number(observation.value),
      }))
      .filter((observation) => Number.isFinite(observation.value))
      .sort((left, right) => left.date.localeCompare(right.date));

    if (observations.length === 0) {
      return { status: "empty" };
    }

    return {
      observations,
      status: "ready",
    };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "Unable to load FRED data.",
      status: "error",
    };
  }
}

function getObservationStartDate(months: number) {
  const boundedMonths = Math.min(Math.max(months, 1), 120);
  const date = new Date();
  date.setMonth(date.getMonth() - boundedMonths);
  return date.toISOString().slice(0, 10);
}

function renderContent(data: RateData, theme: "dark" | "light") {
  if (data.status === "missing-key") {
    return (
      <WidgetMessage
        title="FRED_API_KEY required"
        body="Add a free FRED API key to your environment to load this widget."
        theme={theme}
      />
    );
  }

  if (data.status === "error") {
    return (
      <WidgetMessage
        title="Unable to load rates"
        body={data.message}
        theme={theme}
      />
    );
  }

  if (data.status === "empty") {
    return (
      <WidgetMessage
        title="No observations"
        body="FRED did not return data for this series and range."
        theme={theme}
      />
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2">
      <RateChart observations={data.observations} theme={theme} />
    </div>
  );
}

function WidgetMessage({
  body,
  theme,
  title,
}: {
  body: string;
  theme: "dark" | "light";
  title: string;
}) {
  const isDark = theme === "dark";

  return (
    <div
      className={`flex min-h-0 flex-1 flex-col items-center justify-center p-8 text-center ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <h2 className="py-0 text-xl font-bold">{title}</h2>
      <p
        className={`mt-2 max-w-sm text-sm ${
          isDark ? "text-stone-400" : "text-stone-500"
        }`}
      >
        {body}
      </p>
    </div>
  );
}

function formatRange(months: number) {
  if (months % 12 === 0) {
    return `${months / 12}Y`;
  }

  return `${months}M`;
}

function formatTitle(label: string) {
  return label
    .split(" ")
    .map((word) => {
      if (/^\d+[A-Z]+$/i.test(word)) {
        return word.toUpperCase();
      }

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}
