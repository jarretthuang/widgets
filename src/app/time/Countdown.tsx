"use client";
import React, { useState } from "react";
import ConstructionIcon from "@mui/icons-material/Construction";
import { Datepicker } from "flowbite-react";
import WidgetCard from "@/components/WidgetCard";

export default function Countdown() {
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const countdownWidgetUrl = `/time/countdown?till=${date.getTime()}&description=${description}`;

  return (
    <div className="flex h-full w-full flex-col gap-16 md:gap-8">
      <h1>
        Countdown{" "}
        <ConstructionIcon
          className="cursor-pointer active:opacity-50 hover:opacity-50"
          titleAccess="Work in progress"
        />
      </h1>
      <section>
        <h2>Configurations</h2>
        <h3>Target Date</h3>
        <Datepicker
          className="max-w-56"
          defaultDate={date}
          onSelectedDateChanged={setDate}
        />
        <h3>Description</h3>
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 p-2 dark:text-slate-700"
          placeholder="Optional description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </section>
      <WidgetCard widgetUrl={countdownWidgetUrl} />
    </div>
  );
}
