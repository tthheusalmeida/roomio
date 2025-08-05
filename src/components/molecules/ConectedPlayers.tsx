import { mergeClassNames } from "@/utils/classNames";
import ConnectedPlayer from "../atoms/ConnectedPlayer";

interface ConnectedPlayersProps {
  players: string[];
  className?: string;
}

export default function ConnectedPlayers({
  players,
  className,
}: ConnectedPlayersProps) {
  return (
    <div className={mergeClassNames(className)}>
      <span className="animate-pulse text-xs">Connecting players...</span>

      <div className="mt-2 flex flex-col gap-2 p-4 bg-violet-900 rounded-lg">
        {players.map((name, index) => (
          <ConnectedPlayer key={index} name={name} />
        ))}
      </div>
    </div>
  );
}
