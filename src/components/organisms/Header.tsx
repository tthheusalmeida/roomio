"use client";

import Container from "@/components/atoms/Container";
import { useUser } from "@/contexts/UserContext";
import { getFirstName } from "@/utils/text";
import { useEffect, useState } from "react";
import { SiSecurityscorecard } from "react-icons/si";
import Image from "next/image";

function renderHeader(name: string, points: number) {
  const { user } = useUser();

  return (
    name && (
      <>
        {name && user && (
          <div className="flex justify-between w-full">
            <div className="flex gap-2 items-center">
              <Image
                src={user.photoURL as string}
                alt={`${user.name} avatar`}
                width={28}
                height={28}
                className="rounded-full relative"
              />
              <span className="text-lg">{name}</span>
            </div>

            <span className="flex items-center gap-2">
              <span className="text-lg">{points}</span>
              <SiSecurityscorecard size={24} className="inline" />
            </span>
          </div>
        )}
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
    <Container className="flex flex-col pt-8 pb-4 text-var(--color-foreground)text-sm bg-violet-950">
      <div className="flex flex-row justify-between font-semibold">
        {renderHeader(name, 1024)}
      </div>
    </Container>
  );
}
