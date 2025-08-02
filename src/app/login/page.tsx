import LoginTemplate from "@/templates/LoginTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "theme-color": "#ff6467",
  },
};

export default function Login() {
  return <LoginTemplate />;
}
