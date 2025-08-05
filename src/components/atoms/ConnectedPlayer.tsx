import { mergeClassNames } from "@/utils/classNames";

interface ConnectedPlayerProps {
  name: string;
  className?: string;
}

export default function ConnectedPlayer({
  name,
  className,
}: ConnectedPlayerProps) {
  return (
    <div className={mergeClassNames("flex items-center gap-2", className)}>
      <div className="w-2 h-2 rounded-full border bg-green-500" />
      <span className="font-medium text-xs text-violet-100">{name}</span>
    </div>
  );
}
