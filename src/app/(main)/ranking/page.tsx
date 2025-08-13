import RankingTemplate from "@/templates/RankingTemplate";
import ProtectedPage from "@/templates/ProtectedPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "theme-color": "#4d179a",
  },
};

export default function Ranking() {
  return (
    <ProtectedPage>
      <RankingTemplate />
    </ProtectedPage>
  );
}
