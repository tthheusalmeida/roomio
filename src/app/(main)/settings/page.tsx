import SettingsTemplate from "@/templates/SettingsTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "theme-color": "#ff6467",
  },
};

export default function Settings() {
  return <SettingsTemplate />;
}
