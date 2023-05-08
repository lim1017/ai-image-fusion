import React, { useState, useEffect } from "react";

interface TimerProps {
  isActive: boolean;
}

const Timer = ({ isActive }: TimerProps) => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isActive) {
      intervalId = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isActive]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <h1>{formatTime(seconds)}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timer;
