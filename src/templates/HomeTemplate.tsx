"use client";

import Subtitle from "@/components/atoms/Subtitle";
import LoadingComponent from "@/components/molecules/LoadingComponent";
import GameCard from "@/components/organisms/GameCard";
import { useGames } from "@/hooks/games";
import { Game } from "@/services/games";
import { mergeClassNames } from "@/utils/classNames";
import { useEffect, useState } from "react";

export default function HomeTemplate() {
  const { data, isLoading } = useGames();
  const [games, setGames] = useState<Game[]>([]);

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
          <LoadingComponent />
        ) : (
          games?.map(({ name, slug, online }, index) => (
            <GameCard
              key={index}
              title={name}
              image={`/games/${slug}.webp`}
              online={online}
            />
          ))
        )}
      </div>
    </div>
  );
}
