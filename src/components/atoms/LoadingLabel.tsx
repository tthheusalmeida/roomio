import { mergeClassNames } from "@/utils/classNames";

interface LoadingLabelProps {
  label: string;
  className?: string;
}

export default function LoadingLabel({ label, className }: LoadingLabelProps) {
  return (
    <span className={mergeClassNames("animate-pulse", className)}>{label}</span>
  );
}
