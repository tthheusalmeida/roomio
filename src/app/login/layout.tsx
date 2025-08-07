import "../globals.css";
import { UserProvider } from "@/contexts/UserContext";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Room.io - Login",
  description: "Mobile online games.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <UserProvider>{children}</UserProvider>;
}
