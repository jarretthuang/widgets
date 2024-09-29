"use client";
import React, { useEffect, useState } from "react";
import ConstructionIcon from '@mui/icons-material/Construction';
import { Datepicker } from "flowbite-react";
import WidgetCard from "@/components/WidgetCard";

export default function Countdown() {
  const [date, setDate] = useState<Date>(new Date());
  const countdownWidgetUrl = `/time/countdown?till=${date.getTime()}`;

  return (
    <div className="flex h-full w-full flex-col gap-16 md:gap-8">
      <h1>Countdown <ConstructionIcon className="hover:opacity-50 active:opacity-50 cursor-pointer" titleAccess="Work in progress" /></h1>
      <section>
        <h2>Configurations</h2>
        <h3>Target Date</h3>
        <Datepicker className="max-w-56" defaultDate={date} onSelectedDateChanged={setDate}/>
      </section>
      <WidgetCard widgetUrl={countdownWidgetUrl}/>
    </div>
  );
}
