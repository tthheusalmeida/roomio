"use client";

import { useUser } from "@/contexts/UserContext";
import { mergeClassNames } from "@/utils/classNames";
import { Suspense, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Button from "../atoms/Button";
import { useRouter } from "next/navigation";

import CountdownTimer from "../organisms/CountdownTimer";
import Header from "./Header";
import Room from "../atoms/Room";
import Title from "../atoms/Title";
import Subtitle from "../atoms/Subtitle";
import InputLabel from "../atoms/InputLabel";
import CountupPlayers from "../atoms/CountupPlayers";
import ConnectedPlayers from "../molecules/ConectedPlayers";
import RoomAndPassword from "./RoomAndPassword";

interface Props {
  roomId: string;
}

interface Move {
  x: number;
  y: number;
  player: "x" | "o";
}

type Cell = "x" | "o" | null;

const ACTIONS = {
  CONNECT: "connect",
  ERROR: "error",
  MESSAGE: "message",
  DISCONNECT: "disconnect",
  ONLINE: "online",
  SYMBOL: "symbol",
  GAME_STATE: "game_state",
  MOVE: "move",
  START: "start",
  KICK_OFF: "kick-off",
};

const MIN_PLAYERS = 2;

interface OnlineProps {
  amount: number;
  players: string[];
}

export default function TicTacToeGame({ roomId }: Props) {
  const { user } = useUser();
  const route = useRouter();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [online, setOnline] = useState<OnlineProps>({ amount: 0, players: [] });

  const [isStarted, setIsStarted] = useState(false);
  const [symbol, setSymbol] = useState<"x" | "o" | null>(null);
  const [isMyTurn, setIsMyTurn] = useState(false);

  const [winner, setWinner] = useState<"x" | "o" | null>(null);
  const [draw, setDraw] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<"x" | "o" | null>(null);
  const [status, setStatus] = useState("Conectando...");
  const [history, setHistory] = useState<Move[]>([]);
  const [board, setBoard] = useState<Cell[][]>(
    Array(3).fill(Array(3).fill(null))
  );

  const cellIsX = (cell: string | null) => {
    return cell === "x";
  };

  const handleConnect = () => {
    console.log("Connected to the socket server");
    setConnected(true);
  };

  const handleOnline = (data: OnlineProps) => {
    if (data.amount) {
      setOnline(data);
    }
  };

  const handleKickOff = (data: any) => {
    const { symbol, currentTurn: ct, isMyTurn } = data;
    setSymbol(symbol);
    setCurrentTurn(ct);
    setStatus(isMyTurn ? "Your turn" : "Waiting for opponent...");
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleGameState = (data: any) => {
    const {
      board: serverBoard,
      currentTurn: ct,
      lastMove,
      winner,
      draw,
    } = data;

    setBoard(serverBoard);
    if (lastMove) {
      setHistory((prev) => [...prev, lastMove]);
    }
    setCurrentTurn(ct);
    setWinner(winner);
    setDraw(draw);
  };

  const handleError = (msg: string) => {
    console.error(`Erro: ${msg}`);
  };

  const handleDisconnect = () => {
    console.log("Disconnected from the socket");
    setConnected(false);
  };

  useEffect(() => {
    if (symbol && currentTurn) {
      setIsMyTurn(currentTurn === symbol);
    }
  }, [currentTurn, board]);

  useEffect(() => {
    if (!user?.uid) return;

    const socket = io("http://localhost:8080/tic-tac-toe", {
      query: { room: roomId, userId: user.uid },
      auth: { token: user.accessToken },
    });

    setSocket(socket);

    socket.on(ACTIONS.CONNECT, handleConnect);
    socket.on(ACTIONS.ONLINE, handleOnline);
    socket.on(ACTIONS.KICK_OFF, handleKickOff);
    socket.on(ACTIONS.START, handleStart);
    socket.on(ACTIONS.GAME_STATE, handleGameState);
    socket.on(ACTIONS.ERROR, handleError);
    socket.on(ACTIONS.DISCONNECT, handleDisconnect);

    return () => {
      socket.disconnect();
    };
  }, [user, roomId]);

  useEffect(() => {
    if (!isMyTurn && online.amount < MIN_PLAYERS) {
      setStatus("Opponent reconnecting...");
    }
  }, [online]);

  useEffect(() => {
    if (!symbol || !currentTurn) return;

    if (draw) {
      setStatus("Draw!");
    } else if (winner === symbol) {
      setStatus("You won!");
    } else if (winner && winner !== symbol) {
      setStatus("You lost!");
    } else {
      setStatus(
        currentTurn === symbol
          ? `Your turn (${symbol.toUpperCase()})`
          : "Waiting for opponent..."
      );
    }
  }, [symbol, currentTurn, draw, winner]);

  const handleMove = (x: number, y: number) => {
    if (!isMyTurn || !socket) return;
    socket.emit(ACTIONS.MOVE, { x, y });
  };

  return (
    <Suspense fallback={<span>Carregando...</span>}>
      <div className="flex flex-col items-center justify-center">
        {online.amount < MIN_PLAYERS && !isStarted ? (
          <div className="w-full">
            <Header />

            <div className="p-4">
              <Subtitle className="p-0 m-0">Tic-Tac-Toe</Subtitle>

              <Room label={roomId} className="mt-2" />

              <CountdownTimer
                initialMinutes={5}
                onFinish={() => route.push("/")}
                className="w-full flex items-center justify-center py-4"
              />

              <CountupPlayers current={online.amount} max={MIN_PLAYERS} />

              <ConnectedPlayers players={online.players} />

              <RoomAndPassword />

              <Button
                className="mt-8 w-full"
                variant="secondary"
                onClick={() => route.push("/")}
              >
                Back to Menu
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6 max-w-md mx-auto flex flex-col gap-4">
            <Button
              className="mt-8 w-8/12 self-center"
              variant="secondary"
              onClick={() => route.push("/")}
            >
              Back to Menu
            </Button>
            <h1 className="text-3xl font-bold text-center">
              Tic Tac Toe Online
            </h1>
            <p className="text-center text-lg">
              You play as "<span className="capitalize">{symbol}</span>"
            </p>
            <p className="text-center text-sm">{status}</p>

            <div className="grid grid-cols-3 gap-2 place-items-center aspect-square bg-gray-700 rounded-md shadow-md p-2">
              {board.map((row, x) =>
                row.map((cell, y) => (
                  <button
                    key={`${x}-${y}`}
                    onClick={() => handleMove(x, y)}
                    disabled={!!cell || !isMyTurn}
                    className={mergeClassNames(
                      "bg-gray-600",
                      "text-2xl  font-bold",
                      "w-full max-w-16 h-full max-h-16 flex items-center justify-center",
                      "rounded-md",
                      "transition-colors duration-200",
                      "hover:bg-gray-500 hover:disabled:bg-gray-600",
                      "disabled:opacity-90",
                      cellIsX(cell) ? "text-red-600" : "text-blue-600"
                    )}
                  >
                    {cell}
                  </button>
                ))
              )}
            </div>

            <div className="bg-gray-50 rounded-md shadow-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                History:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-900">
                {history.map((move, index) => (
                  <li key={index}>
                    Player {move.player.toUpperCase()} played at [{move.x + 1},{" "}
                    {move.y + 1}]
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}
