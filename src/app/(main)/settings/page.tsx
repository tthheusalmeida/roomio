import ProtectedPage from "@/templates/ProtectedPage";
import SettingsTemplate from "@/templates/SettingsTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "theme-color": "#4d179a",
  },
};

export default function Settings() {
  return (
    <ProtectedPage>
      <SettingsTemplate />
    </ProtectedPage>
  );
}
