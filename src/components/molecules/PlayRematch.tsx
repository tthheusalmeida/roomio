import Button from "../atoms/Button";
import CountdownWithProgress from "../organisms/CountdownWithProgress";
import { useEffect, useState } from "react";

interface TitleProps {
  onFinish: Function;
}

export default function PlayRematch({ onFinish }: TitleProps) {
  const [shouldStop, setShouldStop] = useState(false);

  const handleCountdownTime = () => {
    if (!shouldStop) {
      onFinish?.(false);
    }
  };

  const handleClick = (value: boolean) => {
    setShouldStop(true);
    onFinish?.(value);
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-gray-800 rounded-md p-4">
      <CountdownWithProgress
        initialMinutes={1}
        mode="both"
        height="h-2"
        color="bg-violet-500"
        showLabel
        onFinish={handleCountdownTime}
        shouldStop={shouldStop}
      />

      <div className="w-full text-center text-2xl mb-2">Rematch?</div>

      <div className="w-full flex gap-4">
        <Button variant="primary" onClick={() => handleClick(false)}>
          No
        </Button>
        <Button variant="secondary" onClick={() => handleClick(true)}>
          Yes
        </Button>
      </div>
    </div>
  );
}
