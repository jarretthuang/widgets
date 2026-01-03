"use client";
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

  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    setOpacity(1);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setRotation({ x: 0, y: 0 });
  };

  const render = () => {
    if (daysRemaining !== undefined) {
      return (
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative m-auto flex flex-col items-center gap-6 rounded-3xl bg-neutral-900 p-12 text-white shadow-lg transition-all ease-out duration-200 overflow-hidden"
          style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            background: `
              radial-gradient(
                800px circle at ${mousePosition.x}px ${mousePosition.y}px,
                rgba(255, 255, 255, ${0.05 * opacity}),
                transparent 40%
              ),
              linear-gradient(to bottom right, #4b5563, #292524)
            `,
          }}
        >
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="flex items-baseline">
              <span className="text-8xl font-extrabold tracking-tighter drop-shadow-lg">
                {`${Math.abs(daysRemaining)}`}
              </span>
              <span className="ml-2 text-2xl font-medium opacity-90">{`day${Math.abs(daysRemaining) !== 1 ? "s" : ""}`}</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-lg font-light tracking-wide opacity-80 uppercase">
                {`${daysRemaining >= 0 ? "until" : "since"}`}
              </span>
              <span className="text-2xl font-bold tracking-tight">
                {date?.toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          {description && (
            <div className="relative z-10 mt-2 max-w-lg rounded-xl bg-white/20 px-6 py-2 backdrop-blur-md">
              <span className="text-lg font-medium">{description}</span>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="m-auto flex flex-col items-center justify-center gap-4 rounded-3xl bg-stone-100 p-12 text-stone-400 dark:bg-stone-900 dark:text-stone-600">
             <span className="text-6xl">📅</span>
             <span className="text-xl font-medium">Select a date to begin</span>
        </div>
      );
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-stone-50 text-2xl dark:bg-stone-950">
      {render()}
    </div>
  );
}
