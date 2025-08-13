import { Metadata } from "next";
import GameClient from "@/components/organisms/GameClient";
import ProtectedPage from "@/templates/ProtectedPage";

export const metadata: Metadata = {
  other: {
    "theme-color": "#4d179a",
  },
};

export default function Game() {
  return (
    <ProtectedPage>
      <GameClient />
    </ProtectedPage>
  );
}
