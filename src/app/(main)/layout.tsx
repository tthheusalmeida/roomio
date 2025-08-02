import "../globals.css";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { UserProvider } from "@/contexts/UserContext";
import PageTemplate from "@/templates/PageTemplate";

const poppinsSans = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Room.io",
  description: "Mobile online games.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${poppinsSans.variable} antialiased`}>
        <UserProvider>
          <PageTemplate>{children}</PageTemplate>
        </UserProvider>
      </body>
    </html>
  );
}
