import LoginTemplate from "@/templates/LoginTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "theme-color": "#131416",
  },
};

export default function Login() {
  return <LoginTemplate />;
}
