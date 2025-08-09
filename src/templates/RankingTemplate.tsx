"use client";

import { useScoresRanking } from "@/hooks/scores";
import Subtitle from "@/components/atoms/Subtitle";
import Ranking, { PlayerRank } from "@/components/organisms/Ranking";

export default function RankingTemplate() {
  const { data: overallRanking, isLoading } = useScoresRanking();

  return (
    <div className="w-full flex flex-col">
      <Subtitle>Overall Ranking</Subtitle>

      {isLoading ? (
        <span className="animate-pulse">Loading...</span>
      ) : (
        <Ranking PlayerRankList={overallRanking} />
      )}
    </div>
  );
}
