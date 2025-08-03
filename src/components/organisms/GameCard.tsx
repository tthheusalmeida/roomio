import { mergeClassNames } from "@/utils/classNames";
import Button from "../atoms/Button";

interface GameCardProps {
  title: string;
  image: string;
  online?: number;
}

export default function GameCard({ title, image, online = 0 }: GameCardProps) {
  return (
    <div
      className={mergeClassNames(
        "h-full flex flex-col justify-between",
        "bg-[var(--color-foreground)] border border-violet-200 rounded-lg shadow-sm",
        "bg-violet-950 border-violet-500"
      )}
    >
      <div className="flex flex-col justify-between">
        <img
          className="rounded-t-lg bg-[var(--color-foreground)] block"
          src={image}
          alt={`${title} game preview`}
        />

        <h5 className="p-4 text-lg font-semibold text-violet-900 dark:text-[var(--color-foreground)]">
          {title}
        </h5>
      </div>
      <div className="flex flex-col gap-2 items-start p-4 pt-0">
        <span className="flex gap-2 items-center text-sm">
          <div className="w-3 h-3 border-white border-2 bg-green-500 rounded-full" />
          {online} playing
        </span>

        <Button variant="secondary">Play</Button>
      </div>
    </div>
  );
}
