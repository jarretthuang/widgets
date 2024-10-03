import React from "react";
import dayjs from "dayjs";

export default function CountdownWidget({
  date,
  description,
}: {
  date: Date | undefined;
  description?: string;
}) {
  const daysRemaining = date ? dayjs(date).diff(dayjs(), "day") : undefined;

  const render = () => {
    if (daysRemaining !== undefined) {
      return (
        <div className="m-auto flex flex-col items-center gap-2 rounded-2xl border-2 px-16 py-12 dark:text-slate-100">
          <div>
            <span className="pl-4 text-6xl">{`${Math.abs(daysRemaining)}`}</span>
            <span className="text-sm">{`day${Math.abs(daysRemaining) !== 1 ? "s" : ""}`}</span>
          </div>
          <span>{`${daysRemaining >= 0 ? "till" : "past"} ${date?.toLocaleDateString()}`}</span>
          <span>{description}</span>
        </div>
      );
    } else {
      return <span className="m-auto">Select a date</span>;
    }
  };
  return (
    <div className="flex h-screen w-full bg-stone-50 text-2xl dark:bg-stone-950">
      {render()}
    </div>
  );
}
