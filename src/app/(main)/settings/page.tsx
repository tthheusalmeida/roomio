import ProtectedPage from "@/templates/ProtectedPage";
import SettingsTemplate from "@/templates/SettingsTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "theme-color": "#2f0d68",
  },
};

export default function Settings() {
  return (
    <ProtectedPage>
      <SettingsTemplate />
    </ProtectedPage>
  );
}
