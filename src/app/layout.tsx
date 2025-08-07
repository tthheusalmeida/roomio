import "./globals.css";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Room.io",
  description: "Mobile online games.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const poppinsSans = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US">
      <body className={`${poppinsSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
