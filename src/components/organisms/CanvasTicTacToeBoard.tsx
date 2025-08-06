"use client";

import { useEffect, useRef, useState } from "react";

export type Cell = "x" | "o" | null;

interface Props {
  board: Cell[][];
  isMyTurn: boolean;
  onMove: (x: number, y: number) => void;
}

export default function CanvasTicTacToeBoard({
  board,
  isMyTurn,
  onMove,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState(300);
  const [animations, setAnimations] = useState<
    { x: number; y: number; player: "x" | "o"; startTime: number }[]
  >([]);

  const COLORS = {
    LINES: "#101828",
    X: "#4a95e9",
    O: "#fb556f",
  };

  const SIZES = {
    LINE_WIDTH_X: 12,
    LINE_WIDTH_O: 12,
  };
  const animateSymbols = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = canvasSize / 3;
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    ctx.strokeStyle = COLORS.LINES;
    ctx.lineWidth = 8;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvasSize);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvasSize, i * cellSize);
      ctx.stroke();
    }

    board.forEach((row, x) => {
      row.forEach((cell, y) => {
        const anim = animations.find((a) => a.x === x && a.y === y);
        const centerX = y * cellSize + cellSize / 2;
        const centerY = x * cellSize + cellSize / 2;

        let scale = 1;
        let opacity = 1;

        if (anim) {
          const elapsed = performance.now() - anim.startTime;
          const duration = 300; // ms

          if (elapsed < duration) {
            const progress = elapsed / duration;
            scale =
              progress < 0.5
                ? progress * 2 // 0 → 1
                : 1.2 - (progress - 0.5) * 0.4; // 1 → 1.0
            opacity = progress;
          } else {
            setAnimations((prev) =>
              prev.filter((a) => !(a.x === x && a.y === y))
            );
          }
        }

        if (cell) {
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.scale(scale, scale);
          ctx.globalAlpha = opacity;

          if (cell === "x") {
            ctx.strokeStyle = COLORS.X;
            ctx.lineWidth = SIZES.LINE_WIDTH_X;
            ctx.beginPath();
            ctx.moveTo(-cellSize / 4, -cellSize / 4);
            ctx.lineTo(cellSize / 4, cellSize / 4);
            ctx.moveTo(cellSize / 4, -cellSize / 4);
            ctx.lineTo(-cellSize / 4, cellSize / 4);
            ctx.stroke();
          } else if (cell === "o") {
            ctx.strokeStyle = COLORS.O;
            ctx.lineWidth = SIZES.LINE_WIDTH_O;
            ctx.beginPath();
            ctx.arc(0, 0, cellSize / 4, 0, Math.PI * 2);
            ctx.stroke();
          }

          ctx.restore();
        }
      });
    });

    if (animations.length > 0) {
      requestAnimationFrame(animateSymbols);
    }
  };

  const drawBoard = (ctx: CanvasRenderingContext2D, cellSize: number) => {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    ctx.strokeStyle = COLORS.LINES;
    ctx.lineWidth = 8;

    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvasSize);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvasSize, i * cellSize);
      ctx.stroke();
    }

    board.forEach((row, x) => {
      row.forEach((cell, y) => {
        const centerX = y * cellSize + cellSize / 2;
        const centerY = x * cellSize + cellSize / 2;

        if (cell === "x") {
          ctx.strokeStyle = COLORS.X;
          ctx.lineWidth = SIZES.LINE_WIDTH_X;
          ctx.beginPath();
          ctx.moveTo(centerX - cellSize / 4, centerY - cellSize / 4);
          ctx.lineTo(centerX + cellSize / 4, centerY + cellSize / 4);
          ctx.moveTo(centerX + cellSize / 4, centerY - cellSize / 4);
          ctx.lineTo(centerX - cellSize / 4, centerY + cellSize / 4);
          ctx.stroke();
        } else if (cell === "o") {
          ctx.strokeStyle = COLORS.O;
          ctx.lineWidth = SIZES.LINE_WIDTH_O;
          ctx.beginPath();
          ctx.arc(centerX, centerY, cellSize / 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = canvasSize / 3;
    drawBoard(ctx, cellSize);
  }, [board, canvasSize]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMyTurn) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    const x = Math.floor((relY / canvasSize) * 3);
    const y = Math.floor((relX / canvasSize) * 3);

    if (board[x][y] === null) {
      onMove(x, y);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const newSize = Math.floor(width);
        setCanvasSize(newSize);

        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = newSize;
          canvas.height = newSize;
        }
      }
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-sm aspect-square mx-auto">
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className="w-full h-full rounded-xl shadow-md border-8 border-gray-900 bg-gray-800"
      />
    </div>
  );
}
