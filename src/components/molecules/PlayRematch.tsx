import { mergeClassNames } from "@/utils/classNames";
import Button from "../atoms/Button";
import CountdownWithProgress from "../organisms/CountdownWithProgress";
import { useEffect, useState } from "react";

interface TitleProps {
  onFinish: Function;
}

export default function PlayRematch({ onFinish }: TitleProps) {
  const [showPrimary, setShowPrimary] = useState(true);
  const [showSecondary, setShowSecondary] = useState(true);

  const handleCountdownTime = () => {
    onFinish?.(false);
  };

  const handleClick = (value: boolean, hidePrimary: boolean) => {
    onFinish?.(value);

    if (hidePrimary) {
      setShowPrimary(false);
    } else {
      setShowSecondary(false);
    }
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
      />

      <div className="w-full text-center text-2xl mb-2">Rematch?</div>

      <div className="w-full flex gap-4">
        <Button
          variant="primary"
          className={mergeClassNames(
            "transition-all duration-500",
            !showPrimary ? "hidden" : "visible"
          )}
          onClick={() => handleClick(false, false)}
        >
          No
        </Button>

        <Button
          variant="secondary"
          className={mergeClassNames(
            "transition-all duration-500",
            !showSecondary ? "hidden" : "visible"
          )}
          onClick={() => handleClick(true, true)}
        >
          Yes
        </Button>
      </div>
    </div>
  );
}
