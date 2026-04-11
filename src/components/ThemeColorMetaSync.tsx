"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export const LIGHT_THEME_COLOR = "#d0faec";
export const DARK_THEME_COLOR = "#041c2b";
export const THEME_STORAGE_KEY = "theme";
const SYSTEM_THEME_COLORS = {
  light: LIGHT_THEME_COLOR,
  dark: DARK_THEME_COLOR,
} as const;

function syncThemeColorMetaTags(
  theme: string | undefined,
  resolvedTheme: string | undefined
) {
  const explicitTheme = theme === "light" || theme === "dark" ? theme : null;
  const fallbackTheme = explicitTheme ?? (resolvedTheme === "dark" ? "dark" : "light");
  const fallbackColor = SYSTEM_THEME_COLORS[fallbackTheme];
  const themeColorMetas = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]');

  themeColorMetas.forEach((meta) => {
    const media = meta.getAttribute("media");

    if (!media) {
      meta.setAttribute("content", fallbackColor);
      return;
    }

    if (explicitTheme) {
      meta.setAttribute("content", SYSTEM_THEME_COLORS[explicitTheme]);
      return;
    }

    if (media.includes("prefers-color-scheme: dark")) {
      meta.setAttribute("content", SYSTEM_THEME_COLORS.dark);
      return;
    }

    if (media.includes("prefers-color-scheme: light")) {
      meta.setAttribute("content", SYSTEM_THEME_COLORS.light);
    }
  });
}

export default function ThemeColorMetaSync() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    syncThemeColorMetaTags(theme, resolvedTheme);
  }, [resolvedTheme, theme]);

  return null;
}
