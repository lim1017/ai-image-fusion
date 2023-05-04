import { useState, useEffect } from "react";

const Countdown = ({
  seconds,
  children,
}: {
  seconds: number;
  children: React.ReactNode;
}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  useEffect(() => {
    // Exit early when we reach 0
    if (!timeLeft) return;

    // Save intervalId to clear the interval when the component unmounts
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);
  return (
    <div>
      {timeLeft === 0 ? <div>{children}</div> : <div>Timeout:{timeLeft}</div>}
    </div>
  );
};

export default Countdown;
