import { Metadata } from "next";
import GameClient from "@/components/organisms/GameClient";

export const metadata: Metadata = {
  other: {
    "theme-color": "#2f0d68",
  },
};

export default function Game() {
  return (
    <>
      <GameClient />
    </>
  );
}
