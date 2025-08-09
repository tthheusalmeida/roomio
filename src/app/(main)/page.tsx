import HomeTemplate from "@/templates/HomeTemplate";
import ProtectedPage from "@/templates/ProtectedPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "theme-color": "#2f0d68",
  },
};

export default function Home() {
  return (
    <ProtectedPage>
      <HomeTemplate />
    </ProtectedPage>
  );
}
