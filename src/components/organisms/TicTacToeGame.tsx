"use client";

import { useUser } from "@/contexts/UserContext";
import { Suspense, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Button from "../atoms/Button";
import { useRouter } from "next/navigation";

import CountdownTimer from "../organisms/CountdownTimer";
import Header from "./Header";
import Room from "../atoms/Room";
import Subtitle from "../atoms/Subtitle";
import CountupPlayers from "../atoms/CountupPlayers";
import ConnectedPlayers from "../molecules/ConectedPlayers";
import RoomAndPassword from "./RoomAndPassword";
import CanvasTicTacToeBoard, { Cell } from "../organisms/CanvasTicTacToeBoard";
import PlayHistory, { Move } from "../molecules/PlayHistory";
import PlayerBoxes from "../organisms/PlayerBoxes";
import GameResultMessage from "./GameResultMessage";
import Confetti from "react-confetti";
import PlayRematch from "../molecules/PlayRematch";

interface Props {
  roomId: string;
}

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
  REMATCH: "rematch",
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

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
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

  const isGameFinish = !!winner || draw;

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
    const {
      board: serverBoard,
      history: serverHistory,
      symbol: serverSymbol,
      currentTurn: serverCurrentTurn,
      isMyTurn: serverIsMyTurn,
      winner: serverWinner,
      draw: serverDraw,
    } = data;
    setBoard(serverBoard);
    setHistory(serverHistory);
    setCurrentTurn(serverCurrentTurn);
    setWinner(serverWinner);
    setDraw(serverDraw);
    setStatus(serverIsMyTurn ? "Your turn" : "Waiting for opponent...");

    if (serverSymbol) {
      setSymbol(serverSymbol);
    }
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

  const handleRematch = (rematch: boolean) => {
    if (!rematch) {
      route.push("/");
    }
  };

  useEffect(() => {
    if (symbol && currentTurn) {
      setIsMyTurn(currentTurn === symbol);
    }
  }, [currentTurn, board]);

  useEffect(() => {
    if (!user?.uid) return;

    const socket = io(
      `${process.env.NEXT_PUBLIC_GATEWAY_ADDRESS}/tic-tac-toe`,
      {
        query: { room: roomId, userId: user.uid },
        auth: { token: user.accessToken },
      }
    );

    setSocket(socket);

    socket.on(ACTIONS.CONNECT, handleConnect);
    socket.on(ACTIONS.ONLINE, handleOnline);
    socket.on(ACTIONS.KICK_OFF, handleKickOff);
    socket.on(ACTIONS.START, handleStart);
    socket.on(ACTIONS.GAME_STATE, handleGameState);
    socket.on(ACTIONS.ERROR, handleError);
    socket.on(ACTIONS.REMATCH, handleRematch);
    socket.on(ACTIONS.DISCONNECT, handleDisconnect);

    return () => {
      socket.disconnect();
    };
  }, [user, roomId]);

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleOnClickRematch = (rematch: boolean) => {
    if (socket) {
      socket.emit(ACTIONS.REMATCH, rematch);
    }
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
          <div className="w-full">
            <Header />

            <div className="p-4">
              {symbol && (
                <PlayerBoxes symbol={symbol} currentTurn={currentTurn} />
              )}

              <div className="flex justify-center items-center w-full relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <GameResultMessage
                    winner={winner}
                    draw={draw}
                    playerSymbol={symbol!}
                  />
                </div>

                <CanvasTicTacToeBoard
                  board={board}
                  isMyTurn={isMyTurn}
                  onMove={handleMove}
                />
              </div>

              <div className="mt-6">
                {isGameFinish ? (
                  <PlayRematch onFinish={handleOnClickRematch} />
                ) : (
                  <PlayHistory history={history} />
                )}
              </div>
            </div>

            {winner === symbol && (
              <Confetti
                width={dimensions.width}
                height={dimensions.height}
                recycle={false}
                numberOfPieces={250}
                gravity={0.3}
                className="pointer-events-none fixed top-0 left-0 z-50"
              />
            )}
          </div>
        )}
      </div>
    </Suspense>
  );
}
