import { mergeClassNames } from "@/utils/classNames";

interface AvatarLabelProps {
  label: string;
  data: string;
  showLabel?: boolean;
  className?: string;
}

export default function AvatarLabel({
  label,
  data,
  showLabel = true,
  className,
}: AvatarLabelProps) {
  return (
    <p className={mergeClassNames("text-violet-300", className)}>
      {showLabel && (
        <label className="font-semibold text-violet-100">{label}: </label>
      )}
      <span className="font-light text-violet-300">{data}</span>
    </p>
  );
}
