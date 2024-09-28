"use client";
import React, { useState } from 'react';
import dayjs from 'dayjs';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Datepicker } from "flowbite-react";

export default function Countdown() {
  const [date, setDate] = useState<Date>(new Date());
  const daysRemaining = date ? dayjs(date).diff(dayjs(), 'day') : undefined;

  return (
    <div className="flex h-full w-full flex-col gap-16 md:gap-8">
      <h1>Countdown <ConstructionIcon className="hover:opacity-50 active:opacity-50 cursor-pointer" titleAccess="Work in progress" /></h1>
      <section>
        <h2>Configurations</h2>
        <h3>Target Date</h3>
        <Datepicker className="max-w-56" defaultDate={date} onSelectedDateChanged={setDate}/>
      </section>
      <section>
        <h2>Widget</h2>
        <div className="text-xl">
          {daysRemaining !== undefined ?
            `${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) !== 1 ? 's' : ''} ${daysRemaining >= 0 ? 'till' : 'past'} ${date.toLocaleDateString()}` :
            "Select a date"}
        </div>
      </section>
    </div>
  );
}
