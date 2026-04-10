import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import ThemeColorMetaSync from "@/components/ThemeColorMetaSync";

const lightThemeColor = "#d0faec";
const darkThemeColor = "#041c2b";

export const metadata: Metadata = {
  title: "Widgets",
  description: "A collection of web widgets",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: darkThemeColor },
    { media: "(prefers-color-scheme: light)", color: lightThemeColor },
    { color: lightThemeColor },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeColorMetaSync />
          {children}
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
