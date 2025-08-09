"use client";

import { RankingRow } from "../molecules/RankingRow";

export interface PlayerRank {
  user_id: string;
  total_score: number;
}

interface RankingProps {
  PlayerRankList: PlayerRank[];
}

export default function Ranking({ PlayerRankList }: RankingProps) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
        <thead className="bg-violet-900">
          <tr>
            <th className="px-2 py-2 text-left font-semibold text-violet-100 w-14">
              #
            </th>
            <th className="px-2 py-2 text-left font-semibold text-violet-100">
              Usuário
            </th>
            <th className="px-2 py-2 text-right font-semibold text-violet-100">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {PlayerRankList.map((item, index) => (
            <RankingRow
              key={item.user_id}
              position={index + 1}
              userId={item.user_id}
              score={item.total_score}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
