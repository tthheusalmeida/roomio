"use client";

import { useState } from "react";
import ProgressBar from "@/components/atoms/ProgressBar";
import CountdownTimer from "@/components/organisms/CountdownTimer";

interface CountdownWithProgressProps {
  initialMinutes: number;
  onFinish?: () => void;
  className?: string;
  height?: string;
  color?: string;
  showLabel?: boolean;
  mode?: "both" | "bar" | "timer";
  shouldStop?: boolean;
}

export default function CountdownWithProgress({
  initialMinutes,
  onFinish,
  className,
  height = "h-2",
  color = "bg-green-600",
  showLabel = true,
  mode = "both",
  shouldStop,
}: CountdownWithProgressProps) {
  const [progress, setProgress] = useState(0);

  return (
    <div className={`w-full space-y-1 ${className}`}>
      {(mode === "bar" || mode === "both") && (
        <ProgressBar
          value={progress}
          height={height}
          color={color}
          showLabel={showLabel}
        />
      )}

      {(mode === "timer" || mode === "both") && (
        <CountdownTimer
          initialMinutes={initialMinutes}
          onFinish={onFinish}
          onProgress={setProgress}
          className="text-center"
          shouldStop={shouldStop}
        />
      )}
    </div>
  );
}
