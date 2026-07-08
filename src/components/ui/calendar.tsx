"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      data-slot="calendar"
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        root: "relative",
        months: "flex flex-col gap-4",
        month: "space-y-4",
        month_caption: "flex h-9 items-center justify-center",
        caption_label: "text-sm font-medium",
        nav: "absolute inset-x-3 top-3 flex h-9 items-center justify-between",
        button_previous:
          "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40",
        button_next:
          "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40",
        chevron: "size-4",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "flex size-9 items-center justify-center rounded-md text-[0.8rem] font-normal text-muted-foreground",
        weeks: "flex flex-col gap-1",
        week: "flex w-full",
        day: "relative size-9 p-0 text-center text-sm",
        day_button:
          "flex size-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50",
        selected:
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary/90",
        today: "[&>button]:bg-accent [&>button]:text-accent-foreground",
        outside: "text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-50",
        hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}

export { Calendar };
