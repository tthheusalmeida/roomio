import HomeTemplate from "@/templates/HomeTemplate";
import ProtectedPage from "@/templates/ProtectedPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "theme-color": "#4d179a",
  },
};

export default function Home() {
  return (
    <ProtectedPage>
      <HomeTemplate />
    </ProtectedPage>
  );
}
