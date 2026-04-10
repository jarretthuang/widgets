import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Viewport } from "next";

const lightThemeColor = "#d0faec";
const darkThemeColor = "#041c2b";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: darkThemeColor },
    { media: "(prefers-color-scheme: light)", color: lightThemeColor },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
