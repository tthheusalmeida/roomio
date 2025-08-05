import { mergeClassNames } from "@/utils/classNames";
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  initialMinutes: number;
  onFinish?: () => void;
  className?: string;
}

export default function CountdownTimer({
  initialMinutes,
  onFinish,
  className,
}: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);

  useEffect(() => {
    if (seconds <= 0) {
      onFinish?.();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onFinish]);

  return (
    <div className={mergeClassNames(className)}>
      <p>{formatTime(seconds)}</p>
    </div>
  );
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}
