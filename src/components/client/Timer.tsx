"use client";
import { useEffect, useState } from "react";

export default function Timer() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const countDown = Date.UTC(2034, 8, 31);
    const calculateTick = () => {
      const newTick = countDown - new Date().getTime();
      setTick(newTick > 0 ? newTick : 0);
    };

    const intervalId = setInterval(calculateTick, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div>Timer</div>
      <div>{tick}</div>
    </div>
  );
}
