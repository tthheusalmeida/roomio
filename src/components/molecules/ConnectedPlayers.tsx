import { mergeClassNames } from "@/utils/classNames";
import ConnectedPlayer from "../atoms/ConnectedPlayer";
import LoadingLabel from "../atoms/LoadingLabel";

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
      <LoadingLabel label="Waiting for players..." />

      <div className="mt-2 flex flex-col gap-2 p-4 bg-violet-900 rounded-lg">
        <span className="text-sm self-start">Connected:</span>

        {players.map((name, index) => (
          <ConnectedPlayer key={index} name={name} />
        ))}
      </div>
    </div>
  );
}
