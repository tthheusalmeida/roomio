"use client";

import { useEffect, useState } from "react";
import { SiSecurityscorecard } from "react-icons/si";
import Avatar from "../atoms/Avatar";
import Container from "@/components/atoms/Container";
import { useUser } from "@/contexts/UserContext";
import { useTotalScores } from "@/hooks/scores";
import LoadingIcon from "../atoms/LoadingIcon";

export default function Header() {
  const { user, isLoadingUser } = useUser();

  const [name, setName] = useState<string>("");
  const { data, isLoading } = useTotalScores();

  useEffect(() => {
    if (user) {
      setName(user!.name as string);
    }
  }, [user?.name]);

  if (isLoadingUser) return null;

  return (
    <Container className="flex flex-col py-4 text-[var(--color-foreground)] text-sm bg-violet-900">
      <div className="flex flex-row justify-between font-semibold">
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
              <span className="text-lg text-violet-100">
                {isLoading ? <LoadingIcon /> : <span>{data} points</span>}
              </span>
            </span>
          </div>
        )}
      </div>
    </Container>
  );
}
