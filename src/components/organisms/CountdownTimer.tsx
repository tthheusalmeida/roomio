import { useEffect, useState } from "react";
import { mergeClassNames } from "@/utils/classNames";

interface CountdownTimerProps {
  initialMinutes: number;
  onFinish?: () => void;
  onProgress?: (progress: number) => void;
  className?: string;
  shouldStop?: boolean;
}

export default function CountdownTimer({
  initialMinutes,
  onFinish,
  onProgress,
  className,
  shouldStop,
}: CountdownTimerProps) {
  const totalSeconds = initialMinutes * 60;
  const [seconds, setSeconds] = useState(totalSeconds);

  useEffect(() => {
    if (shouldStop || seconds <= 0) {
      if (seconds <= 0) onFinish?.();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => {
        const next = prev - 1;
        onProgress?.(((totalSeconds - next) / totalSeconds) * 100);
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, totalSeconds, onFinish, onProgress, shouldStop]);

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
