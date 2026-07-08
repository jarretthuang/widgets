"use client";
import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import WidgetBuilderLayout from "@/components/WidgetBuilderLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Countdown() {
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const [debouncedDescription, setDebouncedDescription] = useState<string>("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedDescription(description);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [description]);

  const countdownWidgetUrl = `/time/countdown?till=${date.getTime()}&description=${debouncedDescription}`;
  const formattedDate = date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <WidgetBuilderLayout title="Countdown" widgetUrl={countdownWidgetUrl}>
      <h3>Target Date</h3>
      <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
        <PopoverTrigger asChild>
          <Button className="w-full justify-start md:w-56" variant="outline">
            <CalendarIcon className="size-4 text-muted-foreground" />
            {formattedDate}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate);
                setIsDatePickerOpen(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>
      <h3>Description</h3>
      <Input
        placeholder="Optional description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
    </WidgetBuilderLayout>
  );
}
