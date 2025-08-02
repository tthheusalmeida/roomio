"use client";

import Container from "@/components/atoms/Container";
import { useUser } from "@/contexts/UserContext";
import { getFirstName } from "@/utils/text";
import { useEffect, useState } from "react";
import { SiSecurityscorecard } from "react-icons/si";

function renderHeader(name: string, points: number) {
  return (
    name &&
    points && (
      <>
        <span>{name && `Olá, ${name}`}</span>

        <span className="flex items-center gap-2">
          <SiSecurityscorecard size={16} className="inline" /> {points} pts
        </span>
      </>
    )
  );
}

export default function Header() {
  const { user, isLoadingUser } = useUser();

  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (user) {
      setName(getFirstName(user!.name as string));
    }
  }, []);

  if (isLoadingUser) return null;

  return (
    <Container className="flex flex-col pt-8 pb-4 text-white text-sm bg-violet-950">
      <div className="flex flex-row justify-between font-semibold">
        {renderHeader(name, 1024)}
      </div>
    </Container>
  );
}
