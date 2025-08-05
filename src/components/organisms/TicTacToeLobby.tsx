"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TicTacToeLobby() {
  const router = useRouter();

  useEffect(() => {
    const uuid = crypto.randomUUID();
    router.push(`/game/tic-tac-toe/${uuid}`);
  }, [router]);

  return null;
}
