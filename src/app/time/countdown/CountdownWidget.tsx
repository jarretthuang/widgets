import React from "react";
import dayjs from "dayjs";

export default function CountdownWidget( { date, description }: { date: Date | undefined, description?: string } ) {
  const daysRemaining = date ? dayjs(date).diff(dayjs(), 'day') : undefined;

  const render = () => {
    if (daysRemaining !== undefined) {
      return (
        <div className="m-auto flex flex-col items-center gap-2 p-8 border-2 rounded-xl dark:text-slate-100">
          <div>
            <span className="text-6xl pl-4">{`${Math.abs(daysRemaining)}`}</span>
            <span className="text-sm">{`day${Math.abs(daysRemaining) !== 1 ? "s" : ""}`}</span>
          </div>
          <span>{`${daysRemaining >= 0 ? "till" : "past"} ${date?.toLocaleDateString()}`}</span>
          <span>{description}</span>
        </div>
      )
    } else {
      return <span className="m-auto">Select a date</span>;
    }
  }
  return (
    <div className="w-full h-screen flex text-2xl">
      {render()}
    </div>
  );
}
