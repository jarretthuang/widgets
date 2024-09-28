"use client";
import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function Countdown() {
  const [value, setValue] = useState<Dayjs | null>(dayjs()); // Set initial date to current date
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null); // State for days remaining

  useEffect(() => {
    if (!value) return; // Skip if no value is set

    const targetDate = value; // Get the selected target date
    const intervalId = setInterval(() => {
      const now = dayjs();
      const diffDays = targetDate.diff(now, 'day'); // Calculate the difference in days
      setDaysRemaining(diffDays); // Update days remaining
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [value]); // Re-run effect when value changes

  return (
    <div className="flex h-full w-full flex-col gap-16 md:gap-8">
      <h1>Countdown <ConstructionIcon className="hover:opacity-50 active:opacity-50 cursor-pointer" titleAccess="Work in progress" /></h1>
      <section>
        <h2>Configurations</h2>
        <h3>Target Date</h3>
        {/*TODO: dark mode theme*/}
        <div className="dark:bg-white flex dark:px-2 dark:py-4 rounded">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="w-60 mui-date-picker"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>
        </div>
      </section>
      <section>
        <h2>Widget</h2>
        <div className="text-xl">
          {daysRemaining !== null ?
            `${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) !== 1 ? 's' : ''} ${daysRemaining >= 0 ? 'till' : 'past'} ${value?.format('YYYY-MM-DD')}` :
            "Select a date"}
        </div>
      </section>
    </div>
  );
}
