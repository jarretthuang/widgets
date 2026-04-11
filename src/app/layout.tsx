import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import ThemeColorMetaSync from "@/components/ThemeColorMetaSync";
import {
  DARK_THEME_COLOR,
  LIGHT_THEME_COLOR,
  THEME_STORAGE_KEY,
} from "@/components/theme";

const lightThemeColor = LIGHT_THEME_COLOR;
const darkThemeColor = DARK_THEME_COLOR;
const themeColorInitScript = `(function(){
  var storageKey=${JSON.stringify(THEME_STORAGE_KEY)};
  var lightColor=${JSON.stringify(LIGHT_THEME_COLOR)};
  var darkColor=${JSON.stringify(DARK_THEME_COLOR)};
  var themeColors={light:lightColor,dark:darkColor};
  var storedTheme;

  try {
    storedTheme=localStorage.getItem(storageKey);
  } catch (error) {
    storedTheme=null;
  }

  var explicitTheme=storedTheme==="light"||storedTheme==="dark"?storedTheme:null;
  var fallbackTheme=explicitTheme||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
  var fallbackColor=themeColors[fallbackTheme];
  var themeColorMetas=document.querySelectorAll('meta[name="theme-color"]');

  themeColorMetas.forEach(function(meta){
    var media=meta.getAttribute("media");

    if(!media){
      meta.setAttribute("content", fallbackColor);
      return;
    }

    if(explicitTheme){
      meta.setAttribute("content", themeColors[explicitTheme]);
      return;
    }

    if(media.indexOf("prefers-color-scheme: dark")!==-1){
      meta.setAttribute("content", themeColors.dark);
      return;
    }

    if(media.indexOf("prefers-color-scheme: light")!==-1){
      meta.setAttribute("content", themeColors.light);
    }
  });
})();`;

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeColorInitScript }} />
      </head>
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
