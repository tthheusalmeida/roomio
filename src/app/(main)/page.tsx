import HomeTemplate from "@/templates/HomeTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "theme-color": "#ff6467",
  },
};

export default function Home() {
  return <HomeTemplate />;
}
