import { useEffect, useState } from "react";
import { mergeClassNames } from "@/utils/classNames";

interface CountdownTimerProps {
  initialMinutes: number;
  onFinish?: () => void;
  onProgress?: (progress: number) => void;
  className?: string;
}

export default function CountdownTimer({
  initialMinutes,
  onFinish,
  onProgress,
  className,
}: CountdownTimerProps) {
  const totalSeconds = initialMinutes * 60;
  const [seconds, setSeconds] = useState(totalSeconds);

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

  useEffect(() => {
    if (onProgress) {
      onProgress(((totalSeconds - seconds) / totalSeconds) * 100);
    }
  }, [seconds, totalSeconds, onProgress]);

  return (
    <div className={mergeClassNames(className)}>
      <p>{formatTime(seconds)}</p>
    </div>
  );
}

function formatTime(totalSeconds: number): string {
  const roundedSeconds = Math.ceil(totalSeconds);
  const minutes = Math.floor(roundedSeconds / 60);
  const seconds = roundedSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}
