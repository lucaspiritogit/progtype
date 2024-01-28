import { useState, useEffect } from "react";

type TimerProps = {
  typingStarted: boolean;
  typingEnded: boolean;
  resetTimer: boolean;
};

const Timer = ({ typingStarted, typingEnded, resetTimer }: TimerProps) => {
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0, milliseconds: 0 });

  useEffect(() => {
    let timerInterval: any;

    if (typingStarted && !typingEnded) {
      const startTime = Date.now();

      timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const minutes = Math.floor(elapsedTime / (60 * 1000));
        const seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
        const milliseconds = elapsedTime % 1000;

        setTimer({ minutes, seconds, milliseconds });
      }, 10);
    }
    if (resetTimer) {
      setTimer({ minutes: 0, seconds: 0, milliseconds: 0 });
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [typingStarted, typingEnded, resetTimer]);

  return (
    <p>
      Total time: {timer.minutes}m {timer.seconds}s {timer.milliseconds}ms
    </p>
  );
};

export default Timer;
