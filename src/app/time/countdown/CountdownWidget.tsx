import React from "react";
import dayjs from "dayjs";

export default function CountdownWidget( { date }: { date: Date | undefined } ) {
  const daysRemaining = date ? dayjs(date).diff(dayjs(), 'day') : undefined;
  return (
    <div className="w-full h-screen flex text-2xl">
      <div className="m-auto">
        {daysRemaining !== undefined ?
          `${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) !== 1 ? 's' : ''} ${daysRemaining >= 0 ? 'till' : 'past'} ${date?.toLocaleDateString()}` :
          "Select a date"}
      </div>
    </div>
  );
}
