"use client";

import Container from "@/components/atoms/Container";
import { useUser } from "@/contexts/UserContext";
import { getFirstName } from "@/utils/text";
import { useEffect, useState } from "react";
import { SiSecurityscorecard } from "react-icons/si";
import Avatar from "../atoms/Avatar";

function renderHeader(name: string, points: number) {
  const { user } = useUser();

  return (
    name && (
      <>
        {name && user && (
          <div className="flex justify-between w-full">
            <div className="flex gap-2 items-center">
              <Avatar
                src={user.photoURL as string}
                name={user.name as string}
                size="small"
              />

              <span className="text-lg text-violet-100">{name}</span>
            </div>

            <span className="flex items-center gap-2">
              <span className="text-lg text-violet-100">{points}</span>
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
  }, [user?.name]);

  if (isLoadingUser) return null;

  return (
    <Container className="flex flex-col pt-8 pb-4 text-[var(--color-foreground)] text-sm bg-violet-950">
      <div className="flex flex-row justify-between font-semibold">
        {renderHeader(name, 1024)}
      </div>
    </Container>
  );
}
