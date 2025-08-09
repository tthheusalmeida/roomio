import { Metadata } from "next";
import GameClient from "@/components/organisms/GameClient";
import ProtectedPage from "@/templates/ProtectedPage";

export const metadata: Metadata = {
  other: {
    "theme-color": "#2f0d68",
  },
};

export default function Game() {
  return (
    <ProtectedPage>
      <GameClient />
    </ProtectedPage>
  );
}
