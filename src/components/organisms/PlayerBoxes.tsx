interface PlayerBoxesProps {
  symbol: "x" | "o";
  currentTurn: "x" | "o" | null;
}

export default function PlayerBoxes({ symbol, currentTurn }: PlayerBoxesProps) {
  const opponent = symbol === "x" ? "o" : "x";

  const boxClass = (player: "x" | "o") =>
    `flex flex-col items-center justify-center w-28 h-28 border-4 ${
      currentTurn === player ? "border-gray-300" : "border-gray-900"
    } bg-gray-800 rounded-lg text-white transition-colors duration-300 ease-in-out`;

  const symbolClass = (player: "x" | "o") =>
    `text-6xl font-bold ${player === "x" ? "text-blue-400" : "text-red-400"}`;

  return (
    <div className="flex p-4 gap-4 justify-center">
      <div className={boxClass(symbol)}>
        <span className="text-xs mb-2">You as</span>
        <span className={symbolClass(symbol)}>{symbol.toUpperCase()}</span>
      </div>

      <div className={boxClass(opponent)}>
        <span className="text-xs mb-2">Opponent as</span>
        <span className={symbolClass(opponent)}>{opponent.toUpperCase()}</span>
      </div>
    </div>
  );
}
