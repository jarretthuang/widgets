"use client";

import {
  AreaSeries,
  ColorType,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type MouseEventParams,
  type Time,
} from "lightweight-charts";
import React, { useEffect, useMemo, useRef, useState } from "react";

export type TimeSeriesDatum = {
  date: string;
  value: number;
};

type TimeSeriesChartProps = {
  ariaLabel: string;
  axisDateFormatter?: (date: string, isCondensed: boolean) => string;
  className?: string;
  color?: string;
  dateFormatter?: (date: string) => string;
  observations: TimeSeriesDatum[];
  theme?: "dark" | "light";
  valueFormatter?: (value: number) => string;
};

const defaultColor = "#0891b2";

export default function TimeSeriesChart({
  ariaLabel,
  axisDateFormatter = formatAxisDate,
  className = "",
  color = defaultColor,
  dateFormatter = formatDate,
  observations,
  theme = "light",
  valueFormatter = formatNumber,
}: TimeSeriesChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const [activeDatum, setActiveDatum] = useState<TimeSeriesDatum | null>(null);
  const isDark = theme === "dark";
  const chartData = useMemo(
    () =>
      observations.map((observation) => ({
        originalDate: observation.date,
        time: observation.date as Time,
        value: observation.value,
      })),
    [observations]
  );

  useEffect(() => {
    const chartContainer = chartContainerRef.current;

    if (!chartContainer) {
      return;
    }

    const chart = createChart(chartContainer, {
      autoSize: true,
      crosshair: {
        horzLine: {
          labelVisible: false,
        },
        vertLine: {
          labelVisible: false,
        },
      },
      grid: {
        horzLines: {
          color: isDark
            ? "rgba(214, 211, 209, 0.18)"
            : "rgba(120, 113, 108, 0.16)",
        },
        vertLines: {
          color: isDark
            ? "rgba(214, 211, 209, 0.14)"
            : "rgba(120, 113, 108, 0.12)",
        },
      },
      handleScale: {
        axisDoubleClickReset: true,
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
      handleScroll: {
        horzTouchDrag: true,
        mouseWheel: true,
        pressedMouseMove: true,
        vertTouchDrag: false,
      },
      layout: {
        attributionLogo: false,
        background: {
          color: "transparent",
          type: ColorType.Solid,
        },
        textColor: isDark ? "rgb(214, 211, 209)" : "rgb(120, 113, 108)",
      },
      leftPriceScale: {
        borderVisible: false,
        entireTextOnly: true,
        visible: true,
      },
      localization: {
        priceFormatter: valueFormatter,
      },
      rightPriceScale: {
        visible: false,
      },
      timeScale: {
        borderVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
        lockVisibleTimeRangeOnResize: true,
        rightOffset: 0,
        tickMarkFormatter: (time: Time) => axisDateFormatter(String(time), true),
      },
    });
    const series = chart.addSeries(AreaSeries, {
      bottomColor: `${color}08`,
      lineColor: color,
      lineWidth: 3,
      priceLineVisible: false,
      topColor: `${color}47`,
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const handleCrosshairMove = (params: MouseEventParams<Time>) => {
      const seriesData = params.seriesData.get(series);

      if (!seriesData || !("value" in seriesData) || !params.time) {
        setActiveDatum(null);
        return;
      }

      setActiveDatum({
        date: String(params.time),
        value: seriesData.value,
      });
    };

    chart.subscribeCrosshairMove(handleCrosshairMove);

    return () => {
      chart.unsubscribeCrosshairMove(handleCrosshairMove);
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [axisDateFormatter, color, isDark, valueFormatter]);

  useEffect(() => {
    if (!seriesRef.current || !chartRef.current) {
      return;
    }

    seriesRef.current.setData(chartData);
    chartRef.current.timeScale().fitContent();
  }, [chartData]);

  return (
    <div
      className={`min-h-0 flex-1 ${isDark ? "bg-black" : "bg-white"} ${className}`}
    >
      <div className="relative h-full min-h-0 min-w-0">
        <div
          aria-label={ariaLabel}
          className="h-full min-h-0"
          ref={chartContainerRef}
          role="img"
        />
        {activeDatum && (
          <div
            className={`pointer-events-none absolute right-4 top-3 z-20 rounded-lg px-3 py-2 text-left text-xs shadow-sm ${
              isDark ? "bg-white text-stone-950" : "bg-stone-950 text-white"
            }`}
          >
            <div className="font-semibold">
              {dateFormatter(activeDatum.date)}
            </div>
            <div className="mt-1 text-base font-bold">
              {valueFormatter(activeDatum.value)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatNumber(value: number) {
  return value.toLocaleString("en", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parseDate(value));
}

function formatAxisDate(value: string, isCondensed: boolean) {
  const date = parseDate(value);

  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
}

function parseDate(value: string) {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);

  if (!dateMatch) {
    return new Date(value);
  }

  return new Date(
    Number(dateMatch[1]),
    Number(dateMatch[2]) - 1,
    Number(dateMatch[3])
  );
}
