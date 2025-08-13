"use client";

import { mergeClassNames } from "@/utils/classNames";
import { FaMedal } from "react-icons/fa";

interface RankingRowProps {
  position: number;
  name: string;
  userId: string;
  score: number;
}

export function RankingRow({ position, name, userId, score }: RankingRowProps) {
  const medalColor =
    position === 1
      ? "text-yellow-500"
      : position === 2
      ? "text-gray-400"
      : position === 3
      ? "text-amber-700"
      : null;

  const userName = name
    ? name
    : userId.length > 10
    ? `${userId.slice(0, 4)}...${userId.slice(-3)}`
    : userId;

  return (
    <tr className="border-t bg-violet-200 hover:bg-violet-50 transition-colors">
      <td className="px-2 py-2 flex items-center justify-end gap-2 text-violet-900">
        {medalColor && (
          <FaMedal
            className={mergeClassNames("w-4 h-4 shrink-0", medalColor)}
          />
        )}
        <span className="font-medium">{position}</span>
      </td>
      <td className="px-2 py-2 text-violet-900 truncate max-w-[120px]">
        {userName}
      </td>
      <td className="px-2 py-2 text-right font-semibold text-violet-900">
        {score}
      </td>
    </tr>
  );
}
