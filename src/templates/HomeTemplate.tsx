"use client";

import LoadingLabel from "@/components/atoms/LoadingLabel";
import Subtitle from "@/components/atoms/Subtitle";
import GameCard from "@/components/organisms/GameCard";
import { useGames } from "@/hooks/games";
import { Game } from "@/services/games";
import { mergeClassNames } from "@/utils/classNames";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomeTemplate() {
  const router = useRouter();
  const { data, isLoading } = useGames();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const redirect = sessionStorage.getItem("redirectAfterLogin");

    if (redirect) {
      sessionStorage.removeItem("redirectAfterLogin");
      router.push(redirect);
    }
  }, [router]);

  useEffect(() => {
    if (data) {
      const { data: _games } = data;
      setGames(_games);
    }
  }, [isLoading]);

  return (
    <div className="w-full flex flex-col">
      <Subtitle>Games</Subtitle>

      <div
        className={mergeClassNames(
          "grid grid-cols-2 gap-4",
          "sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        )}
      >
        {isLoading ? (
          <div className="w-full h-8/12">
            <LoadingLabel label="Loading..." />
          </div>
        ) : (
          games?.map(({ name, slug, online }, index) => (
            <GameCard
              key={index}
              title={name}
              slug={slug}
              image={`/games/${slug}.webp`}
              online={online}
            />
          ))
        )}
      </div>
    </div>
  );
}
