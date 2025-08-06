"use client";

import Confetti from "react-confetti";
import { useEffect, useState } from "react";

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
  const [showConfetti, setShowConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const isWin = winner === playerSymbol;

  useEffect(() => {
    function updateDimensions() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (isWin) {
      setShowConfetti(true);
      const timeout = setTimeout(() => setShowConfetti(false), 4000); // 4s
      return () => clearTimeout(timeout);
    }
  }, [isWin]);

  if (!winner && !draw) return null;

  const message = draw ? "Draw! ⚖️" : isWin ? "You won! 🎉" : "You lost! 😯";

  return (
    <>
      {showConfetti && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          numberOfPieces={200}
          gravity={0.4}
          recycle={false}
          colors={["#4a95e9", "#fb556f", "#ffffff"]}
        />
      )}

      <p className="bg-black/50 rounded-lg p-4 text-center text-3xl font-semibold text-white transition-all duration-200">
        {message}
      </p>
    </>
  );
}
