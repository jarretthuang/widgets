"use client";
import React, { useState } from "react";
import ConstructionIcon from "@mui/icons-material/Construction";
import { Datepicker } from "flowbite-react";
import WidgetCard from "@/components/WidgetCard";
import Input from "@/components/Input";

export default function Countdown() {
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const [debouncedDescription, setDebouncedDescription] = useState<string>("");

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedDescription(description);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [description]);

  const countdownWidgetUrl = `/time/countdown?till=${date.getTime()}&description=${debouncedDescription}`;

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
        <Input
          placeholder="Optional description"
          value={description}
          onChange={setDescription}
        ></Input>
      </section>
      <WidgetCard widgetUrl={countdownWidgetUrl} />
    </div>
  );
}
