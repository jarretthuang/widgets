"use client";
import { Link2 } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WidgetCard({
  iframeClassName = "",
  widgetUrl,
}: {
  iframeClassName?: string;
  widgetUrl: string;
}) {
  const [showPing, setShowPing] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  return (
    <Card className="flex-1 gap-2 px-5 py-4 md:px-8 md:py-6">
      <CardHeader className="p-0">
        <CardTitle className="relative flex w-fit items-center gap-2 whitespace-nowrap py-2 text-lg font-semibold md:py-1">
          <span>Widget</span>
          {hasLoaded && (
            <a
              aria-label="Open widget in a new tab"
              className={buttonVariants({
                className: "rounded-full",
                size: "icon-lg",
                variant: "ghost",
              })}
              href={widgetUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setShowPing(false)}
            >
              <Link2 className="size-6" />
            </a>
          )}

          {showPing && (
            <span className="absolute right-[-0.35rem] top-3 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-300 opacity-75 dark:bg-slate-100"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-400 dark:bg-slate-200"></span>
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {hasLoaded && (
          <iframe
            className={`mb-2 h-[445px] w-full rounded-lg border bg-transparent px-2 py-4 dark:border-stone-700 md:px-5 md:py-5 ${iframeClassName}`}
            key={widgetUrl}
            src={widgetUrl}
            title="Widget preview"
            loading="eager"
          ></iframe>
        )}
      </CardContent>
    </Card>
  );
}
