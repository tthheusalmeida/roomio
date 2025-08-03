import HomeTemplate from "@/templates/HomeTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "theme-color": "#2f0d68",
  },
};

export default function Home() {
  return <HomeTemplate />;
}
