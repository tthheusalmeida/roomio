export interface Move {
  x: number;
  y: number;
  player: "x" | "o";
}

interface PlayHistoryProps {
  history: Move[];
}

export default function PlayHistory({ history }: PlayHistoryProps) {
  return (
    <div className="bg-gray-800 rounded-md p-4">
      <h3 className="font-semibold text-xs mb-2 text-gray-200 z-20 relative">
        History:
      </h3>

      <div className="h-36 max-h-36 overflow-y-auto relative">
        <ul className="flex flex-col gap-1 text-sm text-gray-400 relative z-0">
          {[...history].reverse().map((move, index) => (
            <li
              className={`list-none ${
                index === 0 ? "font-semibold text-white" : ""
              }`}
              key={index}
            >
              {move.player.toUpperCase()} played at ({move.x + 1}, {move.y + 1})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
