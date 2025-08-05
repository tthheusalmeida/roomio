import { mergeClassNames } from "@/utils/classNames";
import Title from "./Title";

interface CountupPlayersProps {
  current: number;
  max: number;
  className?: string;
}

export default function CountupPlayers({
  current,
  max,
  className,
}: CountupPlayersProps) {
  return (
    <Title
      className={mergeClassNames(
        "text-4xl font-medium flex items-center justify-center h-24",
        className
      )}
    >
      {current} / {max}
    </Title>
  );
}
