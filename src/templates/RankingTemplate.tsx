"use client";

import { useScoresRanking } from "@/hooks/scores";
import Subtitle from "@/components/atoms/Subtitle";
import Ranking, { PlayerRank } from "@/components/organisms/Ranking";
import LoadingLabel from "@/components/atoms/LoadingLabel";

export default function RankingTemplate() {
  const { data: overallRanking, isLoading } = useScoresRanking();

  return (
    <div className="w-full flex flex-col">
      <Subtitle>Overall Ranking</Subtitle>

      {isLoading ? (
        <LoadingLabel label="Loading..." />
      ) : (
        <Ranking PlayerRankList={overallRanking} />
      )}
    </div>
  );
}
