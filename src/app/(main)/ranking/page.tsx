import RankingTemplate from "@/templates/RankingTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "theme-color": "#ff6467",
  },
};

export default function Ranking() {
  return <RankingTemplate />;
}
