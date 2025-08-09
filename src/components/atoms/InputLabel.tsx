import { mergeClassNames } from "@/utils/classNames";
import { ReactNode } from "react";

export default function InputLabel({
  text,
  children,
  className,
  maxInput,
  currentInput,
}: {
  text: string;
  children: ReactNode;
  className?: string;
  maxInput?: number;
  currentInput?: string;
}) {
  return (
    <label className={mergeClassNames("my-4 block", className)}>
      <div className="w-full flex justify-between items-baseline">
        <span className="block font-semibold my-2">{text}</span>
        <span
          className={mergeClassNames(
            "block font-medium text-xs my-2 transition-all duration-200",
            maxInput && Number(currentInput?.length) > maxInput
              ? "text-red-500 font-bold"
              : ""
          )}
        >
          {currentInput?.length}/{maxInput}
        </span>
      </div>
      {children}
    </label>
  );
}
