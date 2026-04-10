"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

const LIGHT_THEME_COLOR = "#d0faec";
const DARK_THEME_COLOR = "#041c2b";
const SYSTEM_THEME_COLORS = {
  light: LIGHT_THEME_COLOR,
  dark: DARK_THEME_COLOR,
} as const;

function syncThemeColorMetaTags(theme: string | undefined, resolvedTheme: string | undefined) {
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

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme ?? "system";
  const nextTheme =
    currentTheme === "light"
      ? "dark"
      : currentTheme === "dark"
        ? "system"
        : "light";

  const label =
    currentTheme === "light"
      ? "Light"
      : currentTheme === "dark"
        ? "Dark"
        : "System";

  const icon = useMemo(() => {
    if (currentTheme === "system") {
      return <Monitor className="h-4 w-4" />;
    }

    return resolvedTheme === "dark" ? (
      <Moon className="h-4 w-4" />
    ) : (
      <Sun className="h-4 w-4" />
    );
  }, [currentTheme, resolvedTheme]);

  useEffect(() => {
    if (!mounted) return;

    syncThemeColorMetaTags(theme, resolvedTheme);
  }, [mounted, resolvedTheme, theme]);

  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      aria-label={`Theme: ${label}. Switch to ${nextTheme}.`}
      title={`Theme: ${label}`}
      onClick={() => setTheme(nextTheme)}
      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/50 bg-white/40 text-slate-700 shadow-lg backdrop-blur transition-all duration-150 hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-xl active:translate-y-0 active:scale-95 dark:border-stone-500/70 dark:bg-stone-900/50 dark:text-slate-100 dark:hover:bg-stone-800/70"
    >
      <span className="transition-transform duration-150 hover:rotate-6">{icon}</span>
    </button>
  );
}
