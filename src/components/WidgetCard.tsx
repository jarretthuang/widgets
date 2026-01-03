"use client";
import LinkIcon from "@mui/icons-material/Link";
import { useEffect, useState } from "react";

export default function WidgetCard({ widgetUrl }: { widgetUrl: string }) {
  const [showPing, setShowPing] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(true);
  });

  return (
    <div
      className="flex-1 rounded-2xl border bg-white/50 px-3 py-4 shadow-lg md:px-8 md:py-6 dark:border-stone-700 dark:bg-stone-950/50">
      <h2 className="flex items-center whitespace-nowrap gap-2 relative w-fit">
        <span>Widget</span>
        {
          hasLoaded && (
            <a
              className="cursor-pointer hover:opacity-80"
              href={widgetUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setShowPing(false)}
            >
              <LinkIcon fontSize="large" />
            </a>
          )
        }

        {
          showPing && (
            <span className="absolute right-[-1rem] top-4 flex h-3 w-3">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-300 opacity-75 dark:bg-slate-100"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-400 dark:bg-slate-200"></span>
            </span>
          )
        }
      </h2>
      {
        hasLoaded && (
          <iframe
            className="mb-4 h-[445px] w-full rounded-2xl border bg-transparent py-4 px-2 md:py-5 md:px-5 dark:border-stone-700"
            src={widgetUrl}
          ></iframe>
        )
      }
    </div>
  )
}
