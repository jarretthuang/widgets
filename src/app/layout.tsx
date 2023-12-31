import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#092835"
      />
      <meta name="theme-color" content="#d0faec" />
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
