"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/organisms/Header";
import TicTacToeTemplate from "@/templates/TicTacToeTemplate";
import { useUser } from "@/contexts/UserContext";
import SplashScreen from "@/components/atoms/SplashScreen";

interface GameTemplateProps {
  roomId?: string;
}

const games: Record<string, React.ComponentType<GameTemplateProps>> = {
  "tic-tac-toe": TicTacToeTemplate,
};

export default function GameClient() {
  const { isLoadingUser } = useUser();
  const pathname = usePathname();

  const slug = pathname.split("/").filter(Boolean).slice(1);

  const [game, roomId] = slug;

  if (isLoadingUser) {
    return <SplashScreen />;
  }

  const GameComponent = games[game];

  return (
    <>
      {GameComponent ? (
        <GameComponent roomId={roomId} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full">
          Game not found :(
        </div>
      )}
    </>
  );
}
