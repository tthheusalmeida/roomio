import { mergeClassNames } from "@/utils/classNames";

interface CountdownTimerProps {
  label: string;
  className?: string;
}

export default function Room({ label, className }: CountdownTimerProps) {
  return (
    <h4
      className={mergeClassNames(
        "w-full h-11 flex items-center justify-center font-medium text-base bg-violet-900 text-violet-100 rounded-lg",
        className
      )}
    >
      {label}
    </h4>
  );
}
