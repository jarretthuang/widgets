"use client";

import type { ReactNode } from "react";
import WidgetCard from "@/components/WidgetCard";

type WidgetBuilderLayoutProps = {
  children: ReactNode;
  title: string;
  widgetUrl: string;
  configTitle?: string;
  widgetIframeClassName?: string;
};

export default function WidgetBuilderLayout({
  children,
  title,
  widgetUrl,
  configTitle = "Configurations",
  widgetIframeClassName,
}: WidgetBuilderLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col gap-8 md:gap-4">
      <h1 className="px-1">{title}</h1>
      <section>
        <h2>{configTitle}</h2>
        {children}
      </section>
      <WidgetCard
        iframeClassName={widgetIframeClassName}
        widgetUrl={widgetUrl}
      />
    </div>
  );
}
