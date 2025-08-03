import Subtitle from "@/components/atoms/Subtitle";
import GameCard from "@/components/organisms/GameCard";
import { mergeClassNames } from "@/utils/classNames";

export default function HomeTemplate() {
  const games = [
    {
      title: "Tic-Tac-Toe",
      image: "/games/tictactoe.webp",
      online: 10,
    },
  ];

  return (
    <div className="w-full flex flex-col">
      <Subtitle>Games</Subtitle>

      <div
        className={mergeClassNames(
          "grid grid-cols-2 gap-4",
          "sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        )}
      >
        {games.map(({ title, image, online }, index) => (
          <GameCard key={index} title={title} image={image} online={online} />
        ))}
      </div>
    </div>
  );
}
