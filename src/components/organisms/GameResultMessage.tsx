interface GameResultMessageProps {
  winner: "x" | "o" | null;
  draw: boolean;
  playerSymbol: "x" | "o";
}

export default function GameResultMessage({
  winner,
  draw,
  playerSymbol,
}: GameResultMessageProps) {
  if (!winner && !draw) return null;

  const message = draw
    ? "Draw! ⚖️"
    : winner === playerSymbol
    ? "You won! 🎉"
    : "You lost! 😯";

  return (
    <p className="bg-black/50 rounded-lg p-4 text-center text-3xl font-semibold text-white transition-all duration-200">
      {message}
    </p>
  );
}
