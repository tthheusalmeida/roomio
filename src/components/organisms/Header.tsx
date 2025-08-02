"use client";

import { useEffect, useState } from "react";
import Container from "@/components/atoms/Container";
import { useUser } from "@/contexts/UserContext";
import { getFirstName } from "@/utils/text";
import { SiSecurityscorecard } from "react-icons/si";

export default function Header() {
  const { user } = useUser();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Container className="flex flex-col pt-8 pb-4 text-white text-sm bg-violet-950">
      <div className="flex flex-row justify-between font-semibold">
        <span>Olá, {getFirstName(user?.name ?? "")}</span>

        <span className="flex items-center gap-2">
          <SiSecurityscorecard size={16} className="inline" /> 1024 pts
        </span>
      </div>
    </Container>
  );
}
